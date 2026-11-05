gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   SECTION 71 — EROSION ENGINE
========================================================= */

(() => {

  const stage =
    document.getElementById(
      "ero71Stage"
    );

  const canvas =
    document.getElementById(
      "ero71Canvas"
    );

  const cursor =
    document.getElementById(
      "ero71Cursor"
    );

  const ring =
    document.getElementById(
      "ero71Ring"
    );

  const status =
    document.getElementById(
      "ero71Status"
    );

  const counter =
    document.getElementById(
      "ero71Counter"
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
    mobile ? 4 : 3;

  const MAX_PARTICLES =
    mobile ? 4500 : 9000;

  const EROSION_RADIUS =
    mobile ? 42 : 62;

  /* =======================================================
     SIZE
  ======================================================= */

  let width = 0;
  let height = 0;
  let dpr = 1;

  /* =======================================================
     PARTICLES
  ======================================================= */

  const particles = [];

  let totalParticles = 0;

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

    speed: 0,

    active: false

  };

  let automaticErosion =
    false;

  let erosionProgress = 0;

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

    createParticles();

  }

  window.addEventListener(
    "resize",
    resize
  );

  /* =======================================================
     CREATE TEXT PARTICLES
  ======================================================= */

  function createParticles() {

    particles.length = 0;

    const sample =
      document.createElement(
        "canvas"
      );

    const sampleCtx =
      sample.getContext("2d");

    sample.width =
      width;

    sample.height =
      height;

    sampleCtx.clearRect(
      0,
      0,
      width,
      height
    );

    let fontSize =
      Math.min(
        width * .18,
        250
      );

    sampleCtx.font =
      `900 ${fontSize}px Arial`;

    while (
      sampleCtx.measureText(
        "EROSION"
      ).width >
      width * .82
    ) {

      fontSize -= 2;

      sampleCtx.font =
        `900 ${fontSize}px Arial`;

    }

    sampleCtx.fillStyle =
      "#fff";

    sampleCtx.textAlign =
      "center";

    sampleCtx.textBaseline =
      "middle";

    sampleCtx.fillText(
      "EROSION",
      width / 2,
      height / 2
    );

    const image =
      sampleCtx.getImageData(
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
          image[index + 3] > 100
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

        particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          erosion: 0,

          size:
            .8 +
            Math.random() * 1.5,

          alpha:
            .55 +
            Math.random() * .45,

          seed:
            Math.random(),

          angle:
            Math.random() *
            Math.PI * 2,

          drift:
            .3 +
            Math.random() * .8

        });

      }
    );

    totalParticles =
      particles.length;

    counter.textContent =
      `00000 / ${String(
        totalParticles
      ).padStart(5, "0")}`;

  }
 /* =======================================================
     MOUSE
  ======================================================= */

  window.addEventListener(
    "mousemove",
    e => {

      mouse.targetX =
        e.clientX;

      mouse.targetY =
        e.clientY;

      mouse.active =
        true;

      status.textContent =
        "ERODING MATERIAL";

    }
  );

  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active =
        false;

      status.textContent =
        "MOVE ACROSS THE TYPE";

    }
  );

  /* =======================================================
     CLICK
  ======================================================= */

  stage.addEventListener(
    "click",
    () => {

      if (
        automaticErosion
      ) return;

      automaticErosion =
        true;

      status.textContent =
        "EROSION WAVE";

      erosionProgress =
        0;

      gsap.to(
        {
          value: 0
        },
        {
          value: width + 200,

          duration: 2.3,

          ease: "power2.inOut",

          onUpdate: function () {

            erosionProgress =
              this.targets()[0].value;

          },

          onComplete: () => {

            status.textContent =
              "REBUILDING";

            rebuild();

          }

        }
      );

    }
  );

   /* =======================================================
     REBUILD
  ======================================================= */

  function rebuild() {

    gsap.delayedCall(
      .25,
      () => {

        particles.forEach(
          p => {

            p.erosion = 1;

            p.vx =
              (Math.random() - .5) *
              2;

            p.vy =
              (Math.random() - .5) *
              2;

          }
        );

        gsap.to(
          {
            value: 0
          },
          {

            value: 1,

            duration: 2.4,

            ease: "expo.out",

            onUpdate:
              function () {

                const progress =
                  this.targets()
                    [0]
                    .value;

                particles.forEach(
                  p => {

                    p.erosion =
                      1 -
                      progress;

                  }
                );

              },

            onComplete: () => {

              particles.forEach(
                p => {

                  p.x =
                    p.baseX;

                  p.y =
                    p.baseY;

                  p.vx = 0;
                  p.vy = 0;

                  p.erosion = 0;

                }
              );

              automaticErosion =
                false;

              status.textContent =
                "MOVE ACROSS THE TYPE";

            }

          }
        );

      }
    );

  }
