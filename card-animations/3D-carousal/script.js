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
