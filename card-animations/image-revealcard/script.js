const cards = document.querySelectorAll('.reveal-card');

// Activate a card
function activateCard(selectedCard) {
  cards.forEach(card => {
    card.classList.toggle('active', card === selectedCard);
  });
}

cards.forEach(card => {

  // Click interaction
  card.addEventListener('click', () => {
    activateCard(card);
  });

  // Keyboard interaction
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activateCard(card);
    }
  });

   // Mouse-following spotlight
  card.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });

  // Prevent placeholder links from jumping to page top
  card.querySelector('.explore').addEventListener('click', (e) => {
    e.preventDefault();
  });

});