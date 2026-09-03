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
   SECTION 26
   MECHANICAL TYPOGRAPHY
========================================================= */

const mechanicalText =
    document.querySelector(".mechanical-text");

const mechanicalValue =
    mechanicalText.textContent.trim();

mechanicalText.innerHTML = "";

/* =========================================================
   SPLIT INTO CHARACTERS
========================================================= */

[...mechanicalValue].forEach((letter) => {

    const char = document.createElement("span");

    char.className = "mechanical-char";
    char.textContent = letter;

    mechanicalText.appendChild(char);

});


const mechanicalChars =
    gsap.utils.toArray(".mechanical-char");



/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(mechanicalChars, {

    y: 180,

    rotationX: 90,

    rotationY: 0,

    rotationZ: 0,

    scale: .8,

    opacity: .2

});


/* =========================================================
   TIMELINE
========================================================= */

const tl26 = gsap.timeline({

    scrollTrigger: {

        trigger: ".section-twenty-six",

        start: "top top",

        end: "+=3000",

        scrub: .8,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});

/* =========================================================
   PHASE 1
   MECHANISM STARTS
========================================================= */

tl26.to(mechanicalChars, {

    y: 0,

    rotationX: 0,

    scale: 1,

    opacity: 1,

    duration: 1.2,

    stagger: {

        each: .08,

        from: "center"

    },

    ease: "power3.out"

});

/* =========================================================
   PHASE 2
   MECHANICAL ROTATION
========================================================= */

mechanicalChars.forEach((char, index) => {

    const direction =
        index % 2 === 0 ? 1 : -1;

    tl26.to(
        char,
        {

            rotationY: direction * 18,

            y: direction * 12,

            scaleX: 1.04,

            duration: .5,

            ease: "power2.inOut"

        },
        1.2 + index * .04
    );

});

/* =========================================================
   PHASE 3
   RETURN / LOCK
========================================================= */

tl26.to(mechanicalChars, {

    rotationY: 0,

    y: 0,

    scaleX: 1,

    duration: .8,

    stagger: {

        each: .05,

        from: "edges"

    },

    ease: "power3.out"

});

/* =========================================================
   PHASE 4
   SMALL PRECISION SNAP
========================================================= */

tl26.to(mechanicalChars, {

    y: -4,

    duration: .25,

    stagger: .03,

    ease: "power2.out"

});


tl26.to(mechanicalChars, {

    y: 0,

    duration: .25,

    stagger: .03,

    ease: "power2.in"

});

/* =========================================================
   SECTION 27
   FLOATING / DREAMY TYPOGRAPHY
========================================================= */

const floatingText =
    document.querySelector(".floating-text");

const floatingValue =
    floatingText.textContent.trim();

floatingText.innerHTML = "";


/* =========================================================
   SPLIT INTO CHARACTERS
========================================================= */

[...floatingValue].forEach((letter) => {

    const char = document.createElement("span");

    char.className = "floating-char";
    char.textContent = letter;

    floatingText.appendChild(char);

});


const floatingChars =
    gsap.utils.toArray(".floating-char");

/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(floatingChars, {

    y: 120,

    x: 0,

    rotation: 0,

    rotationX: 25,

    scale: .85,

    opacity: 0,

    filter: "blur(12px)"

});

/* =========================================================
   TIMELINE
========================================================= */

const tl27 = gsap.timeline({

    scrollTrigger: {

        trigger: ".section-twenty-seven",

        start: "top top",

        end: "+=2800",

        scrub: .8,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});

/* =========================================================
   PHASE 1
   TEXT EMERGES FROM MIST
========================================================= */

tl27.to(floatingChars, {

    y: 0,

    rotationX: 0,

    scale: 1,

    opacity: 1,

    filter: "blur(0px)",

    duration: 1.3,

    stagger: {

        each: .08,

        from: "center"

    },

    ease: "power3.out"

});

/* =========================================================
   PHASE 2
   FLOATING MOVEMENT
========================================================= */

floatingChars.forEach((char, index) => {

    const direction =
        index % 2 === 0 ? 1 : -1;

    tl27.to(
        char,
        {

            y: direction * (35 + index * 8),

            x: direction * (15 + index * 5),

            rotation:
                direction * (3 + index),

            rotationZ:
                direction * 2,

            scale:
                1 + index * .015,

            duration: .9,

            ease: "sine.inOut"

        },
        1.3 + index * .04
    );

});

/* =========================================================
   PHASE 3
   WAVE THROUGH TEXT
========================================================= */

floatingChars.forEach((char, index) => {

    const direction =
        index % 2 === 0 ? -1 : 1;

    tl27.to(
        char,
        {

            y: direction * 55,

            x: direction * 25,

            rotation:
                direction * 5,

            duration: .7,

            ease: "sine.inOut"

        },
        2.2 + index * .06
    );

});

/* =========================================================
   PHASE 4
   SETTLE
========================================================= */

tl27.to(floatingChars, {

    x: 0,

    y: 0,

    rotation: 0,

    rotationZ: 0,

    scale: 1,

    duration: 1.1,

    stagger: {

        each: .05,

        from: "center"

    },

    ease: "power2.out"

});

/* =========================================================
   SECTION 28
   NEON POWER ON
========================================================= */

const neonText =
    document.querySelector(".neon-text");

const neonValue =
    neonText.textContent.trim();

neonText.innerHTML = "";


/* =========================================================
   SPLIT TEXT
========================================================= */

[...neonValue].forEach((letter) => {

    const char = document.createElement("span");

    char.className = "neon-char";
    char.textContent = letter;

    neonText.appendChild(char);

});


const neonChars =
    gsap.utils.toArray(".neon-char");


/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(neonChars, {

    opacity: .08,

    color: "#111",

    scale: .95,

    filter: "brightness(.3)"

});


/* =========================================================
   TIMELINE
========================================================= */

const tl28 = gsap.timeline({

    scrollTrigger: {

        trigger: ".section-twenty-eight",

        start: "top top",

        end: "+=2800",

        scrub: .8,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});


/* =========================================================
   PHASE 1
   LETTERS POWER ON
========================================================= */

neonChars.forEach((char, index) => {

    tl28.to(
        char,
        {

            opacity: 1,

            color: "#ffffff",

            scale: 1,

            filter: "brightness(1.5)",

            textShadow:
                "0 0 5px rgba(255,255,255,.9), " +
                "0 0 20px rgba(255,255,255,.8), " +
                "0 0 50px rgba(255,255,255,.5)",

            duration: .35,

            ease: "power2.out"

        },
        index * .18
    );


    /* brief flicker */

    tl28.to(
        char,
        {

            opacity: .35,

            filter: "brightness(.8)",

            duration: .08,

            ease: "none"

        }
    );


    tl28.to(
        char,
        {

            opacity: 1,

            filter: "brightness(1.2)",

            duration: .08,

            ease: "none"

        }
    );

});


/* =========================================================
   PHASE 2
   FULL NEON POWER
========================================================= */

tl28.to(neonChars, {

    color: "#ffffff",

    opacity: 1,

    filter: "brightness(1)",

    textShadow:
        "0 0 4px rgba(255,255,255,.95), " +
        "0 0 15px rgba(255,255,255,.85), " +
        "0 0 35px rgba(255,255,255,.65), " +
        "0 0 80px rgba(255,255,255,.35)",

    duration: .8,

    stagger: .03,

    ease: "power2.out"

});

/* =========================================================
   PHASE 3
   ELECTRIC PULSE
========================================================= */

tl28.to(neonChars, {

    filter: "brightness(2)",

    scale: 1.025,

    duration: .2,

    stagger: .025,

    ease: "power2.out"

});


tl28.to(neonChars, {

    filter: "brightness(1)",

    scale: 1,

    duration: .3,

    stagger: .025,

    ease: "power2.inOut"

});


/* =========================================================
   PHASE 4
   SETTLE
========================================================= */

tl28.to(neonChars, {

    textShadow:
        "0 0 3px rgba(255,255,255,.8), " +
        "0 0 12px rgba(255,255,255,.45), " +
        "0 0 30px rgba(255,255,255,.2)",

    duration: 1,

    ease: "power2.out"

});

/* =========================================================
   SECTION 29
   WIREFRAME TYPOGRAPHY
========================================================= */

const wireframeSection =
    document.querySelector(".section-twenty-nine");

const wireframeSolid =
    document.querySelector(".wireframe-solid");

const wireframeOutline =
    document.querySelector(".wireframe-outline");


/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(wireframeSolid, {

    opacity: 1,

    scale: 1,

    rotationX: 0,

    y: 0,

    filter: "blur(0px)"

});


gsap.set(wireframeOutline, {

    opacity: 0,

    scale: .96,

    rotationX: 0,

    y: 0

});


/* =========================================================
   TIMELINE
========================================================= */

const tl29 = gsap.timeline({

    scrollTrigger: {

        trigger: wireframeSection,

        start: "top top",

        end: "+=3000",

        scrub: .8,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});


/* =========================================================
   PHASE 1
   OUTLINE EMERGES
========================================================= */

tl29.to(wireframeOutline, {

    opacity: 1,

    scale: 1,

    duration: 1,

    ease: "none"

});


/* =========================================================
   PHASE 2
   SOLID FADES
========================================================= */

tl29.to(wireframeSolid, {

    opacity: 0,

    scale: 1.04,

    filter: "blur(2px)",

    duration: 1,

    ease: "none"

}, "<");


/* =========================================================
   PHASE 3
   WIREFRAME EXPANDS
========================================================= */

tl29.to(wireframeOutline, {

    scale: 1.08,

    rotationX: 12,

    y: -20,

    duration: .8,

    ease: "none"

});


/* =========================================================
   PHASE 4
   DIGITAL STRETCH
========================================================= */

tl29.to(wireframeOutline, {

    scaleX: 1.25,

    scaleY: .9,

    rotationY: -8,

    duration: .8,

    ease: "none"

});


/* =========================================================
   PHASE 5
   LINE GRID APPEARS
========================================================= */

tl29.to(

    ".wireframe-stage::before",

    {

        scaleX: 1,

        duration: .5,

        ease: "none"

    }

);


/*
   Pseudo-elements cannot be animated directly by GSAP.
   Instead, animate the stage and use CSS variables.
*/

tl29.to(wireframeStage, {

    "--line-scale": 1,

    duration: .5,

    ease: "none"

});


/* =========================================================
   PHASE 6
   WIREFRAME BREAKS APART
========================================================= */

tl29.to(wireframeOutline, {

    scaleX: 1.5,

    scaleY: .7,

    rotationZ: 2,

    opacity: .55,

    filter: "blur(1px)",

    duration: .8,

    ease: "none"

});


/* =========================================================
   PHASE 7
   RECONSTRUCT
========================================================= */

tl29.to(wireframeOutline, {

    scale: 1,

    scaleX: 1,

    scaleY: 1,

    rotationX: 0,

    rotationY: 0,

    rotationZ: 0,

    y: 0,

    opacity: 1,

    filter: "blur(0px)",

    duration: 1,

    ease: "power2.out"

});


/* =========================================================
   PHASE 8
   SOLID RETURNS
========================================================= */

tl29.to(wireframeSolid, {

    opacity: 1,

    scale: 1,

    filter: "blur(0px)",

    duration: 1,

    ease: "power2.out"

}, "-=0.6");


/* OUTLINE FADES */

tl29.to(wireframeOutline, {

    opacity: 0,

    scale: .98,

    duration: .6,

    ease: "none"

}, "<");

/* =========================================================
   SECTION 30
   TYPOGRAPHY CONVERGENCE
========================================================= */

const convergenceSection =
    document.querySelector(".section-thirty");

const convergenceWords =
    gsap.utils.toArray(".convergence-word");

const finalStatement =
    document.querySelector(".final-statement");

const finalLines =
    gsap.utils.toArray(".final-statement span");


/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(finalStatement, {
    opacity: 0,
    scale: .7
});

gsap.set(finalLines, {
    y: 80,
    opacity: 0,
    filter: "blur(10px)"
});

/* =========================================================
   TIMELINE
========================================================= */

const tl30 = gsap.timeline({

    scrollTrigger: {

        trigger: convergenceSection,

        start: "top top",

        end: "+=3600",

        scrub: .8,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});


/* =========================================================
   PHASE 1
   SCATTERED WORDS BECOME ACTIVE
========================================================= */

tl30.to(convergenceWords, {

    scale: 1.15,

    opacity: 1,

    duration: .6,

    stagger: .05,

    ease: "power2.out"

});


/* =========================================================
   PHASE 2
   WORDS CONVERGE TOWARD CENTER
========================================================= */

convergenceWords.forEach((word) => {

    const rect =
        word.getBoundingClientRect();

    const centerX =
        window.innerWidth / 2;

    const centerY =
        window.innerHeight / 2;

    const wordX =
        rect.left + rect.width / 2;

    const wordY =
        rect.top + rect.height / 2;

    const x =
        centerX - wordX;

    const y =
        centerY - wordY;

    tl30.to(
        word,
        {

            x,
            y,

            rotation:
                gsap.utils.random(-8, 8),

            scale: .6,

            filter: "blur(2px)",

            duration: 1.2,

            ease: "power2.inOut"

        },
        1
    );

});

/* =========================================================
   PHASE 3
   EVERYTHING COLLIDES
========================================================= */

tl30.to(convergenceWords, {

    scale: .3,

    opacity: 0,

    filter: "blur(12px)",

    duration: .8,

    stagger: .03,

    ease: "power3.in"

});


/* =========================================================
   PHASE 4
   FINAL STATEMENT APPEARS
========================================================= */

tl30.to(finalStatement, {

    opacity: 1,

    scale: 1,

    duration: 1,

    ease: "power3.out"

});


/* =========================================================
   PHASE 5
   FINAL WORDS REVEAL
========================================================= */

tl30.to(finalLines, {

    y: 0,

    opacity: 1,

    filter: "blur(0px)",

    duration: 1,

    stagger: .12,

    ease: "power3.out"

});

/* =========================================================
   PHASE 6
   FINAL CINEMATIC SCALE
========================================================= */

tl30.to(finalStatement, {

    scale: .82,

    duration: 1.2,

    ease: "power2.inOut"

});

/* =========================================================
   SECTION 31
   FINAL IDENTITY REVEAL
========================================================= */

const identitySection =
    document.querySelector(".section-thirty-one");

const identityPoint =
    document.querySelector(".identity-point");

const identityContent =
    document.querySelector(".identity-content");

const identityName =
    document.querySelector(".identity-name");

const identityNameLines =
    gsap.utils.toArray(".identity-name span");

const identityRole =
    document.querySelector(".identity-role");

const identityLine =
    document.querySelector(".identity-line");

const identityCTA =
    document.querySelector(".identity-cta");

/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(identityPoint, {

    scale: 0,

    opacity: 0

});


gsap.set(identityContent, {

    scale: .8,

    opacity: 0

});


gsap.set(identityNameLines, {

    yPercent: 110,

    opacity: 0,

    filter: "blur(12px)"

});


gsap.set(identityRole, {

    y: 30,

    opacity: 0

});


gsap.set(identityCTA, {

    y: 30,

    opacity: 0

});
/* =========================================================
   TIMELINE
========================================================= */

const tl31 = gsap.timeline({

    scrollTrigger: {

        trigger: identitySection,

        start: "top top",

        end: "+=3000",

        scrub: .8,

        pin: true,

        anticipatePin: 1

        // markers: true
    }

});


/* =========================================================
   PHASE 1
   POINT APPEARS
========================================================= */

tl31.to(identityPoint, {

    scale: 1,

    opacity: 1,

    duration: .5,

    ease: "power3.out"

});

/* =========================================================
   PHASE 2
   POINT EXPANDS
========================================================= */

tl31.to(identityPoint, {

    scale: 25,

    opacity: 0,

    duration: 1,

    ease: "power3.inOut"

});


/* =========================================================
   PHASE 3
   CONTENT APPEARS
========================================================= */

tl31.to(identityContent, {

    scale: 1,

    opacity: 1,

    duration: .8,

    ease: "power3.out"

});

/* =========================================================
   PHASE 4
   NAME REVEAL
========================================================= */

tl31.to(identityNameLines, {

    yPercent: 0,

    opacity: 1,

    filter: "blur(0px)",

    duration: 1,

    stagger: .12,

    ease: "power4.out"

});


/* =========================================================
   PHASE 5
   ROLE
========================================================= */

tl31.to(identityRole, {

    y: 0,

    opacity: 1,

    duration: .7,

    ease: "power3.out"

});

/* =========================================================
   PHASE 6
   LINE
========================================================= */

tl31.to(identityLine, {

    width: "100%",

    duration: .7,

    ease: "power3.inOut"

});


/* =========================================================
   PHASE 7
   CTA
========================================================= */

tl31.to(identityCTA, {

    y: 0,

    opacity: 1,

    duration: .8,

    ease: "power3.out"

});


/* =========================================================
   PHASE 8
   FINAL BREATH
========================================================= */

tl31.to(identityContent, {

    scale: .96,

    duration: 1.2,

    ease: "power2.inOut"

});



/* =========================================================
   SECTION 32
   MAGNETIC CONTACT
========================================================= */

const magneticSection =
    document.querySelector(".section-thirty-two");

const magneticLines =
    gsap.utils.toArray(".magnetic-line");

const magneticTitle =
    document.querySelector(".magnetic-title");

const contactLinks =
    document.querySelector(".contact-links");


/* =========================================================
   SPLIT TITLE INTO CHARACTERS
========================================================= */

magneticLines.forEach((line) => {

    const text = line.textContent.trim();

    line.innerHTML = "";

    [...text].forEach((letter) => {

        const char =
            document.createElement("span");

        char.className = "magnetic-char";

        char.textContent = letter;

        line.appendChild(char);

    });

});


const magneticChars =
    gsap.utils.toArray(".magnetic-char");


/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(magneticTitle, {

    opacity: 0,

    scale: .8,

    y: 80

});

gsap.set(contactLinks, {

    opacity: 0,

    y: 40

});

/* =========================================================
   SCROLL TIMELINE
========================================================= */

const tl32 = gsap.timeline({

    scrollTrigger: {

        trigger: magneticSection,

        start: "top top",

        end: "+=2600",

        scrub: .8,

        pin: true,

        anticipatePin: 1

        // markers: true

    }

});


/* =========================================================
   TITLE ENTERS
========================================================= */

tl32.to(magneticTitle, {

    opacity: 1,

    scale: 1,

    y: 0,

    duration: 1,

    ease: "power3.out"

});


/* =========================================================
   CHARACTERS SEPARATE
========================================================= */

magneticChars.forEach((char, index) => {

    const direction =
        index % 2 === 0 ? -1 : 1;

    tl32.to(
        char,
        {

            x: direction * 18,

            y: (index % 3 - 1) * 12,

            rotation:
                direction * 2,

            duration: .5,

            ease: "power2.out"

        },
        1 + index * .025
    );

});

/* =========================================================
   CONTACT LINKS
========================================================= */

tl32.to(contactLinks, {

    opacity: 1,

    y: 0,

    duration: .8,

    ease: "power3.out"

});


/* =========================================================
   MAGNETIC MOUSE EFFECT
========================================================= */

const magneticStrength = 45;

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;


/* Mouse position */

window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


/* Smooth magnetic movement */

function updateMagnetic() {

    currentX +=
        (mouseX - currentX) * .12;

    currentY +=
        (mouseY - currentY) * .12;


    magneticChars.forEach((char) => {

        const rect =
            char.getBoundingClientRect();

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;


        const dx =
            currentX - centerX;

        const dy =
            currentY - centerY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        const radius = 220;


        if (distance < radius) {

            const strength =
                1 - distance / radius;


            const moveX =
                dx * strength *
                magneticStrength /
                radius;

            const moveY =
                dy * strength *
                magneticStrength /
                radius;


            gsap.to(char, {

                x: moveX,

                y: moveY,

                duration: .35,

                overwrite: true,

                ease: "power3.out"

            });

        } else {

            gsap.to(char, {

                x: 0,

                y: 0,

                duration: .5,

                overwrite: true,

                ease: "power3.out"

            });

        }

    });


    requestAnimationFrame(updateMagnetic);

}


updateMagnetic();


/* =========================================================
   SECTION 33
   MAGNETIC FIELD TYPOGRAPHY
========================================================= */

const fieldSection =
    document.querySelector(".section-thirty-three");

const fieldText =
    document.querySelector(".field-text");


/* =========================================================
   SPLIT TEXT
========================================================= */

const fieldValue =
    fieldText.textContent.trim();

fieldText.innerHTML = "";


[...fieldValue].forEach((letter) => {

    const char =
        document.createElement("span");

    char.className = "field-char";

    char.textContent = letter;

    fieldText.appendChild(char);

});


const fieldChars =
    gsap.utils.toArray(".field-char");

    /* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(fieldChars, {

    y: 100,

    opacity: 0,

    scale: .85,

    rotation: 0,

    filter: "blur(8px)"

});

/* =========================================================
   SCROLL ENTRANCE
========================================================= */

const tl33 = gsap.timeline({

    scrollTrigger: {

        trigger: fieldSection,

        start: "top top",

        end: "+=2200",

        scrub: .8,

        pin: true,

        anticipatePin: 1

        // markers: true

    }

});


tl33.to(fieldChars, {

    y: 0,

    opacity: 1,

    scale: 1,

    filter: "blur(0px)",

    duration: 1,

    stagger: {

        each: .06,

        from: "center"

    },

    ease: "power3.out"

});

/* =========================================================
   MOUSE FIELD
========================================================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let smoothMouseX = mouseX;
let smoothMouseY = mouseY;


/* Mouse position */

window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;

    mouseY = event.clientY;

});

/* =========================================================
   FIELD SETTINGS
========================================================= */

const FIELD_RADIUS = 280;
const MAX_DISTANCE = 75;


/* =========================================================
   UPDATE FIELD
========================================================= */

function updateField() {
  smoothMouseX += (mouseX - smoothMouseX) * 0.08;

  smoothMouseY += (mouseY - smoothMouseY) * 0.08;

  fieldChars.forEach((char) => {
    const rect = char.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    const centerY = rect.top + rect.height / 2;

    const dx = smoothMouseX - centerX;

    const dy = smoothMouseY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    /* Outside field */

    if (distance > FIELD_RADIUS) {
      gsap.to(char, {
        x: 0,
        y: 0,

        rotation: 0,

        scale: 1,

        filter: "blur(0px)",

        duration: 0.6,

        overwrite: "auto",

        ease: "power3.out",
      });

      return;
    }

    /* =================================================
           MAGNETIC STRENGTH
        ================================================= */

    const strength = 1 - distance / FIELD_RADIUS;

    const force = strength * strength;

    const moveX = (dx * force * MAX_DISTANCE) / Math.max(distance, 1);

    const moveY = (dy * force * MAX_DISTANCE) / Math.max(distance, 1);

    const rotation = moveX * 0.12;

    const scale = 1 + force * 0.18;

    const blur = force * 1.5;

    gsap.to(char, {
      x: moveX,

      y: moveY,

      rotation,

      scale,

      filter: `blur(${blur}px)`,

      duration: 0.25,

      overwrite: "auto",

      ease: "power3.out",
    });
  });

  requestAnimationFrame(updateField);
}

updateField();

/* =========================================================
   SECTION 34
   LIQUID CURSOR DISTORTION
========================================================= */

const liquidSection = document.querySelector(".section-thirty-four");

const liquidStage = document.querySelector(".liquid-cursor-stage");

const liquidText = document.querySelector(".liquid-cursor-text");

const liquidGlow = document.querySelector(".liquid-glow");


/* =========================================================
   SPLIT TEXT
========================================================= */

const liquidValue = liquidText.textContent.trim();

liquidText.innerHTML = "";

[...liquidValue].forEach((letter)=>{

    const span = document.createElement("span");

    span.className = "liquid-cursor-char";

    span.textContent = letter;

    liquidText.appendChild(span);

});

const liquidChars = gsap.utils.toArray(".liquid-cursor-char");

/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(liquidChars,{
    opacity:0,
    y:80,
    scale:.9,
    filter:"blur(10px)"
});

gsap.set(liquidGlow,{
    opacity:0,
    left:"50%",
    top:"50%"
});


/* =========================================================
   SCROLL TIMELINE
========================================================= */

const tl34 = gsap.timeline({

    scrollTrigger:{
        trigger:".section-thirty-four",
        start:"top top",
        end:"+=2200",
        scrub:.8,
        pin:true,
        anticipatePin:1
    }

});

/* Text reveal */

tl34.to(liquidChars,{
    opacity:1,
    y:0,
    scale:1,
    filter:"blur(0px)",
    duration:1,
    stagger:{
        each:.08,
        from:"center"
    },
    ease:"power3.out"
});


/* Slight cinematic breathing */

tl34.to(liquidText,{
    scale:1.03,
    duration:1,
    ease:"sine.inOut"
});

tl34.to(liquidText,{
    scale:1,
    duration:1,
    ease:"sine.inOut"
});

/* =========================================================
   LIQUID CURSOR ENGINE
========================================================= */

let mouseX = 0;
let mouseY = 0;

let smoothX = 0;
let smoothY = 0;

let inside = false;


liquidStage.addEventListener("mouseenter",()=>{

    inside = true;

    gsap.to(liquidGlow,{
        opacity:1,
        duration:.3
    });

});


liquidStage.addEventListener("mouseleave",()=>{

    inside = false;

    gsap.to(liquidGlow,{
        opacity:0,
        duration:.4
    });

});


liquidStage.addEventListener("mousemove",(e)=>{

    const rect = liquidStage.getBoundingClientRect();

    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

});


/* =========================================================
   RIPPLE LOOP
========================================================= */

function liquidLoop(){

    smoothX += (mouseX - smoothX) * .12;
    smoothY += (mouseY - smoothY) * .12;


    gsap.set(liquidGlow,{
        left:smoothX,
        top:smoothY
    });


    liquidChars.forEach((char)=>{

        const rect = char.getBoundingClientRect();

        const stageRect = liquidStage.getBoundingClientRect();

        const cx = rect.left - stageRect.left + rect.width/2;
        const cy = rect.top - stageRect.top + rect.height/2;

        const dx = smoothX - cx;
        const dy = smoothY - cy;

        const distance = Math.sqrt(dx*dx + dy*dy);

        const radius = 220;


        if(inside && distance < radius){

            const strength = 1 - distance/radius;

            const force = strength*strength;

            const moveX = dx * force * .22;
            const moveY = dy * force * .22;

            const stretch = 1 + force*.45;
            const squash = 1 - force*.18;

            const rotate = moveX*.18;

            const blur = force*2.5;


            gsap.to(char,{
                x:moveX,
                y:moveY,
                rotation:rotate,
                scaleX:stretch,
                scaleY:squash,
                filter:`blur(${blur}px)`,
                duration:.18,
                overwrite:"auto",
                ease:"power3.out"
            });

        }

        else{

            gsap.to(char,{
                x:0,
                y:0,
                rotation:0,
                scaleX:1,
                scaleY:1,
                filter:"blur(0px)",
                duration:.5,
                overwrite:"auto",
                ease:"elastic.out(1,.5)"
            });

        }

    });


    requestAnimationFrame(liquidLoop);

}


liquidLoop();

/* =========================================================
   SECTION 35
   TEXT SHATTER / REBUILD
========================================================= */

const shatterSection =
    document.querySelector(".section-thirty-five");

const shatterText =
    document.querySelector(".shatter-text");

/* =========================================================
   SPLIT TEXT
========================================================= */

const shatterValue =
    shatterText.textContent.trim();

shatterText.innerHTML = "";


[...shatterValue].forEach((letter) => {

    const char =
        document.createElement("span");

    char.className = "shatter-char";

    char.textContent = letter;

    shatterText.appendChild(char);

});


const shatterChars =
    gsap.utils.toArray(".shatter-char");


/* =========================================================
   RANDOM EXPLOSION VALUES
========================================================= */

const shatterData =
    shatterChars.map((char, index) => {

        const angle =
            gsap.utils.random(
                0,
                Math.PI * 2
            );

        const distance =
            gsap.utils.random(
                350,
                850
            );

        return {

            x:
                Math.cos(angle) *
                distance,

            y:
                Math.sin(angle) *
                distance,

            z:
                gsap.utils.random(
                    -1000,
                    1000
                ),

            rotationX:
                gsap.utils.random(
                    -540,
                    540
                ),

            rotationY:
                gsap.utils.random(
                    -540,
                    540
                ),

            rotationZ:
                gsap.utils.random(
                    -360,
                    360
                ),

            scale:
                gsap.utils.random(
                    .15,
                    .7
                ),

            delay:
                index * .035

        };

    });

/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(shatterChars, {

    x: 0,
    y: 0,
    z: 0,

    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,

    scale: 1,

    opacity: 1,

    filter: "blur(0px)"

});

/* =========================================================
   TIMELINE
========================================================= */

const tl35 = gsap.timeline({

    scrollTrigger: {

        trigger: shatterSection,

        start: "top top",

        end: "+=3200",

        scrub: .8,

        pin: true,

        anticipatePin: 1

        // markers: true

    }

});


/* =========================================================
   PHASE 1
   SMALL VIBRATION
========================================================= */

tl35.to(shatterChars, {

    x: 3,

    duration: .05,

    repeat: 8,

    yoyo: true,

    ease: "none"

});


/* =========================================================
   PHASE 2
   SHATTER
========================================================= */

shatterChars.forEach((char, index) => {

    const data =
        shatterData[index];

    tl35.to(
        char,
        {

            x: data.x,

            y: data.y,

            z: data.z,

            rotationX:
                data.rotationX,

            rotationY:
                data.rotationY,

            rotationZ:
                data.rotationZ,

            scale:
                data.scale,

            opacity: 0,

            filter:
                "blur(8px)",

            duration: 1.1,

            ease: "power3.out"

        },

        0.5 + data.delay

    );

});

/* =========================================================
   PHASE 3
   FLOATING HOLD
========================================================= */

tl35.to({}, {

    duration: .7

});


/* =========================================================
   PHASE 4
   REBUILD
========================================================= */

tl35.to(shatterChars, {

    x: 0,

    y: 0,

    z: 0,

    rotationX: 0,

    rotationY: 0,

    rotationZ: 0,

    scale: 1,

    opacity: 1,

    filter: "blur(0px)",

    duration: 1.4,

    stagger: {

        each: .06,

        from: "center"

    },

    ease: "power3.out"

});

/* =========================================================
   SECTION 36
   CONTACT / FOOTER REVEAL
========================================================= */

const contact36 =
    document.querySelector(".section-thirty-six");

const contact36Heading =
    gsap.utils.toArray(
        ".contact36-heading span"
    );

const contact36Info =
    document.querySelector(
        ".contact36-info"
    );

const contact36Links =
    document.querySelector(
        ".contact36-links"
    );

const contact36Bottom =
    document.querySelector(
        ".contact36-bottom"
    );


/* =========================================================
   TIMELINE
========================================================= */

const tl36 = gsap.timeline({

    scrollTrigger: {

        trigger: contact36,

        start: "top 80%",

        end: "bottom bottom",

        scrub: .8

        // markers: true

    }

});


/* =========================================================
   PHASE 1
   LET'S
========================================================= */

tl36.to(
    contact36Heading[0],
    {

        y: "0%",

        opacity: 1,

        duration: 1,

        ease: "power4.out"

    }
);
/* =========================================================
   PHASE 2
   TALK
========================================================= */

tl36.to(
    contact36Heading[1],
    {

        y: "0%",

        opacity: 1,

        duration: 1,

        ease: "power4.out"

    },
    "-=.7"
);


/* =========================================================
   PHASE 3
   CONTACT INFO
========================================================= */

tl36.to(
    contact36Info,
    {

        y: 0,

        opacity: 1,

        duration: .8,

        ease: "power3.out"

    },
    "-=.4"
);

/* =========================================================
   PHASE 4
   LINKS
========================================================= */

tl36.to(
    contact36Links,
    {

        y: 0,

        opacity: 1,

        duration: .8,

        ease: "power3.out"

    },
    "-=.3"
);


/* =========================================================
   PHASE 5
   FOOTER
========================================================= */

tl36.to(
    contact36Bottom,
    {

        y: 0,

        opacity: 1,

        duration: .8,

        ease: "power3.out"

    },
    "-=.3"
);


/* =========================================================
   SECTION 38
   SPOTLIGHT TYPOGRAPHY
========================================================= */

const spotlight38Stage =
    document.querySelector(
        ".spotlight38-stage"
    );

const spotlight38Light =
    document.querySelector(
        ".spotlight38-light"
    );

const spotlight38Text =
    document.querySelector(
        ".spotlight38-text"
    );


/* =========================================================
   MOUSE STATE
========================================================= */

let spotlight38X = 0;
let spotlight38Y = 0;

let spotlight38CurrentX = 0;
let spotlight38CurrentY = 0;


/* =========================================================
   ENTER
========================================================= */

spotlight38Stage.addEventListener(
    "mouseenter",
    () => {

        if (
            window.matchMedia(
                "(hover: hover) and (pointer: fine)"
            ).matches
        ) {

            spotlight38Stage.classList.add(
                "is-active"
            );

        }

    }
);

/* =========================================================
   MOUSE MOVE
========================================================= */

spotlight38Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            spotlight38Stage.getBoundingClientRect();

        spotlight38X =
            event.clientX - rect.left;

        spotlight38Y =
            event.clientY - rect.top;


        /* CSS mask position */

        spotlight38Text.style.setProperty(
            "--spot-x",
            `${spotlight38X}px`
        );

        spotlight38Text.style.setProperty(
            "--spot-y",
            `${spotlight38Y}px`
        );

    }
);


/* =========================================================
   LEAVE
========================================================= */

spotlight38Stage.addEventListener(
    "mouseleave",
    () => {

        spotlight38Stage.classList.remove(
            "is-active"
        );

    }
);


/* =========================================================
   SMOOTH LIGHT
========================================================= */

function updateSpotlight38() {

    spotlight38CurrentX +=
        (
            spotlight38X -
            spotlight38CurrentX
        ) * .12;

    spotlight38CurrentY +=
        (
            spotlight38Y -
            spotlight38CurrentY
        ) * .12;


    spotlight38Light.style.left =
        `${spotlight38CurrentX}px`;

    spotlight38Light.style.top =
        `${spotlight38CurrentY}px`;


    requestAnimationFrame(
        updateSpotlight38
    );

}

updateSpotlight38();

/* =========================================================
   CLICK
========================================================= */

spotlight38Stage.addEventListener(
    "click",
    () => {

        spotlight38Stage.classList.add(
            "is-expanded"
        );


        setTimeout(() => {

            spotlight38Stage.classList.remove(
                "is-expanded"
            );

        }, 1200);

    }
);
/* =========================================================
   SECTION 39
   GRAVITY TYPOGRAPHY
========================================================= */

const gravity39Stage =
    document.querySelector(
        ".gravity39-stage"
    );

const gravity39Text =
    document.querySelector(
        ".gravity39-text"
    );

const gravity39Field =
    document.querySelector(
        ".gravity39-field"
    );


/* =========================================================
   SPLIT TEXT
========================================================= */

const gravity39Value =
    gravity39Text.textContent.trim();

gravity39Text.innerHTML = "";


[...gravity39Value].forEach((letter) => {

    const char =
        document.createElement("span");

    char.className =
        "gravity39-char";

    char.textContent = letter;

    gravity39Text.appendChild(char);

});


const gravity39Chars =
    gsap.utils.toArray(
        ".gravity39-char"
    );

/* =========================================================
   INITIAL STATE
========================================================= */

gsap.set(gravity39Chars, {

    x: 0,
    y: 0,

    rotation: 0,

    scale: 1,

    filter: "blur(0px)"

});


/* =========================================================
   MOUSE
========================================================= */

let gravity39MouseX = 0;
let gravity39MouseY = 0;

let gravity39CurrentX = 0;
let gravity39CurrentY = 0;

let gravity39Inside = false;


/* =========================================================
   MOUSE ENTER
========================================================= */

gravity39Stage.addEventListener(
    "mouseenter",
    () => {

        gravity39Inside = true;

    }
);
/* =========================================================
   MOUSE MOVE
========================================================= */

gravity39Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            gravity39Stage.getBoundingClientRect();

        gravity39MouseX =
            event.clientX - rect.left;

        gravity39MouseY =
            event.clientY - rect.top;

    }
);


