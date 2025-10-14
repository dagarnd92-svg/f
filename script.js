document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      });
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navClose = document.querySelector('.nav-close');
  console.log('Hamburger:', hamburger);
  console.log('Nav Menu:', navMenu);
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Hamburger clicked!');
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll', navMenu.classList.contains('active'));
      console.log('Menu active:', navMenu.classList.contains('active'));
    });

    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll', navMenu.classList.contains('active'));
      }
    });

    // Mobile dropdown toggle
    const productDropdown = document.querySelector('.products-dropdown-parent');
    if (productDropdown) {
      const dropdownLink = productDropdown.querySelector('a');
      if (dropdownLink) {
        dropdownLink.addEventListener('click', function(e) {
          if (window.innerWidth <= 900) {
            e.preventDefault();
            productDropdown.classList.toggle('active');
          }
        });
      }
    }

    // Close mobile menu when clicking on a link (but not dropdown parent)
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          // Don't close if it's the products dropdown parent link
          if (!link.parentElement.classList.contains('products-dropdown-parent')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
          }
        }
      });
    });

    // Close via X button
    if (navClose) {
      navClose.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      }
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }

  // Why Us Section Animation
  function animateWhyUs() {
    const features = document.querySelectorAll('.why-us-feature');
    features.forEach(feature => {
      const img = feature.querySelector('.why-us-img');
      const text = feature.querySelector('.why-us-text');
      if (img) img.classList.add('animated');
      if (text) text.classList.add('animated');
    });
  }

  function whyUsObserver() {
    const features = document.querySelectorAll('.why-us-feature');
    if (!features.length) return;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector('.why-us-img');
            const text = entry.target.querySelector('.why-us-text');
            if (img) img.classList.add('animated');
            if (text) text.classList.add('animated');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      features.forEach(feature => observer.observe(feature));
    } else {
      animateWhyUs();
    }
  }
  whyUsObserver();

  // Partners slider - Duplicate content for seamless loop
  const partnersTrack = document.querySelector('.partners-track');
  if (partnersTrack) {
    const partnerLogos = partnersTrack.innerHTML;
    partnersTrack.innerHTML = partnerLogos + partnerLogos + partnerLogos;
  }

  // Form handling
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }

  // Intersection Observer for animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate-in');
      });
    }, observerOptions);
    document.querySelectorAll('.product-card, .about-card, .hero-stats .stat').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.product-card, .about-card, .hero-stats .stat').forEach(el => el.classList.add('animate-in'));
  }

  // Counter animation for stats
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + (target === 500 ? '+' : target === 99.9 ? '%' : '');
    }, 20);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const number = entry.target.querySelector('.number');
        if (number) {
          const value = parseFloat(number.textContent);
          animateCounter(number, value);
        }
        statsObserver.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll('.hero-stats .stat').forEach(stat => statsObserver.observe(stat));

  // ===================
  // Carousel Auto Slide
  // ===================
  const carousel = document.querySelector('.carousel');
  const track = document.querySelector('.carousel-track');
  if (carousel && track) {
    // Ensure slides exist
    let slides = Array.from(track.querySelectorAll('img, .slide'));
    if (slides.length > 1) {
      // Make sure each slide takes full width
      slides.forEach(s => { s.style.flex = '0 0 100%'; s.style.width = '100%'; });

      // Clone first slide for infinite loop
      const firstClone = slides[0].cloneNode(true);
      track.appendChild(firstClone);

      // Force proper transition if not set in CSS
      const baseTransition = getComputedStyle(track).transition || '';
      if (!baseTransition.includes('transform')) {
        track.style.transition = 'transform 2.5s ease-in-out';
      }

      let index = 0;
      const PAUSE_MS = 2000;       // wait time on each image
      const SLIDE_MS = 2500;       // matches CSS transition duration
      let timer = null;

      // Start at first slide
      track.style.transform = 'translateX(0%)';

      function scheduleNext() {
        timer = setTimeout(() => {
          index += 1;
          track.style.transform = `translateX(-${index * 100}%)`;
        }, PAUSE_MS);
      }

      track.addEventListener('transitionend', () => {
        // If we reached the clone (visually slide from last to clone)
        if (index === slides.length) {
          // Jump back to the real first slide without animation
          track.style.transition = 'none';
          index = 0;
          track.style.transform = 'translateX(0%)';
          // Force reflow, then restore transition
          // so the next move animates again
          void track.offsetHeight;
          track.style.transition = 'transform 2.5s ease-in-out';
        }
        scheduleNext(); // wait, then slide again
      });

      // Kick off the loop with an initial wait
      scheduleNext();

      // Optional: pause on hover (uncomment if you want)
      // carousel.addEventListener('mouseenter', () => { clearTimeout(timer); });
      // carousel.addEventListener('mouseleave', () => { scheduleNext(); });
    }
  }
});
