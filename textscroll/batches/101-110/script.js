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
   SECTION 103 — KINETIC PATH TEXT
   Scroll position slides the text along two SVG curves in
   opposite directions. Scroll velocity bends the curves and
   skews the scene, then everything eases back to calm.
========================================================= */

(() => {
  const root = document.querySelector("#en103-path");
  if (!root || !window.gsap) return;

  const svg = root.querySelector(".en103-svg");
  const curves = [
    root.querySelector("#en103-curve-a"),
    root.querySelector("#en103-curve-b")
  ];
  const guides = [
    root.querySelector(".en103-guide-a"),
    root.querySelector(".en103-guide-b")
  ];
  const textPaths = [...root.querySelectorAll("textPath")];
  const readouts = [...root.querySelectorAll(".en103-readout b")];
  const progressBar = root.querySelector(".en103-progress span");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Line A sits above line B; B runs in the opposite phase so they cross.
  const LINES = [
    { y: 380, phaseShift: 0 },
    { y: 560, phaseShift: Math.PI }
  ];
  const X_START = -200;
  const X_END = 1800;
  const POINTS = 96;

  function buildPath(line, amplitude, phase) {
    let d = "";

    for (let i = 0; i <= POINTS; i++) {
      const t = i / POINTS;
      const x = X_START + (X_END - X_START) * t;
      // Two layered sines give a looser, more organic curve.
      const y =
        line.y +
        Math.sin(t * Math.PI * 2.2 + phase + line.phaseShift) * amplitude +
        Math.sin(t * Math.PI * 5.1 + phase * 1.7) * amplitude * 0.18;

      d += (i ? " L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
    }

    return d;
  }

  function setCurves(amplitude, phase) {
    LINES.forEach((line, index) => {
      const d = buildPath(line, amplitude, phase);
      curves[index].setAttribute("d", d);
      guides[index].setAttribute("d", d);
    });
  }

  // Repeat each phrase until the text is long enough to keep the
  // curve filled for the whole scroll distance.
  const travel = [];

  setCurves(90, 0);
  const pathLength = curves[0].getTotalLength();

  textPaths.forEach((textPath, index) => {
    const phrase = textPath.dataset.phrase;
    textPath.textContent = phrase;

    const phraseLength = textPath.getComputedTextLength() || 1;
    const repeats = Math.ceil((pathLength * 2.4) / phraseLength);

    textPath.textContent = phrase.repeat(repeats);

    const textLength = textPath.getComputedTextLength();
    travel[index] = Math.max(0, textLength - pathLength * 1.15);
  });

  function setOffsets(progress) {
    // A drifts left, B drifts right.
    textPaths[0].setAttribute("startOffset", (-travel[0] * progress).toFixed(1));
    textPaths[1].setAttribute("startOffset", (-travel[1] * (1 - progress)).toFixed(1));
  }

  if (reducedMotion || !window.ScrollTrigger) {
    setCurves(70, 0.6);
    setOffsets(0.35);
    return;
  }

  setOffsets(0);

  const state = {
    progress: 0,
    velocity: 0, // px/s from ScrollTrigger, decays every frame
    bend: 0,     // eased extra amplitude caused by velocity
    skew: 0,
    time: 0,
    lastReadout: ""
  };

  const setSkew = gsap.quickSetter(svg, "skewY", "deg");
  const setScaleY = gsap.quickSetter(svg, "scaleY");

  function tick(_time, deltaTime) {
    const dt = Math.min(deltaTime, 50) / 16.67; // in 60fps frames

    state.time += 0.004 * dt;
    state.velocity *= Math.pow(0.9, dt);

    const speed = Math.abs(state.velocity);
    const targetBend = Math.min(speed / 12, 220);
    const targetSkew = gsap.utils.clamp(-7, 7, state.velocity / 350);

    state.bend += (targetBend - state.bend) * Math.min(1, 0.12 * dt);
    state.skew += (targetSkew - state.skew) * Math.min(1, 0.1 * dt);

    // Base amplitude breathes with progress; velocity adds bend on top.
    const amplitude = 40 + Math.sin(state.progress * Math.PI) * 70 + state.bend;
    const phase = state.progress * Math.PI * 3 + state.time;

    setCurves(amplitude, phase);
    setSkew(state.skew);
    setScaleY(1 + state.bend / 1400);

    const velocityText = String(Math.min(999, Math.round(speed / 10))).padStart(3, "0");
    const bendText = String(Math.round(amplitude)).padStart(3, "0");
    const readout = velocityText + bendText;

    if (readout !== state.lastReadout) {
      readouts[0].textContent = velocityText;
      readouts[1].textContent = bendText;
      state.lastReadout = readout;
    }
  }

  // Only animate while the section is on screen.
  let ticking = false;

  function setTicking(active) {
    if (active === ticking) return;
    ticking = active;

    if (active) gsap.ticker.add(tick);
    else gsap.ticker.remove(tick);
  }

  ScrollTrigger.create({
    trigger: root,
    start: "top top",
    end: "+=2600",
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      state.progress = self.progress;
      state.velocity = self.getVelocity();
      progressBar.style.transform = `scaleX(${self.progress})`;
      setOffsets(self.progress);
    }
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => setTicking(entry.isIntersecting))
      .observe(root);
  } else {
    setTicking(true);
  }

  tick(0, 16.67);
})();


