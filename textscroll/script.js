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

const headingText = heading.textContent.trim();

heading.innerHTML = "";

headingText.split("").forEach((letter) => {
  if (letter === " ") {
    heading.appendChild(document.createTextNode(" "));

    return;
  }

  const span = document.createElement("span");

  span.className = "char";
  span.textContent = letter;

  heading.appendChild(span);
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
   WORD FLIP
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
   SCATTER
========================================================= */

const scatterText = document.querySelector(".section-five .scatter-text");

const scatterWords = scatterText.textContent.trim().split(" ");

scatterText.innerHTML = scatterWords
  .map((word) => `<span class="scatter-word">${word}</span>`)
  .join(" ");

const words5 = scatterText.querySelectorAll(".scatter-word");

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
   COLOR FILL
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
   SCALE
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

tl7.to(".scale-text", {
  scale: 4,

  letterSpacing: "0.15em",

  duration: 1,

  ease: "none",
});

tl7.to(".scale-text", {
  scale: 12,

  opacity: 0,

  duration: 1,

  ease: "none",
});

/* =========================================================
   SECTION 8
   HORIZONTAL
========================================================= */

const section8 = document.querySelector(".section-eight");

const track8 = document.querySelector(".horizontal-track");

const getHorizontalDistance = () => {
  return Math.max(0, track8.scrollWidth - window.innerWidth);
};

const tl8 = gsap.timeline({
  scrollTrigger: {
    trigger: section8,

    start: "top top",

    end: () => `+=${Math.max(getHorizontalDistance(), window.innerHeight)}`,

    scrub: 1,

    pin: true,

    anticipatePin: 1,

    invalidateOnRefresh: true,
  },
});

tl8.to(track8, {
  x: () => -getHorizontalDistance(),

  duration: 1,

  ease: "none",
});

/* =========================================================
   SECTION 9
   SCRAMBLE
========================================================= */

const section9 = document.querySelector(".section-nine");

const scrambleText = document.querySelector(".scramble-text");

const finalText = scrambleText.dataset.text;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&?";

function updateScramble(progress) {
  let output = "";

  for (let i = 0; i < finalText.length; i++) {
    const originalCharacter = finalText[i];

    if (originalCharacter === " ") {
      output += " ";

      continue;
    }

    const revealPoint = i / finalText.length;

    if (progress >= revealPoint) {
      output += originalCharacter;
    } else {
      const randomIndex = Math.floor(Math.random() * characters.length);

      output += characters[randomIndex];
    }
  }

  scrambleText.textContent = output;
}

const scrambleProgress = {
  value: 0,
};

const tl9 = gsap.timeline({
  scrollTrigger: {
    trigger: section9,

    start: "top top",

    end: "+=1600",

    scrub: 0.5,

    pin: true,

    anticipatePin: 1,
  },
});

tl9.to(scrambleProgress, {
  value: 1,

  duration: 3,

  ease: "none",

  onUpdate() {
    updateScramble(scrambleProgress.value);
  },
});

tl9.to(scrambleText, {
  letterSpacing: "0.08em",

  scale: 1.05,

  duration: 1,

  ease: "none",
});

tl9.to(
  ".scramble-label",
  {
    opacity: 0,

    y: -20,

    duration: 0.5,

    ease: "none",
  },
  "<",
);

updateScramble(0);

/* =========================================================
   SECTION 10
========================================================= */

gsap.set(".word-create", {
  xPercent: -150,

  rotation: -10,

  opacity: 0,
});

gsap.set(".word-move", {
  yPercent: 150,

  scale: 0.4,

  opacity: 0,
});

gsap.set(".word-inspire", {
  xPercent: 150,

  rotation: 10,

  opacity: 0,
});

const tl10 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-ten",

    start: "top top",

    end: "+=3000",

    scrub: 0.6,

    pin: true,

    anticipatePin: 1,
  },
});

tl10.to(".word-create", {
  xPercent: 0,

  rotation: 0,

  opacity: 1,

  duration: 1,

  ease: "none",
});

