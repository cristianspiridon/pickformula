/**
 * PickFormula Cinematic Website
 * Video rotation, animations, and interactive features
 */

// ================================
// VIDEO ROTATION SYSTEM
// ================================
class VideoRotator {
    constructor() {
        this.videos = document.querySelectorAll('.video-container');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentIndex = 0;
        this.rotationInterval = null;
        this.rotationDelay = 10000; // 10 seconds

        this.init();
    }

    init() {
        // Set up indicator click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                // Track video indicator click
                if (typeof AnalyticsTracker !== 'undefined') {
                    AnalyticsTracker.trackButtonClick(`video_indicator_${index + 1}`, 'hero_video');
                }
                this.switchToVideo(index);
                this.resetRotationTimer();
            });
        });

        // Start automatic rotation
        this.startRotation();

        console.log('Video rotator initialized with', this.videos.length, 'videos');
    }

    switchToVideo(index) {
        if (index === this.currentIndex) return;

        // Remove active class from current video and indicator
        this.videos[this.currentIndex].classList.remove('active');
        this.indicators[this.currentIndex].classList.remove('active');

        // Add active class to new video and indicator
        this.currentIndex = index;
        this.videos[this.currentIndex].classList.add('active');
        this.indicators[this.currentIndex].classList.add('active');
    }

    nextVideo() {
        const nextIndex = (this.currentIndex + 1) % this.videos.length;
        this.switchToVideo(nextIndex);
    }

    startRotation() {
        this.rotationInterval = setInterval(() => {
            this.nextVideo();
        }, this.rotationDelay);
    }

    resetRotationTimer() {
        clearInterval(this.rotationInterval);
        this.startRotation();
    }

    pause() {
        clearInterval(this.rotationInterval);
    }

    resume() {
        this.startRotation();
    }
}

// ================================
// SMOOTH SCROLL FOR NAVIGATION
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            // Track navigation to top
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackNavigation('home');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            // Track navigation
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackNavigation(href.substring(1));
            }

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

function updateNavBackground() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }

    lastScrollY = currentScrollY;
}

// ================================
// PARALLAX FADE EFFECT FOR HERO
// ================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

function updateHeroParallax() {
    const scrolled = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const opacity = 1 - (scrolled / heroHeight) * 0.8;
        const translateY = scrolled * 0.3;

        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translateY(${translateY}px)`;
    }
}

// ================================
// OPTIMIZED SCROLL HANDLER
// ================================
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNavBackground();
            updateHeroParallax();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

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
            const cardIndex = Array.from(releaseCards).indexOf(entry.target);
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, cardIndex * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

releaseCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// ================================
// ACTIVE NAVIGATION LINK
// ================================
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
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
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.style.color = 'var(--color-gold)';
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });

// ================================
// CONSOLE EASTER EGG
// ================================
console.log('%cPICKFORMULA', 'font-size: 3rem; font-weight: bold; background: linear-gradient(135deg, #ffffff 0%, #D4AF37 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cWhere Data Meets Sound.', 'font-size: 1.2rem; color: #D4AF37; font-weight: bold;');
console.log('%c🎬 Cinematic experience powered by PickFormula', 'font-size: 0.9rem; color: #999;');
console.log('%cInterested in working with us? → pickformula@gmail.com', 'font-size: 0.9rem; color: #D4AF37;');

// ================================
// PERFORMANCE OPTIMIZATION
// ================================
// Preload critical fonts
if ('fonts' in document) {
    Promise.all([
        document.fonts.load('700 1em -apple-system'),
        document.fonts.load('400 1em -apple-system')
    ]).then(() => {
        document.body.classList.add('fonts-loaded');
    }).catch(err => {
        console.log('Font loading failed:', err);
    });
}

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================
// Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let videoRotator;

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
    });
    // Don't auto-rotate videos
    console.log('Reduced motion preference detected - video auto-rotation disabled');
} else {
    // Initialize video rotator only if user hasn't opted for reduced motion
    videoRotator = new VideoRotator();
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
// PAUSE VIDEO ROTATION WHEN TAB NOT VISIBLE
// ================================
document.addEventListener('visibilitychange', () => {
    if (videoRotator) {
        if (document.hidden) {
            videoRotator.pause();
        } else {
            videoRotator.resume();
        }
    }
});

// ================================
// KEYBOARD NAVIGATION FOR VIDEO CAROUSEL
// ================================
document.addEventListener('keydown', (e) => {
    if (!videoRotator) return;

    // Left arrow - previous video
    if (e.key === 'ArrowLeft') {
        const prevIndex = videoRotator.currentIndex === 0
            ? videoRotator.videos.length - 1
            : videoRotator.currentIndex - 1;
        videoRotator.switchToVideo(prevIndex);
        videoRotator.resetRotationTimer();
    }

    // Right arrow - next video
    if (e.key === 'ArrowRight') {
        videoRotator.nextVideo();
        videoRotator.resetRotationTimer();
    }
});

// ================================
// SMOOTH REVEAL ON PAGE LOAD
// ================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial parallax calculation
    updateHeroParallax();
    updateNavBackground();

    // Track page view
    if (typeof AnalyticsTracker !== 'undefined') {
        AnalyticsTracker.trackPageView('Home Page');
    }

    console.log('✓ PickFormula website loaded successfully');
});

// ================================
// INITIALIZE ON DOM READY
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for any CSS transitions
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Track hero button clicks
    document.querySelectorAll('.hero-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const href = this.getAttribute('href');
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackExternalLink(buttonText, href);
            }
        });
    });

    // Track release card clicks
    document.querySelectorAll('.release-card').forEach(card => {
        card.addEventListener('click', function() {
            const releaseName = this.querySelector('.release-title')?.textContent || 'Unknown Release';
            const href = this.getAttribute('href');
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackReleaseClick(releaseName);
                AnalyticsTracker.trackExternalLink(`Release: ${releaseName}`, href);
            }
        });
    });

    // Track contact email click
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('click', function() {
            const contactType = this.querySelector('.contact-label')?.textContent || 'Contact';
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackButtonClick(`contact_${contactType.toLowerCase()}`, 'contact');
            }
        });
    });

    // Track "Work" navigation link
    document.querySelectorAll('.nav-links a[href="work.html"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackNavigation('work_page');
            }
        });
    });

    console.log('✓ DOM ready - All systems initialized');
});

// ================================
// EXPORT FOR DEBUGGING (DEV ONLY)
// ================================
if (typeof window !== 'undefined') {
    window.PickFormula = {
        videoRotator,
        version: '1.0.0',
        debug: () => {
            console.log('Current video index:', videoRotator?.currentIndex);
            console.log('Total videos:', videoRotator?.videos.length);
            console.log('Rotation active:', !!videoRotator?.rotationInterval);
        }
    };
}
