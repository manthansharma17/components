const gallery = document.querySelector('#gallery');
const cards = [...document.querySelectorAll('.gallery-card')];

const total = cards.length;

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

let rotation = 0;
let isDragging = false;
let lastX = 0;
let dragVelocity = 0;

// Responsive gallery dimensions
function getRadius() {
  return window.innerWidth < 700
    ? { x: 155, y: 105, z: 90 }
    : { x: 260, y: 160, z: 125 };
}

// Mouse interaction
window.addEventListener('pointermove', (e) => {
  if (isDragging) {
    dragVelocity = e.clientX - lastX;
    rotation += dragVelocity * 0.003;
    lastX = e.clientX;
    return;
  }

  targetX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Drag interaction
gallery.addEventListener('pointerdown', (e) => {
  isDragging = true;
  lastX = e.clientX;
  gallery.setPointerCapture(e.pointerId);
});

gallery.addEventListener('pointerup', () => {
  isDragging = false;
});

gallery.addEventListener('pointercancel', () => {
  isDragging = false;
});

// Animation loop
function animate() {

  const radius = getRadius();

  if (!isDragging) {
    rotation += 0.0018;
    dragVelocity *= 0.94;
    rotation += dragVelocity * 0.0005;
  }

  // Smooth mouse parallax
  mouseX += (targetX - mouseX) * 0.035;
  mouseY += (targetY - mouseY) * 0.035;

  gallery.style.transform = `
    rotateX(${-mouseY * 7}deg)
    rotateY(${mouseX * 9}deg)
  `;

  cards.forEach((card, index) => {

    const angle = (index / total) * Math.PI * 2 + rotation;

    // 3D orbital position
    const x = Math.cos(angle) * radius.x;
    const y = Math.sin(angle) * radius.y;
    const z = Math.sin(angle) * radius.z;
     // Individual card rotations
    const rotateY = Math.sin(angle) * 38;
    const rotateX = Math.cos(angle) * 12;
    const rotateZ = Math.sin(angle * 1.5) * 13;

    // Subtle floating movement
    const float = Math.sin(
      performance.now() * 0.0015 + index
    ) * 9;

    const scale = 1 + (z / radius.z) * 0.08;

    card.style.transform = `
      translate3d(
        ${x}px,
        ${y + float}px,
        ${z}px
      )
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      rotateZ(${rotateZ}deg)
      scale(${scale})
    `;

    // Depth-based brightness
    card.style.filter = `
      brightness(${0.75 + ((z + radius.z) / (radius.z * 2)) * 0.4})
    `;
  });

  requestAnimationFrame(animate);
}

animate();