tl10.to(".word-move", {
  yPercent: 0,

  scale: 1,

  opacity: 1,

  duration: 1,

  ease: "none",
});

tl10.to(
  ".word-create",
  {
    yPercent: -110,

    scale: 0.7,

    duration: 1,

    ease: "none",
  },
  "<",
);

tl10.to(".word-inspire", {
  xPercent: 0,

  rotation: 0,

  opacity: 1,

  duration: 1,

  ease: "none",
});

tl10.to(
  ".word-move",
  {
    yPercent: -110,

    scale: 0.7,

    duration: 1,

    ease: "none",
  },
  "<",
);

tl10.to(
  ".word-create",
  {
    yPercent: -220,

    scale: 0.45,

    opacity: 0.5,

    duration: 1,

    ease: "none",
  },
  "<",
);

tl10.to(".finale-word", {
  xPercent: 0,

  yPercent: 0,

  scale: 1,

  rotation: 0,

  opacity: 1,

  duration: 1.2,

  ease: "none",
});

tl10.to(
  {},
  {
    duration: 0.5,
  },
);

tl10.to(".word-create", {
  xPercent: -170,

  yPercent: -120,

  rotation: -25,

  scale: 2,

  opacity: 0,

  duration: 1.5,

  ease: "none",
});

tl10.to(
  ".word-move",
  {
    yPercent: 180,

    rotation: 20,

    scale: 3,

    opacity: 0,

    duration: 1.5,

    ease: "none",
  },
  "<",
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

    ease: "none",
  },
  "<",
);

/* =========================================================
   SECTION 11
========================================================= */

gsap.set(".slice-1", {
  xPercent: -120,
});

gsap.set(".slice-2", {
  xPercent: 120,
});

gsap.set(".slice-3", {
  xPercent: -120,
});

gsap.set(".slice-4", {
  xPercent: 120,
});

const tl11 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-eleven",

    start: "top top",

    end: "+=2400",

    scrub: 0.6,

    pin: true,

    anticipatePin: 1,
  },
});

tl11.to(".slice", {
  xPercent: 0,

  duration: 1,

  ease: "none",
});

tl11.to(
  {},
  {
    duration: 0.5,
  },
);

tl11.to(".slice h2", {
  letterSpacing: "0.05em",

  duration: 0.8,

  ease: "none",
});

tl11.to(".slice-1", {
  yPercent: -200,

  duration: 1,

  ease: "none",
});

tl11.to(
  ".slice-2",
  {
    yPercent: -100,

    duration: 1,

    ease: "none",
  },
  "<",
);

tl11.to(
  ".slice-3",
  {
    yPercent: 100,

    duration: 1,

    ease: "none",
  },
  "<",
);

tl11.to(
  ".slice-4",
  {
    yPercent: 200,

    duration: 1,

    ease: "none",
  },
  "<",
);

tl11.to(
  ".slice",
  {
    opacity: 0,

    duration: 0.5,

    ease: "none",
  },
  "<+=0.4",
);

/* =========================================================
   SECTION 12
   LIQUID FILL
========================================================= */

gsap.set(".water-liquid", {
  yPercent: 105,
});

const tl12 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-twelve",

    start: "top top",

    end: "+=2200",

    scrub: 0.6,

    pin: true,

    anticipatePin: 1,
  },
});

tl12.to(".water-liquid", {
  yPercent: 0,

  duration: 3,

  ease: "none",
});

tl12.to(
  {},
  {
    duration: 0.5,
  },
);

tl12.to(".water-word", {
  scale: 1.08,

  duration: 0.8,

  ease: "none",
});

tl12.to(
  ".water-label",
  {
    opacity: 0,

    y: -20,

    duration: 0.5,

    ease: "none",
  },
  "<",
);

/* =========================================================
   SECTION 13
   MAGNETIC WORDS
========================================================= */

const magneticText = document.querySelector(".magnetic-text");

const magneticWords = gsap.utils.toArray(".magnetic-word");

