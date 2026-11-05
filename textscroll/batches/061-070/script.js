gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   SECTION 61 — TYPOGRAPHY PULSE
========================================================= */

const pulse61Stage =
    document.querySelector(
        "#pulse61Stage"
    );

const pulse61Scene =
    document.querySelector(
        "#pulse61Scene"
    );

const pulse61Word =
    document.querySelector(
        "#pulse61Word"
    );

const pulse61Ghost1 =
    document.querySelector(
        "#pulse61Ghost1"
    );

const pulse61Ghost2 =
    document.querySelector(
        "#pulse61Ghost2"
    );

const pulse61Glow =
    document.querySelector(
        "#pulse61Glow"
    );

const pulse61Waves =
    document.querySelector(
        "#pulse61Waves"
    );

const pulse61Cursor =
    document.querySelector(
        "#pulse61Cursor"
    );

const pulse61Ring =
    document.querySelector(
        "#pulse61Ring"
    );

const pulse61Impact =
    document.querySelector(
        "#pulse61Impact"
    );

const pulse61Beat =
    document.querySelector(
        "#pulse61Beat"
    );


/* =========================================================
   STATE
========================================================= */

let pulse61MouseX = 0;
let pulse61MouseY = 0;

let pulse61CurrentX = 0;
let pulse61CurrentY = 0;

let pulse61PreviousX = 0;
let pulse61PreviousY = 0;

let pulse61Speed = 0;

let pulse61Inside = false;

let pulse61Locked = false;

let pulse61BeatStrength = 0;


/* =========================================================
   CREATE WAVE
========================================================= */

function createPulse61Wave(
    x,
    y,
    strength = 1
) {

    const wave =
        document.createElement(
            "div"
        );

    wave.className =
        "pulse61-wave";

    pulse61Waves.appendChild(
        wave
    );

    gsap.set(
        wave,
        {

            left: x,

            top: y,

            scale: .2,

            opacity:
                .15 +
                strength * .35

        }
    );

    gsap.to(
        wave,
        {

            scale:
                5 +
                strength * 5,

            opacity: 0,

            duration:
                .8 +
                strength * .3,

            ease:
                "power2.out",

            onComplete: () => {

                wave.remove();

            }

        }
    );

}


/* =========================================================
   HEARTBEAT
========================================================= */

function pulse61Heartbeat(
    strength = 1
) {

    if (pulse61Locked)
        return;


    pulse61BeatStrength =
        Math.max(
            pulse61BeatStrength,
            strength
        );


    gsap.timeline()

        .to(
            pulse61Word,
            {

                scale:
                    1 +
                    .08 * strength,

                duration: .09,

                ease:
                    "power2.out"

            }
        )

        .to(
            pulse61Word,
            {

                scale:
                    1 -
                    .025 * strength,

                duration: .11,

                ease:
                    "power2.inOut"

            }
        )

        .to(
            pulse61Word,
            {

                scale: 1,

                duration: .18,

                ease:
                    "power2.out"

            }
        );


    gsap.to(
        pulse61Ghost1,
        {

            scale:
                1 +
                .25 * strength,

            opacity:
                .25 * strength,

            duration: .4,

            ease:
                "power2.out",

            overwrite:
                "auto"

        }
    );


    gsap.to(
        pulse61Ghost1,
        {

            scale: 1,

            opacity: .04,

            duration: .55,

            delay: .05,

            ease:
                "power3.out"

        }
    );


    gsap.to(
        pulse61Ghost2,
        {

            scale:
                1 +
                .45 * strength,

            opacity:
                .15 * strength,

            duration: .5,

            ease:
                "power2.out",

            overwrite:
                "auto"

        }
    );


    gsap.to(
        pulse61Ghost2,
        {

            scale: 1,

            opacity: .02,

            duration: .7,

            delay: .05,

            ease:
                "power3.out"

        }
    );


    gsap.to(
        pulse61Glow,
        {

            scale:
                1 +
                .35 * strength,

            opacity:
                .3 +
                .25 * strength,

            duration: .18,

            ease:
                "power2.out",

            overwrite:
                "auto"

        }
    );


    gsap.to(
        pulse61Glow,
        {

            scale: 1,

            opacity: .3,

            duration: .55,

            delay: .05,

            ease:
                "power3.out"

        }
    );


    gsap.to(
        pulse61Beat,
        {

            scale:
                1 +
                4 * strength,

            opacity:
                .7,

            duration: .1,

            ease:
                "power2.out",

            overwrite:
                "auto"

        }
    );


    gsap.to(
        pulse61Beat,
        {

            scale: 1,

            opacity: .35,

            duration: .35,

            ease:
                "power3.out"

        }
    );


    createPulse61Wave(
        pulse61CurrentX,
        pulse61CurrentY,
        strength
    );

}

/* =========================================================
   ENTER
========================================================= */

pulse61Stage.addEventListener(
    "mouseenter",
    () => {

        pulse61Inside = true;


        gsap.to(
            pulse61Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: .3

            }
        );


        gsap.to(
            pulse61Ring,
            {

                opacity: 1,

                scale: 1,

                duration: .4,

                ease:
                    "power3.out"

            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

pulse61Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            pulse61Stage
                .getBoundingClientRect();


        pulse61MouseX =
            event.clientX -
            rect.left;


        pulse61MouseY =
            event.clientY -
            rect.top;


        const dx =
            pulse61MouseX -
            pulse61PreviousX;


        const dy =
            pulse61MouseY -
            pulse61PreviousY;


        pulse61Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        pulse61PreviousX =
            pulse61MouseX;


        pulse61PreviousY =
            pulse61MouseY;

    }
);


/* =========================================================
   LEAVE
========================================================= */

pulse61Stage.addEventListener(
    "mouseleave",
    () => {

        pulse61Inside = false;


        gsap.to(
            pulse61Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: .25

            }
        );


        gsap.to(
            pulse61Ring,
            {

                opacity: 0,

                scale: .7,

                duration: .25

            }
        );


        if (!pulse61Locked) {

            gsap.to(
                pulse61Scene,
                {

                    x: 0,

                    y: 0,

                    rotationX: 0,

                    rotationY: 0,

                    duration: .7,

                    ease:
                        "power3.out"

                }
            );

        }

    }
);

/* =========================================================
   MAIN LOOP
========================================================= */

function updatePulse61() {

    pulse61CurrentX +=
        (
            pulse61MouseX -
            pulse61CurrentX
        ) * .12;


    pulse61CurrentY +=
        (
            pulse61MouseY -
            pulse61CurrentY
        ) * .12;


    /* =============================================
       CURSOR
    ============================================= */

    pulse61Cursor.style.left =
        pulse61CurrentX + "px";

    pulse61Cursor.style.top =
        pulse61CurrentY + "px";


    pulse61Ring.style.left =
        pulse61CurrentX + "px";

    pulse61Ring.style.top =
        pulse61CurrentY + "px";


    if (
        pulse61Inside &&
        !pulse61Locked
    ) {

        const rect =
            pulse61Stage
                .getBoundingClientRect();


        const centerX =
            rect.width / 2;


        const centerY =
            rect.height / 2;


        const dx =
            pulse61CurrentX -
            centerX;


        const dy =
            pulse61CurrentY -
            centerY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        const influence =
            Math.max(
                0,
                1 -
                distance / 700
            );


        const movement =
            Math.min(
                pulse61Speed * .015,
                .6
            );


        /* =========================================
           CURSOR-DRIVEN BREATHING
        ========================================= */

        const breathing =
            influence *
            (
                .02 +
                movement * .08
            );


        gsap.to(
            pulse61Word,
            {

                x:
                    dx *
                    influence *
                    .045,

                y:
                    dy *
                    influence *
                    .025,

                scaleX:
                    1 +
                    breathing,

                scaleY:
                    1 -
                    breathing * .4,

                rotationY:
                    dx *
                    influence *
                    .006,

                rotationX:
                    dy *
                    influence *
                    -.004,

                duration: .3,

                overwrite:
                    "auto",

                ease:
                    "power2.out"

            }
        );


        /* =========================================
           SCENE PARALLAX
        ========================================= */

        gsap.to(
            pulse61Scene,
            {

                rotationY:
                    dx * .003,

                rotationX:
                    dy * -.002,

                duration: .45,

                overwrite:
                    "auto"

            }
        );


        /* =========================================
           HEAT FOLLOW
        ========================================= */

        gsap.to(
            pulse61Glow,
            {

                x:
                    dx * .35,

                y:
                    dy * .35,

                duration: .5,

                overwrite:
                    "auto"

            }
        );


        /* =========================================
           RING SIZE
        ========================================= */

        gsap.to(
            pulse61Ring,
            {

                scale:
                    1 +
                    influence * .35 +
                    movement * .3,

                duration: .25,

                overwrite:
                    "auto"

            }
        );


        /* =========================================
           FAST MOUSE = HEARTBEAT
        ========================================= */

        if (
            pulse61Speed > 14 &&
            Math.random() < .08
        ) {

            pulse61Heartbeat(
                Math.min(
                    1 +
                    pulse61Speed / 100,
                    1.8
                )
            );

        }

    }


    /* =============================================
       DECAY
    ============================================= */

    pulse61Speed *= .9;

    pulse61BeatStrength *= .92;


    requestAnimationFrame(
        updatePulse61
    );

}


updatePulse61();


/* =========================================================
   CLICK — MASSIVE PULSE
========================================================= */

pulse61Stage.addEventListener("click", () => {
  if (pulse61Locked) return;

  pulse61Locked = true;

  const rect = pulse61Stage.getBoundingClientRect();

  const x = pulse61CurrentX || rect.width / 2;

  const y = pulse61CurrentY || rect.height / 2;

  /* =============================================
           IMPACT WAVE
        ============================================= */

  gsap.set(pulse61Impact, {
    left: x,

    top: y,

    scale: 0.1,

    opacity: 1,
  });

  gsap.to(pulse61Impact, {
    scale: 20,

    opacity: 0,

    duration: 1.2,

    ease: "power2.out",
  });

  /* =============================================
           MULTIPLE WAVES
        ============================================= */

  createPulse61Wave(x, y, 2);

  setTimeout(() => {
    createPulse61Wave(x, y, 1.5);
  }, 100);

  setTimeout(() => {
    createPulse61Wave(x, y, 1);
  }, 220);

  /* =============================================
           BIG HEARTBEAT
        ============================================= */

  gsap
    .timeline()

    .to(pulse61Word, {
      scale: 1.35,

      filter: "blur(0px)",

      duration: 0.12,

      ease: "power2.out",
    })

    .to(pulse61Word, {
      scale: 0.88,

      duration: 0.16,

      ease: "power2.inOut",
    })

    .to(pulse61Word, {
      scale: 1.18,

      duration: 0.14,

      ease: "power2.out",
    })

    .to(pulse61Word, {
      scale: 1,

      duration: 0.5,

      ease: "elastic.out(1,.3)",
    });

  /* =============================================
           GHOST EXPANSION
        ============================================= */

  gsap.to(pulse61Ghost1, {
    scale: 2.2,

    opacity: 0.35,

    duration: 0.5,

    ease: "power2.out",
  });

  gsap.to(pulse61Ghost1, {
    scale: 1,

    opacity: 0.04,

    duration: 0.8,

    delay: 0.15,

    ease: "power3.out",
  });

  gsap.to(pulse61Ghost2, {
    scale: 3.5,

    opacity: 0.2,

    duration: 0.7,

    ease: "power2.out",
  });

  gsap.to(pulse61Ghost2, {
    scale: 1,

    opacity: 0.02,

    duration: 1,

    delay: 0.1,

    ease: "power3.out",
  });

  /* =============================================
           SCREEN GLOW
        ============================================= */

  gsap
    .timeline()

    .to(pulse61Glow, {
      scale: 2.5,

      opacity: 0.85,

      duration: 0.15,

      ease: "power2.out",
    })

    .to(pulse61Glow, {
      scale: 1,

      opacity: 0.3,

      duration: 0.8,

      ease: "power3.out",
    });

  /* =============================================
           BEAT
        ============================================= */

  gsap
    .timeline()

    .to(pulse61Beat, {
      scale: 7,

      opacity: 1,

      duration: 0.12,
    })

    .to(pulse61Beat, {
      scale: 1,

      opacity: 0.35,

      duration: 0.5,

      ease: "elastic.out(1,.4)",
    });

  /* =============================================
           SECONDARY HEARTBEAT
        ============================================= */

  setTimeout(() => {
    gsap.to(pulse61Word, {
      scale: 1.08,

      duration: 0.1,

      ease: "power2.out",
    });

    gsap.to(pulse61Word, {
      scale: 1,

      duration: 0.35,

      delay: 0.1,

      ease: "power2.out",
    });
  }, 420);

  /* =============================================
           UNLOCK
        ============================================= */

  setTimeout(() => {
    pulse61Locked = false;
  }, 1100);
});
/* =========================================================
   SECTION 62 — TYPOGRAPHY MAGNET
========================================================= */