/* =========================================================
   SECTION 104 — THE SIMULATION
========================================================= */

(() => {
  const root = document.querySelector("#en104-simulation");
  if (!root || !window.gsap) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];

  const stage = $(".en104-stage");
  const gridCanvas = $(".en104-grid-canvas");
  const particleCanvas = $(".en104-particle-canvas");
  const gridOverlay = $(".en104-grid-overlay");

  const gridCtx = gridCanvas.getContext("2d");
  const particleCtx = particleCanvas.getContext("2d");

  const intro = $(".en104-intro");
  const titleLines = $$(".en104-title span");
  const introItems = $$(".en104-eyebrow, .en104-intro-bottom");

  const wireObject = $(".en104-wire-object");
  const wireCube = $(".en104-wire-cube");
  const wireOrbits = $$(".en104-wire-orbit");

  const diagnostics = $(".en104-diagnostics");
  const breach = $(".en104-breach");
  const breachText = $(".en104-glitch-text");
  const breachLine = $(".en104-breach-line");

  const messages = $$(".en104-message");
  const failure = $(".en104-failure");
  const errorBar = $(".en104-error-bar span");
  const finalScene = $(".en104-final");
  const finalRule = $(".en104-final-rule");

  const progress = $(".en104-progress span");

  const integrity = $(".en104-integrity");
  const inputState = $(".en104-input-state");
  const coordinateDisplay = $(".en104-coordinates");
  const fpsDisplay = $(".en104-fps");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let width = 0;
  let height = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let raf = null;
  let tabVisible = !document.hidden;
  let inView = true;
  let frameCount = 0;
  let fpsUpdate = performance.now();

  /* ---------- Canvas: grid + drifting particles ---------- */

  const particles = Array.from(
    { length: window.innerWidth < 600 ? 45 : 100 },
    () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.3 + .3,
      opacity: Math.random() * .5 + .1,
      speed: Math.random() * .15 + .04
    })
  );

  function resizeCanvas() {
    const rect = stage.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    [gridCanvas, particleCanvas].forEach((canvas) => {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
    });

    gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawGrid();
    drawParticles();
  }

  function drawGrid() {
    if (!width || !height) return;

    gridCtx.clearRect(0, 0, width, height);

    const spacing = 55;
    const centerX = width / 2 + mouseX * 25;
    const centerY = height / 2 + mouseY * 25;
    const offsetX = (centerX - width / 2) * .15;
    const offsetY = (centerY - height / 2) * .15;

    gridCtx.lineWidth = .5;
    gridCtx.strokeStyle = "rgba(255,255,255,0.11)";
    gridCtx.beginPath();

    for (let x = -spacing; x < width + spacing; x += spacing) {
      gridCtx.moveTo(x + offsetX, 0);
      gridCtx.lineTo(x + offsetX, height);
    }

    for (let y = -spacing; y < height + spacing; y += spacing) {
      gridCtx.moveTo(0, y + offsetY);
      gridCtx.lineTo(width, y + offsetY);
    }

    gridCtx.stroke();

    // Perspective center.
    const gradient = gridCtx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, Math.min(width, height) * .55
    );

    gradient.addColorStop(0, "rgba(255,255,255,0.04)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    gridCtx.fillStyle = gradient;
    gridCtx.fillRect(0, 0, width, height);
  }

  function drawParticles() {
    if (!width || !height) return;

    particleCtx.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particleCtx.beginPath();

      particleCtx.arc(
        particle.x * width + mouseX * 10,
        particle.y * height + mouseY * 10,
        particle.size,
        0,
        Math.PI * 2
      );

      particleCtx.fillStyle = `rgba(255,255,255,${particle.opacity})`;
      particleCtx.fill();
    });
  }

  // The eased pointer is written to CSS variables; the CSS applies it via
  // the `translate` property so it never fights the GSAP scroll transforms.
  let lastX = null;
  let lastY = null;

  function writePointerVars() {
    if (lastX !== null && Math.abs(mouseX - lastX) < .001 && Math.abs(mouseY - lastY) < .001) {
      return;
    }

    lastX = mouseX;
    lastY = mouseY;
    root.style.setProperty("--en104-mx", mouseX.toFixed(4));
    root.style.setProperty("--en104-my", mouseY.toFixed(4));
  }

  function render() {
    if (!tabVisible || !inView) {
      raf = null;
      return;
    }

    const now = performance.now();

    mouseX += (targetX - mouseX) * .06;
    mouseY += (targetY - mouseY) * .06;

    particles.forEach((particle) => {
      particle.y += particle.speed * .0005;

      if (particle.y > 1) {
        particle.y = 0;
        particle.x = Math.random();
      }
    });

    drawGrid();
    drawParticles();
    writePointerVars();

    frameCount++;

    if (now - fpsUpdate >= 1000) {
      const fps = Math.round(frameCount * 1000 / (now - fpsUpdate));
      fpsDisplay.textContent = String(Math.min(fps, 999)).padStart(3, "0") + " FPS";

      frameCount = 0;
      fpsUpdate = now;
    }

    raf = requestAnimationFrame(render);
  }

  function startLoop() {
    if (!reducedMotion && !raf && tabVisible && inView) render();
  }

  resizeCanvas();
  startLoop();

  // Pause rendering while off-screen or while the tab is hidden.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      startLoop();
    }).observe(root);
  }

  document.addEventListener("visibilitychange", () => {
    tabVisible = !document.hidden;

    if (!tabVisible && raf) {
      cancelAnimationFrame(raf);
      raf = null;
    } else {
      startLoop();
    }
  });

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      resizeCanvas();
      if (ScrollTrigger) ScrollTrigger.refresh();
    }, 150);
  });

  /* ---------- Pointer ---------- */

  root.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();

    targetX = gsap.utils.clamp(-1, 1, ((event.clientX - rect.left) / rect.width - .5) * 2);
    targetY = gsap.utils.clamp(-1, 1, ((event.clientY - rect.top) / rect.height - .5) * 2);

    coordinateDisplay.textContent =
      `X: ${String(Math.round((targetX + 1) * 500)).padStart(3, "0")} / ` +
      `Y: ${String(Math.round((targetY + 1) * 500)).padStart(3, "0")}`;

    inputState.textContent = "TRACKING";
  });

  root.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    inputState.textContent = "WAITING";
  });

  /* ---------- Initial states ---------- */

  // Centering moves from CSS into GSAP so scale tweens keep it.
  gsap.set([wireObject, breach], { x: 0, y: 0, xPercent: -50, yPercent: -50 });
  gsap.set([failure, finalScene], { y: 0, yPercent: -50 });

  if (reducedMotion || !ScrollTrigger) {
    // Static, readable opening. Later scenes stay hidden so nothing overlaps.
    gsap.set(wireObject, { opacity: .6 });
    return;
  }

  gsap.set(titleLines, {
    yPercent: 120,
    opacity: 0,
    rotateX: -15,
    transformOrigin: "center bottom"
  });

  gsap.set(introItems, { y: 20, opacity: 0 });
  gsap.set([wireObject, diagnostics], { opacity: 0, scale: .8 });
  gsap.set(wireOrbits, { scale: .5, opacity: 0 });
  gsap.set(breach, { opacity: 0 });
  gsap.set(breachLine, { width: 0 });
  gsap.set(messages, { opacity: 0, y: 20 });
  gsap.set(failure, { opacity: 0, scale: .8 });
  gsap.set(finalScene, { opacity: 0, yPercent: -45 });

  /* ---------- Intro reveal ---------- */

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(titleLines, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.1,
      stagger: .15
    }, .1)
    .to(introItems, {
      y: 0,
      opacity: 1,
      duration: .8,
      stagger: .12
    }, .5)
    .to([wireObject, diagnostics], {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      stagger: .2
    }, .2)
    .to(wireOrbits, {
      opacity: 1,
      scale: 1,
      duration: 1.1,
      stagger: .2
    }, .5);

  /* ---------- Ambient movement ---------- */

  const cubeSpin = gsap.to(wireCube, {
    rotationX: 360,
    rotationY: 360,
    duration: 18,
    repeat: -1,
    ease: "none"
  });

  gsap.to(wireOrbits[0], {
    rotation: 360,
    duration: 22,
    repeat: -1,
    ease: "none"
  });

  gsap.to(wireOrbits[1], {
    rotation: -360,
    duration: 16,
    repeat: -1,
    ease: "none"
  });

  /* ---------- Scroll timeline ---------- */

  const GLITCH_START = 2.1;
  const GLITCH_END = 2.9;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "+=3700",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;

        progress.style.transform = `scaleX(${p})`;
        integrity.textContent = Math.max(0, 100 - p * 100).toFixed(2) + "%";
      }
    },
    // Show the red/white glitch layers only while the breach scene plays.
    onUpdate() {
      const t = this.time();
      breach.classList.toggle("is-glitching", t >= GLITCH_START && t < GLITCH_END);
    }
  });

  timeline
    // 1. System initialization.
    .to(intro, {
      scale: .75,
      opacity: .2,
      filter: "blur(5px)",
      duration: 1
    }, 0)

    .to(wireObject, {
      scale: 1.8,
      rotation: 35,
      duration: 1.4
    }, 0)

    .to(diagnostics, {
      opacity: 1,
      duration: .6
    }, .2)

    // 2. Reality begins to glitch: the cube spins up, then settles.
    .to(wireObject, {
      scale: 2.5,
      rotation: 100,
      duration: 1.2
    }, 1.2)

    .to(cubeSpin, {
      timeScale: 9,
      duration: .6,
      ease: "power2.in"
    }, 1.2)

    .to(cubeSpin, {
      timeScale: 1,
      duration: .8,
      ease: "power2.out"
    }, 1.9)

    .to(diagnostics, {
      x: -30,
      opacity: .45,
      duration: .8
    }, 1.5)

    .to(intro, {
      opacity: 0,
      scale: .5,
      filter: "blur(12px)",
      duration: .6
    }, 1.5)

    // 3. System breach.
    .to(breach, {
      opacity: 1,
      duration: .5
    }, 2)

    .fromTo(breachText, {
      x: -30,
      skewX: -15,
      scaleX: 1.5
    }, {
      x: 0,
      skewX: 0,
      scaleX: 1,
      duration: .6,
      ease: "power4.out"
    }, GLITCH_START)

    .to(breachLine, {
      width: "45%",
      duration: .8
    }, 2.3)

    .to(wireObject, {
      scale: 3,
      rotation: 180,
      opacity: .2,
      duration: .9
    }, 2)

    // 4. System messages.
    .to(breach, {
      opacity: 0,
      scale: 1.4,
      duration: .5
    }, GLITCH_END)

    .to(messages, {
      opacity: 1,
      y: 0,
      duration: .7,
      stagger: .3
    }, 3.1)

    .to(messages[0], {
      x: 50,
      opacity: .35,
      duration: .7
    }, 4)

    .to(messages[1], {
      x: -40,
      opacity: .65,
      duration: .7
    }, 4.1)

    .to(messages[2], {
      scale: 1.2,
      duration: .7
    }, 4.2)

    // 5. Simulation failure.
    .to(messages, {
      opacity: 0,
      scale: .8,
      filter: "blur(8px)",
      duration: .5
    }, 4.8)

    .to(failure, {
      opacity: 1,
      scale: 1,
      duration: .8,
      ease: "power3.out"
    }, 5)

    .fromTo(errorBar, {
      scaleX: 1
    }, {
      scaleX: 0,
      duration: 1.2,
      ease: "power2.inOut"
    }, 5.5)

    .to(wireObject, {
      scale: .1,
      opacity: 0,
      duration: .8
    }, 5.2)

    // The world goes dark: grid and overlay fade out.
    .to(gridCanvas, {
      opacity: .15,
      duration: .5
    }, 5.8)

    .to(gridOverlay, {
      opacity: 0,
      duration: .5
    }, 5.8)

    // 6. Final reveal.
    .to(failure, {
      opacity: 0,
      scale: 1.5,
      filter: "blur(12px)",
      duration: .6
    }, 6.2)

    .to(finalScene, {
      opacity: 1,
      yPercent: -50,
      duration: 1,
      ease: "power3.out"
    }, 6.6)

    .to(finalRule, {
      width: "min(200px, 35vw)",
      duration: .8
    }, 7.2);
})();


