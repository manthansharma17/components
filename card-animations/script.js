
const cards = document.querySelectorAll('.card-wrapper');

cards.forEach((wrapper) => {
  wrapper.addEventListener('click', () => {
    wrapper.classList.toggle('flipped');
  });
});