const magnet62Stage =
    document.querySelector(
        "#magnet62Stage"
    );

const magnet62Word =
    document.querySelector(
        "#magnet62Word"
    );

const magnet62Letters =
    document.querySelectorAll(
        ".magnet62-letter"
    );

const magnet62Field =
    document.querySelector(
        "#magnet62Field"
    );

const magnet62Lines =
    document.querySelector(
        "#magnet62Lines"
    );

const magnet62Cursor =
    document.querySelector(
        "#magnet62Cursor"
    );

const magnet62Ring =
    document.querySelector(
        "#magnet62Ring"
    );

const magnet62Vortex =
    document.querySelector(
        "#magnet62Vortex"
    );

const magnet62Impact =
    document.querySelector(
        "#magnet62Impact"
    );


/* =========================================================
   STATE
========================================================= */

let magnet62MouseX = 0;
let magnet62MouseY = 0;

let magnet62CurrentX = 0;
let magnet62CurrentY = 0;

let magnet62PreviousX = 0;
let magnet62PreviousY = 0;

let magnet62Speed = 0;

let magnet62Inside = false;

let magnet62Locked = false;


/* =========================================================
   CREATE FIELD LINES
========================================================= */

for (
    let i = 0;
    i < 20;
    i++
) {

    const line =
        document.createElement(
            "div"
        );

    line.className =
        "magnet62-line";


    const angle =
        (
            i / 20
        ) * 360;


    line.style.transform =
        `translate(-50%, -50%)
         rotate(${angle}deg)`;


    line.style.width =
        150 +
        Math.random() * 250 +
        "px";


    magnet62Lines.appendChild(
        line
    );

}


/* =========================================================
   ENTER
========================================================= */

magnet62Stage.addEventListener(
    "mouseenter",
    () => {

        magnet62Inside = true;


        gsap.to(
            magnet62Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: .3

            }
        );


        gsap.to(
            magnet62Ring,
            {

                opacity: 1,

                scale: 1,

                duration: .4,

                ease:
                    "power3.out"

            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

magnet62Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            magnet62Stage
                .getBoundingClientRect();


        magnet62MouseX =
            event.clientX -
            rect.left;


        magnet62MouseY =
            event.clientY -
            rect.top;


        const dx =
            magnet62MouseX -
            magnet62PreviousX;


        const dy =
            magnet62MouseY -
            magnet62PreviousY;


        magnet62Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        magnet62PreviousX =
            magnet62MouseX;


        magnet62PreviousY =
            magnet62MouseY;

    }
);


/* =========================================================
   LEAVE
========================================================= */

magnet62Stage.addEventListener(
    "mouseleave",
    () => {

        magnet62Inside = false;


        gsap.to(
            magnet62Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: .25

            }
        );


        gsap.to(
            magnet62Ring,
            {

                opacity: 0,

                scale: .7,

                duration: .25

            }
        );


        if (!magnet62Locked) {

            magnet62Letters.forEach(
                (letter) => {

                    gsap.to(
                        letter,
                        {

                            x: 0,

                            y: 0,

                            z: 0,

                            rotationX: 0,

                            rotationY: 0,

                            rotationZ: 0,

                            scale: 1,

                            duration: .7,

                            ease:
                                "elastic.out(1,.4)"

                        }
                    );

                }
            );

        }

    }
);

/* =========================================================
   MAIN MAGNET LOOP
========================================================= */

function updateMagnet62() {

    magnet62CurrentX +=
        (
            magnet62MouseX -
            magnet62CurrentX
        ) * .13;


    magnet62CurrentY +=
        (
            magnet62MouseY -
            magnet62CurrentY
        ) * .13;


    /* =============================================
       CURSOR
    ============================================= */

    magnet62Cursor.style.left =
        magnet62CurrentX + "px";

    magnet62Cursor.style.top =
        magnet62CurrentY + "px";


    magnet62Ring.style.left =
        magnet62CurrentX + "px";

    magnet62Ring.style.top =
        magnet62CurrentY + "px";


    if (
        magnet62Inside &&
        !magnet62Locked
    ) {

        const rect =
            magnet62Stage
                .getBoundingClientRect();


        const centerX =
            rect.width / 2;


        const centerY =
            rect.height / 2;


        /* =========================================
           EACH LETTER BECOMES A MAGNET
        ========================================= */

        magnet62Letters.forEach(
            (letter, index) => {

                const letterRect =
                    letter.getBoundingClientRect();


                const letterX =
                    letterRect.left +
                    letterRect.width / 2 -
                    rect.left;


                const letterY =
                    letterRect.top +
                    letterRect.height / 2 -
                    rect.top;


                const dx =
                    magnet62CurrentX -
                    letterX;


                const dy =
                    magnet62CurrentY -
                    letterY;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                const radius = 430;


                const influence =
                    Math.max(
                        0,
                        1 -
                        distance / radius
                    );


                const speed =
                    Math.min(
                        magnet62Speed * .02,
                        1
                    );

    /* =================================
                   ATTRACT
                ================================= */

                const pull =
                    influence *
                    (
                        25 +
                        speed * 90
                    );


                const x =
                    dx *
                    pull /
                    Math.max(
                        distance,
                        1
                    );


                const y =
                    dy *
                    pull /
                    Math.max(
                        distance,
                        1
                    );


                const rotation =
                    dx *
                    influence *
                    .03;


                const scale =
                    1 +
                    influence *
                    .12;


                gsap.to(
                    letter,
                    {

                        x: x,

                        y: y,

                        z:
                            influence *
                            100,

                        rotationY:
                            rotation,

                        rotationX:
                            dy *
                            influence *
                            -.02,

                        rotationZ:
                            speed *
                            (
                                index % 2
                                ? -1
                                : 1
                            ) *
                            influence *
                            8,

                        scale: scale,

                        filter:
                            influence > .5
                                ? "blur(0px)"
                                : "blur(0px)",

                        duration: .25,

                        overwrite:
                            "auto",

                        ease:
                            "power3.out"

                    }
                );

            }
        );


        /* =========================================
           FIELD
        ========================================= */

        const dx =
            magnet62CurrentX -
            centerX;


        const dy =
            magnet62CurrentY -
            centerY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        const influence =
            Math.max(
                0,
                1 -
                distance / 700
            );


        gsap.to(
            magnet62Field,
            {

                x:
                    dx * .45,

                y:
                    dy * .45,

                scale:
                    .8 +
                    influence * .6,

                opacity:
                    .3 +
                    influence * .35,

                duration: .5,

                overwrite:
                    "auto"

            }
        );


     /* =========================================
           FIELD LINES
        ========================================= */

        const lines =
            magnet62Lines.children;


        for (
            let i = 0;
            i < lines.length;
            i++
        ) {

            const angle =
                (
                    i / lines.length
                ) * 360;


            gsap.to(
                lines[i],
                {

                    rotation:
                        angle +
                        dx *
                        influence *
                        .04,

                    scaleX:
                        1 +
                        influence *
                        .8,

                    opacity:
                        influence *
                        .25,

                    duration: .5,

                    overwrite:
                        "auto"

                }
            );

        }


        /* =========================================
           CURSOR RING
        ========================================= */

        gsap.to(
            magnet62Ring,
            {

                scale:
                    1 +
                    influence *
                    .45,

                duration: .25,

                overwrite:
                    "auto"

            }
        );

    }


    /* =============================================
       SPEED DECAY
    ============================================= */

    magnet62Speed *= .9;


    requestAnimationFrame(
        updateMagnet62
    );

}


updateMagnet62();


/* =========================================================
   CLICK — MAGNETIC VORTEX
========================================================= */

magnet62Stage.addEventListener("click", () => {
  if (magnet62Locked) return;

  magnet62Locked = true;

  const rect = magnet62Stage.getBoundingClientRect();

  const targetX = magnet62CurrentX || rect.width / 2;

  const targetY = magnet62CurrentY || rect.height / 2;

  /* =============================================
           IMPACT
        ============================================= */

  gsap.set(magnet62Impact, {
    left: targetX,

    top: targetY,

    scale: 0,

    opacity: 1,
  });

  gsap.to(magnet62Impact, {
    scale: 20,

    opacity: 0,

    duration: 1,

    ease: "power3.out",
  });

  /* =============================================
           VORTEX
        ============================================= */

  gsap.set(magnet62Vortex, {
    left: targetX,

    top: targetY,

    scale: 0.2,

    rotation: 0,

    opacity: 1,
  });

  gsap.to(magnet62Vortex, {
    scale: 8,

    rotation: 720,

    opacity: 0,

    duration: 1,

    ease: "power3.in",
  });
  /* =============================================
           PULL EVERY LETTER INTO CURSOR
        ============================================= */

  magnet62Letters.forEach((letter, index) => {
    const letterRect = letter.getBoundingClientRect();

    const letterX = letterRect.left + letterRect.width / 2 - rect.left;

    const letterY = letterRect.top + letterRect.height / 2 - rect.top;

    const x = targetX - letterX;

    const y = targetY - letterY;

    gsap.to(letter, {
      x: "+=" + x,

      y: "+=" + y,

      z: 400,

      rotationX: 360 + Math.random() * 720,

      rotationY: 360 + Math.random() * 720,

      rotationZ: -360 + Math.random() * 720,

      scale: 0.08,

      opacity: 0,

      duration: 0.65 + Math.random() * 0.3,

      delay: index * 0.025,

      ease: "power4.in",
    });
  });

  /* =============================================
           FIELD COLLAPSE
        ============================================= */

  gsap.to(magnet62Field, {
    scale: 0.05,

    opacity: 0,

    duration: 0.7,

    ease: "power4.in",
  });

  /* =============================================
           RECONSTRUCT
        ============================================= */

  setTimeout(() => {
    magnet62Letters.forEach((letter) => {
      gsap.set(letter, {
        x: targetX - rect.width / 2,

        y: targetY - rect.height / 2,

        z: 500,

        rotationX: -180,

        rotationY: 180,

        rotationZ: 90,

        scale: 0.05,

        opacity: 0,
      });
    });

    gsap.set(magnet62Field, {
      scale: 0.05,

      opacity: 0,
    });

    /* =====================================
                   SHOOT LETTERS BACK
                ===================================== */

    magnet62Letters.forEach((letter, index) => {
      gsap.to(letter, {
        x: 0,

        y: 0,

        z: 0,

        rotationX: 0,

        rotationY: 0,

        rotationZ: 0,

        scale: 1,

        opacity: 1,

        duration: 0.8 + Math.random() * 0.25,

        delay: index * 0.04,

        ease: "elastic.out(1,.35)",
      });
    });

    gsap.to(magnet62Field, {
      scale: 0.8,

      opacity: 0.35,

      duration: 0.9,

      ease: "power3.out",
    });

    /* =====================================
                   RESET LINES
                ===================================== */

    gsap.to(magnet62Lines.children, {
      rotation: 0,

      scaleX: 1,

      opacity: 0,

      duration: 0.5,
    });

    setTimeout(() => {
      magnet62Locked = false;
    }, 1100);
  }, 900);
});

/* =========================================================
   SECTION 63 — TYPOGRAPHY ECHO
========================================================= */

