const cards = document.querySelectorAll('.spot-card');

cards.forEach(card => {

  let targetX = 50;
  let targetY = 50;

  let currentX = 50;
  let currentY = 50;

  let active = false;
  let animationId;

  function animate() {
    currentX += (targetX - currentX) * 0.14;
    currentY += (targetY - currentY) * 0.14;

    card.style.setProperty('--x', `${currentX}%`);
    card.style.setProperty('--y', `${currentY}%`);

    if (
      Math.abs(targetX - currentX) > 0.01 ||
      Math.abs(targetY - currentY) > 0.01
    ) {
      animationId = requestAnimationFrame(animate);
    } else {
      animationId = null;
    }
  }

  function updatePosition(e) {
    const rect = card.getBoundingClientRect();

    targetX = ((e.clientX - rect.left) / rect.width) * 100;
    targetY = ((e.clientY - rect.top) / rect.height) * 100;

    if (!animationId) {
      animationId = requestAnimationFrame(animate);
    }
  }

  card.addEventListener('pointerenter', e => {
    if (e.pointerType === 'touch') return;
    active = true;
    updatePosition(e);
  });