/* =========================================================
   MOUSE LEAVE
========================================================= */

gravity39Stage.addEventListener(
    "mouseleave",
    () => {

        gravity39Inside = false;

    }
);
/* =========================================================
   SETTINGS
========================================================= */

const GRAVITY_RADIUS = 420;
const MAX_PULL = 100;


/* =========================================================
   GRAVITY LOOP
========================================================= */

function updateGravity39() {

    gravity39CurrentX +=
        (
            gravity39MouseX -
            gravity39CurrentX
        ) * .1;

    gravity39CurrentY +=
        (
            gravity39MouseY -
            gravity39CurrentY
        ) * .1;


    gravity39Chars.forEach((char) => {

        const rect =
            char.getBoundingClientRect();

        const stageRect =
            gravity39Stage.getBoundingClientRect();


        const centerX =
            rect.left -
            stageRect.left +
            rect.width / 2;

        const centerY =
            rect.top -
            stageRect.top +
            rect.height / 2;


        const dx =
            gravity39CurrentX -
            centerX;

        const dy =
            gravity39CurrentY -
            centerY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /* =================================================
           OUTSIDE GRAVITY FIELD
        ================================================= */

        if (
            !gravity39Inside ||
            distance > GRAVITY_RADIUS
        ) {

            gsap.to(char, {

                x: 0,
                y: 0,

                rotation: 0,

                scale: 1,

                filter:
                    "blur(0px)",

                duration: .7,

                overwrite: "auto",

                ease:
                    "elastic.out(1,.5)"

            });

            return;

        }


        /* =================================================
           GRAVITY FORCE
        ================================================= */

        const strength =
            1 -
            distance /
            GRAVITY_RADIUS;


        const force =
            strength * strength;


        /* Pull toward cursor */

        const pullX =
            dx *
            force *
            MAX_PULL /
            Math.max(distance, 1);

        const pullY =
            dy *
            force *
            MAX_PULL /
            Math.max(distance, 1);


        /* Rotation follows direction */

        const rotation =
            pullX * .18;


        /* Slight stretching */

        const scale =
            1 +
            force * .18;


        const blur =
            force * 1.2;


        gsap.to(char, {

            x: pullX,

            y: pullY,

            rotation,

            scale,

            filter:
                `blur(${blur}px)`,

            duration: .22,

            overwrite: "auto",

            ease:
                "power3.out"

        });

    });


    requestAnimationFrame(
        updateGravity39
    );

}