/* =======================================================
     RENDER
  ======================================================= */

  function render() {

    requestAnimationFrame(
      render
    );

    mouse.x +=
      (
        mouse.targetX -
        mouse.x
      ) * .11;

    mouse.y +=
      (
        mouse.targetY -
        mouse.y
      ) * .11;

    const dx =
      mouse.x -
      mouse.previousX;

    const dy =
      mouse.y -
      mouse.previousY;

    const movement =
      Math.sqrt(
        dx * dx +
        dy * dy
      );

    mouse.speed +=
      (
        movement -
        mouse.speed
      ) * .12;

    mouse.previousX =
      mouse.x;

    mouse.previousY =
      mouse.y;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    let damaged = 0;

    particles.forEach(
      p => {

        let erosionForce = 0;

        /* =================================================
           MANUAL EROSION
        ================================================= */

        if (
          mouse.active &&
          !automaticErosion
        ) {

          const dx =
            p.baseX -
            mouse.x;

          const dy =
            p.baseY -
            mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (
            distance <
            EROSION_RADIUS
          ) {

            const intensity =
              1 -
              distance /
              EROSION_RADIUS;

            erosionForce =
              intensity *
              (
                .018 +
                mouse.speed * .004
              );

            p.erosion +=
              erosionForce;

            p.erosion =
              Math.min(
                p.erosion,
                .96
              );

            const safeDistance =
              Math.max(
                distance,
                .001
              );

            p.vx +=
              (
                dx /
                safeDistance
              ) *
              intensity *
              (
                .25 +
                mouse.speed * .04
              );

            p.vy +=
              (
                dy /
                safeDistance
              ) *
              intensity *
              (
                .25 +
                mouse.speed * .04
              );

          }

        }
 /* =================================================
           AUTOMATIC WAVE
        ================================================= */

        if (
          automaticErosion
        ) {

          const distance =
            Math.abs(
              p.baseX -
              erosionProgress
            );

          if (
            distance <
            EROSION_RADIUS * 1.5
          ) {

            const intensity =
              1 -
              distance /
              (
                EROSION_RADIUS *
                1.5
              );

            p.erosion +=
              intensity *
              .06;

            p.erosion =
              Math.min(
                p.erosion,
                1
              );

            p.vx +=
              (
                Math.random() -
                .5
              ) *
              intensity *
              .8;

            p.vy +=
              (
                Math.random() -
                .5
              ) *
              intensity *
              .8;

          }

        }

        /* =================================================
           NATURAL RECOVERY
        ================================================= */

        if (
          !automaticErosion
        ) {

          const dx =
            p.baseX -
            p.x;

          const dy =
            p.baseY -
            p.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (
            !mouse.active ||
            distance >
            EROSION_RADIUS * 1.7
          ) {

            p.erosion -=
              .0025;

          }

        }

        p.erosion =
          Math.max(
            0,
            Math.min(
              1,
              p.erosion
            )
          );

        /* =================================================
           PARTICLE MOTION
        ================================================= */

        const erosion =
          p.erosion;

        if (
          erosion > .02
        ) {

          const direction =
            p.seed > .5
              ? 1
              : -1;

          p.vx +=
            Math.cos(
              p.angle
            ) *
            erosion *
            .025 *
            direction;

          p.vy +=
            Math.sin(
              p.angle
            ) *
            erosion *
            .025;

        }

        /* =================================================
           RETURN FORCE
        ================================================= */

        const returnForce =
          automaticErosion
            ? .004
            : .016;

        p.vx +=
          (
            p.baseX -
            p.x
          ) *
          returnForce;

        p.vy +=
          (
            p.baseY -
            p.y
          ) *
          returnForce;

        p.vx *=
          .91;

        p.vy *=
          .91;

        p.x +=
          p.vx;

        p.y +=
          p.vy;

        /* =================================================
           EROSION VISIBILITY
        ================================================= */

        const visibility =
          1 -
          p.erosion;

        if (
          p.erosion >
          .08
        ) {

          damaged++;

        }

        if (
          visibility <
          .025
        ) return;

        /* =================================================
           DRAW
        ================================================= */

        const size =
          p.size *
          (
            .65 +
            visibility *
            .7
          );

        const alpha =
          p.alpha *
          visibility;

        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${alpha}
          )`;

        ctx.fillRect(
          p.x,
          p.y,
          size,
          size
        );

        /* =================================================
           DUST
        ================================================= */

        if (
          erosion > .4 &&
          p.seed > .82
        ) {

          ctx.fillStyle =
            `rgba(
              255,
              255,
              255,
              ${alpha * .35}
            )`;

          ctx.fillRect(
            p.x +
            p.vx * 3,

            p.y +
            p.vy * 3,

            size * .55,
            size * .55
          );

        }

      }
    );
 /* =====================================================
       COUNTER
    ===================================================== */

    counter.textContent =
      `${String(
        damaged
      ).padStart(5, "0")} / ${String(
        totalParticles
      ).padStart(5, "0")}`;

    /* =====================================================
       CURSOR
    ===================================================== */

    if (!mobile) {

      gsap.to(
        cursor,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .18,

          ease: "power3.out",

          overwrite: true

        }
      );

      gsap.to(
        ring,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .45,

          ease: "power3.out",

          overwrite: true

        }
      );

    }

    /* =====================================================
       GRID PARALLAX
    ===================================================== */

    const grid =
      stage.querySelector(
        ".ero71-grid"
      );

    if (grid) {

      const offsetX =
        (
          mouse.x -
          width / 2
        ) /
        width *
        -25;

      const offsetY =
        (
          mouse.y -
          height / 2
        ) /
        height *
        -25;

      grid.style.transform =
        `translate(
          ${offsetX}px,
          ${offsetY}px
        )`;

    }

  }

  /* =======================================================
     START
  ======================================================= */

  resize();

  render();

})();

/* =========================================================
   SECTION 72 — VAPORIZE ENGINE
========================================================= */

(() => {

  const stage =
    document.getElementById("vap72Stage");

  const canvas =
    document.getElementById("vap72Canvas");

  const cursor =
    document.getElementById("vap72Cursor");

  const ring =
    document.getElementById("vap72Ring");

  const status =
    document.getElementById("vap72Status");

  const counter =
    document.getElementById("vap72Counter");

  if (!stage || !canvas) return;

  const ctx =
    canvas.getContext("2d");

  const mobile =
    window.matchMedia(
      "(max-width: 768px)"
    ).matches;

  const GAP =
    mobile ? 5 : 3;

  const MAX_PARTICLES =
    mobile ? 4200 : 8500;

  const HEAT_RADIUS =
    mobile ? 50 : 72;

  let width = 0;
  let height = 0;
  let dpr = 1;

  const particles = [];

  let totalParticles = 0;

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

    speed: 0,

    active: false

  };

  let vaporizing = false;

  let vaporWave = 0;

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

    createParticles();

  }

  window.addEventListener(
    "resize",
    resize
  );

  /* =======================================================
     CREATE TEXT PARTICLES
  ======================================================= */

  function createParticles() {

    particles.length = 0;

    const sample =
      document.createElement("canvas");

    const sampleCtx =
      sample.getContext("2d");

    sample.width =
      width;

    sample.height =
      height;

    let fontSize =
      Math.min(
        width * .17,
        245
      );

    sampleCtx.font =
      `900 ${fontSize}px Arial`;

    while (
      sampleCtx.measureText("VAPORIZE").width >
      width * .82
    ) {

      fontSize -= 2;

      sampleCtx.font =
        `900 ${fontSize}px Arial`;

    }

    sampleCtx.clearRect(
      0,
      0,
      width,
      height
    );

    sampleCtx.fillStyle =
      "#fff";

    sampleCtx.textAlign =
      "center";

    sampleCtx.textBaseline =
      "middle";

    sampleCtx.fillText(
      "VAPORIZE",
      width / 2,
      height / 2
    );

    const image =
      sampleCtx.getImageData(
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
          image[index + 3] > 100
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

        particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          heat: 0,

          vapor: 0,

          size:
            .8 +
            Math.random() * 1.5,

          alpha:
            .55 +
            Math.random() * .45,

          seed:
            Math.random(),

          phase:
            Math.random() *
            Math.PI * 2,

          rise:
            .3 +
            Math.random() * .9

        });

      }
    );

    totalParticles =
      particles.length;

    counter.textContent =
      `00000 / ${String(
        totalParticles
      ).padStart(5, "0")}`;

  }
/* =======================================================
     MOUSE EVENTS
  ======================================================= */

  window.addEventListener(
    "mousemove",
    e => {

      mouse.targetX =
        e.clientX;

      mouse.targetY =
        e.clientY;

      mouse.active =
        true;

      if (!vaporizing) {

        status.textContent =
          "HEAT FIELD ACTIVE";

      }

    }
  );

  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active =
        false;

      if (!vaporizing) {

        status.textContent =
          "MOVE THROUGH THE HEAT";

      }

    }
  );

  /* =======================================================
     CLICK — TOTAL VAPORIZATION
  ======================================================= */

  stage.addEventListener(
    "click",
    () => {

      if (vaporizing) return;

      vaporizing =
        true;

      vaporWave = 0;

      status.textContent =
        "VAPORIZATION";

      gsap.to(
        {
          value: 0
        },
        {

          value: width + 200,

          duration: 2.1,

          ease: "power2.inOut",

          onUpdate: function () {

            vaporWave =
              this.targets()[0].value;

          },

          onComplete: () => {

            status.textContent =
              "CONDENSING";

            condense();

          }

        }
      );

    }
  );

/* =======================================================
     CONDENSE
  ======================================================= */

  function condense() {

    gsap.to(
      {
        value: 1
      },
      {

        value: 0,

        duration: 2.6,

        ease: "expo.out",

        onUpdate: function () {

          const amount =
            this.targets()[0].value;

          particles.forEach(
            p => {

              p.vapor =
                amount;

            }
          );

        },

        onComplete: () => {

          particles.forEach(
            p => {

              p.x =
                p.baseX;

              p.y =
                p.baseY;

              p.vx = 0;
              p.vy = 0;

              p.heat = 0;
              p.vapor = 0;

            }
          );

          vaporizing =
            false;

          status.textContent =
            "MOVE THROUGH THE HEAT";

        }

      }
    );

  }

  /* =======================================================
     RENDER
  ======================================================= */

  function render() {

    requestAnimationFrame(render);

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

    const mdx =
      mouse.x -
      mouse.previousX;

    const mdy =
      mouse.y -
      mouse.previousY;

    const movement =
      Math.sqrt(
        mdx * mdx +
        mdy * mdy
      );

    mouse.speed +=
      (
        movement -
        mouse.speed
      ) * .12;

    mouse.previousX =
      mouse.x;

    mouse.previousY =
      mouse.y;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    let vaporCount = 0;

    particles.forEach(
      p => {

        /* =================================================
           HEAT FIELD
        ================================================= */

        let localHeat = 0;

        if (
          mouse.active &&
          !vaporizing
        ) {

          const dx =
            p.baseX -
            mouse.x;

          const dy =
            p.baseY -
            mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (
            distance <
            HEAT_RADIUS
          ) {

            const intensity =
              1 -
              distance /
              HEAT_RADIUS;

            localHeat =
              intensity *
              (
                .7 +
                Math.min(
                  mouse.speed * .035,
                  1.6
                )
              );

            p.heat +=
              localHeat * .035;

            p.heat =
              Math.min(
                p.heat,
                1
              );

          }

        }

/* =================================================
           AUTOMATIC VAPORIZATION WAVE
        ================================================= */

        if (vaporizing) {

          const distance =
            Math.abs(
              p.baseX -
              vaporWave
            );

          const waveRadius =
            HEAT_RADIUS * 1.8;

          if (
            distance <
            waveRadius
          ) {

            const intensity =
              1 -
              distance /
              waveRadius;

            p.heat +=
              intensity * .09;

            p.heat =
              Math.min(
                p.heat,
                1
              );

          }

        }

        /* =================================================
           COOL DOWN
        ================================================= */

        if (
          !vaporizing &&
          (
            !mouse.active ||
            localHeat === 0
          )
        ) {

          p.heat -=
            .006;

        }

        p.heat =
          Math.max(
            0,
            Math.min(
              1,
              p.heat
            )
          );

        /* =================================================
           VAPOR MOTION
        ================================================= */

        const heat =
          p.heat;

        if (heat > .03) {

          p.vx +=
            (
              Math.sin(
                p.phase +
                performance.now() * .001
              ) *
              .018
            ) *
            heat;

          p.vy -=
            (
              .035 +
              p.rise * .035
            ) *
            heat;

          p.vx +=
            (
              Math.random() -
              .5
            ) *
            heat *
            .025;

          p.vy +=
            (
              Math.random() -
              .5
            ) *
            heat *
            .015;

        }

        /* =================================================
           RETURN TO FORM
        ================================================= */

        const returnForce =
          vaporizing
            ? .003
            : .018;

        p.vx +=
          (
            p.baseX -
            p.x
          ) *
          returnForce *
          (1 - heat);

        p.vy +=
          (
            p.baseY -
            p.y
          ) *
          returnForce *
          (1 - heat);

        p.vx *=
          .92;

        p.vy *=
          .92;

        p.x +=
          p.vx;

        p.y +=
          p.vy;

        /* =================================================
           VISIBILITY
        ================================================= */

        const visibility =
          Math.max(
            .035,
            1 -
            heat * .88
          );

        if (
          heat > .1
        ) {

          vaporCount++;

        }

        /* =================================================
           PARTICLE SIZE
        ================================================= */

        const size =
          p.size *
          (
            1 +
            heat * 1.2
          );

        const alpha =
          p.alpha *
          visibility;

        /* =================================================
           HEAT GLOW
        ================================================= */

        if (
          heat > .2
        ) {

          ctx.shadowBlur =
            5 +
            heat * 8;

          ctx.shadowColor =
            `rgba(
              255,
              255,
              255,
              ${heat * .35}
            )`;

        } else {

          ctx.shadowBlur = 0;

        }

        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${alpha}
          )`;

        ctx.fillRect(
          p.x,
          p.y,
          size,
          size
        );

        ctx.shadowBlur = 0;

/* =================================================
           VAPOR TRAILS
        ================================================= */

        if (
          heat > .45 &&
          p.seed > .72
        ) {

          ctx.beginPath();

          ctx.moveTo(
            p.x,
            p.y
          );

          ctx.lineTo(
            p.x -
            p.vx * 3,

            p.y -
            p.vy * 3
          );

          ctx.strokeStyle =
            `rgba(
              255,
              255,
              255,
              ${heat * .12}
            )`;

          ctx.lineWidth =
            .6;

          ctx.stroke();

        }

      }
    );

    /* =====================================================
       COUNTER
    ===================================================== */

    counter.textContent =
      `${String(
        vaporCount
      ).padStart(5, "0")} / ${String(
        totalParticles
      ).padStart(5, "0")}`;

    /* =====================================================
       CURSOR
    ===================================================== */

    if (!mobile) {

      gsap.to(
        cursor,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .18,

          ease: "power3.out",

          overwrite: true

        }
      );

      gsap.to(
        ring,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .45,

          ease: "power3.out",

          overwrite: true

        }
      );

    }

    /* =====================================================
       GRID PARALLAX
    ===================================================== */

    const grid =
      stage.querySelector(
        ".vap72-grid"
      );

    if (grid) {

      const gx =
        (
          mouse.x -
          width / 2
        ) /
        width *
        -24;

      const gy =
        (
          mouse.y -
          height / 2
        ) /
        height *
        -24;

      grid.style.transform =
        `translate(
          ${gx}px,
          ${gy}px
        )`;

    }

  }
/* =======================================================
     START
  ======================================================= */

  resize();

  render();

})();

/* =========================================================
   SECTION 73 — LIQUEFY ENGINE
========================================================= */

