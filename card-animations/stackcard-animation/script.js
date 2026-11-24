gsap.registerPlugin(ScrollTrigger);

const items = gsap.utils.toArray('.stack-item');
const cards = gsap.utils.toArray('.stack-card');

const progressBar = document.querySelector('.progress-bar');
const progressNumber = document.querySelector('#progress-number');

// Initial card entrance
gsap.from(cards, {
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.stack-container',
    start: 'top 85%'
  }
});

// Animate previous cards as the next card arrives
cards.forEach((card, index) => {

  if (index === cards.length - 1) return;

  const nextItem = items[index + 1];

  gsap.to(card, {
    scale: 0.9,
    y: -35,
    opacity: 0.65,
    filter: 'brightness(0.55)',
    ease: 'none',

    scrollTrigger: {
      trigger: nextItem,
      start: 'top 75%',
      end: 'top 15%',
      scrub: 1
    }
  });

});

// Image zoom effect
cards.forEach(card => {

  const image = card.querySelector('img');

  gsap.fromTo(image,
    {
      scale: 1.15
    },
    {
      scale: 1,
      ease: 'none',

      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );

});