updateGravity39();

/* =========================================================
   CLICK — ORBIT BURST
========================================================= */

gravity39Stage.addEventListener(
    "click",
    () => {

        if (!gravity39Inside) return;


        gravity39Stage.classList.add(
            "is-orbiting"
        );


        const rect =
            gravity39Stage.getBoundingClientRect();


        const centerX =
            gravity39MouseX -
            rect.width / 2;

        const centerY =
            gravity39MouseY -
            rect.height / 2;


        gravity39Chars.forEach(
            (char, index) => {

                const angle =
                    (index /
                        gravity39Chars.length) *
                    Math.PI * 2;

                const radius =
                    gsap.utils.random(
                        100,
                        220
                    );


                const orbitX =
                    centerX +
                    Math.cos(angle) *
                    radius;

                const orbitY =
                    centerY +
                    Math.sin(angle) *
                    radius;


                gsap.to(char, {

                    x: orbitX,

                    y: orbitY,

                    rotation:
                        gsap.utils.random(
                            -180,
                            180
                        ),

                    scale:
                        gsap.utils.random(
                            .7,
                            1.2
                        ),

                    duration: .7,

                    delay:
                        index * .03,

                    ease:
                        "power3.out"

                });

            }
        );


        /* =================================================
           SNAP BACK
        ================================================= */

        gsap.to(gravity39Chars, {

            x: 0,
            y: 0,

            rotation: 0,

            scale: 1,

            filter:
                "blur(0px)",

            duration: 1.2,

            delay: .7,

            stagger: .04,

            ease:
                "elastic.out(1,.5)",

            onComplete: () => {

                gravity39Stage.classList.remove(
                    "is-orbiting"
                );

            }

        });

    }
);

/* =========================================================
   SECTION 40
   TEXT RIPPLE
========================================================= */

const ripple40Stage =
    document.querySelector(
        ".ripple40-stage"
    );

const ripple40Text =
    document.querySelector(
        ".ripple40-text"
    );

const ripple40Cursor =
    document.querySelector(
        ".ripple40-cursor"
    );


/* =========================================================
   SPLIT TEXT
========================================================= */

const ripple40Value =
    ripple40Text.textContent.trim();

ripple40Text.innerHTML = "";


[...ripple40Value].forEach((letter) => {

    const char =
        document.createElement("span");

    char.className =
        "ripple40-char";

    char.textContent = letter;

    ripple40Text.appendChild(char);

});


const ripple40Chars =
    gsap.utils.toArray(
        ".ripple40-char"
    );

/* =========================================================
   CHARACTER POSITIONS
========================================================= */

const ripple40Data =
    ripple40Chars.map((char) => {

        return {
            baseX: 0,
            baseY: 0,
            baseRotation: 0
        };

    });


/* =========================================================
   MOUSE
========================================================= */

let ripple40MouseX = 0;
let ripple40MouseY = 0;

let ripple40CurrentX = 0;
let ripple40CurrentY = 0;

let ripple40Inside = false;


/* =========================================================
   MOUSE ENTER
========================================================= */

ripple40Stage.addEventListener(
    "mouseenter",
    () => {

        ripple40Inside = true;

        gsap.to(ripple40Cursor, {

            scale: 1,

            opacity: 1,

            duration: .3,

            ease: "power3.out"

        });

    }
);
/* =========================================================
   MOUSE MOVE
========================================================= */

ripple40Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            ripple40Stage.getBoundingClientRect();

        ripple40MouseX =
            event.clientX - rect.left;

        ripple40MouseY =
            event.clientY - rect.top;

    }
);


/* =========================================================
   MOUSE LEAVE
========================================================= */

ripple40Stage.addEventListener(
    "mouseleave",
    () => {

        ripple40Inside = false;

        gsap.to(ripple40Cursor, {

            scale: 0,

            opacity: 0,

            duration: .4,

            ease: "power3.out"

        });


        /* Reset letters */

        gsap.to(ripple40Chars, {

            x: 0,
            y: 0,

            rotation: 0,

            scaleX: 1,
            scaleY: 1,

            filter:
                "blur(0px)",

            duration: .7,

            stagger: .02,

            ease:
                "elastic.out(1,.5)"

        });

    }
);


/* =========================================================
   RIPPLE SETTINGS
========================================================= */

const RIPPLE_RADIUS = 350;

const RIPPLE_STRENGTH = 80;


/* =========================================================
   ANIMATION LOOP
========================================================= */

function updateRipple40() {

    ripple40CurrentX +=
        (
            ripple40MouseX -
            ripple40CurrentX
        ) * .12;

    ripple40CurrentY +=
        (
            ripple40MouseY -
            ripple40CurrentY
        ) * .12;


    /* Cursor */

    ripple40Cursor.style.left =
        `${ripple40CurrentX}px`;

    ripple40Cursor.style.top =
        `${ripple40CurrentY}px`;

/* =====================================================
       LETTER WAVE
    ===================================================== */

    ripple40Chars.forEach((char) => {

        if (!ripple40Inside) return;


        const rect =
            char.getBoundingClientRect();

        const stageRect =
            ripple40Stage.getBoundingClientRect();


        const charX =
            rect.left -
            stageRect.left +
            rect.width / 2;

        const charY =
            rect.top -
            stageRect.top +
            rect.height / 2;


        const dx =
            ripple40CurrentX -
            charX;

        const dy =
            ripple40CurrentY -
            charY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (distance > RIPPLE_RADIUS) {

            gsap.to(char, {

                x: 0,
                y: 0,

                rotation: 0,

                scaleX: 1,
                scaleY: 1,

                filter:
                    "blur(0px)",

                duration: .5,

                overwrite: "auto",

                ease:
                    "power3.out"

            });

            return;

        }
 /* =================================================
           RIPPLE FORCE
        ================================================= */

        const strength =
            1 -
            distance /
            RIPPLE_RADIUS;


        const wave =
            Math.sin(
                distance * .045
            );


        const force =
            strength *
            strength;


        const moveY =
            wave *
            force *
            RIPPLE_STRENGTH;


        const moveX =
            dx *
            force *
            .12;


        const rotation =
            wave *
            force *
            8;


        const scaleX =
            1 +
            force *
            .25;


        const scaleY =
            1 -
            force *
            .12;


        const blur =
            force *
            2;


        gsap.to(char, {

            x: moveX,

            y: moveY,

            rotation,

            scaleX,

            scaleY,

            filter:
                `blur(${blur}px)`,

            duration: .18,

            overwrite: "auto",

            ease:
                "power2.out"

        });

    });


    requestAnimationFrame(
        updateRipple40
    );

}


updateRipple40();


/* =========================================================
   CLICK — LARGE RIPPLE
========================================================= */

ripple40Stage.addEventListener(
    "click",
    () => {

        if (!ripple40Inside) return;


        createRipple40(
            ripple40MouseX,
            ripple40MouseY
        );


        /* Strong wave through letters */

        ripple40Chars.forEach(
            (char, index) => {

                const direction =
                    index % 2 === 0
                        ? 1
                        : -1;


                gsap.to(char, {

                    y:
                        direction *
                        gsap.utils.random(
                            30,
                            80
                        ),

                    rotation:
                        direction *
                        gsap.utils.random(
                            5,
                            12
                        ),

                    scaleX:
                        gsap.utils.random(
                            1.1,
                            1.3
                        ),

                    duration: .35,

                    delay:
                        index * .04,

                    ease:
                        "power2.out"

                });


                gsap.to(char, {

                    y: 0,

                    rotation: 0,

                    scaleX: 1,

                    scaleY: 1,

                    filter:
                        "blur(0px)",

                    duration: .8,

                    delay:
                        .35 +
                        index * .04,

                    ease:
                        "elastic.out(1,.5)"

                });

            }
        );

    }
);

/* =========================================================
   CREATE RIPPLE RING
========================================================= */

