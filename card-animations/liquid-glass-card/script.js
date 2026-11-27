const cards = document.querySelectorAll(".glass-card");

cards.forEach((card) => {

  card.addEventListener("mousemove", (event) => {

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Update reflection coordinates
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    // Calculate 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;

    card.style.transform = `
      perspective(900px)
      translateY(-12px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

  });