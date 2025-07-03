$(document).ready(function () {
  function HeroScript(){
      // Variables
      let isMenuOpen = false;
      const $menuToggle = $('#menu-toggle');
      const $mobileMenu = $('#mobile-menu');
      const $hamburgerIcon = $('.hamburger-icon');
      const $closeIcon = $('.close-icon');
      const $dropdownContent = $('#dropdown-content');
      
      // Toggle mobile menu
      $menuToggle.on('click', function() {
        isMenuOpen = !isMenuOpen;
        
        // Toggle icons
        if (isMenuOpen) {
          $hamburgerIcon.addClass('hidden');
          $closeIcon.removeClass('hidden');
          $menuToggle.attr('aria-label', 'Close menu');
          
          // Get content height and animate open
          const contentHeight = $dropdownContent.outerHeight();
          $mobileMenu.css('height', contentHeight + 'px');
        } else {
          $hamburgerIcon.removeClass('hidden');
          $closeIcon.addClass('hidden');
          $menuToggle.attr('aria-label', 'Open menu');
          
          // Animate close
          $mobileMenu.css('height', '0px');
        }
      });
      
      // Smooth scroll function with header offset
      $('.nav-link, .mobile-nav-link').on('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (isMenuOpen) {
          isMenuOpen = false;
          $hamburgerIcon.removeClass('hidden');
          $closeIcon.addClass('hidden');
          $menuToggle.attr('aria-label', 'Open menu');
          $mobileMenu.css('height', '0px');
        }
        
        // Get target element
        const targetId = $(this).attr('href');
        const $targetElement = $(targetId);
        
        if ($targetElement.length) {
          // Get header height to offset scroll position
          const headerHeight = $('header').outerHeight();
          
          // Calculate position with offset
          const elementPosition = $targetElement.offset().top;
          const offsetPosition = elementPosition - headerHeight;
          
          // Smooth scroll to the element
          $('html, body').animate({
            scrollTop: offsetPosition
          }, 800);
        }
      });
      
      // Handle window resize to recalculate dropdown height if menu is open
      $(window).on('resize', function() {
        if (isMenuOpen) {
          const contentHeight = $dropdownContent.outerHeight();
          $mobileMenu.css('height', contentHeight + 'px');
        }
      });
    
  }

  function updateAfflinksLinksOutbound() {
    const urlParams = new URLSearchParams(window.location.search);
    const sub2Value = urlParams.get("sub2") || "";
    const baseUrl = "https://offer.buyvitaltranslatebuds.com/offer/1/checkout-now-v3.php?C1=1514&uid=14199&oid=1514&affid=1244&AFFID=1244&utm_campaign=CPA_1244&utm_source=1244&package=1&sub2={clickid}";
    const updatedUrl = baseUrl.replace("{clickid}", sub2Value);

    $(".aff-link").each(function() {
      $(this).attr("href", updatedUrl);
    });
  }

  function updateHeroAfterHeight() {
    if ($(".hero-last-section").length) {
      const containerHeight = $(".hero-last-section").outerHeight();
      const containerVideoHeight = $(".video-container").outerHeight();
      const containerInfoHeight = $(".product-info").innerHeight();
      const totalGap = containerVideoHeight - containerInfoHeight;
      const newHeightDesktop = containerHeight + (totalGap > 0 ? totalGap + 14 : 16) + 0 + "px";
      const newHeightDesktopXMedium = containerHeight + 24 + "px";
      const newHeightDesktopSmaller = containerHeight + 16 + "px";
      const newHeightXMobile = containerHeight + 16 + "px";
      const newHeightMobile = containerHeight + 16 + "px";

      const windowWidth = $(window).width();

      if (windowWidth >= 1260) {
        document.documentElement.style.setProperty(
          "--hero-before-height",
          newHeightDesktop
        );
      } else if (windowWidth >= 1200) {
        document.documentElement.style.setProperty(
          "--hero-before-height",
          newHeightDesktopXMedium
        );
      } else if (windowWidth >= 1024) {
        document.documentElement.style.setProperty(
          "--hero-before-height",
          newHeightDesktopSmaller
        );
      } else if (windowWidth >= 768) {
        document.documentElement.style.setProperty(
          "--hero-before-height",
          newHeightXMobile
        );
      } else {
        document.documentElement.style.setProperty(
          "--hero-before-height",
          newHeightMobile
        );
      }
    }
  }

  function updateShippingDate() {
    if ($(".date-to-ship").length) {
      // Get current date
      let currentDate = new Date();

      // Add one day
      let shippingDate = new Date(currentDate);
      shippingDate.setDate(currentDate.getDate() + 1);

      // Get day of week
      const dayNames = [
        "SUN",
        "MON",
        "TUE",
        "WED",
        "ThU",
        "FRI",
        "SAT",
      ];
      const dayOfWeek = dayNames[shippingDate.getDay()];

      // Get day of month with ordinal suffix (1st, 2nd, 3rd, etc.)
      const day = shippingDate.getDate();
      let ordinalSuffix;

      if (day > 3 && day < 21) {
        ordinalSuffix = "th";
      } else {
        switch (day % 10) {
          case 1:
            ordinalSuffix = "st";
            break;
          case 2:
            ordinalSuffix = "nd";
            break;
          case 3:
            ordinalSuffix = "rd";
            break;
          default:
            ordinalSuffix = "th";
        }
      }

      // Get month name
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = monthNames[shippingDate.getMonth()];

      // Format the date as "Tuesday 19th February"
      const formattedDate = `${dayOfWeek} ${day}${ordinalSuffix} ${month}`;

      // Update the element with class "date-to-ship"
      $(".date-to-ship").text(formattedDate);
    }
  }

  function InitializeFAQ() {
    // Initialize the FAQ accordion
    if($(".faq-item").length){
      $(".faq-answer").hide();
      let activeId = 1;
  
  // Show the first answer initially
  $(".faq-item").eq(0).addClass("active");
  $(".faq-item").eq(0).find(".faq-answer").show();
  
  // Handle click on FAQ questions
  $(".faq-question").click(function() {
    const $faqItem = $(this).closest(".faq-item");
    const id = $faqItem.index() + 1;
    
    if (activeId === id) {
      // If clicking the active item, close it
      $faqItem.removeClass("active");
      $faqItem.find(".faq-answer").slideUp(200);
      activeId = 0;
    } else {
      // Otherwise, open the clicked item
      $(".faq-item").removeClass("active");
      $(".faq-answer").slideUp(200);
      
      $faqItem.addClass("active");
      $faqItem.find(".faq-answer").slideDown(200);
      activeId = id;
    }
    
    // Update icons for all items
    $(".faq-item").each(function(index) {
      const itemId = index + 1;
      const $iconContainer = $(this).find(".faq-icon");
      
      if (itemId === activeId) {
        $iconContainer.html(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 31 30" fill="none">
            <rect x="29.5" y="1" width="28" height="28" rx="14" transform="rotate(90 29.5 1)" stroke="black" stroke-width="2"/>
            <rect x="23.5" y="16" width="16" height="2" transform="rotate(180 23.5 16)" fill="black"/>
          </svg>
        `);
      } else {
        $iconContainer.html(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 31 30" fill="none">
            <rect x="1.5" y="1" width="28" height="28" rx="14" stroke="black" stroke-width="2"/>
            <rect x="7.5" y="14" width="16" height="2" fill="black"/>
            <rect x="16.5" y="7" width="16" height="2" transform="rotate(90 16.5 7)" fill="black"/>
          </svg>
        `);
      }
    });
  });
    }
  }

  // Duplicate marquee content for smooth scrolling
  if ($("#marquee").length) {
    const clone = $("#marquee").html();
    $("#marquee").html(clone + clone);

    // Adjust speed based on screen width
    const updateSpeed = function () {
      const width = $(window).width();
      const speed = width < 768 ? "30s" : "40s";

      // Check if element exists
      if ($(".marquee-content").length) {
        $(".marquee-content").css("animation-duration", speed);
      }
    };

    updateSpeed();
    $(window).on("resize", updateSpeed);
  }

  function initializeCountdown() {
    setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    let countdown = $('.countdown').text();
    let [hours, minutes, seconds] = countdown.split(':').map(Number);
  
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
      if (minutes < 0) {
        minutes = 59;
        hours--;
      }
    }
  
    $('.countdown').text(
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    );
  }

  function disableClick(){
    $(document).on("contextmenu", function(e) {
      e.preventDefault();
  });

  // Disable specific keyboard shortcuts
  $(document).keydown(function(e){
      if ((e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
          (e.ctrlKey && (e.key === "U" || e.key === "C" || e.key === "S")) ||
          (e.key === "F12")) {
          e.preventDefault();
          return false;
      }
  });

  // Disable mouse events except for links
  $('body').on('mousedown mouseup click', function(e){
      if (!$(e.target).closest('a').length) {
          e.preventDefault();
          return false;
      }
  });
  }

  function updateLogoSources() {
    const isMobile = window.innerWidth < 768;
    
    $('[data-logo-index]').each(function() {
      const $img = $(this).find('img');
      const desktopSrc = $img.data('desktop-src');
      const mobileSrc = $img.data('mobile-src');
      
      // Update image source based on screen size
      if (isMobile && mobileSrc) {
        $img.attr('src', mobileSrc);
      } else if (desktopSrc) {
        $img.attr('src', desktopSrc);
      }
    });
  }

  const MOBILE_WIDTH = 768;
      const fixedBottomCta = document.getElementById('fixed-bottom-cta');
      let showByScroll = false;
      let isMobile = false;

      // Check if device is mobile
      function checkMobile() {
        isMobile = window.innerWidth < MOBILE_WIDTH;
        updateCTAVisibility();
      }

      // Set up Intersection Observer for hero section
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const observer = new IntersectionObserver(
          (entries) => {
            showByScroll = !entries[0].isIntersecting;
            updateCTAVisibility();
          },
          { threshold: 0 }
        );
        
        observer.observe(heroSection);
      }

      // Update CTA visibility based on scroll position and device width
      function updateCTAVisibility() {
        if (showByScroll && isMobile) {
          fixedBottomCta.style.bottom = '0';
        } else {
          fixedBottomCta.style.bottom = '-100%';
        }
      }

      function setRandomDatesToElements() {
  // Get all elements with the class "testimonial-date-grid"
  const dateElements = document.querySelectorAll('.testimonial-date-grid');
  const elementCount = dateElements.length;
  
  // Validate that we have either 3 or 6 elements
  if (elementCount !== 3 && elementCount !== 6) {
    if (elementCount === 0) {
      console.error('No elements found with class "testimonial-date-grid"');
      return;
    }
    return;
  }
  
  const currentDate = new Date();
  const dates = [];
  const usedDates = new Set();
  
  // Generate random dates based on the number of elements found
  while (dates.length < elementCount) {
    // Generate random number of days (0-29) to SUBTRACT from current date
    const randomDays = Math.floor(Math.random() * 30);
    
    // Create new date by subtracting random days (going backwards in time)
    const randomDate = new Date(currentDate.getTime() - (randomDays * 24 * 60 * 60 * 1000));
    
    // Create a date string to check for duplicates
    const dateKey = randomDate.toISOString().split('T')[0];
    
    // Only add if we haven't used this date before
    if (!usedDates.has(dateKey)) {
      usedDates.add(dateKey);
      dates.push(randomDate);
    }
  }
  
  // Sort dates chronologically (oldest to newest)
  dates.sort((a, b) => a - b);
  
  // Format dates and assign to elements
  dates.forEach((date, index) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
    
    // Set the formatted date to the element
    dateElements[index].textContent = formattedDate;
  });
  
  return dates.map(date => date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }));
}
  //ANimated Section JS
   const slideInterval = 3000; // 3 seconds between slides