function createRipple40(x, y) {

    const ring =
        document.createElement("span");

    ring.className =
        "ripple40-ring";


    ring.style.left =
        `${x}px`;

    ring.style.top =
        `${y}px`;


    ripple40Stage.appendChild(ring);


    gsap.fromTo(
        ring,

        {
            scale: 0,

            opacity: .8

        },

        {
            scale: 12,

            opacity: 0,

            duration: 1.2,

            ease:
                "power2.out",

            onComplete: () => {

                ring.remove();

            }

        }
    );

}

/* =========================================================
   SECTION 41
   MOTION TRAIL
========================================================= */

const motion41Stage =
    document.querySelector(
        ".motion41-stage"
    );

const motion41Trail =
    document.querySelector(
        ".motion41-trail"
    );


/* =========================================================
   SETTINGS
========================================================= */

const MOTION41_WORD =
    "MOTION";

const MOTION41_TRAIL_COUNT =
    12;


/* =========================================================
   CREATE TRAIL ELEMENTS
========================================================= */

const motion41Items = [];


for (
    let i = 0;
    i < MOTION41_TRAIL_COUNT;
    i++
) {

    const item =
        document.createElement("span");

    item.className =
        "motion41-item";

    item.textContent =
        MOTION41_WORD;


    /* Fade trail */

    const opacity =
        0.5 *
        (
            1 -
            i /
            MOTION41_TRAIL_COUNT
        );


    item.style.opacity =
        opacity;


    motion41Trail.appendChild(
        item
    );


    motion41Items.push({
        element: item,

        x: window.innerWidth / 2,

        y: window.innerHeight / 2,

        targetX:
            window.innerWidth / 2,

        targetY:
            window.innerHeight / 2
    });

}
/* =========================================================
   MOUSE POSITION
========================================================= */

let motion41MouseX =
    window.innerWidth / 2;

let motion41MouseY =
    window.innerHeight / 2;


let motion41PreviousX =
    motion41MouseX;

let motion41PreviousY =
    motion41MouseY;


let motion41Speed = 0;

let motion41Inside = false;


/* =========================================================
   MOUSE ENTER
========================================================= */

motion41Stage.addEventListener(
    "mouseenter",
    () => {

        motion41Inside = true;

        motion41Stage.classList.add(
            "is-active"
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

motion41Stage.addEventListener("mousemove", (event) => {
  const rect = motion41Stage.getBoundingClientRect();

  motion41MouseX = event.clientX - rect.left;

  motion41MouseY = event.clientY - rect.top;

  /* =============================================
           CALCULATE SPEED
        ============================================= */

  const dx = motion41MouseX - motion41PreviousX;

  const dy = motion41MouseY - motion41PreviousY;

  motion41Speed = Math.sqrt(dx * dx + dy * dy);

  motion41PreviousX = motion41MouseX;

  motion41PreviousY = motion41MouseY;
});


/* =========================================================
   MOUSE LEAVE
========================================================= */

motion41Stage.addEventListener(
    "mouseleave",
    () => {

        motion41Inside = false;

        motion41Stage.classList.remove(
            "is-active"
        );


        /* Fade trail */

        gsap.to(
            motion41Items.map(
                item => item.element
            ),
            {

                opacity: 0,

                duration: .5,

                stagger: .02

            }
        );

    }
);

/* =========================================================
   MOUSE ENTER
   RESTORE TRAIL
========================================================= */

motion41Stage.addEventListener(
    "mouseenter",
    () => {

        gsap.to(
            motion41Items.map(
                item => item.element
            ),
            {

                opacity: (index) => {

                    return (
                        .45 *
                        (
                            1 -
                            index /
                            MOTION41_TRAIL_COUNT
                        )
                    );

                },

                duration: .4

            }
        );

    }
);


/* =========================================================
   ANIMATION LOOP
========================================================= */

function updateMotion41() {

    motion41Items.forEach(
        (item, index) => {


            /* =============================================
               FIRST TRAIL FOLLOWS MOUSE
            ============================================= */

            if (index === 0) {

                item.targetX =
                    motion41MouseX;

                item.targetY =
                    motion41MouseY;

            }


            /* =============================================
               EACH COPY FOLLOWS PREVIOUS COPY
            ============================================= */

            else {

                item.targetX =
                    motion41Items[
                        index - 1
                    ].x;

                item.targetY =
                    motion41Items[
                        index - 1
                    ].y;

            }


            /* =============================================
               SMOOTHNESS
            ============================================= */

            const delay =
                0.22 -
                (
                    index *
                    0.012
                );


            item.x +=
                (
                    item.targetX -
                    item.x
                ) *
                delay;


            item.y +=
                (
                    item.targetY -
                    item.y
                ) *
                delay;


            /* =============================================
               SPEED EFFECT
            ============================================= */

            const speedStretch =
                Math.min(
                    motion41Speed *
                    .004,
                    .25
                );


            const scaleX =
                1 +
                speedStretch;


            const rotation =
                Math.min(
                    motion41Speed *
                    .08,
                    10
                );

 /* =============================================
               APPLY POSITION
            ============================================= */

            item.element.style.transform =
                `
                translate(
                    ${item.x}px,
                    ${item.y}px
                )
                translate(-50%, -50%)
                scaleX(${scaleX})
                rotate(${rotation}deg)
                `;

        }
    );


    /* Smooth speed reduction */

    motion41Speed *=
        .88;


    requestAnimationFrame(
        updateMotion41
    );

}


updateMotion41();


/* =========================================================
   CLICK
   COLLAPSE TRAIL TO CENTER
========================================================= */

motion41Stage.addEventListener("click", () => {
  const rect = motion41Stage.getBoundingClientRect();

  const centerX = rect.width / 2;

  const centerY = rect.height / 2;

  motion41Stage.classList.add("is-collapsing");

  /* =============================================
           COLLAPSE ALL COPIES
        ============================================= */

  motion41Items.forEach((item, index) => {
    gsap.to(item, {
      x: centerX,

      y: centerY,

      duration: 0.7,

      delay: index * 0.025,

      ease: "power4.inOut",
    });

    gsap.to(item.element, {
      opacity: 0,

      scale: 0.5,

      duration: 0.6,

      delay: index * 0.025,

      ease: "power3.in",
    });
  });
  /* =============================================
           RESET
        ============================================= */

  setTimeout(() => {
    motion41Stage.classList.remove("is-collapsing");

    motion41Items.forEach((item, index) => {
      item.x = motion41MouseX;

      item.y = motion41MouseY;

      gsap.set(item.element, {
        opacity: 0.45 * (1 - index / MOTION41_TRAIL_COUNT),

        scale: 1,
      });
    });
  }, 1000);
});

/* =========================================================
   SECTION 42
   LIQUID TEXT DISTORTION
========================================================= */

const liquid42Stage =
    document.querySelector(
        ".liquid42-stage"
    );

const liquid42Text =
    document.querySelector(
        "#liquid42Text"
    );

const liquid42Cursor =
    document.querySelector(
        "#liquid42Cursor"
    );

const liquid42Displacement =
    document.querySelector(
        "#liquid42Displacement"
    );

const liquid42Turbulence =
    document.querySelector(
        "#liquid42Turbulence"
    );

/* =========================================================
   STATE
========================================================= */

let liquid42MouseX = 0;
let liquid42MouseY = 0;

let liquid42CurrentX = 0;
let liquid42CurrentY = 0;

let liquid42PreviousX = 0;
let liquid42PreviousY = 0;

let liquid42Speed = 0;

let liquid42Distortion = 0;

let liquid42Inside = false;


/* =========================================================
   MOUSE ENTER
========================================================= */

liquid42Stage.addEventListener(
    "mouseenter",
    () => {

        liquid42Inside = true;

        liquid42Stage.classList.add(
            "is-active"
        );


        gsap.to(
            liquid42Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: 0.3,

                ease: "power3.out"

            }
        );

    }
);
/* =========================================================
   MOUSE MOVE
========================================================= */

liquid42Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            liquid42Stage.getBoundingClientRect();


        liquid42MouseX =
            event.clientX -
            rect.left;


        liquid42MouseY =
            event.clientY -
            rect.top;


        /* =============================================
           MOUSE SPEED
        ============================================= */

        const dx =
            liquid42MouseX -
            liquid42PreviousX;

        const dy =
            liquid42MouseY -
            liquid42PreviousY;


        liquid42Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        liquid42PreviousX =
            liquid42MouseX;

        liquid42PreviousY =
            liquid42MouseY;


        /* Faster mouse = stronger distortion */

        liquid42Distortion =
            Math.min(
                liquid42Speed * 1.5,
                90
            );

    }
);
/* =========================================================
   MOUSE LEAVE
========================================================= */

liquid42Stage.addEventListener(
    "mouseleave",
    () => {

        liquid42Inside = false;

        liquid42Stage.classList.remove(
            "is-active"
        );


        gsap.to(
            liquid42Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: 0.4,

                ease: "power3.out"

            }
        );

    }
);

/* =========================================================
   ANIMATION LOOP
========================================================= */

function updateLiquid42() {
  /* =============================================
       SMOOTH CURSOR
    ============================================= */

  liquid42CurrentX += (liquid42MouseX - liquid42CurrentX) * 0.16;

  liquid42CurrentY += (liquid42MouseY - liquid42CurrentY) * 0.16;

  liquid42Cursor.style.left = `${liquid42CurrentX}px`;

  liquid42Cursor.style.top = `${liquid42CurrentY}px`;

  /* =============================================
       DECAY DISTORTION
    ============================================= */

  liquid42Distortion *= 0.94;

  if (!liquid42Inside) {
    liquid42Distortion *= 0.9;
  }
  /* =============================================
       APPLY SVG DISPLACEMENT
    ============================================= */

  liquid42Displacement.setAttribute("scale", liquid42Distortion);

  /* =============================================
       ANIMATE TURBULENCE
    ============================================= */

  const frequencyX = 0.008 + liquid42Distortion * 0.00004;

  const frequencyY = 0.018 + liquid42Distortion * 0.00008;

  liquid42Turbulence.setAttribute(
    "baseFrequency",
    `${frequencyX} ${frequencyY}`,
  );

  requestAnimationFrame(updateLiquid42);
}

updateLiquid42();

/* =========================================================
   CLICK — LIQUID PULSE
========================================================= */

liquid42Stage.addEventListener(
    "click",
    () => {

        if (!liquid42Inside) return;


        /* =============================================
           POWERFUL DISTORTION PULSE
        ============================================= */

        const pulse = {
            value: 110
        };


        gsap.to(
            pulse,
            {

                value: 0,

                duration: 1.4,

                ease:
                    "elastic.out(1,0.35)",


                onUpdate: () => {

                    liquid42Distortion =
                        Math.max(
                            liquid42Distortion,
                            pulse.value
                        );

                }

            }
        );


        /* =============================================
           TEXT WOBBLE
        ============================================= */

        gsap.timeline()

            .to(
                liquid42Text,
                {

                    scaleX: 1.08,

                    scaleY: 0.93,

                    skewX: -4,

                    duration: 0.18,

                    ease:
                        "power2.out"

                }
            )

            .to(
                liquid42Text,
                {

                    scaleX: 0.96,

                    scaleY: 1.05,

                    skewX: 3,

                    duration: 0.25,

                    ease:
                        "power2.inOut"

                }
            )

            .to(
                liquid42Text,
                {

                    scaleX: 1,

                    scaleY: 1,

                    skewX: 0,

                    duration: 0.8,

                    ease:
                        "elastic.out(1,.35)"

                }
            );

    }
);

/* =========================================================
   SECTION 43
   PARTICLE TEXT DISSOLVE
========================================================= */

const particle43Stage =
    document.querySelector(
        ".particle43-stage"
    );

const particle43Canvas =
    document.querySelector(
        "#particle43Canvas"
    );

const particle43Cursor =
    document.querySelector(
        ".particle43-cursor"
    );

const particle43Ctx =
    particle43Canvas.getContext("2d");


/* =========================================================
   SETTINGS
========================================================= */

const PARTICLE43_TEXT =
    "DISAPPEAR";

const PARTICLE43_RADIUS =
    140;

const PARTICLE43_DENSITY =
    7;


/* =========================================================
   STATE
========================================================= */

let particle43Width = 0;
let particle43Height = 0;

let particle43MouseX = -9999;
let particle43MouseY = -9999;

let particle43TargetX = 0;
let particle43TargetY = 0;

let particle43Inside = false;

let particle43Exploding = false;

let particle43Particles = [];


/* =========================================================
   PARTICLE CLASS
========================================================= */

class Particle43 {

    constructor(x, y) {

        this.baseX = x;
        this.baseY = y;

        this.x = x;
        this.y = y;

        this.vx = 0;
        this.vy = 0;

        this.size =
            Math.random() * 1.8 +
            1.2;

        this.opacity = 1;

    }


    update() {

        /* =============================================
           DISTANCE FROM CURSOR
        ============================================= */

        const dx =
            particle43MouseX -
            this.x;

        const dy =
            particle43MouseY -
            this.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /* =============================================
           CURSOR DISSOLVE
        ============================================= */

        if (
            particle43Inside &&
            !particle43Exploding &&
            distance <
            PARTICLE43_RADIUS
        ) {

            const force =
                1 -
                distance /
                PARTICLE43_RADIUS;


            const angle =
                Math.atan2(
                    dy,
                    dx
                );


            /* Push particles away */

            this.vx -=
                Math.cos(angle) *
                force *
                3;


            this.vy -=
                Math.sin(angle) *
                force *
                3;


            /* Fade slightly */

            this.opacity -=
                force *
                0.025;

        }


        /* =============================================
           RETURN TO ORIGINAL TEXT
        ============================================= */

        if (
            !particle43Exploding
        ) {

            const returnX =
                this.baseX -
                this.x;

            const returnY =
                this.baseY -
                this.y;


            this.vx +=
                returnX *
                0.015;


            this.vy +=
                returnY *
                0.015;


            this.opacity +=
                (1 - this.opacity) *
                0.08;

        }


        /* =============================================
           PHYSICS
        ============================================= */

        this.vx *= 0.88;
        this.vy *= 0.88;


        this.x +=
            this.vx;

        this.y +=
            this.vy;


        this.opacity =
            Math.max(
                0,
                Math.min(
                    1,
                    this.opacity
                )
            );

    }


    draw() {

        particle43Ctx.save();


        particle43Ctx.globalAlpha =
            this.opacity;


        particle43Ctx.fillStyle =
            "#ffffff";


        particle43Ctx.beginPath();


        particle43Ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );


        particle43Ctx.fill();


        particle43Ctx.restore();

    }

}


/* =========================================================
   CREATE TEXT PARTICLES
========================================================= */

function createParticle43Text() {

    particle43Particles = [];


    const offscreen =
        document.createElement(
            "canvas"
        );

    const offCtx =
        offscreen.getContext(
            "2d",
            {
                willReadFrequently: true
            }
        );


    offscreen.width =
        particle43Width;

    offscreen.height =
        particle43Height;


    /* =============================================
       FONT SIZE
    ============================================= */

    const fontSize =
        Math.min(
            particle43Width * 0.17,
            260
        );


    offCtx.fillStyle =
        "#ffffff";


    offCtx.font =
        `900 ${fontSize}px Arial`;


    offCtx.textAlign =
        "center";


    offCtx.textBaseline =
        "middle";


    offCtx.fillText(
        PARTICLE43_TEXT,
        particle43Width / 2,
        particle43Height / 2
    );


    /* =============================================
       READ PIXELS
    ============================================= */

    const imageData =
        offCtx.getImageData(
            0,
            0,
            particle43Width,
            particle43Height
        );


    const pixels =
        imageData.data;


    /* =============================================
       CREATE PARTICLES
    ============================================= */

    for (
        let y = 0;
        y < particle43Height;
        y += PARTICLE43_DENSITY
    ) {

        for (
            let x = 0;
            x < particle43Width;
            x += PARTICLE43_DENSITY
        ) {

            const index =
                (
                    y *
                    particle43Width +
                    x
                ) * 4;


            const alpha =
                pixels[
                    index + 3
                ];


            if (
                alpha > 128
            ) {

                particle43Particles.push(
                    new Particle43(
                        x,
                        y
                    )
                );

            }

        }

    }

}