(() => {

  const stage =
    document.getElementById("liq73Stage");

  const canvas =
    document.getElementById("liq73Canvas");

  const cursor =
    document.getElementById("liq73Cursor");

  const ring =
    document.getElementById("liq73Ring");

  const status =
    document.getElementById("liq73Status");

  const counter =
    document.getElementById("liq73Counter");

  if (!stage || !canvas) return;

  const ctx =
    canvas.getContext("2d");

  const mobile =
    window.matchMedia(
      "(max-width: 768px)"
    ).matches;

  const GAP =
    mobile ? 5 : 3;

  const MAX_PARTICLES =
    mobile ? 4200 : 8500;

  const LIQUID_RADIUS =
    mobile ? 70 : 95;

  let width = 0;
  let height = 0;
  let dpr = 1;

  const particles = [];

  let totalParticles = 0;

  let shockwave = 0;
  let shockPower = 0;

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

    createParticles();

  }

  window.addEventListener(
    "resize",
    resize
  );

  /* =======================================================
     CREATE TEXT PARTICLES
  ======================================================= */

  function createParticles() {

    particles.length = 0;

    const sample =
      document.createElement("canvas");

    const sampleCtx =
      sample.getContext("2d");

    sample.width =
      width;

    sample.height =
      height;

    let fontSize =
      Math.min(
        width * .18,
        250
      );

    sampleCtx.font =
      `900 ${fontSize}px Arial`;

    while (
      sampleCtx.measureText("LIQUEFY").width >
      width * .82
    ) {

      fontSize -= 2;

      sampleCtx.font =
        `900 ${fontSize}px Arial`;

    }

    sampleCtx.clearRect(
      0,
      0,
      width,
      height
    );

    sampleCtx.fillStyle =
      "#fff";

    sampleCtx.textAlign =
      "center";

    sampleCtx.textBaseline =
      "middle";

    sampleCtx.fillText(
      "LIQUEFY",
      width / 2,
      height / 2
    );

    const image =
      sampleCtx.getImageData(
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
          image[index + 3] > 100
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

        particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          wave: 0,

          size:
            .8 +
            Math.random() * 1.4,

          alpha:
            .6 +
            Math.random() * .4,

          seed:
            Math.random(),

          phase:
            Math.random() *
            Math.PI * 2,

          offset:
            Math.random() * 100

        });

      }
    );

    totalParticles =
      particles.length;

    counter.textContent =
      `00000 / ${String(
        totalParticles
      ).padStart(5, "0")}`;

  }

  /* =======================================================
     MOUSE
  ======================================================= */

  window.addEventListener(
    "mousemove",
    e => {

      mouse.targetX =
        e.clientX;

      mouse.targetY =
        e.clientY;

      mouse.active =
        true;

      status.textContent =
        "LIQUID FIELD ACTIVE";

    }
  );

  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active =
        false;

      status.textContent =
        "MOVE THROUGH THE LIQUID";

    }
  );

   /* =======================================================
     CLICK — LIQUID SHOCKWAVE
  ======================================================= */

  stage.addEventListener(
    "click",
    e => {

      shockwave = 1;

      shockPower = 1;

      status.textContent =
        "LIQUID SHOCKWAVE";

      gsap.fromTo(
        { value: 0 },
        {
          value: 1
        },
        {
          value: 0,

          duration: 2.4,

          ease: "expo.out",

          onUpdate: function () {

            shockwave =
              this.targets()[0].value;

          },

          onComplete: () => {

            status.textContent =
              "MOVE THROUGH THE LIQUID";

          }
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

    const dx =
      mouse.x -
      mouse.previousX;

    const dy =
      mouse.y -
      mouse.previousY;

    const movement =
      Math.sqrt(
        dx * dx +
        dy * dy
      );

    mouse.speed +=
      (
        movement -
        mouse.speed
      ) * .12;

    mouse.previousX =
      mouse.x;

    mouse.previousY =
      mouse.y;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    let distorted = 0;

    const time =
      performance.now() * .001;


/* =====================================================
       PARTICLES
    ===================================================== */

    particles.forEach(
      p => {

        let forceX = 0;
        let forceY = 0;

        /* =================================================
           CURSOR LIQUID FIELD
        ================================================= */

        if (mouse.active) {

          const dx =
            p.baseX -
            mouse.x;

          const dy =
            p.baseY -
            mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (
            distance <
            LIQUID_RADIUS
          ) {

            const strength =
              1 -
              distance /
              LIQUID_RADIUS;

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

            /* ---------------------------------------------
               SIDEWAYS LIQUID FLOW
            --------------------------------------------- */

            const flow =
              strength *
              (
                .35 +
                mouse.speed * .045
              );

            forceX +=
              -ny *
              flow;

            forceY +=
              nx *
              flow;
 /* ---------------------------------------------
               CURSOR PUSH
            --------------------------------------------- */

            const push =
              strength *
              mouse.speed *
              .025;

            forceX +=
              nx *
              push;

            forceY +=
              ny *
              push;

            /* ---------------------------------------------
               WAVE DISTORTION
            --------------------------------------------- */

            const wave =
              Math.sin(
                distance * .09 -
                time * 6
              ) *
              strength *
              (
                .5 +
                mouse.speed * .025
              );

            forceX +=
              nx * wave;

            forceY +=
              ny * wave;

            distorted++;

          }

        }

        /* =================================================
           CLICK SHOCKWAVE
        ================================================= */

        if (shockwave > .001) {

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

          const waveRadius =
            shockwave *
            Math.max(
              width,
              height
            );

          const difference =
            Math.abs(
              distance -
              waveRadius
            );

          if (
            difference <
            100
          ) {

            const intensity =
              1 -
              difference / 100;

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

            forceX +=
              nx *
              intensity *
              4;

            forceY +=
              ny *
              intensity *
              4;

            distorted++;

          }

        }
 /* =================================================
           ORGANIC WAVE
        ================================================= */

        const organic =
          Math.sin(
            p.baseY * .018 +
            time * 2.5 +
            p.phase
          ) *
          Math.cos(
            p.baseX * .011 +
            time * 1.8
          );

        forceX +=
          organic *
          .025;

        forceY +=
          organic *
          .018;

        /* =================================================
           RETURN SPRING
        ================================================= */

        forceX +=
          (
            p.baseX -
            p.x
          ) *
          .022;

        forceY +=
          (
            p.baseY -
            p.y
          ) *
          .022;

        /* =================================================
           VELOCITY
        ================================================= */

        p.vx += forceX;
        p.vy += forceY;

        p.vx *= .89;
        p.vy *= .89;

        p.x += p.vx;
        p.y += p.vy;

        /* =================================================
           DISTORTION AMOUNT
        ================================================= */

        const displacement =
          Math.sqrt(
            Math.pow(
              p.x -
              p.baseX,
              2
            ) +
            Math.pow(
              p.y -
              p.baseY,
              2
            )
          );

        const distortion =
          Math.min(
            displacement / 35,
            1
          );

        /* =================================================
           PARTICLE DRAW
        ================================================= */

        const size =
          p.size +
          distortion * 1.2;

        const alpha =
          p.alpha;

        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${alpha}
          )`;

        ctx.fillRect(
          p.x,
          p.y,
          size,
          size
        );

        /* =================================================
           LIQUID TRAIL
        ================================================= */

        if (
          distortion > .35 &&
          p.seed > .65
        ) {

          ctx.beginPath();

          ctx.moveTo(
            p.x,
            p.y
          );

          ctx.lineTo(
            p.x -
            p.vx * 5,

            p.y -
            p.vy * 5
          );

          ctx.strokeStyle =
            `rgba(
              255,
              255,
              255,
              ${distortion * .14}
            )`;

          ctx.lineWidth =
            .6;

          ctx.stroke();

        }

      }
    );

    /* =====================================================
       COUNTER
    ===================================================== */

    counter.textContent =
      `${String(
        distorted
      ).padStart(5, "0")} / ${String(
        totalParticles
      ).padStart(5, "0")}`;

    /* =====================================================
       CURSOR
    ===================================================== */

    if (!mobile) {

      gsap.to(
        cursor,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .16,

          ease: "power3.out",

          overwrite: true

        }
      );

      gsap.to(
        ring,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .45,

          ease: "power3.out",

          overwrite: true

        }
      );

    }

    /* =====================================================
       GRID PARALLAX
    ===================================================== */

    const grid =
      stage.querySelector(
        ".liq73-grid"
      );

    if (grid) {

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

  /* =======================================================
     INIT
  ======================================================= */

  resize();

  render();

})();

/* =========================================================
   SECTION 74 — LIQUID MIRROR ENGINE
========================================================= */

(() => {

  const stage =
    document.getElementById(
      "mir74Stage"
    );

  const canvas =
    document.getElementById(
      "mir74Canvas"
    );

  const cursor =
    document.getElementById(
      "mir74Cursor"
    );

  const ring =
    document.getElementById(
      "mir74Ring"
    );

  const status =
    document.getElementById(
      "mir74Status"
    );

  const counter =
    document.getElementById(
      "mir74Counter"
    );

  if (!stage || !canvas) return;

  const ctx =
    canvas.getContext("2d");

  const mobile =
    window.matchMedia(
      "(max-width: 768px)"
    ).matches;

  const GAP =
    mobile ? 5 : 3;

  const MAX_PARTICLES =
    mobile ? 4200 : 8500;

  const RIPPLE_RADIUS =
    mobile ? 75 : 110;

  let width = 0;
  let height = 0;
  let dpr = 1;

  const particles = [];

  let totalParticles = 0;

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

    speed: 0,

    active: false

  };
  /* =======================================================
     RIPPLE SYSTEM
  ======================================================= */

  const ripples = [];

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

    createParticles();

  }

  window.addEventListener(
    "resize",
    resize
  );

  /* =======================================================
     CREATE TEXT PARTICLES
  ======================================================= */

  function createParticles() {

    particles.length = 0;

    const sample =
      document.createElement(
        "canvas"
      );

    const sampleCtx =
      sample.getContext("2d");

    sample.width =
      width;

    sample.height =
      height;

    let fontSize =
      Math.min(
        width * .17,
        245
      );

    sampleCtx.font =
      `900 ${fontSize}px Arial`;

    while (
      sampleCtx.measureText(
        "LIQUID MIRROR"
      ).width >
      width * .84
    ) {

      fontSize -= 2;

      sampleCtx.font =
        `900 ${fontSize}px Arial`;

    }

    sampleCtx.clearRect(
      0,
      0,
      width,
      height
    );

    sampleCtx.fillStyle =
      "#fff";

    sampleCtx.textAlign =
      "center";

    sampleCtx.textBaseline =
      "middle";

    sampleCtx.fillText(
      "LIQUID MIRROR",
      width / 2,
      height / 2 - fontSize * .18
    );

    const image =
      sampleCtx.getImageData(
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
          image[index + 3] > 100
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

        particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          waveX: 0,
          waveY: 0,

          size:
            .8 +
            Math.random() * 1.4,

          alpha:
            .55 +
            Math.random() * .45,

          seed:
            Math.random(),

          phase:
            Math.random() *
            Math.PI * 2

        });

      }
    );

    totalParticles =
      particles.length;

    counter.textContent =
      `00000 / ${String(
        totalParticles
      ).padStart(5, "0")}`;

  }

 /* =======================================================
     MOUSE
  ======================================================= */

  window.addEventListener(
    "mousemove",
    e => {

      mouse.targetX =
        e.clientX;

      mouse.targetY =
        e.clientY;

      mouse.active =
        true;

      status.textContent =
        "SURFACE DISTURBED";

    }
  );

  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active =
        false;

      status.textContent =
        "MOVE ACROSS THE SURFACE";

    }
  );

  /* =======================================================
     CLICK — GLOBAL RIPPLE
  ======================================================= */

  stage.addEventListener(
    "click",
    e => {

      ripples.push({

        x: e.clientX,
        y: e.clientY,

        radius: 0,

        strength: 1

      });

      status.textContent =
        "MIRROR WAVE";

      gsap.to(
        {},
        {
          duration: 1.8,

          onComplete: () => {

            status.textContent =
              "MOVE ACROSS THE SURFACE";

          }
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

    const mdx =
      mouse.x -
      mouse.previousX;

    const mdy =
      mouse.y -
      mouse.previousY;

    const movement =
      Math.sqrt(
        mdx * mdx +
        mdy * mdy
      );

    mouse.speed +=
      (
        movement -
        mouse.speed
      ) * .12;

    mouse.previousX =
      mouse.x;

    mouse.previousY =
      mouse.y;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    const time =
      performance.now() *
      .001;

    let distorted = 0;

    /* =====================================================
       RIPPLE UPDATE
    ===================================================== */

    ripples.forEach(
      ripple => {

        ripple.radius += 12;

        ripple.strength *= .965;

      }
    );

    while (
      ripples.length &&
      (
        ripples[0].strength <
        .015
      )
    ) {

      ripples.shift();

    }

    /* =====================================================
       PARTICLES
    ===================================================== */

    particles.forEach(
      p => {

        let fx = 0;
        let fy = 0;

        /* =================================================
           CURSOR RIPPLE
        ================================================= */

        if (mouse.active) {

          const dx =
            p.baseX -
            mouse.x;

          const dy =
            p.baseY -
            mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (
            distance <
            RIPPLE_RADIUS
          ) {

            const strength =
              1 -
              distance /
              RIPPLE_RADIUS;

            const wave =
              Math.sin(
                distance * .14 -
                time * 7
              );

            const force =
              wave *
              strength *
              (
                .8 +
                mouse.speed * .025
              );

            const safe =
              Math.max(
                distance,
                .001
              );

            fx +=
              (
                dx / safe
              ) *
              force;

            fy +=
              (
                dy / safe
              ) *
              force;

            /* SIDE FLOW */

            fx +=
              -(
                dy / safe
              ) *
              strength *
              mouse.speed *
              .025;

            fy +=
              (
                dx / safe
              ) *
              strength *
              mouse.speed *
              .025;

            distorted++;

          }

        }
   /* =================================================
           CLICK RIPPLES
        ================================================= */

        ripples.forEach(
          ripple => {

            const dx =
              p.baseX -
              ripple.x;

            const dy =
              p.baseY -
              ripple.y;

            const distance =
              Math.sqrt(
                dx * dx +
                dy * dy
              );

            const waveWidth =
              80;

            const difference =
              Math.abs(
                distance -
                ripple.radius
              );

            if (
              difference <
              waveWidth
            ) {

              const intensity =
                (
                  1 -
                  difference /
                  waveWidth
                ) *
                ripple.strength;

              const safe =
                Math.max(
                  distance,
                  .001
                );

              const nx =
                dx / safe;

              const ny =
                dy / safe;

              const wave =
                Math.sin(
                  difference * .08
                );

              fx +=
                nx *
                intensity *
                wave *
                3;

              fy +=
                ny *
                intensity *
                wave *
                3;

              distorted++;

            }

          }
        );

        /* =================================================
           LIQUID SINE DISTORTION
        ================================================= */

        const organic =
          Math.sin(
            p.baseY * .018 +
            time * 2.4 +
            p.phase
          ) *
          Math.cos(
            p.baseX * .012 +
            time * 1.7
          );

        fx +=
          organic *
          .018;

        fy +=
          organic *
          .015;

        /* =================================================
           RETURN TO BASE
        ================================================= */

        fx +=
          (
            p.baseX -
            p.x
          ) *
          .021;

        fy +=
          (
            p.baseY -
            p.y
          ) *
          .021;

        /* =================================================
           VELOCITY
        ================================================= */

        p.vx += fx;
        p.vy += fy;

        p.vx *= .9;
        p.vy *= .9;

        p.x += p.vx;
        p.y += p.vy;

        /* =================================================
           DISTORTION
        ================================================= */

        const displacement =
          Math.sqrt(
            Math.pow(
              p.x -
              p.baseX,
              2
            ) +
            Math.pow(
              p.y -
              p.baseY,
              2
            )
          );

        const distortion =
          Math.min(
            displacement / 30,
            1
          );

        /* =================================================
           DRAW MAIN PARTICLE
        ================================================= */

        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${p.alpha}
          )`;

        ctx.fillRect(
          p.x,
          p.y,
          p.size +
          distortion * 1.4,
          p.size +
          distortion * 1.4
        );
 /* =================================================
           REFLECTIVE TRAIL
        ================================================= */

        if (
          distortion > .2
        ) {

          ctx.beginPath();

          ctx.moveTo(
            p.x,
            p.y
          );

          ctx.lineTo(
            p.x -
            p.vx * 7,

            p.y -
            p.vy * 7
          );

          ctx.strokeStyle =
            `rgba(
              255,
              255,
              255,
              ${distortion * .15}
            )`;

          ctx.lineWidth =
            .55;

          ctx.stroke();

        }

      }
    );

    /* =====================================================
       REFLECTION
    ===================================================== */

    ctx.save();

    ctx.globalAlpha = .11;

    ctx.translate(
      0,
      height
    );

    ctx.scale(
      1,
      -1
    );

    particles.forEach(
      p => {

        const reflectionY =
          height -
          p.y;

        const fade =
          Math.max(
            0,
            1 -
            Math.abs(
              reflectionY -
              height * .53
            ) /
            (height * .35)
          );

        if (
          fade <= 0
        ) return;

        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${fade * .18}
          )`;

        ctx.fillRect(
          p.x,
          p.y,
          p.size,
          p.size
        );

      }
    );

    ctx.restore();

    /* =====================================================
       REFLECTION HORIZONTAL WATER LINE
    ===================================================== */

    const waterY =
      height * .64;

    const gradient =
      ctx.createLinearGradient(
        0,
        waterY - 30,
        0,
        waterY + 100
      );

    gradient.addColorStop(
      0,
      "rgba(255,255,255,.08)"
    );

    gradient.addColorStop(
      .25,
      "rgba(255,255,255,.025)"
    );

    gradient.addColorStop(
      1,
      "rgba(255,255,255,0)"
    );

    ctx.fillStyle =
      gradient;

    ctx.fillRect(
      0,
      waterY,
      width,
      100
    );

    /* =====================================================
       COUNTER
    ===================================================== */

    counter.textContent =
      `${String(
        distorted
      ).padStart(5, "0")} / ${String(
        totalParticles
      ).padStart(5, "0")}`;

    /* =====================================================
       CURSOR
    ===================================================== */

    if (!mobile) {

      gsap.to(
        cursor,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .16,

          ease: "power3.out",

          overwrite: true

        }
      );

      gsap.to(
        ring,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .45,

          ease: "power3.out",

          overwrite: true

        }
      );

    }

    /* =====================================================
       GRID PARALLAX
    ===================================================== */

    const grid =
      stage.querySelector(
        ".mir74-grid"
      );

    if (grid) {

      const gx =
        (
          mouse.x -
          width / 2
        ) /
        width *
        -24;

      const gy =
        (
          mouse.y -
          height / 2
        ) /
        height *
        -24;

      grid.style.transform =
        `translate(
          ${gx}px,
          ${gy}px
        )`;

    }

  }

  /* =======================================================
     INIT
  ======================================================= */

  resize();

  render();

})();

/* =========================================================
   SECTION 75 — OSCILLATE ENGINE
========================================================= */

(() => {

  const stage =
    document.getElementById("osc75Stage");

  const canvas =
    document.getElementById("osc75Canvas");

  const cursor =
    document.getElementById("osc75Cursor");

  const ring =
    document.getElementById("osc75Ring");

  const status =
    document.getElementById("osc75Status");

  const counter =
    document.getElementById("osc75Counter");

  if (!stage || !canvas) return;

  const ctx =
    canvas.getContext("2d");

  const mobile =
    window.matchMedia(
      "(max-width: 768px)"
    ).matches;

  const GAP =
    mobile ? 5 : 3;

  const MAX_PARTICLES =
    mobile ? 4200 : 8500;

  const WAVE_RADIUS =
    mobile ? 95 : 130;

  let width = 0;
  let height = 0;
  let dpr = 1;

  const particles = [];

  let totalParticles = 0;

  let pulse = 0;
  let pulseStrength = 0;

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

    createParticles();

  }

  window.addEventListener(
    "resize",
    resize
  );

 /* =======================================================
     CREATE TYPOGRAPHY PARTICLES
  ======================================================= */

  function createParticles() {

    particles.length = 0;

    const sample =
      document.createElement("canvas");

    const sampleCtx =
      sample.getContext("2d");

    sample.width =
      width;

    sample.height =
      height;

    let fontSize =
      Math.min(
        width * .17,
        245
      );

    sampleCtx.font =
      `900 ${fontSize}px Arial`;

    while (
      sampleCtx.measureText(
        "OSCILLATE"
      ).width >
      width * .84
    ) {

      fontSize -= 2;

      sampleCtx.font =
        `900 ${fontSize}px Arial`;

    }

    sampleCtx.clearRect(
      0,
      0,
      width,
      height
    );

    sampleCtx.fillStyle =
      "#fff";

    sampleCtx.textAlign =
      "center";

    sampleCtx.textBaseline =
      "middle";

    sampleCtx.fillText(
      "OSCILLATE",
      width / 2,
      height / 2
    );

    const image =
      sampleCtx.getImageData(
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
          image[index + 3] > 100
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

        particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          phase:
            Math.random() *
            Math.PI * 2,

          frequency:
            .7 +
            Math.random() * .8,

          size:
            .8 +
            Math.random() * 1.4,

          alpha:
            .6 +
            Math.random() * .4,

          seed:
            Math.random()

        });

      }
    );

    totalParticles =
      particles.length;

    counter.textContent =
      `00000 / ${String(
        totalParticles
      ).padStart(5, "0")}`;

  }

  /* =======================================================
     MOUSE EVENTS
  ======================================================= */

  window.addEventListener(
    "mousemove",
    e => {

      mouse.targetX =
        e.clientX;

      mouse.targetY =
        e.clientY;

      mouse.active =
        true;

      status.textContent =
        "OSCILLATION FIELD ACTIVE";

    }
  );

  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active =
        false;

      status.textContent =
        "MOVE TO OSCILLATE";

    }
  );

  /* =======================================================
     CLICK — GLOBAL OSCILLATION
  ======================================================= */

  stage.addEventListener(
    "click",
    () => {

      pulse = 0;
      pulseStrength = 1;

      status.textContent =
        "RESONANCE";

      gsap.to(
        { value: 0 },
        {

          value: 1,

          duration: 2.6,

          ease: "power2.inOut",

          onUpdate: function () {

            pulse =
              this.targets()[0].value;

          },

          onComplete: () => {

            status.textContent =
              "MOVE TO OSCILLATE";

          }

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

    const mdx =
      mouse.x -
      mouse.previousX;

    const mdy =
      mouse.y -
      mouse.previousY;

    const movement =
      Math.sqrt(
        mdx * mdx +
        mdy * mdy
      );

    mouse.speed +=
      (
        movement -
        mouse.speed
      ) * .12;

    mouse.previousX =
      mouse.x;

    mouse.previousY =
      mouse.y;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    const time =
      performance.now() *
      .001;

    let activeParticles = 0;

    /* =====================================================
       PARTICLES
    ===================================================== */

    particles.forEach(
      p => {

        let waveX = 0;
        let waveY = 0;

        /* =================================================
           CURSOR OSCILLATION
        ================================================= */

        if (mouse.active) {

          const dx =
            p.baseX -
            mouse.x;

          const dy =
            p.baseY -
            mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (
            distance <
            WAVE_RADIUS
          ) {

            const influence =
              1 -
              distance /
              WAVE_RADIUS;

            /*
             * A sinusoidal field that travels
             * perpendicular to the cursor.
             */

            const wave =
              Math.sin(
                distance * .11 -
                time * (
                  5 +
                  mouse.speed * .12
                ) +
                p.phase
              );

            const amplitude =
              influence *
              (
                2.5 +
                mouse.speed * .18
              );

            waveX +=
              wave *
              amplitude;

            waveY +=
              Math.cos(
                distance * .08 -
                time * 3
              ) *
              amplitude *
              .32;

            activeParticles++;

          }

        }

        /* =================================================
           GLOBAL CLICK RESONANCE
        ================================================= */

        if (
          pulse > .001
        ) {

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

          const waveFront =
            pulse *
            Math.max(
              width,
              height
            );

          const difference =
            Math.abs(
              distance -
              waveFront
            );

          const spread =
            130;

          if (
            difference <
            spread
          ) {

            const influence =
              1 -
              difference /
              spread;

            const wave =
              Math.sin(
                difference * .075
              );

            waveX +=
              wave *
              influence *
              20;

            waveY +=
              Math.cos(
                difference * .05
              ) *
              influence *
              8;

            activeParticles++;

          }

        }

        /* =================================================
           CONTINUOUS BREATHING
        ================================================= */

        const globalWave =
          Math.sin(
            p.baseX * .012 +
            time * 1.4 +
            p.phase
          ) *
          Math.cos(
            p.baseY * .009 +
            time * .8
          );

        waveY +=
          globalWave *
          .35;

        /* =================================================
           TARGET
        ================================================= */

        const targetX =
          p.baseX +
          waveX;

        const targetY =
          p.baseY +
          waveY;

        /* =================================================
           SPRING
        ================================================= */

        p.vx +=
          (
            targetX -
            p.x
          ) *
          .035;

        p.vy +=
          (
            targetY -
            p.y
          ) *
          .035;

        /* =================================================
           VELOCITY
        ================================================= */

        p.vx *= .82;
        p.vy *= .82;

        p.x += p.vx;
        p.y += p.vy;

        /* =================================================
           DISPLACEMENT
        ================================================= */

        const displacement =
          Math.sqrt(
            Math.pow(
              p.x -
              p.baseX,
              2
            ) +
            Math.pow(
              p.y -
              p.baseY,
              2
            )
          );

        const distortion =
          Math.min(
            displacement / 25,
            1
);

        /* =================================================
           MAIN PARTICLE
        ================================================= */

        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${p.alpha}
          )`;

        ctx.fillRect(
          p.x,
          p.y,

          p.size +
          distortion * 1.2,

          p.size +
          distortion * 1.2
        );

        /* =================================================
           OSCILLATION TRAIL
        ================================================= */

        if (
          distortion > .15
        ) {

          ctx.beginPath();

          ctx.moveTo(
            p.x,
            p.y
          );

          ctx.lineTo(
            p.x -
            p.vx * 6,

            p.y -
            p.vy * 6
          );

          ctx.strokeStyle =
            `rgba(
              255,
              255,
              255,
              ${distortion * .18}
            )`;

          ctx.lineWidth =
            .6;

          ctx.stroke();

        }

      }
    );

    /* =====================================================
       COUNTER
    ===================================================== */

    counter.textContent =
      `${String(
        activeParticles
      ).padStart(5, "0")} / ${String(
        totalParticles
      ).padStart(5, "0")}`;

    /* =====================================================
       CURSOR
    ===================================================== */

    if (!mobile) {

      gsap.to(
        cursor,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .16,

          ease: "power3.out",

          overwrite: true

        }
      );

      gsap.to(
        ring,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .45,

          ease: "power3.out",

          overwrite: true

        }
      );

    }

    /* =====================================================
       GRID PARALLAX
    ===================================================== */

    const grid =
      stage.querySelector(
        ".osc75-grid"
      );

    if (grid) {

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

  /* =======================================================
     INIT
  ======================================================= */

  resize();

  render();

})();
/* =========================================================
   SECTION 76 — RESONANCE ENGINE
========================================================= */