/* =========================================================
   SECTION 105 — THE MULTIVERSE
========================================================= */

(() => {
  const root = document.querySelector("#en105-multiverse");
  if (!root || !window.gsap) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const $ = (s) => root.querySelector(s);
  const $$ = (s) => [...root.querySelectorAll(s)];

  const intro = $(".en105-intro");
  const heading = $$(".en105-heading > span");
  const introBits = $$(".en105-kicker,.en105-subline,.en105-scroll-cue");
  const portals = $$(".en105-portal");
  const rings = $$(".en105-ring");
  const orbits = $$(".en105-orbit");
  const split = $(".en105-split");
  const fragments = $$(".en105-fragments span");
  const collision = $(".en105-collision");
  const collisionLine = $(".en105-line");
  const singularity = $(".en105-singularity");
  const singularityRings = $$(".en105-singularity-ring");
  const finalScene = $(".en105-final");
  const finalRule = $(".en105-final-rule");
  const progress = $(".en105-progress span");
  const index = $(".en105-index");
  const count = $(".en105-count");
  const stability = $(".en105-stability");
  const coordinates = $(".en105-coordinate-left");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => window.matchMedia("(max-width: 650px)").matches;
  const spread = () => (isMobile() ? 27 : 34);

  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

  // Centre elements with xPercent/yPercent so GSAP owns the transforms and
  // the scroll tweens don't drop the CSS translate(-50%,-50%) offset.
  gsap.set([...orbits, singularity], { xPercent: -50, yPercent: -50 });
  gsap.set([split, collision, finalScene], { yPercent: -50 });
  gsap.set(orbits[0], { rotation: -22 });
  gsap.set(orbits[1], { rotation: 55 });
  gsap.set(portals, {
    xPercent: -50,
    yPercent: -50,
    x: (i) => (i - 1) * spread() + "vw",
    y: (i) => (i === 1 && !isMobile() ? "-3vh" : 0),
    rotationY: (i) => (isMobile() ? 0 : (1 - i) * 25),
    scale: (i) => (i === 1 ? (isMobile() ? .8 : 1.05) : (isMobile() ? .72 : .8)),
    opacity: 0
  });

  gsap.set(heading,{yPercent:110,opacity:0,rotateX:-12,transformOrigin:"center bottom"});
  gsap.set(introBits,{y:18,opacity:0});
  gsap.set(split,{opacity:0,scale:.9});
  gsap.set(fragments,{opacity:0,y:20});
  gsap.set(collision,{opacity:0,scale:.9});
  gsap.set(singularity,{opacity:0,scale:1.5});
  gsap.set(finalScene,{opacity:0,y:"6vh"});

  gsap.timeline({defaults:{ease:"power3.out"}})
    .to(heading,{yPercent:0,opacity:1,rotateX:0,duration:1.15,stagger:.16},.1)
    .to(introBits,{y:0,opacity:1,duration:.75,stagger:.12},.45);

  if(!reducedMotion){
    gsap.to(orbits[0],{rotation:"+=360",duration:70,repeat:-1,ease:"none"});
    gsap.to(orbits[1],{rotation:"-=360",duration:90,repeat:-1,ease:"none"});
    gsap.to(rings,{rotation:360,duration:24,repeat:-1,ease:"none",stagger:2});
  }

  root.addEventListener("pointermove",(event)=>{
    const rect=root.getBoundingClientRect();
    targetX=((event.clientX-rect.left)/rect.width-.5)*2;
    targetY=((event.clientY-rect.top)/rect.height-.5)*2;
    coordinates.innerHTML=`X <b>${String(Math.round((targetX+1)*500)).padStart(3,"0")}.00</b><br>Y <b>${String(Math.round((targetY+1)*500)).padStart(3,"0")}.00</b>`;
  });

  // Pointer parallax uses the independent CSS `translate` property so it
  // stacks on top of the GSAP transforms instead of overwriting them.
  function pointerFrame(){
    currentX+=(targetX-currentX)*.07;
    currentY+=(targetY-currentY)*.07;
    portals.forEach((el,i)=>{el.style.translate=`${(currentX*(i+1)*9).toFixed(2)}px ${(currentY*(i+1)*7).toFixed(2)}px`;});
    orbits.forEach((el)=>{el.style.translate=`${(currentX*-12).toFixed(2)}px ${(currentY*-9).toFixed(2)}px`;});
    requestAnimationFrame(pointerFrame);
  }
  if(!reducedMotion) pointerFrame();

  if(ScrollTrigger && !reducedMotion){
    const tl=gsap.timeline({
      scrollTrigger:{
        trigger:root,start:"top top",end:"+=4200",scrub:1,pin:true,
        anticipatePin:1,invalidateOnRefresh:true,
        onUpdate:(self)=>{
          const p=self.progress;
          progress.style.transform=`scaleX(${p})`;
          index.textContent=String(Math.min(999,Math.round(1+p*99))).padStart(3,"0");
          count.textContent=String(Math.min(999,Math.round(1+p*998))).padStart(3,"0");
          stability.textContent=`${Math.max(0,100-p*100).toFixed(0)}%`;
        }
      }
    });

    tl
      // 1. The original reality dissolves.
      .to(intro,{scale:.78,opacity:.15,filter:"blur(7px)",duration:1},0)
      .to(orbits[0],{scale:1.25,opacity:.2,duration:1},0)
      // 2. Three timelines branch out.
      .to(portals,{opacity:1,duration:.8,stagger:.18},1)
      .to(portals[0],{x:()=>-spread()+"vw",rotationY:22,scale:.9,duration:1.4},1)
      .to(portals[1],{y:"-3vh",scale:1.12,duration:1.4},1)
      .to(portals[2],{x:()=>spread()+"vw",rotationY:-22,scale:.9,duration:1.4},1)
      .to(split,{opacity:1,scale:1,duration:.8},2.1)
      .to(split,{opacity:0,scale:1.12,filter:"blur(8px)",duration:.6},3)
      // 3. Different outcomes.
      .to(fragments,{opacity:1,y:0,duration:.55,stagger:.22},3.1)
      .to(portals,{scale:1.18,rotation:(i)=>(i-1)*13,duration:1.1},3.3)
      .to(fragments,{x:(i)=>(i%2?-90:90),y:(i)=>(i<2?-45:45),opacity:.35,duration:1},4.1)
      // 4. Parallel universes collide.
      .to(portals,{x:0,y:0,rotationY:0,scale:.75,rotation:0,opacity:.55,duration:1.2},4.8)
      .to(collision,{opacity:1,scale:1,duration:.8},5.1)
      .to(collisionLine,{width:"min(260px,45vw)",duration:.8},5.6)
      .to(fragments,{opacity:0,scale:.7,duration:.45},5.2)
      // 5. Every branch collapses into one point.
      .to(collision,{opacity:0,scale:1.15,filter:"blur(10px)",duration:.6},6.3)
      .to(portals,{scale:.12,opacity:0,rotation:(i)=>(i-1)*80,duration:1.3,ease:"power3.in"},6.4)
      .to(singularity,{opacity:1,scale:.7,duration:1},6.5)
      .to(singularityRings,{rotation:(i)=>i?-180:180,scaleY:(i)=>i?.5:.18,duration:1.4},6.7)
      .to(singularity,{scale:.025,opacity:.1,duration:.8,ease:"power4.in"},8)
      // 6. Final reveal (short hold at the end so it isn't cut off).
      .to(finalScene,{opacity:1,y:0,duration:1,ease:"power3.out"},8.4)
      .to(finalRule,{width:"min(220px,40vw)",duration:.8},9.1)
      .to({},{duration:.4},9.9);
  }else{
    gsap.set(heading,{clearProps:"all"});
    gsap.set(introBits,{clearProps:"all"});
    gsap.set(intro,{clearProps:"all"});
    gsap.set(finalScene,{opacity:1,y:0});
    gsap.set(finalRule,{width:"min(220px,40vw)"});
  }

  let resizeTimer;
  window.addEventListener("resize",()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{if(ScrollTrigger)ScrollTrigger.refresh();},180);
  });
})();


