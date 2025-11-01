/**
 * PickFormula Website - Interactive Features
 * Smooth scrolling, animations, and navigation enhancements
 */

// ================================
// SMOOTH SCROLL FOR NAVIGATION
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// NAVIGATION BACKGROUND ON SCROLL
// ================================
const nav = document.querySelector('.nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add solid background when scrolled
    if (currentScrollY > 100) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }

    lastScrollY = currentScrollY;
});

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animations
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(section);
});

// ================================
// RELEASE CARDS STAGGER ANIMATION
// ================================
const releaseCards = document.querySelectorAll('.release-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

releaseCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    cardObserver.observe(card);
});

// ================================
// ACTIVE NAVIGATION LINK
// ================================
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--color-gold)';
        }
    });
});

// ================================
// PARALLAX EFFECT FOR HERO
// ================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const opacity = 1 - (scrolled / heroHeight);
        const translateY = scrolled * 0.5;

        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translateY(${translateY}px)`;
    }
});

// ================================
// CONSOLE EASTER EGG
// ================================
console.log('%cPickFormula', 'font-size: 3rem; font-weight: bold; color: #D4AF37;');
console.log('%cWhere data meets sound.', 'font-size: 1rem; color: #999;');
console.log('%cLooking for something? Get in touch: hello@pickformula.com', 'font-size: 0.9rem; color: #D4AF37;');

// ================================
// PERFORMANCE OPTIMIZATION
// ================================
// Debounce scroll events
let scrollTimeout;
function debounceScroll(callback, delay = 10) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(callback, delay);
}

// Preload critical fonts
if ('fonts' in document) {
    Promise.all([
        document.fonts.load('700 1em SF Pro Display'),
        document.fonts.load('400 1em SF Pro Text')
    ]).then(() => {
        document.body.classList.add('fonts-loaded');
    });
}

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================
// Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ================================
// INITIALIZE
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('PickFormula website loaded successfully');

    // Add loaded class for any CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
