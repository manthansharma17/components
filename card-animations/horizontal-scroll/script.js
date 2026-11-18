gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector('.horizontal-section');
const track = document.querySelector('.horizontal-track');
const cards = gsap.utils.toArray('.project-card');

const progressFill = document.querySelector('.progress-fill');

// Distance the gallery must travel
function getScrollDistance() {
  return Math.max(
    0,
    track.scrollWidth - window.innerWidth
  );
}

// Main horizontal animation
const horizontalTween = gsap.to(track, {
  x: () => -getScrollDistance(),
  ease: 'none',
  scrollTrigger: {
    trigger: section,
    start: 'top top',
    end: () => `+=${Math.max(1, getScrollDistance())}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      gsap.set(progressFill, {
        scaleX: self.progress
      });
    }
  }
});

// Image parallax and text reveal
cards.forEach((card) => {
  const image = card.querySelector('img');
  const info = card.querySelector('.project-info');

  gsap.fromTo(image,
    { xPercent: -8 },
    {
      xPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        containerAnimation: horizontalTween,
        start: 'left right',
        end: 'right left',
        scrub: true
      }
    }
  );

  gsap.from(info, {
    y: 65,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      containerAnimation: horizontalTween,
      start: 'left 90%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Entrance animations
gsap.from('.intro h1', {
  y: 100,
  opacity: 0,
  duration: 1.4,
  ease: 'power4.out'
});
