gsap.registerPlugin(ScrollTrigger);

/* =========================
   SECTION 1
========================= */

document.querySelectorAll(".line").forEach((line) => {
  const words = line.textContent.trim().split(" ");

  line.innerHTML = words
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");
});

const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-one",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
});

document.querySelectorAll(".line").forEach((line) => {
  tl1.to(
    line.querySelectorAll(".word"),
    {
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(2)",
      stagger: 0.06,
    },
    "<+=0.1",
  );
});

/* =========================
   SECTION 2
========================= */

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section-two",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  })

  .to(".reveal-text", {
    y: 0,
    stagger: 0.18,
    duration: 1,
    ease: "power4.out",
  });

/* =========================
   SECTION 3
========================= */

const heading = document.querySelector(".chars");

const text = heading.textContent;

heading.innerHTML = "";

text.split("").forEach((letter) => {
  if (letter === " ") {
    heading.innerHTML += " ";
  } else {
    heading.innerHTML += `<span class="char">${letter}</span>`;
  }
});

gsap.to(".char", {
  y: 0,
  opacity: 1,
  filter: "blur(0px)",
  duration: 0.8,
  stagger: 0.03,
  ease: "power3.out",

  scrollTrigger: {
    trigger: ".section-three",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
});

/* =========================
   SECTION 4
========================= */

const flip = document.querySelector(".flip-text");

const words = flip.textContent.trim().split(" ");

flip.innerHTML = words
  .map((word) => `<span class="flip-word">${word}</span>`)
  .join(" ");

gsap.to(".flip-word", {
  rotationX: 0,
  y: 0,
  opacity: 1,

  duration: 0.8,
  stagger: 0.08,

  ease: "power4.out",

  scrollTrigger: {
    trigger: ".section-four",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
});

/* =========================
   SECTION 5
========================= */

const scatter = document.querySelector(".scatter-text");

const scatterWords = scatter.textContent.trim().split(" ");

scatter.innerHTML = scatterWords
  .map((word) => `<span class="scatter-word">${word}</span>`)
  .join(" ");

gsap.from(".scatter-word", {
  x: () => gsap.utils.random(-300, 300),
  y: () => gsap.utils.random(-250, 250),
  rotation: () => gsap.utils.random(-180, 180),
  scale: () => gsap.utils.random(0.2, 2),

  opacity: 0,

  duration: 1.4,

  ease: "expo.out",

  stagger: 0.05,

  scrollTrigger: {
    trigger: ".section-five",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
});

/* =========================
   SECTION 6
   SCROLL WORD FILL
========================= */

const fillText = document.querySelector(".fill-text");

const fillWords = fillText.textContent
    .trim()
    .split(" ");

fillText.innerHTML = fillWords
    .map(word => `<span class="fill-word">${word}</span>`)
    .join(" ");

const words6 = document.querySelectorAll(".fill-word");


gsap.to(words6, {

    color: "#fff",

    stagger: 0.1,

    ease: "none",

    scrollTrigger: {

        trigger: ".section-six",

        start: "top 60%",

        end: "bottom 60%",

        scrub: true

    }

});

/* =========================
   SECTION 7
   PIN + SCALE
========================= */

gsap.timeline({

    scrollTrigger: {

        trigger: ".section-seven",

        start: "top top",

        end: "+=1800",

        scrub: 1,

        pin: true,

        anticipatePin: 1

    }

})

.to(".scale-text", {

    scale: 4,

    letterSpacing: "0.15em",

    ease: "power2.in"

})

.to(".scale-text", {

    scale: 12,

    opacity: 0,

    ease: "power3.in"

});