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
