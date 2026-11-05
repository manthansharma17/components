gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   SECTION 81 — TIME FRACTURE ENGINE
========================================================= */

(() => {

  const stage =
    document.getElementById(
      "tf81Stage"
    );

  const canvas =
    document.getElementById(
      "tf81Canvas"
    );

  const cursor =
    document.getElementById(
      "tf81Cursor"
    );

  const ring =
    document.getElementById(
      "tf81Ring"
    );

  const status =
    document.getElementById(
      "tf81Status"
    );

  const counter =
    document.getElementById(
      "tf81Counter"
    );

  if (
    !stage ||
    !canvas
  ) return;


  const ctx =
    canvas.getContext("2d");


  /* =======================================================
     CONFIG
  ======================================================= */

  const mobile =
    window.matchMedia(
      "(max-width: 768px)"
    ).matches;

  const GAP =
    mobile ? 5 : 3;

  const MAX_PARTICLES =
    mobile
      ? 4000
      : 8200;

  const SLICE_COUNT =
    mobile ? 14 : 22;


  /* =======================================================
     STATE
  ======================================================= */

  let width = 0;
  let height = 0;

  let dpr = 1;

  let particles = [];

  let slices = [];

  let totalParticles = 0;

  let fracture = 0;

  let fractureWave = 0;


  /* =======================================================
     MOUSE
  ======================================================= */

  const mouse = {

    x: 0,
    y: 0,

    targetX: 0,
    targetY: 0,

    previousX: 0,
    previousY: 0,

    velocityX: 0,
    velocityY: 0,

    speed: 0,

    active: false

  };
/* =======================================================
     RESIZE
  ======================================================= */

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
      width + "px";

    canvas.style.height =
      height + "px";

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    mouse.x =
      width / 2;

    mouse.y =
      height / 2;

    mouse.targetX =
      width / 2;

    mouse.targetY =
      height / 2;

    mouse.previousX =
      width / 2;

    mouse.previousY =
      height / 2;

    createText();

  }


  window.addEventListener(
    "resize",
    resize
  );


  /* =======================================================
     CREATE TEXT
  ======================================================= */

  function createText() {

    particles = [];

    slices = [];

    const source =
      document.createElement(
        "canvas"
      );

    source.width =
      width;

    source.height =
      height;

    const sourceCtx =
      source.getContext(
        "2d"
      );


    let fontSize =
      Math.min(
        width * .145,
        220
      );


    sourceCtx.font =
      `900 ${fontSize}px Arial`;


    while (
      sourceCtx.measureText(
        "TIME FRACTURE"
      ).width >
      width * .84
    ) {

      fontSize -= 2;

      sourceCtx.font =
        `900 ${fontSize}px Arial`;

    }


    sourceCtx.clearRect(
      0,
      0,
      width,
      height
    );


    sourceCtx.fillStyle =
      "#fff";

    sourceCtx.textAlign =
      "center";

    sourceCtx.textBaseline =
      "middle";


    sourceCtx.fillText(
      "TIME FRACTURE",
      width / 2,
      height / 2
    );


    const pixels =
      sourceCtx.getImageData(
        0,
        0,
        width,
        height
      ).data;


    const points = [];


    for (
      let y = 0;
      y < height;
      y += GAP
    ) {

      for (
        let x = 0;
        x < width;
        x += GAP
      ) {

        const index =
          (
            y * width +
            x
          ) * 4;


        if (
          pixels[index + 3] >
          100
        ) {

          points.push({
            x,
            y
          });

        }

      }

    }


    let selected =
      points;


    if (
      points.length >
      MAX_PARTICLES
    ) {

      selected = [];

      const step =
        points.length /
        MAX_PARTICLES;


      for (
        let i = 0;
        i < MAX_PARTICLES;
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
      point => {

        const normalizedY =
          point.y /
          height;


        const slice =
          Math.min(
            SLICE_COUNT - 1,
            Math.floor(
              normalizedY *
              SLICE_COUNT
            )
          );

            particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          slice,

          phase:
            Math.random() *
            Math.PI * 2,

          seed:
            Math.random(),

          size:
            .8 +
            Math.random() * 1.2,

          alpha:
            .55 +
            Math.random() * .45

        });

      }
    );


    totalParticles =
      particles.length;


    /*
     * Individual temporal slices.
     */

    for (
      let i = 0;
      i < SLICE_COUNT;
      i++
    ) {

      slices.push({

        offsetX: 0,
        offsetY: 0,

        targetX: 0,
        targetY: 0,

        velocityX: 0,
        velocityY: 0,

        phase:
          i *
          .8 +
          Math.random() *
          Math.PI,

        timeOffset:
          (
            i -
            SLICE_COUNT / 2
          ) /
          SLICE_COUNT

      });

    }


    counter.textContent =
      "SYNC 100%";

  }


  /* =======================================================
     POINTER
  ======================================================= */

  window.addEventListener(
    "mousemove",
    event => {

      mouse.targetX =
        event.clientX;

      mouse.targetY =
        event.clientY;

      mouse.active =
        true;

      status.textContent =
        "TEMPORAL FRACTURE ACTIVE";

    }
  );


  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active =
        false;

      status.textContent =
        "MOVE THROUGH TIME";

    }
  );


  /* =======================================================
     CLICK — COMPLETE FRACTURE
  ======================================================= */

  stage.addEventListener(
    "click",
    () => {

      status.textContent =
        "TIME FRACTURE";


      const state = {
        value: 0
      };


      gsap.timeline({

        onUpdate: () => {

          fracture =
            state.value;

        },

        onComplete: () => {

          fracture =
            0;

          status.textContent =
            "MOVE THROUGH TIME";

        }

      })

      .to(
        state,
        {
          value: 1,

          duration: .5,

          ease: "power3.out"
        }
      )

      .to(
        state,
        {
          value: 2.4,

          duration: .75,

          ease: "power2.inOut"
        }
      )

      .to(
        state,
        {
          value: 0,

          duration: 1.6,

          ease: "expo.out"
        }
      );

    }
  );


  /* =======================================================
     RENDER
  ======================================================= */

  function render() {

    requestAnimationFrame(
      render
    );


    /* -----------------------------------------------------
       MOUSE
    ----------------------------------------------------- */

    mouse.x +=
      (
        mouse.targetX -
        mouse.x
      ) * .1;


    mouse.y +=
      (
        mouse.targetY -
        mouse.y
      ) * .1;


    mouse.velocityX =
      mouse.targetX -
      mouse.previousX;


    mouse.velocityY =
      mouse.targetY -
      mouse.previousY;


    const rawSpeed =
      Math.sqrt(
        mouse.velocityX *
        mouse.velocityX +
        mouse.velocityY *
        mouse.velocityY
      );


    mouse.speed +=
      (
        rawSpeed -
        mouse.speed
      ) * .12;


    mouse.previousX =
      mouse.targetX;

    mouse.previousY =
      mouse.targetY;


    /* -----------------------------------------------------
       CLEAR
    ----------------------------------------------------- */

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    const time =
      performance.now() *
      .001;


    /* =====================================================
       UPDATE SLICES
    ===================================================== */

    slices.forEach(
      (slice, index) => {

        const normalized =
          (
            index /
            (
              SLICE_COUNT - 1
            )
          ) * 2 - 1;


        /*
         * Vertical mouse position
         * controls temporal offset.
         */

        const verticalInfluence =
          mouse.active
            ? (
                mouse.y -
                height / 2
              ) /
              height
            : 0;


        /*
         * Horizontal mouse position
         * controls lateral distortion.
         */

        const horizontalInfluence =
          mouse.active
            ? (
                mouse.x -
                width / 2
              ) /
              width
            : 0;


        const wave =
          Math.sin(
            time * 2.2 +
            slice.phase +
            normalized * 3
          );


        const timeSeparation =
          verticalInfluence *
          normalized *
          (
            18 +
            mouse.speed * .6
          );


        const lateralSeparation =
          horizontalInfluence *
          normalized *
          (
            14 +
            mouse.speed * .4
          );


        /*
         * Click fracture expands
         * every temporal slice.
         */

        const fractureAmount =
          fracture *
          normalized;


        slice.targetX =
          lateralSeparation +
          wave *
          Math.abs(
            verticalInfluence
          ) *
          3 +
          fractureAmount *
          45;


        slice.targetY =
          timeSeparation +
          Math.cos(
            time * 1.7 +
            slice.phase
          ) *
          Math.abs(
            horizontalInfluence
          ) *
          3 +
          fractureAmount *
          28;


        /*
         * Ease slices toward
         * their temporal positions.
         */

        slice.velocityX +=
          (
            slice.targetX -
            slice.offsetX
          ) * .045;


        slice.velocityY +=
          (
            slice.targetY -
            slice.offsetY
          ) * .045;


        slice.velocityX *= .76;
        slice.velocityY *= .76;


        slice.offsetX +=
          slice.velocityX;


        slice.offsetY +=
          slice.velocityY;

      }
    );
 /* =====================================================
       PARTICLES
    ===================================================== */

    let fracturedParticles =
      0;


    particles.forEach(
      p => {

        const slice =
          slices[p.slice];


        const normalizedSlice =
          (
            p.slice /
            (
              SLICE_COUNT - 1
            )
          ) * 2 - 1;


        /*
         * Base slice position.
         */

        let targetX =
          p.baseX +
          slice.offsetX;


        let targetY =
          p.baseY +
          slice.offsetY;


        /* =================================================
           LOCAL FRACTURE WAVE
        ================================================= */

        if (
          fracture > .001
        ) {

          const distanceFromCenter =
            Math.abs(
              normalizedSlice
            );


          const wave =
            Math.sin(
              normalizedSlice *
              12 -
              fracture *
              14
            );


          const strength =
            fracture *
            (
              1 -
              distanceFromCenter *
              .25
            );


          targetX +=
            wave *
            strength *
            12;


          targetY +=
            Math.cos(
              normalizedSlice *
              9 -
              fracture *
              12
            ) *
            strength *
            9;


          fracturedParticles++;

        }


        /* =================================================
           PARTICLE SPRING
        ================================================= */

        p.vx +=
          (
            targetX -
            p.x
          ) * .055;


        p.vy +=
          (
            targetY -
            p.y
          ) * .055;


        p.vx *= .76;
        p.vy *= .76;


        p.x +=
          p.vx;

        p.y +=
          p.vy;


        /* =================================================
           TEMPORAL OFFSET
        ================================================= */

        const temporalDistance =
          Math.abs(
            normalizedSlice
          );


        const echoStrength =
          temporalDistance *
          (
            .8 +
            mouse.speed * .025
          );


        /*
         * Older slices receive
         * subtle echo trails.
         */

        if (
          echoStrength > .12
        ) {

          const trailX =
            p.x -
            p.vx *
            (
              4 +
              echoStrength * 5
            );


          const trailY =
            p.y -
            p.vy *
            (
              4 +
              echoStrength * 5
            );


          ctx.fillStyle =
            `rgba(
              255,
              255,
              255,
              ${p.alpha *
              echoStrength *
              .08}
            )`;


          ctx.fillRect(
            trailX,
            trailY,

            p.size,
            p.size
          );

        }


        /* =================================================
           FRACTURE GHOSTS
        ================================================= */

        if (
          fracture > .1
        ) {

          const ghostDistance =
            fracture *
            (
              5 +
              temporalDistance *
              18
            );


          ctx.fillStyle =
            `rgba(
              255,
              255,
              255,
              ${fracture *
              .08}
            )`;


          ctx.fillRect(
            p.x -
            ghostDistance,

            p.y,

            p.size,
            p.size
          );


          ctx.fillStyle =
            `rgba(
              255,
              255,
              255,
              ${fracture *
              .06}
            )`;


          ctx.fillRect(
            p.x +
            ghostDistance,

            p.y,

            p.size,
            p.size
          );

        }


        /* =================================================
           MAIN PARTICLE
        ================================================= */

        const velocity =
          Math.sqrt(
            p.vx * p.vx +
            p.vy * p.vy
          );


        const stretch =
          Math.min(
            velocity * .22,
            3
          );


        const opacity =
          Math.max(
            .28,
            p.alpha -
            temporalDistance *
            .1
          );


        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${opacity}
          )`;


        ctx.fillRect(
          p.x -
          p.vx *
          .04,

          p.y -
          p.vy *
          .04,

          p.size +
          stretch,

          p.size +
          stretch
        );

      }
    );


    /* =====================================================
       TEMPORAL DIVISION LINES
    ===================================================== */

    if (
      mouse.active ||
      fracture > .01
    ) {

      ctx.save();


      ctx.globalAlpha =
        .08 +
        fracture * .08;


      for (
        let i = 1;
        i < SLICE_COUNT;
        i++
      ) {

        const y =
          (
            height /
            SLICE_COUNT
          ) *
          i;


        const slice =
          slices[i];


        ctx.beginPath();

        ctx.moveTo(
          width * .1 +
          slice.offsetX,
          y +
          slice.offsetY
        );

        ctx.lineTo(
          width * .9 +
          slice.offsetX,
          y +
          slice.offsetY
        );

        ctx.strokeStyle =
          "#fff";

        ctx.lineWidth =
          .35;

        ctx.stroke();

      }


      ctx.restore();

    }
/* =====================================================
       SYNC VALUE
    ===================================================== */

    let averageOffset = 0;


    slices.forEach(
      slice => {

        averageOffset +=
          Math.abs(
            slice.offsetX
          ) +
          Math.abs(
            slice.offsetY
          );

      }
    );


    averageOffset /=
      slices.length;


    const sync =
      Math.max(
        0,
        Math.min(
          100,
          100 -
          averageOffset *
          2.4 -
          fracture *
          30
        )
      );


    counter.textContent =
      `SYNC ${String(
        Math.round(sync)
      ).padStart(
        3,
        "0"
      )}%`;


    /* =====================================================
       CURSOR
    ===================================================== */

    if (
      !mobile
    ) {

      gsap.to(
        cursor,
        {

          x:
            mouse.targetX,

          y:
            mouse.targetY,

          duration: .15,

          ease:
            "power3.out",

          overwrite: true

        }
      );


      gsap.to(
        ring,
        {

          x:
            mouse.targetX,

          y:
            mouse.targetY,

          duration: .42,

          ease:
            "power3.out",

          overwrite: true

        }
      );

    }


    /* =====================================================
       GRID PARALLAX
    ===================================================== */

    const grid =
      stage.querySelector(
        ".tf81-grid"
      );


    if (
      grid
    ) {

      const gx =
        (
          mouse.x -
          width / 2
        ) /
        width *
        -25;


      const gy =
        (
          mouse.y -
          height / 2
        ) /
        height *
        -25;


      grid.style.transform =
        `translate(
          ${gx}px,
          ${gy}px
        )`;

    }

  }

// SECTION 82

(() => {
  const stage = document.getElementById("ca82Stage");
  const word = document.getElementById("ca82Word");
  const cursor = document.getElementById("ca82Cursor");
  const ring = document.getElementById("ca82Ring");
  const wave = document.getElementById("ca82Wave");
  const status = document.getElementById("ca82Status");
  const counter = document.getElementById("ca82Counter");

  if (!stage || !word || !window.gsap) return;

  const letters = [...word.querySelectorAll("span")];
  const mobile = matchMedia("(max-width: 768px)").matches;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let lastTriggered = -1;
  let lastTriggerTime = 0;
  let chainRunning = false;
  let waveTimeline;

  const pointer = {
    x: innerWidth / 2,
    y: innerHeight / 2,
    previousX: innerWidth / 2,
    previousY: innerHeight / 2,
    speed: 0
  };

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

  /* Cursor follows pointer using persistent GSAP quickTo tweens. */
  if (!mobile) {
    const cursorX = gsap.quickTo(cursor, "x", {
      duration: .15,
      ease: "power3.out"
    });

    const cursorY = gsap.quickTo(cursor, "y", {
      duration: .15,
      ease: "power3.out"
    });

    const ringX = gsap.quickTo(ring, "x", {
      duration: .4,
      ease: "power3.out"
    });

    const ringY = gsap.quickTo(ring, "y", {
      duration: .4,
      ease: "power3.out"
    });

    window.addEventListener("mousemove", event => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      cursorX(event.clientX);
      cursorY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);

      const dx = pointer.x - pointer.previousX;
      const dy = pointer.y - pointer.previousY;

      pointer.speed = Math.min(Math.hypot(dx, dy), 50);

      pointer.previousX = pointer.x;
      pointer.previousY = pointer.y;

      const closest = getClosestLetter(event.clientX, event.clientY);

      if (closest && !chainRunning) {
        triggerLetter(closest.index, pointer.speed);
      }
    });
  }

  function getClosestLetter(x, y) {
    let closest = null;
    let minDistance = Infinity;

    letters.forEach((letter, index) => {
      const rect = letter.getBoundingClientRect();

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const distance = Math.hypot(x - cx, y - cy);

      if (distance < minDistance) {
        minDistance = distance;
        closest = { index, distance };
      }
    });

    return closest && closest.distance < (mobile ? 85 : 115)
      ? closest
      : null;
  }

  function triggerLetter(index, speed = 0) {
    if (reduceMotion || chainRunning) return;

    const now = performance.now();

    if (
      index === lastTriggered &&
      now - lastTriggerTime < 220
    ) return;

    lastTriggered = index;
    lastTriggerTime = now;

    const strength = clamp(.8 + speed / 35, .8, 2.1);

    status.textContent = `CAUSE DETECTED / ${String(index + 1).padStart(2, "0")}`;
    counter.textContent = `REACTION / ${String(index + 1).padStart(2, "0")}`;

    letters.forEach((letter, i) => {
      const distance = Math.abs(i - index);
      const direction = i < index ? -1 : 1;
      const delay = distance * .045;

      if (i === index) {
        letter.classList.add("ca82-active");

        gsap.timeline({
          onComplete: () => letter.classList.remove("ca82-active")
        })
          .to(letter, {
            y: -22 * strength,
            rotationX: 28 * direction,
            rotationZ: 5 * direction,
            scale: 1.13,
            duration: .18,
            ease: "power3.out"
          })
          .to(letter, {
            y: 0,
            rotationX: 0,
            rotationZ: 0,
            scale: 1,
            duration: .7,
            ease: "elastic.out(1, .45)"
          });

} else if (distance <= 4) {
        gsap.timeline()
          .to(letter, {
            x: direction * (8 + strength * 5) * Math.max(0, 1 - distance * .14),
            y: Math.sin(i * 1.7) * 8 * strength,
            rotationZ: direction * 2.5,
            duration: .22,
            delay,
            ease: "power2.out"
          })
          .to(letter, {
            x: 0,
            y: 0,
            rotationZ: 0,
            duration: .8,
            ease: "elastic.out(1, .5)"
          });
      }
    });

    triggerWave(index);
  }

  function triggerWave(index) {
    if (waveTimeline) waveTimeline.kill();

    const rect = letters[index].getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    gsap.set(wave, {
      left: x,
      top: y,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: .65
    });

    waveTimeline = gsap.timeline()
      .to(wave, {
        scale: mobile ? 18 : 28,
        opacity: 0,
        duration: 1.1,
        ease: "power2.out"
      });
  }

  /* Tap and click create a complete causal chain. */
  function triggerChain() {
    if (chainRunning || reduceMotion) return;

    chainRunning = true;
    status.textContent = "CASCADE INITIATED";
    counter.textContent = "SYSTEM / CASCADING";

    const order = letters.map((_, i) => i);
    const tl = gsap.timeline({
      onComplete: () => {
        chainRunning = false;
        status.textContent = "HOVER TO TRIGGER A REACTION";
        counter.textContent = "SYSTEM / READY";
      }
    });

    order.forEach((index, orderIndex) => {
      const letter = letters[index];
      const direction = orderIndex % 2 === 0 ? 1 : -1;

      tl.to(letter, {
        x: direction * (mobile ? 12 : 35),
        y: -direction * (mobile ? 10 : 25),
        rotationY: direction * 40,
        rotationZ: direction * 8,
        scale: 1.18,
        opacity: .45,
        duration: .2,
        ease: "power3.out"
      }, orderIndex * .065);

      tl.to(letter, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 1,
        opacity: 1,
        duration: .75,
        ease: "elastic.out(1, .5)"
      }, orderIndex * .065 + .2);
    });

    gsap.fromTo(
      wave,
      {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: .7
      },
      {
        scale: mobile ? 20 : 32,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      }
    );
  }

  stage.addEventListener("click", triggerChain);

  /* Mobile interaction: tap a letter or tap the stage for a cascade. */
  if (mobile) {
    letters.forEach((letter, index) => {
      letter.addEventListener("touchstart", event => {
        event.stopPropagation();
        triggerLetter(index, 10);
      }, { passive: true });
    });
  }

  /* Gentle idle breathing keeps the scene alive. */
  if (!reduceMotion) {
    gsap.to(".ca82-orbit-one", {
      rotation: 4,
      scale: 1.04,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".ca82-orbit-two", {
      rotation: -5,
      scale: .97,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".ca82-grid", {
      x: 12,
      y: -8,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
})();

// SECTTION 83

(() => {
  const root = document.querySelector("#en83Section");
  if (!root || !window.gsap || root.dataset.en83Ready) return;
  root.dataset.en83Ready = "true";

  const stage = root.querySelector("#en83Stage");
  const letters = [...root.querySelectorAll(".en83-letter")];
  const status = root.querySelector("#en83Status");
  const countDisplay = root.querySelector("#en83Count");
  const resetButton = root.querySelector("#en83Reset");
  const cursor = root.querySelector("#en83Cursor");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  let disturbances = 0;
  let lastX = 0;
  let lastY = 0;
  let lastMoveTime = 0;
  let velocity = 0;
  let lastHit = -1;
  let lastHitTime = 0;
  let isScattering = false;
  let isDestroyed = false;

  const quickCursorX = gsap.quickTo(cursor, "x", {
    duration: 0.18,
    ease: "power3.out"
  });
  const quickCursorY = gsap.quickTo(cursor, "y", {
    duration: 0.18,
    ease: "power3.out"
  });

  const random = (min, max) => Math.random() * (max - min) + min;

  function updateStatus(value) {
    status.textContent = value;
  }

  function updateCount() {
    disturbances += 1;
    countDisplay.textContent = String(disturbances).padStart(3, "0");
  }

  function disturbLetter(letter, index, power = 1) {
    if (reducedMotion || isScattering || isDestroyed) return;

    const now = performance.now();
    if (index === lastHit && now - lastHitTime < 100) return;

    lastHit = index;
    lastHitTime = now;
    updateCount();
    updateStatus("UNSTABLE");

    gsap.killTweensOf(letter);

    const strength = Math.min(1.8, power);
    const duration = random(0.2, 0.38);

    gsap.to(letter, {
      x: random(-34, 34) * strength,
      y: random(-28, 28) * strength,
      rotationZ: random(-24, 24) * strength,
      rotationX: random(-30, 30) * strength,
      rotationY: random(-35, 35) * strength,
      scale: random(0.88, 1.14),
      duration,
      ease: "power3.out",
      overwrite: true,
      onComplete: () => {
        if (isDestroyed) return;

        gsap.to(letter, {
          x: 0,
          y: 0,
          rotationZ: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.75,
          ease: "elastic.out(1, 0.45)",
          overwrite: true,
          onComplete: () => {
            if (!isScattering) updateStatus("STABLE");
          }
        });
      }
    });
  }

  function scatterAndRebuild() {
    if (reducedMotion || isScattering || isDestroyed) {
      if (reducedMotion) {
        gsap.set(letters, {
          clearProps: "transform,opacity"
        });
        updateStatus("STABLE");
      }
      return;
    }

    isScattering = true;
    updateCount();
    updateStatus("ENTROPY");

    letters.forEach(letter => gsap.killTweensOf(letter));

    const timeline = gsap.timeline({
      onComplete: () => {
        isScattering = false;
        updateStatus("STABLE");
      }
    });

    timeline.to(letters, {
      x: () => random(-window.innerWidth * 0.34, window.innerWidth * 0.34),
      y: () => random(-window.innerHeight * 0.28, window.innerHeight * 0.28),
      rotationZ: () => random(-140, 140),
      rotationX: () => random(-100, 100),
      rotationY: () => random(-120, 120),
      scale: () => random(0.55, 1.3),
      opacity: () => random(0.2, 0.65),
      duration: 0.55,
      ease: "power3.in",
      stagger: {
        each: 0.035,
        from: "random"
      }
    });

    timeline.to(letters, {
      x: 0,
      y: 0,
      rotationZ: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      opacity: 1,
      duration: 1.15,
      ease: "elastic.out(1, 0.42)",
      stagger: {
        each: 0.075,
        from: "center"
      }
    }, "+=0.12");

    timeline.fromTo(
      root.querySelector(".en83-word-line"),
      { scaleX: 0.15, opacity: 0.3 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      },
      "<"
    );
  }

  function onPointerMove(event) {
    if (isDestroyed || isScattering) return;

    const now = performance.now();
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    const elapsed = Math.max(16, now - lastMoveTime);
    velocity = Math.min(2.2, Math.hypot(dx, dy) / elapsed * 1.7);

    lastX = event.clientX;
    lastY = event.clientY;
    lastMoveTime = now;

    if (finePointer) {
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.15,
        overwrite: true
      });
      quickCursorX(event.clientX);
      quickCursorY(event.clientY);
    }

 if (reducedMotion) return;

    let nearest = -1;
    let nearestDistance = Infinity;

    letters.forEach((letter, index) => {
      const rect = letter.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const distance = Math.hypot(event.clientX - cx, event.clientY - cy);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    const threshold = finePointer ? 115 : 75;

    if (nearest !== -1 && nearestDistance < threshold) {
      const power = 0.7 + velocity;
      disturbLetter(letters[nearest], nearest, power);
    } else if (velocity > 1.3 && now - lastHitTime > 160) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      disturbLetter(letters[randomIndex], randomIndex, velocity * 0.65);
    }
  }

  function onPointerLeave() {
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.2,
      overwrite: true
    });
  }

  function onLetterPress(event) {
    event.stopPropagation();
    const letter = event.currentTarget;
    const index = letters.indexOf(letter);
    disturbLetter(letter, index, 1.35);
  }

  function onResetPress() {
    scatterAndRebuild();
  }

  function onStagePress(event) {
    if (event.target.closest(".en83-letter")) return;
    scatterAndRebuild();
  }

  function onVisibilityChange() {
    if (document.hidden) {
      gsap.killTweensOf(letters);
      gsap.set(letters, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 1,
        opacity: 1
      });
      isScattering = false;
      updateStatus("STABLE");
    }
  }

  const orbitOne = root.querySelector(".en83-orbit-one");
  const orbitTwo = root.querySelector(".en83-orbit-two");

  if (!reducedMotion) {
    gsap.to(orbitOne, {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    });

    gsap.to(orbitTwo, {
      rotation: -360,
      duration: 110,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    });

    gsap.from(letters, {
      y: 35,
      opacity: 0,
      duration: 1,
      stagger: 0.08,
      ease: "power3.out",
      delay: 0.2
    });

    gsap.from(
      [
        root.querySelector(".en83-header"),
        root.querySelector(".en83-coordinate"),
        root.querySelector(".en83-instruction"),
        root.querySelector(".en83-footer")
      ],
      {
        opacity: 0,
        y: 10,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.15
      }
    );
  }

  letters.forEach(letter => {
    letter.addEventListener("pointerdown", onLetterPress);
  });

  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerleave", onPointerLeave);
  stage.addEventListener("pointerdown", onStagePress);
  resetButton.addEventListener("click", onResetPress);
  document.addEventListener("visibilitychange", onVisibilityChange);

  window.addEventListener("pagehide", () => {
    isDestroyed = true;
    gsap.killTweensOf(letters);
    gsap.killTweensOf([orbitOne, orbitTwo, cursor]);
  }, { once: true });
})();

/* =============== Section 84: OBLIVION ================*/

(() => {
  const root = document.querySelector("#en84Section");
  if (!root || !window.gsap || root.dataset.en84Ready) return;
  root.dataset.en84Ready = "true";

  const canvas = root.querySelector("#en84Canvas");
  const ctx = canvas.getContext("2d");
  const word = root.querySelector("#en84Word");
  const fill = root.querySelector("#en84ProgressFill");
  const progressText = root.querySelector("#en84ProgressText");
  const scrollIndicator = root.querySelector("#en84ScrollIndicator");
  const recallButton = root.querySelector("#en84Recall");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    particles: [],
    targets: [],
    progress: 0,
    pointerX: -1000,
    pointerY: -1000,
    pointerActive: false,
    lastTime: 0,
    raf: 0,
    destroyed: false
  };

  const random = (min, max) => Math.random() * (max - min) + min;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function resizeCanvas() {
    const rect = root.getBoundingClientRect();

    state.width = rect.width;
    state.height = rect.height;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    canvas.style.width = state.width + "px";
    canvas.style.height = state.height + "px";

    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    createParticles();
    drawFrame();
  }

  function getWordTargets() {
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");
    const fontSize = Math.min(
      state.width * (state.width < 700 ? 0.14 : 0.145),
      state.width < 700 ? 105 : 272
    );

    offscreen.width = Math.ceil(state.width);
    offscreen.height = Math.ceil(state.height);

    offCtx.font = `800 ${fontSize}px Arial, Helvetica, sans-serif`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    const metrics = offCtx.measureText("OBLIVION");
    const textWidth = metrics.width;
    const x = state.width / 2;
    const y = state.height * 0.49;

    offCtx.fillStyle = "#ffffff";
    offCtx.fillText("OBLIVION", x, y);

    const imageData = offCtx.getImageData(
      0, 0, offscreen.width, offscreen.height
    ).data;

    const targets = [];
    const step = state.width < 700 ? 5 : 6;
    const left = Math.max(0, Math.floor(x - textWidth / 2 - 8));
    const right = Math.min(
      offscreen.width,
      Math.ceil(x + textWidth / 2 + 8)
    );

    for (let py = Math.max(0, Math.floor(y - fontSize)); 
         py < Math.min(offscreen.height, y + fontSize); py += step) {
      for (let px = left; px < right; px += step) {
        const alpha = imageData[(py * offscreen.width + px) * 4 + 3];
        if (alpha > 100 && Math.random() > 0.1) {
          targets.push({ x: px, y: py });
        }
      }
    }

    return targets;
  }

  function createParticles() {
    if (!state.width || !state.height) return;

    state.targets = getWordTargets();

    const count = Math.min(
      state.targets.length,
      state.width < 700 ? 1800 : 3400
    );

    state.particles = [];

    for (let i = 0; i < count; i++) {
      const target = state.targets[
        Math.floor(i * state.targets.length / count)
      ];

 state.particles.push({
        x: target.x + random(-2, 2),
        y: target.y + random(-2, 2),
        originX: target.x,
        originY: target.y,
        scatterX: random(-state.width * 0.65, state.width * 0.65),
        scatterY: random(-state.height * 0.6, state.height * 0.6),
        driftX: random(-0.7, 0.7),
        driftY: random(-1.1, 0.2),
        size: random(0.45, 1.5),
        alpha: random(0.35, 0.95),
        phase: random(0, Math.PI * 2),
        speed: random(0.3, 1.3)
      });
    }
  }

  function drawFrame(time = 0) {
    if (state.destroyed) return;

    const dt = Math.min(32, time - (state.lastTime || time));
    state.lastTime = time;

    ctx.clearRect(0, 0, state.width, state.height);

    const progress = state.progress;
    const dissolution = clamp((progress - 0.08) / 0.84, 0, 1);
    const cursorRadius = state.width < 700 ? 70 : 125;
    const elapsed = time * 0.001;

    for (const particle of state.particles) {
      const wave = Math.sin(elapsed * particle.speed + particle.phase);
      const wobble = progress > 0.03 ? wave * 3 * dissolution : 0;

      const dispersedX =
        particle.originX + particle.scatterX * dissolution +
        particle.driftX * elapsed * 20 * dissolution;
      const dispersedY =
        particle.originY + particle.scatterY * dissolution +
        particle.driftY * elapsed * 20 * dissolution;

      let x = particle.originX + (dispersedX - particle.originX) * dissolution;
      let y = particle.originY + (dispersedY - particle.originY) * dissolution;

      x += wobble;
      y += Math.cos(particle.phase + elapsed) * 1.2;

      if (state.pointerActive) {
        const dx = state.pointerX - x;
        const dy = state.pointerY - y;
        const distance = Math.hypot(dx, dy);

        if (distance < cursorRadius && distance > 0.01) {
          const force = 1 - distance / cursorRadius;
          const pull = force * (1 - dissolution * 0.55);

          x += dx * pull * 0.75;
          y += dy * pull * 0.75;

          if (dissolution > 0.15) {
            x -= dx * force * dissolution * 0.5;
            y -= dy * force * dissolution * 0.5;
          }
        }
      }

      const alpha = particle.alpha * (1 - dissolution * 0.9);
      if (alpha <= 0.015) continue;

      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#f2f0e9";
      ctx.fillRect(x, y, particle.size, particle.size);
    }

    ctx.globalAlpha = 1;

    if (!reducedMotion) {
      state.raf = requestAnimationFrame(drawFrame);
    }
  }

  function updateProgress(progress) {
    state.progress = clamp(progress, 0, 1);

    const percentage = Math.round(state.progress * 100);
    progressText.textContent = String(percentage).padStart(2, "0") + "%";

    gsap.set(fill, {
      scaleX: state.progress
    });

    gsap.set(word, {
      opacity: 1 - clamp((state.progress - 0.05) / 0.75, 0, 0.97),
      filter: `blur(${state.progress * 4}px)`
    });

    gsap.set(scrollIndicator, {
      opacity: state.progress > 0.08 ? 0.25 : 1
    });

    if (reducedMotion) drawFrame();
  }

  function onPointerMove(event) {
    const rect = root.getBoundingClientRect();
    state.pointerX = event.clientX - rect.left;
    state.pointerY = event.clientY - rect.top;
    state.pointerActive = true;
  }

  function onPointerLeave() {
    state.pointerActive = false;
    state.pointerX = -1000;
    state.pointerY = -1000;
  }

  function recallMemory() {
    if (reducedMotion) {
      updateProgress(0);
      return;
    }

    gsap.to(state, {
      progress: 0,
      duration: 1.3,
      ease: "power3.inOut",
      onUpdate: () => updateProgress(state.progress)
    });

    gsap.to(window, {
      scrollTo: { y: root, offsetY: 0 },
      duration: 1.1,
      ease: "power2.inOut",
      onComplete: () => {
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      }
    });
  }

  resizeCanvas();

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "+=160%",
      pin: true,
      scrub: 0.8,
      onUpdate: self => updateProgress(self.progress)
    });
  } else {
    gsap.to(state, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      onUpdate: () => updateProgress(state.progress)
    });
  }

  if (!reducedMotion) {
    state.raf = requestAnimationFrame(drawFrame);

    gsap.from(root.querySelector(".en84-header"), {
      opacity: 0,
      y: -12,
      duration: 0.8,
      ease: "power2.out"
    });

    gsap.from(
      [
        root.querySelector(".en84-overline"),
        root.querySelector(".en84-subtitle"),
        root.querySelector(".en84-progress"),
        root.querySelector(".en84-bottom")
      ],
      {
        opacity: 0,
        y: 12,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.15,
        ease: "power2.out"
      }
    );
  }

  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerleave", onPointerLeave);
  recallButton.addEventListener("click", recallMemory);

  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 120);
  }

  window.addEventListener("resize", onResize);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(state.raf);
    } else if (!reducedMotion && !state.destroyed) {
      state.lastTime = 0;
      state.raf = requestAnimationFrame(drawFrame);
    }
  });

window.addEventListener("pagehide", () => {
    state.destroyed = true;
    cancelAnimationFrame(state.raf);
    clearTimeout(resizeTimer);
  }, { once: true });
})();
/* =================== SECTION 85: ECHO ============================ */

(() => {
  const root = document.querySelector("#en85Section");
  if (!root || !window.gsap || root.dataset.en85Ready) return;
  root.dataset.en85Ready = "true";

  const stage = root.querySelector("#en85Stage");
  const word = root.querySelector("#en85Word");
  const echoes = [...root.querySelectorAll(".en85-echo")];
  const stateLabel = root.querySelector("#en85State");
  const progressFill = root.querySelector("#en85Progress");
  const percentLabel = root.querySelector("#en85Percent");
  const replayButton = root.querySelector("#en85Replay");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const state = {
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0,
    scrollProgress: 0,
    destroyed: false
  };

  let moveFrame = 0;
  let activeTimeline = null;

  const xTo = gsap.quickTo(word, "x", {
    duration: 0.35,
    ease: "power3.out"
  });

  const yTo = gsap.quickTo(word, "y", {
    duration: 0.35,
    ease: "power3.out"
  });

  const rotateTo = gsap.quickTo(word, "rotationY", {
    duration: 0.4,
    ease: "power3.out"
  });

  function setProgress(progress) {
    state.scrollProgress = progress;

    const percent = Math.round(progress * 100);
    percentLabel.textContent = String(percent).padStart(2, "0") + "%";

    gsap.set(progressFill, {
      scaleX: progress
    });

    if (progress < 0.08) {
      stateLabel.textContent = "ONE MOMENT";
    } else if (progress < 0.45) {
      stateLabel.textContent = "MULTIPLE FRAMES";
    } else if (progress < 0.88) {
      stateLabel.textContent = "TIME DISTORTED";
    } else {
      stateLabel.textContent = "RECOLLECTION";
    }
  }

  function onPointerMove(event) {
    if (reducedMotion || state.destroyed) return;

    const rect = stage.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;

    state.targetX = (nx - 0.5) * 2;
    state.targetY = (ny - 0.5) * 2;

    if (moveFrame) return;

    moveFrame = requestAnimationFrame(() => {
      moveFrame = 0;

      const px = state.targetX;
      const py = state.targetY;

      xTo(px * 15);
      yTo(py * 8);
      rotateTo(px * -5);

      echoes.forEach((echo, index) => {
        const depth = Number(echo.dataset.depth);
        gsap.to(echo, {
          x: px * depth * -10,
          y: py * depth * -4,
          rotationY: px * depth * -1.3,
          duration: 0.5 + index * 0.06,
          ease: "power3.out",
          overwrite: "auto"
        });
      });
    });
  }

function onPointerLeave() {
    if (reducedMotion) return;

    xTo(0);
    yTo(0);
    rotateTo(0);

    echoes.forEach(echo => {
      gsap.to(echo, {
        x: 0,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  }

  function replay() {
    if (reducedMotion) {
      setProgress(0);
      gsap.set([word, ...echoes], {
        clearProps: "transform,opacity,filter"
      });
      return;
    }

    if (activeTimeline) activeTimeline.kill();

    activeTimeline = gsap.timeline();

    activeTimeline
      .to(echoes, {
        opacity: 0,
        x: 0,
        y: 0,
        rotationY: 0,
        duration: 0.35,
        stagger: 0.035,
        ease: "power2.in"
      })
      .to(word, {
        x: 0,
        y: 0,
        rotationY: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.65,
        ease: "power3.out"
      }, "<");

if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en85Scroll");
      if (trigger) {
        window.scrollTo({
          top: root.getBoundingClientRect().top + window.scrollY,
          behavior: "smooth"
        });
      }
    }
  }

  if (!reducedMotion) {
    gsap.set(echoes, {
      opacity: 0,
      scale: 1,
      x: 0,
      y: 0
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        id: "en85Scroll",
        trigger: root,
        start: "top top",
        end: "+=150%",
        scrub: 0.8,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: self => setProgress(self.progress)
      }
    });

    timeline
      .to(word, {
        scale: 0.8,
        letterSpacing: "-0.12em",
        duration: 0.2,
        ease: "power2.inOut"
      }, 0)
      .to(echoes, {
        opacity: (index) => 0.12 + index * 0.105,
        scale: (index) => 1 + index * 0.065,
        x: (index) => (index - 2) * 28,
        y: (index) => (index - 2) * 12,
        duration: 0.35,
        stagger: 0.025,
        ease: "power2.out"
      }, 0.12)
      .to(echoes, {
        x: (index) => (index - 2) * 115,
        y: (index) => (index - 2) * 42,
        rotationY: (index) => (index - 2) * 12,
        opacity: (index) => 0.32 - Math.abs(index - 2) * 0.055,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.inOut"
      }, 0.48)
      .to(word, {
        scale: 0.7,
        opacity: 0.12,
        filter: "blur(5px)",
        duration: 0.25,
        ease: "power2.in"
      }, 0.58)
      .to(echoes, {
        x: 0,
        y: 0,
        rotationY: 0,
        scale: 1,
        opacity: 0,
        duration: 0.28,
        stagger: 0.025,
        ease: "power3.inOut"
      }, 0.74)
      .to(word, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        letterSpacing: "-0.09em",
        duration: 0.25,
        ease: "power3.out"
      }, 0.78);
  } else {
    setProgress(0);
  }

  gsap.from(
    [
      root.querySelector(".en85-header"),
      root.querySelector(".en85-top-meta"),
      root.querySelector(".en85-footer")
    ],
    {
      opacity: 0,
      y: 10,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out"
    }
  );

  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerleave", onPointerLeave);
  replayButton.addEventListener("click", replay);

  window.addEventListener("pagehide", () => {
    state.destroyed = true;
    if (moveFrame) cancelAnimationFrame(moveFrame);
    if (activeTimeline) activeTimeline.kill();

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en85Scroll");
      if (trigger) trigger.kill();
    }
  }, { once: true });
})();



/* ==================== SECTION 86 Sigularity ========================= */

(() => {
  const root = document.querySelector("#en86Section");
  if (!root || !window.gsap || root.dataset.en86Ready) return;
  root.dataset.en86Ready = "true";

  const stage = root.querySelector("#en86Stage");
  const canvas = root.querySelector("#en86Canvas");
  const ctx = canvas.getContext("2d");
  const letters = [...root.querySelectorAll(".en86-letter")];
  const rings = [...root.querySelectorAll(".en86-ring")];
  const core = root.querySelector("#en86Core");
  const flash = root.querySelector("#en86Flash");
  const status = root.querySelector("#en86Status");
  const progress = root.querySelector("#en86Progress");
  const percent = root.querySelector("#en86Percent");
  const resetButton = root.querySelector("#en86Reset");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    progress: 0,
    pointerX: 0,
    pointerY: 0,
    pointerActive: false,
    particles: [],
    raf: 0,
    lastTime: 0,
    destroyed: false
  };

  let collapseTimeline = null;
  let moveFrame = 0;

  const random = (min, max) => Math.random() * (max - min) + min;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function createParticles() {
    state.particles = [];

    const count = window.innerWidth < 700 ? 100 : 200;

    for (let i = 0; i < count; i++) {
      const angle = random(0, Math.PI * 2);
      const distance = random(50, Math.max(state.width, state.height) * .7);

      state.particles.push({
        x: state.width / 2 + Math.cos(angle) * distance,
        y: state.height / 2 + Math.sin(angle) * distance,
        vx: random(-.25, .25),
        vy: random(-.25, .25),
        size: random(.5, 1.5),
        alpha: random(.15, .65),
        phase: random(0, Math.PI * 2)
      });
    }
  }

  function resize() {
    const rect = root.getBoundingClientRect();

    state.width = rect.width;
    state.height = rect.height;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    canvas.style.width = state.width + "px";
    canvas.style.height = state.height + "px";

    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    createParticles();
    draw(0);
  }

  function draw(time = 0) {
    if (state.destroyed) return;

    ctx.clearRect(0, 0, state.width, state.height);

    const centerX = state.width / 2;
    const centerY = state.height / 2;
    const collapse = state.progress;
    const dt = Math.min(2, (time - (state.lastTime || time)) / 16.67 || 1);
    state.lastTime = time;

    for (const p of state.particles) {
      if (!reducedMotion) {
        p.phase += .005 * dt;

        if (collapse > .01) {
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const distance = Math.hypot(dx, dy) || 1;
          const force = .003 + collapse * .06;

          p.vx += dx / distance * force * dt;
          p.vy += dy / distance * force * dt;
        } else {
          p.vx += Math.sin(p.phase) * .003 * dt;
          p.vy += Math.cos(p.phase) * .003 * dt;
        }

        if (state.pointerActive) {
          const dx = state.pointerX - p.x;
          const dy = state.pointerY - p.y;
          const distance = Math.hypot(dx, dy) || 1;

          if (distance < 150) {
            const force = (1 - distance / 150) * .055;
            p.vx += dx / distance * force * dt;
            p.vy += dy / distance * force * dt;
          }
        }

        p.vx *= .985;
        p.vy *= .985;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }

      ctx.globalAlpha = p.alpha * (1 - collapse * .6);
      ctx.fillStyle = "#f4f3ee";
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    ctx.globalAlpha = 1;

    if (!reducedMotion) {
      state.raf = requestAnimationFrame(draw);
    }
  }
function updateProgress(value) {
    state.progress = clamp(value, 0, 1);

    const p = state.progress;
    percent.textContent = String(Math.round(p * 100)).padStart(2, "0") + "%";

    gsap.set(progress, { scaleX: p });

    if (p < .1) {
      status.textContent = "FIELD STABLE";
    } else if (p < .45) {
      status.textContent = "GRAVITY INCREASING";
    } else if (p < .8) {
      status.textContent = "COLLAPSE IMMINENT";
    } else {
      status.textContent = "SINGULARITY";
    }

    if (reducedMotion) draw(0);
  }

  function onPointerMove(event) {
    const rect = stage.getBoundingClientRect();

    state.pointerX = event.clientX - rect.left;
    state.pointerY = event.clientY - rect.top;
    state.pointerActive = true;

    if (reducedMotion || moveFrame) return;

    moveFrame = requestAnimationFrame(() => {
      moveFrame = 0;

      const cx = state.width / 2;
      const cy = state.height / 2;
      const px = state.pointerX - cx;
      const py = state.pointerY - cy;

      letters.forEach((letter, index) => {
        const rect = letter.getBoundingClientRect();
        const lx = rect.left + rect.width / 2 - (window.innerWidth / 2);
        const ly = rect.top + rect.height / 2 - (window.innerHeight / 2);

        const dx = state.pointerX + stage.getBoundingClientRect().left - window.innerWidth / 2 - lx;
        const dy = state.pointerY + stage.getBoundingClientRect().top - window.innerHeight / 2 - ly;
        const distance = Math.hypot(dx, dy);
        const influence = clamp(1 - distance / 260, 0, 1);

        gsap.to(letter, {
          x: -px * .04 * influence,
          y: -py * .04 * influence,
          rotationY: dx * .035 * influence,
          duration: .35,
          ease: "power3.out",
          overwrite: "auto"
        });
      });

      gsap.to(rings, {
        rotation: px * .015,
        scale: 1 + clamp(Math.hypot(px, py) / 1200, 0, .06),
        duration: .5,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  }

  function onPointerLeave() {
    state.pointerActive = false;

    if (reducedMotion) return;

    gsap.to(letters, {
      x: 0,
      y: 0,
      rotationY: 0,
      duration: .7,
      ease: "elastic.out(1, .6)",
      overwrite: "auto"
    });

    gsap.to(rings, {
      rotation: 0,
      scale: 1,
      duration: .8,
      ease: "power3.out",
      overwrite: "auto"
    });
  }

  function collapseAndReveal() {
    if (reducedMotion) {
      gsap.set(letters, {
        clearProps: "transform,opacity"
      });
      gsap.set(core, { opacity: 0, scale: .2 });
      updateProgress(0);
      return;
    }

    if (collapseTimeline) collapseTimeline.kill();

    gsap.killTweensOf(letters);
    gsap.killTweensOf([core, flash, rings]);

    collapseTimeline = gsap.timeline({
      onComplete: () => {
        updateProgress(0);
      }
    });

    collapseTimeline
      .to(status, {
        opacity: .25,
        duration: .2,
        yoyo: true,
        repeat: 1
      }, 0)
      .to(letters, {
        x: (index, target) => {
          const rect = target.getBoundingClientRect();
          return state.width / 2 - (rect.left + rect.width / 2);
        },
        y: (index, target) => {
          const rect = target.getBoundingClientRect();
          return state.height / 2 - (rect.top + rect.height / 2);
        },
        scale: .01,
        rotationZ: (index) => (index % 2 ? 180 : -180),
        opacity: 0,
        duration: 1.05,
        ease: "power4.in",
        stagger: .025
      }, 0)
      .to(rings, {
        scale: .1,
        opacity: 0,
        duration: .95,
        ease: "power3.in"
      }, 0)
      .to(core, {
        opacity: 1,
        scale: 2.8,
        duration: .2,
        ease: "power2.out"
      }, .85)
      .to(flash, {
        opacity: .9,
        scale: 25,
        duration: .18,
        ease: "power2.out"
      }, 1.05)
      .to(flash, {
        opacity: 0,
        scale: 1,
        duration: .5,
        ease: "power2.in"
      }, 1.2)
      .to(core, {
        opacity: 0,
        scale: .1,
        duration: .3
      }, 1.25)
      .to(letters, {
        x: 0,
        y: 0,
        scale: 1,
        rotationZ: 0,
        rotationY: 0,
        opacity: 1,
        duration: .85,
        ease: "elastic.out(1, .65)",
        stagger: {
          each: .04,
          from: "center"
        }
      }, 1.55)
      .to(rings, {
        scale: 1,
        opacity: 1,
        duration: .8,
        ease: "power3.out"
      }, 1.65);
  }

  function resetSection() {
    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en86Scroll");
      if (trigger) {
        trigger.scroll(0);
        trigger.update();
      }
    }

    collapseAndReveal();
  }

  resize();

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({
      scrollTrigger: {
        id: "en86Scroll",
        trigger: root,
        start: "top top",
        end: "+=170%",
        pin: true,
        scrub: .8,
        invalidateOnRefresh: true,
        onUpdate: self => updateProgress(self.progress)
      }
    })
    .to(letters, {
      x: (index, target) => {
        const rect = target.getBoundingClientRect();
        return state.width / 2 - (rect.left + rect.width / 2);
      },
      y: (index, target) => {
        const rect = target.getBoundingClientRect();
        return state.height / 2 - (rect.top + rect.height / 2);
      },
      scale: .02,
      opacity: .08,
      rotationZ: (index) => (index % 2 ? 120 : -120),
      stagger: {
        each: .025,
        from: "edges"
      },
      duration: .7,
      ease: "power3.in"
    }, .25)
    .to(rings, {
      scale: .15,
      opacity: 0,
      duration: .7,
      ease: "power3.in"
    }, .3)
    .to(core, {
      opacity: 1,
      scale: 3,
      duration: .15
    }, .8)
    .to(letters, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      rotationZ: 0,
      duration: .5,
      stagger: {
        each: .025,
        from: "center"
      },
      ease: "power3.out"
    }, .88)
    .to(rings, {
      scale: 1,
      opacity: 1,
      duration: .5
    }, .88)
    .to(core, {
      opacity: 0,
      scale: .2,
      duration: .25
    }, .9);
  }

  if (!reducedMotion) {
    state.raf = requestAnimationFrame(draw);

    gsap.from(root.querySelector(".en86-header"), {
      opacity: 0,
      y: -12,
      duration: .8,
      ease: "power2.out"
    });

    gsap.from(
      [
        root.querySelector(".en86-top-meta"),
        root.querySelector(".en86-caption"),
        root.querySelector(".en86-hint"),
        root.querySelector(".en86-footer")
      ],
      {
        opacity: 0,
        y: 10,
        duration: .8,
        stagger: .12,
        delay: .15,
        ease: "power2.out"
      }
    );

    gsap.to(rings[1], {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: "none"
    });

    gsap.to(rings[2], {
      rotation: -360,
      duration: 110,
      repeat: -1,
      ease: "none"
    });
  }

  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerleave", onPointerLeave);
  resetButton.addEventListener("click", resetSection);

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 120);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(state.raf);
    } else if (!reducedMotion && !state.destroyed) {
      state.lastTime = 0;
      state.raf = requestAnimationFrame(draw);
    }
  });

  window.addEventListener("pagehide", () => {
    state.destroyed = true;
    cancelAnimationFrame(state.raf);
    if (moveFrame) cancelAnimationFrame(moveFrame);
    if (collapseTimeline) collapseTimeline.kill();

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en86Scroll");
      if (trigger) trigger.kill();
    }
  }, { once: true });
})();


/* =========== SECTION 87 INFINITY ================= */

(() => {
  const root = document.querySelector("#en87Section");
  if (!root || !window.gsap || root.dataset.en87Ready) return;
  root.dataset.en87Ready = "true";

  const stage = root.querySelector("#en87Stage");
  const world = root.querySelector("#en87World");
  const tunnel = root.querySelector("#en87Tunnel");
  const layers = [...root.querySelectorAll(".en87-layer")];
  const status = root.querySelector("#en87Status");
  const progressBar = root.querySelector("#en87Progress");
  const percentLabel = root.querySelector("#en87Percent");
  const resetButton = root.querySelector("#en87Reset");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let pointerX = 0;
  let pointerY = 0;
  let moveFrame = 0;
  let currentProgress = 0;
  let destroyed = false;
  let scrollTimeline = null;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function layoutTunnel() {
    const isMobile = window.innerWidth < 700;
    const spacing = isMobile ? 105 : 145;

    layers.forEach((layer, index) => {
      const depth = Number(layer.dataset.depth);
      const z = -depth * spacing;
      const scale = Math.max(.25, 1 - depth * .055);

      gsap.set(layer, {
        z,
        scale,
        opacity: index === 0 ? 1 : Math.max(.06, .52 - depth * .038),
        zIndex: layers.length - index
      });
    });
  }

  function updateProgress(progress) {
    currentProgress = clamp(progress, 0, 1);

    percentLabel.textContent =
      String(Math.round(currentProgress * 100)).padStart(2, "0") + "%";

    gsap.set(progressBar, { scaleX: currentProgress });

    if (currentProgress < .12) {
      status.textContent = "DEPTH: 000";
    } else if (currentProgress < .45) {
      status.textContent = "DEPTH: 128";
    } else if (currentProgress < .8) {
      status.textContent = "DEPTH: 512";
    } else {
      status.textContent = "DEPTH: ∞";
    }
  }

  function onPointerMove(event) {
    if (reducedMotion || destroyed || moveFrame) return;

    const rect = stage.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - .5) * 2;

    moveFrame = requestAnimationFrame(() => {
      moveFrame = 0;

      gsap.to(world, {
        rotationY: pointerX * 7,
        rotationX: -pointerY * 5,
        x: pointerX * 12,
        y: pointerY * 8,
        duration: .6,
        ease: "power3.out",
        overwrite: "auto"
      });

layers.forEach((layer, index) => {
        const depth = Number(layer.dataset.depth);
        const intensity = 1 + depth * .12;

        gsap.to(layer, {
          xPercent: -50 + pointerX * intensity * 1.6,
          yPercent: -50 + pointerY * intensity,
          duration: .6 + depth * .025,
          ease: "power3.out",
          overwrite: "auto"
        });
      });
    });
  }

  function onPointerLeave() {
    if (reducedMotion) return;

    gsap.to(world, {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      duration: .8,
      ease: "power3.out",
      overwrite: "auto"
    });

    layers.forEach(layer => {
      gsap.to(layer, {
        xPercent: -50,
        yPercent: -50,
        duration: .8,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  }

  function resetTunnel() {
    if (reducedMotion) {
      updateProgress(0);
      layoutTunnel();
      return;
    }

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en87Scroll");
      if (trigger) {
        window.scrollTo({
          top: root.getBoundingClientRect().top + window.scrollY,
          behavior: "smooth"
        });
      }
    }

    gsap.to(world, {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      duration: .9,
      ease: "power3.out",
      overwrite: "auto"
    });

    layoutTunnel();
  }

  layoutTunnel();
 if (!reducedMotion && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        id: "en87Scroll",
        trigger: root,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: .8,
        invalidateOnRefresh: true,
        onUpdate: self => updateProgress(self.progress)
      }
    });

    scrollTimeline
      .to(layers, {
        z: (index) => 500 + index * 24,
        scale: (index) => 1.2 + index * .045,
        opacity: 1,
        duration: .42,
        stagger: {
          each: .015,
          from: "start"
        },
        ease: "power2.in"
      }, 0)
      .to(world, {
        rotationY: 8,
        rotationX: -4,
        duration: .4,
        ease: "power2.inOut"
      }, .18)
      .to(layers, {
        z: (index) => -index * 145,
        scale: (index) => Math.max(.25, 1 - index * .055),
        opacity: (index) => index === 0 ? 1 : Math.max(.06, .52 - index * .038),
        duration: .4,
        stagger: {
          each: .012,
          from: "end"
        },
        ease: "power3.out"
      }, .62)
      .to(world, {
        rotationY: 0,
        rotationX: 0,
        duration: .25,
        ease: "power2.out"
      }, .72);
  }

  if (!reducedMotion) {
    gsap.from(
      [
        root.querySelector(".en87-header"),
        root.querySelector(".en87-meta"),
        root.querySelector(".en87-caption"),
        root.querySelector(".en87-footer")
      ],
      {
        opacity: 0,
        y: 12,
        duration: .8,
        stagger: .1,
        ease: "power2.out"
      }
    );

    gsap.to(layers[1], {
      opacity: .65,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerleave", onPointerLeave);
  resetButton.addEventListener("click", resetTunnel);

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      layoutTunnel();

      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, 120);
  });

  window.addEventListener("pagehide", () => {
    destroyed = true;

    if (moveFrame) cancelAnimationFrame(moveFrame);
    if (scrollTimeline) scrollTimeline.kill();

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en87Scroll");
      if (trigger) trigger.kill();
    }
  }, { once: true });
})();

/* ======================== SECTION 88: PARADOX ========================= */
(() => {
  const root = document.querySelector("#en88Section");
  if (!root || !window.gsap || root.dataset.en88Ready) return;
  root.dataset.en88Ready = "true";

  const stage = root.querySelector("#en88Stage");
  const composition = root.querySelector("#en88Composition");
  const topHalf = root.querySelector("#en88Top");
  const bottomHalf = root.querySelector("#en88Bottom");
  const topLetters = [...root.querySelectorAll(".en88-word-top span")];
  const bottomLetters = [...root.querySelectorAll(".en88-word-bottom span")];
  const status = root.querySelector("#en88Status");
  const progressBar = root.querySelector("#en88Progress");
  const percentLabel = root.querySelector("#en88Percent");
  const resetButton = root.querySelector("#en88Reset");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let moveFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  let destroyed = false;
  let scrollTimeline = null;

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

  function updateProgress(progress) {
    const p = clamp(progress, 0, 1);

    percentLabel.textContent =
      String(Math.round(p * 100)).padStart(2, "0") + "%";

    gsap.set(progressBar, { scaleX: p });

    if (p < .12) {
      status.textContent = "REALITY: STABLE";
    } else if (p < .4) {
      status.textContent = "REALITY: SPLITTING";
    } else if (p < .8) {
      status.textContent = "REALITY: CONTRADICTORY";
    } else {
      status.textContent = "REALITY: COLLAPSED";
    }
  }

  function onPointerMove(event) {
    if (reducedMotion || destroyed || moveFrame) return;

    const rect = stage.getBoundingClientRect();

    pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - .5) * 2;

    moveFrame = requestAnimationFrame(() => {
      moveFrame = 0;

      gsap.to(composition, {
        rotationY: pointerX * 9,
        rotationX: -pointerY * 7,
        x: pointerX * 10,
        duration: .45,
        ease: "power3.out",
        overwrite: "auto"
      });

      gsap.to(topHalf, {
        rotationX: -pointerY * 14,
        x: pointerX * 12,
        duration: .4,
        ease: "power3.out",
        overwrite: "auto"
      });

      gsap.to(bottomHalf, {
        rotationX: 180 + pointerY * 14,
        x: -pointerX * 12,
        duration: .4,
        ease: "power3.out",
        overwrite: "auto"
      });

      topLetters.forEach((letter, index) => {
        const center = (index - (topLetters.length - 1) / 2);
        const influence = pointerX * center * 1.5;

        gsap.to(letter, {
          y: pointerY * (index % 2 ? 8 : -8),
          rotationY: influence,
          duration: .35,
          ease: "power3.out",
          overwrite: "auto"
        });
      });


 bottomLetters.forEach((letter, index) => {
        const center = (index - (bottomLetters.length - 1) / 2);

        gsap.to(letter, {
          y: -pointerY * (index % 2 ? 8 : -8),
          rotationY: -pointerX * center * 1.5,
          duration: .35,
          ease: "power3.out",
          overwrite: "auto"
        });
      });
    });
  }

  function onPointerLeave() {
    if (reducedMotion) return;

    gsap.to(composition, {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      duration: .7,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to(topHalf, {
      rotationX: 0,
      x: 0,
      duration: .7,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to(bottomHalf, {
      rotationX: 0,
      x: 0,
      duration: .7,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to([...topLetters, ...bottomLetters], {
      y: 0,
      rotationY: 0,
      duration: .7,
      ease: "elastic.out(1, .6)",
      overwrite: "auto"
    });
  }

  function restoreReality() {
    if (reducedMotion) {
      gsap.set(
        [composition, topHalf, bottomHalf, ...topLetters, ...bottomLetters],
        { clearProps: "transform" }
      );
      updateProgress(0);
      return;
    }

    onPointerLeave();

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en88Scroll");
      if (trigger) {
        window.scrollTo({
          top: root.getBoundingClientRect().top + window.scrollY,
          behavior: "smooth"
        });
      }
    }
  }

  gsap.set(bottomHalf, {
    rotationX: 0,
    transformOrigin: "center top"
  });

  if (!reducedMotion && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        id: "en88Scroll",
        trigger: root,
        start: "top top",
        end: "+=170%",
        pin: true,
        scrub: .8,
        invalidateOnRefresh: true,
        onUpdate: self => updateProgress(self.progress)
      }
    });

    scrollTimeline
      .to(topHalf, {
        rotationX: 45,
        y: -35,
        duration: .3,
        ease: "power2.inOut"
      }, 0)
      .to(bottomHalf, {
        rotationX: 135,
        y: 35,
        duration: .3,
        ease: "power2.inOut"
      }, 0)
      .to(topLetters, {
        x: (index) => (index - 3) * -18,
        rotationY: (index) => (index % 2 ? 65 : -65),
        scaleX: .8,
        duration: .3,
        stagger: .02,
        ease: "power2.inOut"
      }, .2)
      .to(bottomLetters, {
        x: (index) => (index - 3) * 18,
        rotationY: (index) => (index % 2 ? -65 : 65),
        scaleX: .8,
        duration: .3,
        stagger: .02,
        ease: "power2.inOut"
      }, .2)
      .to(composition, {
        rotationY: 180,
        scale: .75,
        duration: .3,
        ease: "power2.inOut"
      }, .45)
      .to(topHalf, {
        rotationX: 0,
        y: 0,
        duration: .25,
        ease: "power3.out"
      }, .72)
      .to(bottomHalf, {
        rotationX: 0,
        y: 0,
        duration: .25,
        ease: "power3.out"
      }, .72)
      .to([...topLetters, ...bottomLetters], {
        x: 0,
        rotationY: 0,
        scaleX: 1,
        duration: .25,
        stagger: .015,
        ease: "power3.out"
      }, .74)
      .to(composition, {
        rotationY: 0,
        scale: 1,
        duration: .25,
        ease: "power3.out"
      }, .76);
  }

  if (!reducedMotion) {
    gsap.from(
      [
        root.querySelector(".en88-header"),
        root.querySelector(".en88-meta"),
        root.querySelector(".en88-caption"),
        root.querySelector(".en88-footer")
      ],
      {
        opacity: 0,
        y: 10,
        duration: .8,
        stagger: .1,
        ease: "power2.out"
      }
    );

    gsap.from([...topLetters], {
      y: 30,
      opacity: 0,
      duration: .8,
      stagger: .045,
      ease: "power3.out",
      delay: .15
    });
gsap.from([...bottomLetters], {
      y: -20,
      opacity: 0,
      duration: .8,
      stagger: .045,
      ease: "power3.out",
      delay: .25
    });
  }

  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerleave", onPointerLeave);
  resetButton.addEventListener("click", restoreReality);

  window.addEventListener("resize", () => {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });

  window.addEventListener("pagehide", () => {
    destroyed = true;
    if (moveFrame) cancelAnimationFrame(moveFrame);
    if (scrollTimeline) scrollTimeline.kill();

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en88Scroll");
      if (trigger) trigger.kill();
    }
  }, { once: true });
})();

/* ======================== SECTION 89: FRACTION ========================= */

(() => {
  const root = document.querySelector("#en89Section");
  if (!root || !window.gsap || root.dataset.en89Ready) return;
  root.dataset.en89Ready = "true";

  const stage = root.querySelector("#en89Stage");
  const world = root.querySelector("#en89World");
  const layers = [...root.querySelectorAll(".en89-layer")];
  const status = root.querySelector("#en89Status");
  const progressBar = root.querySelector("#en89Progress");
  const percentLabel = root.querySelector("#en89Percent");
  const resetButton = root.querySelector("#en89Reset");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let pointerX = 0;
  let pointerY = 0;
  let moveFrame = 0;
  let destroyed = false;
  let scrollTimeline = null;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function layoutLayers() {
    const isMobile = window.innerWidth < 700;

    layers.forEach((layer, index) => {
      const depth = Number(layer.className.match(/en89-layer-(\d+)/)?.[1] || 0);
      const scale = Math.max(.12, 1 - depth * (isMobile ? .073 : .065));
      const z = -depth * (isMobile ? 95 : 135);

      gsap.set(layer, {
        xPercent: -50,
        yPercent: -50,
        z,
        scale,
        rotationZ: depth % 2 ? 1.2 : -1.2,
        opacity: depth === 0 ? 1 : Math.max(.07, .52 - depth * .037),
        zIndex: layers.length - index
      });
    });
  }

  function updateProgress(value) {
    const p = clamp(value, 0, 1);

    percentLabel.textContent =
      String(Math.round(p * 100)).padStart(2, "0") + "%";

    gsap.set(progressBar, { scaleX: p });

    if (p < .12) {
      status.textContent = "PATTERN: ORIGINAL";
    } else if (p < .4) {
      status.textContent = "PATTERN: REPLICATING";
    } else if (p < .78) {
      status.textContent = "PATTERN: RECURSIVE";
    } else {
      status.textContent = "PATTERN: INFINITE";
    }
  }

  function onPointerMove(event) {
    if (reducedMotion || destroyed || moveFrame) return;

    const rect = stage.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - .5) * 2;

    moveFrame = requestAnimationFrame(() => {
      moveFrame = 0;

      gsap.to(world, {
        rotationY: pointerX * 7,
        rotationX: -pointerY * 5,
        x: pointerX * 10,
        y: pointerY * 7,
        duration: .55,
        ease: "power3.out",
        overwrite: "auto"
      });

      layers.forEach((layer, index) => {
        const depth = Number(
          layer.className.match(/en89-layer-(\d+)/)?.[1] || 0
        );

        gsap.to(layer, {
          xPercent: -50 + pointerX * depth * .8,
          yPercent: -50 + pointerY * depth * .45,
          rotationZ: (depth % 2 ? 1 : -1) * 1.2 + pointerX * depth * .35,
          duration: .5 + depth * .025,
          ease: "power3.out",
          overwrite: "auto"
        });
      });
    });
  }
  function onPointerLeave() {
    if (reducedMotion) return;

    gsap.to(world, {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      duration: .8,
      ease: "power3.out",
      overwrite: "auto"
    });

    layers.forEach((layer, index) => {
      const depth = Number(
        layer.className.match(/en89-layer-(\d+)/)?.[1] || 0
      );

      gsap.to(layer, {
        xPercent: -50,
        yPercent: -50,
        rotationZ: depth % 2 ? 1.2 : -1.2,
        duration: .8,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  }

  function resetPattern() {
    onPointerLeave();

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en89Scroll");
      if (trigger) {
        window.scrollTo({
          top: root.getBoundingClientRect().top + window.scrollY,
          behavior: "smooth"
        });
      }
    }

    layoutLayers();
    updateProgress(0);
  }

  layoutLayers();

  if (!reducedMotion && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        id: "en89Scroll",
        trigger: root,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: .8,
        invalidateOnRefresh: true,
        onUpdate: self => updateProgress(self.progress)
      }
    });

    scrollTimeline
      .to(layers, {
        z: (index) => 240 + index * 35,
        scale: (index) => 1.35 + index * .09,
        opacity: 1,
        rotationZ: (index) => index % 2 ? 7 : -7,
        duration: .4,
        stagger: {
          each: .015,
          from: "start"
        },
        ease: "power2.in"
      }, 0)
      .to(world, {
        rotationY: 12,
        rotationX: -8,
        scale: .9,
        duration: .35,
        ease: "power2.inOut"
      }, .25)
      .to(layers, {
        z: (index) => -index * (window.innerWidth < 700 ? 95 : 135),
        scale: (index) => Math.max(
          .12,
          1 - index * (window.innerWidth < 700 ? .073 : .065)
        ),
        rotationZ: (index) => index % 2 ? 1.2 : -1.2,
        opacity: (index) => index === 0 ? 1 : Math.max(.07, .52 - index * .037),
        duration: .4,
        stagger: {
          each: .012,
          from: "end"
        },
        ease: "power3.out"
      }, .62)
      .to(world, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: .25,
        ease: "power2.out"
      }, .78);
  }

  if (!reducedMotion) {
    gsap.from(
      [
        root.querySelector(".en89-header"),
        root.querySelector(".en89-meta"),
        root.querySelector(".en89-caption"),
        root.querySelector(".en89-footer")
      ],
      {
        opacity: 0,
        y: 10,
        duration: .8,
        stagger: .1,
        ease: "power2.out"
      }
    );

    gsap.to(layers[1], {
      opacity: .7,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
 root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerleave", onPointerLeave);
  resetButton.addEventListener("click", resetPattern);

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      layoutLayers();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 120);
  });

  window.addEventListener("pagehide", () => {
    destroyed = true;
    if (moveFrame) cancelAnimationFrame(moveFrame);
    if (scrollTimeline) scrollTimeline.kill();

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en89Scroll");
      if (trigger) trigger.kill();
    }
  }, { once: true });
})();


/* =======================================================
     INIT
  ======================================================= */

  resize();

  render();

})();

/* ======================SECTION 90 ======================== */

(() => {
  const root = document.querySelector("#en90Section");

  if (!root || !window.gsap || root.dataset.en90Ready) return;
  root.dataset.en90Ready = "true";

  const stage = root.querySelector("#en90Stage");
  const field = root.querySelector("#en90EchoField");
  const echoes = [...root.querySelectorAll(".en90-echo")];
  const status = root.querySelector("#en90Status");
  const progressBar = root.querySelector("#en90Progress");
  const percentLabel = root.querySelector("#en90Percent");
  const resetButton = root.querySelector("#en90Reset");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let pointerX = 0;
  let pointerY = 0;
  let moveFrame = 0;
  let scrollTimeline = null;
  let destroyed = false;

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

  function getDepth(element) {
    const match = element.className.match(/en90-echo-(\d+)/);
    return match ? Number(match[1]) : 0;
  }

  function layoutEchoes() {
    const mobile = window.innerWidth < 700;

    echoes.forEach((echo) => {
      const depth = getDepth(echo);

      gsap.set(echo, {
        xPercent: -50,
        yPercent: -50,
        x: depth * (mobile ? -7 : -15),
        y: depth * (mobile ? 4 : 8),
        scale: 1 - depth * .045,
        rotationZ: depth % 2 ? -.8 : .8,
        opacity: depth === 0
          ? 1
          : Math.max(.045, .43 - depth * .045),
        zIndex: echoes.length - depth
      });
    });
  }

  function updateProgress(progress) {
    const value = clamp(progress, 0, 1);

    percentLabel.textContent =
      String(Math.round(value * 100)).padStart(2, "0") + "%";

    gsap.set(progressBar, { scaleX: value });

    if (value < .15) {
      status.textContent = "SIGNAL: CLEAR";
    } else if (value < .42) {
      status.textContent = "SIGNAL: DELAYED";
    } else if (value < .78) {
      status.textContent = "SIGNAL: MULTIPLIED";
    } else {
      status.textContent = "SIGNAL: RESOLVING";
    }
  }

  function onPointerMove(event) {
    if (reducedMotion || destroyed || moveFrame) return;

    const rect = stage.getBoundingClientRect();

    pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - .5) * 2;

    moveFrame = requestAnimationFrame(() => {
      moveFrame = 0;

      gsap.to(field, {
        x: pointerX * 12,
        y: pointerY * 8,
        rotationY: pointerX * 5,
        rotationX: -pointerY * 4,
        duration: .55,
        ease: "power3.out",
        overwrite: "auto"
      });

      echoes.forEach((echo) => {
        const depth = getDepth(echo);

        if (depth === 0) {
          gsap.to(echo, {
            x: pointerX * 5,
            y: pointerY * 3,
            duration: .4,
            ease: "power3.out",
            overwrite: "auto"
          });
          return;
        }

        gsap.to(echo, {
          x: depth * (window.innerWidth < 700 ? -7 : -15)
            + pointerX * depth * 3,
          y: depth * (window.innerWidth < 700 ? 4 : 8)
            + pointerY * depth * 2,
          duration: .35 + depth * .035,
          ease: "power3.out",
          overwrite: "auto"
        });
      });
    });
  }

  function resetSignal() {
    gsap.killTweensOf([field, ...echoes]);
    layoutEchoes();

    gsap.to(field, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: .7,
      ease: "power3.out"
    });

    updateProgress(0);

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en90Scroll");

      if (trigger) {
        window.scrollTo({
          top: root.getBoundingClientRect().top + window.scrollY,
          behavior: "smooth"
        });
      }
    }
  }

  layoutEchoes();

  if (!reducedMotion && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        id: "en90Scroll",
        trigger: root,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: .8,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateProgress(self.progress)
      }
    });

    scrollTimeline
      .to(echoes, {
        x: (index) => (index - 4) * 42,
        y: (index) => (index - 4) * -13,
        scale: (index) => .65 + index * .11,
        rotationZ: (index) => (index - 4) * 1.4,
        opacity: (index) => index === 0 ? 1 : .65,
        duration: .38,
        stagger: {
          each: .018,
          from: "end"
        },
        ease: "power2.inOut"
      }, 0)
      .to(field, {
        scale: 1.12,
        rotationY: -8,
        rotationX: 5,
        duration: .3,
        ease: "power2.inOut"
      }, .3)
      .to(echoes, {
        x: (index) => (index - 4) * 14,
        y: (index) => (index - 4) * 5,
        scale: (index) => 1 - Math.abs(index - 4) * .09,
        rotationZ: 0,
        opacity: (index) => index === 0 ? 1 : Math.max(.08, .55 - index * .045),
        duration: .38,
        stagger: {
          each: .015,
          from: "center"
        },
        ease: "power3.out"
      }, .64)
      .to(field, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: .24,
        ease: "power2.out"
      }, .8);
  }

 if (!reducedMotion) {
    gsap.from(
      [
        root.querySelector(".en90-header"),
        root.querySelector(".en90-meta"),
        root.querySelector(".en90-caption"),
        root.querySelector(".en90-footer")
      ],
      {
        opacity: 0,
        y: 12,
        duration: .8,
        stagger: .1,
        ease: "power2.out"
      }
    );

    gsap.from(echoes[0], {
      scale: .88,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out"
    });
  }

  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerleave", resetSignal);
  resetButton.addEventListener("click", resetSignal);

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      layoutEchoes();

      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, 120);
  });

  window.addEventListener("pagehide", () => {
    destroyed = true;

    if (moveFrame) cancelAnimationFrame(moveFrame);
    if (scrollTimeline) scrollTimeline.kill();

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en90Scroll");
      if (trigger) trigger.kill();
    }
  }, { once: true });
})();


/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
