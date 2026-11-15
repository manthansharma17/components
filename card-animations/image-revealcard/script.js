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
