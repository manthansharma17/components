const cards = document.querySelectorAll(".magnetic-card");

cards.forEach((card) => {

  card.addEventListener("mousemove", (event) => {

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalized cursor position
    const moveX = (x - centerX) / centerX;
    const moveY = (y - centerY) / centerY;

    // Magnetic movement
    const magneticX = moveX * 10;
    const magneticY = moveY * 10;

    // 3D rotation
    const rotateY = moveX * 10;
    const rotateX = -moveY * 10;

    card.style.transform = `
      translate(${magneticX}px, ${magneticY}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.03, 1.03, 1.03)
    `;

    // Spotlight position
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

  });
   card.addEventListener("mouseleave", () => {

    // Reset card position
    card.style.transform = `
      translate(0, 0)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;

    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "50%");

  });

});