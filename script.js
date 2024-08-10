
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('index.html.nava');

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


const img = document.querySelector('.cp-img')
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  img.style.clipPath = `circle(${current}px at center)`
})

// global office map section

$(document).ready(function () {
  const cityDetails = {
    dubai: {
      name: 'Dubai',
      address: '<b><span class="black-box-ai">AI</span> BOT PROPERTIES</b>,<br>Ontario Tower <br> Business Bay, Dubai, UAE',
      phone: '+971-58-599-7430',
      background: 'url(assets/country/DUBAI.jpg)'
    },
    paris: {
      name: 'Paris',
      address: '<b><span class="black-box-ai">AI</span> BOT PROPERTIES</b><br>Mr.Bachir BOUSSEBISSI',
      phone: '+33-6-14-74-81-44',
      background: 'url(assets/country/FRANCE.jpg)'
    },
    geneva: {
      name: 'Geneva',
      address: '<b><span class="black-box-ai">AI</span> BOT PROPERTIES</b>,<br>Mrs. Hayat JMAMMOU',
      phone: '+41-79-636-14-79',
      background: 'url(assets/country/Switzerland.jpg)'
    },
    rabat: {
      name: 'Rabat',
      address: '<b>KH REALTY</b><br>Mrs. Khaoula MEYNAOUI',
      phone: '+212-666-64-30-30',
      background: 'url(assets/country/Morocco.jpg)'
    },
  };

  $('.flag-button').click(function () {
    const country = $(this).data('country');
    const details = cityDetails[country];

    if (details) {
      $('.global-container').css('background-image', details.background);
      $('.gc-country-name').html(details.name);
      if (details.address) {
        $('.gc-address p').html(details.address);
        $('.gc-address').show();
      } else {
        $('.gc-address').hide();
      }
      $('.gc-phone-number p').html(details.phone);

      // Remove the active class from all buttons
      $('.flag-button').removeClass('active');
      // Add the active class to the clicked button
      $(this).addClass('active');
    }
  });

$('.gc-phone-number').click(function () {
    const phoneNumber = $('.gc-phone-number p').html().trim();

    // Check if the phone number is "Message us"
    if (phoneNumber === 'Message us') {
        window.open('https://wa.me/971585997430', '_blank');
    } else {
        // Extract digits from the phone number and open WhatsApp
        const formattedNumber = phoneNumber.replace(/\D/g, '');
        window.open(`https://wa.me/${formattedNumber}`, '_blank');
    }
});

});


$("#getfreeconsult").click(function() {
  $('html, body').animate({
      scrollTop: $("#db-contact").offset().top
  }, 1000); // Adjust the duration (1000 milliseconds) as needed
});


// navbar script

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY === 0) {
      navbar.classList.add('transparent');
      navbar.classList.remove('bg-white');
    } else {
      navbar.classList.remove('transparent');
      navbar.classList.add('bg-white');
    }
  });

  // Initial check
  if (window.scrollY === 0) {
    navbar.classList.add('transparent');
  } else {
    navbar.classList.add('white-background');
  }
});


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

document.addEventListener('DOMContentLoaded', function() {
  var flkty = new Flickity('.fty-carousel', {
    wrapAround: true,
    contain: true,
    resize:true,
    cellAlign:'center',
    fullscreen:true,
    adaptiveHeight:true,
    pageDots:false,
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
          } 
      });
  }, { threshold: 0.5 });

  boxes.forEach(box => {
      observer.observe(box);
  });
});
// toggle section
document.getElementById('btn-professional').addEventListener('click', function() {
  toggleForms('professional');
});

document.getElementById('btn-individual').addEventListener('click', function() {
  toggleForms('individual');
});

function toggleForms(type) {
  const professionalForm = document.getElementById('form-professional');
  const individualForm = document.getElementById('form-individual');
  const professionalText = document.getElementById('text-professional');
  const individualText = document.getElementById('text-individual');

  if (type === 'professional') {
      professionalForm.style.display = 'block';
      individualForm.style.display = 'none';
      professionalText.style.display = 'block';
      individualText.style.display = 'none';
      document.getElementById('btn-professional').classList.add('active-sidq');
      document.getElementById('btn-individual').classList.remove('active-sidq');
  } else {
      individualForm.style.display = 'block';
      professionalForm.style.display = 'none';
      individualText.style.display = 'block';
      professionalText.style.display = 'none';
      document.getElementById('btn-individual').classList.add('active-sidq');
      document.getElementById('btn-professional').classList.remove('active-sidq');
  }
}

$(document).ready(function() {
  function updateViewportHeight() {
    var viewport = $('#db-testimonials .flickity-viewport');
    var caseStudyCard = $('.fty-carousel-cell.is-selected .case-study-card');
    
    // Check viewport width
    if ($(window).width() < 768) {
      // Get the height of the selected case study card
      var cardHeight = caseStudyCard.outerHeight();
      
      // Calculate the new viewport height (adding 3 rem extra)
      var newViewportHeight = cardHeight + parseFloat($('html').css('font-size')) * 3; // Assuming 1 rem = font-size in pixels
      
      // Set the viewport height
      viewport.height(newViewportHeight);
    } else {
      // Reset to initial height for larger viewports
      viewport.css('height', '574px'); // Or any other initial height value
    }
  }

  // Update height on document ready
  updateViewportHeight();

  // Update height on Flickity change events
  $('.flickity-viewport').on('select.flickity', function() {
    updateViewportHeight();
  });

  // Update height on window resize
  $(window).resize(function() {
    updateViewportHeight();
  });
});


// cta section p tag script 

document.addEventListener("DOMContentLoaded", function () {
  var target = document.getElementById("my_text");

  function revealOnScroll() {
    var rect = target.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight && rect.bottom >= 0) {
      target.classList.add("reveal");
      // Remove the event listener after the element is revealed to improve performance
      window.removeEventListener("scroll", revealOnScroll);
    }
  }

  window.addEventListener("scroll", revealOnScroll);
  // Check if the element is already in view (in case the user starts in the middle of the page)
  revealOnScroll();
});


// cursor script

new kursor({
  type: 1,
  removeDefaultCursor: true
});



// clip path animation


// video element 

const video = document.getElementById('video');
        const playPauseButton = document.getElementById('playPauseButton');

        playPauseButton.addEventListener('click', () => {
          if (video.paused) {
            video.play();
            playPauseButton.classList.remove('play');
            playPauseButton.classList.add('pause');
          } else {
            video.pause();
            playPauseButton.classList.remove('pause');
            playPauseButton.classList.add('play');
          }
        });

        video.addEventListener('play', () => {
          playPauseButton.classList.remove('play');
          playPauseButton.classList.add('pause');
        });

        video.addEventListener('pause', () => {
          playPauseButton.classList.remove('pause');
          playPauseButton.classList.add('play');
        });