/* =========================================================
   SECTION 106 — THE AFTERLIFE OF LIGHT
========================================================= */

(() => {
  const root=document.querySelector("#en106-afterlight");
  if(!root||!window.gsap)return;

  const gsap=window.gsap;
  const ScrollTrigger=window.ScrollTrigger;
  if(ScrollTrigger)gsap.registerPlugin(ScrollTrigger);

  const $=s=>root.querySelector(s);
  const $$=s=>[...root.querySelectorAll(s)];

  const stage=$(".en106-stage");
  const canvas=$(".en106-canvas");
  const ctx=canvas.getContext("2d");
  const intro=$(".en106-intro");
  const introLines=$$(".en106-intro h1 span");
  const introBits=$$(".en106-kicker,.en106-intro>p,.en106-scroll");
  const beam=$(".en106-beam-wrap");
  const trace=$(".en106-trace-copy");
  const memory=$(".en106-memory");
  const memoryRule=$(".en106-memory-rule");
  const words=$$(".en106-fragment-words span");
  const finalScene=$(".en106-final");
  const finalRule=$(".en106-final-rule");
  const progress=$(".en106-progress span");
  const status=$(".en106-status");
  const particleCount=$(".en106-particle-count");
  const energy=$(".en106-energy");
  const traceState=$(".en106-trace");
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width=0,height=0,dpr=1;
  let pointerX=0,pointerY=0,targetX=0,targetY=0;
  let particles=[];
  let raf=0,visible=!document.hidden,time=0;

  const makeParticles=()=>{
    const total=window.innerWidth<650?100:190;
    particles=Array.from({length:total},()=>({
      x:Math.random(),y:Math.random(),
      vx:(Math.random()-.5)*.0008,vy:(Math.random()-.5)*.0008,
      r:Math.random()*1.5+.35,a:Math.random()*.7+.15,
      phase:Math.random()*Math.PI*2
    }));
  };

  function resize(){
    const rect=stage.getBoundingClientRect();
    width=rect.width;height=rect.height;
    dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);
    canvas.height=Math.round(height*dpr);
    canvas.style.width=width+"px";
    canvas.style.height=height+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
    makeParticles();
    draw();
  }

  function draw(){
    if(!width||!height)return;
    ctx.clearRect(0,0,width,height);
    const cx=width*.5+pointerX*width*.08;
    const cy=height*.5+pointerY*height*.08;

    // Fine, drifting, softly twinkling light particles.
    particles.forEach(p=>{
      const px=p.x*width+pointerX*18;
      const py=p.y*height+pointerY*18;
      const alpha=p.a*(.65+.35*Math.sin(time*.02+p.phase));
      ctx.beginPath();
      ctx.arc(px,py,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${alpha.toFixed(3)})`;
      ctx.fill();
    });

    // Delicate luminous trails curving out from the centre.
    const spread=Math.min(width,height)*.42;
    for(let i=0;i<34;i++){
      const angle=(i/34)*Math.PI*2;
      const bend=Math.sin(angle*2+pointerX*2)*pointerY*18;
      const x2=cx+Math.cos(angle)*spread;
      const y2=cy+Math.sin(angle)*spread+bend;
      const grad=ctx.createLinearGradient(cx,cy,x2,y2);
      grad.addColorStop(0,"rgba(255,255,255,0.16)");
      grad.addColorStop(.55,"rgba(255,255,255,0.035)");
      grad.addColorStop(1,"rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.moveTo(cx,cy);
      ctx.quadraticCurveTo(
        cx+Math.cos(angle+1.1)*spread*.3,
        cy+Math.sin(angle+1.1)*spread*.3,
        x2,y2
      );
      ctx.strokeStyle=grad;
      ctx.lineWidth=.65;
      ctx.stroke();
    }
  }

  function animate(){
    if(!visible){raf=0;return;}
    time++;
    pointerX+=(targetX-pointerX)*.055;
    pointerY+=(targetY-pointerY)*.055;
    particles.forEach(p=>{
      p.x=(p.x+p.vx+1)%1;
      p.y=(p.y+p.vy+1)%1;
    });
    draw();
    raf=requestAnimationFrame(animate);
  }

  resize();
  if(!reduced)animate();

  // Let GSAP own the centring so scroll tweens keep the -50% offsets.
  gsap.set(beam,{xPercent:-50,yPercent:-50,rotation:-18,opacity:0,scaleX:.05});
  gsap.set([trace,memory,finalScene],{yPercent:-50});

  gsap.set(introLines,{yPercent:115,opacity:0,rotateX:-12,transformOrigin:"center bottom"});
  gsap.set(introBits,{y:18,opacity:0});
  gsap.set(trace,{opacity:0,scale:.9});
  gsap.set(memory,{opacity:0,scale:.9});
  gsap.set(words,{opacity:0,y:20});
  gsap.set(finalScene,{opacity:0,y:"6vh"});

  gsap.timeline({defaults:{ease:"power3.out"}})
    .to(introLines,{yPercent:0,opacity:1,rotateX:0,duration:1.1,stagger:.13},.1)
    .to(introBits,{y:0,opacity:1,duration:.7,stagger:.12},.45);

  root.addEventListener("pointermove",event=>{
    const rect=stage.getBoundingClientRect();
    targetX=((event.clientX-rect.left)/rect.width-.5)*2;
    targetY=((event.clientY-rect.top)/rect.height-.5)*2;
  });
  root.addEventListener("pointerleave",()=>{targetX=0;targetY=0});

  if(ScrollTrigger&&!reduced){
    const tl=gsap.timeline({
      scrollTrigger:{
        trigger:root,start:"top top",end:"+=4000",scrub:1,pin:true,
        anticipatePin:1,invalidateOnRefresh:true,
        onUpdate:self=>{
          const p=self.progress;
          progress.style.transform=`scaleX(${p})`;
          particleCount.textContent=String(Math.round(particles.length*(1+p))).padStart(3,"0");
          energy.textContent=`${Math.max(0,100-p*100).toFixed(0)}%`;
          status.textContent=p>.78?"FADING":p>.25?"ACTIVE":"DORMANT";
          traceState.textContent=p>.78?"FADING":p>.4?"FRAGMENTED":"STABLE";
        }
      }
    });

    tl
      // 1 — A single point of light wakes up.
      .to(beam,{opacity:1,scaleX:1,duration:1.1},0)
      .to(intro,{opacity:.12,scale:.78,filter:"blur(8px)",duration:1},0)
      // 2 — The beam travels and leaves a memory.
      .to(beam,{rotation:18,scaleX:1.35,x:"8vw",duration:1.4},1)
      .to(beam,{rotation:-25,x:"-7vw",scaleX:1.1,duration:1.2},2.1)
      .to(trace,{opacity:1,scale:1,duration:.7},2.1)
      .to(trace,{opacity:0,scale:1.15,filter:"blur(8px)",duration:.6},3.1)
      // 3 — The light breaks into fragments.
      .to(beam,{scaleX:.08,scaleY:14,rotation:90,opacity:.65,duration:1.1},3.2)
      .to(words,{opacity:1,y:0,duration:.5,stagger:.18},3.5)
      .to(words,{x:(i)=>(i%2?-70:70),y:(i)=>(i<2?-45:45),opacity:.35,duration:1},4.2)
      // 4 — Memory reconstructs from the fragments.
      .to(words,{opacity:0,scale:.5,duration:.45},5.1)
      .to(beam,{opacity:0,scale:0,duration:.5},5.1)
      .to(memory,{opacity:1,scale:1,duration:1,ease:"power3.out"},5.4)
      .to(memoryRule,{width:"min(240px,45vw)",duration:.8},6.1)
      .to(memory,{scale:1.08,duration:1},6.8)
      // 5 — Everything slowly dissolves.
      .to(memory,{opacity:0,scale:1.2,filter:"blur(12px)",duration:.8},7.7)
      .to(memoryRule,{width:0,duration:.4},7.7)
      .to(finalScene,{opacity:1,y:0,duration:1,ease:"power3.out"},8.4)
      .to(finalRule,{width:"min(220px,42vw)",duration:.8},9.1)
      .to(finalScene,{opacity:.92,duration:.7},10)
      .to({},{duration:.3},10.7);
  }else{
    gsap.set(introLines,{clearProps:"all"});
    gsap.set(introBits,{clearProps:"all"});
    gsap.set(intro,{clearProps:"all"});
    gsap.set(finalScene,{opacity:1,y:0});
    gsap.set(finalRule,{width:"min(220px,42vw)"});
  }

  let resizeTimer;
  window.addEventListener("resize",()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{
      resize();
      if(ScrollTrigger)ScrollTrigger.refresh();
    },160);
  });

  document.addEventListener("visibilitychange",()=>{
    visible=!document.hidden;
    if(!visible&&raf){cancelAnimationFrame(raf);raf=0;}
    else if(visible&&!reduced&&!raf)animate();
  });
})();


/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