/* =========================================================
   RESIZE
========================================================= */

function resizeParticle43() {

    const rect =
        particle43Stage.getBoundingClientRect();


    const dpr =
        Math.min(
            window.devicePixelRatio,
            2
        );


    particle43Width =
        Math.floor(
            rect.width
        );

    particle43Height =
        Math.floor(
            rect.height
        );


    particle43Canvas.width =
        particle43Width *
        dpr;


    particle43Canvas.height =
        particle43Height *
        dpr;


    particle43Canvas.style.width =
        `${particle43Width}px`;


    particle43Canvas.style.height =
        `${particle43Height}px`;


    particle43Ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    createParticle43Text();

}


window.addEventListener(
    "resize",
    resizeParticle43
);


resizeParticle43();


/* =========================================================
   CURSOR
========================================================= */

particle43Stage.addEventListener(
    "mouseenter",
    () => {

        particle43Inside = true;


        gsap.to(
            particle43Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: 0.3

            }
        );

    }
);


particle43Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            particle43Stage.getBoundingClientRect();


        particle43MouseX =
            event.clientX -
            rect.left;


        particle43MouseY =
            event.clientY -
            rect.top;


        particle43TargetX =
            particle43MouseX;


        particle43TargetY =
            particle43MouseY;


        particle43Cursor.style.left =
            `${particle43TargetX}px`;


        particle43Cursor.style.top =
            `${particle43TargetY}px`;

    }
);


particle43Stage.addEventListener(
    "mouseleave",
    () => {

        particle43Inside = false;


        particle43MouseX =
            -9999;

        particle43MouseY =
            -9999;


        gsap.to(
            particle43Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: 0.3

            }
        );

    }
);


/* =========================================================
   CLICK — EXPLODE ENTIRE TEXT
========================================================= */

particle43Stage.addEventListener(
    "click",
    () => {

        if (
            particle43Exploding
        ) return;


        particle43Exploding =
            true;


        particle43Particles.forEach(
            (particle) => {


                const angle =
                    Math.atan2(
                        particle.y -
                        particle43MouseY,

                        particle.x -
                        particle43MouseX
                    );


                const force =
                    Math.random() *
                    16 +
                    6;


                particle.vx =
                    Math.cos(angle) *
                    force;


                particle.vy =
                    Math.sin(angle) *
                    force;


                particle.opacity =
                    1;

            }
        );


        /* =============================================
           REBUILD
        ============================================= */

        setTimeout(
            () => {

                particle43Exploding =
                    false;


                particle43Particles.forEach(
                    (particle) => {

                        particle.vx =
                            0;

                        particle.vy =
                            0;

                    }
                );

            },
            900
        );

    }
);


/* =========================================================
   ANIMATION LOOP
========================================================= */

function animateParticle43() {

    particle43Ctx.clearRect(
        0,
        0,
        particle43Width,
        particle43Height
    );


    particle43Particles.forEach(
        (particle) => {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animateParticle43
    );

}


animateParticle43();

/* =========================================================
   SECTION 44
   MAGNETIC TEXT SHATTER
========================================================= */

const shatter44Stage =
    document.querySelector(
        ".shatter44-stage"
    );

const shatter44Word =
    document.querySelector(
        ".shatter44-word"
    );

const shatter44Cursor =
    document.querySelector(
        ".shatter44-cursor"
    );


/* =========================================================
   SPLIT TEXT
========================================================= */

const shatter44Value =
    shatter44Word.textContent.trim();


shatter44Word.innerHTML = "";


[...shatter44Value].forEach(
    (letter) => {

        const char =
            document.createElement(
                "span"
            );

        char.className =
            "shatter44-char";

        char.textContent =
            letter;

        shatter44Word.appendChild(
            char
        );

    }
);


const shatter44Chars =
    gsap.utils.toArray(
        ".shatter44-char"
    );

/* =========================================================
   SETTINGS
========================================================= */

const SHATTER44_RADIUS =
    320;

const SHATTER44_FORCE =
    120;


/* =========================================================
   MOUSE STATE
========================================================= */

let shatter44MouseX = 0;
let shatter44MouseY = 0;

let shatter44CurrentX = 0;
let shatter44CurrentY = 0;

let shatter44PreviousX = 0;
let shatter44PreviousY = 0;

let shatter44Speed = 0;

let shatter44Inside = false;

let shatter44Exploding = false;

/* =========================================================
   MOUSE ENTER
========================================================= */

shatter44Stage.addEventListener(
    "mouseenter",
    () => {

        shatter44Inside = true;


        shatter44Stage.classList.add(
            "is-active"
        );


        gsap.to(
            shatter44Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: 0.3,

                ease: "power3.out"

            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

shatter44Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            shatter44Stage.getBoundingClientRect();


        shatter44MouseX =
            event.clientX -
            rect.left;


        shatter44MouseY =
            event.clientY -
            rect.top;


        /* Mouse speed */

        const dx =
            shatter44MouseX -
            shatter44PreviousX;

        const dy =
            shatter44MouseY -
            shatter44PreviousY;


        shatter44Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        shatter44PreviousX =
            shatter44MouseX;

        shatter44PreviousY =
            shatter44MouseY;

    }
);


/* =========================================================
   MOUSE LEAVE
========================================================= */

shatter44Stage.addEventListener(
    "mouseleave",
    () => {

        shatter44Inside = false;


        shatter44Stage.classList.remove(
            "is-active"
        );


        gsap.to(
            shatter44Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: 0.3

            }
        );


        /* Return all letters */

        if (!shatter44Exploding) {

            gsap.to(
                shatter44Chars,
                {

                    x: 0,
                    y: 0,

                    rotation: 0,

                    scale: 1,

                    filter:
                        "blur(0px)",

                    duration: 1,

                    stagger: 0.03,

                    ease:
                        "elastic.out(1,.5)"

                }
            );

        }

    }
);

/* =========================================================
   ANIMATION LOOP
========================================================= */

function updateShatter44() {

    /* Smooth cursor */

    shatter44CurrentX +=
        (
            shatter44MouseX -
            shatter44CurrentX
        ) * 0.15;


    shatter44CurrentY +=
        (
            shatter44MouseY -
            shatter44CurrentY
        ) * 0.15;


    shatter44Cursor.style.left =
        `${shatter44CurrentX}px`;


    shatter44Cursor.style.top =
        `${shatter44CurrentY}px`;


    /* Don't interact during explosion */

    if (!shatter44Exploding) {

        shatter44Chars.forEach(
            (char) => {

                if (
                    !shatter44Inside
                ) return;


                const charRect =
                    char.getBoundingClientRect();


                const stageRect =
                    shatter44Stage.getBoundingClientRect();


                const charX =
                    charRect.left -
                    stageRect.left +
                    charRect.width / 2;


                const charY =
                    charRect.top -
                    stageRect.top +
                    charRect.height / 2;


                /* =========================================
                   DISTANCE
                ========================================= */

                const dx =
                    charX -
                    shatter44CurrentX;


                const dy =
                    charY -
                    shatter44CurrentY;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                /* =========================================
                   OUTSIDE RANGE
                ========================================= */

                if (
                    distance >
                    SHATTER44_RADIUS
                ) {

                    gsap.to(
                        char,
                        {

                            x: 0,
                            y: 0,

                            rotation: 0,

                            scale: 1,

                            duration: 0.5,

                            overwrite:
                                "auto",

                            ease:
                                "power3.out"

                        }
                    );

                    return;

                }


                /* =========================================
                   MAGNETIC FORCE
                ========================================= */

                const strength =
                    1 -
                    distance /
                    SHATTER44_RADIUS;


                const force =
                    strength *
                    strength;


                /* Push away */

                const angle =
                    Math.atan2(
                        dy,
                        dx
                    );


                const moveX =
                    Math.cos(angle) *
                    force *
                    SHATTER44_FORCE;


                const moveY =
                    Math.sin(angle) *
                    force *
                    SHATTER44_FORCE;


                /* Rotation */

                const rotation =
                    (
                        Math.sin(
                            angle
                        ) *
                        force *
                        25
                    );


                /* Scale */

                const scale =
                    1 +
                    force *
                    0.12;


                /* Fast movement shake */

                const shake =
                    Math.min(
                        shatter44Speed *
                        force *
                        0.04,
                        8
                    );


                gsap.to(
                    char,
                    {

                        x:
                            moveX +
                            gsap.utils.random(
                                -shake,
                                shake
                            ),

                        y:
                            moveY +
                            gsap.utils.random(
                                -shake,
                                shake
                            ),

                        rotation,

                        scale,

                        duration: 0.18,

                        overwrite:
                            "auto",

                        ease:
                            "power2.out"

                    }
                );

            }
        );

    }


    /* Slow speed decay */

    shatter44Speed *=
        0.88;


    requestAnimationFrame(
        updateShatter44
    );

}


updateShatter44();

/* =========================================================
   CLICK
   SHATTER EXPLOSION
========================================================= */

shatter44Stage.addEventListener("click", () => {
  if (shatter44Exploding) return;

  shatter44Exploding = true;

  /* =============================================
           EXPLODE LETTERS
        ============================================= */

  shatter44Chars.forEach((char, index) => {
    const angle = gsap.utils.random(0, Math.PI * 2);

    const distance = gsap.utils.random(250, 600);

    const x = Math.cos(angle) * distance;

    const y = Math.sin(angle) * distance;

    gsap.to(char, {
      x,

      y,

      rotation: gsap.utils.random(-360, 360),

      scale: gsap.utils.random(0.7, 1.3),

      opacity: 0,

      duration: 0.8,

      delay: index * 0.03,

      ease: "power3.out",
    });
  });

  /* =============================================
           REBUILD
        ============================================= */

  setTimeout(() => {
    gsap.to(shatter44Chars, {
      x: 0,

      y: 0,

      rotation: 0,

      scale: 1,

      opacity: 1,

      duration: 1.4,

      stagger: {
        each: 0.06,

        from: "random",
      },

      ease: "elastic.out(1,.45)",

      onComplete: () => {
        shatter44Exploding = false;
      },
    });
  }, 1000);
});

/* =========================================================
   SECTION 45
   3D TEXT TUNNEL
========================================================= */

const tunnel45Stage =
    document.querySelector(
        ".tunnel45-stage"
    );

const tunnel45Scene =
    document.querySelector(
        ".tunnel45-scene"
    );

const tunnel45Layers =
    document.querySelector(
        ".tunnel45-layers"
    );

const tunnel45Cursor =
    document.querySelector(
        ".tunnel45-cursor"
    );


/* =========================================================
   SETTINGS
========================================================= */

const TUNNEL45_WORD =
    "DIMENSION";

const TUNNEL45_COUNT =
    17;


/* =========================================================
   CREATE TEXT LAYERS
========================================================= */

const tunnel45Texts = [];


for (
    let i = 0;
    i < TUNNEL45_COUNT;
    i++
) {

    const text =
        document.createElement("div");


    text.className =
        "tunnel45-text";


    text.textContent =
        TUNNEL45_WORD;


    /* =============================================
       CENTER LAYER
    ============================================= */

    if (
        i ===
        Math.floor(
            TUNNEL45_COUNT / 2
        )
    ) {

        text.classList.add(
            "is-main"
        );

    }


    tunnel45Layers.appendChild(
        text
    );


    tunnel45Texts.push(
        text
    );

}


/* =========================================================
   INITIAL LAYER POSITIONS
========================================================= */

function setupTunnel45() {

    tunnel45Texts.forEach(
        (text, index) => {

            const center =
                (
                    TUNNEL45_COUNT - 1
                ) / 2;


            const distance =
                index -
                center;


            const z =
                distance *
                100;


            const scale =
                1 -
                Math.abs(distance) *
                0.025;


            const opacity =
                Math.max(
                    0.08,
                    1 -
                    Math.abs(distance) *
                    0.08
                );


            gsap.set(
                text,
                {

                    xPercent: -50,

                    yPercent: -50,

                    z,

                    scale,

                    opacity

                }
            );

        }
    );

}


setupTunnel45();


/* =========================================================
   MOUSE STATE
========================================================= */

let tunnel45MouseX = 0;
let tunnel45MouseY = 0;

let tunnel45TargetRotateX = 0;
let tunnel45TargetRotateY = 0;

let tunnel45CurrentRotateX = 0;
let tunnel45CurrentRotateY = 0;

let tunnel45PreviousX = 0;
let tunnel45PreviousY = 0;

let tunnel45Speed = 0;

let tunnel45Inside = false;

let tunnel45Collapsing = false;


/* =========================================================
   MOUSE ENTER
========================================================= */

tunnel45Stage.addEventListener(
    "mouseenter",
    () => {

        tunnel45Inside = true;


        tunnel45Stage.classList.add(
            "is-active"
        );


        gsap.to(
            tunnel45Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: 0.3,

                ease: "power3.out"

            }
        );

    }
);

/* =========================================================
   MOUSE MOVE
========================================================= */

tunnel45Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            tunnel45Stage.getBoundingClientRect();


        tunnel45MouseX =
            event.clientX -
            rect.left;


        tunnel45MouseY =
            event.clientY -
            rect.top;


        /* =============================================
           NORMALIZED MOUSE
        ============================================= */

        const normalizedX =
            (
                tunnel45MouseX /
                rect.width
            ) *
            2 -
            1;


        const normalizedY =
            (
                tunnel45MouseY /
                rect.height
            ) *
            2 -
            1;


        /* =============================================
           ROTATION TARGET
        ============================================= */

        tunnel45TargetRotateY =
            normalizedX *
            18;


        tunnel45TargetRotateX =
            normalizedY *
            -12;


        /* =============================================
           SPEED
        ============================================= */

        const dx =
            tunnel45MouseX -
            tunnel45PreviousX;


        const dy =
            tunnel45MouseY -
            tunnel45PreviousY;


        tunnel45Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        tunnel45PreviousX =
            tunnel45MouseX;


        tunnel45PreviousY =
            tunnel45MouseY;

    }
);


/* =========================================================
   MOUSE LEAVE
========================================================= */

tunnel45Stage.addEventListener(
    "mouseleave",
    () => {

        tunnel45Inside = false;


        tunnel45Stage.classList.remove(
            "is-active"
        );


        tunnel45TargetRotateX = 0;

        tunnel45TargetRotateY = 0;


        gsap.to(
            tunnel45Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: 0.3

            }
        );

    }
);
/* =========================================================
   ANIMATION LOOP
========================================================= */

function updateTunnel45() {
  /* =============================================
       SMOOTH ROTATION
    ============================================= */

  tunnel45CurrentRotateX +=
    (tunnel45TargetRotateX - tunnel45CurrentRotateX) * 0.08;

  tunnel45CurrentRotateY +=
    (tunnel45TargetRotateY - tunnel45CurrentRotateY) * 0.08;

  /* =============================================
       SPEED DEPTH EFFECT
    ============================================= */

  const speedDepth = Math.min(tunnel45Speed * 1.5, 120);

  /* =============================================
       APPLY SCENE ROTATION
    ============================================= */

  if (!tunnel45Collapsing) {
    tunnel45Scene.style.transform = `
            rotateX(
                ${tunnel45CurrentRotateX}deg
            )
            rotateY(
                ${tunnel45CurrentRotateY}deg
            )
            `;
  }

  /* =============================================
       DYNAMIC LAYER DEPTH
    ============================================= */

  tunnel45Texts.forEach((text, index) => {
    if (tunnel45Collapsing) return;

    const center = (TUNNEL45_COUNT - 1) / 2;

    const distance = index - center;

    const z = distance * (100 + speedDepth * 0.25);

    const blur = Math.abs(distance) * 0.15;

    gsap.to(text, {
      z,

      filter: `blur(${blur}px)`,

      duration: 0.3,

      overwrite: "auto",

      ease: "power2.out",
    });
  });

  /* =============================================
       CURSOR
    ============================================= */

  tunnel45Cursor.style.left = `${tunnel45MouseX}px`;

  tunnel45Cursor.style.top = `${tunnel45MouseY}px`;

  /* Speed decay */

  tunnel45Speed *= 0.9;

  requestAnimationFrame(updateTunnel45);
}

