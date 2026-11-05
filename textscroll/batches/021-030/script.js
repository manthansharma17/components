gsap.registerPlugin(ScrollTrigger);

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

/*
   Pseudo-elements cannot be animated directly by GSAP.
   Instead, animate the stage and use CSS variables
   (.wireframe-stage::before/::after use --line-scale).
*/

const wireframeStage =
    document.querySelector(".wireframe-stage");

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
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
