
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nava');

  navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href'); // Get target section ID
      const targetSection = document.querySelector(targetId); // Find target section

      if (targetSection) {
        const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
        
        // Smooth scroll to the target section
        window.scrollTo({
          top: offsetTop - 80, // Adjusted for fixed header if present
          behavior: 'smooth'
        });
      }
    });
  });
});



// //navbar hover effects
// $(document).ready(function () {
//     $(".hover-effect").each(function () {
//       var element = $(this);

//       element.textillate({
//         in: {
//           effect: "fadeInUp",
//           sequence: true,
//           speed: 1000,
//           delayScale: 0.5,
//         },
//         out: {
//           effect: "fadeInDown",
//           sequence: true,
//           speed: 1000,
//           delayScale: 0.5,
//         },
//         loop: false,
//       });

//       // Hover event
//       element.hover(
//         function () {
//           element.textillate("in");
//         },
//         function () {
//           element.textillate("out");
//         }
//       );
//     });
//   });

// typewriter effect

document.addEventListener("DOMContentLoaded", (event) => {
    const text = "SECURE YOUR FUTURE";
    let index = 0;
    const speed = 100; // Speed in milliseconds
    const delay = 2000; // Delay in milliseconds when the full text is typed
    let isDeleting = false;

    function typeWriter() {
        const typewriterElement = document.querySelector(".typewriter-effect");

        if (!isDeleting && index < text.length) {
            // Typing the text
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } 
        // else if (isDeleting && index > 0) {
        //     // Deleting the text
        //     typewriterElement.textContent = text.substring(0, index - 1);
        //     index--;
        //     setTimeout(typeWriter, speed);
        // } else if (index === text.length) {
        //     // Full text typed, start deleting after delay
        //     isDeleting = true;
        //     setTimeout(typeWriter, delay);
        // } 
        // else if (index === 0) {
        //     // All text deleted, start typing again
        //     isDeleting = false;
        //     setTimeout(typeWriter, speed);
        // }
    }

    // Intersection Observer setup
    const options = {
        threshold: 0.5 // Trigger animation when 50% of the element is in view
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(); // Start typewriter effect when in view
                observer.unobserve(entry.target); // Stop observing once animation starts
            }
        });
    }, options);

    // Start observing the typewriter element
    const typewriterElement = document.querySelector(".typewriter-effect");
    observer.observe(typewriterElement);
});



// utility functions
if (!Util) function Util() { }

Util.osHasReducedMotion = function () {
  if (!window.matchMedia) return false;
  var matchMediaObj = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (matchMediaObj) return matchMediaObj.matches;
  return false;
};

