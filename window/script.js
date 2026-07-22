gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // Lenis
  // -----------------------------
  const lenis = new Lenis({
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // -----------------------------
  // Elements
  // -----------------------------
  const windowContainer = document.querySelector(".window-container");
  const skyContainer = document.querySelector(".sky-container");
  const heroCopy = document.querySelector(".hero-copy");
  const heroHeader = document.querySelector(".hero-header");
  const skyText = document.querySelector(".sky-text");

  // -----------------------------
  // Initial State
  // -----------------------------
  gsap.set(heroCopy, {
    yPercent: 100,
  });

  // Function so values recalculate on resize
  const getSkyDistance = () => window.innerHeight - skyContainer.offsetHeight;

  // -----------------------------
  // Master Timeline
  // -----------------------------
  const tl = gsap.timeline({
    defaults: {
      ease: "none",
    },

    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // markers: true,
    },
  });

  // Everything starts together
  tl.to(
    windowContainer,
    {
      scale: 6,
      transformOrigin: "center center",
    },
    0,
  );

  tl.to(
    heroHeader,
    {
      scale: 6,
      z: 600,
      transformOrigin: "center center",
    },
    0,
  );

  tl.to(
    skyContainer,
    {
      y: () => getSkyDistance(),
    },
    0,
  );

  tl.to(
    skyText,
    {
      xPercent: -150,
    },
    0,
  );

  // Hero copy comes in later
  tl.to(
    heroCopy,
    {
      yPercent: 0,
      duration: 0.35,
    },
    0.7,
  );

  // -----------------------------
  // Refresh on resize
  // -----------------------------
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});
