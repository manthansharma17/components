gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   SECTION 51
   TYPOGRAPHY GRAVITY FIELD
========================================================= */

const gravity51Stage =
    document.querySelector(
        ".gravity51-stage"
    );

const gravity51Word =
    document.querySelector(
        "#gravity51Word"
    );

const gravity51Core =
    document.querySelector(
        "#gravity51Core"
    );

const gravity51Cursor =
    document.querySelector(
        "#gravity51Cursor"
    );

const gravity51Orbits =
    gsap.utils.toArray(
        ".gravity51-orbit"
    );


/* =========================================================
   SPLIT TEXT
========================================================= */

const gravity51Text =
    gravity51Word
        .textContent
        .trim();


gravity51Word.innerHTML =
    "";


[...gravity51Text].forEach(
    (letter) => {

        const char =
            document.createElement(
                "span"
            );


        char.className =
            "gravity51-char";


        char.textContent =
            letter;


        gravity51Word.appendChild(
            char
        );

    }
);


const gravity51Chars =
    gsap.utils.toArray(
        ".gravity51-char"
    );

/* =========================================================
   STATE
========================================================= */

let gravity51MouseX = 0;
let gravity51MouseY = 0;

let gravity51CurrentX = 0;
let gravity51CurrentY = 0;

let gravity51PreviousX = 0;
let gravity51PreviousY = 0;

let gravity51VelocityX = 0;
let gravity51VelocityY = 0;

let gravity51Speed = 0;

let gravity51Inside = false;

let gravity51Active = false;


/* =========================================================
   SETTINGS
========================================================= */

const GRAVITY51_RADIUS =
    500;

const GRAVITY51_FORCE =
    120;

/* =========================================================
   MOUSE ENTER
========================================================= */

