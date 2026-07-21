gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray(".panel");
const images = gsap.utils.toArray(".gallery-image");
const slides = gsap.utils.toArray(".slide");

// Place every panel except first below viewport

gsap.set(".reveal", {
  yPercent: 100,
  scale: 0.92,
  borderRadius: 40,
  transformOrigin: "bottom center",
});

gsap.set(images, {
  opacity: 0,
});

gsap.set(slides, {
  opacity: 0,
  y: 100,
});

gsap.set(images[0], {
  opacity: 1,
});

gsap.set(slides[0], {
  opacity: 1,
  y: 0,
});

// Create the timeline
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".wrapper",
    start: "top top",
    end: "+=300%",
    pin: true,
    scrub: 1,
  },
});

tl.from(".content-subtitle", {
  y: 120,
  opacity: 0,
  duration: 1,
});
// Animate first panel content
tl.from(".left-content", {
  y: -120,
  opacity: 0,
  duration: 1,
});

tl.from(
  ".right-content",
  {
    y: 120,
    opacity: 0,
    duration: 1,
  },
  "<",
);

tl.to({},{
    duration: 1.5
})

tl.to(".reveal", {
  yPercent: 0,
  scale: 1,
  borderRadius: 0,
  duration: 2,
  ease: "power2.out",
});

for (let i = 0; i < slides.length - 1; i++) {
  tl.to(slides[i], {
    y: -150,
    opacity: 0,
    duration: 1.2,
  });

  tl.to(
    images[i],
    {
      opacity: 0,
      duration: 1.2,
    },
    "<",
  );

  tl.to(
    images[i + 1],
    {
      opacity: 1,
      duration: 1.2,
    },
    "<",
  );

  tl.fromTo(
    slides[i + 1],
    {
      y: 150,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
    },
    "<0.2",
  );
}

// // Then reveal the next panels
// panels.slice(1).forEach((panel) => {
//   tl.to(panel, {
//     yPercent: 0,
//     scale: 1,
//     borderRadius: "0px",
//     duration: 1,
//     ease: "power2.out",
//   });
// });
