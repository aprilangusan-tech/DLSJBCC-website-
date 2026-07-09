// ========================
// LOADING SCREEN
// ========================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 2500);
});

// ========================
// DARK MODE TOGGLE
// ========================
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeIcon = darkModeToggle.querySelector('i');

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// ========================
// SMOOTH SCROLL
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================
// NAVBAR STYLING ON SCROLL
// ========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// ========================
// HAMBURGER MENU
// ========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
    });
});

// ========================
// BUTTON ANIMATIONS
// ========================
const buttons = document.querySelectorAll('.cta-button, .learn-btn, .submit-btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    button.addEventListener('click', function() {
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.pointerEvents = 'none';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
`;
document.head.appendChild(style);

// ========================
// CARD HOVER EFFECTS
// ========================
const cards = document.querySelectorAll('.card-hover');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================
// IMAGE ZOOM EFFECTS
// ========================
const images = document.querySelectorAll('.image-zoom');

images.forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(1deg)';
    });

    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ========================
// SCROLL ANIMATIONS
// ========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .card-hover, .program-card, .facility-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================
// FORM SUBMISSION
// ========================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = '#10b981';
            
            // Reset after 2 seconds
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 2000);
            
            console.log('Form Data:', { name, email, message });
        }
    });
}

// ========================
// COUNTER ANIMATION
// ========================
const countElements = document.querySelectorAll('.stat-item h3');
let hasAnimated = false;

const animateCounters = () => {
    if (hasAnimated) return;
    
    countElements.forEach(el => {
        const finalValue = parseInt(el.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                el.textContent = el.textContent.replace(/\d+/, finalValue);
                clearInterval(counter);
            } else {
                el.textContent = Math.floor(currentValue) + (el.textContent.match(/[^\d]/g) || []).join('');
            }
        }, 30);
    });
    
    hasAnimated = true;
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.stats') && statsObserver.observe(document.querySelector('.stats'));

// ========================
// PARALLAX EFFECT
// ========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        shape.style.transform = `translateY(${scrolled * (0.5 + index * 0.1)}px)`;
    });
});

// ========================
// PROGRAM ICON ANIMATION ON HOVER
// ========================
const programIcons = document.querySelectorAll('.program-icon');

programIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'spin 1s linear';
    });

    icon.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Add spin animation
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        from {
            transform: rotateY(0deg) scale(1);
        }
        to {
            transform: rotateY(360deg) scale(1.2);
        }
    }
`;
document.head.appendChild(spinStyle);

// ========================
// KEYBOARD NAVIGATION
// ========================
document.addEventListener('keydown', (e) => {
    // Press Escape to close mobile menu
    if (e.key === 'Escape') {
        navMenu.style.display = 'none';
    }
    
    // Press 'D' to toggle dark mode
    if (e.key.toLowerCase() === 'd' && e.ctrlKey) {
        e.preventDefault();
        darkModeToggle.click();
    }
});

// ========================
// ACCESSIBILITY
// ========================
// Improve focus visibility for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    button:focus,
    a:focus,
    input:focus,
    textarea:focus {
        outline: 3px solid var(--accent-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// ========================
// PERFORMANCE OPTIMIZATION
// ========================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// ========================
// CONSOLE MESSAGE
// ========================
console.log('%c🎓 Welcome to DLSJBC Website', 'font-size: 20px; color: #1e40af; font-weight: bold;');
console.log('%cEnjoy exploring our institution!', 'font-size: 14px; color: #0f766e;');