gsap.registerPlugin(ScrollTrigger);

/* ======================== SECTION 91: COLLAPSE ========================= */

(() => {
  const root = document.querySelector("#en91Section");

  if (!root || !window.gsap || root.dataset.en91Ready) return;
  root.dataset.en91Ready = "true";

  const stage = root.querySelector("#en91Stage");
  const word = root.querySelector("#en91Word");
  const letters = [...root.querySelectorAll(".en91-letter")];
  const gravityPoint = root.querySelector("#en91GravityPoint");
  const rings = [...root.querySelectorAll(".en91-ring")];
  const status = root.querySelector("#en91Status");
  const progressBar = root.querySelector("#en91Progress");
  const percentLabel = root.querySelector("#en91Percent");
  const resetButton = root.querySelector("#en91Reset");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let pointerX = 0;
  let pointerY = 0;
  let moveFrame = 0;
  let destroyed = false;
  let scrollTimeline = null;

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

  function updateProgress(progress) {
    const value = clamp(progress, 0, 1);

    percentLabel.textContent =
      String(Math.round(value * 100)).padStart(2, "0") + "%";

    gsap.set(progressBar, { scaleX: value });

    if (value < .15) {
      status.textContent = "STATE: STABLE";
    } else if (value < .4) {
      status.textContent = "STATE: DESTABILIZING";
    } else if (value < .78) {
      status.textContent = "STATE: COLLAPSING";
    } else {
      status.textContent = "STATE: REFORMING";
    }
  }

  function onPointerMove(event) {
    if (reducedMotion || destroyed || moveFrame) return;

    const rect = stage.getBoundingClientRect();

    pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - .5) * 2;

    moveFrame = requestAnimationFrame(() => {
      moveFrame = 0;

      const centerX = pointerX * 100;
      const centerY = pointerY * 55;

      gsap.to(word, {
        x: centerX * .12,
        y: centerY * .12,
        rotationY: pointerX * 5,
        rotationX: -pointerY * 3,
        duration: .5,
        ease: "power3.out",
        overwrite: "auto"
      });

letters.forEach((letter, index) => {
        const spread = index - (letters.length - 1) / 2;

        gsap.to(letter, {
          x: pointerX * spread * 5,
          y: pointerY * Math.abs(spread) * 2,
          rotationZ: pointerX * spread * .65,
          duration: .45 + Math.abs(spread) * .025,
          ease: "power3.out",
          overwrite: "auto"
        });
      });

      gsap.to(gravityPoint, {
        x: centerX,
        y: centerY,
        duration: .35,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  }

  function resetField() {
    gsap.killTweensOf([word, gravityPoint, ...letters, ...rings]);

    gsap.to(word, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      scaleX: 1,
      scaleY: 1,
      duration: .65,
      ease: "power3.out"
    });

    gsap.to(letters, {
      x: 0,
      y: 0,
      rotationZ: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      duration: .65,
      stagger: .025,
      ease: "power3.out"
    });

    gsap.to(gravityPoint, {
      scale: 0,
      duration: .4,
      ease: "power2.out"
    });

    gsap.to(rings, {
      scale: .6,
      opacity: 0,
      duration: .4
    });

    updateProgress(0);

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en91Scroll");

      if (trigger) {
        window.scrollTo({
          top: root.getBoundingClientRect().top + window.scrollY,
          behavior: "smooth"
        });
      }
    }
  }

gsap.set(letters, {
    transformOrigin: "center center"
  });

  if (!reducedMotion && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        id: "en91Scroll",
        trigger: root,
        start: "top top",
        end: "+=190%",
        pin: true,
        scrub: .8,
        invalidateOnRefresh: true,
        onUpdate: self => updateProgress(self.progress)
      }
    });

    scrollTimeline
      .to(letters, {
        x: (index) => (index - 3.5) * 55,
        y: (index) => Math.sin(index * .9) * 25,
        rotationZ: (index) => (index - 3.5) * 4,
        scaleX: .65,
        scaleY: 1.08,
        duration: .28,
        stagger: {
          each: .018,
          from: "edges"
        },
        ease: "power2.in"
      }, 0)
      .to(letters, {
        x: (index) => (index - 3.5) * 8,
        y: (index) => (index % 2 ? 5 : -5),
        scaleX: .08,
        scaleY: .12,
        rotationZ: (index) => (index - 3.5) * -8,
        opacity: .15,
        duration: .3,
        stagger: {
          each: .012,
          from: "edges"
        },
        ease: "power3.in"
      }, .3)
      .to(gravityPoint, {
        scale: 1,
        duration: .12,
        ease: "power2.out"
      }, .5)
      .to(rings, {
        scale: 1,
        opacity: (index) => .35 - index * .08,
        duration: .2,
        stagger: .035,
        ease: "power2.out"
      }, .52)
      .to(letters, {
        x: (index) => (index - 3.5) * 15,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotationZ: 0,
        opacity: 1,
        duration: .28,
        stagger: {
          each: .018,
          from: "center"
        },
        ease: "power3.out"
      }, .68)
      .to(gravityPoint, {
        scale: 0,
        duration: .12
      }, .82)
      .to(rings, {
        scale: 1.2,
        opacity: 0,
        duration: .18
      }, .82);
  }

if (!reducedMotion) {
    gsap.from(
      [
        root.querySelector(".en91-header"),
        root.querySelector(".en91-meta"),
        root.querySelector(".en91-caption"),
        root.querySelector(".en91-footer")
      ],
      {
        opacity: 0,
        y: 12,
        duration: .8,
        stagger: .1,
        ease: "power2.out"
      }
    );
  }

  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerleave", resetField);
  resetButton.addEventListener("click", resetField);

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 120);
  });

  window.addEventListener("pagehide", () => {
    destroyed = true;

    if (moveFrame) cancelAnimationFrame(moveFrame);
    if (scrollTimeline) scrollTimeline.kill();

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en91Scroll");
      if (trigger) trigger.kill();
    }
  }, { once: true });
})();