const scatterPositions = [
  {
    x: -400,
    y: -180,
    rotation: -15,
    scale: 0.8,
  },

  {
    x: 320,
    y: -220,
    rotation: 12,
    scale: 1.2,
  },

  {
    x: -350,
    y: 160,
    rotation: 18,
    scale: 0.7,
  },

  {
    x: 380,
    y: 140,
    rotation: -12,
    scale: 1.1,
  },

  {
    x: -100,
    y: 250,
    rotation: -20,
    scale: 0.6,
  },

  {
    x: 280,
    y: 260,
    rotation: 16,
    scale: 0.9,
  },
];

magneticWords.forEach((word, index) => {
  gsap.set(word, {
    x: scatterPositions[index].x,

    y: scatterPositions[index].y,

    rotation: scatterPositions[index].rotation,

    scale: scatterPositions[index].scale,

    opacity: 0.4,
  });
});

const tl13 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-thirteen",

    start: "top top",

    end: "+=2600",

    scrub: 0.6,

    pin: true,

    anticipatePin: 1,

    invalidateOnRefresh: true,
  },
});

/* MOVE CLOSER */

tl13.to(magneticWords, {
  x: (index) => scatterPositions[index].x * 0.5,

  y: (index) => scatterPositions[index].y * 0.5,

  rotation: (index) => scatterPositions[index].rotation * 0.4,

  opacity: 0.7,

  duration: 1,

  ease: "none",
});

/* COLLIDE */

tl13.to(magneticWords, {
  x: 0,

  y: 0,

  rotation: 0,

  scale: 1,

  opacity: 1,

  duration: 1.5,

  stagger: 0.08,

  ease: "none",
});

/* HOLD */

tl13.to(
  {},
  {
    duration: 0.4,
  },
);

/* =========================================================
   FORM SENTENCE

   We calculate each word's final center relative to the
   center of .magnetic-text instead of using xPercent.
========================================================= */

function getMagneticFinalX(word) {
  const percent = parseFloat(
    getComputedStyle(word).getPropertyValue("--final-x"),
  );

  const containerWidth = magneticText.clientWidth;

  const target = containerWidth * (percent / 100);

  return target - containerWidth / 2 + word.offsetWidth / 2;
}

tl13.to(magneticWords, {
  x: (index, word) => getMagneticFinalX(word),

  y: 0,

  rotation: 0,

  scale: 1,

  opacity: 1,

  duration: 1.5,

  ease: "none",
});

/* LABEL */

tl13.to(
  ".magnetic-label",
  {
    opacity: 0,

    y: -20,

    duration: 0.5,

    ease: "none",
  },
  "<",
);

/* FINAL EXPANSION */

tl13.to(magneticWords, {
  letterSpacing: "0.01em",

  duration: 1,

  ease: "none",
});

const chrome = document.querySelector(".chrome-text");

chrome.addEventListener("mousemove", (e) => {
  const rect = chrome.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  // Update the highlight position
  chrome.style.setProperty("--mx", `${x}%`);
  chrome.style.setProperty("--my", `${y}%`);

  // Smooth tilt
  gsap.to(chrome, {
    rotateY: gsap.utils.mapRange(0, 100, -12, 12, x),
    rotateX: gsap.utils.mapRange(0, 100, 8, -8, y),

    scale: 1.03,

    duration: 0.25,

    ease: "power2.out",
  });
});

chrome.addEventListener("mouseleave", () => {
  chrome.style.setProperty("--mx", "50%");
  chrome.style.setProperty("--my", "50%");

  gsap.to(chrome, {
    rotateX: 0,
    rotateY: 0,

    scale: 1,

    duration: 0.5,

    ease: "power3.out",
  });
});

/* =========================================================
   SECTION 15
   TYPOGRAPHY WAVE
========================================================= */

const waveText = document.querySelector(".wave-text");

const original = waveText.textContent;

waveText.innerHTML = "";

[...original].forEach(letter=>{

    if(letter===" "){

        waveText.innerHTML+=" ";

        return;

    }

    waveText.innerHTML+=`
        <span class="wave-char">${letter}</span>
    `;

});

const chars = gsap.utils.toArray(".wave-char");

