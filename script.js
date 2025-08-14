// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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

// Animate on scroll into view
function whyUsObserver() {
    const features = document.querySelectorAll('.why-us-feature');
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

document.addEventListener('DOMContentLoaded', whyUsObserver);

// Partners slider - Duplicate content for seamless loop
const partnersTrack = document.querySelector('.partners-track');
const partnerLogos = partnersTrack.innerHTML;
partnersTrack.innerHTML = partnerLogos + partnerLogos + partnerLogos;

// Form handling
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .about-card, .hero-stats .stat').forEach(el => {
    observer.observe(el);
});

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

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.number');
            const text = number.textContent;
            const value = parseFloat(text);
            animateCounter(number, value);
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.hero-stats .stat').forEach(stat => {
    statsObserver.observe(stat);
});


// ===================
// Carousel Auto Slide
// ===================
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    if (!track) return; // Exit if carousel doesn't exist

    const slides = document.querySelectorAll(".carousel-track img");
    const slideCount = slides.length;
    let currentIndex = 0;

    function moveToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        moveToSlide(currentIndex);
    }

    // 2s pause + 2.5s slide
    setInterval(nextSlide, 4500);
});