// File#: _1_stacking-cards
// Usage: codyhouse.co/license
(function () {
  var StackCards = function (element) {
    this.element = element;
    this.items = this.element.getElementsByClassName("js-stack-cards__item");
    this.scrollingFn = false;
    this.scrolling = false;
    initStackCardsEffect(this);
    initStackCardsResize(this);
  };

  function initStackCardsEffect(element) {
    // use Intersection Observer to trigger animation
    setStackCards(element); // store cards CSS properties
    var observer = new IntersectionObserver(stackCardsCallback.bind(element), {
      threshold: [0, 1],
    });
    observer.observe(element.element);
  }

  function initStackCardsResize(element) {
    // detect resize to reset gallery
    element.element.addEventListener("resize-stack-cards", function () {
      setStackCards(element);
      animateStackCards.bind(element);
    });
  }

  function stackCardsCallback(entries) {
    // Intersection Observer callback
    if (entries[0].isIntersecting) {
      if (this.scrollingFn) return; // listener for scroll event already added
      stackCardsInitEvent(this);
    } else {
      if (!this.scrollingFn) return; // listener for scroll event already removed
      window.removeEventListener("scroll", this.scrollingFn);
      this.scrollingFn = false;
    }
  }

  function stackCardsInitEvent(element) {
    element.scrollingFn = stackCardsScrolling.bind(element);
    window.addEventListener("scroll", element.scrollingFn);
  }

  function stackCardsScrolling() {
    if (this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(animateStackCards.bind(this));
  }

  function setStackCards(element) {
    // store wrapper properties
    element.marginY = getComputedStyle(element.element).getPropertyValue(
      "--stack-cards-gap"
    );
    getIntegerFromProperty(element); // convert element.marginY to integer (px value)
    element.elementHeight = element.element.offsetHeight;

    // store card properties
    var cardStyle = getComputedStyle(element.items[0]);
    element.cardTop = Math.floor(parseFloat(cardStyle.getPropertyValue("top")));
    element.cardHeight = Math.floor(
      parseFloat(cardStyle.getPropertyValue("height"))
    );

    // store window property
    element.windowHeight = window.innerHeight;

    // reset margin + translate values
    if (isNaN(element.marginY)) {
      element.element.style.paddingBottom = "0px";
    } else {
      element.element.style.paddingBottom =
        element.marginY * (element.items.length - 1) + "px";
    }

    for (var i = 0; i < element.items.length; i++) {
      if (isNaN(element.marginY)) {
        element.items[i].style.transform = "none;";
      } else {
        element.items[i].style.transform =
          "translateY(" + element.marginY * i + "px)";
      }
    }
  }

  function getIntegerFromProperty(element) {
    var node = document.createElement("div");
    node.setAttribute(
      "style",
      "opacity:0; visbility: hidden;position: absolute; height:" +
      element.marginY
    );
    element.element.appendChild(node);
    element.marginY = parseInt(
      getComputedStyle(node).getPropertyValue("height")
    );
    element.element.removeChild(node);
  }

  function animateStackCards() {
    if (isNaN(this.marginY)) {
      // --stack-cards-gap not defined - do not trigger the effect
      this.scrolling = false;
      return;
    }

    var top = this.element.getBoundingClientRect().top;

    if (
      this.cardTop -
      top +
      this.element.windowHeight -
      this.elementHeight -
      this.cardHeight +
      this.marginY +
      this.marginY * this.items.length >
      0
    ) {
      this.scrolling = false;
      return;
    }

    for (var i = 0; i < this.items.length; i++) {
      // use only scale
      var scrolling = this.cardTop - top - i * (this.cardHeight + this.marginY);
      if (scrolling > 0) {
        var scaling =
          i == this.items.length - 1
            ? 1
            : (this.cardHeight - scrolling * 0.05) / this.cardHeight;
        this.items[i].style.transform =
          "translateY(" + this.marginY * i + "px) scale(" + scaling + ")";
      } else {
        this.items[i].style.transform =
          "translateY(" + this.marginY * i + "px)";
      }
    }

    this.scrolling = false;
  }

  // initialize StackCards object
  var stackCards = document.getElementsByClassName("js-stack-cards"),
    intersectionObserverSupported =
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype,
    reducedMotion = Util.osHasReducedMotion();

  if (
    stackCards.length > 0 &&
    intersectionObserverSupported &&
    !reducedMotion
  ) {
    var stackCardsArray = [];
    for (var i = 0; i < stackCards.length; i++) {
      (function (i) {
        stackCardsArray.push(new StackCards(stackCards[i]));
      })(i);
    }

    var resizingId = false,
      customEvent = new CustomEvent("resize-stack-cards");

    window.addEventListener("resize", function () {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 500);
    });

    function doneResizing() {
      for (var i = 0; i < stackCardsArray.length; i++) {
        (function (i) {
          stackCardsArray[i].element.dispatchEvent(customEvent);
        })(i);
      }
    }
  }
})();


$(document).ready(function () {

  var loader = document.getElementById("sidloader");

  window.addEventListener("load", function(){
    setTimeout(function(){
      loader.style.display = "none";
      
      $(document).ready(function () {
        // Initialize textillate for each section
        $('.drb-left').textillate({
            autoStart: true,
            in: { effect: 'fadeInLeft', delay: 0 }
        });

        

        $('.drb-tlt').textillate({
            autoStart: false,
            in: { effect: 'fadeIn' },
            delay:10
        });

        $('.drb-main-after').textillate({
            autoStart: false,
            in: { effect: 'fadeIn' },
            delay:10
        });

        $('.drb-right').textillate({
            autoStart: false,
            in: { effect: 'fadeInRight' },
            reverse:true
        });

        $('.author-name').textillate({
            autoStart: false,
            type:'word',
            in: { effect: 'fadeInUp' },
            sync:true
        });

        $('.author-post').textillate({
            autoStart: false,
            type:'word',
            in: { effect: 'fadeInUp' },
            sync:true
        });

        // Start animations sequentially
        setTimeout(function() {
            $('.drb-tlt').textillate('start');
        }, 1000);
        setTimeout(function() {
            $('.drb-main-after').textillate('start');
        }, 11000);
        setTimeout(function() {
            $('.drb-right').textillate('start');
        }, 12000);

        setTimeout(function() {
            $('.author-name').textillate('start');
        }, 13000); // Adjust timing to match the fadeInUp animation

        setTimeout(function() {
            $('.author-post').textillate('start');
        }, 14000); // Adjust timing to match the fadeInUp animation
       
    });
  });
  });



  

  (function () {
    var $slides = document.querySelectorAll('.slide');
    var $controls = document.querySelectorAll('.slider__control');
    var numOfSlides = $slides.length;
    var slidingAT = 1300; // sync this with scss variable
    var slidingBlocked = false;
  
    // Assign unique classes and data-slide attributes to each slide
    [].slice.call($slides).forEach(function ($el, index) {
      var i = index + 1;
      $el.classList.add('slide-' + i);
      $el.dataset.slide = i;
    });
  
    // Add click event listeners to controls
    [].slice.call($controls).forEach(function ($el) {
      $el.addEventListener('click', controlClickHandler);
    });
  
    function controlClickHandler() {
      if (slidingBlocked) return;
      slidingBlocked = true;
  
      var $control = this;
      var isRight = $control.classList.contains('m--right');
      var $curActive = document.querySelector('.slide.s--active');
      var index = +$curActive.dataset.slide;
      
      // Determine next slide index
      if (isRight) {
        index++;
      } else {
        index--;
      }
  
      // Handle edge cases for index wrapping
      if (index < 1) {
        index = numOfSlides;
      }
      if (index > numOfSlides) {
        index = 1;
      }
      
      // Select the next active slide
      var $newActive = document.querySelector('.slide-' + index);
  
      // Apply CSS classes for active and previous slides
      $control.classList.add('a--rotation');
      $curActive.classList.remove('s--active');
      document.querySelector('.slide.s--prev').classList.remove('s--prev');
      
      // Set timeout to handle class changes after animation
      setTimeout(function () {
        $curActive.classList.remove('s--active-prev');
        $newActive.classList.add('s--active');
        if (!isRight) {
          $newActive.classList.add('s--active-prev');
        }
        var prevIndex = index - 1;
        if (prevIndex < 1) {
          prevIndex = numOfSlides;
        }
        document.querySelector('.slide-' + prevIndex).classList.add('s--prev');
      }, slidingAT * 0.25);
  
      // Reset slidingBlocked after animation time
      setTimeout(function () {
        $control.classList.remove('a--rotation');
        slidingBlocked = false;
      }, slidingAT * 0.75);
    };
  }());
  

});