(() => {
  const stage = document.getElementById("echo63Stage");
  const word = document.getElementById("echo63Word");
  const echoes = document.getElementById("echo63Echoes");
  const cursor = document.getElementById("echo63Cursor");
  const ring = document.getElementById("echo63Ring");
  const impact = document.getElementById("echo63Impact");

  if (!stage || !word) return;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const GHOST_COUNT = isMobile ? 9 : 16;

  const ghosts = [];

  /* -------------------------------------------------------
     CREATE ECHOES
  ------------------------------------------------------- */

  for (let i = 0; i < GHOST_COUNT; i++) {
    const ghost = document.createElement("div");

    ghost.className = "echo63-ghost";
    ghost.textContent = "ECHO";

    const progress = i / (GHOST_COUNT - 1);

    ghost.style.opacity = 0.04 + (1 - progress) * 0.22;

    echoes.appendChild(ghost);

    ghosts.push({
      el: ghost,
      index: i,
    });
  }

  /* -------------------------------------------------------
     MOUSE STATE
  ------------------------------------------------------- */

  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,

    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,

    previousX: window.innerWidth / 2,
    previousY: window.innerHeight / 2,

    speed: 0,
  };

  let locked = false;

  /* -------------------------------------------------------
     HISTORY
  ------------------------------------------------------- */

  const history = [];

  for (let i = 0; i < GHOST_COUNT + 8; i++) {
    history.push({
      x: mouse.x,
      y: mouse.y,
    });
  }

  /* -------------------------------------------------------
     MOUSE MOVE
  ------------------------------------------------------- */

  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  /* -------------------------------------------------------
     CLICK
  ------------------------------------------------------- */

  stage.addEventListener("click", () => {
    if (locked) return;

    locked = true;

    collapseEchoes();
  });

  /* -------------------------------------------------------
     CURSOR
  ------------------------------------------------------- */

  function updateCursor() {
    if (isMobile) return;

    gsap.to(cursor, {
      x: mouse.targetX,
      y: mouse.targetY,
      duration: 0.35,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(ring, {
      x: mouse.targetX,
      y: mouse.targetY,
      duration: 0.65,
      ease: "power3.out",
      overwrite: true,
    });
  }

  /* -------------------------------------------------------
     MAIN ANIMATION
  ------------------------------------------------------- */

  function animate() {
    requestAnimationFrame(animate);

    if (locked) return;

    mouse.x += (mouse.targetX - mouse.x) * 0.12;
    mouse.y += (mouse.targetY - mouse.y) * 0.12;

    const dx = mouse.x - mouse.previousX;
    const dy = mouse.y - mouse.previousY;

    const velocity = Math.sqrt(dx * dx + dy * dy);

    mouse.speed += (velocity - mouse.speed) * 0.15;

    mouse.previousX = mouse.x;
    mouse.previousY = mouse.y;

    /* -----------------------------------------------
       STORE POSITION HISTORY
    ----------------------------------------------- */

    history.unshift({
      x: mouse.x,
      y: mouse.y,
    });

    history.pop();

    /* -----------------------------------------------
       CENTER
    ----------------------------------------------- */

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const offsetX = mouse.x - centerX;
    const offsetY = mouse.y - centerY;

    /* -----------------------------------------------
       MAIN WORD RESPONSE
    ----------------------------------------------- */

    const wordX = offsetX * 0.025;
    const wordY = offsetY * 0.025;

    const rotateX = offsetY * -0.006;
    const rotateY = offsetX * 0.006;

    const mainScale = 1 + Math.min(mouse.speed * 0.0012, 0.045);

    word.style.transform = `
      translate3d(
        calc(-50% + ${wordX}px),
        calc(-50% + ${wordY}px),
        0
      )
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${mainScale})
    `;

    /* -----------------------------------------------
       ECHO TRAIL
    ----------------------------------------------- */

    ghosts.forEach((ghost, i) => {
      const h = history[i * 2 + 2] || history[history.length - 1];

      const hx = h.x - centerX;
      const hy = h.y - centerY;

      const progress = i / (GHOST_COUNT - 1);

      /*
        Older echoes travel farther away from
        the main typography.
      */

      const travel = 0.22 + progress * 1.05;

      const x = hx * travel;
      const y = hy * travel;

      const direction = Math.atan2(hy, hx) * (180 / Math.PI);

      const rotation = direction * 0.018 + Math.sin(i * 1.7) * 2;

      const scale = 0.98 + Math.sin(i * 0.8) * 0.025 - progress * 0.035;

      const blur = progress * 3.2 + Math.min(mouse.speed * progress * 0.08, 3);

      const opacity =
        (1 - progress) * (0.25 + Math.min(mouse.speed * 0.01, 0.2));

      ghost.el.style.transform = `
        translate3d(
          calc(-50% + ${x}px),
          calc(-50% + ${y}px),
          ${progress * -30}px
        )
        rotate(${rotation}deg)
        scale(${scale})
      `;

      ghost.el.style.opacity = opacity;

      ghost.el.style.filter = `
        blur(${blur}px)
      `;
    });

    updateCursor();
  }

  animate();
  /* -------------------------------------------------------
     COLLAPSE ECHOES
  ------------------------------------------------------- */

  function collapseEchoes() {
    /* Cursor freezes */

    gsap.killTweensOf(ghosts.map((g) => g.el));

    /* -----------------------------------------------------
       PHASE 1 — TIME COLLAPSE
    ----------------------------------------------------- */

    ghosts.forEach((ghost, i) => {
      gsap.to(ghost.el, {
        x: 0,
        y: 0,

        rotation: 0,
        scale: 1,

        opacity: 0.45,

        filter: "blur(0px)",

        duration: 0.7 + i * 0.025,

        ease: "expo.inOut",
      });
    });

    gsap.to(word, {
      scale: 1.08,

      duration: 0.7,

      ease: "power4.inOut",
    });

    /* -----------------------------------------------------
       PHASE 2 — IMPACT
    ----------------------------------------------------- */

    gsap.delayedCall(0.75, () => {
      createWaves();

      gsap.to(word, {
        scale: 1.2,

        duration: 0.12,

        ease: "power4.out",

        yoyo: true,

        repeat: 1,
      });

      gsap.to(impact, {
        scale: 30,

        opacity: 0,

        duration: 1.2,

        ease: "expo.out",
      });
      /* ---------------------------------------------------
         PHASE 3 — EXPLODE ECHOES
      --------------------------------------------------- */

      ghosts.forEach((ghost, i) => {
        const angle = ((Math.PI * 2) / GHOST_COUNT) * i;

        const distance = 180 + Math.random() * 500;

        const x = Math.cos(angle) * distance;

        const y = Math.sin(angle) * distance;

        gsap.to(ghost.el, {
          x,
          y,

          rotation: (Math.random() - 0.5) * 80,

          scale: 0.5 + Math.random() * 0.7,

          opacity: 0,

          filter: `blur(${8 + Math.random() * 8}px)`,

          duration: 1.1 + Math.random() * 0.5,

          delay: i * 0.015,

          ease: "expo.out",
        });
      });

      gsap.to(word, {
        scale: 1,

        duration: 1.1,

        ease: "expo.out",

        delay: 0.15,
      });
    });

    /* -----------------------------------------------------
       RESET
    ----------------------------------------------------- */

    gsap.delayedCall(2.15, () => {
      ghosts.forEach((ghost, i) => {
        gsap.set(ghost.el, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 0.04 + (1 - i / (GHOST_COUNT - 1)) * 0.22,
          filter: "blur(0px)",
        });
      });

      for (let i = 0; i < history.length; i++) {
        history[i].x = mouse.x;
        history[i].y = mouse.y;
      }

      locked = false;
    });
  }

  /* -------------------------------------------------------
     IMPACT WAVES
  ------------------------------------------------------- */

  function createWaves() {
    for (let i = 0; i < 3; i++) {
      const wave = document.createElement("div");

      wave.className = "echo63-wave";

      stage.appendChild(wave);

      gsap.to(wave, {
        scale: 25 + i * 12,

        opacity: 0,

        duration: 1.1 + i * 0.2,

        delay: i * 0.12,

        ease: "expo.out",

        onComplete: () => {
          wave.remove();
        },
      });
    }
  }
})();

/* =========================================================
   SECTION 64 — TIME FREEZE
========================================================= */

(() => {
  const stage = document.getElementById("freeze64Stage");

  const scene = document.getElementById("freeze64Scene");

  const word = document.getElementById("freeze64Word");

  const slices = document.getElementById("freeze64Slices");

  const cursor = document.getElementById("freeze64Cursor");

  const ring = document.getElementById("freeze64Ring");

  const status = document.getElementById("freeze64Status");

  if (!stage || !word) return;

  /* -------------------------------------------------------
     CONFIG
  ------------------------------------------------------- */

  const mobile = window.matchMedia("(max-width: 768px)").matches;

  const SLICE_COUNT = mobile ? 9 : 16;

  /* -------------------------------------------------------
     CREATE TEMPORAL SLICES
  ------------------------------------------------------- */

  const sliceElements = [];

  for (let i = 0; i < SLICE_COUNT; i++) {
    const slice = document.createElement("div");

    slice.className = "freeze64-slice";

    slice.textContent = "TIME";

    slices.appendChild(slice);

    sliceElements.push(slice);
  }

  /* -------------------------------------------------------
     FLASH
  ------------------------------------------------------- */

  const flash = document.createElement("div");

  flash.className = "freeze64-flash";

  stage.appendChild(flash);

  /* -------------------------------------------------------
     MOUSE
  ------------------------------------------------------- */

  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,

    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,

    previousX: window.innerWidth / 2,
    previousY: window.innerHeight / 2,

    velocity: 0,
  };

  let active = false;
  let frozen = false;

  /* -------------------------------------------------------
     MOUSE MOVE
  ------------------------------------------------------- */

  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;

    active = true;

    status.textContent = "TEMPORAL DISTORTION";
  });

  /* -------------------------------------------------------
     MOUSE LEAVE
  ------------------------------------------------------- */

  window.addEventListener("mouseleave", () => {
    active = false;

    status.textContent = "MOVE TO DISTORT";
  });

  /* -------------------------------------------------------
     CLICK
  ------------------------------------------------------- */

  stage.addEventListener("click", () => {
    if (frozen) return;

    frozen = true;

    freezeSequence();
  });

  /* -------------------------------------------------------
     MAIN LOOP
  ------------------------------------------------------- */

  function animate() {
    requestAnimationFrame(animate);

    if (frozen) return;
    /* -----------------------------------------------
       SMOOTH MOUSE
    ----------------------------------------------- */

    mouse.x += (mouse.targetX - mouse.x) * 0.12;

    mouse.y += (mouse.targetY - mouse.y) * 0.12;

    /* -----------------------------------------------
       VELOCITY
    ----------------------------------------------- */

    const dx = mouse.x - mouse.previousX;

    const dy = mouse.y - mouse.previousY;

    const velocity = Math.sqrt(dx * dx + dy * dy);

    mouse.velocity += (velocity - mouse.velocity) * 0.15;

    mouse.previousX = mouse.x;
    mouse.previousY = mouse.y;

    /* -----------------------------------------------
       NORMALIZED POSITION
    ----------------------------------------------- */

    const centerX = window.innerWidth / 2;

    const centerY = window.innerHeight / 2;

    const nx = (mouse.x - centerX) / window.innerWidth;

    const ny = (mouse.y - centerY) / window.innerHeight;

    const intensity = Math.min(mouse.velocity * 0.025, 1);

    /* -----------------------------------------------
       MAIN WORD
    ----------------------------------------------- */

    const mainX = nx * 25;

    const mainY = ny * 18;

    const rotate = nx * 2.5;

    const scale = 1 + intensity * 0.025;

    word.style.transform = `
      translate3d(
        ${mainX}px,
        ${mainY}px,
        0
      )
      rotate(${rotate}deg)
      scale(${scale})
    `;
    /* -----------------------------------------------
       TEMPORAL SLICES
    ----------------------------------------------- */

    sliceElements.forEach((slice, i) => {
      const progress = i / (SLICE_COUNT - 1);

      /*
          Newer slices stay closer.
          Older slices travel farther.
        */

      const depth = progress * 260;

      const horizontal = nx * (40 + progress * 500) * (0.3 + intensity);

      const vertical = ny * (20 + progress * 280) * (0.3 + intensity);

      const rotation = nx * progress * 12;

      const scale = 1 + progress * 0.035 * intensity;

      const blur = progress * intensity * 2.5;

      const opacity = (1 - progress) * (0.28 + intensity * 0.35);

      slice.style.transform = `
          translate3d(
            calc(-50% + ${horizontal}px),
            calc(-50% + ${vertical}px),
            ${-depth}px
          )
          rotate(${rotation}deg)
          scale(${scale})
        `;

      slice.style.opacity = opacity;

      slice.style.filter = `blur(${blur}px)`;
    });

    /* -----------------------------------------------
       CURSOR
    ----------------------------------------------- */

    if (!mobile) {
      gsap.to(cursor, {
        x: mouse.targetX,
        y: mouse.targetY,

        duration: 0.3,

        ease: "power3.out",

        overwrite: true,
      });

      gsap.to(ring, {
        x: mouse.targetX,
        y: mouse.targetY,

        duration: 0.55,

        ease: "power3.out",

        overwrite: true,
      });
    }
  }

  animate();
  /* =====================================================
     FREEZE SEQUENCE
  ===================================================== */

  function freezeSequence() {
    status.textContent = "TIME FROZEN";

    /* ---------------------------------------------------
       PHASE 1 — HARD STOP
    --------------------------------------------------- */

    gsap.to(sliceElements, {
      x: 0,
      y: 0,
      z: 0,

      rotation: 0,

      scale: 1,

      opacity: 0.6,

      filter: "blur(0px)",

      duration: 0.65,

      stagger: {
        each: 0.025,

        from: "end",
      },

      ease: "expo.inOut",
    });

    gsap.to(word, {
      scale: 1.08,

      duration: 0.65,

      ease: "expo.inOut",
    });

    /* ---------------------------------------------------
       PHASE 2 — FREEZE FLASH
    --------------------------------------------------- */

    gsap.to(flash, {
      opacity: 0.12,

      duration: 0.08,

      delay: 0.72,

      yoyo: true,

      repeat: 1,
    });

    /* ---------------------------------------------------
       PHASE 3 — TEMPORAL EXPLOSION
    --------------------------------------------------- */

    gsap.delayedCall(0.82, () => {
      status.textContent = "TIME RELEASED";

      sliceElements.forEach((slice, i) => {
        const direction = i % 2 === 0 ? 1 : -1;

        gsap.to(slice, {
          x: direction * (250 + Math.random() * 600),

          y: (Math.random() - 0.5) * 400,

          z: -300 - Math.random() * 500,

          rotation: (Math.random() - 0.5) * 40,

          scale: 0.4 + Math.random() * 0.8,

          opacity: 0,

          filter: `blur(${5 + Math.random() * 8}px)`,

          duration: 1.1 + Math.random() * 0.5,

          delay: i * 0.025,

          ease: "expo.out",
        });
      });

      /* -------------------------------------------------
           MAIN WORD PULSE
        ------------------------------------------------- */

      gsap
        .timeline()

        .to(word, {
          scale: 1.18,

          duration: 0.12,

          ease: "power4.out",
        })

        .to(word, {
          scale: 0.95,

          duration: 0.15,

          ease: "power3.in",
        })

        .to(word, {
          scale: 1,

          duration: 0.8,

          ease: "expo.out",
        });
    });

    /* ---------------------------------------------------
       PHASE 4 — RESTORE
    --------------------------------------------------- */

    gsap.delayedCall(2.15, () => {
      sliceElements.forEach((slice, i) => {
        gsap.set(slice, {
          x: 0,
          y: 0,
          z: 0,

          rotation: 0,

          scale: 1,

          opacity: 0.28 * (1 - i / SLICE_COUNT),

          filter: "blur(0px)",
        });
      });

      status.textContent = "MOVE TO DISTORT";

      frozen = false;
    });
  }
})();
/* =========================================================
   SECTION 65 — TYPOGRAPHY VOID
========================================================= */