/* =========================SECTION 92: DISINTEGRATE ========================= */
(() => {
  const root = document.querySelector("#en92Section");

  if (!root || !window.gsap || root.dataset.en92Ready) return;
  root.dataset.en92Ready = "true";

  const stage = root.querySelector("#en92Stage");
  const word = root.querySelector("#en92Word");
  const letters = [...root.querySelectorAll(".en92-letter")];
  const particleField = root.querySelector("#en92Particles");
  const origin = root.querySelector("#en92Origin");
  const status = root.querySelector("#en92Status");
  const progressBar = root.querySelector("#en92Progress");
  const percentLabel = root.querySelector("#en92Percent");
  const resetButton = root.querySelector("#en92Reset");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let moveFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  let scrollTimeline = null;
  let destroyed = false;

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

  const random = (min, max) =>
    min + Math.random() * (max - min);

  const particles = [];

  // Build a lightweight particle field.
  for (let i = 0; i < 90; i++) {
    const particle = document.createElement("span");
    particle.className = "en92-particle";
    particle.style.setProperty("--size", `${random(1, 4)}px`);

    particleField.appendChild(particle);

    particles.push({
      element: particle,
      x: random(-stage.clientWidth * .48, stage.clientWidth * .48),
      y: random(-stage.clientHeight * .42, stage.clientHeight * .42),
      rotation: random(-180, 180),
      scale: random(.6, 1.5),
      delay: random(0, .3)
    });
  }

  function updateProgress(progress) {
    const value = clamp(progress, 0, 1);

    percentLabel.textContent =
      String(Math.round(value * 100)).padStart(2, "0") + "%";

    gsap.set(progressBar, { scaleX: value });

    if (value < .15) {
      status.textContent = "MATTER: INTACT";
    } else if (value < .4) {
      status.textContent = "MATTER: FRACTURING";
    } else if (value < .75) {
      status.textContent = "MATTER: DISPERSED";
    } else {
      status.textContent = "MATTER: REFORMING";
    }
  }

  function scatterParticles(direction = 1) {
    particles.forEach((particle, index) => {
      const distance = random(90, Math.max(200, stage.clientWidth * .55));
      const angle = random(0, Math.PI * 2);

      gsap.to(particle.element, {
        x: Math.cos(angle) * distance * direction,
        y: Math.sin(angle) * distance * direction,
        rotation: particle.rotation + random(-180, 180),
        scale: particle.scale,
        opacity: random(.15, .9),
        duration: random(.7, 1.5),
        delay: particle.delay,
        ease: direction > 0 ? "power2.out" : "power2.inOut",
        overwrite: "auto"
      });
    });
  }

  function restoreParticles() {
    particles.forEach((particle) => {
      gsap.to(particle.element, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: .1,
        opacity: 0,
        duration: .55,
        ease: "power2.in",
        overwrite: "auto"
      });
    });
  }
 function onPointerMove(event) {
    if (reducedMotion || destroyed || moveFrame) return;

    const rect = stage.getBoundingClientRect();

    pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - .5) * 2;

    moveFrame = requestAnimationFrame(() => {
      moveFrame = 0;

      letters.forEach((letter, index) => {
        const rect = letter.getBoundingClientRect();
        const letterX = rect.left + rect.width / 2;
        const letterY = rect.top + rect.height / 2;
        const dx = event.clientX - letterX;
        const dy = event.clientY - letterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const strength = clamp(1 - distance / 260, 0, 1);

        gsap.to(letter, {
          x: -dx * strength * .12,
          y: -dy * strength * .12,
          rotationZ: (index % 2 ? 1 : -1) * strength * 8,
          duration: .35,
          ease: "power3.out",
          overwrite: "auto"
        });
      });

      gsap.to(word, {
        x: pointerX * 10,
        y: pointerY * 7,
        duration: .55,
        ease: "power3.out",
        overwrite: "auto"
      });

      gsap.to(origin, {
        x: pointerX * 80,
        y: pointerY * 45,
        scale: .65,
        duration: .35,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  }

  function resetScene() {
    gsap.killTweensOf([word, ...letters, origin]);

    gsap.to(word, {
      x: 0,
      y: 0,
      scale: 1,
      duration: .65,
      ease: "power3.out"
    });

    gsap.to(letters, {
      x: 0,
      y: 0,
      rotationZ: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      duration: .6,
      stagger: .025,
      ease: "power3.out"
    });

    gsap.to(origin, {
      x: 0,
      y: 0,
      scale: 0,
      duration: .4
    });

    restoreParticles();
    updateProgress(0);

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en92Scroll");

      if (trigger) {
        window.scrollTo({
          top: root.getBoundingClientRect().top + window.scrollY,
          behavior: "smooth"
        });
      }
    }
  }

  if (!reducedMotion && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        id: "en92Scroll",
        trigger: root,
        start: "top top",
        end: "+=190%",
        pin: true,
        scrub: .8,
        invalidateOnRefresh: true,
        onUpdate: self => updateProgress(self.progress)
      }
    });

    scrollTimeline
      .to(letters, {
        x: (index) => (index - (letters.length - 1) / 2) * 18,
        y: (index) => Math.sin(index * 1.4) * 18,
        rotationZ: (index) => (index % 2 ? 1 : -1) * random(10, 25),
        scaleX: .8,
        duration: .2,
        stagger: {
          each: .018,
          from: "edges"
        },
        ease: "power2.in"
      }, 0)
      .to(letters, {
        x: (index) => (index - 5.5) * 65,
        y: (index) => Math.sin(index * 2) * 130,
        rotationZ: (index) => (index - 5.5) * 18,
        scaleX: .15,
        scaleY: .3,
        opacity: 0,
        duration: .3,
        stagger: {
          each: .012,
          from: "center"
        },
        ease: "power3.in"
      }, .22)
      .to(particles.map(p => p.element), {
        x: () => random(-stage.clientWidth * .45, stage.clientWidth * .45),
        y: () => random(-stage.clientHeight * .4, stage.clientHeight * .4),
        rotation: () => random(-180, 180),
        scale: () => random(.5, 1.5),
        opacity: () => random(.2, .85),
        duration: .25,
        stagger: {
          each: .002,
          from: "random"
        },
        ease: "power2.out"
      }, .38)
      .to(origin, {
        scale: 1,
        duration: .12,
        ease: "power2.out"
      }, .48)
      .to(particles.map(p => p.element), {
        x: 0,
        y: 0,
        rotation: 0,
        scale: .1,
        opacity: 0,
        duration: .28,
        stagger: {
          each: .002,
          from: "random"
        },
        ease: "power3.in"
      }, .58)
      .to(origin, {
        scale: 0,
        duration: .1
      }, .7)
      .to(letters, {
        x: (index) => (index - 5.5) * 3,
        y: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: .28,
        stagger: {
          each: .018,
          from: "center"
        },
        ease: "power3.out"
      }, .72);
  }

  if (!reducedMotion) {
    gsap.from(
      [
        root.querySelector(".en92-header"),
        root.querySelector(".en92-meta"),
        root.querySelector(".en92-caption"),
        root.querySelector(".en92-footer")
      ],
      {
        opacity: 0,
        y: 12,
        duration: .8,
        stagger: .1,
        ease: "power2.out"
      }
    );
  }
 stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerleave", resetScene);
  resetButton.addEventListener("click", resetScene);

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      particles.forEach((particle) => {
        particle.x = random(-stage.clientWidth * .48, stage.clientWidth * .48);
        particle.y = random(-stage.clientHeight * .42, stage.clientHeight * .42);
      });

      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 120);
  });

  window.addEventListener("pagehide", () => {
    destroyed = true;

    if (moveFrame) cancelAnimationFrame(moveFrame);
    if (scrollTimeline) scrollTimeline.kill();

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en92Scroll");
      if (trigger) trigger.kill();
    }
  }, { once: true });
})();

/* ========================== SECTION 93: AFTERSHOCK ========================= */
(() => {
  const root = document.querySelector("#en93Section");

  if (!root || !window.gsap || root.dataset.en93Ready) return;
  root.dataset.en93Ready = "true";

  const stage = root.querySelector("#en93Stage");
  const word = root.querySelector("#en93Word");
  const lines = [...root.querySelectorAll(".en93-line")];
  const waves = [...root.querySelectorAll(".en93-wave")];
  const origin = root.querySelector("#en93Origin");
  const status = root.querySelector("#en93Status");
  const progressBar = root.querySelector("#en93Progress");
  const percentLabel = root.querySelector("#en93Percent");
  const resetButton = root.querySelector("#en93Reset");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let moveFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  let scrollTimeline = null;
  let destroyed = false;

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

  function updateProgress(progress) {
    const value = clamp(progress, 0, 1);

    percentLabel.textContent =
      String(Math.round(value * 100)).padStart(2, "0") + "%";

    gsap.set(progressBar, { scaleX: value });

    if (value < .15) {
      status.textContent = "SYSTEM: STABLE";
    } else if (value < .4) {
      status.textContent = "SYSTEM: IMPACT";
    } else if (value < .75) {
      status.textContent = "SYSTEM: OSCILLATING";
    } else {
      status.textContent = "SYSTEM: RECOVERING";
    }
  }

  function onPointerMove(event) {
    if (reducedMotion || destroyed || moveFrame) return;

    const rect = stage.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - .5) * 2;

    moveFrame = requestAnimationFrame(() => {
      moveFrame = 0;

      gsap.to(word, {
        x: pointerX * 8,
        y: pointerY * 6,
        rotationY: pointerX * 4,
        rotationX: -pointerY * 3,
        duration: .45,
        ease: "power3.out",
        overwrite: "auto"
      });

      lines.forEach((line, index) => {
        if (index === 0) return;

        const depth = index;

        gsap.to(line, {
          x: pointerX * depth * 7,
          y: pointerY * depth * 4,
          duration: .4 + depth * .025,
          ease: "power3.out",
          overwrite: "auto"
        });
      });

      gsap.to(waves, {
        scale: 1 + Math.abs(pointerX) * .4 + Math.abs(pointerY) * .3,
        opacity: .12,
        duration: .35,
        stagger: .04,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  }
function resetField() {
    gsap.killTweensOf([word, ...lines, ...waves, origin]);

    gsap.to(word, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: .65,
      ease: "power3.out"
    });

    lines.forEach((line, index) => {
      gsap.to(line, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: index === 0 ? 1 : 0,
        duration: .55,
        ease: "power3.out"
      });
    });

    gsap.to(waves, {
      scale: .1,
      opacity: 0,
      duration: .45,
      ease: "power2.out"
    });

    gsap.to(origin, {
      scale: 0,
      duration: .3
    });

    updateProgress(0);

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en93Scroll");

      if (trigger) {
        window.scrollTo({
          top: root.getBoundingClientRect().top + window.scrollY,
          behavior: "smooth"
        });
      }
    }
  }

  // Keep echo layers aligned on initial render.
  lines.forEach((line, index) => {
    gsap.set(line, {
      x: 0,
      y: 0,
      opacity: index === 0 ? 1 : 0,
      scaleX: 1,
      scaleY: 1,
      transformOrigin: "center center"
    });
  });

 if (!reducedMotion && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        id: "en93Scroll",
        trigger: root,
        start: "top top",
        end: "+=190%",
        pin: true,
        scrub: .8,
        invalidateOnRefresh: true,
        onUpdate: self => updateProgress(self.progress)
      }
    });

    scrollTimeline
      .to(lines[0], {
        x: -12,
        scaleX: 1.04,
        duration: .12,
        ease: "power2.in"
      }, 0)
      .to(lines.slice(1), {
        opacity: (index) => .7 - index * .07,
        x: (index) => (index % 2 ? -1 : 1) * (35 + index * 15),
        y: (index) => (index % 2 ? -1 : 1) * (index * 3),
        duration: .22,
        stagger: .025,
        ease: "power2.out"
      }, .08)
      .to(lines, {
        x: (index) => index % 2 ? 75 + index * 12 : -75 - index * 12,
        y: (index) => (index - 3) * 12,
        rotationY: (index) => index % 2 ? 20 : -20,
        scaleX: .9,
        duration: .3,
        stagger: .012,
        ease: "power3.inOut"
      }, .3)
      .to(waves, {
        scale: 1.8,
        opacity: (index) => .35 - index * .08,
        duration: .25,
        stagger: .05,
        ease: "power2.out"
      }, .36)
      .to(lines, {
        x: (index) => (index % 2 ? 1 : -1) * (30 - index * 2),
        y: (index) => (index % 2 ? -1 : 1) * 8,
        rotationY: 0,
        scaleX: 1,
        opacity: (index) => index === 0 ? 1 : .15 + index * .04,
        duration: .24,
        stagger: .012,
        ease: "power2.out"
      }, .62)
      .to(lines, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: (index) => index === 0 ? 1 : 0,
        duration: .24,
        stagger: .015,
        ease: "power3.out"
      }, .78)
      .to(waves, {
        scale: 2.2,
        opacity: 0,
        duration: .18,
        ease: "power2.out"
      }, .78);
  }

  if (!reducedMotion) {
    gsap.from(
      [
        root.querySelector(".en93-header"),
        root.querySelector(".en93-meta"),
        root.querySelector(".en93-caption"),
        root.querySelector(".en93-footer")
      ],
      {
        opacity: 0,
        y: 12,
        duration: .8,
        stagger: .1,
        ease: "power2.out"
      }
    );
  }

  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerleave", resetField);
  resetButton.addEventListener("click", resetField);

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 120);
  });

  window.addEventListener("pagehide", () => {
    destroyed = true;

    if (moveFrame) cancelAnimationFrame(moveFrame);
    if (scrollTimeline) scrollTimeline.kill();

    if (window.ScrollTrigger) {
      const trigger = ScrollTrigger.getById("en93Scroll");
      if (trigger) trigger.kill();
    }
  }, { once: true });
})();