const tl15 = gsap.timeline({

    scrollTrigger:{

        trigger:".section-fifteen",

        start:"top top",

        end:"+=2200",

        scrub:1,

        pin:true,

        anticipatePin:1

    }

});


chars.forEach((char,index)=>{

    tl15.to(char,{

        y:-120,

        scale:1.25,

        rotation:15,

        duration:.25,

        ease:"none"

    },index*0.05)

    .to(char,{

        y:0,

        scale:1,

        rotation:0,

        duration:.25,

        ease:"none"

    });

});

/* =========================================================
   SECTION 16
========================================================= */

gsap.set(".zoom-text",{

    scale:.02,

    opacity:0,

    z:-3000

});

const tl16 = gsap.timeline({

    scrollTrigger:{

        trigger:".section-sixteen",

        start:"top top",

        end:"+=2600",

        scrub:1,

        pin:true,

        anticipatePin:1

    }

});


/* FAR AWAY */

tl16.to(".zoom-text",{

    opacity:1,

    scale:.3,

    z:-1000,

    duration:1,

    ease:"none"

});


/* CAMERA REACHES TEXT */

tl16.to(".zoom-text",{

    scale:1,

    z:0,

    duration:1,

    ease:"none"

});


/* TEXT PASSES CAMERA */

tl16.to(".zoom-text",{

    scale:9,

    letterSpacing:"0.15em",

    opacity:0,

    duration:1,

    ease:"none"

});

/* =========================================================
   SECTION 17
   TYPOGRAPHY EXPLOSION
========================================================= */

const explodeHeading = document.querySelector(".explode-text");

const explodeValue = explodeHeading.textContent;

explodeHeading.innerHTML = "";

[...explodeValue].forEach(letter=>{

    if(letter===" "){

        explodeHeading.innerHTML+=" ";

        return;

    }

    explodeHeading.innerHTML+=`
        <span class="explode-char">${letter}</span>
    `;

});

const chars17 = gsap.utils.toArray(".explode-char");

/* ----------------------------------------
   Store radial direction for every letter
---------------------------------------- */

chars17.forEach((char,index)=>{

    const total = chars17.length;

    const progress = index/(total-1);

    const angle = gsap.utils.mapRange(
        0,
        1,
        -140,
        140,
        progress
    );

    char.dataset.angle = angle;

});

const tl17 = gsap.timeline({

    scrollTrigger:{

        trigger:".section-seventeen",

        start:"top top",

        end:"+=2800",

        scrub:1,

        pin:true,

        anticipatePin:1

    }

});


/* =====================================================
   SHAKE
===================================================== */

tl17.to(".explode-text",{

    x:4,

    duration:.05,

    repeat:10,

    yoyo:true,

    ease:"none"

});


/* =====================================================
   EXPLOSION
===================================================== */

chars17.forEach(char=>{

    const angle = Number(char.dataset.angle);

    const distance = gsap.utils.random(350,900);

    const x = Math.cos(angle*Math.PI/180)*distance;

    const y = Math.sin(angle*Math.PI/180)*distance;

    tl17.to(char,{

        x,

        y,

        z:gsap.utils.random(-1200,1200),

        rotation:gsap.utils.random(-720,720),

        scale:gsap.utils.random(.2,2),

        opacity:0,

        filter:"blur(8px)",

        duration:1.2,

        ease:"none"

    },">");

});

/* =====================================================
   HOLD
===================================================== */

tl17.to({},{

    duration:.5

});


/* =====================================================
   REBUILD
===================================================== */

tl17.to(".explode-char",{

    x:0,

    y:0,

    z:0,

    rotation:0,

    scale:1,

    opacity:1,

    filter:"blur(0px)",

    stagger:.04,

    duration:1.2,

    ease:"none"

});

/* =========================================================
   SECTION 18
   TYPOGRAPHY VORTEX
========================================================= */

const vortexHeading = document.querySelector(".vortex-text");

const vortexValue = vortexHeading.textContent;

vortexHeading.innerHTML = "";