// new vs old dubai

// document.addEventListener('DOMContentLoaded', function () {
//   var flkty = new Flickity('.fty-carousel', {
//     wrapAround: true,
//     // Add other options as needed
//   });

//   flkty.on('select', function () {
//     // Get the currently selected carousel cell
//     var selectedCell = flkty.selectedElement;

//     // Get the container and slider within the selected carousel cell
//     var container = selectedCell.querySelector('.fty-container');
//     var slider = selectedCell.querySelector('.fty-slider');

//     // Add input event listener to the slider within the selected carousel cell
//     slider.addEventListener('input', function (e) {
//       var value = e.target.value;
//       container.style.setProperty('--position', `${value}%`);
//     });
//   });

//   // Initial setup when the page loads
//   var initialSelectedCell = flkty.selectedElement;
//   var initialContainer = initialSelectedCell.querySelector('.fty-container');
//   var initialSlider = initialSelectedCell.querySelector('.fty-slider');

//   // Add input event listener to the slider within the initially selected carousel cell
//   initialSlider.addEventListener('input', function (e) {
//     var value = e.target.value;
//     initialContainer.style.setProperty('--position', `${value}%`);
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  var flkty = new Flickity('.fty-carousel', {
    wrapAround: true,
    // Add other options as needed
  });

  flkty.on('select', function() {
    // Reset listeners for all cells
    flkty.cells.forEach(function(cell) {
      resetListeners(cell.element);
    });

    // Update listeners for all cells
    flkty.cells.forEach(function(cell) {
      updateListeners(cell.element);
    });
  });

  // Initial setup when the page loads
  flkty.cells.forEach(function(cell) {
    updateListeners(cell.element);
  });

  function updateListeners(element) {
    // Get the container, slider, slider button, and slider line within the carousel cell
    var container = element.querySelector('.fty-container');
    var slider = element.querySelector('.fty-slider');
    var sliderButton = element.querySelector('.fty-slider-button');
    var sliderLine = element.querySelector('.fty-slider-line');

    // Function to update position based on hover
    function updatePosition(e) {
      var sliderWidth = slider.clientWidth;
      var posX = e.clientX - slider.getBoundingClientRect().left;
      var percentage = (posX / sliderWidth) * 100;
      container.style.setProperty('--position', `${percentage}%`);
      sliderButton.style.left = `${percentage}%`;
      sliderLine.style.left = `${percentage}%`;
    }

    // Add mousemove event listener to slider for hover control
    slider.addEventListener('mousemove', updatePosition);

    // Reset slider button and line position on mouseout
    slider.addEventListener('mouseout', function() {
      sliderButton.style.left = `var(--position)`;
      sliderLine.style.left = `var(--position)`;
    });

    // Add input event listener to the slider for click and drag functionality
    slider.addEventListener('input', function(e) {
      var value = e.target.value;
      container.style.setProperty('--position', `${value}%`);
      sliderButton.style.left = `${value}%`;
      sliderLine.style.left = `${value}%`;
    });
  }

  function resetListeners(element) {
    var slider = element.querySelector('.fty-slider');
    slider.removeEventListener('mousemove', updatePosition);
    slider.removeEventListener('mouseout', function() {
      sliderButton.style.left = `var(--position)`;
      sliderLine.style.left = `var(--position)`;
    });
    slider.removeEventListener('input', function(e) {
      var value = e.target.value;
      container.style.setProperty('--position', `${value}%`);
      sliderButton.style.left = `${value}%`;
      sliderLine.style.left = `${value}%`;
    });
  }
});


document.addEventListener("DOMContentLoaded", function() {
  let boxes = document.querySelectorAll('.box112');

  let observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('scale-up');
          } else {
              entry.target.classList.remove('scale-up');
          }
      });
  }, { threshold: 0.5 });

  boxes.forEach(box => {
      observer.observe(box);
  });
});