updateTunnel45();
/* =========================================================
   CLICK
   TUNNEL COLLAPSE
========================================================= */

tunnel45Stage.addEventListener(
    "click",
    () => {

        if (
            tunnel45Collapsing
        ) return;


        tunnel45Collapsing = true;


        /* =============================================
           TEXT FLIES THROUGH SCREEN
        ============================================= */

        gsap.to(
            tunnel45Texts,
            {

                z: 1800,

                scale: 2.5,

                opacity: 0,

                duration: 1,

                stagger: {

                    each: 0.035,

                    from: "center"

                },

                ease:
                    "power4.in"

            }
        );


        /* =============================================
           SCENE PUSH
        ============================================= */

        gsap.to(
            tunnel45Scene,
            {

                scale: 0.7,

                duration: 0.7,

                ease:
                    "power4.in"

            }
        );


        /* =============================================
           REBUILD
        ============================================= */

        setTimeout(
            () => {

                gsap.set(
                    tunnel45Scene,
                    {

                        scale: 1

                    }
                );


                setupTunnel45();


                gsap.fromTo(
                    tunnel45Texts,

                    {

                        z: -1500,

                        opacity: 0,

                        scale: 0.5

                    },

                    {

                        z: (index) => {

                            const center =
                                (
                                    TUNNEL45_COUNT - 1
                                ) / 2;


                            return (
                                index -
                                center
                            ) * 100;

                        },

                        opacity: (index) => {

                            const center =
                                (
                                    TUNNEL45_COUNT - 1
                                ) / 2;


                            return Math.max(
                                0.08,
                                1 -
                                Math.abs(
                                    index -
                                    center
                                ) *
                                0.08
                            );

                        },

                        scale: (index) => {

                            const center =
                                (
                                    TUNNEL45_COUNT - 1
                                ) / 2;


                            return (
                                1 -
                                Math.abs(
                                    index -
                                    center
                                ) *
                                0.025
                            );

                        },

                        duration: 1.4,

                        stagger: {

                            each: 0.04,

                            from: "center"

                        },

                        ease:
                            "power3.out",

                        onComplete: () => {

                            tunnel45Collapsing =
                                false;

                        }

                    }
                );

            },
            1200
        );

    }
);

/* =========================================================
   SECTION 46
   CURSOR TEXT SCANNER
========================================================= */

const scanner46Stage =
    document.querySelector(
        ".scanner46-stage"
    );

const scanner46Reveal =
    document.querySelector(
        "#scanner46Reveal"
    );

const scanner46Light =
    document.querySelector(
        "#scanner46Light"
    );

const scanner46Cursor =
    document.querySelector(
        "#scanner46Cursor"
    );


/* =========================================================
   STATE
========================================================= */

let scanner46MouseX = 0;
let scanner46MouseY = 0;

let scanner46CurrentX = 0;
let scanner46CurrentY = 0;

let scanner46PreviousX = 0;
let scanner46PreviousY = 0;

let scanner46Speed = 0;

let scanner46Inside = false;

let scanner46Expanded = false;


/* =========================================================
   MOUSE ENTER
========================================================= */

scanner46Stage.addEventListener(
    "mouseenter",
    () => {

        scanner46Inside = true;


        gsap.to(
            scanner46Light,
            {

                opacity: 1,

                scale: 1,

                duration: 0.4,

                ease:
                    "power3.out"

            }
        );


        gsap.to(
            scanner46Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: 0.3,

                ease:
                    "power3.out"

            }
        );

    }
);
/* =========================================================
   MOUSE MOVE
========================================================= */

scanner46Stage.addEventListener(
    "mousemove",
    (event) => {

        if (
            scanner46Expanded
        ) return;


        const rect =
            scanner46Stage.getBoundingClientRect();


        scanner46MouseX =
            event.clientX -
            rect.left;


        scanner46MouseY =
            event.clientY -
            rect.top;


        /* =============================================
           CALCULATE SPEED
        ============================================= */

        const dx =
            scanner46MouseX -
            scanner46PreviousX;


        const dy =
            scanner46MouseY -
            scanner46PreviousY;


        scanner46Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        scanner46PreviousX =
            scanner46MouseX;


        scanner46PreviousY =
            scanner46MouseY;

    }
);


/* =========================================================
   MOUSE LEAVE
========================================================= */

scanner46Stage.addEventListener(
    "mouseleave",
    () => {

        scanner46Inside = false;


        if (
            scanner46Expanded
        ) return;


        gsap.to(
            scanner46Light,
            {

                opacity: 0,

                scale: 0,

                duration: 0.3

            }
        );


        gsap.to(
            scanner46Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: 0.3

            }
        );


        /* Hide reveal */

        gsap.to(
            scanner46Reveal,
            {

                duration: 0.5,

                ease:
                    "power2.out",

                clipPath:
                    `
                    circle(
                        0px
                        at
                        ${scanner46CurrentX}px
                        ${scanner46CurrentY}px
                    )
                    `

            }
        );

    }
);

/* =========================================================
   ANIMATION LOOP
========================================================= */

function updateScanner46() {

    /* =============================================
       SMOOTH MOVEMENT
    ============================================= */

    scanner46CurrentX +=
        (
            scanner46MouseX -
            scanner46CurrentX
        ) *
        0.14;


    scanner46CurrentY +=
        (
            scanner46MouseY -
            scanner46CurrentY
        ) *
        0.14;


    /* =============================================
       CURSOR POSITION
    ============================================= */

    scanner46Cursor.style.left =
        `${scanner46CurrentX}px`;


    scanner46Cursor.style.top =
        `${scanner46CurrentY}px`;


    /* =============================================
       LIGHT POSITION
    ============================================= */

    scanner46Light.style.left =
        `${scanner46CurrentX}px`;


    scanner46Light.style.top =
        `${scanner46CurrentY}px`;


    /* =============================================
       SCANNER REVEAL
    ============================================= */

    if (
        scanner46Inside &&
        !scanner46Expanded
    ) {

        /* Dynamic scanner size */

        const scannerSize =
            Math.min(
                115 +
                scanner46Speed *
                0.8,
                220
            );


        scanner46Reveal.style.clipPath =
            `
            circle(
                ${scannerSize}px
                at
                ${scanner46CurrentX}px
                ${scanner46CurrentY}px
            )
            `;


        /* =========================================
           FAST MOVEMENT STRETCH
        ========================================= */

        const stretch =
            Math.min(
                scanner46Speed *
                0.8,
                2
            );


        scanner46Light.style.transform =
            `
            translate(-50%, -50%)
            scaleX(${stretch})
            scaleY(${1 / stretch})
            `;

    }


    /* =============================================
       SPEED DECAY
    ============================================= */

    scanner46Speed *=
        0.88;


    requestAnimationFrame(
        updateScanner46
    );

}


updateScanner46();

/* =========================================================
   CLICK
   REVEAL EVERYTHING
========================================================= */

scanner46Stage.addEventListener(
    "click",
    () => {

        if (
            scanner46Expanded
        ) return;


        scanner46Expanded = true;


        const rect =
            scanner46Stage.getBoundingClientRect();


        const maxRadius =
            Math.sqrt(
                rect.width *
                rect.width +

                rect.height *
                rect.height
            );


        /* =============================================
           EXPAND REVEAL
        ============================================= */

        gsap.to(
            scanner46Reveal,
            {

                clipPath:
                    `
                    circle(
                        ${maxRadius}px
                        at
                        ${scanner46CurrentX}px
                        ${scanner46CurrentY}px
                    )
                    `,

                duration: 1.2,

                ease:
                    "power4.out"

            }
        );


        /* =============================================
           EXPAND LIGHT
        ============================================= */

        gsap.to(
            scanner46Light,
            {

                scale: 8,

                opacity: 0,

                duration: 1,

                ease:
                    "power4.out"

            }
        );


        /* =============================================
           HIDE CURSOR
        ============================================= */

        gsap.to(
            scanner46Cursor,
            {

                scale: 0,

                opacity: 0,

                duration: 0.3

            }
        );


        /* =============================================
           RETURN TO DARKNESS
        ============================================= */

        setTimeout(
            () => {

                gsap.to(
                    scanner46Reveal,
                    {

                        clipPath:
                            `
                            circle(
                                0px
                                at
                                ${rect.width / 2}px
                                ${rect.height / 2}px
                            )
                            `,

                        duration: 1.2,

                        ease:
                            "power3.inOut",

                        onComplete:
                            () => {

                                scanner46Expanded =
                                    false;


                                if (
                                    scanner46Inside
                                ) {

                                    gsap.to(
                                        scanner46Light,
                                        {

                                            opacity: 1,

                                            scale: 1,

                                            duration: 0.4

                                        }
                                    );


                                    gsap.to(
                                        scanner46Cursor,
                                        {

                                            opacity: 1,

                                            scale: 1,

                                            duration: 0.3

                                        }
                                    );

                                }

                            }

                    }
                );

            },
            2500
        );

    }
);

/* =========================================================
   SECTION 47
   TEXT WARP VORTEX
========================================================= */

const vortex47Stage =
    document.querySelector(
        ".vortex47-stage"
    );

const vortex47Word =
    document.querySelector(
        "#vortex47Word"
    );

const vortex47Cursor =
    document.querySelector(
        "#vortex47Cursor"
    );

const vortex47RingOne =
    document.querySelector(
        ".vortex47-ring-one"
    );

const vortex47RingTwo =
    document.querySelector(
        ".vortex47-ring-two"
    );


/* =========================================================
   SPLIT TEXT
========================================================= */

const vortex47Text =
    vortex47Word.textContent.trim();


vortex47Word.innerHTML = "";


[...vortex47Text].forEach(
    (letter) => {

        const span =
            document.createElement(
                "span"
            );


        span.className =
            "vortex47-char";


        span.textContent =
            letter;


        vortex47Word.appendChild(
            span
        );

    }
);


const vortex47Chars =
    gsap.utils.toArray(
        ".vortex47-char"
    );

/* =========================================================
   SETTINGS
========================================================= */

const VORTEX47_RADIUS =
    360;

const VORTEX47_FORCE =
    150;


/* =========================================================
   STATE
========================================================= */

let vortex47MouseX = 0;
let vortex47MouseY = 0;

let vortex47CurrentX = 0;
let vortex47CurrentY = 0;

let vortex47PreviousX = 0;
let vortex47PreviousY = 0;

let vortex47VelocityX = 0;
let vortex47VelocityY = 0;

let vortex47Speed = 0;

let vortex47Inside = false;

let vortex47Pulsing = false;


/* =========================================================
   MOUSE ENTER
========================================================= */

