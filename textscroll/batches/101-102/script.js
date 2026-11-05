gsap.registerPlugin(ScrollTrigger);

/* ========================================================
   SECTION 101: BLACK HOLE
    ======================================================== */

    (() => {
  const root = document.querySelector("#en101-blackhole");
  if (!root || !window.gsap) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];

  const stage = $(".en101-stage");
  const canvas = $(".en101-canvas");
  const ctx = canvas.getContext("2d");

  const copy = $(".en101-copy");
  const titleLines = $$(".en101-title > span");
  const eyebrow = $(".en101-eyebrow");
  const description = $(".en101-description");
  const scrollCue = $(".en101-scroll");

  const hole = $(".en101-hole");
  const lensing = $(".en101-lensing");
  const diskBack = $(".en101-disk-back");
  const diskMain = $(".en101-disk-main");
  const photonRing = $(".en101-photon-ring");
  const blackCore = $(".en101-black-core");
  const innerRing = $(".en101-inner-ring");

  const orbits = $$(".en101-orbit");
  const labels = $$(".en101-label");
  const particlesContainer = $(".en101-particles");
  const collapseText = $(".en101-collapse-text");
  const collapseLines = $$(".en101-collapse-line");
  const singularity = $(".en101-singularity");

  const finalScene = $(".en101-final");
  const finalRule = $(".en101-final-rule");
  const gravityValue = $(".en101-gravity-value");
  const progressBar = $(".en101-progress span");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let rotation = 0;
  let animationFrame = null;
  let isVisible = true;

  const clamp = gsap.utils.clamp;

  // Create orbiting particles.
  const particles = [];

  for (let i = 0; i < 54; i++) {
    const particle = document.createElement("span");
    particle.className = "en101-particle";

    const angle = Math.random() * Math.PI * 2;
    const radius = gsap.utils.random(48, 160);

    particle.style.setProperty(
      "--size",
      `${gsap.utils.random(1, 2.4)}px`
    );

    particlesContainer.appendChild(particle);

    particles.push({
      element: particle,
      angle,
      radius,
      speed: gsap.utils.random(0.001, 0.006),
      size: gsap.utils.random(0.5, 1.3)
    });
  }

  // Canvas star field.
  const stars = Array.from(
    { length: window.innerWidth < 600 ? 75 : 150 },
    () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.1 + 0.2,
      alpha: Math.random() * 0.55 + 0.1,
      phase: Math.random() * Math.PI * 2
    })
  );

  function resizeCanvas() {
    const rect = stage.getBoundingClientRect();

    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawCanvas();
  }

  function drawCanvas() {
    if (!ctx || !width || !height) return;

    ctx.clearRect(0, 0, width, height);

    const cx = width / 2 + mouseX * 25;
    const cy = height / 2 + mouseY * 25;

    // Star field.
    for (const star of stars) {
      const dx = star.x * width - cx;
      const dy = star.y * height - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Slight visual displacement near the black hole.
      const lensStrength = Math.min(
        1,
        22000 / Math.max(distance * distance, 1000)
      );

      const x = star.x * width + dx * lensStrength * 0.018;
      const y = star.y * height + dy * lensStrength * 0.018;

      ctx.beginPath();
      ctx.arc(x, y, star.radius, 0, Math.PI * 2);

      ctx.fillStyle = `rgba(255,255,255,${
        star.alpha * (0.85 + Math.sin(rotation * 2 + star.phase) * 0.15)
      })`;

      ctx.fill();
    }

    // Faint radial gravitational field.
    const fieldRadius = Math.min(width, height) * 0.48;
    const gradient = ctx.createRadialGradient(
      cx, cy, fieldRadius * 0.12,
      cx, cy, fieldRadius
    );

    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.48, "rgba(255,255,255,0.025)");
    gradient.addColorStop(0.72, "rgba(255,255,255,0.012)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  resizeCanvas();

  function animate() {
    if (!isVisible) {
      animationFrame = null;
      return;
    }

    mouseX += (targetX - mouseX) * 0.055;
    mouseY += (targetY - mouseY) * 0.055;

    if (!reduceMotion) {
      rotation += 0.002;
    }

    drawCanvas();

  const particleCenterX = width / 2;
    const particleCenterY = height / 2;

    particles.forEach((particle) => {
      particle.angle += reduceMotion ? 0 : particle.speed;

      const angle = particle.angle;
      const radius = particle.radius;

      const x = particleCenterX + Math.cos(angle) * radius;
      const y = particleCenterY + Math.sin(angle) * radius * 0.38;

      gsap.set(particle.element, {
        x: x - particleCenterX,
        y: y - particleCenterY,
        scale: particle.size,
        opacity: clamp(
          0.12,
          0.8,
          (radius / 160) * 0.8
        )
      });
    });

    animationFrame = requestAnimationFrame(animate);
  }

  if (!reduceMotion) {
    animate();
  }

  // Initial reveal.
  gsap.set(titleLines, {
    yPercent: 115,
    opacity: 0,
    rotateX: -18,
    transformOrigin: "center bottom"
  });

  gsap.set([eyebrow, description, scrollCue], {
    y: 16,
    opacity: 0
  });

  gsap.set(orbits, {
    scale: 1.12,
    opacity: 0
  });

  gsap.set(hole, {
    scale: 0.6,
    opacity: 0
  });

  gsap.set(labels, {
    opacity: 0
  });

  gsap.set(finalScene, {
    opacity: 0,
    y: "-45%"
  });

  gsap.set(collapseText, {
    opacity: 0
  });

  gsap.set(singularity, {
    opacity: 0,
    scale: 0
  });

  const introTimeline = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  introTimeline
    .to(orbits, {
      scale: 1,
      opacity: 1,
      duration: 1.4,
      stagger: 0.12
    }, 0)
    .to(hole, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out"
    }, 0.1)
    .to(eyebrow, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.15)
    .to(titleLines, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.15
    }, 0.2)
    .to(description, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.75)
    .to(scrollCue, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.9);

  // Continuous rotation.
  if (!reduceMotion) {
    gsap.to(diskMain, {
      rotation: "+=360",
      duration: 50,
      repeat: -1,
      ease: "none"
    });

    gsap.to(diskBack, {
      rotation: "-=360",
      duration: 65,
      repeat: -1,
      ease: "none"
    });

    gsap.to(orbits[0], {
      rotation: 360,
      duration: 90,
      repeat: -1,
      ease: "none"
    });

    gsap.to(orbits[1], {
      rotation: -360,
      duration: 65,
      repeat: -1,
      ease: "none"
    });

    gsap.to(orbits[2], {
      rotation: 360,
      duration: 42,
      repeat: -1,
      ease: "none"
    });

    gsap.to(lensing, {
      scale: 1.08,
      opacity: 0.65,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

// Cursor-driven gravitational distortion.
  root.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();

    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    gsap.to(hole, {
      x: targetX * 16,
      y: targetY * 12,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to(copy, {
      x: targetX * -9,
      y: targetY * -5,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to(orbits, {
      x: targetX * 9,
      y: targetY * 9,
      duration: 0.9,
      stagger: 0.03,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to(lensing, {
      x: targetX * -8,
      y: targetY * -8,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto"
    });
  });

  root.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;

    gsap.to([hole, copy, ...orbits, lensing], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto"
    });
  });

  // Scroll sequence.
  if (ScrollTrigger && !reduceMotion) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gravityValue.textContent =
            `${(1 + self.progress * 99).toFixed(1)}×`;
        }
      }
    });

    timeline
      // 1. The typography retreats into the gravitational field.
      .to(copy, {
        scale: 0.72,
        opacity: 0.28,
        filter: "blur(4px)",
        duration: 1
      }, 0)

      .to(hole, {
        scale: 1.28,
        duration: 1.4,
        ease: "power2.inOut"
      }, 0)

      .to(orbits, {
        scale: 0.85,
        duration: 1.2,
        stagger: 0.06
      }, 0)

      .to(diskMain, {
        scaleY: 0.75,
        duration: 1
      }, 0.2)

      // 2. The black core expands.
      .to(blackCore, {
        scale: 1.5,
        duration: 1.2,
        ease: "power2.inOut"
      }, 1)

      .to(photonRing, {
        scale: 1.2,
        duration: 1.1
      }, 1)

      .to(innerRing, {
        scale: 1.35,
        opacity: 0.5,
        duration: 1
      }, 1)

      .to(labels, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.1
      }, 1.1)

      // 3. Everything begins collapsing.
      .to(copy, {
        scale: 0.35,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.7
      }, 1.8)

      .to(hole, {
        scale: 1.8,
        duration: 1,
        ease: "power2.in"
      }, 1.7)

      .to(diskMain, {
        scaleY: 0.15,
        opacity: 0.4,
        duration: 0.8
      }, 1.85)

      .to(diskBack, {
        scaleY: 0.1,
        opacity: 0.2,
        duration: 0.8
      }, 1.85)

      .to(orbits, {
        scale: 0.45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.04
      }, 1.9)

      .to(labels, {
        opacity: 0,
        duration: 0.35
      }, 2)

      // 4. The accretion disk compresses into a point.
      .to(hole, {
        scale: 0.08,
        opacity: 0,
        duration: 0.85,
        ease: "power3.in"
      }, 2.75)

      .to(collapseText, {
        opacity: 1,
        duration: 0.2
      }, 2.8)

      .to(collapseLines[0], {
        scaleX: 0.03,
        scaleY: 1.8,
        opacity: 0.8,
        duration: 0.55,
        ease: "power3.in"
      }, 2.95)

      .to(collapseLines[1], {
        scaleX: 0.03,
        scaleY: 1.8,
        opacity: 0.8,
        duration: 0.55,
        ease: "power3.in"
      }, 3.05)

      .to(collapseText, {
        scale: 0.01,
        opacity: 0,
        duration: 0.45,
        ease: "power4.in"
      }, 3.55)

      .to(singularity, {
        scale: 1,
        opacity: 1,
        duration: 0.15
      }, 3.85)

      // 5. Even the point of light disappears.
      .to(singularity, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power4.in"
      }, 4.2)

      .to(stage, {
        backgroundColor: "#000000",
        duration: 0.25
      }, 4.2)

      // 6. A final statement emerges from the darkness.
      .to(finalScene, {
        opacity: 1,
        y: "-50%",
        duration: 0.9,
        ease: "power3.out"
      }, 4.55)

      .to(finalRule, {
        width: "min(180px, 35vw)",
        duration: 0.7,
        ease: "power2.inOut"
      }, 5)

      .to(progressBar, {
        scaleX: 1,
        duration: 5.5,
        ease: "none"
      }, 0);

  } else {
    // Graceful fallback when ScrollTrigger is unavailable.
    gsap.set(copy, { clearProps: "transform,filter,opacity" });
    gsap.set(titleLines, { clearProps: "transform,opacity" });
    gsap.set([eyebrow, description, scrollCue], {
      clearProps: "transform,opacity"
    });
    gsap.set(hole, { clearProps: "transform,opacity" });
    gsap.set(orbits, { clearProps: "transform,opacity" });

    gsap.set(finalScene, {
      opacity: 1,
      y: "-50%"
    });

    gsap.set(finalRule, {
      width: "min(180px, 35vw)"
    });

    gravityValue.textContent = "100×";
  }

  // Keep the canvas crisp after resizing.
  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      resizeCanvas();

      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, 150);
  });

  // Pause the canvas loop while the page is hidden.
  document.addEventListener("visibilitychange", () => {
    isVisible = !document.hidden;

    if (!isVisible && animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    } else if (isVisible && !reduceMotion && !animationFrame) {
      animate();
    }
  });
})();

