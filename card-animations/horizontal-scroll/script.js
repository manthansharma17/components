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