/*========================== SECTION 94: ECHO ==========================*/
(() => {
  const section = document.querySelector("#en94-resonance");
  if (!section || section.dataset.en94Ready) return;
  section.dataset.en94Ready = "true";

  const word = section.querySelector(".en94-word");
  const wordInner = section.querySelector(".en94-word span");
  const echoes = [...section.querySelectorAll(".en94-echoes span")];
  const rings = [...section.querySelectorAll(".en94-rings span")];
  const frequency = section.querySelector(".en94-frequency");
  const progress = section.querySelector(".en94-progress i");
  const stage = section.querySelector(".en94-stage");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typeof gsap === "undefined") {
    word.style.opacity = "1";
    return;
  }

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.set(word, { opacity: 0, scale: 0.86 });
  gsap.set(wordInner, { letterSpacing: "-0.16em" });
  gsap.set(echoes, {
    scale: 0.75,
    opacity: 0,
    x: 0,
    y: 0
  });
  gsap.set(rings, { scale: 0.15, opacity: 0 });
  gsap.set(".en94-crosshair", { opacity: 0 });

  if (reducedMotion) {
    gsap.set(word, { opacity: 1, scale: 1 });
    gsap.set(wordInner, { letterSpacing: "-0.085em" });
    return;
  }

  const intro = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  intro
    .to(word, {
      opacity: 1,
      scale: 1,
      duration: 1.1
    })
    .to(wordInner, {
      letterSpacing: "-0.085em",
      duration: 1.2
    }, "<")
    .to(".en94-crosshair", {
      opacity: 1,
      duration: 0.5,
      stagger: 0.15
    }, "-=0.5");

  let scrollTimeline;

  if (typeof ScrollTrigger !== "undefined") {
    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=180%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    scrollTimeline
      .to(word, {
        scale: 0.88,
        duration: 0.6,
        ease: "power2.inOut"
      }, 0)
      .to(wordInner, {
        letterSpacing: "-0.045em",
        duration: 0.6,
        ease: "power2.inOut"
      }, 0)
      .to(echoes, {
        opacity: (index) => 0.46 - index * 0.045,
        scale: (index) => 1.12 + index * 0.16,
        x: (index) => index % 2 ? 18 * index : -18 * index,
        y: (index) => index % 2 ? -10 * index : 10 * index,
        duration: 1,
        stagger: 0.07,
        ease: "power2.out"
      }, 0.2)
      .to(rings, {
        opacity: (index) => 0.42 - index * 0.045,
        scale: (index) => 1.15 + index * 0.12,
        duration: 0.9,
        stagger: 0.06,
        ease: "power2.out"
      }, 0.35)
      .to(word, {
        scale: 1,
        duration: 0.55,
        ease: "power3.out"
      }, 1.15)
      .to(wordInner, {
        letterSpacing: "-0.085em",
        duration: 0.55,
        ease: "power3.out"
      }, 1.15)
      .to(echoes, {
        opacity: 0,
        scale: 0.8,
        x: 0,
        y: 0,
        duration: 0.45,
        stagger: 0.025,
        ease: "power2.in"
      }, 1.35)
      .to(rings, {
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        stagger: 0.025,
        ease: "power2.in"
      }, 1.4)
      .to(progress, {
        scaleX: 1,
        duration: 1.8,
        ease: "none"
      }, 0);

    scrollTimeline.eventCallback("onUpdate", () => {
      const p = scrollTimeline.progress();
      frequency.textContent = `${(p * 98.6).toFixed(2)} HZ`;
    });
  } else {
    gsap.to(echoes, {
      opacity: 0.18,
      scale: 1.3,
      stagger: 0.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // Pointer disturbance: quick, subtle movement without rebuilding timelines.
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;
  let frame = 0;

  const renderPointer = () => {
    pointerX += (targetX - pointerX) * 0.12;
    pointerY += (targetY - pointerY) * 0.12;

    gsap.set(word, {
      x: pointerX * 7,
      y: pointerY * 5,
      rotationY: pointerX * 3,
      rotationX: -pointerY * 3,
      transformPerspective: 900
    });

    echoes.forEach((echo, index) => {
      const direction = index % 2 ? 1 : -1;
      gsap.set(echo, {
        x: `+=${pointerX * direction * (index + 1) * 0.09}`,
        y: `+=${pointerY * direction * (index + 1) * 0.06}`
      });
    });

    frame = 0;
  };

  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();

    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    if (!frame) frame = requestAnimationFrame(renderPointer);
  });

  stage.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    gsap.to(word, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "power3.out"
    });
  });
})();

