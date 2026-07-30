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
   SECTION 9
   SCRAMBLE → DECODE → EXPAND
========================================================= */

const section9 = document.querySelector(".section-nine");
const scrambleText = document.querySelector(".scramble-text");

const finalText = scrambleText.dataset.text;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&?";


/* ---------------------------------------------------------
   SCRAMBLE FUNCTION
--------------------------------------------------------- */

function updateScramble(progress) {

    let output = "";

    for (let i = 0; i < finalText.length; i++) {

        const originalCharacter = finalText[i];

        // Keep spaces
        if (originalCharacter === " ") {
            output += " ";
            continue;
        }


        // Each character gets its own reveal point
        const characterProgress =
            i / finalText.length;


        if (progress > characterProgress) {

            output += originalCharacter;

        } else {

            const randomIndex =
                Math.floor(
                    Math.random() * characters.length
                );

            output += characters[randomIndex];

        }

    }

    scrambleText.textContent = output;
}


/* ------------TIMELINE------------- */

const scrambleProgress = {
    value: 0
};


const tl9 = gsap.timeline({

    scrollTrigger: {

        trigger: section9,

        start: "top top",

        end: "+=1600",

        scrub: 0.5,

        pin: true,

        anticipatePin: 1

    }

});


/* 1. SCRAMBLE → REAL TEXT */

tl9.to(scrambleProgress, {

    value: 1,

    duration: 3,

    ease: "none",

    onUpdate: function () {

        updateScramble(
            scrambleProgress.value
        );

    }

});


/* 2. EXPAND TEXT */

tl9.to(scrambleText, {

    letterSpacing: "0.08em",

    scale: 1.05,

    duration: 1,

    ease: "none"

});


/*3. LABEL DISAPPEARS */

tl9.to(
    ".scramble-label",

    {

        opacity: 0,

        y: -20,

        duration: 0.5,

        ease: "none"

    },

    "<"

);

/* INITIAL SCRAMBLE */
updateScramble(0);

/* =========================================================
   SECTION 10
   CREATE → MOVE → INSPIRE
   COLLIDE → EXPLODE
========================================================= */