(() => {
  const stage = document.getElementById("void65Stage");

  const scene = document.getElementById("void65Scene");

  const word = document.getElementById("void65Word");

  const distortion = document.getElementById("void65Distortion");

  const orbits = document.getElementById("void65Orbits");

  const cursor = document.getElementById("void65Cursor");

  const cursorRing = document.getElementById("void65CursorRing");

  const status = document.getElementById("void65Status");

  const coordinates = document.getElementById("void65Coordinates");

  if (!stage || !word) return;

  /* -------------------------------------------------------
     CONFIG
  ------------------------------------------------------- */

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const ORBIT_COUNT = isMobile ? 5 : 8;

  /* -------------------------------------------------------
     CREATE ORBITS
  ------------------------------------------------------- */

  const orbitElements = [];

  for (let i = 0; i < ORBIT_COUNT; i++) {
    const orbit = document.createElement("div");

    orbit.className = "void65-orbit";

    const scale = 0.35 + (i / ORBIT_COUNT) * 0.9;

    orbit.style.transform = `scale(${scale})`;

    orbit.style.opacity = 0.12 - i * 0.008;

    orbits.appendChild(orbit);

    orbitElements.push(orbit);
  }

  /* -------------------------------------------------------
     FLASH
  ------------------------------------------------------- */

  const flash = document.createElement("div");

  flash.className = "void65-flash";

  stage.appendChild(flash);

  /* -------------------------------------------------------
     MOUSE
  ------------------------------------------------------- */

  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,

    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,

    velocity: 0,

    previousX: window.innerWidth / 2,
    previousY: window.innerHeight / 2,
  };

  let locked = false;

  /* -------------------------------------------------------
     INITIAL ENTRANCE
  ------------------------------------------------------- */

  gsap.to(word, {
    scale: 1,

    duration: 2,

    ease: "expo.out",

    delay: 0.15,
  });

  gsap.fromTo(
    distortion,

    {
      scale: 0.05,
      opacity: 0,
    },

    {
      scale: 1,
      opacity: 0.7,

      duration: 2.2,

      ease: "expo.out",

      delay: 0.2,
    },
  );

  gsap.fromTo(
    orbitElements,

    {
      scale: 0.2,
      opacity: 0,
    },

    {
      scale: (i) => 0.35 + (i / ORBIT_COUNT) * 0.9,

      opacity: (i) => 0.12 - i * 0.008,

      duration: 2,

      stagger: 0.05,

      ease: "expo.out",

      delay: 0.2,
    },
  );
  /* -------------------------------------------------------
     MOUSE MOVE
  ------------------------------------------------------- */

  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;

    status.textContent = "GRAVITY ACTIVE";
  });

  /* -------------------------------------------------------
     CLICK
  ------------------------------------------------------- */

  stage.addEventListener("click", () => {
    if (locked) return;

    locked = true;

    collapseVoid();
  });

  /* -------------------------------------------------------
     ANIMATION
  ------------------------------------------------------- */

  function animate() {
    requestAnimationFrame(animate);

    if (locked) return;

    mouse.x += (mouse.targetX - mouse.x) * 0.1;

    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    /* -----------------------------------------------
       VELOCITY
    ----------------------------------------------- */

    const dx = mouse.x - mouse.previousX;

    const dy = mouse.y - mouse.previousY;

    const velocity = Math.sqrt(dx * dx + dy * dy);

    mouse.velocity += (velocity - mouse.velocity) * 0.12;

    mouse.previousX = mouse.x;
    mouse.previousY = mouse.y;

    /* -----------------------------------------------
       NORMALIZED POSITION
    ----------------------------------------------- */

    const centerX = window.innerWidth / 2;

    const centerY = window.innerHeight / 2;

    const nx = (mouse.x - centerX) / (window.innerWidth / 2);

    const ny = (mouse.y - centerY) / (window.innerHeight / 2);

    const distance = Math.sqrt(nx * nx + ny * ny);

    const influence = Math.min(distance, 1.4);
    /* -----------------------------------------------
       GRAVITY PULL
    ----------------------------------------------- */

    const pull = 1 + influence * 0.25;

    const wordX = nx * 35;

    const wordY = ny * 25;

    const rotation = nx * 3;

    const scale =
      1 + influence * 0.025 + Math.min(mouse.velocity * 0.001, 0.025);

    word.style.transform = `
      translate(
        calc(-50% + ${wordX}px),
        calc(-50% + ${wordY}px)
      )
      rotate(${rotation}deg)
      scale(${scale})
    `;

    /* -----------------------------------------------
       WORD DISTORTION
    ----------------------------------------------- */

    const distortionX = nx * 80;

    const distortionY = ny * 50;

    const skew = nx * 10;

    const distortionScaleX = 1 + Math.abs(nx) * 0.18;

    const distortionScaleY = 1 - Math.abs(ny) * 0.08;

    distortion.style.transform = `
      translate(
        calc(-50% + ${distortionX}px),
        calc(-50% + ${distortionY}px)
      )
      skewX(${skew}deg)
      scale(
        ${distortionScaleX},
        ${distortionScaleY}
      )
    `;

    distortion.style.opacity = 0.18 + influence * 0.28;

    distortion.style.filter = `blur(${influence * 2}px)`;

    /* -----------------------------------------------
       ORBIT MOVEMENT
    ----------------------------------------------- */

    orbitElements.forEach((orbit, i) => {
      const depth = i / ORBIT_COUNT;

      const rotate = nx * (8 + i * 2);

      const rotateY = ny * (10 + i * 2);

      const z = -depth * 150;

      const baseScale = 0.35 + depth * 0.9;

      const dynamicScale = baseScale + influence * 0.035;

      orbit.style.transform = `
          scale(${dynamicScale})
          rotateZ(${rotate}deg)
          rotateY(${rotateY}deg)
          translateZ(${z}px)
        `;
    });

    /* -----------------------------------------------
       GRID GRAVITY
    ----------------------------------------------- */

    const grid = stage.querySelector(".void65-grid");

    if (grid) {
      grid.style.transform = `
        translate(
          ${nx * -30}px,
          ${ny * -30}px
        )
        scale(${1 + influence * 0.025})
      `;
    }

    /* -----------------------------------------------
       CURSOR
    ----------------------------------------------- */

    if (!isMobile) {
      gsap.to(cursor, {
        x: mouse.targetX,
        y: mouse.targetY,

        duration: 0.25,

        ease: "power3.out",

        overwrite: true,
      });

      gsap.to(cursorRing, {
        x: mouse.targetX,
        y: mouse.targetY,

        duration: 0.5,

        ease: "power3.out",

        overwrite: true,
      });
    }

    /* -----------------------------------------------
       COORDINATES
    ----------------------------------------------- */

    coordinates.textContent =
      `X ${String(Math.round(mouse.x)).padStart(3, "0")} / ` +
      `Y ${String(Math.round(mouse.y)).padStart(3, "0")}`;
  }

  animate();

  /* =====================================================
     VOID COLLAPSE
  ===================================================== */

  function collapseVoid() {
    status.textContent = "COLLAPSING";

    /* ---------------------------------------------------
       PHASE 1 — EVERYTHING PULLS IN
    --------------------------------------------------- */

    gsap.to(orbitElements, {
      scale: 0.02,

      rotation: 360,

      opacity: 0,

      duration: 1.1,

      stagger: 0.035,

      ease: "expo.in",
    });

    gsap.to(distortion, {
      scale: 0.02,

      x: 0,
      y: 0,

      rotation: 0,

      opacity: 0,

      filter: "blur(15px)",

      duration: 0.9,

      ease: "expo.in",
    });

    gsap.to(word, {
      scale: 0.02,

      rotation: 720,

      filter: "blur(8px)",

      duration: 1,

      ease: "expo.in",
    });

    /* ---------------------------------------------------
       PHASE 2 — SINGULARITY
    --------------------------------------------------- */

    gsap.delayedCall(1.02, () => {
      status.textContent = "SINGULARITY";

      gsap.to(flash, {
        opacity: 0.8,

        duration: 0.05,

        yoyo: true,

        repeat: 1,
      });

      /* Small central flash */

      const core = document.createElement("div");

      core.style.position = "absolute";

      core.style.left = "50%";
      core.style.top = "50%";

      core.style.width = "4px";
      core.style.height = "4px";

      core.style.borderRadius = "50%";

      core.style.background = "#fff";

      core.style.transform = "translate(-50%, -50%)";

      core.style.zIndex = "30";

      stage.appendChild(core);

      gsap.to(core, {
        scale: 100,

        opacity: 0,

        duration: 0.8,

        ease: "expo.out",

        onComplete: () => {
          core.remove();
        },
      });
    });
    /* ---------------------------------------------------
       PHASE 3 — REBIRTH
    --------------------------------------------------- */

    gsap.delayedCall(1.45, () => {
      status.textContent = "VOID RESTORED";

      gsap.fromTo(
        word,

        {
          scale: 0.01,
          rotation: -180,
          filter: "blur(12px)",
        },

        {
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",

          duration: 1.3,

          ease: "expo.out",
        },
      );

      gsap.fromTo(
        distortion,

        {
          scale: 0.01,
          opacity: 0,
        },

        {
          scale: 1,
          opacity: 0.25,

          duration: 1.4,

          ease: "expo.out",
        },
      );

      gsap.fromTo(
        orbitElements,

        {
          scale: 0.01,
          opacity: 0,
        },

        {
          scale: (i) => 0.35 + (i / ORBIT_COUNT) * 0.9,

          opacity: (i) => 0.12 - i * 0.008,

          duration: 1.5,

          stagger: 0.04,

          ease: "expo.out",
        },
      );
    });

    /* ---------------------------------------------------
       UNLOCK
    --------------------------------------------------- */

    gsap.delayedCall(3, () => {
      status.textContent = "ENTER THE VOID";

      locked = false;
    });
  }
})();

/* =========================================================
   SECTION 66 — TYPOGRAPHY RIPPLE
========================================================= */