[...vortexValue].forEach(letter=>{

    if(letter===" "){

        vortexHeading.innerHTML+=" ";

        return;

    }

    vortexHeading.innerHTML+=`
        <span class="vortex-char">${letter}</span>
    `;

});

const vortexChars = gsap.utils.toArray(".vortex-char");

const tl18 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-eighteen",

    start: "top top",

    end: "+=3200",

    scrub: 1,

    pin: true,

    anticipatePin: 1,
  },
});

/* ============================================
   STAGE 1
   Letters spread slightly
============================================ */

vortexChars.forEach((char, index) => {
  const offset = index - (vortexChars.length - 1) / 2;

  tl18.to(
    char,
    {
      x: offset * 40,

      duration: 0.5,

      ease: "none",
    },
    0,
  );
});

/* ============================================
   STAGE 2
   Spiral inward
============================================ */

vortexChars.forEach((char,index)=>{

    const angle=index*40;

    const radius=300+(index*25);

    const x=Math.cos(angle*Math.PI/180)*radius;
    const y=Math.sin(angle*Math.PI/180)*radius;

    tl18.to(char,{

        x,

        y,

        rotation:720,

        scale:.6,

        opacity:.8,

        duration:1

    },1);

});

/* ============================================
   STAGE 3
   Collapse to center
============================================ */

vortexChars.forEach((char,index)=>{

    tl18.to(char,{

        x:0,

        y:0,

        scale:0,

        rotation:1440,

        opacity:0,

        filter:"blur(10px)",

        duration:1,

        ease:"none"

    },2);

});


/* ============================================
   STAGE 4
   Tiny black hole pulse
============================================ */

tl18.to(".vortex-stage",{

    scale:1.08,

    duration:.4,

    ease:"none"

});

tl18.to(".vortex-stage",{

    scale:1,

    duration:.4,

    ease:"none"

});

/* =========================================================
   SECTION 19
========================================================= */

const tunnelWords = gsap.utils.toArray(".tunnel-word");

/* place words in 3D */

tunnelWords.forEach((word,index)=>{

    gsap.set(word,{

        z:-index*1400,

        opacity:0,

        scale:0.6,

        filter:"blur(10px)"

    });

});

const tl19 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-nineteen",

    start: "top top",

    end: "+=5000",

    scrub: 1,

    pin: true,

    anticipatePin: 1,
  },
});

tunnelWords.forEach((word, index) => {
  tl19.to(
    word,
    {
      z: 1200,

      opacity: 1,

      scale: 1,

      filter: "blur(0px)",

      duration: 1,

      ease: "none",
    },
    0,
  );
});
/* =========================================================
   SECTION 19
   TYPOGRAPHY TUNNEL
========================================================= */

const tunnel = document.querySelector(".tunnel");

const tunnelWords = gsap.utils.toArray(".tunnel-word");

/* -------------------------------------------------
   Position every word in 3D space
------------------------------------------------- */

const spacing = 1800;

tunnelWords.forEach((word,index)=>{

    gsap.set(word,{

        z:-index*spacing,

        opacity:0.2,

        scale:0.4,

        filter:"blur(10px)"

    });

});


/* -------------------------------------------------
   CAMERA MOVEMENT
------------------------------------------------- */

const tl19 = gsap.timeline({

    scrollTrigger:{

        trigger:".section-nineteen",

        start:"top top",

        end:`+=${spacing*(tunnelWords.length+1)}`,

        scrub:1,

        pin:true,

        anticipatePin:1

    }

});


/* Camera flies through tunnel */

tl19.to(tunnel,{

    z:spacing*(tunnelWords.length-1),

    ease:"none"

},0);


/* -------------------------------------------------
   Each word reacts when camera reaches it
------------------------------------------------- */

tunnelWords.forEach((word,index)=>{

    tl19.to(word,{

        opacity:1,

        scale:1,

        filter:"blur(0px)",

        duration:.25,

        ease:"none"

    },index);

    tl19.to(word,{

        scale:1.12,

        duration:.15,

        ease:"power1.out"

    },index+.18);

    tl19.to(word,{

        opacity:0,

        scale:2,

        filter:"blur(18px)",

        duration:.35,

        ease:"none"

    },index+.45);

});

