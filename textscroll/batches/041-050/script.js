gsap.registerPlugin(ScrollTrigger);

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