(() => {
  const stage = document.getElementById("ripple66Stage");

  const scene = document.getElementById("ripple66Scene");

  const word = document.getElementById("ripple66Word");

  const rings = document.getElementById("ripple66Rings");

  const cursor = document.getElementById("ripple66Cursor");

  const status = document.getElementById("ripple66Status");

  const coordinates = document.getElementById("ripple66Coordinates");

  if (!stage || !word) return;

  /* -------------------------------------------------------
     CONFIG
  ------------------------------------------------------- */

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const letters = [...word.querySelectorAll("span")];

  /* -------------------------------------------------------
     MOUSE
  ------------------------------------------------------- */

  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,

    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,

    previousX: window.innerWidth / 2,
    previousY: window.innerHeight / 2,

    velocity: 0,
  };

  let locked = false;

  let lastWaveTime = 0;

  /* -------------------------------------------------------
     MOUSE MOVE
  ------------------------------------------------------- */

  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;

    status.textContent = "WAVE PROPAGATING";
  });

  /* -------------------------------------------------------
     CLICK
  ------------------------------------------------------- */

  stage.addEventListener("click", () => {
    if (locked) return;

    locked = true;

    massiveRipple();
  });

  /* -------------------------------------------------------
     CREATE RIPPLE
  ------------------------------------------------------- */

  function createRipple(x, y, strength = 1) {
    const ring = document.createElement("div");

    ring.className = "ripple66-ring";

    ring.style.left = `${x}px`;

    ring.style.top = `${y}px`;

    rings.appendChild(ring);

    const size = Math.min(window.innerWidth, window.innerHeight);

    gsap.to(ring, {
      scale: (2.5 + strength * 3) * (size / 500),

      opacity: 0.55,

      duration: 0.15,

      ease: "power2.out",
    });

    gsap.to(ring, {
      scale: (8 + strength * 8) * (size / 500),

      opacity: 0,

      duration: 1.4 + strength * 0.7,

      delay: 0.08,

      ease: "expo.out",

      onComplete: () => {
        ring.remove();
      },
    });
  }

  /* -------------------------------------------------------
     ANIMATION
  ------------------------------------------------------- */

  function animate(time) {
    requestAnimationFrame(animate);

    if (locked) return;

    /* -----------------------------------------------
       SMOOTH MOUSE
    ----------------------------------------------- */

    mouse.x += (mouse.targetX - mouse.x) * 0.1;

    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    /* -----------------------------------------------
       VELOCITY
    ----------------------------------------------- */

    const dx = mouse.x - mouse.previousX;

    const dy = mouse.y - mouse.previousY;

    const velocity = Math.sqrt(dx * dx + dy * dy);

    mouse.velocity += (velocity - mouse.velocity) * 0.12;

    mouse.previousX = mouse.x;
    mouse.previousY = mouse.y;

    /* -----------------------------------------------
       NORMALIZED POSITION
    ----------------------------------------------- */

    const centerX = window.innerWidth / 2;

    const centerY = window.innerHeight / 2;

    const nx = (mouse.x - centerX) / (window.innerWidth / 2);

    const ny = (mouse.y - centerY) / (window.innerHeight / 2);

    const distance = Math.sqrt(nx * nx + ny * ny);

    const influence = Math.min(distance, 1.4);

    /* -----------------------------------------------
       AUTO RIPPLE
    ----------------------------------------------- */

    if (mouse.velocity > 3 && time - lastWaveTime > 180) {
      createRipple(mouse.x, mouse.y, Math.min(mouse.velocity * 0.08, 1.5));

      lastWaveTime = time;
    }

    /* -----------------------------------------------
       LETTER DISTORTION
    ----------------------------------------------- */

    letters.forEach((letter, i) => {
      /*
          Position of each letter
          relative to the word center.
        */

      const normalizedIndex =
        letters.length === 1 ? 0 : i / (letters.length - 1);

      const letterX = (normalizedIndex - 0.5) * 2;

      /*
          Distance from cursor influence.
        */

      const cursorInfluence = Math.sin(letterX * Math.PI * 1.8 - nx * 3);

      const wave = Math.sin(letterX * 5 - nx * 4 + ny * 2);

      const movement =
        wave * (8 + influence * 35) * (0.5 + mouse.velocity * 0.01);

      const y = movement;

      const x = cursorInfluence * influence * 12;

      const rotation = wave * influence * 5;

      const scaleX = 1 + wave * influence * 0.12;

      const scaleY = 1 - Math.abs(wave) * influence * 0.045;

      const blur = Math.abs(wave) * influence * 1.5;

      letter.style.transform = `
          translate3d(
            ${x}px,
            ${y}px,
            0
          )
          rotate(${rotation}deg)
          scale(
            ${scaleX},
            ${scaleY}
          )
        `;

      letter.style.filter = `blur(${blur}px)`;
    });

    /* -----------------------------------------------
       WHOLE WORD
    ----------------------------------------------- */

    word.style.transform = `
      translate(
        calc(-50% + ${nx * 18}px),
        calc(-50% + ${ny * 12}px)
      )
    `;

    /* -----------------------------------------------
       GRID
    ----------------------------------------------- */

    const grid = stage.querySelector(".ripple66-grid");

    if (grid) {
      grid.style.transform = `
        translate(
          ${nx * -25}px,
          ${ny * -25}px
        )
      `;
    }

    /* -----------------------------------------------
       CURSOR
    ----------------------------------------------- */

    if (!isMobile) {
      gsap.to(cursor, {
        x: mouse.targetX,
        y: mouse.targetY,

        duration: 0.22,

        ease: "power3.out",

        overwrite: true,
      });
    }

    /* -----------------------------------------------
       COORDINATES
    ----------------------------------------------- */

    coordinates.textContent =
      `${String(Math.round(mouse.x)).padStart(3, "0")} / ` +
      `${String(Math.round(mouse.y)).padStart(3, "0")}`;
  }

  requestAnimationFrame(animate);
  /* =====================================================
     MASSIVE RIPPLE
  ===================================================== */

  function massiveRipple() {
    status.textContent = "RIPPLE IMPACT";

    const centerX = window.innerWidth / 2;

    const centerY = window.innerHeight / 2;

    /* ---------------------------------------------------
       MULTIPLE CENTRAL WAVES
    --------------------------------------------------- */

    for (let i = 0; i < 5; i++) {
      gsap.delayedCall(i * 0.12, () => {
        createRipple(centerX, centerY, 2 + i * 0.5);
      });
    }

    /* ---------------------------------------------------
       LETTERS — COMPRESS
    --------------------------------------------------- */

    gsap.to(letters, {
      x: 0,
      y: 0,

      scaleX: 0.7,
      scaleY: 1.15,

      rotation: 0,

      filter: "blur(0px)",

      duration: 0.55,

      stagger: {
        each: 0.035,

        from: "center",
      },

      ease: "expo.inOut",
    });

    /* ---------------------------------------------------
       IMPACT
    --------------------------------------------------- */

    gsap.delayedCall(0.6, () => {
      letters.forEach((letter, i) => {
        const direction = i - (letters.length - 1) / 2;

        gsap.to(letter, {
          x: direction * (60 + Math.random() * 80),

          y: Math.sin(i) * (80 + Math.random() * 120),

          scaleX: 1.15 + Math.random() * 0.25,

          scaleY: 0.75 + Math.random() * 0.3,

          rotation: direction * 4,

          duration: 0.75 + Math.random() * 0.25,

          ease: "expo.out",
        });
      });
    });
    /* ---------------------------------------------------
       RETURN TO PERFECT FORM
    --------------------------------------------------- */

    gsap.delayedCall(1.35, () => {
      status.textContent = "SURFACE RESTORED";

      gsap.to(letters, {
        x: 0,
        y: 0,

        scaleX: 1,
        scaleY: 1,

        rotation: 0,

        filter: "blur(0px)",

        duration: 1.1,

        stagger: {
          each: 0.04,

          from: "center",
        },

        ease: "elastic.out(1, .55)",
      });
    });
    /* ---------------------------------------------------
       UNLOCK
    --------------------------------------------------- */

    gsap.delayedCall(2.6, () => {
      status.textContent = "MOVE TO CREATE WAVES";

      locked = false;
    });
  }
})();
    /* =========================================================
   SECTION 67 — TYPOGRAPHY AFTERIMAGE
========================================================= */

(() => {

  const stage =
    document.getElementById("after67Stage");

  const trail =
    document.getElementById("after67Trail");

  const word =
    document.getElementById("after67Word");

  const flash =
    document.getElementById("after67Flash");

  const cursor =
    document.getElementById("after67Cursor");

  const ring =
    document.getElementById("after67Ring");

  const status =
    document.getElementById("after67Status");

  const counter =
    document.getElementById("after67Counter");

  if (!stage || !word) return;

  /* -------------------------------------------------------
     CONFIG
  ------------------------------------------------------- */

  const isMobile =
    window.matchMedia("(max-width: 768px)").matches;

  const MAX_EXPOSURES =
    isMobile ? 14 : 24;

  const EXPOSURE_DISTANCE =
    isMobile ? 30 : 22;

  /* -------------------------------------------------------
     STATE
  ------------------------------------------------------- */

  const mouse = {

    x: window.innerWidth / 2,
    y: window.innerHeight / 2,

    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,

    previousX: window.innerWidth / 2,
    previousY: window.innerHeight / 2,

    velocity: 0

  };

  const exposures = [];

  let locked = false;
  let lastExposureX = mouse.x;
  let lastExposureY = mouse.y;

  /* -------------------------------------------------------
     MOUSE MOVE
  ------------------------------------------------------- */

  window.addEventListener(
    "mousemove",
    (e) => {

      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      status.textContent =
        "EXPOSURE ACTIVE";

    }
  );

  /* -------------------------------------------------------
     CLICK
  ------------------------------------------------------- */

  stage.addEventListener(
    "click",
    () => {

      if (locked) return;

      locked = true;

      cameraFlash();

    }
  );
  /* -------------------------------------------------------
     CREATE AFTERIMAGE
  ------------------------------------------------------- */

  function createExposure() {

    if (exposures.length >= MAX_EXPOSURES) {

      const oldest =
        exposures.shift();

      gsap.killTweensOf(
        oldest.element
      );

      oldest.element.remove();

    }

    const element =
      document.createElement("div");

    element.className =
      "after67-copy";

    element.textContent =
      "AFTERIMAGE";

    trail.appendChild(element);

    const centerX =
      window.innerWidth / 2;

    const centerY =
      window.innerHeight / 2;

    const offsetX =
      mouse.x - centerX;

    const offsetY =
      mouse.y - centerY;

    const speed =
      Math.min(
        mouse.velocity,
        40
      );

    const age =
      exposures.length;

    const direction =
      Math.atan2(
        offsetY,
        offsetX
      );

    const distance =
      10 +
      age * 7 +
      speed * 1.5;

    const x =
      offsetX * .16 +
      Math.cos(direction) *
      distance;

    const y =
      offsetY * .16 +
      Math.sin(direction) *
      distance;

    const rotation =
      (offsetX / window.innerWidth) *
      8 +
      (Math.random() - .5) *
      2;

    const scale =
      .98 +
      Math.random() *
      .08;

    const opacity =
      Math.max(
        .05,
        .32 -
        age * .012
      );

    element.style.opacity =
      opacity;

    element.style.transform = `
      translate3d(
        calc(-50% + ${x}px),
        calc(-50% + ${y}px),
        ${-age * 15}px
      )
      rotate(${rotation}deg)
      scale(${scale})
    `;

    exposures.push({
      element,
      x,
      y,
      rotation,
      scale,
      age
    });

    counter.textContent =
      `${String(exposures.length)
        .padStart(3, "0")} EXPOSURES`;

 /* -----------------------------------------------------
       NATURAL DECAY
    ----------------------------------------------------- */

    gsap.to(
      element,
      {

        opacity: 0,

        filter:
          "blur(5px)",

        duration:
          1.8 +
          Math.random() * 1.5,

        ease:
          "power2.out",

        onComplete: () => {

          const index =
            exposures.findIndex(
              item =>
                item.element === element
            );

          if (index !== -1) {
            exposures.splice(
              index,
              1
            );
          }

          element.remove();

          counter.textContent =
            `${String(exposures.length)
              .padStart(3, "0")} EXPOSURES`;

        }

      }
    );

  }

  /* -------------------------------------------------------
     MAIN LOOP
  ------------------------------------------------------- */

  function animate() {

    requestAnimationFrame(
      animate
    );

    if (locked) return;

    /* -----------------------------------------------
       SMOOTH MOUSE
    ----------------------------------------------- */

    mouse.x +=
      (mouse.targetX - mouse.x) *
      .1;

    mouse.y +=
      (mouse.targetY - mouse.y) *
      .1;

 /* -----------------------------------------------
       VELOCITY
    ----------------------------------------------- */

    const dx =
      mouse.x -
      mouse.previousX;

    const dy =
      mouse.y -
      mouse.previousY;

    const velocity =
      Math.sqrt(
        dx * dx +
        dy * dy
      );

    mouse.velocity +=
      (velocity -
       mouse.velocity) *
      .12;

    mouse.previousX =
      mouse.x;

    mouse.previousY =
      mouse.y;

    /* -----------------------------------------------
       CREATE EXPOSURES
    ----------------------------------------------- */

    const distance =
      Math.sqrt(
        Math.pow(
          mouse.x -
          lastExposureX,
          2
        ) +
        Math.pow(
          mouse.y -
          lastExposureY,
          2
        )
      );

    if (
      distance >
      EXPOSURE_DISTANCE &&
      mouse.velocity > .7
    ) {

      createExposure();

      lastExposureX =
        mouse.x;

      lastExposureY =
        mouse.y;

    }

    /* -----------------------------------------------
       MAIN WORD
    ----------------------------------------------- */

    const centerX =
      window.innerWidth / 2;

    const centerY =
      window.innerHeight / 2;

    const nx =
      (mouse.x - centerX) /
      (window.innerWidth / 2);

    const ny =
      (mouse.y - centerY) /
      (window.innerHeight / 2);

    const intensity =
      Math.min(
        mouse.velocity * .012,
        .18
      );

    word.style.transform = `
      translate(
        calc(-50% + ${nx * 12}px),
        calc(-50% + ${ny * 8}px)
      )
      scale(
        ${1 + intensity}
      )
      rotate(
        ${nx * 1.5}deg
      )
    `;

    /* -----------------------------------------------
       GRID PARALLAX
    ----------------------------------------------- */

    const grid =
      stage.querySelector(
        ".after67-grid"
      );

    if (grid) {

      grid.style.transform = `
        translate(
          ${nx * -22}px,
          ${ny * -22}px
        )
      `;

    }
/* -----------------------------------------------
       CURSOR
    ----------------------------------------------- */

    if (!isMobile) {

      gsap.to(
        cursor,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .2,

          ease: "power3.out",

          overwrite: true

        }
      );

      gsap.to(
        ring,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .5,

          ease: "power3.out",

          overwrite: true

        }
      );

    }

  }

  animate();

  /* =====================================================
     CAMERA FLASH
  ===================================================== */

  function cameraFlash() {

    status.textContent =
      "EXPOSURE LOCKED";

    /* ---------------------------------------------------
       FLASH
    --------------------------------------------------- */

    gsap.timeline()

      .to(
        flash,
        {

          opacity: .9,

          duration: .08,

          ease: "power4.out"

        }
      )

      .to(
        flash,
        {

          opacity: 0,

          duration: .35,

          ease: "power2.out"

        }
      );

    /* ---------------------------------------------------
       FREEZE CURRENT EXPOSURES
    --------------------------------------------------- */

    exposures.forEach(
      (item, i) => {

        gsap.killTweensOf(
          item.element
        );

        gsap.to(
          item.element,
          {

            opacity:
              .55 -
              i * .012,

            filter:
              "blur(0px)",

            duration: .25,

            ease: "power2.out"

          }
        );

      }
    );

/* ---------------------------------------------------
       MAIN WORD CAMERA SHAKE
    --------------------------------------------------- */

    gsap.timeline()

      .to(
        word,
        {

          scale: 1.06,

          x: 5,

          duration: .06

        }
      )

      .to(
        word,
        {

          x: -5,

          duration: .06

        }
      )

      .to(
        word,
        {

          x: 0,

          scale: 1,

          duration: .5,

          ease: "power3.out"

        }
      );

    /* ---------------------------------------------------
       AFTERIMAGE EXPLOSION
    --------------------------------------------------- */

    gsap.delayedCall(
      .4,
      () => {

        status.textContent =
          "AFTERIMAGE DECAY";

        exposures.forEach(
          (item, i) => {

            const angle =
              (Math.PI * 2 /
               exposures.length) *
              i;

            const distance =
              100 +
              Math.random() *
              500;

            gsap.to(
              item.element,
              {

                x:
                  Math.cos(angle) *
                  distance,

                y:
                  Math.sin(angle) *
                  distance,

                rotation:
                  item.rotation +
                  (Math.random() - .5) *
                  40,

                scale:
                  item.scale +
                  Math.random() *
                  .4,

                opacity: 0,

                filter:
                  "blur(8px)",

                duration:
                  1.1 +
                  Math.random() *
                  .7,

                delay:
                  i * .015,

                ease:
                  "expo.out",

                onComplete: () => {

                  item.element.remove();

                }

              }
            );

          }
        );

        exposures.length = 0;

        counter.textContent =
          "000 EXPOSURES";

      }
    );

    /* ---------------------------------------------------
       RESET
    --------------------------------------------------- */

    gsap.delayedCall(
      2.2,
      () => {

        status.textContent =
          "MOVE TO EXPOSE";

        lastExposureX =
          mouse.x;

        lastExposureY =
          mouse.y;

        locked = false;

      }
    );

  }

})();

