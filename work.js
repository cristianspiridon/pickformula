/**
 * PickFormula Work Page
 * Sync licensing and custom composition interactions
 */

// ================================
// SMOOTH SCROLL FOR NAVIGATION
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#') {
            e.preventDefault();
            // Track navigation to top
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackNavigation('top');
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
// INTERSECTION OBSERVER FOR CATALOG ITEMS
// ================================
const catalogObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const itemIndex = entry.target.getAttribute('data-index');
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, itemIndex * 100);
            catalogObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all catalog items
document.querySelectorAll('.catalog-item').forEach(item => {
    catalogObserver.observe(item);
});

// ================================
// MODAL FUNCTIONALITY
// ================================
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Track modal open
    if (typeof AnalyticsTracker !== 'undefined') {
        AnalyticsTracker.trackModalOpen('custom_track_request');
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) {
        closeContactModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});

// ================================
// FORM HANDLING
// ================================
function handleFormSubmit(formId, mailto) {
    const form = document.getElementById(formId);

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            let emailBody = '';
            let subject = 'PickFormula - Work Inquiry';

            // Build email body
            for (let [key, value] of formData.entries()) {
                if (key === 'project-type') {
                    emailBody += `Project Type: ${value}\n`;
                    subject = `PickFormula - ${value} Project Inquiry`;
                } else {
                    emailBody += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
                }
            }

            // Create mailto link
            const mailtoLink = `mailto:${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            // Open email client
            window.location.href = mailtoLink;

            // Reset form
            this.reset();

            // Show confirmation
            alert('Opening your email client... Please send the pre-filled email to complete your inquiry.');
        });
    }
}

// Handle main contact form
handleFormSubmit('contactForm', 'pickformula@gmail.com');

// Handle modal form
const modalForm = document.getElementById('modalForm');
if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Track form submission
        if (typeof AnalyticsTracker !== 'undefined') {
            AnalyticsTracker.trackFormSubmission('custom_track_request_modal');
        }

        // Get form data
        const formInputs = this.querySelectorAll('input, select, textarea');
        let emailBody = '';
        let subject = 'PickFormula - Custom Track Request';

        formInputs.forEach(input => {
            if (input.value) {
                const label = input.placeholder || input.name || 'Field';
                emailBody += `${label}: ${input.value}\n\n`;
            }
        });

        // Create mailto link
        const mailtoLink = `mailto:pickformula@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        // Open email client
        window.location.href = mailtoLink;

        // Close modal
        closeContactModal();

        // Reset form
        this.reset();

        // Show confirmation
        setTimeout(() => {
            alert('Opening your email client... Please send the pre-filled email to complete your request.');
        }, 300);
    });
}

// ================================
// NAVIGATION ACTIVE STATE
// ================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || (href.includes('work.html') && current === '')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });

// ================================
// CONSOLE EASTER EGG
// ================================
console.log('%cPICKFORMULA | WORK', 'font-size: 2.5rem; font-weight: bold; background: linear-gradient(135deg, #ffffff 0%, #D4AF37 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cSync Licensing & Custom Compositions', 'font-size: 1rem; color: #D4AF37; font-weight: bold;');
console.log('%c🎬 We create. We compose. We collaborate.', 'font-size: 0.9rem; color: #999;');
console.log('%cFor inquiries → pickformula@gmail.com', 'font-size: 0.9rem; color: #D4AF37;');

// ================================
// PERFORMANCE OPTIMIZATION
// ================================
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
// ACCESSIBILITY
// ================================
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
// INITIALIZE ON LOAD
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Work page loaded successfully');

    // Initial active nav state
    updateActiveNavLink();

    // Track catalog item clicks
    document.querySelectorAll('.catalog-item').forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('.catalog-title')?.textContent || 'Unknown Item';
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackCatalogView(itemName);
            }
        });

        // Track play button clicks within catalog items
        const playBtn = item.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const itemName = item.querySelector('.catalog-title')?.textContent || 'Unknown Item';
                if (typeof AnalyticsTracker !== 'undefined') {
                    AnalyticsTracker.trackButtonClick(`play_${itemName}`, 'catalog');
                }
            });
        }

        // Track link button clicks (Spotify, YouTube)
        item.querySelectorAll('.link-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const itemName = item.querySelector('.catalog-title')?.textContent || 'Unknown Item';
                const platform = this.textContent.trim();
                const href = this.getAttribute('href');
                if (typeof AnalyticsTracker !== 'undefined') {
                    AnalyticsTracker.trackExternalLink(`${platform} - ${itemName}`, href);
                }
            });
        });
    });

    // Track hero CTA button
    document.querySelectorAll('.hero-cta').forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackButtonClick(buttonText, 'hero_cta');
            }
        });
    });

    // Track collaboration buttons
    document.querySelectorAll('.collab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackButtonClick(buttonText, 'collaboration');
            }
        });
    });

    // Track contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackFormSubmission('work_contact_form');
            }
        });
    }

    // Track home navigation link
    document.querySelectorAll('.nav-links a[href="index.html"], .logo').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof AnalyticsTracker !== 'undefined') {
                AnalyticsTracker.trackNavigation('home_page');
            }
        });
    });
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Track page view
    if (typeof AnalyticsTracker !== 'undefined') {
        AnalyticsTracker.trackPageView('Work Page');
    }

    console.log('✓ All assets loaded');
});
