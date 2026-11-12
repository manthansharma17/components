const cards = document.querySelectorAll('.neon-card');

cards.forEach(card => {

  card.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.setProperty('--light-opacity', '0.13');
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--light-opacity', '0');
  });

});