const tl10 = gsap.timeline({

    scrollTrigger: {

        trigger: ".section-ten",

        start: "top top",

        end: "+=3000",

        scrub: 0.6,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});


/* =========================================================
   INITIAL POSITIONS
========================================================= */

gsap.set(".word-create", {
    xPercent: -150,
    rotation: -10,
    opacity: 0
});

gsap.set(".word-move", {
    yPercent: 150,
    scale: 0.4,
    opacity: 0
});

gsap.set(".word-inspire", {
    xPercent: 150,
    rotation: 10,
    opacity: 0
});


/* =========================================================
   PHASE 1
   CREATE ENTERS FROM LEFT
========================================================= */

tl10.to(".word-create", {

    xPercent: 0,
    rotation: 0,
    opacity: 1,

    duration: 1,

    ease: "none"

});


/* =========================================================
   PHASE 2
   MOVE ENTERS FROM BOTTOM
========================================================= */

tl10.to(".word-move", {

    yPercent: 0,
    scale: 1,
    opacity: 1,

    duration: 1,

    ease: "none"

});


/* CREATE MOVES UP */

tl10.to(
    ".word-create",
    {
        yPercent: -110,
        scale: 0.7,

        duration: 1,

        ease: "none"
    },
    "<"
);


/* =========================================================
   PHASE 3
   INSPIRE ENTERS FROM RIGHT
========================================================= */

tl10.to(".word-inspire", {

    xPercent: 0,
    rotation: 0,
    opacity: 1,

    duration: 1,

    ease: "none"

});


/* MOVE MOVES UP */

tl10.to(
    ".word-move",
    {
        yPercent: -110,
        scale: 0.7,

        duration: 1,

        ease: "none"
    },
    "<"
);


/* CREATE GOES HIGHER */

tl10.to(
    ".word-create",
    {
        yPercent: -220,
        scale: 0.45,
        opacity: 0.5,

        duration: 1,

        ease: "none"
    },
    "<"
);


/* =========================================================
   PHASE 4
   ALL THREE COLLIDE
========================================================= */

tl10.to(
    ".finale-word",
    {

        xPercent: 0,
        yPercent: 0,

        scale: 1,

        rotation: 0,

        opacity: 1,

        duration: 1.2,

        ease: "none"

    }
);


/* =========================================================
   PHASE 5
   HOLD
========================================================= */

tl10.to({}, {
    duration: 0.5
});


/* =========================================================
   PHASE 6
   EXPLODE
========================================================= */

tl10.to(".word-create", {

    xPercent: -170,
    yPercent: -120,

    rotation: -25,

    scale: 2,

    opacity: 0,

    duration: 1.5,

    ease: "none"

});


tl10.to(
    ".word-move",
    {

        yPercent: 180,

        rotation: 20,

        scale: 3,

        opacity: 0,

        duration: 1.5,

        ease: "none"

    },

    "<"
);


tl10.to(
    ".word-inspire",
    {

        xPercent: 170,
        yPercent: -80,

        rotation: 25,

        scale: 2,

        opacity: 0,

        duration: 1.5,

        ease: "none"

    },

    "<"
);

/* =========================================================
   SECTION 11
   TEXT SLICE
   SCATTER → ALIGN → SPLIT
========================================================= */

const tl11 = gsap.timeline({

    scrollTrigger: {

        trigger: ".section-eleven",

        start: "top top",

        end: "+=2400",

        scrub: 0.6,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});


/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(".slice-1", {
    xPercent: -120
});

gsap.set(".slice-2", {
    xPercent: 120
});

gsap.set(".slice-3", {
    xPercent: -120
});

gsap.set(".slice-4", {
    xPercent: 120
});


/* =========================================================
   PHASE 1
   SLICES ENTER
========================================================= */

tl11.to(".slice-1", {

    xPercent: 0,

    duration: 1,

    ease: "none"

});


tl11.to(
    ".slice-2",
    {

        xPercent: 0,

        duration: 1,

        ease: "none"

    },

    "<"
);


tl11.to(
    ".slice-3",
    {

        xPercent: 0,

        duration: 1,

        ease: "none"

    },

    "<"
);


tl11.to(
    ".slice-4",
    {

        xPercent: 0,

        duration: 1,

        ease: "none"

    },

    "<"
);


/* =========================================================
   PHASE 2
   HOLD COMPLETE WORD
========================================================= */

tl11.to({}, {
    duration: 0.5
});


/* =========================================================
   PHASE 3
   ADD LETTER SPACING
========================================================= */

tl11.to(".slice h2", {

    letterSpacing: "0.05em",

    duration: 0.8,

    ease: "none"

});


/* =========================================================
   PHASE 4
   SPLIT VERTICALLY
========================================================= */

tl11.to(".slice-1", {

    yPercent: -200,

    duration: 1,

    ease: "none"

});


tl11.to(
    ".slice-2",
    {

        yPercent: -100,

        duration: 1,

        ease: "none"

    },

    "<"
);


tl11.to(
    ".slice-3",
    {

        yPercent: 100,

        duration: 1,

        ease: "none"

    },

    "<"
);


tl11.to(
    ".slice-4",
    {

        yPercent: 200,

        duration: 1,

        ease: "none"

    },

    "<"
);


/* =========================================================
   FADE OUT
========================================================= */

tl11.to(
    ".slice",
    {

        opacity: 0,

        duration: 0.5,

        ease: "none"

    },

    "<+=0.4"
);

/* =========================================================
   SECTION 12
   WATER FILL
========================================================= */

const tl12 = gsap.timeline({

    scrollTrigger: {

        trigger: ".section-twelve",

        start: "top top",

        end: "+=2000",

        scrub: 0.5,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});


/* =========================================================
   PHASE 1
   WATER RISES
========================================================= */

tl12.to(".water-fill", {

    clipPath: "inset(0 0 0% 0)",

    duration: 3,

    ease: "none"

});


/* =========================================================
   PHASE 2
   FULL
========================================================= */

tl12.to({}, {
    duration: 0.5
});


/* =========================================================
   PHASE 3
   SMALL EXPANSION
========================================================= */

tl12.to(".water-word", {

    scale: 1.08,

    duration: 1,

    ease: "none"

});


tl12.to(
    ".water-label",

    {

        opacity: 0,

        y: -20,

        duration: 0.5,

        ease: "none"

    },

    "<"
);

/* =========================================================
   SECTION 13
   LIQUID FILL
========================================================= */

const tl12 = gsap.timeline({

    scrollTrigger: {

        trigger: ".section-twelve",

        start: "top top",

        end: "+=2200",

        scrub: 0.6,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});


/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(".water-liquid", {
    yPercent: 100
});


/* =========================================================
   PHASE 1
   WATER RISES
========================================================= */

tl12.to(".water-liquid", {

    yPercent: 0,

    duration: 3,

    ease: "none"

});


/* =========================================================
   PHASE 2
   HOLD FULL WORD
========================================================= */

tl12.to({}, {
    duration: 0.5
});


/* =========================================================
   PHASE 3
   WORD EXPANDS
========================================================= */

tl12.to(".water-word", {

    scale: 1.08,

    duration: 0.8,

    ease: "none"

});


/* LABEL DISAPPEARS */

tl12.to(
    ".water-label",

    {

        opacity: 0,

        y: -20,

        duration: 0.5,

        ease: "none"

    },

    "<"
);



/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