/* =========================================================
   SECTION 20
========================================================= */

const sentences=[

"DESIGN",

"CREATE",

"ANIMATE",

"INSPIRE",

"BUILD THE FUTURE."

];

const typed=document.querySelector(".typed-text");

const state={progress:0};

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section-twenty",

      start: "top top",

      end: "+=6000",

      scrub: 1,

      pin: true,

      anticipatePin: 1,
    },
  })

  .to(state, {
    progress: 1,

    ease: "none",

    onUpdate() {
      const totalCharacters = sentences.join("").length;

      const value = Math.floor(state.progress * totalCharacters * 2);

      let count = value;

      let output = "";

      for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i];

        if (count <= sentence.length) {
          output = sentence.substring(0, count);

          break;
        }

        count -= sentence.length;
      }

      typed.textContent = output;
    },
  });

/* =========================================================
   SECTION 21
   TIDE WAVE
========================================================= */

const tideText=document.querySelector(".tide-text");

const tideValue=tideText.textContent;

tideText.innerHTML="";

[...tideValue].forEach(letter=>{

    if(letter===" "){

        tideText.innerHTML+=" ";

        return;

    }

    tideText.innerHTML+=`
        <span class="tide-char">${letter}</span>
    `;

});

const tideChars = gsap.utils.toArray(".tide-char");

const tl21 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-twentyone",

    start: "top top",

    end: "+=2500",

    scrub: 1,

    pin: true,

    anticipatePin: 1,
  },
});

tideChars.forEach((char, index) => {
  tl21
    .to(
      char,
      {
        y: -90,

        rotation: 8,

        scale: 1.15,

        duration: 0.3,

        ease: "none",
      },
      index * 0.08,
    )

    .to(char, {
      y: 0,

      rotation: 0,

      scale: 1,

      duration: 0.3,

      ease: "none",
    });
});

/* =========================================================
   SECTION 22
   GRAVITY TYPOGRAPHY
========================================================= */

const gravityText = document.querySelector(".gravity-text");

const gravityValue = gravityText.textContent.trim();

gravityText.innerHTML = "";

[...gravityValue].forEach((letter) => {

    const span = document.createElement("span");

    span.className = "gravity-char";
    span.textContent = letter;

    gravityText.appendChild(span);

});

const gravityChars = gsap.utils.toArray(".gravity-char");


/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(gravityChars, {
    y: 0,
    rotation: 0,
    scale: 1,
    opacity: 1
});

/* =========================================================
   SECTION TIMELINE
========================================================= */

