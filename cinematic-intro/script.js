gsap.registerPlugin(ScrollTrigger);

/* =========================================
   01. LENIS SMOOTH SCROLL
========================================= */

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
  lerp: 0.08
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


/* =========================================
   02. INITIAL STATES
========================================= */

gsap.set(".navbar, .hero-meta, .hero-description, .hero-bottom", {
  autoAlpha: 0
});

gsap.set(".title-line", {
  yPercent: 110
});

gsap.set(".orb-scene", {
  scale: 0.15,
  autoAlpha: 0,
  rotation: -30
});

gsap.set(".orb", {
  rotation: -40
});

gsap.set(".orb-ring", {
  scale: 0.7,
  autoAlpha: 0
});

gsap.set(".next-line", {
  yPercent: 110
});

gsap.set(".next-label, .next-content p, .discover-link", {
  autoAlpha: 0,
  y: 30
});


/* =========================================
   03. PRELOADER
========================================= */

const loaderNumber = document.querySelector(".loader-number");
const loaderProgress = document.querySelector(".loader-progress");

const counter = { value: 0 };

const loaderTL = gsap.timeline({
  onComplete: startExperience
});

loaderTL.to(counter, {
  value: 100,
  duration: 2.2,
  ease: "power2.inOut",
  onUpdate: () => {
    loaderNumber.textContent = String(
      Math.floor(counter.value)
    ).padStart(3, "0");
  }
});

loaderTL.to(loaderProgress, {
  width: "100%",
  duration: 2.2,
  ease: "power2.inOut"
}, "<");


/* =========================================
   04. MAIN INTRO ANIMATION
========================================= */

function startExperience() {

  const introTL = gsap.timeline({
    defaults: {
      ease: "power4.out"
    }
  });

  introTL
    .to(".preloader", {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    })

    .to(".navbar", {
      autoAlpha: 1,
      y: 0,
      duration: 0.8
    }, "-=0.4")

    .to(".hero-meta", {
      autoAlpha: 1,
      y: 0,
      duration: 0.8
    }, "-=0.5")

    .to(".orb-scene", {
      scale: 1,
      rotation: 0,
      autoAlpha: 1,
      duration: 1.8,
      ease: "expo.out"
    }, "-=0.7")

    .to(".orb-ring", {
      scale: 1,
      autoAlpha: 1,
      duration: 1.5,
      stagger: 0.2
    }, "<")

    .to(".title-line", {
      yPercent: 0,
      duration: 1.3,
      stagger: 0.16,
      ease: "power4.out"
    }, "-=1")

    .to(".hero-description", {
      autoAlpha: 1,
      y: 0,
      duration: 0.8
    }, "-=0.6")

    .to(".hero-bottom", {
      autoAlpha: 1,
      duration: 0.8
    }, "-=0.6");
 // Start ambient animation once the entrance finishes.
  introTL.add(() => {
    startAmbientAnimations();
    startScrollAnimations();
  });

}


/* =========================================
   05. AMBIENT ORB ANIMATION
========================================= */

function startAmbientAnimations() {

  // Continuous rotation.
  gsap.to(".orb", {
    rotation: 360,
    duration: 35,
    ease: "none",
    repeat: -1
  });

  // Floating object.
  gsap.to(".orb-scene", {
    y: -18,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Orbital rings.
  gsap.to(".ring-one", {
    rotation: "+=360",
    duration: 30,
    repeat: -1,
    ease: "none"
  });

  gsap.to(".ring-two", {
    rotation: "-=360",
    duration: 45,
    repeat: -1,
    ease: "none"
  });

  // Ambient halo.
  gsap.to(".orb-halo", {
    scale: 1.2,
    opacity: 0.5,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Scroll indicator.
  gsap.to(".scroll-indicator-inner", {
    xPercent: 100,
    duration: 1.2,
    repeat: -1,
    ease: "power1.inOut"
  });

}


/* =========================================
   06. HERO SCROLL TRANSFORMATION
========================================= */

function startScrollAnimations() {

  const heroScrollTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=100%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  heroScrollTL