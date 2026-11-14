const cards = document.querySelectorAll('.expand-card');

function activateCard(selectedCard) {
  cards.forEach(card => {
    const isActive = card === selectedCard;

    card.classList.toggle('active', isActive);
    card.setAttribute('aria-expanded', isActive);
  });
}

// Click interaction
cards.forEach(card => {

  card.addEventListener('click', () => {
    activateCard(card);
  });