/* =========================================================
   SECTION 68 — TYPOGRAPHY PRISM
========================================================= */

(() => {

  const stage =
    document.getElementById("prism68Stage");

  const red =
    document.getElementById("prism68Red");

  const green =
    document.getElementById("prism68Green");

  const blue =
    document.getElementById("prism68Blue");

  const main =
    document.getElementById("prism68Main");

  const prisms =
    document.getElementById("prism68Prisms");

  const flare =
    document.getElementById("prism68Flare");

  const cursor =
    document.getElementById("prism68Cursor");

  const ring =
    document.getElementById("prism68Ring");

  const status =
    document.getElementById("prism68Status");

  const coordinates =
    document.getElementById("prism68Coordinates");

  if (!stage || !main) return;

/* -------------------------------------------------------
     CONFIG
  ------------------------------------------------------- */

  const isMobile =
    window.matchMedia("(max-width: 768px)").matches;

  const PRISM_COUNT =
    isMobile ? 5 : 9;

  /* -------------------------------------------------------
     CREATE PRISM SHAPES
  ------------------------------------------------------- */

  const prismElements = [];

  for (let i = 0; i < PRISM_COUNT; i++) {

    const prism =
      document.createElement("div");

    prism.className =
      "prism68-prism";

    const scale =
      .4 + i * .2;

    prism.style.width =
      `${100 + i * 55}px`;

    prism.style.height =
      `${100 + i * 55}px`;

    prism.style.transform = `
      translate(-50%, -50%)
      rotate(${45 + i * 12}deg)
      scale(${scale})
    `;

    prisms.appendChild(prism);

    prismElements.push(prism);

  }

  /* -------------------------------------------------------
     MOUSE
  ------------------------------------------------------- */

  const mouse = {

    x: window.innerWidth / 2,
    y: window.innerHeight / 2,

    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,

    previousX: window.innerWidth / 2,
    previousY: window.innerHeight / 2,

    velocity: 0

  };
 let locked = false;

  /* -------------------------------------------------------
     MOUSE MOVE
  ------------------------------------------------------- */

  window.addEventListener(
    "mousemove",
    (e) => {

      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      status.textContent =
        "REFRACTION ACTIVE";

    }
  );

  /* -------------------------------------------------------
     CLICK
  ------------------------------------------------------- */

  stage.addEventListener(
    "click",
    () => {

      if (locked) return;

      locked = true;

      spectrumBurst();

    }
  );

  /* -------------------------------------------------------
     ANIMATION
  ------------------------------------------------------- */

  function animate() {

    requestAnimationFrame(
      animate
    );

    if (locked) return;

    /* -----------------------------------------------
       SMOOTH MOUSE
    ----------------------------------------------- */

    mouse.x +=
      (mouse.targetX - mouse.x) *
      .1;

    mouse.y +=
      (mouse.targetY - mouse.y) *
      .1;

    /* -----------------------------------------------
       VELOCITY
    ----------------------------------------------- */

    const dx =
      mouse.x -
      mouse.previousX;

    const dy =
      mouse.y -
      mouse.previousY;

    const velocity =
      Math.sqrt(
        dx * dx +
        dy * dy
      );

    mouse.velocity +=
      (velocity -
       mouse.velocity) *
      .12;

    mouse.previousX =
      mouse.x;

    mouse.previousY =
      mouse.y;
 /* -----------------------------------------------
       NORMALIZED POSITION
    ----------------------------------------------- */

    const centerX =
      window.innerWidth / 2;

    const centerY =
      window.innerHeight / 2;

    const nx =
      (mouse.x - centerX) /
      (window.innerWidth / 2);

    const ny =
      (mouse.y - centerY) /
      (window.innerHeight / 2);

    const speed =
      Math.min(
        mouse.velocity,
        45
      );

    const intensity =
      Math.min(
        speed * .025,
        1.2
      );

    /* -----------------------------------------------
       SPECTRAL SEPARATION
    ----------------------------------------------- */

    const separation =
      (18 + intensity * 70);

    const verticalShift =
      ny * 18;

    const horizontalShift =
      nx * 12;

    /* RED
       Moves opposite the blue channel.
    */

    red.style.transform = `
      translate(
        calc(-50% + ${horizontalShift - separation}px),
        calc(-50% + ${verticalShift}px)
      )
      rotate(${nx * -3}deg)
      scale(
        ${1 + intensity * .025}
      )
    `;

    /* GREEN */

    green.style.transform = `
      translate(
        calc(-50% + ${horizontalShift}px),
        calc(-50% + ${verticalShift + ny * 7}px)
      )
      rotate(${nx * 1.5}deg)
      scale(
        ${1 + intensity * .018}
      )
    `;

    /* BLUE */

    blue.style.transform = `
      translate(
        calc(-50% + ${horizontalShift + separation}px),
        calc(-50% + ${verticalShift * -0.7}px)
      )
      rotate(${nx * 3}deg)
      scale(
        ${1 + intensity * .035}
      )
    `;

    /* -----------------------------------------------
       MAIN WORD
    ----------------------------------------------- */

    const mainX =
      nx * 10;

    const mainY =
      ny * 7;

    main.style.transform = `
      translate(
        calc(-50% + ${mainX}px),
        calc(-50% + ${mainY}px)
      )
      scale(
        ${1 + intensity * .015}
      )
    `;
 /* -----------------------------------------------
       SPECTRAL OPACITY
    ----------------------------------------------- */

    const spectralOpacity =
      Math.min(
        .2 + intensity * .65,
        .9
      );

    red.style.opacity =
      spectralOpacity;

    green.style.opacity =
      spectralOpacity * .85;

    blue.style.opacity =
      spectralOpacity;

    /* -----------------------------------------------
       PRISM RINGS
    ----------------------------------------------- */

    prismElements.forEach(
      (prism, i) => {

        const progress =
          i / PRISM_COUNT;

        const rotation =
          45 +
          i * 12 +
          nx * (15 + i * 3) +
          ny * 8;

        const dynamicScale =
          .4 +
          i * .2 +
          intensity *
          (0.08 + i * .015);

        prism.style.transform = `
          translate(-50%, -50%)
          rotate(${rotation}deg)
          scale(${dynamicScale})
        `;

        prism.style.opacity =
          Math.min(
            .05 +
            intensity *
            (.12 - progress * .06),
            .18
          );
 /* Shift the border toward
           the active spectral direction. */

        if (nx > .15) {

          prism.style.borderColor =
            "rgba(80,150,255,.16)";

        } else if (nx < -.15) {

          prism.style.borderColor =
            "rgba(255,70,90,.16)";

        } else {

          prism.style.borderColor =
            "rgba(255,255,255,.1)";

        }

      }
    );

    /* -----------------------------------------------
       GRID PARALLAX
    ----------------------------------------------- */

    const grid =
      stage.querySelector(
        ".prism68-grid"
      );

    if (grid) {

      grid.style.transform = `
        translate(
          ${nx * -25}px,
          ${ny * -25}px
        )
        scale(
          ${1 + intensity * .015}
        )
      `;

    }

    /* -----------------------------------------------
       CURSOR
    ----------------------------------------------- */

    if (!isMobile) {

      gsap.to(
        cursor,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .22,

          ease: "power3.out",

          overwrite: true

        }
      );

      gsap.to(
        ring,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .5,

          ease: "power3.out",

          overwrite: true

        }
      );

    }

 /* -----------------------------------------------
       COORDINATES
    ----------------------------------------------- */

    const r =
      Math.round(
        Math.abs(
          separation
        )
      );

    const g =
      Math.round(
        Math.abs(
          ny * 30
        )
      );

    const b =
      Math.round(
        Math.abs(
          separation
        )
      );

    coordinates.textContent =
      `R ${String(r).padStart(3, "0")} / ` +
      `G ${String(g).padStart(3, "0")} / ` +
      `B ${String(b).padStart(3, "0")}`;

  }

  animate();

  /* =====================================================
     SPECTRUM BURST
  ===================================================== */

  function spectrumBurst() {

    status.textContent =
      "SPECTRUM RELEASED";

    /* ---------------------------------------------------
       CENTER FLARE
    --------------------------------------------------- */

    gsap.timeline()

      .to(
        flare,
        {

          scale: 8,

          opacity: 1,

          duration: .12,

          ease: "power4.out"

        }
      )

      .to(
        flare,
        {

          scale: 1,

          opacity: 0,

          duration: .7,

          ease: "expo.out"

        }
      );

/* ---------------------------------------------------
       FLASH
    --------------------------------------------------- */

    const flash =
      document.createElement("div");

    flash.className =
      "prism68-flash";

    stage.appendChild(flash);

    gsap.timeline({

      onComplete: () => {
        flash.remove();
      }

    })

      .to(
        flash,
        {

          opacity: .45,

          duration: .05

        }
      )

      .to(
        flash,
        {

          opacity: 0,

          duration: .35,

          ease: "power2.out"

        }
      );

    /* ---------------------------------------------------
       MASSIVE SPECTRAL SEPARATION
    --------------------------------------------------- */

    gsap.to(
      red,
      {

        x: -180,

        y: -20,

        rotation: -8,

        scale: 1.08,

        opacity: .85,

        duration: .65,

        ease: "expo.out"

      }
    );

    gsap.to(
      green,
      {

        x: 0,

        y: 80,

        rotation: 0,

        scale: 1.05,

        opacity: .7,

        duration: .65,

        ease: "expo.out"

      }
    );

    gsap.to(
      blue,
      {

        x: 180,

        y: 20,

        rotation: 8,

        scale: 1.08,

        opacity: .85,

        duration: .65,

        ease: "expo.out"

      }
    );

    /* ---------------------------------------------------
       PRISM RING EXPANSION
    --------------------------------------------------- */

    prismElements.forEach(
      (prism, i) => {

        gsap.to(
          prism,
          {

            scale:
              1 +
              i * .3,

            rotation:
              180 +
              i * 30,

            opacity: .22,

            duration:
              1 +
              i * .04,

            ease: "expo.out"

          }
        );

      }
    );
 /* ---------------------------------------------------
       RECOMBINE
    --------------------------------------------------- */

    gsap.delayedCall(
      .8,
      () => {

        status.textContent =
          "SPECTRUM COLLAPSING";

        gsap.to(
          [red, green, blue],
          {

            x: 0,
            y: 0,

            rotation: 0,

            scale: 1,

            opacity: 0,

            duration: .9,

            stagger: .04,

            ease: "expo.inOut"

          }
        );

        gsap.to(
          main,
          {

            scale: 1.05,

            duration: .2,

            yoyo: true,

            repeat: 1,

            ease: "power3.out"

          }
        );

        gsap.to(
          prismElements,
          {

            scale: (i) =>
              .4 +
              i * .2,

            rotation: (i) =>
              45 +
              i * 12,

            opacity: (i) =>
              .05,

            duration: 1.1,

            stagger: .035,

            ease: "expo.out"

          }
        );

      }
    );

    /* ---------------------------------------------------
       RESTORE
    --------------------------------------------------- */

    gsap.delayedCall(
      2,
      () => {

        status.textContent =
          "MOVE TO REFRACT";

        locked = false;

      }
    );

  }

})();