const fadeDuration = 1000;   // 1 second fade duration

// Get all background slides
const $slides = $('.bg-slide');
const totalSlides = $slides.length;
let currentIndex = 0;

// Text content array for each slide
const textContent = [
  {
    languageTo: "French",
    translation1Before: "When is the best time to visit the top of the Eiffel Tower?",
    translation1After: "Quel est le meilleur moment pour visiter le sommet de la tour Eiffel ?",
    translation2Before: "Le matin tôt ou en soirée pour éviter la foule.",
    translation2After: "Early morning or in the evening to avoid the crowd."
  },
   {
    languageTo: "Italian",
    translation1Before: "Are there guided tours of the Colosseum available?",
    translation1After: "Ci sono visite guidate del Colosseo disponibili?",
    translation2Before: "Sì, partono ogni mezz’ora vicino all’ingresso.",
    translation2After: "Yes, they start every half hour near the entrance."
  },
  {
    languageTo: "Turkish",
    translation1Before: "Is photography allowed inside the Hagia Sophia?",
    translation1After: "Ayasofya’nın içinde fotoğraf çekmek serbest mi?",
    translation2Before: "Evet, ama flaş kullanmadan çekmeniz gerekiyor.",
    translation2After: "Yes, but you need to take photos without using flash."
  },
  {
    languageTo: "Egyptian",
    translation1Before: "How long does it take to walk around the pyramids?",
    translation1After: "المشي حوالين الأهرامات بياخد وقت قد إيه؟",
    translation2Before: "تقريباً ساعة، بس لو حابب تدخل كمان هيطول أكتر.",
    translation2After: "About an hour, but longer if you want to go inside too."
  },
 
];