/*=================== SECTION 95: SUPERNOVA ===================*/
(() => {
  const section = document.querySelector("#en95-supernova");

  if (!section || section.dataset.en95Ready) return;
  section.dataset.en95Ready = "true";

  const stage = section.querySelector(".en95-stage");
  const title = section.querySelector(".en95-title");
  const letters = [...section.querySelectorAll(".en95-letter")];
  const particlesContainer = section.querySelector(".en95-particles");
  const core = section.querySelector(".en95-core");
  const orbits = [...section.querySelectorAll(".en95-orbit")];
  const energy = section.querySelector(".en95-energy");
  const progressBar = section.querySelector(".en95-progress i");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typeof gsap === "undefined") return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const particleCount = window.innerWidth < 600 ? 55 : 110;
  const particles = [];

  // Deterministic particle field: avoids recreating nodes during scroll.
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    particle.className = "en95-particle";

    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 100 + ((i * 47) % 230);
    const size = i % 9 === 0 ? 3 : i % 3 === 0 ? 2 : 1;

    particle.style.setProperty("--en95-size", `${size}px`);
    particlesContainer.appendChild(particle);

    particles.push({
      element: particle,
      angle,
      distance,
      drift: ((i * 17) % 100) / 100,
      rotation: i % 2 === 0 ? 1 : -1
    });
  }

  if (reducedMotion) {
    gsap.set(letters, { opacity: 1, x: 0, y: 0, rotation: 0 });
    gsap.set(orbits, { opacity: 0.5 });
    gsap.set(core, { opacity: 0.25 });
    return;
  }

  gsap.set(letters, {
    opacity: 0,
    y: 35,
    rotationX: -60,
    transformOrigin: "50% 50% -50px"
  });

  gsap.set(orbits, {
    scale: 0.4,
    opacity: 0,
    rotation: 0
  });

  gsap.set(core, {
    scale: 0.2,
    opacity: 0
  });

  const intro = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  intro
    .to(letters, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.065
    })
    .to(orbits, {
      scale: 1,
      opacity: (index) => 0.18 - index * 0.035,
      duration: 1.1,
      stagger: 0.12
    }, "-=0.3");

  let scrollTimeline;

  if (typeof ScrollTrigger !== "undefined") {
    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Phase 1: the word reaches critical mass.
    scrollTimeline
      .to(letters, {
        scale: 1.13,
        duration: 0.3,
        stagger: {
          each: 0.025,
          from: "center"
        },
        ease: "power2.in"
      }, 0)
      .to(core, {
        opacity: 1,
        scale: 1.5,
        duration: 0.35,
        ease: "power2.in"
      }, 0.1)
      .to(orbits, {
        scale: 1.25,
        rotation: (index) => index % 2 ? -80 : 80,
        opacity: 0.4,
        duration: 0.45,
        ease: "power2.inOut"
      }, 0.1);

    // Phase 2: radial explosion.
    scrollTimeline
      .to(letters, {
        x: (index) => {
          const center = (letters.length - 1) / 2;
          return (index - center) * 95;
        },
        y: (index) => (index % 2 ? -1 : 1) * (45 + index * 9),
        rotation: (index) => (index % 2 ? 1 : -1) * (20 + index * 3),
        scale: 0.45,
        opacity: 0.2,
        filter: "blur(2px)",
        duration: 0.75,
        stagger: 0.015,
        ease: "power3.in"
      }, 0.4)
      .to(particles.map(p => p.element), {
        opacity: (index) => index % 4 === 0 ? 0.95 : 0.65,
        duration: 0.15,
        stagger: {
          each: 0.002,
          from: "random"
        }
      }, 0.45)
      .to(particles.map(p => p.element), {
        x: (index) => {
          const p = particles[index];
          return Math.cos(p.angle) * p.distance * (1.5 + p.drift);
        },
        y: (index) => {
          const p = particles[index];
          return Math.sin(p.angle) * p.distance * (1.5 + p.drift);
        },
        rotation: (index) => particles[index].rotation * 240,
        duration: 1,
        ease: "power2.out"
      }, 0.5)
      .to(core, {
        scale: 4,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out"
      }, 0.45)
      .to(orbits, {
        scale: 1.8,
        opacity: 0,
        duration: 0.65,
        stagger: 0.04,
        ease: "power2.out"
      }, 0.5);

 // Phase 3: reassembly into one clean word.
    scrollTimeline
      .to(letters, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: {
          each: 0.035,
          from: "edges"
        },
        ease: "power4.out"
      }, 1.35)
      .to(particles.map(p => p.element), {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.2,
        duration: 0.7,
        stagger: {
          each: 0.002,
          from: "random"
        },
        ease: "power3.in"
      }, 1.3)
      .to(orbits, {
        scale: 0.65,
        rotation: 0,
        opacity: 0.12,
        duration: 0.65,
        ease: "power3.out"
      }, 1.65)
      .to(core, {
        scale: 0.6,
        opacity: 0.2,
        duration: 0.6
      }, 1.7)
      .to(progressBar, {
        scaleX: 1,
        duration: 2,
        ease: "none"
      }, 0);

    scrollTimeline.eventCallback("onUpdate", () => {
      const percent = Math.round(scrollTimeline.progress() * 100);
      energy.textContent = `${percent}%`;
    });
  } else {
    // Fallback animation if ScrollTrigger is unavailable.
    gsap.to(orbits, {
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: "none"
    });
  }

  // Pointer-driven gravity: animate only the main title.
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let pointerFrame = 0;

  function renderPointer() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    gsap.set(title, {
      x: currentX * 10,
      y: currentY * 7,
      rotationY: currentX * 3,
      rotationX: -currentY * 2,
      transformPerspective: 1000
    });

    if (
      Math.abs(targetX - currentX) > 0.002 ||
      Math.abs(targetY - currentY) > 0.002
    ) {
      pointerFrame = requestAnimationFrame(renderPointer);
    } else {
      pointerFrame = 0;
    }
  }

  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();

    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    if (!pointerFrame) {
      pointerFrame = requestAnimationFrame(renderPointer);
    }
  });

  stage.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;

    if (!pointerFrame) {
      pointerFrame = requestAnimationFrame(renderPointer);
    }
  });
})();

/* ============ SECTION 96: AFTERGLOW ============ */

(() => {
  const section = document.querySelector("#en96-afterglow");

  if (!section || section.dataset.en96Ready) return;
  section.dataset.en96Ready = "true";

  const stage = section.querySelector(".en96-stage");
  const title = section.querySelector(".en96-title");
  const letters = [...section.querySelectorAll(".en96-letter")];
  const echoes = [...section.querySelectorAll(".en96-echoes span")];
  const aura = section.querySelector(".en96-aura");
  const trail = section.querySelector(".en96-trail");
  const decay = section.querySelector(".en96-decay");
  const progress = section.querySelector(".en96-progress i");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typeof gsap === "undefined") return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.set(letters, {
    opacity: 0,
    y: 24,
    filter: "blur(8px)"
  });

  gsap.set(echoes, {
    opacity: 0,
    scale: 0.85,
    x: 0,
    y: 0
  });

  gsap.set(aura, {
    opacity: 0,
    scale: 0.4
  });

  if (reducedMotion) {
    gsap.set(letters, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)"
    });
    return;
  }

  // Initial word reveal.
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(letters, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      stagger: 0.07
    })
    .to(aura, {
      opacity: 0.55,
      scale: 1,
      duration: 1.2
    }, "-=0.5");

  let scrollTimeline;

  if (typeof ScrollTrigger !== "undefined") {
    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=190%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Echoes spread into the surrounding space.
    scrollTimeline
      .to(echoes, {
        opacity: (index) => 0.42 - index * 0.045,
        scale: (index) => 1.05 + index * 0.15,
        x: (index) => index % 2 ? 28 * index : -28 * index,
        y: (index) => index % 2 ? -12 * index : 12 * index,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out"
      }, 0)
      .to(letters, {
        x: (index) => (index - 4) * 18,
        y: (index) => index % 2 ? -24 : 24,
        opacity: 0.45,
        filter: "blur(2px)",
        duration: 0.8,
        stagger: 0.025,
        ease: "power2.inOut"
      }, 0.1)
      .to(aura, {
        scale: 1.5,
        opacity: 0.9,
        duration: 0.8
      }, 0.1);

    // The word dissolves into overlapping afterimages.
    scrollTimeline
      .to(echoes, {
        opacity: (index) => 0.36 - index * 0.04,
        scale: (index) => 1.45 + index * 0.2,
        x: (index) => index % 2 ? 70 * index : -70 * index,
        y: (index) => index % 2 ? -24 * index : 24 * index,
        duration: 0.8,
        stagger: 0.04,
        ease: "power2.out"
      }, 0.85)
      .to(letters, {
        x: (index) => (index - 4) * 90,
        y: (index) => (index % 2 ? -1 : 1) * (45 + index * 8),
        rotation: (index) => (index % 2 ? 1 : -1) * (12 + index * 3),
        opacity: 0.08,
        filter: "blur(5px)",
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.in"
      }, 0.9)
      .to(aura, {
        scale: 2,
        opacity: 0.45,
        duration: 0.7
      }, 0.9);

  // Everything converges into one sharp word.
    scrollTimeline
      .to(echoes, {
        opacity: 0,
        scale: 0.8,
        x: 0,
        y: 0,
        duration: 0.55,
        stagger: 0.025,
        ease: "power2.in"
      }, 1.65)
      .to(letters, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.75,
        stagger: {
          each: 0.035,
          from: "edges"
        },
        ease: "power4.out"
      }, 1.65)
      .to(aura, {
        scale: 0.75,
        opacity: 0.12,
        duration: 0.65
      }, 1.8)
      .to(progress, {
        scaleX: 1,
        duration: 2.2,
        ease: "none"
      }, 0);

    scrollTimeline.eventCallback("onUpdate", () => {
      const remaining = Math.round(
        (1 - scrollTimeline.progress()) * 100
      );
      decay.textContent = `${remaining}%`;
    });
  }

  // Mouse movement leaves temporary, fading letter traces.
  let lastTrailTime = 0;
  let trailIndex = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let pointerFrame = 0;

  const trailCharacters = "AFTERGLOW";
  const activeTrailTweens = new Set();

  function createTrailLetter(x, y) {
    const span = document.createElement("span");
    span.className = "en96-trail-letter";
    span.textContent = trailCharacters[trailIndex % trailCharacters.length];
    trailIndex++;

    span.style.left = `${x}px`;
    span.style.top = `${y}px`;

    trail.appendChild(span);

    const tween = gsap.to(span, {
      opacity: 0,
      scale: 0.55,
      y: -35 - Math.random() * 25,
      x: (Math.random() - 0.5) * 35,
      filter: "blur(5px)",
      duration: 0.8 + Math.random() * 0.45,
      ease: "power2.out",
      onComplete: () => {
        activeTrailTweens.delete(tween);
        span.remove();
      }
    });

    activeTrailTweens.add(tween);
  }

  function renderPointer() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    gsap.set(title, {
      x: currentX * 8,
      y: currentY * 5,
      rotationY: currentX * 2.5,
      rotationX: -currentY * 2
    });

    if (
      Math.abs(targetX - currentX) > 0.002 ||
      Math.abs(targetY - currentY) > 0.002
    ) {
      pointerFrame = requestAnimationFrame(renderPointer);
    } else {
      pointerFrame = 0;
    }
  }

  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();

    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    if (!pointerFrame) {
      pointerFrame = requestAnimationFrame(renderPointer);
    }

    const now = performance.now();

    if (now - lastTrailTime > 45) {
      createTrailLetter(
        event.clientX - rect.left,
        event.clientY - rect.top
      );
      lastTrailTime = now;
    }
  });

  stage.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;

    if (!pointerFrame) {
      pointerFrame = requestAnimationFrame(renderPointer);
    }
  });
})();