(() => {

  const stage =
    document.getElementById("res76Stage");

  const canvas =
    document.getElementById("res76Canvas");

  const cursor =
    document.getElementById("res76Cursor");

  const ring =
    document.getElementById("res76Ring");

  const status =
    document.getElementById("res76Status");

  const counter =
    document.getElementById("res76Counter");

  const energyRings =
    document.querySelectorAll(
      "#res76Rings span"
    );

  if (!stage || !canvas) return;

  const ctx =
    canvas.getContext("2d");

  const mobile =
    window.matchMedia(
      "(max-width: 768px)"
    ).matches;

  const GAP =
    mobile ? 5 : 3;

  const MAX_PARTICLES =
    mobile ? 4200 : 8500;

  const RESONANCE_RADIUS =
    mobile ? 90 : 125;

  let width = 0;
  let height = 0;
  let dpr = 1;

  const particles = [];

  let totalParticles = 0;

  let pulse = 0;

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

    createParticles();

  }

  window.addEventListener(
    "resize",
    resize
  );
/* =======================================================
     CREATE TEXT PARTICLES
  ======================================================= */

  function createParticles() {

    particles.length = 0;

    const sample =
      document.createElement("canvas");

    const sampleCtx =
      sample.getContext("2d");

    sample.width =
      width;

    sample.height =
      height;

    let fontSize =
      Math.min(
        width * .17,
        245
      );

    sampleCtx.font =
      `900 ${fontSize}px Arial`;

    while (
      sampleCtx.measureText(
        "RESONANCE"
      ).width >
      width * .84
    ) {

      fontSize -= 2;

      sampleCtx.font =
        `900 ${fontSize}px Arial`;

    }

    sampleCtx.clearRect(
      0,
      0,
      width,
      height
    );

    sampleCtx.fillStyle =
      "#fff";

    sampleCtx.textAlign =
      "center";

    sampleCtx.textBaseline =
      "middle";

    sampleCtx.fillText(
      "RESONANCE",
      width / 2,
      height / 2
    );

    const image =
      sampleCtx.getImageData(
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
          image[index + 3] > 100
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

        particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          phase:
            Math.random() *
            Math.PI * 2,

          frequency:
            .7 +
            Math.random() * 1.3,

          amplitude:
            .5 +
            Math.random() * .9,

          size:
            .8 +
            Math.random() * 1.4,

          alpha:
            .6 +
            Math.random() * .4,

          seed:
            Math.random()

        });

      }
    );

    totalParticles =
      particles.length;

    counter.textContent =
      `00000 / ${String(
        totalParticles
      ).padStart(5, "0")}`;

  }

  /* =======================================================
     MOUSE
  ======================================================= */

  window.addEventListener(
    "mousemove",
    e => {

      mouse.targetX =
        e.clientX;

      mouse.targetY =
        e.clientY;

      mouse.active =
        true;

      status.textContent =
        "RESONANCE FIELD ACTIVE";

    }
  );

  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active =
        false;

      status.textContent =
        "MOVE TO RESONATE";

    }
  );
