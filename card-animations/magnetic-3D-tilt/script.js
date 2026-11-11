const cards = document.querySelectorAll('.tilt-card');

cards.forEach((card) => {
  let frame;

  card.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    const rotateY = (px - 0.5) * 22;
    const rotateX = (0.5 - py) * 22;

    cancelAnimationFrame(frame);

    frame = requestAnimationFrame(() => {
      card.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)
      `;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

   card.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);

    card.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
    `;
  });
});