/* ======================= SECTION 97: GRAVITY ======================= */

(() => {
  const section = document.querySelector("#en97-gravity");

  if (!section || section.dataset.en97Ready) return;
  section.dataset.en97Ready = "true";

  const stage = section.querySelector(".en97-stage");
  const title = section.querySelector(".en97-title");
  const letters = [...section.querySelectorAll(".en97-letter")];
  const orbits = [...section.querySelectorAll(".en97-orbit")];
  const core = section.querySelector(".en97-gravity-core");
  const particlesContainer = section.querySelector(".en97-particles");
  const vectorLabel = section.querySelector(".en97-vector");
  const pullLabel = section.querySelector(".en97-pull");
  const progressBar = section.querySelector(".en97-progress i");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typeof gsap === "undefined") return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Build a lightweight, deterministic particle field.
  const particleCount = window.innerWidth < 600 ? 35 : 75;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const element = document.createElement("span");
    element.className = "en97-particle";

    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 100 + ((i * 37) % 220);

    element.style.setProperty(
      "--en97-size",
      i % 7 === 0 ? "3px" : "2px"
    );

    particlesContainer.appendChild(element);

    particles.push({
      element,
      angle,
      radius,
      direction: i % 2 === 0 ? 1 : -1
    });
  }

  if (reducedMotion) {
    gsap.set(letters, { opacity: 1, x: 0, y: 0 });
    gsap.set(orbits, { opacity: 0.35 });
    return;
  }

  gsap.set(letters, {
    opacity: 0,
    y: 30,
    rotationX: -45
  });

  gsap.set(orbits, {
    scale: 0.5,
    opacity: 0
  });

  gsap.set(core, {
    scale: 0.3,
    opacity: 0
  });

  // Intro: the letters enter the gravitational field.
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(letters, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.9,
      stagger: 0.075
    })
    .to(orbits, {
      scale: 1,
      opacity: (index) => 0.18 - index * 0.035,
      duration: 1,
      stagger: 0.12
    }, "-=0.35");

  let scrollTimeline;

  if (typeof ScrollTrigger !== "undefined") {
    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=190%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // 1. The field strengthens.
    scrollTimeline
      .to(orbits, {
        scale: 0.72,
        rotation: (index) => index % 2 ? -35 : 35,
        opacity: 0.45,
        duration: 0.45,
        ease: "power2.inOut"
      }, 0)
      .to(core, {
        opacity: 0.85,
        scale: 1.4,
        duration: 0.4,
        ease: "power2.in"
      }, 0)
      .to(letters, {
        scale: 0.88,
        duration: 0.45,
        stagger: {
          each: 0.025,
          from: "center"
        },
        ease: "power2.in"
      }, 0);

    // 2. The characters collapse toward the center.
    scrollTimeline
      .to(letters, {
        x: (index) => (index - 3) * -55,
        y: (index) => index % 2 ? -40 : 40,
        rotation: (index) => (index - 3) * 8,
        scale: 0.65,
        opacity: 0.6,
        duration: 0.7,
        stagger: 0.025,
        ease: "power3.in"
      }, 0.4)
      .to(particles.map(p => p.element), {
        opacity: 0.65,
        duration: 0.2,
        stagger: {
          each: 0.003,
          from: "random"
        }
      }, 0.4)
      .to(particles.map(p => p.element), {
        x: (index) => Math.cos(particles[index].angle) *
          particles[index].radius * 0.2,
        y: (index) => Math.sin(particles[index].angle) *
          particles[index].radius * 0.2,
        duration: 0.7,
        ease: "power2.in"
      }, 0.45)
      .to(core, {
        scale: 3.5,
        opacity: 0.35,
        duration: 0.7
      }, 0.45)
      .to(orbits, {
        scale: 0.28,
        rotation: (index) => index % 2 ? -90 : 90,
        opacity: 0.7,
        duration: 0.7,
        ease: "power2.in"
      }, 0.45);
// 3. The gravitational force releases.
    scrollTimeline
      .to(letters, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: {
          each: 0.035,
          from: "center"
        },
        ease: "power4.out"
      }, 1.2)
      .to(particles.map(p => p.element), {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0.65,
        stagger: {
          each: 0.002,
          from: "random"
        },
        ease: "power3.out"
      }, 1.15)
      .to(orbits, {
        scale: 1,
        rotation: 0,
        opacity: 0.12,
        duration: 0.7,
        ease: "power3.out"
      }, 1.35)
      .to(core, {
        scale: 0.5,
        opacity: 0.12,
        duration: 0.7
      }, 1.35)
      .to(progressBar, {
        scaleX: 1,
        duration: 2,
        ease: "none"
      }, 0);

    scrollTimeline.eventCallback("onUpdate", () => {
      const progress = scrollTimeline.progress();
      vectorLabel.textContent = (progress * 9.81).toFixed(2);

      pullLabel.textContent =
        progress < 0.3 ? "INCREASING" :
        progress < 0.7 ? "CRITICAL" :
        "RELEASING";
    });
  }

  // Pointer attraction: letters respond to the cursor.
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;
  let pointerFrame = 0;

  function renderPointer() {
    pointerX += (targetX - pointerX) * 0.12;
    pointerY += (targetY - pointerY) * 0.12;

    letters.forEach((letter, index) => {
      const centerOffset = index - (letters.length - 1) / 2;

      gsap.set(letter, {
        x: pointerX * (8 + Math.abs(centerOffset) * 1.5),
        y: pointerY * (5 + Math.abs(centerOffset)),
        rotationY: pointerX * -2,
        rotationX: pointerY * 1.5
      });
    });

    if (
      Math.abs(targetX - pointerX) > 0.002 ||
      Math.abs(targetY - pointerY) > 0.002
    ) {
      pointerFrame = requestAnimationFrame(renderPointer);
    } else {
      pointerFrame = 0;
    }
  }

  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();

    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    if (!pointerFrame) {
      pointerFrame = requestAnimationFrame(renderPointer);
    }
  });

  stage.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;

    if (!pointerFrame) {
      pointerFrame = requestAnimationFrame(renderPointer);
    }
  });
})(); 


