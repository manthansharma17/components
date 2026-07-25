gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   SECTION 1
   WORD BOUNCE
========================================================= */

document.querySelectorAll(".section-one .line").forEach((line) => {
  const words = line.textContent.trim().split(" ");

  line.innerHTML = words
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");
});

const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-one",

    start: "top 80%",
    end: "bottom 40%",

    scrub: 1,

    // markers: true
  },
});

document.querySelectorAll(".section-one .line").forEach((line) => {
  tl1.to(line.querySelectorAll(".word"), {
    y: 0,
    scale: 1,
    rotation: 0,
    opacity: 1,

    duration: 1,

    stagger: 0.15,

    ease: "back.out(2)",
  });
});

/* =========================================================
   SECTION 2
   MASK REVEAL
========================================================= */

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-two",

    start: "top 80%",
    end: "bottom 40%",

    scrub: 1,
  },
});

tl2.to(".section-two .reveal-text", {
  y: 0,

  stagger: 0.3,

  duration: 1,

  ease: "power4.out",
});

/* =========================================================
   SECTION 3
   CHARACTER BLUR
========================================================= */

const heading = document.querySelector(".section-three .chars");

const text = heading.textContent;

heading.innerHTML = "";

text.split("").forEach((letter) => {
  if (letter === " ") {
    heading.innerHTML += " ";
  } else {
    heading.innerHTML += `<span class="char">${letter}</span>`;
  }
});

const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-three",

    start: "top 80%",
    end: "bottom 40%",

    scrub: 1,
  },
});

tl3.to(".section-three .char", {
  y: 0,

  opacity: 1,

  filter: "blur(0px)",

  stagger: 0.05,

  duration: 1,

  ease: "power3.out",
});

/* =========================================================
   SECTION 4
   3D WORD FLIP
========================================================= */

const flip = document.querySelector(".section-four .flip-text");

const flipWords = flip.textContent.trim().split(" ");

flip.innerHTML = flipWords
  .map((word) => `<span class="flip-word">${word}</span>`)
  .join(" ");

const tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-four",

    start: "top 80%",
    end: "bottom 40%",

    scrub: 1,
  },
});

tl4.to(".section-four .flip-word", {
  rotationX: 0,

  y: 0,

  opacity: 1,

  stagger: 0.15,

  duration: 1,

  ease: "power4.out",
});

/* =========================================================
   SECTION 5
   SCATTER → ASSEMBLE
========================================================= */

const scatterText = document.querySelector(".section-five .scatter-text");

const scatterWords = scatterText.textContent.trim().split(" ");

scatterText.innerHTML = scatterWords
  .map((word) => `<span class="scatter-word">${word}</span>`)
  .join(" ");

const words5 = scatterText.querySelectorAll(".scatter-word");

// Give every word a random starting position
gsap.set(words5, {
  x: () => gsap.utils.random(-300, 300),

  y: () => gsap.utils.random(-200, 200),

  rotation: () => gsap.utils.random(-90, 90),

  scale: () => gsap.utils.random(0.3, 1.8),

  opacity: 0,
});

const tl5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-five",

    start: "top 80%",
    end: "bottom 40%",

    scrub: 1,
  },
});

tl5.to(words5, {
  x: 0,

  y: 0,

  rotation: 0,

  scale: 1,

  opacity: 1,

  stagger: {
    each: 0.12,
    from: "random",
  },

  duration: 1,

  ease: "expo.out",
});

/* =========================================================
   SECTION 6
   WORD COLOR FILL
========================================================= */

const fillText = document.querySelector(".section-six .fill-text");

const fillWords = fillText.textContent.trim().split(" ");

fillText.innerHTML = fillWords
  .map((word) => `<span class="fill-word">${word}</span>`)
  .join(" ");

const words6 = fillText.querySelectorAll(".fill-word");

const tl6 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-six",

    start: "top 70%",
    end: "bottom 40%",

    scrub: 1,
  },
});

tl6.to(words6, {
  color: "#fff",

  stagger: 0.15,

  duration: 1,

  ease: "none",
});

/* =========================================================
   SECTION 7
   PIN + CINEMATIC SCALE
========================================================= */

const tl7 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-seven",

    start: "top top",

    end: "+=1800",

    scrub: 1,

    pin: true,

    anticipatePin: 1,
  },
});

tl7

  .to(".section-seven .scale-text", {
    scale: 4,

    letterSpacing: "0.15em",

    duration: 1,

    ease: "none",
  })

  .to(".section-seven .scale-text", {
    scale: 12,

    opacity: 0,

    duration: 1,

    ease: "none",
  });

/* =========================================================
   SECTION 8
   PINNED HORIZONTAL TEXT
========================================================= */

const section8 = document.querySelector(".section-eight");

const track8 = document.querySelector(".horizontal-track");

const tl8 = gsap.timeline({
  scrollTrigger: {
    trigger: section8,

    start: "top top",

    end: () => "+=" + track8.scrollWidth,

    scrub: 1,

    pin: true,

    anticipatePin: 1,

    invalidateOnRefresh: true,
  },
});

tl8.to(track8, {
  x: () => -(track8.scrollWidth - window.innerWidth),

  duration: 1,

  ease: "none",
});

/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