vortex47Stage.addEventListener(
    "mouseenter",
    () => {

        vortex47Inside = true;


        gsap.to(
            vortex47Cursor,
            {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power3.out"
            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

vortex47Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            vortex47Stage.getBoundingClientRect();


        vortex47MouseX =
            event.clientX -
            rect.left;


        vortex47MouseY =
            event.clientY -
            rect.top;


        vortex47VelocityX =
            vortex47MouseX -
            vortex47PreviousX;


        vortex47VelocityY =
            vortex47MouseY -
            vortex47PreviousY;


        vortex47Speed =
            Math.sqrt(
                vortex47VelocityX *
                vortex47VelocityX +

                vortex47VelocityY *
                vortex47VelocityY
            );


        vortex47PreviousX =
            vortex47MouseX;


        vortex47PreviousY =
            vortex47MouseY;

    }
);


/* =========================================================
   MOUSE LEAVE
========================================================= */

vortex47Stage.addEventListener(
    "mouseleave",
    () => {

        vortex47Inside = false;


        gsap.to(
            vortex47Cursor,
            {
                opacity: 0,
                scale: 0,
                duration: 0.3
            }
        );


        gsap.to(
            [
                vortex47RingOne,
                vortex47RingTwo
            ],
            {
                opacity: 0,
                duration: 0.4
            }
        );


        if (!vortex47Pulsing) {

            gsap.to(
                vortex47Chars,
                {
                    x: 0,
                    y: 0,

                    rotation: 0,

                    scale: 1,

                    duration: 1,

                    stagger: 0.03,

                    ease:
                        "elastic.out(1,.5)"
                }
            );

        }

    }
);
/* =========================================================
   ANIMATION LOOP
========================================================= */

function updateVortex47() {
  /* =============================================
       SMOOTH CURSOR
    ============================================= */

  vortex47CurrentX += (vortex47MouseX - vortex47CurrentX) * 0.16;

  vortex47CurrentY += (vortex47MouseY - vortex47CurrentY) * 0.16;

  vortex47Cursor.style.left = `${vortex47CurrentX}px`;

  vortex47Cursor.style.top = `${vortex47CurrentY}px`;

  /* =============================================
       VORTEX RINGS
    ============================================= */

  if (vortex47Inside && !vortex47Pulsing) {
    vortex47RingOne.style.left = `${vortex47CurrentX}px`;

    vortex47RingOne.style.top = `${vortex47CurrentY}px`;

    vortex47RingTwo.style.left = `${vortex47CurrentX}px`;

    vortex47RingTwo.style.top = `${vortex47CurrentY}px`;

    const ringSize = Math.min(80 + vortex47Speed * 3, 250);

    gsap.to(vortex47RingOne, {
      width: ringSize,
      height: ringSize,

      opacity: 0.6,

      duration: 0.25,

      overwrite: "auto",
    });

    gsap.to(vortex47RingTwo, {
      width: ringSize * 1.7,

      height: ringSize * 1.7,

      opacity: 0.25,

      duration: 0.4,

      overwrite: "auto",
    });
  }
  /* =============================================
       LETTER VORTEX
    ============================================= */

  if (vortex47Inside && !vortex47Pulsing) {
    vortex47Chars.forEach((char) => {
      const charRect = char.getBoundingClientRect();

      const stageRect = vortex47Stage.getBoundingClientRect();

      const charX = charRect.left - stageRect.left + charRect.width / 2;

      const charY = charRect.top - stageRect.top + charRect.height / 2;

      const dx = charX - vortex47CurrentX;

      const dy = charY - vortex47CurrentY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      /* Outside force field */

      if (distance > VORTEX47_RADIUS) {
        gsap.to(char, {
          x: 0,
          y: 0,

          rotation: 0,

          scale: 1,

          duration: 0.5,

          overwrite: "auto",

          ease: "power3.out",
        });

        return;
      }

      /* =========================================
                   FORCE
                ========================================= */

      const strength = 1 - distance / VORTEX47_RADIUS;

      const force = strength * strength;

      /* =========================================
                   TANGENTIAL ANGLE
                   Makes letters move around cursor
                ========================================= */

      const angle = Math.atan2(dy, dx);

      const tangentAngle = angle + Math.PI / 2;

      /* =========================================
                   VORTEX MOVEMENT
                ========================================= */

      const vortexForce = force * VORTEX47_FORCE;

      const moveX = Math.cos(tangentAngle) * vortexForce;

      const moveY = Math.sin(tangentAngle) * vortexForce;

      /* Pull slightly inward */

      const pullX = -Math.cos(angle) * force * 35;

      const pullY = -Math.sin(angle) * force * 35;

      /* Rotation */

      const rotation = force * 80;

      /* Scale */

      const scale = 1 + force * 0.12;

      gsap.to(char, {
        x: moveX + pullX,

        y: moveY + pullY,

        rotation,

        scale,

        duration: 0.25,

        overwrite: "auto",

        ease: "power2.out",
      });
    });
  }

  /* =============================================
       SPEED DECAY
    ============================================= */

  vortex47Speed *= 0.9;

  requestAnimationFrame(updateVortex47);
}

updateVortex47();

/* =========================================================
   CLICK
   VORTEX PULSE
========================================================= */

vortex47Stage.addEventListener(
    "click",
    () => {

        if (
            vortex47Pulsing
        ) return;


        vortex47Pulsing =
            true;


        /* =============================================
           CENTER OF EXPLOSION
        ============================================= */

        const stageRect =
            vortex47Stage.getBoundingClientRect();


        vortex47Chars.forEach(
            (char) => {

                const charRect =
                    char.getBoundingClientRect();


                const charX =
                    charRect.left -
                    stageRect.left +
                    charRect.width / 2;


                const charY =
                    charRect.top -
                    stageRect.top +
                    charRect.height / 2;


                const dx =
                    charX -
                    vortex47CurrentX;


                const dy =
                    charY -
                    vortex47CurrentY;


                const angle =
                    Math.atan2(
                        dy,
                        dx
                    );


                const distance =
                    Math.random() *
                    350 +
                    180;


                /* Spiral outward */

                const spiralAngle =
                    angle +
                    gsap.utils.random(
                        -1.5,
                        1.5
                    );


                gsap.to(
                    char,
                    {

                        x:
                            Math.cos(
                                spiralAngle
                            ) *
                            distance,


                        y:
                            Math.sin(
                                spiralAngle
                            ) *
                            distance,


                        rotation:
                            gsap.utils.random(
                                -720,
                                720
                            ),


                        scale:
                            gsap.utils.random(
                                0.6,
                                1.25
                            ),


                        opacity: 0,


                        duration: 0.9,


                        stagger: 0.03,


                        ease:
                            "power3.out"

                    }
                );

            }
        );


        /* =============================================
           VORTEX EXPANSION
        ============================================= */

        gsap.timeline()

            .set(
                [
                    vortex47RingOne,
                    vortex47RingTwo
                ],
                {
                    opacity: 0.8
                }
            )

            .to(
                vortex47RingOne,
                {
                    width: "150vmax",
                    height: "150vmax",

                    opacity: 0,

                    duration: 1,

                    ease:
                        "power4.out"
                },
                0
            )

            .to(
                vortex47RingTwo,
                {
                    width: "200vmax",
                    height: "200vmax",

                    opacity: 0,

                    duration: 1.2,

                    ease:
                        "power4.out"
                },
                0
            );


        /* =============================================
           REBUILD
        ============================================= */

        setTimeout(
            () => {

                gsap.to(
                    vortex47Chars,
                    {

                        x: 0,
                        y: 0,

                        rotation: 0,

                        scale: 1,

                        opacity: 1,


                        duration: 1.5,


                        stagger:
                            {
                                each: 0.07,

                                from:
                                    "random"
                            },


                        ease:
                            "elastic.out(1,.45)",


                        onComplete:
                            () => {

                                vortex47Pulsing =
                                    false;

                            }

                    }
                );

            },
            1100
        );

    }
);

/* =========================================================
   SECTION 48
   NEON TEXT GLITCH MATRIX
========================================================= */

const glitch48Stage =
    document.querySelector(
        ".glitch48-stage"
    );

const glitch48Word =
    document.querySelector(
        "#glitch48Word"
    );

const glitch48Cursor =
    document.querySelector(
        "#glitch48Cursor"
    );

const glitch48Flash =
    document.querySelector(
        "#glitch48Flash"
    );


/* =========================================================
   SET DATA TEXT
   Required for ghost layers
========================================================= */

const glitch48Text =
    glitch48Word
        .textContent
        .trim();


glitch48Word.setAttribute(
    "data-text",
    glitch48Text
);

/* =========================================================
   SPLIT TEXT
========================================================= */

glitch48Word.innerHTML =
    "";


[...glitch48Text].forEach(
    (letter) => {

        const char =
            document.createElement(
                "span"
            );


        char.className =
            "glitch48-char";


        char.textContent =
            letter;


        glitch48Word.appendChild(
            char
        );

    }
);


const glitch48Chars =
    gsap.utils.toArray(
        ".glitch48-char"
    );

/* =========================================================
   STATE
========================================================= */

let glitch48MouseX = 0;
let glitch48MouseY = 0;

let glitch48CurrentX = 0;
let glitch48CurrentY = 0;

let glitch48PreviousX = 0;
let glitch48PreviousY = 0;

let glitch48VelocityX = 0;
let glitch48VelocityY = 0;

let glitch48Speed = 0;

let glitch48Inside = false;

let glitch48Corrupting = false;

let glitch48GlitchTimeout;

/* =========================================================
   MOUSE ENTER
========================================================= */

glitch48Stage.addEventListener(
    "mouseenter",
    () => {

        glitch48Inside =
            true;


        gsap.to(
            glitch48Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: 0.3,

                ease:
                    "power3.out"

            }
        );

    }
);
/* =========================================================
   MOUSE MOVE
========================================================= */

glitch48Stage.addEventListener(
    "mousemove",
    (event) => {

        if (
            glitch48Corrupting
        ) return;


        const rect =
            glitch48Stage.getBoundingClientRect();


        glitch48MouseX =
            event.clientX -
            rect.left;


        glitch48MouseY =
            event.clientY -
            rect.top;


        /* =============================================
           VELOCITY
        ============================================= */

        glitch48VelocityX =
            glitch48MouseX -
            glitch48PreviousX;


        glitch48VelocityY =
            glitch48MouseY -
            glitch48PreviousY;


        glitch48Speed =
            Math.sqrt(

                glitch48VelocityX *
                glitch48VelocityX

                +

                glitch48VelocityY *
                glitch48VelocityY

            );


        glitch48PreviousX =
            glitch48MouseX;


        glitch48PreviousY =
            glitch48MouseY;


        /* =============================================
           MOVEMENT STATE
        ============================================= */

        if (
            glitch48Speed >
            12
        ) {

            glitch48Stage.classList.add(
                "is-moving"
            );


            clearTimeout(
                glitch48GlitchTimeout
            );


            glitch48GlitchTimeout =
                setTimeout(
                    () => {

                        glitch48Stage.classList.remove(
                            "is-moving"
                        );

                    },
                    120
                );

        }

    }
);
/* =========================================================
   MOUSE LEAVE
========================================================= */

glitch48Stage.addEventListener(
    "mouseleave",
    () => {

        glitch48Inside =
            false;


        glitch48Stage.classList.remove(
            "is-moving"
        );


        gsap.to(
            glitch48Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: 0.3

            }
        );


        gsap.to(
            glitch48Chars,
            {

                x: 0,
                y: 0,

                rotation: 0,

                opacity: 1,

                filter:
                    "blur(0px)",

                duration: 0.5,

                stagger: 0.02,

                overwrite:
                    "auto"

            }
        );

    }
);

/* =========================================================
   CURSOR LOOP
========================================================= */

function updateGlitch48() {

    glitch48CurrentX +=
        (
            glitch48MouseX -
            glitch48CurrentX
        ) *
        0.2;


    glitch48CurrentY +=
        (
            glitch48MouseY -
            glitch48CurrentY
        ) *
        0.2;


    glitch48Cursor.style.left =
        `${glitch48CurrentX}px`;


    glitch48Cursor.style.top =
        `${glitch48CurrentY}px`;


    /* =============================================
       FAST MOVEMENT EFFECT
    ============================================= */

    if (
        glitch48Speed >
        4 &&
        !glitch48Corrupting
    ) {

        const intensity =
            Math.min(
                glitch48Speed,
                40
            );


        /* Whole word distortion */

        gsap.to(
            glitch48Word,
            {

                x:
                    glitch48VelocityX *
                    0.4,

                y:
                    glitch48VelocityY *
                    0.08,

                skewX:
                    glitch48VelocityX *
                    0.08,

                duration: 0.08,

                overwrite:
                    "auto"

            }
        );


        /* =========================================
           INDIVIDUAL LETTER GLITCH
        ========================================= */

        glitch48Chars.forEach(
            (char) => {

                const charRect =
                    char.getBoundingClientRect();


                const stageRect =
                    glitch48Stage.getBoundingClientRect();


                const charX =
                    charRect.left -
                    stageRect.left +
                    charRect.width /
                    2;


                const distance =
                    Math.abs(
                        charX -
                        glitch48CurrentX
                    );


                /* Stronger near cursor */

                if (
                    distance <
                    250
                ) {

                    const strength =
                        1 -
                        distance /
                        250;


                    gsap.to(
                        char,
                        {

                            x:
                                gsap.utils.random(
                                    -intensity,
                                    intensity
                                ) *
                                strength,


                            y:
                                gsap.utils.random(
                                    -3,
                                    3
                                ),


                            rotation:
                                gsap.utils.random(
                                    -3,
                                    3
                                ),


                            duration:
                                0.08,


                            overwrite:
                                "auto"

                        }
                    );

                }

            }
        );

    }


    /* =============================================
       SPEED DECAY
    ============================================= */

    glitch48Speed *=
        0.85;


    /* =============================================
       RETURN WORD
    ============================================= */

    if (
        glitch48Speed <
        1 &&
        !glitch48Corrupting
    ) {

        gsap.to(
            glitch48Word,
            {

                x: 0,

                y: 0,

                skewX: 0,

                duration: 0.25,

                overwrite:
                    "auto"

            }
        );

    }


    requestAnimationFrame(
        updateGlitch48
    );

}


updateGlitch48();

/* =========================================================
   CLICK
   SYSTEM CORRUPTION
========================================================= */

glitch48Stage.addEventListener(
    "click",
    () => {

        if (
            glitch48Corrupting
        ) return;


        glitch48Corrupting =
            true;


        /* =============================================
           FLASH
        ============================================= */

        gsap.timeline()

            .to(
                glitch48Flash,
                {

                    opacity: 0.35,

                    duration: 0.06

                }
            )

            .to(
                glitch48Flash,
                {

                    opacity: 0,

                    duration: 0.15

                }
            );


        /* =============================================
           MASSIVE GLITCH
        ============================================= */

        const glitchTimeline =
            gsap.timeline();


        for (
            let i = 0;
            i < 10;
            i++
        ) {

            glitchTimeline.to(
                glitch48Chars,
                {

                    x: () =>
                        gsap.utils.random(
                            -80,
                            80
                        ),

                    y: () =>
                        gsap.utils.random(
                            -20,
                            20
                        ),

                    rotation: () =>
                        gsap.utils.random(
                            -15,
                            15
                        ),

                    opacity: () =>
                        gsap.utils.random(
                            0.3,
                            1
                        ),

                    duration:
                        0.05,

                    stagger:
                        0.01,

                    ease:
                        "none"

                }
            );

        }


        /* =============================================
           SYSTEM RESTORE
        ============================================= */

        glitchTimeline.to(
            glitch48Chars,
            {

                x: 0,
                y: 0,

                rotation: 0,

                opacity: 1,

                duration: 0.8,

                stagger:
                    {
                        each: 0.05,

                        from:
                            "random"
                    },

                ease:
                    "power4.out",


                onComplete:
                    () => {

                        glitch48Corrupting =
                            false;

                    }

            }
        );

    }
);
/* =========================================================
   SECTION 49
   MAGNETIC LIQUID TYPOGRAPHY
========================================================= */

const liquid49Stage =
    document.querySelector(
        ".liquid49-stage"
    );

const liquid49Word =
    document.querySelector(
        "#liquid49Word"
    );

const liquid49Cursor =
    document.querySelector(
        "#liquid49Cursor"
    );


/* =========================================================
   SPLIT TEXT
========================================================= */

const liquid49Text =
    liquid49Word
        .textContent
        .trim();


liquid49Word.innerHTML =
    "";


[...liquid49Text].forEach(
    (letter) => {

        const char =
            document.createElement(
                "span"
            );


        char.className =
            "liquid49-char";


        char.textContent =
            letter;


        liquid49Word.appendChild(
            char
        );

    }
);


const liquid49Chars =
    gsap.utils.toArray(
        ".liquid49-char"
    );


/* =========================================================
   SETTINGS
========================================================= */

const LIQUID49_RADIUS =
    400;

const LIQUID49_MAGNETIC_FORCE =
    90;


/* =========================================================
   STATE
========================================================= */

let liquid49MouseX = 0;
let liquid49MouseY = 0;

let liquid49CurrentX = 0;
let liquid49CurrentY = 0;

let liquid49PreviousX = 0;
let liquid49PreviousY = 0;

let liquid49VelocityX = 0;
let liquid49VelocityY = 0;

let liquid49Speed = 0;

let liquid49Inside = false;

let liquid49Melting = false;


/* =========================================================
   CREATE RIPPLE
========================================================= */

function createLiquid49Ripple(
    x,
    y
) {

    const ripple =
        document.createElement(
            "div"
        );


    ripple.className =
        "liquid49-ripple";


    liquid49Stage.appendChild(
        ripple
    );


    gsap.set(
        ripple,
        {
            left: x,
            top: y,

            width: 30,
            height: 30,

            xPercent: -50,
            yPercent: -50
        }
    );


    gsap.timeline()

        .to(
            ripple,
            {

                width: 250,
                height: 250,

                opacity: 0.4,

                duration: 0.8,

                ease:
                    "power2.out"

            }
        )

        .to(
            ripple,
            {

                opacity: 0,

                duration: 0.4,

                onComplete: () => {

                    ripple.remove();

                }

            }
        );

}

/* =========================================================
   MOUSE ENTER
========================================================= */

