const scene = document.querySelector('#scene');
const ring = document.querySelector('#ring');
const cards = [...document.querySelectorAll('.carousel-card')];

const currentDisplay = document.querySelector('#current');
const totalDisplay = document.querySelector('#total');

const total = cards.length;
const angleStep = 360 / total;

let rotation = 0;
let velocity = 0.0;

let isDragging = false;
let lastX = 0;
let lastTime = 0;

let radius = 250;
let cardWidth = 210;

// Counter
totalDisplay.textContent = String(total).padStart(2, '0');

// Calculate carousel dimensions
function setupCarousel() {
  cardWidth = window.innerWidth < 700 ? 165 : 210;

  radius = (
    cardWidth /
    (2 * Math.tan(Math.PI / total))
  ) * 1.08;

  cards.forEach((card, index) => {
    const angle = index * angleStep;

    card.style.transform = `
      rotateY(${angle}deg)
      translateZ(${radius}px)
    `;
  });
}
// Find the card facing the viewer
function updateActiveCard() {
  let normalized = ((rotation % 360) + 360) % 360;

  let activeIndex = Math.round(
    (360 - normalized) / angleStep
  ) % total;

  cards.forEach((card, index) => {
    card.classList.toggle(
      'active',
      index === activeIndex
    );
  });

  currentDisplay.textContent =
    String(activeIndex + 1).padStart(2, '0');
}

// Main animation loop
function animate() {

  if (!isDragging) {
    rotation += 0.18 + velocity;

    velocity *= 0.94;

    if (Math.abs(velocity) < 0.002) {
      velocity = 0;
    }
  }

  ring.style.transform = `
    rotateY(${rotation}deg)
  `;

  updateActiveCard();

  requestAnimationFrame(animate);
}