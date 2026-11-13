const deck = document.querySelector('#deck');
const spreadBtn = document.querySelector('#spreadBtn');

let isSpread = false;

spreadBtn.addEventListener('click', () => {
  isSpread = !isSpread;

  deck.classList.toggle('spread', isSpread);

  spreadBtn.querySelector('span:first-child').textContent =
    isSpread ? 'STACK THE CARDS' : 'SPREAD THE CARDS';
});

// Individual card interaction
const cards = document.querySelectorAll('.stack-card');

cards.forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;

    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 12;

     card.style.setProperty('--mouse-x', `${x * 100}%`);
    card.style.setProperty('--mouse-y', `${y * 100}%`);

    if (isSpread) {
      card.style.filter = 'brightness(1.15)';
    }
  });

  card.addEventListener('pointerleave', () => {
    card.style.filter = 'brightness(1)';
  });
});