const tl22 = gsap.timeline({

    scrollTrigger: {

        trigger: ".section-twenty-two",

        start: "top top",

        end: "+=2800",

        scrub: 0.8,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});

/* =========================================================
   PHASE 1
   GRAVITY STARTS
========================================================= */

gravityChars.forEach((char, index) => {

    const direction = index % 2 === 0 ? 1 : -1;

    tl22.to(
        char,
        {
            y: 100 + index * 35,

            rotation: direction * (8 + index * 2),

            scale: 0.95,

            duration: 0.7,

            ease: "power2.in"
        },
        index * 0.08
    );

});


/* =========================================================
   PHASE 2
   HEAVY FALL
========================================================= */

gravityChars.forEach((char, index) => {

    const direction = index % 2 === 0 ? 1 : -1;

    tl22.to(
        char,
        {
            y: 300 + index * 55,

            rotation: direction * (25 + index * 4),

            scale: 0.85,

            duration: 0.8,

            ease: "power2.in"
        },
        0.9 + index * 0.05
    );

});


/* =========================================================
   PHASE 3
   FLOAT / ORBIT
========================================================= */

gravityChars.forEach((char, index) => {

    const direction = index % 2 === 0 ? 1 : -1;

    tl22.to(
        char,
        {
            y: direction * (100 + index * 25),

            rotation: direction * 45,

            scale: 0.8,

            opacity: 0.75,

            duration: 0.9,

            ease: "power1.inOut"
        },
        1.8 + index * 0.05
    );

});


/* =========================================================
   PHASE 4
   GRAVITY RELEASE
========================================================= */

tl22.to(
    gravityChars,
    {
        y: 0,

        rotation: 0,

        scale: 1,

        opacity: 1,

        duration: 1.2,

        stagger: {
            each: 0.06,
            from: "center"
        },

        ease: "elastic.out(1, 0.6)"
    }
);

/* =========================================================
   SECTION 23
   GLASS REFRACTION
========================================================= */

const glassSection = document.querySelector(
    ".section-twenty-three"
);

const glassText = document.querySelector(
    ".glass-text"
);

const glassLens = document.querySelector(
    ".glass-lens"
);


/* =========================================================
   TIMELINE
========================================================= */

const tl23 = gsap.timeline({

    scrollTrigger: {

        trigger: glassSection,

        start: "top top",

        end: "+=2600",

        scrub: 0.8,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});

/* =========================================================
   LENS ENTERS
========================================================= */

tl23.to(glassLens, {

    left: "15%",

    opacity: 1,

    duration: 1,

    ease: "none"

});


/* =========================================================
   REFRACTION STARTS
========================================================= */

tl23.to(glassText, {

    x: 20,

    scaleX: 1.04,

    filter: "blur(1px)",

    duration: 0.6,

    ease: "none"

});


/* =========================================================
   LENS MOVES THROUGH TEXT
========================================================= */

tl23.to(glassLens, {

    left: "50%",

    scaleX: 1.25,

    duration: 1,

    ease: "none"

});


tl23.to(glassText, {

    x: -20,

    scaleX: 1.08,

    filter: "blur(2px)",

    duration: 1,

    ease: "none"

}, "<");


/* =========================================================
   STRONGEST REFRACTION
========================================================= */

tl23.to(glassLens, {

    left: "75%",

    scaleX: .9,

    duration: 1,

    ease: "none"

});


tl23.to(glassText, {

    x: 25,

    scaleX: 1.03,

    filter: "blur(1px)",

    duration: 1,

    ease: "none"

}, "<");


/* =========================================================
   LENS EXITS
========================================================= */

tl23.to(glassLens, {

    left: "125%",

    opacity: 0,

    duration: 1,

    ease: "none"

});

/* =========================================================
   TEXT RETURNS TO NORMAL
========================================================= */

tl23.to(glassText, {

    x: 0,

    scaleX: 1,

    filter: "blur(0px)",

    duration: 1,

    ease: "none"

}, "<");

/* =========================================================
   SECTION 24
   TYPOGRAPHY COLLAPSE
========================================================= */

const collapseText = document.querySelector(".collapse-text");
const collapsePoint = document.querySelector(".collapse-point");

const collapseValue = collapseText.textContent.trim();

collapseText.innerHTML = "";


/* =========================================================
   SPLIT TEXT INTO CHARACTERS
========================================================= */

[...collapseValue].forEach((letter) => {

    const char = document.createElement("span");

    char.className = "collapse-char";
    char.textContent = letter;

    collapseText.appendChild(char);

});


const collapseChars = gsap.utils.toArray(
    ".collapse-char"
);

/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(collapsePoint, {
    scale: 0,
    opacity: 0
});


/* =========================================================
   TIMELINE
========================================================= */

const tl24 = gsap.timeline({

    scrollTrigger: {

        trigger: ".section-twenty-four",

        start: "top top",

        end: "+=3000",

        scrub: 0.8,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});

/* =========================================================
   PHASE 1
   WORD SPREADS
========================================================= */

tl24.to(collapseChars, {

    letterSpacing: "0.02em",

    duration: 1,

    stagger: 0.04,

    ease: "none"

});


/* =========================================================
   PHASE 2
   LETTERS MOVE TOWARD CENTER
========================================================= */

collapseChars.forEach((char) => {

    const rect = char.getBoundingClientRect();

    const charCenter =
        rect.left + rect.width / 2;

    const viewportCenter =
        window.innerWidth / 2;

    const distance =
        viewportCenter - charCenter;

    tl24.to(
        char,
        {

            x: distance,

            y: gsap.utils.random(-40, 40),

            scale: 0.7,

            rotation: gsap.utils.random(-8, 8),

            duration: 1,

            ease: "power2.inOut"

        },
        1
    );

});


/* =========================================================
   PHASE 3
   COLLAPSE INTO POINT
========================================================= */

tl24.to(
    collapseChars,
    {

        x: 0,

        y: 0,

        scale: 0,

        rotation: 0,

        opacity: 0,

        filter: "blur(10px)",

        duration: 1.2,

        stagger: 0.03,

        ease: "power3.in"

    }
);

/* =========================================================
   PHASE 4
   POINT APPEARS
========================================================= */

tl24.to(
    collapsePoint,
    {

        scale: 1,

        opacity: 1,

        duration: 0.4,

        ease: "power3.out"

    }
);


/* =========================================================
   PHASE 5
   SMALL HOLD
========================================================= */

tl24.to({}, {

    duration: 0.5

});


/* =========================================================
   PHASE 6
   POINT EXPANDS
========================================================= */

tl24.to(
    collapsePoint,
    {

        scale: 20,

        opacity: 0,

        duration: 0.8,

        ease: "power3.in"

    }
);

/* =========================================================
   SECTION 25
   LIQUID DISTORTION
========================================================= */

const liquidText = document.querySelector(".liquid-text");

const liquidValue = liquidText.textContent.trim();

liquidText.innerHTML = "";


/* =========================================================
   SPLIT INTO CHARACTERS
========================================================= */

[...liquidValue].forEach((letter) => {

    const char = document.createElement("span");

    char.className = "liquid-char";
    char.textContent = letter;

    liquidText.appendChild(char);

});

const liquidChars = gsap.utils.toArray(".liquid-char");

/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(liquidChars, {
  x: 0,
  y: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  opacity: 1,
  filter: "blur(0px)",
});

/* =========================================================
   TIMELINE
========================================================= */

const tl25 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-twenty-five",

    start: "top top",

    end: "+=2800",

    scrub: 0.8,

    pin: true,

    anticipatePin: 1,

    // markers: true
  },
});

