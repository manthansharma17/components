gsap.registerPlugin(ScrollTrigger);

// ===============================
// Elements
// ===============================
const reveal = document.querySelector(".reveal");
const galleryImages = gsap.utils.toArray(".gallery-image");
const slides = gsap.utils.toArray(".slide");

// ===============================
// Initial States
// ===============================
gsap.set(reveal, {
  yPercent: 100,
  scale: 0.92,
  borderRadius: 40,
  transformOrigin: "bottom center",
  willChange: "transform",
});

gsap.set(galleryImages, {
  autoAlpha: 0,
});

gsap.set(slides, {
  autoAlpha: 0,
  yPercent: 100,
});

gsap.set(galleryImages[0], {
  autoAlpha: 1,
});

gsap.set(slides[0], {
  autoAlpha: 1,
  yPercent: 0,
});

// ===============================
// Timeline
// ===============================
const tl = gsap.timeline({
  defaults: {
    duration: 1.2,
    ease: "power2.out",
  },
  scrollTrigger: {
    trigger: ".wrapper",
    start: "top top",
    end: () => `+=${slides.length * 120}%`,
    pin: true,
    scrub: 0.7,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    // markers: true,
  },
});

// ===============================
// Intro
// ===============================
tl.add("intro");

tl.from(".content-subtitle", {
  y: 120,
  autoAlpha: 0,
});

tl.from(
  ".left-content",
  {
    y: -120,
    autoAlpha: 0,
  },
  "<0.1",
);

tl.from(
  ".right-content",
  {
    y: 120,
    autoAlpha: 0,
  },
  "<",
);

// Small pause before reveal
tl.add("revealStart", "+=1.5");

// ===============================
// Reveal Gallery
// ===============================
tl.to(reveal, {
  yPercent: 0,
  scale: 1,
  borderRadius: 0,
  duration: 2,
});

// ===============================
// Gallery Transitions
// ===============================
function switchSlide(current, next) {
  tl.to(
    slides[current],
    {
      yPercent: -100,
      autoAlpha: 0,
    },
    "+=0.2",
  );

  tl.to(
    galleryImages[current],
    {
      autoAlpha: 0,
    },
    "<",
  );

  tl.to(
    galleryImages[next],
    {
      autoAlpha: 1,
    },
    "<",
  );

  tl.fromTo(
    slides[next],
    {
      yPercent: 100,
      autoAlpha: 0,
    },
    {
      yPercent: 0,
      autoAlpha: 1,
    },
    "<0.15",
  );
}

for (let i = 0; i < slides.length - 1; i++) {
  switchSlide(i, i + 1);
}