/* =================================================
   SECTION 98: VOID
   ================================================ */

   (() => {
  const root = document.querySelector("#en98-void");
  if (!root || !window.gsap) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const intro = root.querySelector(".en98-intro");
  const titleLines = root.querySelectorAll(".en98-line");
  const kicker = root.querySelector(".en98-kicker");
  const caption = root.querySelector(".en98-caption");
  const orbits = root.querySelectorAll(".en98-orbit");
  const particlesContainer = root.querySelector(".en98-particles");
  const collapse = root.querySelector(".en98-collapse");
  const letters = root.querySelectorAll(".en98-word");
  const core = root.querySelector(".en98-core");
  const flash = root.querySelector(".en98-flash");
  const outro = root.querySelector(".en98-outro");
  const outroLine = root.querySelector(".en98-outro-line");
  const progress = root.querySelector(".en98-progress span");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const random = gsap.utils.random;

  // Create small particles around the center.
  const particleCount = window.innerWidth < 600 ? 38 : 70;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    particle.className = "en98-particle";

    const angle = Math.random() * Math.PI * 2;
    const radius = random(90, Math.min(window.innerWidth * 0.48, 420));
    const size = random(1, 2.6);

    particle.style.setProperty("--size", `${size}px`);
    particle.style.setProperty("--opacity", random(0.15, 0.75));
    particlesContainer.appendChild(particle);

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    gsap.set(particle, {
      x,
      y,
      scale: random(0.6, 1.4)
    });

    particles.push({
      element: particle,
      x,
      y,
      angle,
      radius
    });
  }

  // Entrance animation.
  gsap.set(titleLines, {
    yPercent: 120,
    rotateX: -25,
    opacity: 0
  });

   gsap.set([kicker, caption], {
    y: 16,
    opacity: 0
  });

  gsap.set(orbits, {
    scale: 1.15,
    opacity: 0
  });

  const entrance = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  entrance
    .to(orbits, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      stagger: 0.12
    }, 0)
    .to(kicker, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.15)
    .to(titleLines, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.16
    }, 0.25)
    .to(caption, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.85);

  // Slow orbit movement.
  if (!reduceMotion) {
    orbits.forEach((orbit, index) => {
      gsap.to(orbit, {
        rotation: index % 2 === 0 ? 360 : -360,
        duration: 45 + index * 15,
        repeat: -1,
        ease: "none"
      });
    });

    particles.forEach((particle, index) => {
      gsap.to(particle.element, {
        x: particle.x * random(0.88, 1.12),
        y: particle.y * random(0.88, 1.12),
        opacity: random(0.15, 0.8),
        duration: random(2, 5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.015
      });
    });
  }

   // Pointer interaction: nearby particles drift away from the cursor.
  let pointerX = 0;
  let pointerY = 0;
  let pointerActive = false;
  let pointerFrame = null;

  root.addEventListener("pointermove", (event) => {
    const rect = root.getBoundingClientRect();

    pointerX = event.clientX - rect.left - rect.width / 2;
    pointerY = event.clientY - rect.top - rect.height / 2;
    pointerActive = true;

    if (pointerFrame) return;

    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = null;

      particles.forEach((particle) => {
        const dx = particle.x - pointerX;
        const dy = particle.y - pointerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / 190);

        const pushX = distance ? (dx / distance) * influence * 28 : 0;
        const pushY = distance ? (dy / distance) * influence * 28 : 0;

        gsap.to(particle.element, {
          x: particle.x + pushX,
          y: particle.y + pushY,
          duration: 0.45,
          overwrite: "auto",
          ease: "power2.out"
        });
      });
    });
  });

  root.addEventListener("pointerleave", () => {
    pointerActive = false;

    particles.forEach((particle) => {
      gsap.to(particle.element, {
        x: particle.x,
        y: particle.y,
        duration: 0.8,
        overwrite: "auto",
        ease: "power3.out"
      });
    });
  });

  // Scroll-driven disappearance.
  if (ScrollTrigger && !reduceMotion) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=2200",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    timeline
      // The headline begins to drift toward the void.
      .to(intro, {
        scale: 0.8,
        y: -30,
        opacity: 0.45,
        filter: "blur(2px)",
        duration: 1
      }, 0)

      .to(orbits, {
        scale: 0.65,
        opacity: 0.45,
        duration: 1.2,
        stagger: 0.05
      }, 0)

      .to(caption, {
        opacity: 0,
        y: 20,
        duration: 0.3
      }, 0)

      // Reveal the letters that will collapse into the center.
      .set(collapse, {
        opacity: 1
      }, 0.85)

      .to(letters, {
        x: (index) => (index - 3) * -28,
        y: (index) => random(-30, 30),
        rotation: (index) => random(-15, 15),
        duration: 0.8,
        stagger: 0.035,
        ease: "power2.inOut"
      }, 0.95)

      // The main headline vanishes.
      .to(intro, {
        scale: 0.35,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.8
      }, 1.15)

      // All individual letters converge into one point.
      .to(letters, {
        x: 0,
        y: 0,
        scale: 0.015,
        rotation: (index) => (index - 3) * 35,
        opacity: 0,
        duration: 1,
        stagger: 0.035,
        ease: "power3.in"
      }, 1.55)

      .to(orbits, {
        scale: 0.03,
        opacity: 0,
        duration: 0.9,
        stagger: 0.04,
        ease: "power3.in"
      }, 1.6)

      .to(particles, {
        // The particle elements themselves are animated below.
      }, 1.6)

      .to(particles.map((p) => p.element), {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0,
        duration: 1,
        stagger: {
          each: 0.006,
          from: "random"
        },
        ease: "power3.in"
      }, 1.6)

      .to(core, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out"
      }, 2.2)

      // A white flash creates the vanishing-point transition.
      .to(flash, {
        opacity: 0.9,
        scaleX: 1,
        duration: 0.35,
        ease: "power2.inOut"
      }, 2.45)

      .to(flash, {
        opacity: 0,
        scaleX: 0,
        duration: 0.55,
        ease: "power3.out"
      }, 2.8)

      .to(core, {
        scale: 0,
        opacity: 0,
        duration: 0.35
      }, 2.85)

      // The final statement emerges from the darkness.
      .to(outro, {
        opacity: 1,
        y: "-50%",
        duration: 0.9,
        ease: "power3.out"
      }, 3.05)

      .to(outroLine, {
        width: "min(180px, 35vw)",
        duration: 0.8,
        ease: "power2.inOut"
      }, 3.45)

      .to(progress, {
        scaleX: 1,
        duration: 3.9,
        ease: "none"
      }, 0);
  } else {
    // Without ScrollTrigger, keep the section readable.
    gsap.set([collapse, core, flash], { opacity: 0 });
    gsap.set(outro, { opacity: 1, y: "-50%" });
    gsap.set(outroLine, { width: "min(180px, 35vw)" });
  }
})();
  
/* =========================================================
SECTION 99: AFTER THE END
========================================================= */