liquid49Stage.addEventListener(
    "mouseenter",
    () => {

        liquid49Inside =
            true;


        gsap.to(
            liquid49Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: 0.3,

                ease:
                    "power3.out"

            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

liquid49Stage.addEventListener(
    "mousemove",
    (event) => {

        if (
            liquid49Melting
        ) return;


        const rect =
            liquid49Stage
                .getBoundingClientRect();


        liquid49MouseX =
            event.clientX -
            rect.left;


        liquid49MouseY =
            event.clientY -
            rect.top;


        /* =============================================
           VELOCITY
        ============================================= */

        liquid49VelocityX =
            liquid49MouseX -
            liquid49PreviousX;


        liquid49VelocityY =
            liquid49MouseY -
            liquid49PreviousY;


        liquid49Speed =
            Math.sqrt(

                liquid49VelocityX *
                liquid49VelocityX

                +

                liquid49VelocityY *
                liquid49VelocityY

            );


        liquid49PreviousX =
            liquid49MouseX;


        liquid49PreviousY =
            liquid49MouseY;

    }
);

/* =========================================================
   MOUSE LEAVE
========================================================= */

liquid49Stage.addEventListener(
    "mouseleave",
    () => {

        liquid49Inside =
            false;


        gsap.to(
            liquid49Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: 0.3

            }
        );


        if (
            !liquid49Melting
        ) {

            gsap.to(
                liquid49Chars,
                {

                    x: 0,
                    y: 0,

                    rotation: 0,

                    scaleX: 1,
                    scaleY: 1,

                    duration: 1,

                    stagger: 0.05,

                    ease:
                        "elastic.out(1,.5)"

                }
            );

        }

    }
);

/* =========================================================
   ANIMATION LOOP
========================================================= */

function updateLiquid49() {
  /* =============================================
       SMOOTH CURSOR
    ============================================= */

  liquid49CurrentX += (liquid49MouseX - liquid49CurrentX) * 0.14;

  liquid49CurrentY += (liquid49MouseY - liquid49CurrentY) * 0.14;

  liquid49Cursor.style.left = `${liquid49CurrentX}px`;

  liquid49Cursor.style.top = `${liquid49CurrentY}px`;

  /* =============================================
       LETTER INTERACTION
    ============================================= */

  if (liquid49Inside && !liquid49Melting) {
    liquid49Chars.forEach((char) => {
      const charRect = char.getBoundingClientRect();

      const stageRect = liquid49Stage.getBoundingClientRect();

      const charX = charRect.left - stageRect.left + charRect.width / 2;

      const charY = charRect.top - stageRect.top + charRect.height / 2;

      const dx = liquid49CurrentX - charX;

      const dy = liquid49CurrentY - charY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      /* =========================================
                   OUTSIDE MAGNETIC FIELD
                ========================================= */

      if (distance > LIQUID49_RADIUS) {
        gsap.to(char, {
          x: 0,
          y: 0,

          rotation: 0,

          scaleX: 1,
          scaleY: 1,

          duration: 0.5,

          overwrite: "auto",

          ease: "power3.out",
        });

        return;
      }

      /* =========================================
                   MAGNETIC STRENGTH
                ========================================= */

      const strength = 1 - distance / LIQUID49_RADIUS;

      const force = strength * strength;

      /* =========================================
                   PULL TOWARD CURSOR
                ========================================= */

      const pullX = (dx / distance) * force * LIQUID49_MAGNETIC_FORCE;

      const pullY = (dy / distance) * force * LIQUID49_MAGNETIC_FORCE;

      /* =========================================
                   STRETCH BASED ON SPEED
                ========================================= */

      const stretch = Math.min(
        liquid49Speed / 25,

        0.35,
      );

      /* Direction */

      const direction = Math.atan2(
        liquid49VelocityY,

        liquid49VelocityX,
      );

      const rotate = direction * (180 / Math.PI) * force * 0.08;

      /* =========================================
                   DIRECT HOVER
                ========================================= */

      const hoverScale = distance < 120 ? 1 + force * 0.18 : 1;

      /* =========================================
                   APPLY
                ========================================= */

      gsap.to(char, {
        x: pullX,

        y: pullY,

        rotation: rotate,

        scaleX: hoverScale + stretch,

        scaleY: hoverScale - stretch * 0.3,

        duration: 0.25,

        overwrite: "auto",

        ease: "power2.out",
      });
    });
  }

  /* =============================================
       SPEED DECAY
    ============================================= */

  liquid49Speed *= 0.88;

  requestAnimationFrame(updateLiquid49);
}

updateLiquid49();

/* =========================================================
   CREATE MELTING DROPS
========================================================= */

function createLiquid49Drops() {
  const stageRect = liquid49Stage.getBoundingClientRect();

  const wordRect = liquid49Word.getBoundingClientRect();

  const totalDrops = 80;

  for (let i = 0; i < totalDrops; i++) {
    const drop = document.createElement("div");

    drop.className = "liquid49-drop";

    liquid49Stage.appendChild(drop);

    const x = wordRect.left - stageRect.left + Math.random() * wordRect.width;

    const y = wordRect.top - stageRect.top + Math.random() * wordRect.height;

    const size = gsap.utils.random(3, 12);

    gsap.set(drop, {
      left: x,
      top: y,

      width: size,
      height: size,

      opacity: gsap.utils.random(0.5, 1),
    });

    /* =========================================
           FALL
        ========================================= */

    gsap.to(drop, {
      y: gsap.utils.random(250, 550),

      x: gsap.utils.random(-100, 100),

      scaleY: gsap.utils.random(1.5, 3),

      opacity: 0,

      duration: gsap.utils.random(0.8, 1.8),

      delay: gsap.utils.random(0, 0.5),

      ease: "power2.in",

      onComplete: () => {
        drop.remove();
      },
    });
  }
}

/* =========================================================
   CLICK
   MELT + REBUILD
========================================================= */

liquid49Stage.addEventListener("click", () => {
  if (liquid49Melting) return;

  liquid49Melting = true;

  liquid49Stage.classList.add("is-melting");

  /* =============================================
           RIPPLE
        ============================================= */

  createLiquid49Ripple(
    liquid49CurrentX,

    liquid49CurrentY,
  );

  /* =============================================
           MELT LETTERS
        ============================================= */

  gsap.to(liquid49Chars, {
    y: 250,

    scaleY: 2.5,

    scaleX: 0.7,

    opacity: 0,

    rotation: () => gsap.utils.random(-8, 8),

    duration: 1.2,

    stagger: {
      each: 0.08,

      from: "random",
    },

    ease: "power3.in",
  });

  /* Create liquid particles */

  createLiquid49Drops();

  /* =============================================
           REBUILD
        ============================================= */

  setTimeout(() => {
    gsap.set(liquid49Chars, {
      y: -300,

      opacity: 0,

      scaleX: 0.5,

      scaleY: 1.8,
    });

    gsap.to(liquid49Chars, {
      x: 0,

      y: 0,

      rotation: 0,

      scaleX: 1,

      scaleY: 1,

      opacity: 1,

      duration: 1.5,

      stagger: {
        each: 0.1,

        from: "random",
      },

      ease: "elastic.out(1,.45)",

      onComplete: () => {
        liquid49Melting = false;

        liquid49Stage.classList.remove("is-melting");
      },
    });
  }, 1600);
});

/* =========================================================
   SECTION 50
   TYPOGRAPHY SINGULARITY
========================================================= */

const singularity50Stage =
    document.querySelector(
        ".singularity50-stage"
    );

const singularity50Word =
    document.querySelector(
        "#singularity50Word"
    );

const singularity50Core =
    document.querySelector(
        "#singularity50Core"
    );

const singularity50Cursor =
    document.querySelector(
        "#singularity50Cursor"
    );

const singularity50Particles =
    document.querySelector(
        "#singularity50Particles"
    );

const singularity50Waves =
    gsap.utils.toArray(
        ".singularity50-wave"
    );


/* =========================================================
   SPLIT TEXT
========================================================= */

const singularity50Text =
    singularity50Word
        .textContent
        .trim();


singularity50Word.innerHTML =
    "";


[...singularity50Text].forEach(
    (letter) => {

        const char =
            document.createElement(
                "span"
            );


        char.className =
            "singularity50-char";


        char.textContent =
            letter;


        singularity50Word.appendChild(
            char
        );

    }
);


const singularity50Chars =
    gsap.utils.toArray(
        ".singularity50-char"
    );


/* =========================================================
   STATE
========================================================= */

let singularity50MouseX = 0;
let singularity50MouseY = 0;

let singularity50CurrentX = 0;
let singularity50CurrentY = 0;

let singularity50Inside = false;

let singularity50Collapsing = false;


/* =========================================================
   MOUSE ENTER
========================================================= */

singularity50Stage.addEventListener(
    "mouseenter",
    () => {

        singularity50Inside =
            true;


        gsap.to(
            singularity50Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: 0.3,

                ease:
                    "power3.out"

            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

singularity50Stage.addEventListener(
    "mousemove",
    (event) => {

        if (
            singularity50Collapsing
        ) return;


        const rect =
            singularity50Stage
                .getBoundingClientRect();


        singularity50MouseX =
            event.clientX -
            rect.left;


        singularity50MouseY =
            event.clientY -
            rect.top;

    }
);
/* =========================================================
   MOUSE LEAVE
========================================================= */

singularity50Stage.addEventListener(
    "mouseleave",
    () => {

        singularity50Inside =
            false;


        gsap.to(
            singularity50Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: 0.3

            }
        );


        if (
            !singularity50Collapsing
        ) {

            gsap.to(
                singularity50Chars,
                {

                    x: 0,
                    y: 0,

                    rotation: 0,

                    scale: 1,

                    duration: 1,

                    stagger: 0.04,

                    ease:
                        "elastic.out(1,.5)"

                }
            );

        }

    }
);
/* =========================================================
   MAIN ANIMATION LOOP
========================================================= */

function updateSingularity50() {

    /* =============================================
       SMOOTH CURSOR
    ============================================= */

    singularity50CurrentX +=
        (
            singularity50MouseX -
            singularity50CurrentX
        ) *
        0.12;


    singularity50CurrentY +=
        (
            singularity50MouseY -
            singularity50CurrentY
        ) *
        0.12;


    /* =============================================
       CURSOR POSITION
    ============================================= */

    singularity50Cursor.style.left =
        `${singularity50CurrentX}px`;


    singularity50Cursor.style.top =
        `${singularity50CurrentY}px`;


    /* =============================================
       MAGNETIC TYPOGRAPHY
    ============================================= */

    if (
        singularity50Inside &&
        !singularity50Collapsing
    ) {

        const stageRect =
            singularity50Stage
                .getBoundingClientRect();


        singularity50Chars.forEach(
            (char) => {

                const charRect =
                    char
                        .getBoundingClientRect();


                const charX =
                    charRect.left -
                    stageRect.left +

                    charRect.width /
                    2;


                const charY =
                    charRect.top -
                    stageRect.top +

                    charRect.height /
                    2;


                const dx =
                    singularity50CurrentX -
                    charX;


                const dy =
                    singularity50CurrentY -
                    charY;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                const radius =
                    500;


                if (
                    distance >
                    radius
                ) {

                    gsap.to(
                        char,
                        {

                            x: 0,

                            y: 0,

                            scale: 1,

                            duration: 0.4,

                            overwrite:
                                "auto"

                        }
                    );


                    return;

                }


                /* =========================================
                   ATTRACTION STRENGTH
                ========================================= */

                const strength =
                    1 -
                    distance /
                    radius;


                const force =
                    strength *
                    strength;


                const moveX =
                    dx /
                    distance *
                    force *
                    110;


                const moveY =
                    dy /
                    distance *
                    force *
                    110;


                const scale =
                    1 +
                    force *
                    0.12;


                gsap.to(
                    char,
                    {

                        x:
                            moveX,

                        y:
                            moveY,

                        scale,

                        duration:
                            0.3,

                        overwrite:
                            "auto",

                        ease:
                            "power3.out"

                    }
                );

            }
        );

    }


    requestAnimationFrame(
        updateSingularity50
    );

}


updateSingularity50();

/* =========================================================
   CREATE PARTICLES
========================================================= */

function createSingularity50Particles() {

    const rect =
        singularity50Stage
            .getBoundingClientRect();


    const centerX =
        singularity50CurrentX;


    const centerY =
        singularity50CurrentY;


    const totalParticles =
        120;


    for (
        let i = 0;
        i < totalParticles;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.className =
            "singularity50-particle";


        singularity50Particles
            .appendChild(
                particle
            );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            Math.random() *
            40;


        const startX =
            centerX +
            Math.cos(angle) *
            distance;


        const startY =
            centerY +
            Math.sin(angle) *
            distance;


        gsap.set(
            particle,
            {

                left:
                    startX,

                top:
                    startY,

                opacity:
                    Math.random(),

                scale:
                    gsap.utils.random(
                        0.5,
                        1.5
                    )

            }
        );


        /* =========================================
           EXPLODE OUTWARD
        ========================================= */

        const explodeDistance =
            gsap.utils.random(
                150,
                700
            );


        gsap.to(
            particle,
            {

                x:
                    Math.cos(angle) *
                    explodeDistance,


                y:
                    Math.sin(angle) *
                    explodeDistance,


                opacity: 0,


                duration:
                    gsap.utils.random(
                        0.8,
                        1.8
                    ),


                ease:
                    "power3.out",


                onComplete:
                    () => {

                        particle.remove();

                    }

            }
        );

    }

}
/* =========================================================
   SHOCKWAVE
========================================================= */

function createSingularity50Shockwave(
    x,
    y
) {

    singularity50Waves.forEach(
        (
            wave,
            index
        ) => {

            gsap.set(
                wave,
                {

                    left: x,

                    top: y,

                    scale: 0,

                    opacity: 0.8

                }
            );


            gsap.to(
                wave,
                {

                    scale:
                        35 +
                        index *
                        12,


                    opacity: 0,


                    duration:
                        1.2 +
                        index *
                        0.2,


                    delay:
                        index *
                        0.12,


                    ease:
                        "power4.out"

                }
            );

        }
    );

}


/* =========================================================
   CLICK
   TYPOGRAPHY COLLAPSE
========================================================= */

singularity50Stage.addEventListener(
    "click",
    () => {

        if (
            singularity50Collapsing
        ) return;


        singularity50Collapsing =
            true;


        const stageRect =
            singularity50Stage
                .getBoundingClientRect();


        /* =============================================
           SHOW CORE
        ============================================= */

        gsap.set(
            singularity50Core,
            {

                left:
                    singularity50CurrentX,

                top:
                    singularity50CurrentY

            }
        );


        gsap.to(
            singularity50Core,
            {

                opacity: 1,

                scale: 1.5,

                duration: 0.3

            }
        );


        /* =============================================
           PULL ALL LETTERS INTO CURSOR
        ============================================= */

        singularity50Chars.forEach(
            (
                char,
                index
            ) => {

                const charRect =
                    char
                        .getBoundingClientRect();


                const charX =
                    charRect.left -
                    stageRect.left +

                    charRect.width /
                    2;


                const charY =
                    charRect.top -
                    stageRect.top +

                    charRect.height /
                    2;


                const dx =
                    singularity50CurrentX -
                    charX;


                const dy =
                    singularity50CurrentY -
                    charY;


                gsap.to(
                    char,
                    {

                        x:
                            `+=${dx}`,

                        y:
                            `+=${dy}`,

                        scale: 0.05,

                        opacity: 0,


                        rotation:
                            gsap.utils.random(
                                -360,
                                360
                            ),


                        duration:
                            0.7,


                        delay:
                            index *
                            0.03,


                        ease:
                            "power4.in"

                    }
                );

            }
        );


        /* =============================================
           CORE PULSE
        ============================================= */

        gsap.to(
            singularity50Core,
            {

                scale: 6,

                duration: 0.7,

                delay: 0.6,

                ease:
                    "power4.in"

            }
        );


        /* =============================================
           EXPLOSION
        ============================================= */

        setTimeout(
            () => {

                createSingularity50Particles();


                createSingularity50Shockwave(

                    singularity50CurrentX,

                    singularity50CurrentY

                );


                gsap.to(
                    singularity50Core,
                    {

                        scale: 40,

                        opacity: 0,

                        duration: 0.8,

                        ease:
                            "power4.out"

                    }
                );

            },
            850
        );


        /* =============================================
           REBUILD WORD
        ============================================= */

        setTimeout(
            () => {

                gsap.set(
                    singularity50Chars,
                    {

                        x: () =>
                            gsap.utils.random(
                                -600,
                                600
                            ),

                        y: () =>
                            gsap.utils.random(
                                -400,
                                400
                            ),

                        opacity: 0,

                        scale: 0.3

                    }
                );


                gsap.to(
                    singularity50Chars,
                    {

                        x: 0,

                        y: 0,

                        rotation: 0,

                        scale: 1,

                        opacity: 1,


                        duration: 1.6,


                        stagger:
                            {
                                each: 0.08,

                                from:
                                    "center"
                            },


                        ease:
                            "elastic.out(1,.5)",


                        onComplete:
                            () => {

                                singularity50Collapsing =
                                    false;

                            }

                    }
                );

            },
            1600
        );

    }
);








/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