/* =======================================================
     CLICK — MASSIVE RESONANCE
  ======================================================= */

  stage.addEventListener(
    "click",
    () => {

      pulse = 1;

      status.textContent =
        "RESONANCE PEAK";

      energyRings.forEach(
        (el, index) => {

          gsap.killTweensOf(el);

          gsap.fromTo(
            el,
            {
              scale: .2,
              opacity: .8
            },
            {
              scale:
                5 +
                index * 2,

              opacity: 0,

              duration:
                1.8 +
                index * .35,

              delay:
                index * .15,

              ease: "power2.out"
            }
          );

        }
      );

      gsap.to(
        { value: 1 },
        {

          value: 0,

          duration: 2.5,

          ease: "power3.out",

          onUpdate: function () {

            pulse =
              this.targets()[0].value;

          },

          onComplete: () => {

            status.textContent =
              "MOVE TO RESONATE";

          }

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

    const dx =
      mouse.x -
      mouse.previousX;

    const dy =
      mouse.y -
      mouse.previousY;

    const movement =
      Math.sqrt(
        dx * dx +
        dy * dy
      );

    mouse.speed +=
      (
        movement -
        mouse.speed
      ) * .12;

    mouse.previousX =
      mouse.x;

    mouse.previousY =
      mouse.y;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    const time =
      performance.now() *
      .001;

    let activeParticles = 0;

/* =====================================================
       PARTICLES
    ===================================================== */

    particles.forEach(
      p => {

        let targetX =
          p.baseX;

        let targetY =
          p.baseY;

        let resonance =
          0;

        /* =================================================
           CURSOR RESONANCE FIELD
        ================================================= */

        if (mouse.active) {

          const dx =
            p.baseX -
            mouse.x;

          const dy =
            p.baseY -
            mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (
            distance <
            RESONANCE_RADIUS
          ) {

            const influence =
              1 -
              distance /
              RESONANCE_RADIUS;

            const frequency =
              6 +
              mouse.speed * .18;

            const wave =
              Math.sin(
                time *
                frequency *
                p.frequency +
                p.phase
              );

            const amplitude =
              influence *
              (
                2 +
                mouse.speed * .22
              ) *
              p.amplitude;

            /*
             * Vibrate perpendicular to
             * the direction from cursor.
             */

            const safe =
              Math.max(
                distance,
                .001
              );

            const nx =
              dx / safe;

            const ny =
              dy / safe;

            targetX +=
              -ny *
              wave *
              amplitude;

            targetY +=
              nx *
              wave *
              amplitude;

            /*
             * Secondary vibration
             */

            targetX +=
              Math.sin(
                time *
                12 +
                p.phase
              ) *
              influence *
              mouse.speed *
              .08;

            targetY +=
              Math.cos(
                time *
                10 +
                p.phase
              ) *
              influence *
              mouse.speed *
              .08;

            resonance =
              influence;

            activeParticles++;

          }

        }

/* =================================================
           GLOBAL RESONANCE PULSE
        ================================================= */

        if (
          pulse > .001
        ) {

          const dx =
            p.baseX -
            width / 2;

          const dy =
            p.baseY -
            height / 2;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          const wave =
            Math.sin(
              distance * .055 -
              pulse * 22
            );

          const influence =
            pulse *
            Math.max(
              0,
              1 -
              distance /
              (
                Math.max(
                  width,
                  height
                ) * .7
              )
            );

          targetX +=
            wave *
            influence *
            28 *
            Math.sin(
              p.phase
            );

          targetY +=
            Math.cos(
              distance * .045 -
              pulse * 18
            ) *
            influence *
            15;

          resonance =
            Math.max(
              resonance,
              influence
            );

          activeParticles++;

        }

        /* =================================================
           SPRING
        ================================================= */

        p.vx +=
          (
            targetX -
            p.x
          ) *
          .065;

        p.vy +=
          (
            targetY -
            p.y
          ) *
          .065;

        /* =================================================
           FRICTION
        ================================================= */

        p.vx *= .72;
        p.vy *= .72;

        p.x += p.vx;
        p.y += p.vy;

        /* =================================================
           DISPLACEMENT
        ================================================= */

        const displacement =
          Math.sqrt(
            Math.pow(
              p.x -
              p.baseX,
              2
            ) +
            Math.pow(
              p.y -
              p.baseY,
              2
            )
          );

        const distortion =
          Math.min(
            displacement / 20,
            1
          );

        /* =================================================
           DRAW
        ================================================= */

        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${p.alpha}
          )`;

        ctx.fillRect(
          p.x,
          p.y,

          p.size +
          distortion * 1.4,

          p.size +
          distortion * 1.4
        );
/* =================================================
           VIBRATION TRAIL
        ================================================= */

        if (
          distortion > .15
        ) {

          ctx.beginPath();

          ctx.moveTo(
            p.x,
            p.y
          );

          ctx.lineTo(
            p.x -
            p.vx * 8,

            p.y -
            p.vy * 8
          );

          ctx.strokeStyle =
            `rgba(
              255,
              255,
              255,
              ${distortion * .2}
            )`;

          ctx.lineWidth =
            .55;

          ctx.stroke();

        }

      }
    );

    /* =====================================================
       COUNTER
    ===================================================== */

    counter.textContent =
      `${String(
        activeParticles
      ).padStart(5, "0")} / ${String(
        totalParticles
      ).padStart(5, "0")}`;

    /* =====================================================
       CURSOR
    ===================================================== */

    if (!mobile) {

      gsap.to(
        cursor,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .15,

          ease: "power3.out",

          overwrite: true

        }
      );

      gsap.to(
        ring,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .42,

          ease: "power3.out",

          overwrite: true

        }
      );

    }

    /* =====================================================
       GRID PARALLAX
    ===================================================== */

    const grid =
      stage.querySelector(
        ".res76-grid"
      );

    if (grid) {

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

  /* =======================================================
     INIT
  ======================================================= */

  resize();

  render();

})();

/* =========================================================
   SECTION 77 — PHASE SHIFT ENGINE
========================================================= */

(() => {

  const stage =
    document.getElementById("pha77Stage");

  const canvas =
    document.getElementById("pha77Canvas");

  const cursor =
    document.getElementById("pha77Cursor");

  const ring =
    document.getElementById("pha77Ring");

  const status =
    document.getElementById("pha77Status");

  const counter =
    document.getElementById("pha77Counter");

  const phaseLines =
    document.querySelectorAll(
      "#pha77Stage .pha77-phase-lines span"
    );

  if (!stage || !canvas) return;

  const ctx =
    canvas.getContext("2d");

  const mobile =
    window.matchMedia(
      "(max-width: 768px)"
    ).matches;

  const GAP =
    mobile ? 5 : 3;

  const MAX_PARTICLES =
    mobile ? 4200 : 8500;

  const PHASE_RADIUS =
    mobile ? 95 : 125;

  let width = 0;
  let height = 0;
  let dpr = 1;

  const particles = [];

  let totalParticles = 0;

  let phasePulse = 0;

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

    createParticles();

  }

  window.addEventListener(
    "resize",
    resize
  );

   /* =======================================================
     CREATE TEXT PARTICLES
  ======================================================= */

  function createParticles() {

    particles.length = 0;

    const sample =
      document.createElement("canvas");

    const sampleCtx =
      sample.getContext("2d");

    sample.width =
      width;

    sample.height =
      height;

    let fontSize =
      Math.min(
        width * .16,
        235
      );

    sampleCtx.font =
      `900 ${fontSize}px Arial`;

    while (
      sampleCtx.measureText(
        "PHASE SHIFT"
      ).width >
      width * .84
    ) {

      fontSize -= 2;

      sampleCtx.font =
        `900 ${fontSize}px Arial`;

    }

    sampleCtx.clearRect(
      0,
      0,
      width,
      height
    );

    sampleCtx.fillStyle =
      "#fff";

    sampleCtx.textAlign =
      "center";

    sampleCtx.textBaseline =
      "middle";

    sampleCtx.fillText(
      "PHASE SHIFT",
      width / 2,
      height / 2
    );

    const image =
      sampleCtx.getImageData(
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
          image[index + 3] > 100
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

        particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          phase:
            Math.random() *
            Math.PI * 2,

          frequency:
            .5 +
            Math.random() * 1.4,

          seed:
            Math.random(),

          size:
            .8 +
            Math.random() * 1.4,

          alpha:
            .55 +
            Math.random() * .45

        });

      }
    );

    totalParticles =
      particles.length;

    counter.textContent =
      `00000 / ${String(
        totalParticles
      ).padStart(5, "0")}`;

  }
/* =======================================================
     MOUSE
  ======================================================= */

  window.addEventListener(
    "mousemove",
    e => {

      mouse.targetX =
        e.clientX;

      mouse.targetY =
        e.clientY;

      mouse.active =
        true;

      status.textContent =
        "PHASE FIELD ACTIVE";

    }
  );

  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active =
        false;

      status.textContent =
        "MOVE THROUGH THE PHASE";

    }
  );

  /* =======================================================
     CLICK — PHASE COLLAPSE
  ======================================================= */

  stage.addEventListener(
    "click",
    () => {

      phasePulse = 1;

      status.textContent =
        "PHASE COLLAPSE";

      phaseLines.forEach(
        (line, index) => {

          gsap.killTweensOf(
            line
          );

          gsap.fromTo(
            line,
            {
              scaleX: .05,
              opacity: .7
            },
            {
              scaleX:
                1.5 +
                index * .35,

              opacity: 0,

              duration:
                1.4 +
                index * .25,

              delay:
                index * .13,

              ease: "power3.out"
            }
          );

        }
      );

      gsap.to(
        { value: 1 },
        {

          value: 0,

          duration: 2.6,

          ease: "power3.out",

          onUpdate: function () {

            phasePulse =
              this.targets()[0].value;

          },

          onComplete: () => {

            status.textContent =
              "MOVE THROUGH THE PHASE";

          }

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

    const mdx =
      mouse.x -
      mouse.previousX;

    const mdy =
      mouse.y -
      mouse.previousY;

    const movement =
      Math.sqrt(
        mdx * mdx +
        mdy * mdy
      );

    mouse.speed +=
      (
        movement -
        mouse.speed
      ) * .12;

    mouse.previousX =
      mouse.x;

    mouse.previousY =
      mouse.y;

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    const time =
      performance.now() *
      .001;

    let activeParticles = 0;

    particles.forEach(
      p => {

        /* =================================================
           PHASE FIELD (CURSOR)
        ================================================= */

        let fx = 0;
        let fy = 0;

        if (mouse.active) {

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

          if (
            distance <
            PHASE_RADIUS
          ) {

            const influence =
              1 -
              distance /
              PHASE_RADIUS;

            const shift =
              Math.sin(
                time *
                6 *
                p.frequency +
                p.phase
              );

            /* horizontal phase slip + slight push */
            fx +=
              shift *
              influence *
              (1.2 + mouse.speed * .08) +
              (dx / Math.max(distance, .001)) *
              influence *
              .9;

            fy +=
              (dy / Math.max(distance, .001)) *
              influence *
              .6;

            activeParticles++;

          }

        }

        /* =================================================
           PHASE COLLAPSE PULSE (CLICK)
        ================================================= */

        if (phasePulse > .001) {

          fx +=
            Math.sin(
              p.baseY * .05 +
              time * 8 +
              p.phase
            ) *
            phasePulse *
            (p.seed > .5 ? 2.2 : -2.2);

        }

        /* =================================================
           SPRING BACK TO TEXT
        ================================================= */

        fx +=
          (p.baseX - p.x) *
          .06;

        fy +=
          (p.baseY - p.y) *
          .06;

        p.vx =
          (p.vx + fx) *
          .82;

        p.vy =
          (p.vy + fy) *
          .82;

        p.x +=
          p.vx;

        p.y +=
          p.vy;

        /* =================================================
           DISPLACEMENT
        ================================================= */

        const displacement =
          Math.sqrt(
            Math.pow(
              p.x -
              p.baseX,
              2
            ) +
            Math.pow(
              p.y -
              p.baseY,
              2
            )
          );

        const distortion =
          Math.min(
            displacement / 24,
            1
          );

        /* =================================================
           PHASE TRAILS
        ================================================= */

        if (
          distortion > .12
        ) {

          const trail =
            4 +
            distortion * 8;

          ctx.fillStyle =
            `rgba(
              255,
              255,
              255,
              ${p.alpha *
              distortion *
              .14}
            )`;

          ctx.fillRect(
            p.x -
            p.vx *
            trail,

            p.y -
            p.vy *
            trail,

            p.size,

            p.size
          );

        }

        /* =================================================
           MAIN PARTICLE
        ================================================= */

        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${p.alpha}
          )`;

        ctx.fillRect(
          p.x,
          p.y,

          p.size +
          distortion * 1.3,

          p.size +
          distortion * 1.3
        );

      }
    );

    /* =====================================================
       SPECTRAL PHASE LAYERS
    ===================================================== */

    if (
      mouse.active ||
      phasePulse > .01
    ) {

      const phaseAmount =
        Math.min(
          .9,
          mouse.speed * .025 +
          phasePulse
        );

      /*
       * Draw extremely subtle offset
       * particle echoes.
       */

      particles.forEach(
        p => {

          if (
            p.seed < .86
          ) return;

          const offset =
            3 +
            phaseAmount * 12;

          ctx.fillStyle =
            `rgba(
              255,
              255,
              255,
              ${phaseAmount * .08}
            )`;

          ctx.fillRect(
            p.x + offset,
            p.y,
            p.size,
            p.size
          );

          ctx.fillStyle =
            `rgba(
              255,
              255,
              255,
              ${phaseAmount * .06}
            )`;

          ctx.fillRect(
            p.x - offset,
            p.y,
            p.size,
            p.size
          );

        }
      );

    }

    /* =====================================================
       COUNTER
    ===================================================== */

    counter.textContent =
      `${String(
        activeParticles
      ).padStart(5, "0")} / ${String(
        totalParticles
      ).padStart(5, "0")}`;

    /* =====================================================
       CURSOR
    ===================================================== */

    if (!mobile) {

      gsap.to(
        cursor,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .15,

          ease: "power3.out",

          overwrite: true

        }
      );

      gsap.to(
        ring,
        {

          x: mouse.targetX,
          y: mouse.targetY,

          duration: .42,

          ease: "power3.out",

          overwrite: true

        }
      );

    }

    /* =====================================================
       GRID PARALLAX
    ===================================================== */

    const grid =
      stage.querySelector(
        ".pha77-grid"
      );

    if (grid) {

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

  /* =======================================================
     INIT
  ======================================================= */

  resize();

  render();

})();

/* =========================================================
   SECTION 78
   CHROMATIC DRIFT ENGINE
========================================================= */

(() => {

  const stage =
    document.getElementById(
      "chd78Stage"
    );

  const canvas =
    document.getElementById(
      "chd78Canvas"
    );

  const cursor =
    document.getElementById(
      "chd78Cursor"
    );

  const ring =
    document.getElementById(
      "chd78Ring"
    );

  const status =
    document.getElementById(
      "chd78Status"
    );

  const counter =
    document.getElementById(
      "chd78Counter"
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

  const isMobile =
    window.matchMedia(
      "(max-width: 768px)"
    ).matches;

  const GAP =
    isMobile ? 5 : 3;

  const MAX_PARTICLES =
    isMobile
      ? 4300
      : 8500;


  /* =======================================================
     STATE
  ======================================================= */

  let width = 0;
  let height = 0;
  let dpr = 1;

  let particles = [];

  let totalParticles = 0;

  let burst = 0;

  let burstVelocity = 0;


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
     TEXT PARTICLE GENERATION
  ======================================================= */

  function createText() {

    particles = [];

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
        "CHROMATIC DRIFT"
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
      "CHROMATIC DRIFT",
      width / 2,
      height / 2
    );


    const data =
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
          data[index + 3] >
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

        particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          phase:
            Math.random() *
            Math.PI * 2,

          frequency:
            .5 +
            Math.random() * 1.4,

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


    counter.textContent =
      `00000 / ${String(
        totalParticles
      ).padStart(
        5,
        "0"
      )}`;

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
        "SPECTRAL FIELD ACTIVE";

    }
  );


  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active =
        false;

      status.textContent =
        "MOVE TO DRIFT THE CHANNELS";

    }
  );


  /* =======================================================
     CLICK — SPECTRAL EXPLOSION
  ======================================================= */

  stage.addEventListener(
    "click",
    () => {

      burst = 1;

      burstVelocity = 1;

      status.textContent =
        "CHANNEL SEPARATION";


      const state = {
        value: 0
      };


      gsap.killTweensOf(
        state
      );


      gsap.timeline({

        onUpdate: () => {

          burst =
            state.value;

        },

        onComplete: () => {

          status.textContent =
            "MOVE TO DRIFT THE CHANNELS";

        }

      })

      .to(
        state,
        {
          value: 1,

          duration: .55,

          ease: "power3.out"
        }
      )

      .to(
        state,
        {
          value: 1.8,

          duration: .65,

          ease: "power2.inOut"
        }
      )

      .to(
        state,
        {
          value: 0,

          duration: 1.35,

          ease: "expo.out"
        }
      );

    }
  );