(() => {
  const root = document.querySelector("#en99-after");
  if (!root || !window.gsap) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => root.querySelectorAll(selector);

  const intro = $(".en99-intro");
  const headline = $$(".en99-headline-line");
  const eyebrow = $(".en99-eyebrow");
  const introBottom = $(".en99-intro-bottom");
  const glitches = $$(".en99-glitch");
  const timelines = $$(".en99-timeline");
  const timelineContainer = $(".en99-timelines");
  const fragments = $$(".en99-fragment");
  const collapse = $(".en99-collapse");
  const collapseWords = $$(".en99-collapse-word");
  const singularity = $(".en99-singularity");
  const finalScene = $(".en99-final");
  const finalRule = $(".en99-final-rule");
  const progress = $(".en99-progress span");
  const crosshairs = $$(".en99-crosshair");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Initial states.
  gsap.set(headline, {
    yPercent: 115,
    opacity: 0,
    rotateX: -20,
    transformOrigin: "center bottom"
  });

  gsap.set(eyebrow, {
    y: 15,
    opacity: 0
  });

  gsap.set(introBottom, {
    y: 15,
    opacity: 0
  });

  gsap.set(glitches, {
    opacity: 0
  });

  gsap.set(timelineContainer, {
    opacity: 0
  });

  gsap.set(timelines, {
    opacity: 0
  });

  gsap.set(fragments, {
    opacity: 0
  });

  gsap.set(collapse, {
    opacity: 0
  });

  gsap.set(collapseWords, {
    scale: 1,
    opacity: 1
  });

  gsap.set(finalScene, {
    opacity: 0,
    y: 30
  });

  // Entrance.
  const entrance = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  entrance
    .to(eyebrow, {
      y: 0,
      opacity: 1,
      duration: 0.7
    })
    .to(headline, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.15,
      stagger: 0.16
    }, 0.15)
    .to(introBottom, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.75);

 // Mouse-responsive distortion.
  let pointerFrame = null;
  let mouseX = 0;
  let mouseY = 0;

  root.addEventListener("pointermove", (event) => {
    const rect = root.getBoundingClientRect();

    mouseX = (event.clientX - rect.left) / rect.width - 0.5;
    mouseY = (event.clientY - rect.top) / rect.height - 0.5;

    if (pointerFrame) return;

    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = null;

      if (reduceMotion) return;

      gsap.to(intro, {
        x: mouseX * -15,
        y: mouseY * -10,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto"
      });

      gsap.to(glitches[0], {
        x: mouseX * 18,
        y: mouseY * 3,
        duration: 0.25,
        overwrite: "auto"
      });

      gsap.to(glitches[1], {
        x: mouseX * -12,
        y: mouseY * -4,
        duration: 0.35,
        overwrite: "auto"
      });

      gsap.to(crosshairs, {
        x: mouseX * 12,
        y: mouseY * 12,
        duration: 0.7,
        overwrite: "auto"
      });
    });
  });

  root.addEventListener("pointerleave", () => {
    gsap.to([intro, ...glitches, ...crosshairs], {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto"
    });
  });

  // Occasional small glitch pulses.
  if (!reduceMotion) {
    const glitchPulse = gsap.timeline({
      repeat: -1,
      repeatDelay: 2.7
    });

    glitchPulse
      .to(glitches, {
        opacity: 0.35,
        duration: 0.05
      })
      .to(glitches[0], {
        x: 8,
        duration: 0.06
      }, 0)
      .to(glitches[1], {
        x: -6,
        duration: 0.06
      }, 0)
      .to(glitches, {
        opacity: 0,
        x: 0,
        duration: 0.12
      });
  }

  // Scroll sequence.
  if (ScrollTrigger && !reduceMotion) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=2600",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    timeline
      // 1. Original timeline loses stability.
      .to(intro, {
        scale: 0.78,
        opacity: 0.18,
        filter: "blur(3px)",
        duration: 0.8
      }, 0)

      .to(eyebrow, {
        opacity: 0,
        duration: 0.2
      }, 0)

      .to(introBottom, {
        opacity: 0,
        y: 20,
        duration: 0.3
      }, 0)

      .to(glitches, {
        opacity: 0.4,
        duration: 0.25,
        stagger: 0.05
      }, 0.35)

      .to(glitches[0], {
        x: 28,
        duration: 0.6
      }, 0.4)

      .to(glitches[1], {
        x: -24,
        duration: 0.6
      }, 0.4)

      // 2. Multiple timelines appear.
      .to(timelineContainer, {
        opacity: 1,
        duration: 0.4
      }, 0.75)

      .to(timelines, {
        opacity: (index) => index === 0 ? 1 : 0.65,
        duration: 0.5,
        stagger: 0.08
      }, 0.8)

      .to(timelines[0], {
        xPercent: -15,
        duration: 1.8,
        ease: "none"
      }, 0.8)

      .to(timelines[1], {
        xPercent: 12,
        duration: 1.8,
        ease: "none"
      }, 0.8)

      .to(timelines[2], {
        xPercent: -10,
        duration: 1.8,
        ease: "none"
      }, 0.8)

      .to(timelines[3], {
        xPercent: 18,
        duration: 1.8,
        ease: "none"
      }, 0.8)

      .to(timelines[4], {
        xPercent: -20,
        duration: 1.8,
        ease: "none"
      }, 0.8)

      // 3. Timeline collision.
      .to(timelines, {
        xPercent: 0,
        scale: 0.8,
        opacity: 0.2,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.in"
      }, 2.1)

      .to(timelineContainer, {
        scale: 0.7,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in"
      }, 2.5)

      // 4. Fragments drift through space.
      .to(fragments, {
        opacity: 1,
        duration: 0.35,
        stagger: 0.08
      }, 2.35)

      .to(fragments, {
        x: (index) => (index % 2 === 0 ? -1 : 1) * (100 + index * 20),
        y: (index) => (index % 2 === 0 ? 1 : -1) * (80 + index * 12),
        rotation: (index) => (index % 2 === 0 ? -25 : 25),
        scale: 0.35,
        opacity: 0,
        duration: 1,
        stagger: 0.04,
        ease: "power3.in"
      }, 2.65)

      // 5. "AFTER THE END" contracts to nothing.
      .set(collapse, {
        opacity: 1
      }, 3.05)

      .from(collapseWords, {
        y: (index) => index % 2 === 0 ? -60 : 60,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out"
      }, 3.05)

      .to(collapseWords, {
        x: 0,
        scaleX: 0.001,
        scaleY: 0.1,
        opacity: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power4.in"
      }, 3.65)

      .to(singularity, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out"
      }, 4.15)

      // 6. Final line expands and fades.
      .to(singularity, {
        scaleX: 100,
        scaleY: 0.5,
        opacity: 0.9,
        duration: 0.35,
        ease: "power2.inOut"
      }, 4.35)

      .to(singularity, {
        scaleX: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"
      }, 4.7)

      // 7. The final question appears.
      .to(finalScene, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, 4.9)

      .to(finalRule, {
        width: "min(180px, 35vw)",
        duration: 0.7,
        ease: "power2.inOut"
      }, 5.3)

      .to(progress, {
        scaleX: 1,
        duration: 5.8,
        ease: "none"
      }, 0);
  } else {
    // Accessible fallback when ScrollTrigger is unavailable
    // or reduced motion is requested.
    gsap.set([intro, eyebrow, introBottom], {
      clearProps: "transform,filter"
    });

    gsap.set([timelineContainer, collapse, singularity], {
      opacity: 0
    });

    gsap.set(finalScene, {
      opacity: 1,
      y: 0
    });

    gsap.set(finalRule, {
      width: "min(180px, 35vw)"
    });
  }
})();

