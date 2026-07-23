gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".line").forEach((line, i) => {
  gsap.fromTo(
    line,
    {
      y: 120,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: line,
        start: "top 90%",
        end: "top 65%",
        scrub: true,
      },
    },
  );
});
