gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const windowContainer = document.querySelector(".window-container");
  const skyContainer = document.querySelector(".sky-container");
  const heroCopy = document.querySelector(".hero-copy");
  const heroHeader = document.querySelector(".hero-header");
  const skyText = document.querySelector(".sky-text");

  const skyContainerHeight = skyContainer.offsetHeight;
  const viewportHeight = window.innerHeight;
  const skyMoveDistance = viewportHeight - skyContainerHeight;

  gsap.set(heroCopy,{ yPercent: 100 });



  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: `+=${window.innerHeight * 2}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,

    onUpdate: (self) => {
      const progress = self.progress;

      let windowScale;

      if (progress <= 0.5) {
        windowScale = 1 + (progress / 0.5) * 2;
      } else {
        windowScale = 6;
      }

      gsap.set(windowContainer, {
        scale: windowScale,
      });

      gsap.set(heroHeader, {
        scale: windowScale,
        z: progress * 600,
      });

      gsap.set(skyContainer, {
        y: progress/1 * skyMoveDistance,
      });

      // new horizontal movement
      gsap.set(skyText, {
        xPercent: -30 * progress/0.20,
        // yPercent: -5 * progress/0.6,
      });

//       let heroCopyY;

//       if (progress <= 0.66) {
//         heroCopyY = 100;
//       } else if (progress >= 1) {
//         heroCopyY = 0;
//       } else {
//         heroCopyY = 100 * (1 - (progress - 0.66) / 0.34);
//       }

//       gsap.set(heroCopy, {
//         yPercent: heroCopyY,
//       });
//     },

//   });

    },
  });

});