/* ========================================================
   SECTION 100: ECLIPSE
   ======================================================== */

   (() => {
  const root = document.querySelector("#en100-eclipse");
  if (!root || !window.gsap) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => root.querySelectorAll(selector);

  const stage = $(".en100-stage");
  const intro = $(".en100-intro");
  const headline = $$(".en100-headline > span");
  const eyebrow = $(".en100-eyebrow");
  const subtitle = $(".en100-subtitle");
  const scrollCue = $(".en100-scroll");
  const orbits = $$(".en100-orbit");
  const solarSystem = $(".en100-solar-system");
  const sun = $(".en100-sun");
  const sunCorona = $(".en100-sun-corona");
  const sunRing = $(".en100-sun-ring");
  const shadow = $(".en100-shadow");
  const eclipseCore = $(".en100-eclipse-core");
  const eclipseRing = $(".en100-eclipse-ring");
  const eclipseGlow = $(".en100-eclipse-glow");
  const beam = $(".en100-beam");
  const finalScene = $(".en100-final");
  const finalRule = $(".en100-final-rule");
  const percentage = $(".en100-percentage");
  const progress = $(".en100-progress span");
  const sideLabels = $$(".en100-side-label");
  const raysCanvas = $(".en100-rays");
  const ctx = raysCanvas.getContext("2d");
  const starsContainer = $(".en100-stars");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let animationFrame = null;
  let rayRotation = 0;
  let scrollProgress = 0;

  const random = gsap.utils.random;
// Generate background stars.
  const starCount = window.innerWidth < 600 ? 45 : 90;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span");
    star.className = "en100-star";

    star.style.setProperty("--x", `${Math.random() * 100}%`);
    star.style.setProperty("--y", `${Math.random() * 100}%`);
    star.style.setProperty("--size", `${random(1, 2.2)}px`);
    star.style.setProperty("--opacity", random(0.15, 0.7));

    starsContainer.appendChild(star);

    if (!reduceMotion) {
      gsap.to(star, {
        opacity: random(0.1, 0.85),
        duration: random(1.5, 4),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: random(0, 3)
      });
    }
  }

  function resizeCanvas() {
    const rect = stage.getBoundingClientRect();

    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    raysCanvas.width = Math.round(width * dpr);
    raysCanvas.height = Math.round(height * dpr);

    raysCanvas.style.width = `${width}px`;
    raysCanvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawRays();
  }

  function drawRays() {
    if (!ctx || !width || !height) return;

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2 + mouseX * 24;
    const centerY = height / 2 + mouseY * 24;
    const rayCount = 44;
    const innerRadius = Math.min(width, height) * 0.15;
    const outerRadius = Math.max(width, height) * 0.8;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rayRotation);

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const spread = (Math.PI * 2 / rayCount) * 0.35;

      const gradient = ctx.createLinearGradient(
        Math.cos(angle) * innerRadius,
        Math.sin(angle) * innerRadius,
        Math.cos(angle) * outerRadius,
        Math.sin(angle) * outerRadius
      );

      gradient.addColorStop(0, "rgba(255,255,255,0.10)");
      gradient.addColorStop(0.35, "rgba(255,255,255,0.025)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.beginPath();
      ctx.moveTo(
        Math.cos(angle - spread) * innerRadius,
        Math.sin(angle - spread) * innerRadius
      );

      ctx.lineTo(
        Math.cos(angle) * outerRadius,
        Math.sin(angle) * outerRadius
      );

      ctx.lineTo(
        Math.cos(angle + spread) * innerRadius,
        Math.sin(angle + spread) * innerRadius
      );

      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    ctx.restore();
  }

  resizeCanvas();

  // Draw the light rays efficiently.
  function animateRays() {
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;

    if (!reduceMotion) {
      rayRotation += 0.0006;
    }

    drawRays();
    animationFrame = requestAnimationFrame(animateRays);
  }

  if (!reduceMotion) {
    animateRays();
  }

  // Intro animation.
  gsap.set(headline, {
    yPercent: 110,
    opacity: 0,
    rotateX: -20,
    transformOrigin: "center bottom"
  });

  gsap.set([eyebrow, subtitle, scrollCue], {
    y: 15,
    opacity: 0
  });

  gsap.set(orbits, {
    scale: 1.12,
    opacity: 0
  });

  gsap.set(solarSystem, {
    scale: 0.6,
    opacity: 0
  });

  gsap.set(sideLabels, {
    opacity: 0
  });

  gsap.set(eclipseRing, {
    opacity: 0,
    scale: 0.8
  });

  gsap.set(eclipseGlow, {
    opacity: 0
  });

  gsap.set([beam, finalScene], {
    opacity: 0
  });

  const introTimeline = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  introTimeline
    .to(orbits, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      stagger: 0.1
    }, 0)
    .to(solarSystem, {
      scale: 1,
      opacity: 0.9,
      duration: 1.5,
      ease: "power2.out"
    }, 0.1)
    .to(eyebrow, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.15)
    .to(headline, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.15
    }, 0.2)
    .to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.75)
    .to(scrollCue, {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.9);

  // Slow orbital motion.
  if (!reduceMotion) {
    gsap.to(orbits[0], {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: "none"
    });

    gsap.to(orbits[1], {
      rotation: -360,
      duration: 55,
      repeat: -1,
      ease: "none"
    });

    gsap.to(orbits[2], {
      rotation: 360,
      duration: 35,
      repeat: -1,
      ease: "none"
    });

    gsap.to(sunRing, {
      rotation: "+=360",
      duration: 65,
      repeat: -1,
      ease: "none"
    });
  }

  // Mouse interaction.
  root.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();

    targetMouseX =
      ((event.clientX - rect.left) / rect.width - 0.5) * 2;

    targetMouseY =
      ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    gsap.to(solarSystem, {
      x: targetMouseX * 18,
      y: targetMouseY * 18,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to(intro, {
      x: targetMouseX * -9,
      y: targetMouseY * -5,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to(orbits, {
      x: targetMouseX * 10,
      y: targetMouseY * 10,
      duration: 1,
      stagger: 0.03,
      ease: "power3.out",
      overwrite: "auto"
    });
  });

 root.addEventListener("pointerleave", () => {
    targetMouseX = 0;
    targetMouseY = 0;

    gsap.to([solarSystem, intro, ...orbits], {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      overwrite: "auto"
    });
  });


// Scroll-controlled eclipse.
  if (ScrollTrigger && !reduceMotion) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=2600",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollProgress = self.progress;

          percentage.textContent =
            `${Math.round(self.progress * 100)
              .toString()
              .padStart(2, "0")}%`;
        }
      }
    });

    timeline
      // 1. Typography retreats as the celestial body grows.
      .to(intro, {
        scale: 0.75,
        opacity: 0.3,
        filter: "blur(3px)",
        duration: 1
      }, 0)

      .to(orbits, {
        scale: 0.82,
        duration: 1.1,
        stagger: 0.05
      }, 0)

      .to(solarSystem, {
        scale: 1.3,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0)

      .to(sun, {
        scale: 1.15,
        duration: 1.3
      }, 0.2)

      .to(sunCorona, {
        opacity: 0.15,
        duration: 1
      }, 0.3)

      // 2. The black shadow covers the sun.
      .to(shadow, {
        x: "-35%",
        duration: 1.3,
        ease: "power2.inOut"
      }, 1.05)

      .to(eclipseCore, {
        x: "-8%",
        scale: 1.1,
        duration: 1.3,
        ease: "power2.inOut"
      }, 1.05)

      .to(eclipseRing, {
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "power2.out"
      }, 1.55)

      .to(eclipseGlow, {
        opacity: 1,
        duration: 0.9
      }, 1.65)

      .to(sideLabels, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.1
      }, 1.5)

      // 3. Totality: the environment disappears.
      .to(intro, {
        opacity: 0,
        scale: 0.5,
        filter: "blur(10px)",
        duration: 0.7
      }, 1.85)

      .to(sun, {
        opacity: 0,
        scale: 0.7,
        duration: 0.7
      }, 2)

      .to(sunCorona, {
        opacity: 0,
        duration: 0.6
      }, 2)

      .to(shadow, {
        opacity: 0,
        duration: 0.6
      }, 2.1)

      .to(orbits, {
        opacity: 0,
        scale: 0.6,
        duration: 0.8,
        stagger: 0.04
      }, 2.1)

      .to(starsContainer, {
        opacity: 0,
        duration: 0.5
      }, 2.1)

      .to(eclipseCore, {
        scale: 1.25,
        duration: 0.6
      }, 2.1)

      .to(eclipseRing, {
        scale: 1.18,
        duration: 0.7
      }, 2.15)

      .to(eclipseGlow, {
        opacity: 0.3,
        duration: 0.5
      }, 2.2)
// 4. The ring becomes the only remaining light.
      .to(eclipseRing, {
        scale: 0.65,
        duration: 0.8,
        ease: "power2.inOut"
      }, 2.75)

      .to(eclipseCore, {
        scale: 0.65,
        duration: 0.8
      }, 2.75)

      .to(eclipseGlow, {
        opacity: 0.1,
        duration: 0.8
      }, 2.75)

      .to(sideLabels, {
        opacity: 0,
        duration: 0.35
      }, 2.8)

      // 5. The ring expands into a horizontal beam.
      .to(eclipseRing, {
        scaleX: 3.2,
        scaleY: 0.015,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in"
      }, 3.55)

      .to(beam, {
        opacity: 1,
        scaleX: 1,
        duration: 0.45,
        ease: "power2.inOut"
      }, 3.7)

      .to(beam, {
        opacity: 0,
        scaleX: 0,
        duration: 0.65,
        ease: "power3.out"
      }, 4.05)

      .to(eclipseCore, {
        opacity: 0,
        scale: 0,
        duration: 0.4
      }, 4.05)

      // 6. The final statement emerges.
      .to(finalScene, {
        opacity: 1,
        y: "-50%",
        duration: 0.9,
        ease: "power3.out"
      }, 4.25)

      .to(finalRule, {
        width: "min(180px, 35vw)",
        duration: 0.7,
        ease: "power2.inOut"
      }, 4.7)

      .to(progress, {
        scaleX: 1,
        duration: 5,
        ease: "none"
      }, 0);

  } else {
    gsap.set(intro, {
      clearProps: "transform,filter",
      opacity: 1
    });

    gsap.set(headline, {
      clearProps: "transform,opacity"
    });

    gsap.set([eyebrow, subtitle, scrollCue], {
      clearProps: "transform,opacity"
    });

    gsap.set(solarSystem, {
      clearProps: "transform,opacity"
    });

    gsap.set(orbits, {
      clearProps: "transform,opacity"
    });

    gsap.set(finalScene, {
      opacity: 1,
      y: "-50%"
    });

    gsap.set(finalRule, {
      width: "min(180px, 35vw)"
    });

    percentage.textContent = "100%";
  }

  // Keep the canvas crisp after viewport changes.
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

  // Stop the animation loop when the page is hidden.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    } else if (!document.hidden && !reduceMotion && !animationFrame) {
      animateRays();
    }
  });
})();


/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