/* =======================================================
     DRAW
  ======================================================= */

  function render() {

    requestAnimationFrame(
      render
    );


    /* -----------------------------------------------------
       SMOOTH POINTER
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


    let affected =
      0;


    /* =====================================================
       PARTICLES
    ===================================================== */

    particles.forEach(
      p => {

        let driftX = 0;
        let driftY = 0;

        let influence = 0;


        /* -------------------------------------------------
           CURSOR DISTANCE
        ------------------------------------------------- */

        if (
          mouse.active
        ) {

          const dx =
            p.baseX -
            mouse.x;

          const dy =
            p.baseY -
            mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );


          const radius =
            isMobile
              ? 100
              : 145;


          if (
            distance <
            radius
          ) {

            influence =
              1 -
              distance /
              radius;


            affected++;


            /*
             * Direction of mouse movement.
             */

            const moveAngle =
              Math.atan2(
                mouse.velocityY,
                mouse.velocityX
              );


            const localPhase =
              time *
              (
                2.5 +
                mouse.speed * .08
              ) *
              p.frequency +
              p.phase;


            const separation =
              influence *
              (
                2 +
                mouse.speed * .65
              );


            /*
             * Horizontal movement
             * creates lateral spectral drift.
             */

            driftX +=
              Math.cos(
                moveAngle
              ) *
              separation;


            /*
             * Vertical component.
             */

            driftY +=
              Math.sin(
                moveAngle
              ) *
              separation *
              .65;


            /*
             * Organic oscillation.
             */

            driftX +=
              Math.sin(
                localPhase
              ) *
              influence *
              5;


            driftY +=
              Math.cos(
                localPhase * .8
              ) *
              influence *
              3;

          }

        }

/* =================================================
           CLICK BURST
        ================================================= */

        if (
          burst > .001
        ) {

          const dx =
            p.baseX -
            width / 2;

          const dy =
            p.baseY -
            height / 2;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );


          const maxDistance =
            Math.max(
              width,
              height
            ) * .72;


          const normalized =
            Math.min(
              distance /
              maxDistance,
              1
            );


          const radialWave =
            Math.sin(
              normalized * 18 -
              burst * 16
            );


          const strength =
            burst *
            (1 - normalized);


          driftX +=
            radialWave *
            strength *
            48;


          driftY +=
            Math.cos(
              normalized * 15 -
              burst * 13
            ) *
            strength *
            30;

        }


        /* =================================================
           CHANNEL BREATHING
        ================================================= */

        const breathing =
          Math.sin(
            time * .9 +
            p.phase
          );


        driftX +=
          breathing *
          influence *
          1.5;


        driftY +=
          Math.cos(
            time * .7 +
            p.phase
          ) *
          influence;


        /* =================================================
           TARGET
        ================================================= */

        const targetX =
          p.baseX +
          driftX;


        const targetY =
          p.baseY +
          driftY;


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
           SPECTRAL SEPARATION
        ================================================= */

        const displacement =
          Math.sqrt(
            (
              p.x -
              p.baseX
            ) ** 2 +
            (
              p.y -
              p.baseY
            ) ** 2
          );


        const separation =
          Math.min(
            displacement * .8 +
            influence *
            mouse.speed *
            .22 +
            burst * 18,

            32
          );


        /*
         * Direction follows
         * pointer velocity.
         */

        const angle =
          Math.atan2(
            mouse.velocityY,
            mouse.velocityX
          );


        const dirX =
          Math.cos(angle);

        const dirY =
          Math.sin(angle);


        /* =================================================
           CHANNEL OFFSETS
        ================================================= */

        const redX =
          p.x -
          dirX *
          separation;

        const redY =
          p.y -
          dirY *
          separation;


        const blueX =
          p.x +
          dirX *
          separation;

        const blueY =
          p.y +
          dirY *
          separation;


        const secondary =
          separation *
          .38;


        const greenX =
          p.x +
          Math.cos(
            angle +
            Math.PI / 2
          ) *
          secondary;


        const greenY =
          p.y +
          Math.sin(
            angle +
            Math.PI / 2
          ) *
          secondary;


        /* =================================================
           RGB CHANNELS
        ================================================= */

        const channelAlpha =
          Math.min(
            .75,
            .08 +
            separation * .025
          );


        /*
         * RED
         */

        ctx.fillStyle =
          `rgba(
            255,
            65,
            75,
            ${channelAlpha}
          )`;


        ctx.fillRect(
          redX,
          redY,

          p.size,
          p.size
        );


        /*
         * BLUE
         */

        ctx.fillStyle =
          `rgba(
            80,
            150,
            255,
            ${channelAlpha}
          )`;


        ctx.fillRect(
          blueX,
          blueY,

          p.size,
          p.size
        );


        /*
         * GREEN / CENTRAL SECONDARY
         */

        ctx.fillStyle =
          `rgba(
            110,
            255,
            190,
            ${channelAlpha * .45}
          )`;


        ctx.fillRect(
          greenX,
          greenY,

          p.size,
          p.size
        );


        /* =================================================
           MAIN WHITE PARTICLE
        ================================================= */

        const mainAlpha =
          Math.max(
            .35,
            p.alpha -
            separation *
            .012
          );


        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${mainAlpha}
          )`;


        ctx.fillRect(
          p.x,
          p.y,

          p.size +
          Math.min(
            separation * .045,
            1.2
          ),

          p.size +
          Math.min(
            separation * .045,
            1.2
          )
        );


        /* =================================================
           HIGH VELOCITY TRAIL
        ================================================= */

        if (
          mouse.speed > 8 &&
          influence > .15
        ) {

          const trail =
            Math.min(
              mouse.speed * .35,
              18
            );


          ctx.fillStyle =
            `rgba(
              255,
              255,
              255,
              ${influence * .08}
            )`;


          ctx.fillRect(
            p.x -
            mouse.velocityX *
            trail *
            .04,

            p.y -
            mouse.velocityY *
            trail *
            .04,

            p.size,
            p.size
          );

        }

      }
    );


    /* =====================================================
       COUNTER
    ===================================================== */

    counter.textContent =
      `${String(
        affected
      ).padStart(
        5,
        "0"
      )} / ${String(
        totalParticles
      ).padStart(
        5,
        "0"
      )}`;


    /* =====================================================
       CURSOR
    ===================================================== */

    if (
      !isMobile
    ) {

      gsap.to(
        cursor,
        {

          x:
            mouse.targetX,

          y:
            mouse.targetY,

          duration: .14,

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

          duration: .4,

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
        ".chd78-grid"
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
        -24;


      const gy =
        (
          mouse.y -
          height / 2
        ) /
        height *
        -24;


      grid.style.transform =
        `translate(
          ${gx}px,
          ${gy}px
        )`;

    }

  }


  /* =======================================================
     INITIALIZE
  ======================================================= */

  resize();

  render();

})();

/* =========================================================
   SECTION 79
   PARALLAX DEPTH ENGINE
========================================================= */

(() => {

  const stage =
    document.getElementById(
      "prd79Stage"
    );

  const canvas =
    document.getElementById(
      "prd79Canvas"
    );

  const cursor =
    document.getElementById(
      "prd79Cursor"
    );

  const ring =
    document.getElementById(
      "prd79Ring"
    );

  const status =
    document.getElementById(
      "prd79Status"
    );

  const counter =
    document.getElementById(
      "prd79Counter"
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
      ? 4200
      : 8200;


  /* =======================================================
     STATE
  ======================================================= */

  let width = 0;
  let height = 0;
  let dpr = 1;

  let particles = [];

  let totalParticles = 0;

  let depthBurst = 0;


  /* =======================================================
     CAMERA
  ======================================================= */

  const camera = {

    x: 0,
    y: 0,

    targetX: 0,
    targetY: 0,

    depth: 0,
    targetDepth: 0,

    previousX: 0,
    previousY: 0,

    speed: 0

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

    camera.x =
      width / 2;

    camera.y =
      height / 2;

    camera.targetX =
      width / 2;

    camera.targetY =
      height / 2;

    camera.previousX =
      width / 2;

    camera.previousY =
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
        225
      );


    sourceCtx.font =
      `900 ${fontSize}px Arial`;


    while (
      sourceCtx.measureText(
        "PARALLAX DEPTH"
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
      "PARALLAX DEPTH",
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

        particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          depth:
            Math.random(),

          depthTarget:
            Math.random(),

          phase:
            Math.random() *
            Math.PI * 2,

          size:
            .75 +
            Math.random() * 1.25,

          alpha:
            .45 +
            Math.random() * .55

        });

      }
    );


    totalParticles =
      particles.length;


    counter.textContent =
      `Z 000 / ${String(
        totalParticles
      ).padStart(
        5,
        "0"
      )}`;

  }
 /* =======================================================
     POINTER
  ======================================================= */

  window.addEventListener(
    "mousemove",
    event => {

      camera.targetX =
        event.clientX;

      camera.targetY =
        event.clientY;


      const dx =
        event.clientX -
        width / 2;

      const dy =
        event.clientY -
        height / 2;


      camera.targetDepth =
        Math.sqrt(
          dx * dx +
          dy * dy
        ) /
        (
          Math.max(
            width,
            height
          ) * .7
        );


      status.textContent =
        "DEPTH FIELD ACTIVE";

    }
  );


  window.addEventListener(
    "mouseleave",
    () => {

      camera.targetX =
        width / 2;

      camera.targetY =
        height / 2;

      camera.targetDepth =
        0;

      status.textContent =
        "MOVE TO CONTROL DEPTH";

    }
  );


  /* =======================================================
     CLICK — DEPTH EXPANSION
  ======================================================= */

  stage.addEventListener(
    "click",
    () => {

      status.textContent =
        "DEPTH EXPANSION";


      const state = {
        value: 0
      };


      gsap.timeline({

        onUpdate: () => {

          depthBurst =
            state.value;

        },

        onComplete: () => {

          status.textContent =
            "MOVE TO CONTROL DEPTH";

        }

      })

      .to(
        state,
        {
          value: 1,

          duration: .55,

          ease: "power3.out"
        }
      )

      .to(
        state,
        {
          value: 2.2,

          duration: .75,

          ease: "power2.inOut"
        }
      )

      .to(
        state,
        {
          value: 0,

          duration: 1.5,

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
       CAMERA
    ----------------------------------------------------- */

    camera.x +=
      (
        camera.targetX -
        camera.x
      ) * .08;


    camera.y +=
      (
        camera.targetY -
        camera.y
      ) * .08;


    camera.depth +=
      (
        camera.targetDepth -
        camera.depth
      ) * .06;


    const vx =
      camera.targetX -
      camera.previousX;


    const vy =
      camera.targetY -
      camera.previousY;


    const speed =
      Math.sqrt(
        vx * vx +
        vy * vy
      );


    camera.speed +=
      (
        speed -
        camera.speed
      ) * .12;


    camera.previousX =
      camera.targetX;

    camera.previousY =
      camera.targetY;


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
       CAMERA ROTATION
    ===================================================== */

    const rotateX =
      (
        camera.y -
        height / 2
      ) /
      height *
      -.22;


    const rotateY =
      (
        camera.x -
        width / 2
      ) /
      width *
      .22;


    /* =====================================================
       PARTICLES
    ===================================================== */

    particles.forEach(
      p => {

        /* -----------------------------------------------
           LOCAL DEPTH
        ----------------------------------------------- */

        const localDepth =
          (
            p.depth +
            camera.depth * .45
          ) /
          1.45;


        /* -----------------------------------------------
           PERSPECTIVE
        ----------------------------------------------- */

        const perspective =
          1 +
          localDepth *
          .34;


        const centerX =
          width / 2;

        const centerY =
          height / 2;


        let targetX =
          centerX +
          (
            p.baseX -
            centerX
          ) *
          perspective;


        let targetY =
          centerY +
          (
            p.baseY -
            centerY
          ) *
          perspective;


        /* -----------------------------------------------
           CAMERA PARALLAX
        ----------------------------------------------- */

        targetX +=
          rotateY *
          localDepth *
          110;


        targetY +=
          rotateX *
          localDepth *
          110;


        /* -----------------------------------------------
           DEPTH BURST
        ----------------------------------------------- */

        if (
          depthBurst > .001
        ) {

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


          const normalized =
            Math.min(
              distance /
              (
                Math.max(
                  width,
                  height
                ) * .7
              ),
              1
            );


          const wave =
            Math.sin(
              normalized * 16 -
              depthBurst * 13
            );


          const burstStrength =
            depthBurst *
            (1 - normalized);


          targetX +=
            dx *
            burstStrength *
            .18;


          targetY +=
            dy *
            burstStrength *
            .18;


          targetX +=
            wave *
            burstStrength *
            18;


          targetY +=
            Math.cos(
              normalized * 13 -
              depthBurst * 11
            ) *
            burstStrength *
            12;

        }


        /* -----------------------------------------------
           SPRING
        ----------------------------------------------- */

        p.vx +=
          (
            targetX -
            p.x
          ) * .045;


        p.vy +=
          (
            targetY -
            p.y
          ) * .045;


        p.vx *= .78;
        p.vy *= .78;


        p.x +=
          p.vx;

        p.y +=
          p.vy;


        /* -----------------------------------------------
           DEPTH SCALE
        ----------------------------------------------- */

        const scale =
          .65 +
          localDepth * .75;


        const size =
          p.size *
          scale;


        /* -----------------------------------------------
           DEPTH BLUR SIMULATION
        ----------------------------------------------- */

        const blur =
          Math.max(
            0,
            localDepth * 2.2 -
            .7
          );


        /* -----------------------------------------------
           FAR DEPTH TRAIL
        ----------------------------------------------- */

        if (
          localDepth > .55
        ) {

          ctx.fillStyle =
            `rgba(
              255,
              255,
              255,
              ${p.alpha *
              .06}
            )`;


          ctx.fillRect(
            p.x -
            p.vx *
            (2 + blur * 3),

            p.y -
            p.vy *
            (2 + blur * 3),

            size * 1.8,
            size * 1.8
          );

        }

  /* -----------------------------------------------
           DEPTH GHOST
        ----------------------------------------------- */

        if (
          localDepth > .35
        ) {

          const ghostOffset =
            localDepth *
            8;


          ctx.fillStyle =
            `rgba(
              255,
              255,
              255,
              ${p.alpha *
              .12}
            )`;


          ctx.fillRect(
            p.x -
            ghostOffset,

            p.y,

            size,
            size
          );


          ctx.fillRect(
            p.x +
            ghostOffset,

            p.y,

            size,
            size
          );

        }


        /* -----------------------------------------------
           MAIN PARTICLE
        ----------------------------------------------- */

        const opacity =
          Math.max(
            .22,
            p.alpha -
            localDepth * .12
          );


        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${opacity}
          )`;


        ctx.fillRect(
          p.x,
          p.y,
          size,
          size
        );

      }
    );


    /* =====================================================
       DEPTH HUD
    ===================================================== */

    const depthValue =
      Math.round(
        camera.depth * 999
      );


    counter.textContent =
      `Z ${String(
        depthValue
      ).padStart(
        3,
        "0"
      )} / ${String(
        totalParticles
      ).padStart(
        5,
        "0"
      )}`;


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
            camera.targetX,

          y:
            camera.targetY,

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
            camera.targetX,

          y:
            camera.targetY,

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
        ".prd79-grid"
      );


    if (
      grid
    ) {

      const gx =
        (
          camera.x -
          width / 2
        ) /
        width *
        -30;


      const gy =
        (
          camera.y -
          height / 2
        ) /
        height *
        -30;


      grid.style.transform =
        `
          perspective(900px)
          rotateX(${rotateX * 8}deg)
          rotateY(${rotateY * 8}deg)
          translate(
            ${gx}px,
            ${gy}px
          )
        `;

    }

  }


  /* =======================================================
     INIT
  ======================================================= */

  resize();

  render();

})();
/* =========================================================
   SECTION 80 — TIME ECHO ENGINE
========================================================= */