// Initialize - show first slide and set initial text
$slides.eq(currentIndex).addClass('active');
updateTextContent(currentIndex);

// Function to update text content with animation
function updateTextContent(index) {
  const content = textContent[index];
  const $textElements = $('.text-language-to, .translation-1-before, .translation-1-after, .translation-2-before, .translation-2-after');
  
  // Animate text out (move up and fade)
  $textElements.css({
    'transform': 'translateY(-20px)',
    'opacity': '0',
    'transition': 'all 0.3s ease-in-out'
  });
  
  // After animation completes, update content and animate in
  setTimeout(() => {
    $('.text-language-to').text(content.languageTo);
    $('.translation-1-before').text(content.translation1Before);
    $('.translation-1-after').text(content.translation1After);
    $('.translation-2-before').text(content.translation2Before);
    $('.translation-2-after').text(content.translation2After);
    
    // Animate text in (move to original position and fade in)
    $textElements.css({
      'transform': 'translateY(0)',
      'opacity': '1',
      'transition': 'all 0.3s ease-in-out'
    });
  }, 300);
}

// Animation function
function animateBackgrounds() {
  // Remove active class from current slide
  $slides.eq(currentIndex).removeClass('active');
  
  // Move to next slide (loop back to 0 when reaching the end)
  currentIndex = (currentIndex + 1) % totalSlides;
  
  // Add active class to new slide
  $slides.eq(currentIndex).addClass('active');
  
  // Update text content
  updateTextContent(currentIndex);
}

// Start the animation interval
setInterval(animateBackgrounds, slideInterval);
  function updateImageSrc() {
      $('.bg-slide').each(function() {
        // Store the current src in data-desktop-src if not already set
        if (!$(this).attr('data-desktop-src')) {
          var currentSrc = $(this).attr('src');
          $(this).attr('data-desktop-src', currentSrc);
        }

        // Check window width and update src accordingly
        if ($(window).width() < 768) { // Example breakpoint for mobile
          var mobileSrc = $(this).data('mobile-src');
          $(this).attr('src', mobileSrc);
        } else {
          var desktopSrc = $(this).attr('data-desktop-src');
          $(this).attr('src', desktopSrc);
        }
      });
    }

    // Initial call to set the correct image src
    
  
  // Run on page load
  updateLogoSources();
  setRandomDatesToElements();
  checkMobile();
  HeroScript();
  updateAfflinksLinksOutbound();
  updateHeroAfterHeight();
  updateShippingDate();
  InitializeFAQ();
  initializeCountdown();
  //disableClick();
  updateImageSrc();

  $(window).on('resize', function() {
   updateImageSrc();
    checkMobile();
    updateLogoSources();
    updateHeroAfterHeight();
  });

});