/* =========================================================
    SECTION 102: TIME DILATION
========================================================= */

(() => {
  const root = document.querySelector("#en102-time");
  if (!root || !window.gsap) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];

  const stage = $(".en102-stage");
  const canvas = $(".en102-canvas");
  const ctx = canvas.getContext("2d");

  const intro = $(".en102-intro");
  const titleLines = $$(".en102-title > span");
  const eyebrow = $(".en102-eyebrow");
  const description = $(".en102-description");
  const scrollCue = $(".en102-scroll");

  const clock = $(".en102-clock");
  const hourHand = $(".en102-hour-hand");
  const minuteHand = $(".en102-minute-hand");
  const clockDigits = $$(".en102-clock-digit");
  const orbits = $$(".en102-clock-orbit");

  const echoContainer = $(".en102-echo-container");
  const echoes = $$(".en102-echo");

  const secondScene = $(".en102-second");
  const splitScene = $(".en102-time-split");
  const timeColumns = $$(".en102-time-column");
  const dividers = $$(".en102-time-divider");
  const freezeScene = $(".en102-freeze");

  const finalScene = $(".en102-final");
  const finalRule = $(".en102-final-rule");

  const speedDisplay = $(".en102-speed");
  const progressBar = $(".en102-progress span");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let width = 0;
  let height = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let clockRotation = 0;
  let animationFrame = null;
  let visible = !document.hidden;

  const stars = Array.from(
    { length: window.innerWidth < 600 ? 65 : 130 },
    () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.55 + 0.1,
      phase: Math.random() * Math.PI * 2
    })
  );

  // Canvas setup.
  function resizeCanvas() {
    const rect = stage.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawCanvas();
  }

  function drawCanvas() {
    if (!ctx || !width || !height) return;

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2 + mouseX * 20;
    const centerY = height / 2 + mouseY * 20;

    stars.forEach((star) => {
      const dx = star.x * width - centerX;
      const dy = star.y * height - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const distortion = Math.min(
        1,
        18000 / Math.max(distance * distance, 1000)
      );

      const x = star.x * width + dx * distortion * 0.015;
      const y = star.y * height + dy * distortion * 0.015;

      ctx.beginPath();
      ctx.arc(x, y, star.radius, 0, Math.PI * 2);

      ctx.fillStyle = `rgba(255,255,255,${
        star.opacity *
        (0.8 + Math.sin(clockRotation + star.phase) * 0.2)
      })`;

      ctx.fill();
    });

    // Subtle circular time field.
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 20,
      centerX, centerY, Math.min(width, height) * 0.48
    );

    gradient.addColorStop(0, "rgba(255,255,255,0.025)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.012)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  resizeCanvas();

  // Animate background and clock.
  function animate() {
    if (!visible) {
      animationFrame = null;
      return;
    }

    mouseX += (targetX - mouseX) * 0.06;
    mouseY += (targetY - mouseY) * 0.06;

    if (!reduceMotion) {
      clockRotation += 0.003;
    }

    drawCanvas();

    animationFrame = requestAnimationFrame(animate);
  }

  if (!reduceMotion) animate();

  // Create intro states.
  gsap.set(titleLines, {
    yPercent: 115,
    opacity: 0,
    rotateX: -18,
    transformOrigin: "center bottom"
  });

  gsap.set([eyebrow, description, scrollCue], {
    y: 18,
    opacity: 0
  });

  gsap.set(orbits, {
    scale: 1.15,
    opacity: 0
  });

 gsap.set(clock, {
    scale: 0.8,
    opacity: 0
  });

  gsap.set(echoContainer, {
    opacity: 0
  });

  gsap.set(echoes, {
    xPercent: -50,
    yPercent: -50
  });

  gsap.set(secondScene, {
    opacity: 0
  });

  gsap.set(splitScene, {
    opacity: 0
  });

  gsap.set(timeColumns, {
    opacity: 0,
    y: 40
  });

  gsap.set(dividers, {
    height: 0
  });

  gsap.set(freezeScene, {
    opacity: 0
  });

  gsap.set(finalScene, {
    opacity: 0,
    y: "-45%"
  });

  // Intro timeline.
  const introTimeline = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  introTimeline
    .to(orbits, {
      scale: 1,
      opacity: 1,
      duration: 1.4,
      stagger: 0.1
    }, 0)
    .to(clock, {
      scale: 1,
      opacity: 0.75,
      duration: 1.3
    }, 0.1)
    .to(eyebrow, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.15)
    .to(titleLines, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.15
    }, 0.2)
    .to(description, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.8)
    .to(scrollCue, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.95);

  // Clock hands and orbit animations.
  if (!reduceMotion) {
    gsap.to(hourHand, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "none"
    });

    gsap.to(minuteHand, {
      rotation: -360,
      duration: 12,
      repeat: -1,
      ease: "none"
    });

    gsap.to(orbits[0], {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: "none"
    });

    gsap.to(orbits[1], {
      rotation: -360,
      duration: 45,
      repeat: -1,
      ease: "none"
    });
  }

 // Cursor creates delayed echoes.
  root.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();

    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    gsap.to(intro, {
      x: targetX * -10,
      y: targetY * -6,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to(clock, {
      x: targetX * 16,
      y: targetY * 16,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to(orbits, {
      x: targetX * 8,
      y: targetY * 8,
      duration: 1,
      stagger: 0.04,
      ease: "power3.out",
      overwrite: "auto"
    });

    // Small time echo around the cursor.
    if (!reduceMotion && Math.random() > 0.92) {
      const echo = document.createElement("span");

      echo.textContent = "11:11";
      echo.style.cssText = `
        position:absolute;
        z-index:18;
        left:${event.clientX - rect.left}px;
        top:${event.clientY - rect.top}px;
        color:#fff;
        font-size:10px;
        letter-spacing:3px;
        pointer-events:none;
        opacity:.6;
      `;

      stage.appendChild(echo);

      gsap.to(echo, {
        y: -35,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => echo.remove()
      });
    }
  });

  root.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;

    gsap.to([intro, clock, ...orbits], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto"
    });
  });

  // Scroll timeline.
  if (ScrollTrigger && !reduceMotion) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=3200",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          speedDisplay.textContent =
            `${Math.max(0.01, 1 - progress * 0.99).toFixed(2)}×`;

          $(".en102-coordinate-left").textContent =
            `T+ ${String(Math.floor(progress * 99)).padStart(2, "0")}:00:00`;
        }
      }
    });

    timeline
      // 1. Time starts slowing down.
      .to(intro, {
        scale: 0.78,
        opacity: 0.35,
        filter: "blur(3px)",
        duration: 1
      }, 0)

      .to(clock, {
        scale: 1.2,
        duration: 1.3
      }, 0)

      .to(orbits, {
        scale: 0.85,
        duration: 1.2
      }, 0)

      .to(hourHand, {
        rotation: "+=180",
        duration: 1.2
      }, 0)

      .to(minuteHand, {
        rotation: "-=270",
        duration: 1.2
      }, 0)

      // 2. Time echoes multiply.
      .to(echoContainer, {
        opacity: 1,
        duration: 0.35
      }, 1)

      .fromTo(echoes[0], {
        scale: 0.85,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.6
      }, 1)

      .fromTo(echoes[1], {
        scale: 0.8,
        x: "-50%"
      }, {
        scale: 1.25,
        x: "-50%",
        opacity: 0.65,
        duration: 1
      }, 1.15)

      .fromTo(echoes[2], {
        scale: 0.7,
        x: "-50%"
      }, {
        scale: 1.55,
        x: "-50%",
        opacity: 0.35,
        duration: 1.1
      }, 1.25)

      .fromTo(echoes[3], {
        scale: 0.6,
        x: "-50%"
      }, {
        scale: 1.9,
        x: "-50%",
        opacity: 0.15,
        duration: 1.2
      }, 1.35)

      .to(intro, {
        opacity: 0,
        scale: 0.6,
        filter: "blur(8px)",
        duration: 0.7
      }, 1.6)

      .to(clock, {
        opacity: 0.2,
        scale: 1.5,
        duration: 0.7
      }, 1.6)

      // 3. One second becomes forever.
      .to(echoContainer, {
        opacity: 0,
        scale: 1.8,
        duration: 0.5
      }, 2)

      .to(secondScene, {
        opacity: 1,
        duration: 0.7
      }, 2.1)

      .fromTo(secondScene.querySelector("h2"), {
        scaleX: 1.8,
        scaleY: 0.65,
        filter: "blur(8px)"
      }, {
        scaleX: 1,
        scaleY: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out"
      }, 2.2)

      .to(clock, {
        scale: 0.5,
        opacity: 0,
        duration: 0.7
      }, 2.1)

      .to(secondScene, {
        opacity: 0,
        scale: 0.85,
        duration: 0.6
      }, 3.1)

      // 4. Past, present and future separate.
      .to(splitScene, {
        opacity: 1,
        duration: 0.4
      }, 3.3)

      .to(dividers, {
        height: "45%",
        duration: 0.8,
        stagger: 0.15
      }, 3.35)

      .to(timeColumns, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: "power3.out"
      }, 3.5)

      .to(timeColumns[0], {
        x: -15,
        opacity: 0.5,
        duration: 0.7
      }, 4.3)

      .to(timeColumns[2], {
        x: 15,
        opacity: 0.5,
        duration: 0.7
      }, 4.3)

      // 5. Everything freezes at 11:11:11.
      .to(splitScene, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6
      }, 4.75)

      .to(freezeScene, {
        opacity: 1,
        duration: 0.6
      }, 5)

      .fromTo(".en102-freeze-clock", {
        scale: 1.5,
        letterSpacing: "0.05em",
        filter: "blur(10px)"
      }, {
        scale: 1,
        letterSpacing: "-0.08em",
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out"
      }, 5.1)

      .to(stage, {
        backgroundColor: "#000000",
        duration: 0.4
      }, 5.3)

      // 6. Final statement.
      .to(freezeScene, {
        scale: 0.7,
        opacity: 0,
        duration: 0.6
      }, 5.85)

      .to(finalScene, {
        opacity: 1,
        y: "-50%",
        duration: 0.9,
        ease: "power3.out"
      }, 6.1)

      .to(finalRule, {
        width: "min(180px, 35vw)",
        duration: 0.7
      }, 6.6)

      .to(progressBar, {
        scaleX: 1,
        duration: 7,
        ease: "none"
      }, 0);

  } else {
    // Reduced-motion / no ScrollTrigger fallback.
    gsap.set(intro, { clearProps: "transform,filter,opacity" });
    gsap.set(titleLines, { clearProps: "transform,opacity" });
    gsap.set([eyebrow, description, scrollCue], {
      clearProps: "transform,opacity"
    });
    gsap.set(clock, { clearProps: "transform,opacity" });
    gsap.set(orbits, { clearProps: "transform,opacity" });

    gsap.set(finalScene, {
      opacity: 1,
      y: "-50%"
    });

    gsap.set(finalRule, {
      width: "min(180px, 35vw)"
    });

    speedDisplay.textContent = "1.0×";
  }

  // Responsive canvas.
  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      resizeCanvas();

      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, 150);
  });

  // Pause background rendering when tab is hidden.
  document.addEventListener("visibilitychange", () => {
    visible = !document.hidden;

    if (!visible && animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    } else if (visible && !reduceMotion && !animationFrame) {
      animate();
    }
  });
})();


/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
