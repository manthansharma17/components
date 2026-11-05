gsap.registerPlugin(ScrollTrigger);

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

{
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
}

/* =========================================================
   SECTION 34
   LIQUID CURSOR DISTORTION
========================================================= */

{
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
}

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
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
