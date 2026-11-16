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