(() => {

  const stage =
    document.getElementById(
      "te80Stage"
    );

  const canvas =
    document.getElementById(
      "te80Canvas"
    );

  const cursor =
    document.getElementById(
      "te80Cursor"
    );

  const ring =
    document.getElementById(
      "te80Ring"
    );

  const status =
    document.getElementById(
      "te80Status"
    );

  const counter =
    document.getElementById(
      "te80Counter"
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
      : 8000;

  const MAX_ECHOES =
    mobile ? 5 : 8;


  /* =======================================================
     STATE
  ======================================================= */

  let width = 0;
  let height = 0;
  let dpr = 1;

  let particles = [];

  let snapshots = [];

  let totalParticles = 0;

  let burst = 0;

  let frozen = 0;


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

    directionX: 0,
    directionY: 0,

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

    snapshots = [];

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
        width * .17,
        235
      );


    sourceCtx.font =
      `900 ${fontSize}px Arial`;


    while (
      sourceCtx.measureText(
        "TIME ECHO"
      ).width >
      width * .82
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
      "TIME ECHO",
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

        particles.push({

          x: point.x,
          y: point.y,

          baseX: point.x,
          baseY: point.y,

          vx: 0,
          vy: 0,

          phase:
            Math.random() *
            Math.PI * 2,

          seed:
            Math.random(),

          size:
            .8 +
            Math.random() * 1.25,

          alpha:
            .55 +
            Math.random() * .45

        });

      }
    );


    totalParticles =
      particles.length;


    counter.textContent =
      `ECHO 00 / ${String(
        totalParticles
      ).padStart(
        5,
        "0"
      )}`;

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
        "TEMPORAL FIELD ACTIVE";

    }
  );


  window.addEventListener(
    "mouseleave",
    () => {

      mouse.active =
        false;

      status.textContent =
        "MOVE TO CREATE TIME";

    }
  );

  /* =======================================================
     CLICK — TIME FREEZE + ECHO BURST
  ======================================================= */

  stage.addEventListener(
    "click",
    () => {

      status.textContent =
        "TIME FROZEN";


      gsap.killTweensOf(
        window
      );


      const state = {
        value: 0
      };


      gsap.timeline({

        onUpdate: () => {

          frozen =
            state.value;

          burst =
            state.value;

        },

        onComplete: () => {

          status.textContent =
            "MOVE TO CREATE TIME";

        }

      })

      .to(
        state,
        {
          value: 1,

          duration: .35,

          ease: "power3.out"
        }
      )

      .to(
        state,
        {
          value: 1.8,

          duration: .7,

          ease: "power2.inOut"
        }
      )

      .to(
        state,
        {
          value: 0,

          duration: 1.5,

          ease: "expo.out"
        }
      );

    }
  );


  /* =======================================================
     SAVE TEMPORAL SNAPSHOT
  ======================================================= */

  function saveSnapshot() {

    const snapshot =
      new Float32Array(
        particles.length * 2
      );


    for (
      let i = 0;
      i < particles.length;
      i++
    ) {

      snapshot[i * 2] =
        particles[i].x;

      snapshot[i * 2 + 1] =
        particles[i].y;

    }


    snapshots.unshift(
      snapshot
    );


    if (
      snapshots.length >
      MAX_ECHOES
    ) {

      snapshots.pop();

    }

  }


  /* =======================================================
     RENDER
  ======================================================= */

  let frame = 0;


  function render() {

    requestAnimationFrame(
      render
    );


    frame++;


    /* -----------------------------------------------------
       POINTER SMOOTHING
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


    if (
      rawSpeed > .4
    ) {

      mouse.directionX =
        mouse.velocityX /
        Math.max(
          rawSpeed,
          .001
        );

      mouse.directionY =
        mouse.velocityY /
        Math.max(
          rawSpeed,
          .001
        );

    }


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
       UPDATE MAIN TYPOGRAPHY
    ===================================================== */

    particles.forEach(
      p => {

        const dx =
          p.baseX -
          mouse.x;

        const dy =
          p.baseY -
          mouse.y;


        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        const radius =
          mobile
            ? 110
            : 150;


        let influence =
          0;


        if (
          mouse.active &&
          distance < radius
        ) {

          influence =
            1 -
            distance /
            radius;

        }


        /*
         * Cursor movement bends
         * the present moment.
         */

        const wave =
          Math.sin(
            p.phase +
            time * 3 +
            p.baseX * .008
          );


        const displacement =
          influence *
          (
            3 +
            mouse.speed * .28
          );


        const targetX =
          p.baseX +
          mouse.directionX *
          displacement +
          wave *
          influence *
          2;


        const targetY =
          p.baseY +
          mouse.directionY *
          displacement *
          .65 +
          Math.cos(
            p.phase +
            time * 2
          ) *
          influence *
          1.5;


        /*
         * Freeze makes the
         * present moment rigid.
         */

        const stiffness =
          frozen > .3
            ? .12
            : .055;


        p.vx +=
          (
            targetX -
            p.x
          ) *
          stiffness;


        p.vy +=
          (
            targetY -
            p.y
          ) *
          stiffness;


        p.vx *= .76;
        p.vy *= .76;


        p.x +=
          p.vx;

        p.y +=
          p.vy;

      }
    );


    /* =====================================================
       CAPTURE CURRENT FRAME
    ===================================================== */

    if (
      frame % 3 === 0 &&
      frozen < .6
    ) {

      saveSnapshot();

    }


    /* =====================================================
       DRAW ECHOES
    ===================================================== */

    for (
      let echo = snapshots.length - 1;
      echo >= 0;
      echo--
    ) {

      const snapshot =
        snapshots[echo];


      const age =
        echo + 1;


      /*
       * Older echoes are
       * farther behind.
       */

      const normalizedAge =
        age /
        Math.max(
          snapshots.length,
          1
        );


      let opacity =
        (
          1 -
          normalizedAge
        ) *
        .075;


      opacity *=
        Math.min(
          1 +
          mouse.speed * .025,
          2.4
        );


      if (
        burst > .01
      ) {

        opacity *=
          1 +
          burst * 1.5;

      }


      if (
        opacity <= .001
      ) continue;


      /*
       * Temporal displacement.
       */

      const timeOffset =
        age *
        (
          2 +
          mouse.speed * .12
        );


      const echoX =
        mouse.directionX *
        timeOffset;


      const echoY =
        mouse.directionY *
        timeOffset *
        .65;


      /*
       * Older echoes slowly
       * collapse toward center.
       */

      const collapse =
        frozen > .1
          ? 1
          : 1 -
            normalizedAge *
            .18;


      ctx.save();


      ctx.globalAlpha =
        opacity;


      ctx.translate(
        width / 2,
        height / 2
      );


      ctx.scale(
        collapse,
        collapse
      );


      ctx.translate(
        -width / 2 +
        echoX,

        -height / 2 +
        echoY
      );


      ctx.fillStyle =
        "#ffffff";


      for (
        let i = 0;
        i < particles.length;
        i++
      ) {

        const x =
          snapshot[i * 2];

        const y =
          snapshot[i * 2 + 1];


        const size =
          particles[i].size *
          (
            .7 +
            (1 -
              normalizedAge) *
            .25
          );


        ctx.fillRect(
          x,
          y,
          size,
          size
        );

      }


      ctx.restore();

    }

/* =====================================================
       BURST ECHOES
    ===================================================== */

    if (
      burst > .01
    ) {

      const centerX =
        width / 2;

      const centerY =
        height / 2;


      const burstOffset =
        burst * 35;


      ctx.save();


      ctx.globalAlpha =
        burst * .08;


      ctx.translate(
        centerX,
        centerY
      );


      ctx.scale(
        1 +
        burst * .045,
        1 +
        burst * .045
      );


      ctx.translate(
        -centerX +
        mouse.directionX *
        burstOffset,

        -centerY +
        mouse.directionY *
        burstOffset *
        .6
      );


      ctx.fillStyle =
        "#fff";


      particles.forEach(
        p => {

          ctx.fillRect(
            p.x,
            p.y,
            p.size * 1.3,
            p.size * 1.3
          );

        }
      );


      ctx.restore();

    }


    /* =====================================================
       MAIN PRESENT MOMENT
    ===================================================== */

    particles.forEach(
      p => {

        const velocity =
          Math.sqrt(
            p.vx * p.vx +
            p.vy * p.vy
          );


        const stretch =
          Math.min(
            velocity * .25,
            3
          );


        ctx.fillStyle =
          `rgba(
            255,
            255,
            255,
            ${p.alpha}
          )`;


        ctx.fillRect(
          p.x -
          p.vx *
          .05,

          p.y -
          p.vy *
          .05,

          p.size +
          stretch,

          p.size +
          stretch
        );

      }
    );


    /* =====================================================
       TEMPORAL SCAN
    ===================================================== */

    const scan =
      (
        time * 80
      ) %
      (height + 300) -
      150;


    const gradient =
      ctx.createLinearGradient(
        0,
        scan - 50,
        0,
        scan + 50
      );


    gradient.addColorStop(
      0,
      "rgba(255,255,255,0)"
    );


    gradient.addColorStop(
      .5,
      "rgba(255,255,255,.025)"
    );


    gradient.addColorStop(
      1,
      "rgba(255,255,255,0)"
    );


    ctx.fillStyle =
      gradient;


    ctx.fillRect(
      0,
      scan - 50,
      width,
      100
    );


    /* =====================================================
       COUNTER
    ===================================================== */

    const echoCount =
      Math.min(
        snapshots.length,
        MAX_ECHOES
      );


    counter.textContent =
      `ECHO ${String(
        echoCount
      ).padStart(
        2,
        "0"
      )} / ${String(
        MAX_ECHOES
      ).padStart(
        2,
        "0"
      )}`;


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
        ".te80-grid"
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


  /* =======================================================
     INIT
  ======================================================= */

  resize();

  render();

})();


/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
