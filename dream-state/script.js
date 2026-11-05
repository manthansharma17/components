(() => {
  const root = document.querySelector("#en105-dream");
  if (!root || !window.gsap) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];

  const stage = $(".en105-stage");
  const canvas = $(".en105-canvas");
  const ctx = canvas.getContext("2d");

  const intro = $(".en105-intro");
  const titleLines = $$(".en105-title span");
  const introItems = $$(".en105-eyebrow, .en105-intro-description, .en105-enter");

  const objects = $$(".en105-object");
  const objectInners = objects.map((object) => object.firstElementChild);
  const cube = $(".en105-cube");
  const ring = $(".en105-ring");
  const sphere = $(".en105-sphere");

  const distortion = $(".en105-distortion");
  const distortionCopies = $$(".en105-distortion-copy");
  const distortionLine = $(".en105-distortion-line");

  const fragments = $$(".en105-fragment");
  const gravity = $(".en105-gravity");
  const collapse = $(".en105-collapse");
  const collapseRings = $$(".en105-collapse-ring");
  const finalScene = $(".en105-final");
  const finalRule = $(".en105-final-rule");

  const progress = $(".en105-progress span");
  const depthLabel = $(".en105-coordinate-left");

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

  /* =========================================
     01. BACKGROUND CANVAS + POINTER PARALLAX
  ========================================= */

  const particles = Array.from(
    { length: window.innerWidth < 600 ? 45 : 90 },
    () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.3 + 0.2,
      opacity: Math.random() * 0.5 + 0.1
    })
  );

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
    draw();
  }

  function draw() {
    if (!ctx || !width || !height) return;

    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      const x = particle.x * width + mouseX * 10;
      const y = particle.y * height + mouseY * 10;

      ctx.beginPath();
      ctx.arc(x, y, particle.size, 0, Math.PI * 2);

      ctx.fillStyle = `rgba(255,255,255,${particle.opacity})`;
      ctx.fill();
    });

    // Central dream glow.
    const glow = ctx.createRadialGradient(
      width / 2 + mouseX * 20,
      height / 2 + mouseY * 20,
      5,
      width / 2 + mouseX * 20,
      height / 2 + mouseY * 20,
      Math.min(width, height) * 0.45
    );

    glow.addColorStop(0, "rgba(255,255,255,0.035)");
    glow.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  // The eased pointer position is written to CSS variables; the CSS applies
  // it through the `translate` property, which stacks on top of the GSAP
  // `transform` tweens instead of overwriting them.
  let lastX = null;
  let lastY = null;

  function writePointerVars() {
    if (lastX !== null && Math.abs(mouseX - lastX) < 0.001 && Math.abs(mouseY - lastY) < 0.001) {
      return;
    }

    lastX = mouseX;
    lastY = mouseY;
    root.style.setProperty("--en105-mx", mouseX.toFixed(4));
    root.style.setProperty("--en105-my", mouseY.toFixed(4));
  }

  function animateCanvas() {
    if (!tabVisible || !inView) {
      raf = null;
      return;
    }

    mouseX += (targetX - mouseX) * 0.06;
    mouseY += (targetY - mouseY) * 0.06;

    draw();
    writePointerVars();
    raf = requestAnimationFrame(animateCanvas);
  }

  function startLoop() {
    if (!reducedMotion && !raf && tabVisible && inView) animateCanvas();
  }

  resizeCanvas();
  startLoop();

  if (!reducedMotion) {
    root.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();

      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    root.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
    });
  }

  // Pause the canvas when the section is off-screen or the tab is hidden.
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

  /* =========================================
     02. INITIAL STATES
  ========================================= */

  // Centering is moved from CSS into GSAP so later scale tweens keep it.
  gsap.set([distortion, collapse], { x: 0, y: 0, xPercent: -50, yPercent: -50 });
  gsap.set(collapseRings, { x: 0, y: 0, xPercent: -50, yPercent: -50 });
  gsap.set([gravity, finalScene], { y: 0, yPercent: -50 });

  /* =========================================
     03. REDUCED MOTION — STATIC OPENING
  ========================================= */

  if (reducedMotion || !ScrollTrigger) {
    gsap.set(objects, { opacity: 0.65, scale: 1 });
    return;
  }

  gsap.set(titleLines, {
    yPercent: 120,
    opacity: 0,
    rotateX: -20,
    transformOrigin: "center bottom"
  });

  gsap.set(introItems, { y: 20, opacity: 0 });
  gsap.set(objects, { scale: 0, opacity: 0 });
  gsap.set(distortion, { opacity: 0 });
  gsap.set(distortionLine, { width: 0 });
  gsap.set(fragments, { opacity: 0, y: 30 });
  gsap.set(gravity, { opacity: 0 });
  gsap.set(collapse, { opacity: 0, scale: 0.4 });
  gsap.set(collapseRings, { scale: 0.2, opacity: 0 });
  gsap.set(finalScene, { opacity: 0, yPercent: -45 });

  /* =========================================
     04. INTRO REVEAL
  ========================================= */

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(objects, {
      scale: 1,
      opacity: 0.8,
      duration: 1.3,
      stagger: 0.12
    }, 0)
    .to(titleLines, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.16
    }, 0.2)
    .to(introItems, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12
    }, 0.65);

  /* =========================================
     05. IDLE OBJECT MOTION
     Runs on the inner shapes so it never competes
     with the scroll timeline, which drives the
     outer .en105-object wrappers.
  ========================================= */

  gsap.to(cube, {
    rotateX: "+=360",
    rotateY: "+=390",
    duration: 14,
    ease: "none",
    repeat: -1
  });

  gsap.to(ring, {
    rotationX: 360,
    rotationY: 360,
    duration: 12,
    ease: "none",
    repeat: -1
  });

  gsap.to(sphere, {
    scale: 1.25,
    duration: 2.5,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  objectInners.forEach((inner, index) => {
    gsap.to(inner, {
      y: index % 2 === 0 ? -28 : 28,
      x: index % 2 === 0 ? 12 : -12,
      duration: 3 + index * 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });

  /* =========================================
     06. SCROLL-CONTROLLED CINEMATIC SEQUENCE
  ========================================= */

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "+=3600",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progress.style.transform = `scaleX(${self.progress})`;
        depthLabel.textContent =
          `DREAM DEPTH / ${String(Math.round(self.progress * 999)).padStart(3, "0")}`;
      }
    }
  });

  timeline
    // 1. Enter the dream.
    .to(intro, {
      scale: 0.75,
      opacity: 0.3,
      filter: "blur(5px)",
      duration: 1
    }, 0)

    .to(objects, {
      scale: 1.35,
      duration: 1.3,
      stagger: 0.08
    }, 0)

    // 2. Reality bends.
    .to(distortion, {
      opacity: 1,
      duration: 0.6
    }, 1.2)

    .fromTo(distortionCopies[0], {
      scaleX: 0.5,
      scaleY: 1.4,
      filter: "blur(10px)"
    }, {
      scaleX: 1.1,
      scaleY: 0.8,
      filter: "blur(0px)",
      duration: 1
    }, 1.25)

    .to(distortionCopies[1], {
      x: 18,
      y: -12,
      duration: 1
    }, 1.4)

    .to(distortionLine, {
      width: "55%",
      duration: 0.8
    }, 1.5)

    .to(objects, {
      y: (index) => index % 2 === 0 ? -130 : 130,
      rotation: (index) => index % 2 === 0 ? 90 : -90,
      duration: 1.5,
      stagger: 0.06
    }, 1.5)

    .to(intro, {
      opacity: 0,
      scale: 0.5,
      filter: "blur(15px)",
      duration: 0.6
    }, 1.6)

    .to(distortion, {
      opacity: 0,
      scale: 1.5,
      duration: 0.6
    }, 2.2)

    // 3. Memories appear.
    .to(fragments, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.25,
      ease: "power3.out"
    }, 2.4)

    .to(fragments[0], {
      x: 90,
      rotation: 4,
      duration: 1
    }, 2.9)

    .to(fragments[1], {
      x: -90,
      rotation: -4,
      duration: 1
    }, 3)

    .to(fragments[2], {
      y: -70,
      scale: 1.3,
      duration: 1
    }, 3.1)

    // 4. Gravity reverses.
    .to(fragments, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5
    }, 3.6)

    .to(gravity, {
      opacity: 1,
      duration: 0.6
    }, 3.8)

    .fromTo(gravity.querySelector("h2"), {
      y: -150,
      scaleY: 0.6,
      filter: "blur(10px)"
    }, {
      y: 0,
      scaleY: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out"
    }, 3.85)

    .to(objects, {
      y: (index) => index % 2 === 0 ? 180 : -180,
      rotation: (index) => index % 2 === 0 ? -180 : 180,
      duration: 1.3,
      stagger: 0.04
    }, 3.9)

    .to(gravity, {
      scale: 1.2,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.8
    }, 4.8)

    // 5. The dream collapses.
    .to(collapse, {
      opacity: 1,
      scale: 1,
      duration: 0.7
    }, 5)

    .to(collapseRings, {
      scale: 1.5,
      opacity: 0.5,
      duration: 1.2,
      stagger: 0.12
    }, 5)

    .to(collapseRings, {
      scale: 0.05,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    }, 6)

    .to(collapse, {
      scale: 0.3,
      opacity: 0,
      duration: 0.7
    }, 6.1)

    .to(objects, {
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0,
      duration: 0.7,
      stagger: 0.04
    }, 6.1)

    // 6. Final reveal.
    .to(finalScene, {
      opacity: 1,
      yPercent: -50,
      duration: 1,
      ease: "power3.out"
    }, 6.7)

    .to(finalRule, {
      width: "min(200px, 35vw)",
      duration: 0.8
    }, 7.2);
})();