/* =========================================================
   SECTION 69 — TYPOGRAPHY FRACTURE
========================================================= */

(() => {

  const stage =
    document.getElementById("fracture69Stage");

  const scene =
    document.getElementById("fracture69Scene");

  const word =
    document.getElementById("fracture69Word");

  const shards =
    document.getElementById("fracture69Shards");

  const cursor =
    document.getElementById("fracture69Cursor");

  const ring =
    document.getElementById("fracture69Ring");

  const status =
    document.getElementById("fracture69Status");

  const counter =
    document.getElementById("fracture69Counter");

  if (!stage || !word) return;

  /* -------------------------------------------------------
     CONFIG
  ------------------------------------------------------- */

  const isMobile =
    window.matchMedia("(max-width: 768px)").matches;

  const SHARD_COUNT =
    isMobile ? 12 : 22;

  const CRACK_COUNT =
    isMobile ? 5 : 9;

  /* -------------------------------------------------------
     STATE
  ------------------------------------------------------- */

  const mouse = {

    x: window.innerWidth / 2,
    y: window.innerHeight / 2,

    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,

    previousX: window.innerWidth / 2,
    previousY: window.innerHeight / 2,

    velocity: 0

  };

  const shardData = [];

  let locked = false;
 /* -------------------------------------------------------
     CRACK CONTAINER
  ------------------------------------------------------- */

  const crackContainer =
    document.createElement("div");

  crackContainer.className =
    "fracture69-cracks";

  stage.appendChild(crackContainer);

  /* -------------------------------------------------------
     CREATE CRACKS
  ------------------------------------------------------- */

  for (let i = 0; i < CRACK_COUNT; i++) {

    const crack =
      document.createElement("div");

    crack.className =
      "fracture69-crack";

    const angle =
      Math.random() * 360;

    const length =
      40 + Math.random() * 180;

    crack.style.width =
      `${length}px`;

    crack.style.left =
      `${50 + (Math.random() - .5) * 12}%`;

    crack.style.top =
      `${50 + (Math.random() - .5) * 18}%`;

    crack.style.transform =
      `rotate(${angle}deg)`;

    crackContainer.appendChild(crack);

  }

  /* -------------------------------------------------------
     CREATE SHARDS
  ------------------------------------------------------- */

  for (let i = 0; i < SHARD_COUNT; i++) {

    const shard =
      document.createElement("div");

    shard.className =
      "fracture69-shard";

    shard.textContent =
      "FRACTURE";

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      20 + Math.random() * 80;

    const baseX =
      Math.cos(angle) *
      distance;

    const baseY =
      Math.sin(angle) *
      distance;

    const rotation =
      (Math.random() - .5) * 8;

    const clipX =
      Math.random() * 85;

    const clipY =
      Math.random() * 80;

    const clipW =
      15 + Math.random() * 35;

    const clipH =
      12 + Math.random() * 35;

    shard.style.clipPath = `
      polygon(
        ${clipX}% ${clipY}%,
        ${Math.min(
          clipX + clipW,
          100
        )}% ${clipY + Math.random() * 8}%,
        ${Math.min(
          clipX + clipW + 5,
          100
        )}% ${Math.min(
          clipY + clipH,
          100
        )}%,
        ${Math.max(
          clipX - Math.random() * 8,
          0
        )}% ${Math.min(
          clipY + clipH,
          100
        )}%
      )
    `;

    shard.style.opacity = 0;

    shards.appendChild(shard);

    shardData.push({
      element: shard,
      baseX,
      baseY,
      rotation,
      angle
    });

  }
   /* -------------------------------------------------------
     MOUSE
  ------------------------------------------------------- */

  window.addEventListener(
    "mousemove",
    (e) => {

      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      status.textContent =
        "STRUCTURE DESTABILIZING";

    }
  );

  /* -------------------------------------------------------
     CLICK
  ------------------------------------------------------- */

  stage.addEventListener(
    "click",
    () => {

      if (locked) return;

      locked = true;

      fracture();

    }
  );

  /* -------------------------------------------------------
     ANIMATION
  ------------------------------------------------------- */

  function animate() {

    requestAnimationFrame(
      animate
    );

    if (locked) return;

    /* -----------------------------------------------
       SMOOTH MOUSE
    ----------------------------------------------- */

    mouse.x +=
      (mouse.targetX - mouse.x) *
      .1;

    mouse.y +=
      (mouse.targetY - mouse.y) *
      .1;
 /* -----------------------------------------------
       VELOCITY
    ----------------------------------------------- */

    const dx =
      mouse.x -
      mouse.previousX;

    const dy =
      mouse.y -
      mouse.previousY;

    const velocity =
      Math.sqrt(
        dx * dx +
        dy * dy
      );

    mouse.velocity +=
      (velocity -
       mouse.velocity) *
      .12;

    mouse.previousX =
      mouse.x;

    mouse.previousY =
      mouse.y;

    /* -----------------------------------------------
       NORMALIZED MOUSE
    ----------------------------------------------- */

    const centerX =
      window.innerWidth / 2;

    const centerY =
      window.innerHeight / 2;

    const nx =
      (mouse.x - centerX) /
      (window.innerWidth / 2);

    const ny =
      (mouse.y - centerY) /
      (window.innerHeight / 2);

    const distance =
      Math.sqrt(
        nx * nx +
        ny * ny
      );

    const influence =
      Math.min(
        distance,
        1.25
      );

    const velocityForce =
      Math.min(
        mouse.velocity * .02,
        1
      );

    /* -----------------------------------------------
       MAIN WORD
    ----------------------------------------------- */

    word.style.transform = `
      translate(
        calc(-50% + ${nx * 12}px),
        calc(-50% + ${ny * 8}px)
      )
      rotate(${nx * 1.5}deg)
      scale(
        ${1 + velocityForce * .018}
      )
    `;

    /* -----------------------------------------------
       SHARD PREVIEW
    ----------------------------------------------- */

    shardData.forEach(
      (data, i) => {

        const element =
          data.element;

        const wave =
          Math.sin(
            i * 1.7 +
            nx * 3 +
            ny * 2
          );

        const pull =
          influence *
          (8 + i * .8) +
          velocityForce *
          15;

        const x =
          data.baseX *
          (0.25 + influence * .7) +
          nx *
          pull;

        const y =
          data.baseY *
          (0.25 + influence * .7) +
          ny *
          pull;

        const rotation =
          data.rotation +
          wave *
          velocityForce *
          5;

        const opacity =
          .03 +
          influence *
          .08 +
          velocityForce *
          .14;

        element.style.transform = `
          translate3d(
            calc(-50% + ${x}px),
            calc(-50% + ${y}px),
            ${-i * 3}px
          )
          rotate(${rotation}deg)
          scale(
            ${1 + velocityForce * .015}
          )
        `;

        element.style.opacity =
          opacity;

      }
    );
 /* -----------------------------------------------
       CRACKS
    ----------------------------------------------- */

    const crackIntensity =
      influence * .45 +
      velocityForce * .55;

    [...crackContainer.children]
      .forEach(
        (crack, i) => {

          crack.style.opacity =
            crackIntensity *
            (.15 +
             Math.sin(i * 2.1) *
             .08 +
             .12);

        }
      );

    /* -----------------------------------------------
       GRID
    ----------------------------------------------- */

    const grid =
      stage.querySelector(
        ".fracture69-grid"
      );

    if (grid) {

      grid.style.transform = `
        translate(
          ${nx * -24}px,
          ${ny * -24}px
        )
      `;

    }

    /* -----------------------------------------------
       CURSOR
    ----------------------------------------------- */

    if (!isMobile) {

      gsap.to(
        cursor,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .22,

          ease: "power3.out",

          overwrite: true

        }
      );

      gsap.to(
        ring,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .5,

          ease: "power3.out",

          overwrite: true

        }
      );

    }

    /* -----------------------------------------------
       COUNTER
    ----------------------------------------------- */

    const fractureValue =
      Math.round(
        (influence +
         velocityForce) *
        50
      );

    counter.textContent =
      `${String(
        Math.min(
          fractureValue,
          99
        )
      ).padStart(3, "0")} / 100`;

  }

  animate();

   /* =====================================================
     FRACTURE SEQUENCE
  ===================================================== */

  function fracture() {

    status.textContent =
      "FRACTURE";

    /* ---------------------------------------------------
       CRACKS EXPLODE
    --------------------------------------------------- */

    [...crackContainer.children]
      .forEach(
        (crack, i) => {

          gsap.fromTo(
            crack,

            {
              opacity: 0,
              scaleX: .2
            },

            {
              opacity: .8,
              scaleX: 1,

              duration: .35,

              delay:
                i * .035,

              ease: "power3.out"

            }
          );

        }
      );

    /* ---------------------------------------------------
       MAIN WORD COLLAPSE
    --------------------------------------------------- */

    gsap.to(
      word,
      {

        scale: .98,

        filter:
          "blur(3px)",

        duration: .25,

        ease: "power3.in"

      }
    );

    /* ---------------------------------------------------
       SHARD EXPLOSION
    --------------------------------------------------- */

    shardData.forEach(
      (data, i) => {

        const angle =
          data.angle +
          (Math.random() - .5) *
          .8;

        const distance =
          180 +
          Math.random() *
          650;

        const x =
          Math.cos(angle) *
          distance;

        const y =
          Math.sin(angle) *
          distance;

        const z =
          -200 +
          Math.random() *
          700;

        gsap.to(
          data.element,
          {

            x,
            y,
            z,

            rotation:
              data.rotation +
              (Math.random() - .5) *
              100,

            rotationX:
              (Math.random() - .5) *
              180,

            rotationY:
              (Math.random() - .5) *
              180,

            scale:
              .25 +
              Math.random() *
              .9,

            opacity: 0,

            filter:
              "blur(4px)",

            duration:
              .9 +
              Math.random() *
              .65,

            delay:
              i * .012,

            ease:
              "expo.out"

          }
        );

      }
    );

    /* ---------------------------------------------------
       FLASH
    --------------------------------------------------- */

    const flash =
      document.createElement("div");

    flash.className =
      "fracture69-flash";

    stage.appendChild(flash);

    gsap.timeline({

      onComplete: () => {
        flash.remove();
      }

    })

      .to(
        flash,
        {

          opacity: .3,

          duration: .05

        }
      )

      .to(
        flash,
        {

          opacity: 0,

          duration: .4,

          ease: "power2.out"

        }
      );

    /* ---------------------------------------------------
       RECONSTRUCTION
    --------------------------------------------------- */

    gsap.delayedCall(
      1.15,
      () => {

        status.textContent =
          "RECONSTRUCTING";

        shardData.forEach(
          (data, i) => {

            gsap.to(
              data.element,
              {

                x: 0,
                y: 0,
                z: 0,

                rotation:
                  data.rotation,

                rotationX: 0,
                rotationY: 0,

                scale: 1,

                opacity:
                  .16 +
                  (i %
                   4) *
                  .025,

                filter:
                  "blur(0px)",

                duration:
                  1.1 +
                  Math.random() *
                  .35,

                delay:
                  i * .025,

                ease:
                  "expo.out"

              }
            );

          }
        );

        gsap.to(
          word,
          {

            scale: 1,

            filter:
              "blur(0px)",

            duration: 1.1,

            ease:
              "expo.out"

          }
        );

        [...crackContainer.children]
          .forEach(
            (crack) => {

              gsap.to(
                crack,
                {

                  opacity: 0,

                  duration: .7,

                  ease:
                    "power2.out"

                }
              );

            }
          );

      }
    );

    /* ---------------------------------------------------
       CLEANUP
    --------------------------------------------------- */

    gsap.delayedCall(
      2.8,
      () => {

        shardData.forEach(
          (data) => {

            gsap.set(
              data.element,
              {

                x: 0,
                y: 0,
                z: 0,

                rotation:
                  data.rotation,

                rotationX: 0,
                rotationY: 0,

                scale: 1,

                opacity: 0,

                filter:
                  "blur(0px)"

              }
            );

          }
        );

        status.textContent =
          "MOVE TO FRACTURE";

        counter.textContent =
          "000 / 000";

        locked = false;

      }
    );

  }

})();
/* =========================================================
   SECTION 70 — TYPOGRAPHY DISINTEGRATE
========================================================= */

