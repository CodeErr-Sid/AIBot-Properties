let carousel = () => {
  const slides = document.querySelectorAll(".slide-i");
  const nextButton = document.querySelector(".next-arrow");
  const backButton = document.querySelector(".back-arrow");
  const slidesContainer = document.querySelector(".slides-container");

  let currentIndex = 0;

  function showSlide(index) {
    gsap.to(slidesContainer, {
      x: -index * 100 + '%',
      duration: 0.5,
      ease: "power2.inOut"
    });
  }

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  backButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  gsap.from('.main-card', {
    x: -900,
    opacity: 0,
    scrollTrigger: {
      trigger: '.main-card',
      scroller: 'body',
      start: 'top 60%',
      end: "top 30%",
      scrub: 2,
    }
  });
}

carousel();
