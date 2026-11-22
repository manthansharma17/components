const cards = document.querySelectorAll('.liquid-card');

const displacement = document.querySelector(
  '#liquid feDisplacementMap'
);

const turbulence = document.querySelector(
  '#liquid feTurbulence'
);

let targetStrength = 0;
let currentStrength = 0;

let targetFrequency = 0.025;
let currentFrequency = 0.025;

let activeCard = null;
let animationFrame = null;

// Animate the liquid distortion
function animateLiquid() {

  currentStrength +=
    (targetStrength - currentStrength) * 0.09;

  currentFrequency +=
    (targetFrequency - currentFrequency) * 0.07;

  displacement.setAttribute(
    'scale',
    currentStrength.toFixed(2)
  );

  turbulence.setAttribute(
    'baseFrequency',
    `0.012 ${currentFrequency.toFixed(4)}`
  );

  if (
    Math.abs(targetStrength - currentStrength) > 0.05 ||
    Math.abs(targetFrequency - currentFrequency) > 0.0001
  ) {
    animationFrame = requestAnimationFrame(animateLiquid);
  } else {
    animationFrame = null;
  }
}

// Start animation only when needed
function startAnimation() {
  if (!animationFrame) {
    animationFrame = requestAnimationFrame(animateLiquid);
  }
}

// Mouse interaction
cards.forEach((card) => {

  const image = card.querySelector('img');

  card.addEventListener('pointerenter', (e) => {

    if (e.pointerType === 'touch') return;

    activeCard = card;

    targetStrength = 35;
    targetFrequency = 0.045;

    startAnimation();
  });

  card.addEventListener('pointermove', (e) => {

    if (e.pointerType === 'touch') return;

    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // More distortion near the edges
    const edgeDistance = Math.max(
      Math.abs(x - 0.5),
      Math.abs(y - 0.5)
    );

    targetStrength = 18 + edgeDistance * 55;

    targetFrequency = 0.025 + edgeDistance * 0.035;

    startAnimation();
  });