gravity51Stage.addEventListener(
    "mouseenter",
    () => {

        gravity51Inside =
            true;


        gsap.to(
            gravity51Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: 0.3

            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

gravity51Stage.addEventListener(
    "mousemove",
    (event) => {

        if (
            gravity51Active
        ) return;


        const rect =
            gravity51Stage
                .getBoundingClientRect();


        gravity51MouseX =
            event.clientX -
            rect.left;


        gravity51MouseY =
            event.clientY -
            rect.top;


        /* =============================================
           VELOCITY
        ============================================= */

        gravity51VelocityX =
            gravity51MouseX -
            gravity51PreviousX;


        gravity51VelocityY =
            gravity51MouseY -
            gravity51PreviousY;


        gravity51Speed =
            Math.sqrt(

                gravity51VelocityX *
                gravity51VelocityX

                +

                gravity51VelocityY *
                gravity51VelocityY

            );


        gravity51PreviousX =
            gravity51MouseX;


        gravity51PreviousY =
            gravity51MouseY;

    }
);


/* =========================================================
   MOUSE LEAVE
========================================================= */

gravity51Stage.addEventListener(
    "mouseleave",
    () => {

        gravity51Inside =
            false;


        gsap.to(
            gravity51Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: 0.3

            }
        );


        if (
            !gravity51Active
        ) {

            gsap.to(
                gravity51Chars,
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
   MAIN LOOP
========================================================= */

function updateGravity51() {

    /* =============================================
       SMOOTH CURSOR
    ============================================= */

    gravity51CurrentX +=
        (
            gravity51MouseX -
            gravity51CurrentX
        ) *
        0.14;


    gravity51CurrentY +=
        (
            gravity51MouseY -
            gravity51CurrentY
        ) *
        0.14;


    gravity51Cursor.style.left =
        `${gravity51CurrentX}px`;


    gravity51Cursor.style.top =
        `${gravity51CurrentY}px`;


    /* =============================================
       LETTER GRAVITY
    ============================================= */

    if (
        gravity51Inside &&
        !gravity51Active
    ) {

        const stageRect =
            gravity51Stage
                .getBoundingClientRect();


        gravity51Chars.forEach(
            (char) => {

                const charRect =
                    char
                        .getBoundingClientRect();


                const charX =
                    charRect.left -
                    stageRect.left +
                    charRect.width / 2;


                const charY =
                    charRect.top -
                    stageRect.top +
                    charRect.height / 2;


                const dx =
                    gravity51CurrentX -
                    charX;


                const dy =
                    gravity51CurrentY -
                    charY;


                const distance =
                    Math.sqrt(

                        dx * dx +
                        dy * dy

                    );


                /* =========================================
                   OUTSIDE FIELD
                ========================================= */

                if (
                    distance >
                    GRAVITY51_RADIUS
                ) {

                    gsap.to(
                        char,
                        {

                            x: 0,

                            y: 0,

                            rotation: 0,

                            scale: 1,

                            filter:
                                "brightness(1)",

                            duration: 0.5,

                            overwrite:
                                "auto"

                        }
                    );


                    return;

                }


                /* =========================================
                   GRAVITY STRENGTH
                ========================================= */

                const strength =
                    1 -
                    distance /
                    GRAVITY51_RADIUS;


                const force =
                    strength *
                    strength;


                /* =========================================
                   PULL
                ========================================= */

                const pullX =
                    dx /
                    Math.max(
                        distance,
                        1
                    ) *
                    force *
                    GRAVITY51_FORCE;


                const pullY =
                    dy /
                    Math.max(
                        distance,
                        1
                    ) *
                    force *
                    GRAVITY51_FORCE;


                /* =========================================
                   ORBITAL OFFSET
                ========================================= */

                const orbitX =
                    -dy /
                    Math.max(
                        distance,
                        1
                    ) *
                    force *
                    gravity51Speed *
                    0.6;


                const orbitY =
                    dx /
                    Math.max(
                        distance,
                        1
                    ) *
                    force *
                    gravity51Speed *
                    0.6;


                /* =========================================
                   DIRECT HOVER
                ========================================= */

                const directHover =
                    distance < 100;


                const scale =
                    directHover
                        ? 1.15 +
                          force * 0.15
                        : 1 +
                          force * 0.05;


                gsap.to(
                    char,
                    {

                        x:
                            pullX +
                            orbitX,


                        y:
                            pullY +
                            orbitY,


                        rotation:
                            orbitX *
                            0.15,


                        scale,


                        filter:
                            directHover
                                ? "brightness(1.4)"
                                : "brightness(1)",


                        duration:
                            0.25,


                        overwrite:
                            "auto",


                        ease:
                            "power3.out"

                    }
                );

            }
        );

    }


    /* =============================================
       SPEED DECAY
    ============================================= */

    gravity51Speed *=
        0.88;


    requestAnimationFrame(
        updateGravity51
    );

}


updateGravity51();

/* =========================================================
   CLICK EFFECT
   GRAVITATIONAL ORBIT
========================================================= */

gravity51Stage.addEventListener("click", () => {
  if (gravity51Active) return;

  gravity51Active = true;

  /* =============================================
           GRAVITY CORE
        ============================================= */

  gsap.set(gravity51Core, {
    left: gravity51CurrentX,

    top: gravity51CurrentY,

    opacity: 1,

    scale: 0,
  });

  gsap.to(gravity51Core, {
    scale: 4,

    duration: 0.5,

    ease: "power3.out",
  });

  /* =============================================
           ORBIT RINGS
        ============================================= */

  gravity51Orbits.forEach((orbit, index) => {
    gsap.set(orbit, {
      left: gravity51CurrentX,

      top: gravity51CurrentY,

      opacity: 0,

      scale: 0.2,
    });

    gsap.to(orbit, {
      opacity: 0.5,

      scale: 1,

      duration: 0.5,

      delay: index * 0.1,
    });
  });

  /* =============================================
           CALCULATE ORBIT FOR EACH LETTER
        ============================================= */

  const stageRect = gravity51Stage.getBoundingClientRect();

  gravity51Chars.forEach((char, index) => {
    const rect = char.getBoundingClientRect();

    const x = rect.left - stageRect.left + rect.width / 2;

    const y = rect.top - stageRect.top + rect.height / 2;

    const dx = x - gravity51CurrentX;

    const dy = y - gravity51CurrentY;

    const angle = Math.atan2(dy, dx);

    const radius = Math.max(
      Math.sqrt(dx * dx + dy * dy),

      120,
    );

    /* =========================================
                   ORBIT TIMELINE
                ========================================= */

    const orbitTimeline = gsap.timeline();

    orbitTimeline.to(char, {
      x: () => Math.cos(angle + Math.PI * 0.7) * radius - dx,

      y: () => Math.sin(angle + Math.PI * 0.7) * radius - dy,

      rotation: 180,

      scale: 0.85,

      duration: 0.8,

      delay: index * 0.03,

      ease: "power3.inOut",
    });

    orbitTimeline.to(char, {
      x: () => Math.cos(angle + Math.PI * 1.5) * radius * 0.7 - dx,

      y: () => Math.sin(angle + Math.PI * 1.5) * radius * 0.7 - dy,

      rotation: 360,

      scale: 0.6,

      duration: 0.8,

      ease: "power2.inOut",
    });

    /* =========================================
                   EXPLOSIVE RELEASE
                ========================================= */

    orbitTimeline.to(char, {
      x: gsap.utils.random(-400, 400),

      y: gsap.utils.random(-300, 300),

      rotation: gsap.utils.random(-540, 540),

      scale: gsap.utils.random(0.6, 1.3),

      duration: 0.7,

      ease: "power3.out",
    });

    /* =========================================
                   RETURN
                ========================================= */

    orbitTimeline.to(char, {
      x: 0,

      y: 0,

      rotation: 0,

      scale: 1,

      duration: 1.4,

      ease: "elastic.out(1,.45)",
    });
  });

  /* =============================================
           HIDE CORE
        ============================================= */

  gsap.to(gravity51Core, {
    opacity: 0,

    scale: 0,

    duration: 0.8,

    delay: 2.5,
  });

  /* =============================================
           HIDE ORBITS
        ============================================= */

  gsap.to(gravity51Orbits, {
    opacity: 0,

    scale: 1.5,

    duration: 1,

    delay: 2.2,

    stagger: 0.1,
  });

  /* =============================================
           UNLOCK INTERACTION
        ============================================= */

  setTimeout(() => {
    gravity51Active = false;
  }, 4000);
});

/* =========================================================
   SECTION 52
   LIQUID REFLECTION TYPOGRAPHY
========================================================= */

const reflection52Stage =
    document.querySelector(
        ".reflection52-stage"
    );

const reflection52Scene =
    document.querySelector(
        ".reflection52-scene"
    );

const reflection52Word =
    document.querySelector(
        "#reflection52Word"
    );

const reflection52Reflection =
    document.querySelector(
        "#reflection52Reflection"
    );

const reflection52Light =
    document.querySelector(
        "#reflection52Light"
    );

const reflection52Cursor =
    document.querySelector(
        "#reflection52Cursor"
    );

const reflection52Ripples =
    document.querySelector(
        "#reflection52Ripples"
    );


/* =========================================================
   STATE
========================================================= */

let reflection52MouseX = 0;
let reflection52MouseY = 0;

let reflection52CurrentX = 0;
let reflection52CurrentY = 0;

let reflection52PreviousX = 0;
let reflection52PreviousY = 0;

let reflection52VelocityX = 0;

let reflection52Speed = 0;

let reflection52Inside = false;

let reflection52Animating = false;


/* =========================================================
   MOUSE ENTER
========================================================= */

reflection52Stage.addEventListener(
    "mouseenter",
    () => {

        reflection52Inside = true;


        gsap.to(
            reflection52Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: .3,

                ease:
                    "power3.out"

            }
        );


        gsap.to(
            reflection52Light,
            {

                opacity: 1,

                duration: .5

            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

reflection52Stage.addEventListener(
    "mousemove",
    (event) => {

        if (
            reflection52Animating
        ) return;


        const rect =
            reflection52Stage
                .getBoundingClientRect();


        reflection52MouseX =
            event.clientX -
            rect.left;


        reflection52MouseY =
            event.clientY -
            rect.top;


        reflection52VelocityX =
            reflection52MouseX -
            reflection52PreviousX;


        reflection52Speed =
            Math.abs(
                reflection52VelocityX
            );


        reflection52PreviousX =
            reflection52MouseX;


        reflection52PreviousY =
            reflection52MouseY;

    }
);

/* =========================================================
   MOUSE LEAVE
========================================================= */

reflection52Stage.addEventListener(
    "mouseleave",
    () => {

        reflection52Inside = false;


        gsap.to(
            reflection52Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: .3

            }
        );


        gsap.to(
            reflection52Light,
            {

                opacity: 0,

                duration: .4

            }
        );


        if (
            !reflection52Animating
        ) {

            gsap.to(
                reflection52Scene,
                {

                    rotationY: 0,

                    rotationX: 0,

                    duration: .7,

                    ease:
                        "power3.out"

                }
            );

        }

    }
);


/* =========================================================
   CREATE RIPPLE
========================================================= */

function createReflection52Ripple(
    x,
    y,
    size = 100
) {

    const ripple =
        document.createElement(
            "div"
        );


    ripple.className =
        "reflection52-ripple";


    reflection52Ripples.appendChild(
        ripple
    );


    gsap.set(
        ripple,
        {

            left: x,

            top: y,

            width: 20,

            height: 20

        }
    );


    gsap.to(
        ripple,
        {

            width: size,

            height: size,

            opacity: .5,

            duration: .8,

            ease:
                "power2.out"

        }
    );


    gsap.to(
        ripple,
        {

            opacity: 0,

            duration: .4,

            delay: .4,

            onComplete: () => {

                ripple.remove();

            }

        }
    );

}

/* =========================================================
   MAIN ANIMATION
========================================================= */

function updateReflection52() {

    /* =============================================
       SMOOTH CURSOR
    ============================================= */

    reflection52CurrentX +=
        (
            reflection52MouseX -
            reflection52CurrentX
        ) * .14;


    reflection52CurrentY +=
        (
            reflection52MouseY -
            reflection52CurrentY
        ) * .14;


    /* =============================================
       CURSOR
    ============================================= */

    reflection52Cursor.style.left =
        `${reflection52CurrentX}px`;


    reflection52Cursor.style.top =
        `${reflection52CurrentY}px`;


    /* =============================================
       LIGHT
    ============================================= */

    reflection52Light.style.left =
        `${reflection52CurrentX}px`;


    reflection52Light.style.top =
        `${reflection52CurrentY}px`;


    /* =============================================
       MOUSE TILT
    ============================================= */

    if (
        reflection52Inside &&
        !reflection52Animating
    ) {

        const rect =
            reflection52Stage
                .getBoundingClientRect();


        const normalizedX =
            (
                reflection52CurrentX /
                rect.width
            ) * 2 - 1;


        const normalizedY =
            (
                reflection52CurrentY /
                rect.height
            ) * 2 - 1;


        gsap.to(
            reflection52Scene,
            {

                rotationY:
                    normalizedX * 5,

                rotationX:
                    normalizedY * -3,

                duration: .35,

                overwrite:
                    "auto",

                ease:
                    "power3.out"

            }
        );


        /* =========================================
           REFLECTION DISTORTION
        ========================================= */

        const wave =
            Math.sin(
                performance.now() *
                .003
            );


        const speedStretch =
            Math.min(
                reflection52Speed *
                .025,
                .35
            );


        reflection52Reflection.style.transform =
            `
            translateX(-50%)
            scaleX(${1 + speedStretch})
            scaleY(-1)
            skewX(${wave * speedStretch}deg)
            `;


        reflection52Reflection.style.filter =
            `
            blur(
                ${
                    1.5 +
                    speedStretch * 5
                }px
            )
            `;

    }

/* =============================================
       SPEED DECAY
    ============================================= */

    reflection52Speed *= .88;


    requestAnimationFrame(
        updateReflection52
    );

}


updateReflection52();


/* =========================================================
   CLICK
   BREAK THE REFLECTION
========================================================= */

reflection52Stage.addEventListener("click", () => {
  if (reflection52Animating) return;

  reflection52Animating = true;

  const rect = reflection52Stage.getBoundingClientRect();

  const clickX = reflection52CurrentX;

  const clickY = reflection52CurrentY;

  /* =============================================
           WATER RIPPLE
        ============================================= */

  createReflection52Ripple(clickX, clickY, 350);

  createReflection52Ripple(clickX, clickY, 550);

  createReflection52Ripple(clickX, clickY, 800);

  /* =============================================
           MAIN WORD FLOATS UP
        ============================================= */

  gsap.to(reflection52Word, {
    y: -35,

    scale: 1.03,

    duration: 0.45,

    ease: "power3.out",
  });

  /* =============================================
           REFLECTION BREAKS
        ============================================= */

  gsap.to(reflection52Reflection, {
    y: 25,

    scaleX: 1.25,

    opacity: 0.05,

    filter: "blur(8px)",

    duration: 0.5,

    ease: "power3.in",
  });

  /* =============================================
           WATER SHOCKWAVE
        ============================================= */

  gsap.to(reflection52Water, {
    scaleY: 1.25,

    duration: 0.35,

    ease: "power2.out",
  });

  /* =============================================
           RESET
        ============================================= */

  setTimeout(() => {
    gsap.to(reflection52Word, {
      y: 0,

      scale: 1,

      duration: 1,

      ease: "elastic.out(1,.45)",
    });

    gsap.to(reflection52Water, {
      scaleY: 1,

      duration: 0.8,

      ease: "power3.out",
    });

    gsap.to(reflection52Reflection, {
      y: 0,

      scaleX: 1,

      opacity: 0.75,

      filter: "blur(1.5px)",

      duration: 1.2,

      ease: "elastic.out(1,.35)",

      onComplete: () => {
        reflection52Animating = false;
      },
    });
  }, 700);
});

/* =========================================================
   SECTION 53 — CHROMATIC ECHO
========================================================= */

const echo53Stage =
    document.querySelector(
        ".echo53-stage"
    );

const echo53Scene =
    document.querySelector(
        "#echo53Scene"
    );

const echo53WordWrap =
    document.querySelector(
        "#echo53WordWrap"
    );

const echo53Main =
    document.querySelector(
        "#echo53Main"
    );

const echo53Red =
    document.querySelector(
        ".echo53-red"
    );

const echo53Green =
    document.querySelector(
        ".echo53-green"
    );

const echo53Blue =
    document.querySelector(
        ".echo53-blue"
    );

const echo53Trails =
    document.querySelector(
        "#echo53Trails"
    );

const echo53Cursor =
    document.querySelector(
        "#echo53Cursor"
    );

const echo53Crosshair =
    document.querySelector(
        "#echo53Crosshair"
    );


/* =========================================================
   STATE
========================================================= */

let echo53MouseX = 0;
let echo53MouseY = 0;

let echo53CurrentX = 0;
let echo53CurrentY = 0;

let echo53PreviousX = 0;
let echo53PreviousY = 0;

let echo53VelocityX = 0;
let echo53VelocityY = 0;

let echo53Speed = 0;

let echo53Inside = false;

let echo53Locked = false;

let echo53TrailTimer = 0;


/* =========================================================
   MOUSE ENTER
========================================================= */

echo53Stage.addEventListener(
    "mouseenter",
    () => {

        echo53Inside = true;

        gsap.to(
            echo53Cursor,
            {
                opacity: 1,
                scale: 1,
                duration: .3,
                ease: "power3.out"
            }
        );

        gsap.to(
            echo53Crosshair,
            {
                opacity: 1,
                scale: 1,
                duration: .4,
                ease: "power3.out"
            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

echo53Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            echo53Stage
                .getBoundingClientRect();

        echo53MouseX =
            event.clientX -
            rect.left;

        echo53MouseY =
            event.clientY -
            rect.top;

        echo53VelocityX =
            echo53MouseX -
            echo53PreviousX;

        echo53VelocityY =
            echo53MouseY -
            echo53PreviousY;

        echo53Speed =
            Math.sqrt(
                echo53VelocityX *
                echo53VelocityX +
                echo53VelocityY *
                echo53VelocityY
            );

        echo53PreviousX =
            echo53MouseX;

        echo53PreviousY =
            echo53MouseY;

    }
);
/* =========================================================
   MOUSE LEAVE
========================================================= */

echo53Stage.addEventListener(
    "mouseleave",
    () => {

        echo53Inside = false;

        gsap.to(
            echo53Cursor,
            {
                opacity: 0,
                scale: 0,
                duration: .3
            }
        );

        gsap.to(
            echo53Crosshair,
            {
                opacity: 0,
                scale: .5,
                duration: .3
            }
        );

        if (!echo53Locked) {

            gsap.to(
                echo53WordWrap,
                {
                    x: 0,
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    duration: .7,
                    ease: "power3.out"
                }
            );

            gsap.to(
                echo53Red,
                {
                    x: 0,
                    duration: .5
                }
            );

            gsap.to(
                echo53Green,
                {
                    x: 0,
                    duration: .5
                }
            );

            gsap.to(
                echo53Blue,
                {
                    x: 0,
                    duration: .5
                }
            );

        }

    }
);


/* =========================================================
   CREATE CHROMATIC TRAIL
========================================================= */

function createEcho53Trail() {

    if (
        !echo53Inside ||
        echo53Locked ||
        echo53Speed < 5
    ) return;


    const trail =
        document.createElement("div");

    trail.className =
        "echo53-trail";


    trail.textContent =
        "ECHO";


    const colors = [
        "rgba(255,0,50,.35)",
        "rgba(0,255,150,.3)",
        "rgba(0,120,255,.35)"
    ];


    trail.style.color =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    echo53Trails.appendChild(
        trail
    );


    const rect =
        echo53Stage
            .getBoundingClientRect();


    gsap.set(
        trail,
        {

            left:
                echo53CurrentX -
                rect.width / 2,

            top:
                echo53CurrentY -
                rect.height / 2,

            xPercent: -50,

            yPercent: -50,

            scale:
                .92 +
                Math.random() * .1,

            rotation:
                (Math.random() - .5) *
                3,

            opacity: .45

        }
    );


    gsap.to(
        trail,
        {

            x:
                -echo53VelocityX *
                3,

            y:
                -echo53VelocityY *
                3,

            scale: 1.08,

            opacity: 0,

            duration: .7,

            ease:
                "power2.out",

            onComplete: () => {

                trail.remove();

            }

        }
    );

}

/* =========================================================
   MAIN LOOP
========================================================= */

function updateEcho53() {

    echo53CurrentX +=
        (
            echo53MouseX -
            echo53CurrentX
        ) * .13;


    echo53CurrentY +=
        (
            echo53MouseY -
            echo53CurrentY
        ) * .13;


    /* =============================================
       CURSOR
    ============================================= */

    echo53Cursor.style.left =
        `${echo53CurrentX}px`;

    echo53Cursor.style.top =
        `${echo53CurrentY}px`;


    echo53Crosshair.style.left =
        `${echo53CurrentX}px`;

    echo53Crosshair.style.top =
        `${echo53CurrentY}px`;


    /* =============================================
       ONLY WHEN INSIDE
    ============================================= */

    if (
        echo53Inside &&
        !echo53Locked
    ) {

        const rect =
            echo53Stage
                .getBoundingClientRect();


        const nx =
            (
                echo53CurrentX /
                rect.width
            ) * 2 - 1;


        const ny =
            (
                echo53CurrentY /
                rect.height
            ) * 2 - 1;


        /* =========================================
           3D MOVEMENT
        ========================================= */

        gsap.to(
            echo53WordWrap,
            {

                rotationY:
                    nx * 8,

                rotationX:
                    ny * -5,

                x:
                    nx * 12,

                y:
                    ny * 8,

                duration: .35,

                overwrite:
                    "auto",

                ease:
                    "power3.out"

            }
        );


        /* =========================================
           CHROMATIC SEPARATION
        ========================================= */

        const separation =
            Math.min(
                Math.abs(nx) * 30 +
                echo53Speed * .35,
                45
            );


        gsap.to(
            echo53Red,
            {

                x:
                    -separation,

                duration: .18,

                overwrite:
                    "auto"

            }
        );


        gsap.to(
            echo53Green,
            {

                x:
                    separation *
                    .15,

                duration: .2,

                overwrite:
                    "auto"

            }
        );


        gsap.to(
            echo53Blue,
            {

                x:
                    separation,

                duration: .18,

                overwrite:
                    "auto"

            }
        );


        /* =========================================
           FAST MOVEMENT = TRAILS
        ========================================= */

        echo53TrailTimer++;


        if (
            echo53Speed > 7 &&
            echo53TrailTimer % 3 === 0
        ) {

            createEcho53Trail();

        }

    }


    /* =============================================
       VELOCITY DECAY
    ============================================= */

    echo53Speed *= .88;


    requestAnimationFrame(
        updateEcho53
    );

}


updateEcho53();


/* =========================================================
   CLICK — CHROMATIC EXPLOSION
========================================================= */

echo53Stage.addEventListener(
    "click",
    () => {

        if (echo53Locked)
            return;


        echo53Locked = true;


        /* =============================================
           FLASH
        ============================================= */

        const flash =
            document.createElement("div");

        flash.className =
            "echo53-flash";

        echo53Stage.appendChild(
            flash
        );


        gsap.set(
            flash,
            {

                left:
                    echo53CurrentX,

                top:
                    echo53CurrentY

            }
        );


        gsap.to(
            flash,
            {

                scale: 18,

                opacity: 0,

                duration: .8,

                ease:
                    "power3.out",

                onComplete: () => {

                    flash.remove();

                }

            }
        );


        /* =============================================
           MAIN WORD COLLAPSE
        ============================================= */

        gsap.timeline()

            .to(
                echo53Main,
                {

                    scale: .88,

                    duration: .18,

                    ease:
                        "power2.in"

                }
            )

            /* =========================================
               RGB EXPLOSION
            ========================================= */

            .to(
                echo53Red,
                {

                    x: -180,

                    y: -35,

                    rotation:
                        -4,

                    scale: 1.05,

                    opacity: .8,

                    duration: .45,

                    ease:
                        "power3.out"

                },
                "<"
            )

            .to(
                echo53Green,
                {

                    x: 25,

                    y: 70,

                    rotation:
                        2,

                    scale: 1.08,

                    opacity: .65,

                    duration: .45,

                    ease:
                        "power3.out"

                },
                "<"
            )

            .to(
                echo53Blue,
                {

                    x: 180,

                    y: -25,

                    rotation:
                        5,

                    scale: 1.05,

                    opacity: .8,

                    duration: .45,

                    ease:
                        "power3.out"

                },
                "<"
            )

            .to(
                echo53Main,
                {

                    scale: 1.08,

                    y: -20,

                    duration: .3,

                    ease:
                        "power2.out"

                }
            );


        /* =============================================
           FREE FLOATING ECHOES
        ============================================= */

        for (
            let i = 0;
            i < 12;
            i++
        ) {

            const ghost =
                document.createElement("div");

            ghost.className =
                "echo53-trail";

            ghost.textContent =
                "ECHO";


            const colors = [
                "rgba(255,0,50,.55)",
                "rgba(0,255,150,.5)",
                "rgba(0,120,255,.55)"
            ];


            ghost.style.color =
                colors[
                    i % 3
                ];


            echo53Trails.appendChild(
                ghost
            );


            gsap.set(
                ghost,
                {

                    left:
                        echo53CurrentX,

                    top:
                        echo53CurrentY,

                    xPercent: -50,

                    yPercent: -50,

                    opacity: .65,

                    scale:
                        .45 +
                        Math.random() * .5

                }
            );


            const angle =
                Math.random() *
                Math.PI * 2;


            const distance =
                120 +
                Math.random() * 320;


            gsap.to(
                ghost,
                {

                    x:
                        Math.cos(angle) *
                        distance,

                    y:
                        Math.sin(angle) *
                        distance,

                    rotation:
                        (Math.random() - .5) *
                        30,

                    scale:
                        .15,

                    opacity: 0,

                    duration:
                        .8 +
                        Math.random() * .6,

                    ease:
                        "power3.out",

                    onComplete: () => {

                        ghost.remove();

                    }

                }
            );

        }


        /* =============================================
           REBUILD
        ============================================= */

        setTimeout(
            () => {

                gsap.timeline({

                    onComplete: () => {

                        echo53Locked =
                            false;

                    }

                })

                .set(
                    [
                        echo53Red,
                        echo53Green,
                        echo53Blue
                    ],
                    {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        scale: 1,
                        opacity: 1
                    }
                )

                .to(
                    echo53Main,
                    {

                        scale: 1,

                        y: 0,

                        duration: .8,

                        ease:
                            "elastic.out(1,.35)"

                    }
                );

            },
            900
        );

    }
);

/* =========================================================
   SECTION 54 — TYPOGRAPHY TIME RIFT
========================================================= */

const time54Stage =
    document.querySelector(
        ".time54-stage"
    );

const time54Scene =
    document.querySelector(
        "#time54Scene"
    );

const time54Word =
    document.querySelector(
        "#time54Word"
    );

const time54Echo1 =
    document.querySelector(
        "#time54Echo1"
    );

const time54Echo2 =
    document.querySelector(
        "#time54Echo2"
    );

const time54Echo3 =
    document.querySelector(
        "#time54Echo3"
    );

const time54Echo4 =
    document.querySelector(
        "#time54Echo4"
    );

const time54Cursor =
    document.querySelector(
        "#time54Cursor"
    );

const time54Marker =
    document.querySelector(
        "#time54Marker"
    );

const time54Flash =
    document.querySelector(
        "#time54Flash"
    );


/* =========================================================
   STATE
========================================================= */

let time54MouseX = 0;
let time54MouseY = 0;

let time54CurrentX = 0;
let time54CurrentY = 0;

let time54PreviousX = 0;
let time54PreviousY = 0;

let time54VelocityX = 0;
let time54VelocityY = 0;

let time54Speed = 0;

let time54Inside = false;

let time54Locked = false;

let time54Clock = 0;


/* =========================================================
   ENTER
========================================================= */

time54Stage.addEventListener(
    "mouseenter",
    () => {

        time54Inside = true;

        gsap.to(
            time54Cursor,
            {
                opacity: 1,
                scale: 1,
                duration: .3,
                ease: "power3.out"
            }
        );

        gsap.to(
            time54Marker,
            {
                opacity: .65,
                duration: .4
            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

time54Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            time54Stage
                .getBoundingClientRect();

        time54MouseX =
            event.clientX -
            rect.left;

        time54MouseY =
            event.clientY -
            rect.top;


        time54VelocityX =
            time54MouseX -
            time54PreviousX;

        time54VelocityY =
            time54MouseY -
            time54PreviousY;


        time54Speed =
            Math.sqrt(
                time54VelocityX *
                time54VelocityX +
                time54VelocityY *
                time54VelocityY
            );


        time54PreviousX =
            time54MouseX;

        time54PreviousY =
            time54MouseY;

    }
);


/* =========================================================
   LEAVE
========================================================= */

time54Stage.addEventListener(
    "mouseleave",
    () => {

        time54Inside = false;

        gsap.to(
            time54Cursor,
            {
                opacity: 0,
                scale: 0,
                duration: .3
            }
        );

        if (!time54Locked) {

            gsap.to(
                time54Scene,
                {
                    x: 0,
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    duration: .7,
                    ease: "power3.out"
                }
            );

            resetTime54Echoes();

        }

    }
);


/* =========================================================
   RESET ECHOES
========================================================= */

function resetTime54Echoes() {

    gsap.to(
        time54Echo1,
        {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: .16,
            duration: .5,
            ease: "power3.out"
        }
    );

    gsap.to(
        time54Echo2,
        {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: .09,
            duration: .6,
            ease: "power3.out"
        }
    );

    gsap.to(
        time54Echo3,
        {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: .11,
            duration: .5,
            ease: "power3.out"
        }
    );

    gsap.to(
        time54Echo4,
        {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: .055,
            duration: .7,
            ease: "power3.out"
        }
    );

}


/* =========================================================
   MAIN LOOP
========================================================= */

function updateTime54() {
  time54CurrentX += (time54MouseX - time54CurrentX) * 0.12;

  time54CurrentY += (time54MouseY - time54CurrentY) * 0.12;

  /* =============================================
       CURSOR
    ============================================= */

  time54Cursor.style.left = `${time54CurrentX}px`;

  time54Cursor.style.top = `${time54CurrentY}px`;

  if (time54Inside && !time54Locked) {
    const rect = time54Stage.getBoundingClientRect();

    const nx = (time54CurrentX / rect.width) * 2 - 1;

    const ny = (time54CurrentY / rect.height) * 2 - 1;

    /* =========================================
           3D TIME SPACE
        ========================================= */

    gsap.to(time54Scene, {
      x: nx * 18,

      y: ny * 10,

      rotationY: nx * 7,

      rotationX: ny * -4,

      duration: 0.35,

      overwrite: "auto",

      ease: "power3.out",
    });

    /* =========================================
           TIME DISTANCE
        ========================================= */

    const base = 35 + Math.min(time54Speed * 0.8, 120);

    const direction = nx >= 0 ? 1 : -1;

    /* =========================================
           PAST
        ========================================= */

    gsap.to(time54Echo1, {
      x: -base * direction,

      y: ny * 12,

      scale: 1 + time54Speed * 0.001,

      duration: 0.25,

      overwrite: "auto",
    });

    /* =========================================
           DEEP PAST
        ========================================= */

    gsap.to(time54Echo2, {
      x: -base * 1.9 * direction,

      y: ny * 20,

      scale: 1.03,

      duration: 0.35,

      overwrite: "auto",
    });

    /* =========================================
           FUTURE
        ========================================= */

    gsap.to(time54Echo3, {
      x: base * direction,

      y: -ny * 10,

      scale: 1.01,

      duration: 0.28,

      overwrite: "auto",
    });

    /* =========================================
           FAR FUTURE
        ========================================= */

    gsap.to(time54Echo4, {
      x: base * 1.8 * direction,

      y: -ny * 18,

      scale: 1.04,

      duration: 0.4,

      overwrite: "auto",
    });

    /* =========================================
           SPEED = MORE TIME DISTORTION
        ========================================= */

    const blur = Math.min(time54Speed * 0.025, 4);

    time54Echo1.style.filter = `blur(${1 + blur}px)`;

    time54Echo2.style.filter = `blur(${2 + blur * 1.5}px)`;

    time54Echo3.style.filter = `blur(${1.5 + blur}px)`;

    time54Echo4.style.filter = `blur(${3 + blur * 1.5}px)`;

    /* =========================================
           TIME MARKER
        ========================================= */

    gsap.to(time54Marker, {
      x: nx * 100,

      scaleY: 1 + Math.abs(ny) * 1.5,

      duration: 0.3,

      overwrite: "auto",
    });
  }

  /* =============================================
       DECAY
    ============================================= */

  time54Speed *= 0.88;

  time54Clock += 0.016;

  requestAnimationFrame(updateTime54);
}

updateTime54();

/* =========================================================
   CLICK — FREEZE TIME
========================================================= */

time54Stage.addEventListener("click", () => {
  if (time54Locked) return;

  time54Locked = true;

  /* =============================================
           FLASH
        ============================================= */

  gsap.set(time54Flash, {
    left: time54CurrentX,

    top: time54CurrentY,

    scale: 0,

    opacity: 1,
  });

  gsap.to(time54Flash, {
    scale: 12,

    opacity: 0,

    duration: 0.7,

    ease: "power3.out",
  });

  /* =============================================
           FREEZE
        ============================================= */

  gsap
    .timeline()

    .to(time54Word, {
      scale: 0.92,

      y: 10,

      duration: 0.2,

      ease: "power2.in",
    })

    .to(
      time54Echo1,
      {
        x: -180,
        y: 40,
        rotation: -5,
        scale: 1.08,
        opacity: 0.4,

        duration: 0.45,

        ease: "power3.out",
      },
      "<",
    )

    .to(
      time54Echo2,
      {
        x: -330,
        y: -30,
        rotation: -9,
        scale: 1.16,
        opacity: 0.25,

        duration: 0.5,

        ease: "power3.out",
      },
      "<",
    )

    .to(
      time54Echo3,
      {
        x: 190,
        y: -45,
        rotation: 5,
        scale: 1.08,
        opacity: 0.3,

        duration: 0.45,

        ease: "power3.out",
      },
      "<",
    )

    .to(
      time54Echo4,
      {
        x: 350,
        y: 30,
        rotation: 10,
        scale: 1.18,
        opacity: 0.18,

        duration: 0.55,

        ease: "power3.out",
      },
      "<",
    );

  /* =============================================
           HOLD
        ============================================= */

  setTimeout(() => {
    /* =====================================
                   REWIND
                ===================================== */

    gsap
      .timeline()

      .to([time54Echo1, time54Echo2, time54Echo3, time54Echo4], {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.85,

        duration: 0.35,

        stagger: 0.035,

        ease: "power4.in",
      })

      .to(time54Word, {
        scale: 1.05,

        y: -10,

        duration: 0.3,

        ease: "power2.out",
      })

      /* =================================
                       SNAP BACK
                    ================================= */

      .to([time54Echo1, time54Echo2, time54Echo3, time54Echo4], {
        scale: 1,

        duration: 0.8,

        stagger: 0.05,

        ease: "elastic.out(1,.35)",
      })

      .to(
        time54Word,
        {
          scale: 1,

          y: 0,

          duration: 0.8,

          ease: "elastic.out(1,.35)",
        },
        "<",
      )

      .add(() => {
        resetTime54Echoes();

        time54Locked = false;
      });
  }, 850);
});

/* =========================================================
   SECTION 55 — TYPOGRAPHY BLACK HOLE
========================================================= */

const void55Stage =
    document.querySelector(
        "#void55Stage"
    );

const void55Scene =
    document.querySelector(
        "#void55Scene"
    );

const void55Word =
    document.querySelector(
        "#void55Word"
    );

const void55Core =
    document.querySelector(
        "#void55Core"
    );

const void55Particles =
    document.querySelector(
        "#void55Particles"
    );

const void55Cursor =
    document.querySelector(
        "#void55Cursor"
    );

const void55Shockwave =
    document.querySelector(
        "#void55Shockwave"
    );

const void55Rings =
    document.querySelectorAll(
        ".void55-ring"
    );


/* =========================================================
   STATE
========================================================= */

let void55MouseX = 0;
let void55MouseY = 0;

let void55CurrentX = 0;
let void55CurrentY = 0;

let void55PreviousX = 0;
let void55PreviousY = 0;

let void55Speed = 0;

let void55Inside = false;

let void55Locked = false;

let void55Time = 0;

/* =========================================================
   CREATE STAR FIELD
========================================================= */

for (
    let i = 0;
    i < 140;
    i++
) {

    const star =
        document.createElement("div");

    star.className =
        "void55-star";


    star.style.left =
        Math.random() * 100 + "%";


    star.style.top =
        Math.random() * 100 + "%";


    const size =
        Math.random() *
        2.5 +
        .5;


    star.style.width =
        size + "px";


    star.style.height =
        size + "px";


    star.style.opacity =
        Math.random() * .7 +
        .15;


    void55Particles
        .parentElement
        .appendChild(star);

}


/* =========================================================
   CREATE GRAVITY PARTICLES
========================================================= */

const void55ParticleData = [];

for (
    let i = 0;
    i < 90;
    i++
) {

    const particle =
        document.createElement("div");

    particle.className =
        "void55-particle";


    void55Particles.appendChild(
        particle
    );


    const angle =
        Math.random() *
        Math.PI *
        2;


    const radius =
        130 +
        Math.random() *
        380;


    void55ParticleData.push({

        element: particle,

        angle: angle,

        radius: radius,

        speed:
            .0004 +
            Math.random() *
            .001,

        offset:
            Math.random() *
            Math.PI *
            2

    });

}

/* =========================================================
   MOUSE ENTER
========================================================= */

void55Stage.addEventListener(
    "mouseenter",
    () => {

        void55Inside = true;


        gsap.to(
            void55Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: .3,

                ease:
                    "power3.out"

            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

void55Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            void55Stage
                .getBoundingClientRect();


        void55MouseX =
            event.clientX -
            rect.left;


        void55MouseY =
            event.clientY -
            rect.top;


        const dx =
            void55MouseX -
            void55PreviousX;


        const dy =
            void55MouseY -
            void55PreviousY;


        void55Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        void55PreviousX =
            void55MouseX;


        void55PreviousY =
            void55MouseY;

    }
);


/* =========================================================
   MOUSE LEAVE
========================================================= */

void55Stage.addEventListener(
    "mouseleave",
    () => {

        void55Inside = false;


        gsap.to(
            void55Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: .3

            }
        );


        if (!void55Locked) {

            gsap.to(
                void55Word,
                {

                    x: 0,
                    y: 0,

                    rotationX: 0,
                    rotationY: 0,

                    scaleX: 1,
                    scaleY: 1,

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

function updateVoid55() {
  void55CurrentX += (void55MouseX - void55CurrentX) * 0.12;

  void55CurrentY += (void55MouseY - void55CurrentY) * 0.12;

  void55Time += 0.016;

  /* =============================================
       CURSOR
    ============================================= */

  void55Cursor.style.left = void55CurrentX + "px";

  void55Cursor.style.top = void55CurrentY + "px";

  /* =============================================
       GRAVITY PARTICLES
    ============================================= */

  void55ParticleData.forEach((particle) => {
    particle.angle += particle.speed;

    const rect = void55Stage.getBoundingClientRect();

    const centerX = rect.width / 2;

    const centerY = rect.height / 2;

    let radius = particle.radius;

    /* Cursor adds gravity */

    if (void55Inside) {
      const dx = void55CurrentX - centerX;

      const dy = void55CurrentY - centerY;

      const cursorDistance = Math.sqrt(dx * dx + dy * dy);

      const influence = Math.max(0, 1 - cursorDistance / 500);

      radius -= influence * 80;
    }

    const x = centerX + Math.cos(particle.angle + particle.offset) * radius;

    const y =
      centerY + Math.sin(particle.angle + particle.offset) * radius * 0.32;

    particle.element.style.left = x + "px";

    particle.element.style.top = y + "px";
  });

  /* =============================================
       MOUSE GRAVITY
    ============================================= */

  if (void55Inside && !void55Locked) {
    const rect = void55Stage.getBoundingClientRect();

    const nx = (void55CurrentX / rect.width) * 2 - 1;

    const ny = (void55CurrentY / rect.height) * 2 - 1;

    /* =========================================
           DISTANCE FROM CENTER
        ========================================= */

    const centerX = rect.width / 2;

    const centerY = rect.height / 2;

    const dx = void55CurrentX - centerX;

    const dy = void55CurrentY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const influence = Math.max(0, 1 - distance / 650);

    /* =========================================
           WORD PULL
        ========================================= */

    const pullX = nx * influence * 85;

    const pullY = ny * influence * 45;

    const squeeze = 1 + influence * 0.12 + Math.min(void55Speed * 0.002, 0.12);

    gsap.to(void55Word, {
      x: pullX,

      y: pullY,

      rotationY: nx * influence * 12,

      rotationX: ny * influence * -7,

      scaleX: squeeze,

      scaleY: 1 - influence * 0.08,

      duration: 0.3,

      overwrite: "auto",

      ease: "power3.out",
    });

    /* =========================================
           CORE REACTS
        ========================================= */

    gsap.to(void55Core, {
      scale: 1 + influence * 0.22,

      duration: 0.4,

      overwrite: "auto",
    });

    /* =========================================
           RINGS REACT
        ========================================= */

    void55Rings.forEach((ring, index) => {
      gsap.to(ring, {
        rotation: index * 18 + nx * 12,

        x: nx * influence * 20,

        y: ny * influence * 10,

        duration: 0.6 + index * 0.05,

        overwrite: "auto",

        ease: "power3.out",
      });
    });
  }

  /* =============================================
       SPEED DECAY
    ============================================= */

  void55Speed *= 0.9;

  requestAnimationFrame(updateVoid55);
}

updateVoid55();

/* =========================================================
   CLICK — COLLAPSE INTO SINGULARITY
========================================================= */

void55Stage.addEventListener("click", () => {
  if (void55Locked) return;

  void55Locked = true;

  /* =============================================
           SHOCKWAVE
        ============================================= */

  gsap.set(void55Shockwave, {
    left: void55CurrentX,

    top: void55CurrentY,

    scale: 0,

    opacity: 0.9,
  });

  gsap.to(void55Shockwave, {
    scale: 20,

    opacity: 0,

    duration: 1,

    ease: "power3.out",
  });

  /* =============================================
           CORE EXPANDS
        ============================================= */

  gsap.to(void55Core, {
    scale: 1.8,

    duration: 0.3,

    ease: "power2.in",
  });

  /* =============================================
           WORD COLLAPSE
        ============================================= */

  gsap
    .timeline()

    .to(void55Word, {
      scaleX: 0.5,

      scaleY: 0.5,

      rotation: 8,

      filter: "blur(3px)",

      duration: 0.25,

      ease: "power2.in",
    })

    .to(void55Word, {
      x: 0,

      y: 0,

      scaleX: 0.05,

      scaleY: 0.05,

      rotation: 180,

      opacity: 0,

      filter: "blur(12px)",

      duration: 0.65,

      ease: "power4.in",
    });

  /* =============================================
           PARTICLES GET SUCKED IN
        ============================================= */

  void55ParticleData.forEach((particle, index) => {
    const rect = void55Stage.getBoundingClientRect();

    const centerX = rect.width / 2;

    const centerY = rect.height / 2;

    gsap.to(particle.element, {
      left: centerX,

      top: centerY,

      scale: 0.1,

      opacity: 0,

      duration: 0.7 + Math.random() * 0.5,

      delay: Math.random() * 0.15,

      ease: "power4.in",
    });
  });

  /* =============================================
           RINGS COLLAPSE
        ============================================= */

  gsap.to(void55Rings, {
    scale: 0.3,

    rotation: "+=180",

    opacity: 0,

    duration: 0.8,

    stagger: 0.05,

    ease: "power3.in",
  });

  /* =============================================
           REBIRTH
        ============================================= */

  setTimeout(() => {
    /* Reset particles */

    void55ParticleData.forEach((particle) => {
      const rect = void55Stage.getBoundingClientRect();

      const centerX = rect.width / 2;

      const centerY = rect.height / 2;

      const angle = Math.random() * Math.PI * 2;

      const radius = 100 + Math.random() * 400;

      particle.angle = angle;

      particle.radius = radius;

      gsap.set(particle.element, {
        left: centerX + Math.cos(angle) * radius,

        top: centerY + Math.sin(angle) * radius * 0.32,

        scale: 1,

        opacity: 0.7,
      });
    });

    /* Restore rings */

    gsap.set(void55Rings, {
      scale: 1,

      opacity: 1,
    });

    /* Restore core */

    gsap.to(void55Core, {
      scale: 1,

      duration: 0.7,

      ease: "elastic.out(1,.4)",
    });

    /* Restore typography */

    gsap.to(void55Word, {
      x: 0,

      y: 0,

      scaleX: 1,

      scaleY: 1,

      rotation: 0,

      rotationX: 0,

      rotationY: 0,

      opacity: 1,

      filter: "blur(0px)",

      duration: 1.1,

      ease: "elastic.out(1,.35)",

      onComplete: () => {
        void55Locked = false;
      },
    });
  }, 1200);
});
/* =========================================================
   SECTION 56 — TYPOGRAPHY EVENT HORIZON
========================================================= */

const horizon56Stage =
    document.querySelector(
        "#horizon56Stage"
    );

const horizon56Scene =
    document.querySelector(
        "#horizon56Scene"
    );

const horizon56Word =
    document.querySelector(
        "#horizon56Word"
    );

const horizon56Line =
    document.querySelector(
        "#horizon56Line"
    );

const horizon56Glow =
    document.querySelector(
        "#horizon56Glow"
    );

const horizon56Mask =
    document.querySelector(
        "#horizon56Mask"
    );

const horizon56Core =
    document.querySelector(
        "#horizon56Core"
    );

const horizon56Cursor =
    document.querySelector(
        "#horizon56Cursor"
    );

const horizon56Shockwave =
    document.querySelector(
        "#horizon56Shockwave"
    );

const horizon56Particles =
    document.querySelector(
        "#horizon56Particles"
    );


/* =========================================================
   STATE
========================================================= */

let horizon56MouseX = 0;
let horizon56MouseY = 0;

let horizon56CurrentX = 0;
let horizon56CurrentY = 0;

let horizon56PreviousX = 0;
let horizon56PreviousY = 0;

let horizon56Speed = 0;

let horizon56Inside = false;

let horizon56Locked = false;

let horizon56Time = 0;


/* =========================================================
   CREATE PARTICLES
========================================================= */

const horizon56ParticleData = [];

for (
    let i = 0;
    i < 100;
    i++
) {

    const particle =
        document.createElement(
            "div"
        );

    particle.className =
        "horizon56-particle";

    horizon56Particles.appendChild(
        particle
    );


    const x =
        Math.random() * 100;

    const y =
        Math.random() * 100;


    const depth =
        Math.random();


    particle.style.left =
        x + "%";

    particle.style.top =
        y + "%";


    particle.style.opacity =
        .15 +
        depth * .65;


    horizon56ParticleData.push({

        element: particle,

        x: x,

        y: y,

        depth: depth,

        speed:
            .05 +
            Math.random() * .2

    });

}
/* =========================================================
   MOUSE ENTER
========================================================= */

horizon56Stage.addEventListener(
    "mouseenter",
    () => {

        horizon56Inside = true;


        gsap.to(
            horizon56Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: .3,

                ease:
                    "power3.out"

            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

horizon56Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            horizon56Stage
                .getBoundingClientRect();


        horizon56MouseX =
            event.clientX -
            rect.left;


        horizon56MouseY =
            event.clientY -
            rect.top;


        const dx =
            horizon56MouseX -
            horizon56PreviousX;


        const dy =
            horizon56MouseY -
            horizon56PreviousY;


        horizon56Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        horizon56PreviousX =
            horizon56MouseX;


        horizon56PreviousY =
            horizon56MouseY;

    }
);


/* =========================================================
   MOUSE LEAVE
========================================================= */

horizon56Stage.addEventListener(
    "mouseleave",
    () => {

        horizon56Inside = false;


        gsap.to(
            horizon56Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: .3

            }
        );


        if (!horizon56Locked) {

            gsap.to(
                horizon56Scene,
                {

                    rotationX: 0,

                    rotationY: 0,

                    x: 0,

                    y: 0,

                    duration: .7,

                    ease:
                        "power3.out"

                }
            );


            gsap.to(
                horizon56Line,
                {

                    scaleX: 1,

                    duration: .5

                }
            );

        }

    }
);

/* =========================================================
   MAIN LOOP
========================================================= */

function updateHorizon56() {

    horizon56CurrentX +=
        (
            horizon56MouseX -
            horizon56CurrentX
        ) * .12;


    horizon56CurrentY +=
        (
            horizon56MouseY -
            horizon56CurrentY
        ) * .12;


    horizon56Time += .016;


    /* =============================================
       CURSOR
    ============================================= */

    horizon56Cursor.style.left =
        horizon56CurrentX + "px";

    horizon56Cursor.style.top =
        horizon56CurrentY + "px";


    /* =============================================
       AMBIENT PARTICLES
    ============================================= */

    horizon56ParticleData.forEach(
        (particle, index) => {

            particle.x +=
                particle.speed *
                .01;


            if (
                particle.x > 100
            ) {

                particle.x = 0;

            }


            let offsetX = 0;
            let offsetY = 0;


            if (horizon56Inside) {

                const dx =
                    horizon56CurrentX -
                    window.innerWidth / 2;


                const dy =
                    horizon56CurrentY -
                    window.innerHeight / 2;


                offsetX =
                    dx *
                    particle.depth *
                    .015;


                offsetY =
                    dy *
                    particle.depth *
                    .01;

            }


            particle.element.style.left =
                `calc(${particle.x}% + ${offsetX}px)`;


            particle.element.style.top =
                `calc(${particle.y}% + ${offsetY}px)`;

        }
    );


    /* =============================================
       MOUSE INTERACTION
    ============================================= */

    if (
        horizon56Inside &&
        !horizon56Locked
    ) {

        const rect =
            horizon56Stage
                .getBoundingClientRect();


        const nx =
            (
                horizon56CurrentX /
                rect.width
            ) * 2 - 1;


        const ny =
            (
                horizon56CurrentY /
                rect.height
            ) * 2 - 1;


        /* =========================================
           HORIZON POSITION
        ========================================= */

        const horizonPosition =
            nx * 35;


        gsap.to(
            horizon56Line,
            {

                x:
                    horizonPosition,

                scaleX:
                    1 +
                    Math.min(
                        horizon56Speed * .004,
                        .35
                    ),

                duration: .3,

                overwrite:
                    "auto",

                ease:
                    "power3.out"

            }
        );


        /* =========================================
           3D SPACE
        ========================================= */

        gsap.to(
            horizon56Scene,
            {

                rotationY:
                    nx * 8,

                rotationX:
                    ny * -4,

                x:
                    nx * 18,

                y:
                    ny * 8,

                duration: .4,

                overwrite:
                    "auto",

                ease:
                    "power3.out"

            }
        );


        /* =========================================
           TYPOGRAPHY GRAVITY
        ========================================= */

        const distortion =
            Math.min(
                horizon56Speed * .01,
                .18
            );


        gsap.to(
            horizon56Word,
            {

                scaleX:
                    1 +
                    distortion,

                scaleY:
                    1 -
                    distortion * .5,

                skewX:
                    nx *
                    distortion *
                    12,

                duration: .25,

                overwrite:
                    "auto",

                ease:
                    "power3.out"

            }
        );


        /* =========================================
           MASK MOVEMENT
        ========================================= */

        gsap.to(
            horizon56Mask,
            {

                y:
                    ny * 25,

                opacity:
                    .7 +
                    Math.abs(nx) * .2,

                duration: .35,

                overwrite:
                    "auto"

            }
        );


        /* =========================================
           CORE RESPONSE
        ========================================= */

        const centerDistance =
            Math.abs(
                horizon56CurrentX -
                rect.width / 2
            );


        const coreInfluence =
            Math.max(
                0,
                1 -
                centerDistance / 500
            );


        gsap.to(
            horizon56Core,
            {

                scale:
                    .7 +
                    coreInfluence * .9,

                opacity:
                    .5 +
                    coreInfluence * .4,

                duration: .35,

                overwrite:
                    "auto"

            }
        );


        gsap.to(
            horizon56Glow,
            {

                x:
                    nx * 70,

                y:
                    ny * 20,

                scale:
                    1 +
                    coreInfluence * .3,

                duration: .5,

                overwrite:
                    "auto"

            }
        );

    }
 /* =============================================
       SPEED DECAY
    ============================================= */

    horizon56Speed *= .9;


    requestAnimationFrame(
        updateHorizon56
    );

}


updateHorizon56();


/* =========================================================
   CLICK — CROSS THE EVENT HORIZON
========================================================= */

horizon56Stage.addEventListener("click", () => {
  if (horizon56Locked) return;

  horizon56Locked = true;

  /* =============================================
           SHOCKWAVE
        ============================================= */

  gsap.set(horizon56Shockwave, {
    left: horizon56CurrentX,

    top: horizon56CurrentY,

    scale: 0,

    opacity: 0.9,
  });

  gsap.to(horizon56Shockwave, {
    scale: 18,

    opacity: 0,

    duration: 0.9,

    ease: "power3.out",
  });

  /* =============================================
           HORIZON FLASH
        ============================================= */

  gsap.to(horizon56Line, {
    height: 8,

    boxShadow: "0 0 30px rgba(255,255,255,.9)",

    duration: 0.12,

    yoyo: true,

    repeat: 3,

    ease: "power2.inOut",
  });

  /* =============================================
           WORD SPLITS
        ============================================= */

  gsap
    .timeline()

    .to(horizon56Word, {
      scaleX: 1.08,

      filter: "blur(1px)",

      duration: 0.2,

      ease: "power2.out",
    })

    .to(horizon56Word, {
      x: -260,

      rotationY: -18,

      scaleX: 0.8,

      opacity: 0.3,

      filter: "blur(5px)",

      duration: 0.55,

      ease: "power3.in",
    });

  /* =============================================
           LINE TEARS OPEN
        ============================================= */

  gsap.to(horizon56Line, {
    scaleX: 0.1,

    opacity: 0,

    duration: 0.5,

    ease: "power4.in",
  });

  /* =============================================
           CORE COLLAPSE
        ============================================= */

  gsap.to(horizon56Core, {
    scale: 4,

    opacity: 0,

    duration: 0.55,

    ease: "power3.in",
  });

  /* =============================================
           PARTICLES FALL INTO HORIZON
        ============================================= */

  horizon56ParticleData.forEach((particle, index) => {
    const rect = horizon56Stage.getBoundingClientRect();

    gsap.to(particle.element, {
      x: rect.width / 2 - (particle.x * rect.width) / 100,

      y: rect.height / 2 - (particle.y * rect.height) / 100,

      scale: 0.1,

      opacity: 0,

      duration: 0.6 + Math.random() * 0.5,

      delay: Math.random() * 0.2,

      ease: "power4.in",
    });
  });

  /* =============================================
           RECONSTRUCT
        ============================================= */

  setTimeout(() => {
    gsap.set(horizon56Line, {
      scaleX: 0,

      opacity: 0,

      height: 1,

      x: 0,
    });

    gsap.set(horizon56Core, {
      scale: 0,

      opacity: 0,
    });

    gsap.set(horizon56Word, {
      x: 260,

      rotationY: 18,

      scaleX: 0.8,

      opacity: 0.2,

      filter: "blur(5px)",
    });

    /* =====================================
                   PARTICLES RESET
                ===================================== */

    horizon56ParticleData.forEach((particle) => {
      gsap.set(particle.element, {
        x: 0,

        y: 0,

        scale: 1,

        opacity: 0.15 + particle.depth * 0.65,
      });
    });

    /* =====================================
                   WORD RETURNS
                ===================================== */

    gsap
      .timeline({
        onComplete: () => {
          horizon56Locked = false;
        },
      })

      .to(horizon56Core, {
        scale: 1,

        opacity: 0.65,

        duration: 0.6,

        ease: "power3.out",
      })

      .to(
        horizon56Line,
        {
          scaleX: 1,

          opacity: 1,

          duration: 0.6,

          ease: "power3.out",
        },
        "-=.35",
      )

      .to(
        horizon56Word,
        {
          x: 0,

          rotationY: 0,

          scaleX: 1,

          opacity: 1,

          filter: "blur(0px)",

          duration: 1.1,

          ease: "elastic.out(1,.35)",
        },
        "-=.45",
      )

      .to(
        horizon56Glow,
        {
          scale: 1,

          x: 0,

          y: 0,

          opacity: 0.55,

          duration: 0.8,

          ease: "power3.out",
        },
        "-=.8",
      );
  }, 1050);
});
/* =========================================================
   SECTION 57 — TYPOGRAPHY GRAVITY LENS
========================================================= */

const focus57Stage =
    document.querySelector(
        "#focus57Stage"
    );

const focus57Scene =
    document.querySelector(
        "#focus57Scene"
    );

const focus57Main =
    document.querySelector(
        "#focus57Main"
    );

const focus57LensText =
    document.querySelector(
        "#focus57LensText"
    );

const focus57Lens =
    document.querySelector(
        "#focus57Lens"
    );

const focus57Cursor =
    document.querySelector(
        "#focus57Cursor"
    );

const focus57Expansion =
    document.querySelector(
        "#focus57Expansion"
    );


/* =========================================================
   STATE
========================================================= */

let focus57MouseX = 0;
let focus57MouseY = 0;

let focus57CurrentX = 0;
let focus57CurrentY = 0;

let focus57PreviousX = 0;
let focus57PreviousY = 0;

let focus57Speed = 0;

let focus57Inside = false;

let focus57Locked = false;


/* =========================================================
   ENTER
========================================================= */

focus57Stage.addEventListener(
    "mouseenter",
    () => {

        focus57Inside = true;

        gsap.to(
            focus57Lens,
            {

                opacity: 1,

                scale: 1,

                duration: .45,

                ease:
                    "power3.out"

            }
        );

        gsap.to(
            focus57Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: .3

            }
        );

    }
);


/* =========================================================
   MOVE
========================================================= */

focus57Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            focus57Stage
                .getBoundingClientRect();


        focus57MouseX =
            event.clientX -
            rect.left;


        focus57MouseY =
            event.clientY -
            rect.top;


        const dx =
            focus57MouseX -
            focus57PreviousX;


        const dy =
            focus57MouseY -
            focus57PreviousY;


        focus57Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        focus57PreviousX =
            focus57MouseX;


        focus57PreviousY =
            focus57MouseY;

    }
);
/* =========================================================
   LEAVE
========================================================= */

focus57Stage.addEventListener(
    "mouseleave",
    () => {

        focus57Inside = false;


        gsap.to(
            focus57Lens,
            {

                opacity: 0,

                scale: .75,

                duration: .35

            }
        );


        gsap.to(
            focus57Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: .3

            }
        );


        if (!focus57Locked) {

            gsap.to(
                focus57Scene,
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


            gsap.to(
                focus57Main,
                {

                    scale: 1,

                    duration: .5

                }
            );

        }

    }
);


/* =========================================================
   MAIN LOOP
========================================================= */

function updateFocus57() {
  focus57CurrentX += (focus57MouseX - focus57CurrentX) * 0.14;

  focus57CurrentY += (focus57MouseY - focus57CurrentY) * 0.14;

  /* =============================================
       CURSOR
    ============================================= */

  focus57Cursor.style.left = focus57CurrentX + "px";

  focus57Cursor.style.top = focus57CurrentY + "px";

  if (focus57Inside && !focus57Locked) {
    const rect = focus57Stage.getBoundingClientRect();

    const nx = (focus57CurrentX / rect.width) * 2 - 1;

    const ny = (focus57CurrentY / rect.height) * 2 - 1;

    /* =========================================
           LENS POSITION
        ========================================= */

    gsap.to(focus57Lens, {
      left: focus57CurrentX,

      top: focus57CurrentY,

      duration: 0.18,

      overwrite: "auto",

      ease: "power2.out",
    });

    /* =========================================
           3D TYPOGRAPHY
        ========================================= */

    gsap.to(focus57Scene, {
      rotationY: nx * 6,

      rotationX: ny * -4,

      x: nx * 15,

      y: ny * 8,

      duration: 0.35,

      overwrite: "auto",

      ease: "power3.out",
    });

    /* =========================================
           LENS MAGNIFICATION
        ========================================= */

    const lensScale = 1.65 + Math.min(focus57Speed * 0.006, 0.4);

    gsap.to(focus57LensText, {
      scale: lensScale,

      duration: 0.3,

      overwrite: "auto",
    });

    /* =========================================
           CALCULATE LENS POSITION
        ========================================= */

    const centerX = rect.width / 2;

    const centerY = rect.height / 2;

    const lensX = focus57CurrentX - centerX;

    const lensY = focus57CurrentY - centerY;

    /* =========================================
           CLIP CIRCLE
        ========================================= */

    gsap.set(focus57LensText, {
      clipPath: `circle(
                        120px at
                        calc(50% + ${lensX}px)
                        calc(50% + ${lensY}px)
                    )`,
    });

    /* =========================================
           MAIN TEXT RESPONSE
        ========================================= */

    const distance = Math.sqrt(lensX * lensX + lensY * lensY);

    const focus = Math.max(0, 1 - distance / 600);

    gsap.to(focus57Main, {
      scale: 1 + focus * 0.035,

      filter: `blur(
                        ${Math.max(0, distance / 500 - 1)}px
                    )`,

      duration: 0.3,

      overwrite: "auto",
    });

    /* =========================================
           LENS ROTATION
        ========================================= */

    gsap.to(focus57Lens, {
      rotation: nx * 8,

      duration: 0.5,

      overwrite: "auto",
    });
  }

  /* =============================================
       SPEED DECAY
    ============================================= */

  focus57Speed *= 0.9;

  requestAnimationFrame(updateFocus57);
}

updateFocus57();

/* =========================================================
   CLICK — FULL FOCUS
========================================================= */

focus57Stage.addEventListener("click", () => {
  if (focus57Locked) return;

  focus57Locked = true;

  /* =============================================
           EXPANDING LENS
        ============================================= */

  gsap.set(focus57Expansion, {
    left: focus57CurrentX,

    top: focus57CurrentY,

    scale: 0,

    opacity: 0.9,
  });

  gsap.to(focus57Expansion, {
    scale: 35,

    opacity: 0,

    duration: 1,

    ease: "power3.out",
  });

  /* =============================================
           LENS EXPANDS
        ============================================= */

  gsap.to(focus57Lens, {
    scale: 3,

    opacity: 0.9,

    duration: 0.65,

    ease: "power3.inOut",
  });

  /* =============================================
           WORD BECOMES EXTREMELY SHARP
        ============================================= */

  gsap
    .timeline()

    .to(focus57Main, {
      scale: 1.12,

      letterSpacing: "-.07em",

      filter: "blur(0px)",

      duration: 0.4,

      ease: "power3.out",
    })

    .to(
      focus57LensText,
      {
        scale: 2.3,

        duration: 0.5,

        ease: "power3.out",
      },
      "<",
    );

  /* =============================================
           PAUSE
        ============================================= */

  setTimeout(() => {
    /* =====================================
                   CONTRACT
                ===================================== */

    gsap.to(focus57Lens, {
      scale: 0.75,

      opacity: 0,

      duration: 0.7,

      ease: "power3.inOut",
    });

    gsap.to(focus57Main, {
      scale: 1,

      letterSpacing: "-.105em",

      duration: 0.8,

      ease: "elastic.out(1,.35)",
    });

    gsap.to(focus57LensText, {
      scale: 1.8,

      duration: 0.7,

      ease: "power3.out",

      onComplete: () => {
        focus57Locked = false;
      },
    });
  }, 850);
});

/* =========================================================
   SECTION 58 — TYPOGRAPHY WARP
========================================================= */

const warp58Stage =
    document.querySelector(
        "#warp58Stage"
    );

const warp58Scene =
    document.querySelector(
        "#warp58Scene"
    );

const warp58Word =
    document.querySelector(
        "#warp58Word"
    );

const warp58Trail1 =
    document.querySelector(
        "#warp58Trail1"
    );

const warp58Trail2 =
    document.querySelector(
        "#warp58Trail2"
    );

const warp58Grid =
    document.querySelector(
        "#warp58Grid"
    );

const warp58Streak =
    document.querySelector(
        "#warp58Streak"
    );

const warp58Cursor =
    document.querySelector(
        "#warp58Cursor"
    );

const warp58Tunnel =
    document.querySelector(
        "#warp58Tunnel"
    );

const warp58Flash =
    document.querySelector(
        "#warp58Flash"
    );


/* =========================================================
   STATE
========================================================= */

let warp58MouseX = 0;
let warp58MouseY = 0;

let warp58CurrentX = 0;
let warp58CurrentY = 0;

let warp58PreviousX = 0;
let warp58PreviousY = 0;

let warp58Speed = 0;

let warp58Inside = false;

let warp58Locked = false;


/* =========================================================
   MOUSE ENTER
========================================================= */

warp58Stage.addEventListener(
    "mouseenter",
    () => {

        warp58Inside = true;

        gsap.to(
            warp58Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: .3,

                ease:
                    "power3.out"

            }
        );

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

warp58Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            warp58Stage
                .getBoundingClientRect();


        warp58MouseX =
            event.clientX -
            rect.left;


        warp58MouseY =
            event.clientY -
            rect.top;


        const dx =
            warp58MouseX -
            warp58PreviousX;


        const dy =
            warp58MouseY -
            warp58PreviousY;


        warp58Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        warp58PreviousX =
            warp58MouseX;


        warp58PreviousY =
            warp58MouseY;

    }
);

/* =========================================================
   MOUSE LEAVE
========================================================= */

warp58Stage.addEventListener(
    "mouseleave",
    () => {

        warp58Inside = false;


        gsap.to(
            warp58Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: .3

            }
        );


        if (!warp58Locked) {

            gsap.to(
                warp58Scene,
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


            gsap.to(
                warp58Word,
                {

                    scaleX: 1,

                    scaleY: 1,

                    skewX: 0,

                    duration: .5,

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

function updateWarp58() {
  warp58CurrentX += (warp58MouseX - warp58CurrentX) * 0.12;

  warp58CurrentY += (warp58MouseY - warp58CurrentY) * 0.12;

  /* =============================================
       CURSOR
    ============================================= */

  warp58Cursor.style.left = warp58CurrentX + "px";

  warp58Cursor.style.top = warp58CurrentY + "px";

  if (warp58Inside && !warp58Locked) {
    const rect = warp58Stage.getBoundingClientRect();

    const nx = (warp58CurrentX / rect.width) * 2 - 1;

    const ny = (warp58CurrentY / rect.height) * 2 - 1;

    /* =========================================
           DISTANCE FROM CENTER
        ========================================= */

    const centerX = rect.width / 2;

    const centerY = rect.height / 2;

    const dx = warp58CurrentX - centerX;

    const dy = warp58CurrentY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const influence = Math.max(0, 1 - distance / 700);

    /* =========================================
           WARP STRENGTH
        ========================================= */

    const speedWarp = Math.min(warp58Speed * 0.012, 0.4);

    const warp = influence * (0.15 + speedWarp);

    /* =========================================
           MAIN TEXT
        ========================================= */

    gsap.to(warp58Word, {
      x: nx * influence * 80,

      y: ny * influence * 35,

      rotationY: nx * influence * 18,

      rotationX: ny * influence * -9,

      skewX: nx * warp * 22,

      scaleX: 1 + warp,

      scaleY: 1 - warp * 0.35,

      duration: 0.3,

      overwrite: "auto",

      ease: "power3.out",
    });

    /* =========================================
           TRAIL 1
        ========================================= */

    gsap.to(warp58Trail1, {
      x: nx * influence * -35,

      y: ny * influence * -15,

      scaleX: 1 + warp * 0.7,

      skewX: nx * warp * -12,

      opacity: 0.2 + warp,

      duration: 0.35,

      overwrite: "auto",
    });

    /* =========================================
           TRAIL 2
        ========================================= */

    gsap.to(warp58Trail2, {
      x: nx * influence * -70,

      y: ny * influence * -28,

      scaleX: 1 + warp * 1.2,

      skewX: nx * warp * -18,

      opacity: 0.08 + warp * 0.4,

      duration: 0.5,

      overwrite: "auto",
    });

    /* =========================================
           GRID BENDING
        ========================================= */

    gsap.to(warp58Grid, {
      x: nx * 80,

      y: ny * 25,

      rotationZ: nx * 2,

      scale: 1.2 + influence * 0.12,

      duration: 0.6,

      overwrite: "auto",

      ease: "power3.out",
    });

    /* =========================================
           SPEED STREAK
        ========================================= */

    if (warp58Speed > 8) {
      gsap.to(warp58Streak, {
        width: Math.min(warp58Speed * 8, 700),

        opacity: Math.min(warp58Speed * 0.025, 0.65),

        rotation: (Math.atan2(dy, dx) * 180) / Math.PI,

        duration: 0.15,

        overwrite: "auto",
      });
    } else {
      gsap.to(warp58Streak, {
        width: 0,

        opacity: 0,

        duration: 0.3,
      });
    }
  }

  /* =============================================
       SPEED DECAY
    ============================================= */

  warp58Speed *= 0.9;

  requestAnimationFrame(updateWarp58);
}

updateWarp58();

/* =========================================================
   CLICK — ENTER THE WARP TUNNEL
========================================================= */

warp58Stage.addEventListener(
    "click",
    () => {

        if (warp58Locked)
            return;


        warp58Locked = true;


        /* =============================================
           TUNNEL
        ============================================= */

        gsap.set(
            warp58Tunnel,
            {

                left:
                    warp58CurrentX,

                top:
                    warp58CurrentY,

                scale: 0,

                opacity: .9

            }
        );


        gsap.to(
            warp58Tunnel,
            {

                scale: 30,

                opacity: 0,

                duration: 1.1,

                ease:
                    "power4.in"

            }
        );


        /* =============================================
           FLASH
        ============================================= */

        gsap.timeline()

            .to(
                warp58Flash,
                {

                    opacity: .15,

                    duration: .08

                }
            )

            .to(
                warp58Flash,
                {

                    opacity: 0,

                    duration: .35

                }
            );


        /* =============================================
           WORD GETS PULLED FORWARD
        ============================================= */

        gsap.timeline()

            .to(
                warp58Word,
                {

                    scaleX: 1.4,

                    scaleY: .7,

                    filter:
                        "blur(3px)",

                    duration: .2,

                    ease:
                        "power2.in"

                }
            )

            .to(
                warp58Word,
                {

                    scaleX: 5,

                    scaleY: .25,

                    rotationY: 35,

                    opacity: 0,

                    filter:
                        "blur(14px)",

                    duration: .65,

                    ease:
                        "power4.in"

                }
            );


        /* =============================================
           TRAILS FOLLOW
        ============================================= */

        gsap.to(
            warp58Trail1,
            {

                scaleX: 4,

                opacity: 0,

                filter:
                    "blur(15px)",

                duration: .7,

                ease:
                    "power4.in"

            }
        );


        gsap.to(
            warp58Trail2,
            {

                scaleX: 7,

                opacity: 0,

                filter:
                    "blur(25px)",

                duration: .8,

                ease:
                    "power4.in"

            }
        );


        /* =============================================
           GRID FLIES FORWARD
        ============================================= */

        gsap.to(
            warp58Grid,
            {

                scale:
                    4,

                opacity: 0,

                duration: .9,

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
                    warp58Word,
                    {

                        x: 0,

                        y: 0,

                        scaleX: .25,

                        scaleY: 2.5,

                        rotationY: -30,

                        opacity: 0,

                        filter:
                            "blur(15px)"

                    }
                );


                gsap.set(
                    warp58Trail1,
                    {

                        x: -150,

                        scaleX: 2,

                        opacity: 0,

                        filter:
                            "blur(12px)"

                    }
                );


                gsap.set(
                    warp58Trail2,
                    {

                        x: -250,

                        scaleX: 3,

                        opacity: 0,

                        filter:
                            "blur(20px)"

                    }
                );


                gsap.set(
                    warp58Grid,
                    {

                        scale: 4,

                        opacity: 0

                    }
                );


                /* =====================================
                   REAPPEAR
                ===================================== */

                gsap.timeline({

                    onComplete: () => {

                        warp58Locked =
                            false;

                    }

                })

                .to(
                    warp58Grid,
                    {

                        scale: 1.2,

                        opacity: .12,

                        duration: .8,

                        ease:
                            "power3.out"

                    }
                )

                .to(
                    warp58Trail2,
                    {

                        x: 0,

                        scaleX: 1,

                        opacity: .3,

                        filter:
                            "blur(14px)",

                        duration: .6,

                        ease:
                            "power3.out"

                    },
                    "-=.55"
                )

                .to(
                    warp58Trail1,
                    {

                        x: 0,

                        scaleX: 1,

                        opacity: .6,

                        filter:
                            "blur(7px)",

                        duration: .55,

                        ease:
                            "power3.out"

                    },
                    "-=.45"
                )

                .to(
                    warp58Word,
                    {

                        x: 0,

                        y: 0,

                        scaleX: 1,

                        scaleY: 1,

                        rotationY: 0,

                        rotationX: 0,

                        skewX: 0,

                        opacity: 1,

                        filter:
                            "blur(0px)",

                        duration: 1,

                        ease:
                            "elastic.out(1,.35)"

                    },
                    "-=.5"
                );

            },
            1050
        );

    }
);
/* =========================================================
   SECTION 59 — TYPOGRAPHY SHATTER
========================================================= */

const shatter59Stage =
    document.querySelector(
        "#shatter59Stage"
    );

const shatter59Scene =
    document.querySelector(
        "#shatter59Scene"
    );

const shatter59Word =
    document.querySelector(
        "#shatter59Word"
    );

const shatter59Fragments =
    document.querySelector(
        "#shatter59Fragments"
    );

const shatter59Cracks =
    document.querySelector(
        "#shatter59Cracks"
    );

const shatter59Cursor =
    document.querySelector(
        "#shatter59Cursor"
    );

const shatter59CursorRing =
    document.querySelector(
        "#shatter59CursorRing"
    );

const shatter59Impact =
    document.querySelector(
        "#shatter59Impact"
    );


/* =========================================================
   STATE
========================================================= */

let shatter59MouseX = 0;
let shatter59MouseY = 0;

let shatter59CurrentX = 0;
let shatter59CurrentY = 0;

let shatter59PreviousX = 0;
let shatter59PreviousY = 0;

let shatter59Speed = 0;

let shatter59Inside = false;

let shatter59Locked = false;


/* =========================================================
   CREATE CRACKS
========================================================= */

for (
    let i = 0;
    i < 22;
    i++
) {

    const crack =
        document.createElement(
            "div"
        );

    crack.className =
        "shatter59-crack";


    const startX =
        20 +
        Math.random() * 60;


    const startY =
        25 +
        Math.random() * 50;


    const length =
        50 +
        Math.random() * 220;


    const angle =
        Math.random() * 360;


    crack.style.left =
        startX + "%";


    crack.style.top =
        startY + "%";


    crack.style.width =
        length + "px";


    crack.style.transform =
        `rotate(${angle}deg)`;


    shatter59Cracks.appendChild(
        crack
    );

}
/* =========================================================
   CREATE WORD FRAGMENTS
========================================================= */

const shatter59FragmentData = [];

const letters =
    "SHATTER".split("");


letters.forEach(
    (letter, index) => {

        const fragment =
            document.createElement(
                "div"
            );

        fragment.className =
            "shatter59-fragment";


        fragment.textContent =
            letter;


        shatter59Fragments.appendChild(
            fragment
        );


        shatter59FragmentData.push({

            element:
                fragment,

            index:
                index,

            angle:
                Math.random() *
                Math.PI *
                2,

            distance:
                100 +
                Math.random() *
                350,

            rotation:
                -180 +
                Math.random() *
                360

        });

    }
);


/* =========================================================
   ENTER
========================================================= */

shatter59Stage.addEventListener(
    "mouseenter",
    () => {

        shatter59Inside = true;


        gsap.to(
            shatter59Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: .3

            }
        );


        gsap.to(
            shatter59CursorRing,
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

shatter59Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            shatter59Stage
                .getBoundingClientRect();


        shatter59MouseX =
            event.clientX -
            rect.left;


        shatter59MouseY =
            event.clientY -
            rect.top;


        const dx =
            shatter59MouseX -
            shatter59PreviousX;


        const dy =
            shatter59MouseY -
            shatter59PreviousY;


        shatter59Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        shatter59PreviousX =
            shatter59MouseX;


        shatter59PreviousY =
            shatter59MouseY;

    }
);

/* =========================================================
   LEAVE
========================================================= */

shatter59Stage.addEventListener(
    "mouseleave",
    () => {

        shatter59Inside = false;


        gsap.to(
            shatter59Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: .25

            }
        );


        gsap.to(
            shatter59CursorRing,
            {

                opacity: 0,

                scale: .7,

                duration: .25

            }
        );


        if (!shatter59Locked) {

            gsap.to(
                shatter59Scene,
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


            gsap.to(
                shatter59Word,
                {

                    scaleX: 1,

                    scaleY: 1,

                    skewX: 0,

                    duration: .5

                }
            );

        }

    }
);


/* =========================================================
   MAIN LOOP
========================================================= */

function updateShatter59() {

    shatter59CurrentX +=
        (
            shatter59MouseX -
            shatter59CurrentX
        ) * .13;


    shatter59CurrentY +=
        (
            shatter59MouseY -
            shatter59CurrentY
        ) * .13;


    /* =============================================
       CURSOR
    ============================================= */

    shatter59Cursor.style.left =
        shatter59CurrentX + "px";


    shatter59Cursor.style.top =
        shatter59CurrentY + "px";


    shatter59CursorRing.style.left =
        shatter59CurrentX + "px";


    shatter59CursorRing.style.top =
        shatter59CurrentY + "px";


    if (
        shatter59Inside &&
        !shatter59Locked
    ) {

        const rect =
            shatter59Stage
                .getBoundingClientRect();


        const centerX =
            rect.width / 2;


        const centerY =
            rect.height / 2;


        const dx =
            shatter59CurrentX -
            centerX;


        const dy =
            shatter59CurrentY -
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
                distance / 650
            );


        /* =========================================
           TEXT WOBBLE
        ========================================= */

        const vibration =
            Math.min(
                shatter59Speed * .012,
                .25
            );


        gsap.to(
            shatter59Word,
            {

                x:
                    dx *
                    influence *
                    .08,

                y:
                    dy *
                    influence *
                    .04,

                rotationX:
                    dy *
                    influence *
                    -.015,

                rotationY:
                    dx *
                    influence *
                    .015,

                scaleX:
                    1 +
                    vibration,

                scaleY:
                    1 -
                    vibration * .3,

                skewX:
                    dx *
                    influence *
                    .015,

                duration: .2,

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
            shatter59Scene,
            {

                rotationY:
                    dx *
                    .006,

                rotationX:
                    dy *
                    -.004,

                duration: .4,

                overwrite:
                    "auto"

            }
        );


        /* =========================================
           CRACKS APPEAR WITH SPEED
        ========================================= */

        if (
            shatter59Speed > 5
        ) {

            const cracks =
                shatter59Cracks
                    .children;


            for (
                let i = 0;
                i < cracks.length;
                i++
            ) {

                if (
                    Math.random() <
                    .12
                ) {

                    gsap.to(
                        cracks[i],
                        {

                            opacity:
                                .08 +
                                Math.min(
                                    shatter59Speed *
                                    .01,
                                    .4
                                ),

                            duration: .25

                        }
                    );

                }

            }

        }


        /* =========================================
           CURSOR RING PULSE
        ========================================= */

        gsap.to(
            shatter59CursorRing,
            {

                scale:
                    1 +
                    Math.min(
                        shatter59Speed * .015,
                        .35
                    ),

                duration: .2,

                overwrite:
                    "auto"

            }
        );

    }


    /* =============================================
       SPEED DECAY
    ============================================= */

    shatter59Speed *= .9;


    requestAnimationFrame(
        updateShatter59
    );

}


updateShatter59();

/* =========================================================
   CLICK — SHATTER
========================================================= */

shatter59Stage.addEventListener("click", () => {
  if (shatter59Locked) return;

  shatter59Locked = true;

  /* =============================================
           IMPACT
        ============================================= */

  gsap.set(shatter59Impact, {
    left: shatter59CurrentX,

    top: shatter59CurrentY,

    scale: 0,

    opacity: 1,
  });

  gsap.to(shatter59Impact, {
    scale: 18,

    opacity: 0,

    duration: 0.9,

    ease: "power3.out",
  });

  /* =============================================
           ORIGINAL WORD DISAPPEARS
        ============================================= */

  gsap.to(shatter59Word, {
    scale: 0.85,

    opacity: 0,

    filter: "blur(8px)",

    duration: 0.25,

    ease: "power2.in",
  });

  /* =============================================
           CRACK EXPLOSION
        ============================================= */

  const cracks = shatter59Cracks.children;

  for (let i = 0; i < cracks.length; i++) {
    gsap.to(cracks[i], {
      opacity: 0.5 + Math.random() * 0.4,

      scaleX: 1.5 + Math.random() * 2,

      duration: 0.2 + Math.random() * 0.3,

      ease: "power2.out",
    });
  }

  /* =============================================
           SHATTER LETTERS
        ============================================= */

  shatter59FragmentData.forEach((fragment) => {
    const angle = fragment.angle;

    const distance = fragment.distance;

    const x = Math.cos(angle) * distance;

    const y = Math.sin(angle) * distance;

    gsap.fromTo(
      fragment.element,
      {
        x: 0,

        y: 0,

        rotation: 0,

        scale: 1,

        opacity: 0,
      },
      {
        x: x,

        y: y,

        rotation: fragment.rotation,

        scale: 0.35 + Math.random() * 0.7,

        opacity: 1,

        duration: 0.65 + Math.random() * 0.45,

        delay: Math.random() * 0.08,

        ease: "power3.out",
      },
    );
  });

  /* =============================================
           FRAGMENTS FALL
        ============================================= */

  setTimeout(() => {
    shatter59FragmentData.forEach((fragment) => {
      gsap.to(fragment.element, {
        y: "+=" + (250 + Math.random() * 350),

        rotation: "+=" + (180 + Math.random() * 360),

        scale: 0.05,

        opacity: 0,

        duration: 0.8 + Math.random() * 0.5,

        ease: "power3.in",
      });
    });

    /* =====================================
                   REBUILD
                ===================================== */

    setTimeout(() => {
      /* Reset fragments */

      shatter59FragmentData.forEach((fragment) => {
        gsap.set(fragment.element, {
          x: 0,

          y: 0,

          rotation: 0,

          scale: 1,

          opacity: 0,
        });
      });

      /* Reset cracks */

      gsap.set(cracks, {
        opacity: 0,

        scaleX: 1,
      });

      /* =================================
                           WORD REAPPEARS
                        ================================= */

      gsap.fromTo(
        shatter59Word,
        {
          scale: 0.15,

          opacity: 0,

          filter: "blur(12px)",

          rotationY: 25,
        },
        {
          scale: 1,

          opacity: 1,

          filter: "blur(0px)",

          rotationY: 0,

          duration: 1.1,

          ease: "elastic.out(1,.35)",

          onComplete: () => {
            shatter59Locked = false;
          },
        },
      );
    }, 750);
  }, 700);
});

/* =========================================================
   SECTION 60 — TYPOGRAPHY MELT
========================================================= */

const melt60Stage =
    document.querySelector(
        "#melt60Stage"
    );

const melt60Scene =
    document.querySelector(
        "#melt60Scene"
    );

const melt60Word =
    document.querySelector(
        "#melt60Word"
    );

const melt60Liquid =
    document.querySelector(
        "#melt60Liquid"
    );

const melt60Heat =
    document.querySelector(
        "#melt60Heat"
    );

const melt60Ripple =
    document.querySelector(
        "#melt60Ripple"
    );

const melt60Drops =
    document.querySelector(
        "#melt60Drops"
    );

const melt60Cursor =
    document.querySelector(
        "#melt60Cursor"
    );

const melt60Ring =
    document.querySelector(
        "#melt60Ring"
    );

const melt60Impact =
    document.querySelector(
        "#melt60Impact"
    );


/* =========================================================
   STATE
========================================================= */

let melt60MouseX = 0;
let melt60MouseY = 0;

let melt60CurrentX = 0;
let melt60CurrentY = 0;

let melt60PreviousX = 0;
let melt60PreviousY = 0;

let melt60Speed = 0;

let melt60Inside = false;

let melt60Locked = false;


/* =========================================================
   CREATE LIQUID DROPS
========================================================= */

for (
    let i = 0;
    i < 28;
    i++
) {

    const drop =
        document.createElement(
            "div"
        );

    drop.className =
        "melt60-drop";


    drop.style.left =
        (
            25 +
            Math.random() * 50
        ) + "%";


    drop.style.top =
        (
            48 +
            Math.random() * 14
        ) + "%";


    melt60Drops.appendChild(
        drop
    );

}
/* =========================================================
   ENTER
========================================================= */

melt60Stage.addEventListener(
    "mouseenter",
    () => {

        melt60Inside = true;


        gsap.to(
            melt60Cursor,
            {

                opacity: 1,

                scale: 1,

                duration: .3

            }
        );


        gsap.to(
            melt60Ring,
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
   MOVE
========================================================= */

melt60Stage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            melt60Stage
                .getBoundingClientRect();


        melt60MouseX =
            event.clientX -
            rect.left;


        melt60MouseY =
            event.clientY -
            rect.top;


        const dx =
            melt60MouseX -
            melt60PreviousX;


        const dy =
            melt60MouseY -
            melt60PreviousY;


        melt60Speed =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        melt60PreviousX =
            melt60MouseX;


        melt60PreviousY =
            melt60MouseY;

    }
);


/* =========================================================
   LEAVE
========================================================= */

melt60Stage.addEventListener(
    "mouseleave",
    () => {

        melt60Inside = false;


        gsap.to(
            melt60Cursor,
            {

                opacity: 0,

                scale: 0,

                duration: .25

            }
        );


        gsap.to(
            melt60Ring,
            {

                opacity: 0,

                scale: .6,

                duration: .25

            }
        );


        if (!melt60Locked) {

            gsap.to(
                melt60Word,
                {

                    scaleX: 1,

                    scaleY: 1,

                    skewX: 0,

                    y: 0,

                    rotationX: 0,

                    rotationY: 0,

                    duration: .7,

                    ease:
                        "power3.out"

                }
            );


            gsap.to(
                melt60Liquid,
                {

                    scaleX: 1,

                    scaleY: 1,

                    y: 0,

                    duration: .7

                }
            );

        }

    }
);

/* =========================================================
   MAIN LOOP
========================================================= */

function updateMelt60() {

    melt60CurrentX +=
        (
            melt60MouseX -
            melt60CurrentX
        ) * .12;


    melt60CurrentY +=
        (
            melt60MouseY -
            melt60CurrentY
        ) * .12;


    /* =============================================
       CURSOR
    ============================================= */

    melt60Cursor.style.left =
        melt60CurrentX + "px";

    melt60Cursor.style.top =
        melt60CurrentY + "px";


    melt60Ring.style.left =
        melt60CurrentX + "px";

    melt60Ring.style.top =
        melt60CurrentY + "px";


    if (
        melt60Inside &&
        !melt60Locked
    ) {

        const rect =
            melt60Stage
                .getBoundingClientRect();


        const centerX =
            rect.width / 2;


        const centerY =
            rect.height / 2;


        const dx =
            melt60CurrentX -
            centerX;


        const dy =
            melt60CurrentY -
            centerY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /* =========================================
           HEAT INFLUENCE
        ========================================= */

        const influence =
            Math.max(
                0,
                1 -
                distance / 650
            );


        const speedHeat =
            Math.min(
                melt60Speed * .012,
                .45
            );


        const heat =
            influence *
            (
                .25 +
                speedHeat
            );


        /* =========================================
           MAIN WORD MELTING
        ========================================= */

        gsap.to(
            melt60Word,
            {

                x:
                    dx *
                    influence *
                    .06,

                y:
                    heat *
                    55,

                scaleX:
                    1 +
                    heat * .12,

                scaleY:
                    1 -
                    heat * .15,

                skewX:
                    dx *
                    influence *
                    .025,

                rotationY:
                    dx *
                    influence *
                    .008,

                rotationX:
                    dy *
                    influence *
                    -.006,

                duration: .3,

                overwrite:
                    "auto",

                ease:
                    "power2.out"

            }
        );


        /* =========================================
           LIQUID LAYER
        ========================================= */

        gsap.to(
            melt60Liquid,
            {

                x:
                    dx *
                    influence *
                    .1,

                y:
                    heat *
                    80,

                scaleX:
                    1 +
                    heat * .3,

                scaleY:
                    1 +
                    heat * .05,

                skewX:
                    dx *
                    influence *
                    .04,

                opacity:
                    .3 +
                    heat * .7,

                duration: .35,

                overwrite:
                    "auto"

            }
        );


        /* =========================================
           HEAT FIELD
        ========================================= */

        gsap.to(
            melt60Heat,
            {

                x:
                    dx *
                    .5,

                y:
                    dy *
                    .5,

                scale:
                    1 +
                    heat * .8,

                opacity:
                    .35 +
                    heat * .5,

                duration: .5,

                overwrite:
                    "auto"

            }
        );


        /* =========================================
           RING
        ========================================= */

        gsap.to(
            melt60Ring,
            {

                scale:
                    1 +
                    heat * .8,

                duration: .25,

                overwrite:
                    "auto"

            }
        );


        /* =========================================
           DROPS
        ========================================= */

        if (
            heat > .25 &&
            Math.random() < .15
        ) {

            const drops =
                melt60Drops
                    .children;


            const drop =
                drops[
                    Math.floor(
                        Math.random() *
                        drops.length
                    )
                ];


            gsap.killTweensOf(
                drop
            );


            gsap.set(
                drop,
                {

                    left:
                        (
                            35 +
                            Math.random() * 30
                        ) + "%",

                    top:
                        "47%",

                    scale:
                        .5 +
                        Math.random() * .8,

                    opacity:
                        .4 +
                        Math.random() * .4

                }
            );


            gsap.to(
                drop,
                {

                    y:
                        80 +
                        Math.random() * 180,

                    scaleY:
                        1.5,

                    opacity: 0,

                    duration:
                        .5 +
                        Math.random() * .5,

                    ease:
                        "power2.in"

                }
            );

        }

    }
 /* =============================================
       SPEED DECAY
    ============================================= */

    melt60Speed *= .9;


    requestAnimationFrame(
        updateMelt60
    );

}


updateMelt60();


/* =========================================================
   CLICK — FULL MELT
========================================================= */

melt60Stage.addEventListener("click", () => {
  if (melt60Locked) return;

  melt60Locked = true;

  /* =============================================
           IMPACT
        ============================================= */

  gsap.set(melt60Impact, {
    left: melt60CurrentX,

    top: melt60CurrentY,

    scale: 0,

    opacity: 1,
  });

  gsap.to(melt60Impact, {
    scale: 18,

    opacity: 0,

    duration: 0.8,

    ease: "power3.out",
  });

  /* =============================================
           RIPPLE
        ============================================= */

  gsap.set(melt60Ripple, {
    left: melt60CurrentX,

    top: melt60CurrentY,

    scale: 0.2,

    opacity: 0.8,
  });

  gsap.to(melt60Ripple, {
    scale: 12,

    opacity: 0,

    duration: 1.2,

    ease: "power2.out",
  });

  /* =============================================
           HEAT EXPLOSION
        ============================================= */

  gsap.to(melt60Heat, {
    scale: 2.5,

    opacity: 0.9,

    duration: 0.5,

    ease: "power2.out",
  });

  /* =============================================
           WORD DROPS
        ============================================= */

  gsap
    .timeline()

    .to(melt60Word, {
      scaleX: 1.15,

      scaleY: 0.65,

      y: 80,

      skewX: 8,

      filter: "blur(3px)",

      duration: 0.3,

      ease: "power2.in",
    })

    .to(melt60Word, {
      scaleX: 1.45,

      scaleY: 0.15,

      y: 260,

      rotationX: -25,

      opacity: 0,

      filter: "blur(12px)",

      duration: 0.7,

      ease: "power4.in",
    });

  /* =============================================
           LIQUID LAYER
        ============================================= */

  gsap.to(melt60Liquid, {
    scaleX: 2,

    scaleY: 0.25,

    y: 300,

    opacity: 0,

    filter: "blur(12px)",

    duration: 0.9,

    ease: "power4.in",
  });

  /* =============================================
           DROPS FALL
        ============================================= */

  const drops = melt60Drops.children;

  for (let i = 0; i < drops.length; i++) {
    gsap.to(drops[i], {
      opacity: 0.4 + Math.random() * 0.5,

      y: 250 + Math.random() * 300,

      scaleY: 1.5 + Math.random(),

      duration: 0.7 + Math.random() * 0.5,

      delay: Math.random() * 0.2,

      ease: "power3.in",
    });
  }
  /* =============================================
           REFORM
        ============================================= */

  setTimeout(() => {
    gsap.set(melt60Word, {
      y: -250,

      scaleX: 0.7,

      scaleY: 1.4,

      rotationX: 20,

      opacity: 0,

      filter: "blur(12px)",
    });

    gsap.set(melt60Liquid, {
      y: -300,

      scaleX: 0.7,

      scaleY: 1.4,

      opacity: 0,
    });

    gsap.set(melt60Heat, {
      scale: 1,

      opacity: 0.4,
    });

    gsap.to(drops, {
      opacity: 0,

      duration: 0.25,
    });

    /* =====================================
                   RISE
                ===================================== */

    gsap
      .timeline({
        onComplete: () => {
          melt60Locked = false;
        },
      })

      .to(melt60Liquid, {
        y: 0,

        scaleX: 1,

        scaleY: 1,

        opacity: 0.45,

        duration: 0.7,

        ease: "power3.out",
      })

      .to(
        melt60Word,
        {
          y: 0,

          scaleX: 1,

          scaleY: 1,

          rotationX: 0,

          skewX: 0,

          opacity: 1,

          filter: "blur(0px)",

          duration: 1,

          ease: "elastic.out(1,.3)",
        },
        "-=.5",
      );
  }, 1000);
});


/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
