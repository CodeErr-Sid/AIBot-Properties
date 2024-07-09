
    let cardsection = ()=>{
  document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Shuffle animation on page load with rotation
  const cards = document.querySelectorAll(".card-i");
  cards.forEach(card => {
    const randomX = gsap.utils.random(-200, 200, true);
    const randomY = gsap.utils.random(-200, 200, true);
    const randomRotation = gsap.utils.random(-30, 30, true);
    gsap.set(card, { x: randomX, y: randomY, rotation: randomRotation });
  });

  // Animate to default positions on click
  const scrollContainer = document.querySelector(".cardsection .btn");
  scrollContainer.addEventListener("click", () => {
    gsap.to(cards, {
      x: 0,
      y: 0,
      rotation: 0,
      // stagger: 0.1,
      ease: "power2.out",
    });
  });

  // Horizontal scrolling with ScrollTrigger
  gsap.to(".cards-i", {
    x: () => -(scrollContainer.scrollWidth - scrollContainer.clientWidth),
    scrollTrigger: {
      trigger: ".cardsection",
      start: "top top",
      end: () => "+=" + scrollContainer.scrollWidth,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  });
});

}
cardsection();