/* =========================================================
   PHASE 1
   WAVE STARTS FROM LEFT
========================================================= */

liquidChars.forEach((char, index) => {

    const phase = index * 0.12;

    tl25.to(
        char,
        {

            y: -70,

            rotation: 8,

            scaleX: 1.15,

            scaleY: 0.9,

            skewX: 8,

            filter: "blur(1px)",

            duration: 0.35,

            ease: "power2.inOut"

        },
        phase
    );

});

/* =========================================================
   PHASE 2
   STRONG LIQUID STRETCH
========================================================= */

liquidChars.forEach((char, index) => {

    const phase = 0.8 + index * 0.12;

    tl25.to(
        char,
        {

            y: 45,

            rotation: -10,

            scaleX: 1.45,

            scaleY: 0.72,

            skewX: -14,

            filter: "blur(2px)",

            duration: 0.45,

            ease: "power2.inOut"

        },
        phase
    );

});

/* =========================================================
   PHASE 3
   LIQUID WAVE PASSES
========================================================= */

liquidChars.forEach((char, index) => {

    const phase = 1.6 + index * 0.12;

    tl25.to(
        char,
        {

            y: -25,

            rotation: 5,

            scaleX: 1.2,

            scaleY: 0.85,

            skewX: 7,

            filter: "blur(1px)",

            duration: 0.4,

            ease: "power2.inOut"

        },
        phase
    );

});


/* =========================================================
   PHASE 4
   SNAP BACK TO NORMAL
========================================================= */

tl25.to(liquidChars, {

    x: 0,
    y: 0,

    rotation: 0,

    scaleX: 1,
    scaleY: 1,

    skewX: 0,

    opacity: 1,

    filter: "blur(0px)",

    duration: 1.2,

    stagger: 0.04,

    ease: "power3.out"

});



/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