(() => {

  const stage =
    document.getElementById("dis70Stage");

  const canvas =
    document.getElementById("dis70Canvas");

  const word =
    document.getElementById("dis70Word");

  const cursor =
    document.getElementById("dis70Cursor");

  const ring =
    document.getElementById("dis70Ring");

  const status =
    document.getElementById("dis70Status");

  const counter =
    document.getElementById("dis70Counter");

  if (!stage || !canvas || !word) return;

  const ctx =
    canvas.getContext("2d");

  /* -------------------------------------------------------
     CONFIG
  ------------------------------------------------------- */

  const isMobile =
    window.matchMedia("(max-width: 768px)").matches;

  const PARTICLE_COUNT =
    isMobile ? 4200 : 8500;

  const PARTICLE_SIZE =
    isMobile ? 1.25 : 1.15;

  const PARTICLE_GAP =
    isMobile ? 4 : 3;

  /* -------------------------------------------------------
     CANVAS SIZE
  ------------------------------------------------------- */

  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {

    width =
      stage.clientWidth;

    height =
      stage.clientHeight;

    dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    canvas.width =
      width * dpr;

    canvas.height =
      height * dpr;

    canvas.style.width =
      `${width}px`;

    canvas.style.height =
      `${height}px`;

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    createTextParticles();

  }

  window.addEventListener(
    "resize",
    resize
  );
  /* -------------------------------------------------------
     MOUSE
  ------------------------------------------------------- */

  const mouse = {

    x: width / 2,
    y: height / 2,

    targetX: width / 2,
    targetY: height / 2,

    previousX: width / 2,
    previousY: height / 2,

    velocity: 0,

    active: false

  };

  let locked = false;

  window.addEventListener(
    "mousemove",
    (e) => {

      mouse.targetX =
        e.clientX;

      mouse.targetY =
        e.clientY;

      mouse.active = true;

      status.textContent =
        "PARTICLES DETACHING";

    }
  );

  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active = false;

      status.textContent =
        "MOVE TO DISINTEGRATE";

    }
  );

  /* -------------------------------------------------------
     PARTICLES
  ------------------------------------------------------- */

  const particles = [];

  function createTextParticles() {

    particles.length = 0;

    const offscreen =
      document.createElement(
        "canvas"
      );

    const offCtx =
      offscreen.getContext("2d");

    const fontSize =
      Math.min(
        width * .125,
        240
      );

    offscreen.width =
      width;

    offscreen.height =
      height;

    offCtx.clearRect(
      0,
      0,
      width,
      height
    );

    offCtx.fillStyle =
      "#fff";

    offCtx.font =
      `900 ${fontSize}px Arial`;

    offCtx.textAlign =
      "center";

    offCtx.textBaseline =
      "middle";

    offCtx.fillText(
      "DISINTEGRATE",
      width / 2,
      height / 2
    );

    const image =
      offCtx.getImageData(
        0,
        0,
        width,
        height
      ).data;

    const points = [];

    for (
      let y = 0;
      y < height;
      y += PARTICLE_GAP
    ) {

      for (
        let x = 0;
        x < width;
        x += PARTICLE_GAP
      ) {

        const index =
          (
            y * width +
            x
          ) * 4;

        if (
          image[index + 3] > 100
        ) {

          points.push({
            x,
            y
          });

        }

      }

    }


  /* -----------------------------------------------
       SAMPLE PARTICLES
    ----------------------------------------------- */

    let selected =
      points;

    if (
      points.length >
      PARTICLE_COUNT
    ) {

      selected = [];

      const step =
        points.length /
        PARTICLE_COUNT;

      for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
      ) {

        selected.push(
          points[
            Math.floor(
              i * step
            )
          ]
        );

      }

    }

    selected.forEach(
      (point) => {

        particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          size:
            PARTICLE_SIZE +
            Math.random() * .7,

          alpha:
            .5 +
            Math.random() * .5,

          noise:
            Math.random() *
            Math.PI * 2,

          seed:
            Math.random(),

          exploded: false

        });

      }
    );

    counter.textContent =
      `${String(
        particles.length
      ).padStart(5, "0")} PARTICLES`;

  }

  /* -------------------------------------------------------
     INITIALIZE
  ------------------------------------------------------- */

  resize();

  mouse.x =
    width / 2;

  mouse.y =
    height / 2;

  mouse.targetX =
    width / 2;

  mouse.targetY =
    height / 2;

  /* -------------------------------------------------------
     DRAW
  ------------------------------------------------------- */

  function render() {

    requestAnimationFrame(
      render
    );

    if (locked) return;

    /* -----------------------------------------------
       MOUSE SMOOTHING
    ----------------------------------------------- */

    mouse.x +=
      (mouse.targetX -
       mouse.x) *
      .1;

    mouse.y +=
      (mouse.targetY -
       mouse.y) *
      .1;

    /* -----------------------------------------------
       VELOCITY
    ----------------------------------------------- */

    const dx =
      mouse.x -
      mouse.previousX;

    const dy =
      mouse.y -
      mouse.previousY;

    const velocity =
      Math.sqrt(
        dx * dx +
        dy * dy
      );

    mouse.velocity +=
      (velocity -
       mouse.velocity) *
      .12;

    mouse.previousX =
      mouse.x;

    mouse.previousY =
      mouse.y;

    /* -----------------------------------------------
       CLEAR
    ----------------------------------------------- */

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    /* -----------------------------------------------
       PARTICLES
    ----------------------------------------------- */

    let detached = 0;

    const radius =
      45 +
      Math.min(
        mouse.velocity * 1.8,
        120
      );

    const force =
      Math.min(
        mouse.velocity * .08,
        2.5
      );

    particles.forEach(
      (p) => {

        const dx =
          p.x -
          mouse.x;

        const dy =
          p.y -
          mouse.y;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );

        /* -------------------------------------------
           MOUSE REPULSION
        ------------------------------------------- */

        if (
          mouse.active &&
          distance < radius
        ) {

          const strength =
            (1 -
             distance / radius);

          const safeDistance =
            Math.max(
              distance,
              .001
            );

          const nx =
            dx /
            safeDistance;

          const ny =
            dy /
            safeDistance;

          p.vx +=
            nx *
            strength *
            (.8 + force);

          p.vy +=
            ny *
            strength *
            (.8 + force);

          detached++;

        }
 /* -------------------------------------------
           MAGNETIC DELAY
        ------------------------------------------- */

        const returnStrength =
          p.exploded
            ? .001
            : .018;

        p.vx +=
          (p.baseX - p.x) *
          returnStrength;

        p.vy +=
          (p.baseY - p.y) *
          returnStrength;

        /* -------------------------------------------
           FRICTION
        ------------------------------------------- */

        p.vx *= .91;
        p.vy *= .91;

        /* -------------------------------------------
           POSITION
        ------------------------------------------- */

        p.x += p.vx;
        p.y += p.vy;

        /* -------------------------------------------
           MICRO NOISE
        ------------------------------------------- */

        p.noise += .015;

        const noiseX =
          Math.cos(p.noise) *
          .15;

        const noiseY =
          Math.sin(p.noise * 1.3) *
          .15;

        /* -------------------------------------------
           DRAW
        ------------------------------------------- */

        const speed =
          Math.sqrt(
            p.vx * p.vx +
            p.vy * p.vy
          );

        const alpha =
          Math.max(
            .05,
            p.alpha -
            speed * .025
          );

        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${alpha}
          )`;

        const size =
          p.size +
          Math.min(
            speed * .25,
            2
          );

        ctx.fillRect(
          p.x + noiseX,
          p.y + noiseY,
          size,
          size
        );

      }
    );

    /* -----------------------------------------------
       MAIN WORD VISIBILITY
    ----------------------------------------------- */

    const wordOpacity =
      Math.max(
        .06,
        1 -
        detached /
        Math.max(
          particles.length * .12,
          1
        )
      );

    word.style.opacity =
      wordOpacity;

    /* -----------------------------------------------
       WORD PARALLAX
    ----------------------------------------------- */

    const nx =
      (mouse.x -
       width / 2) /
      (width / 2);

    const ny =
      (mouse.y -
       height / 2) /
      (height / 2);

    word.style.transform = `
      translate(
        calc(-50% + ${nx * 8}px),
        calc(-50% + ${ny * 6}px)
      )
      scale(
        ${1 +
          Math.min(
            mouse.velocity * .0008,
            .025
          )}
      )
    `;

 /* -----------------------------------------------
       GRID
    ----------------------------------------------- */

    const grid =
      stage.querySelector(
        ".dis70-grid"
      );

    if (grid) {

      grid.style.transform = `
        translate(
          ${nx * -22}px,
          ${ny * -22}px
        )
      `;

    }

    /* -----------------------------------------------
       CURSOR
    ----------------------------------------------- */

    if (!isMobile) {

      gsap.to(
        cursor,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .2,

          ease: "power3.out",

          overwrite: true

        }
      );

      gsap.to(
        ring,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .5,

          ease: "power3.out",

          overwrite: true

        }
      );

    }

    /* -----------------------------------------------
       COUNTER
    ----------------------------------------------- */

    const activeParticles =
      particles.filter(
        p =>
          Math.abs(
            p.x -
            p.baseX
          ) > 2 ||
          Math.abs(
            p.y -
            p.baseY
          ) > 2
      ).length;

    counter.textContent =
      `${String(
        activeParticles
      ).padStart(5, "0")} PARTICLES`;

  }

  render();

  /* =====================================================
     CLICK — FULL DISINTEGRATION
  ===================================================== */

  stage.addEventListener(
    "click",
    () => {

      if (locked) return;

      locked = true;

      disintegrate();

    }
  );

  function disintegrate() {

    status.textContent =
      "TOTAL DISINTEGRATION";

    /* ---------------------------------------------------
       HIDE HTML WORD
    --------------------------------------------------- */

    gsap.to(
      word,
      {

        opacity: 0,

        scale: 1.04,

        filter:
          "blur(3px)",

        duration: .25,

        ease: "power2.in"

      }
    );

    /* ---------------------------------------------------
       PARTICLE EXPLOSION
    --------------------------------------------------- */

    particles.forEach(
      (p) => {

        const centerX =
          width / 2;

        const centerY =
          height / 2;

        const dx =
          p.baseX -
          centerX;

        const dy =
          p.baseY -
          centerY;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );

        const safeDistance =
          Math.max(
            distance,
            .001
          );

        const nx =
          dx /
          safeDistance;

        const ny =
          dy /
          safeDistance;

        const power =
          2 +
          Math.random() *
          8;

        p.vx =
          nx *
          power +
          (Math.random() - .5) *
          5;

        p.vy =
          ny *
          power +
          (Math.random() - .5) *
          5;

        p.exploded = true;

      }
    );

    /* ---------------------------------------------------
       FLASH
    --------------------------------------------------- */

    const flash =
      document.createElement("div");

    flash.className =
      "dis70-flash";

    stage.appendChild(
      flash
    );

    gsap.timeline({

      onComplete: () => {
        flash.remove();
      }

    })

      .to(
        flash,
        {

          opacity: .4,

          duration: .05

        }
      )

      .to(
        flash,
        {

          opacity: 0,

          duration: .4,

          ease: "power2.out"

        }
      );

    /* ---------------------------------------------------
       WAIT
    --------------------------------------------------- */

    gsap.delayedCall(
      1.3,
      () => {

        status.textContent =
          "RECONSTRUCTING";

        /* ---------------------------------------------
           REVERSE PARTICLE FLOW
        --------------------------------------------- */

        particles.forEach(
          (p) => {

            p.exploded = false;

            p.vx *= -.15;
            p.vy *= -.15;

          }
        );

        gsap.to(
          word,
          {

            opacity: 1,

            scale: 1,

            filter:
              "blur(0px)",

            duration: 1.5,

            ease: "expo.out"

          }
        );

      }
    );

    /* ---------------------------------------------------
       RESTORE
    --------------------------------------------------- */

    gsap.delayedCall(
      3,
      () => {

        particles.forEach(
          (p) => {

            p.x =
              p.baseX;

            p.y =
              p.baseY;

            p.vx = 0;
            p.vy = 0;

            p.exploded =
              false;

          }
        );

        status.textContent =
          "MOVE TO DISINTEGRATE";

        counter.textContent =
          `${String(
            particles.length
          ).padStart(5, "0")} PARTICLES`;

        locked = false;

      }
    );

  }
})();


/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
