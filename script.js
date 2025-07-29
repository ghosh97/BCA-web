// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const loading = document.getElementById('loading');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const registrationForm = document.getElementById('registrationForm');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('.newsletter-form');

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const durgaPujaDate = new Date('October 20, 2025 08:00:00').getTime();
    const distance = durgaPujaDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h3>Durga Puja has begun!</h3>';
    }
}

// Navigation Functions
function toggleNavMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeNavMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        closeNavMenu();
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTopBtn.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backToTopBtn.classList.remove('show');
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Form Handling
function handleRegistrationForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showNotification('Registration submitted successfully! We will contact you soon.', 'success');
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleNewsletterForm(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    // Simulate subscription
    setTimeout(() => {
        showNotification('Successfully subscribed to our newsletter!', 'success');
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Lightbox Gallery
function openLightbox(index) {
    const images = [
        'https://via.placeholder.com/800x600/FF6B35/FFFFFF?text=Durga+Puja+2024+1',
        'https://via.placeholder.com/800x600/FF6B35/FFFFFF?text=Durga+Puja+2024+2',
        'https://via.placeholder.com/800x600/FF6B35/FFFFFF?text=Durga+Puja+2024+3',
        'https://via.placeholder.com/800x600/FF6B35/FFFFFF?text=Durga+Puja+2024+4',
        'https://via.placeholder.com/800x600/FF6B35/FFFFFF?text=Durga+Puja+2024+5',
        'https://via.placeholder.com/800x600/FF6B35/FFFFFF?text=Durga+Puja+2024+6'
    ];
    
    const captions = [
        'Traditional Durga Puja celebration in Barcelona',
        'Community gathering during the festival',
        'Cultural performances and music',
        'Traditional Bengali cuisine',
        'Children participating in rituals',
        'Grand finale of the celebration'
    ];
    
    lightboxImg.src = images[index];
    lightboxCaption.textContent = captions[index];
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Intersection Observer for Animations
function initScrollAnimations() {
    // Disable scroll animations on mobile devices
    if (window.innerWidth <= 768) {
        return;
    }
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-item, .event-card, .timeline-item, .gallery-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax Effect
function initParallax() {
    // Disable parallax effect on mobile devices
    if (window.innerWidth <= 768) {
        return;
    }
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background, .floating-card');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('floating-card') ? 0.5 : 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Loading Screen
function hideLoading() {
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff4444';
            input.addEventListener('input', () => {
                input.style.borderColor = '#E1E8ED';
            }, { once: true });
        }
    });
    
    return isValid;
}

// Enhanced Form Handling with Validation
function initFormValidation() {
    [registrationForm, contactForm].forEach(form => {
        if (form) {
            form.addEventListener('submit', (e) => {
                if (!validateForm(form)) {
                    e.preventDefault();
                    showNotification('Please fill in all required fields.', 'error');
                    return;
                }
            });
        }
    });
}

// Keyboard Navigation for Lightbox
function initLightboxKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
}

// Touch Gestures for Mobile
function initTouchGestures() {
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Swipe up to go to top
        if (Math.abs(diffY) > Math.abs(diffX) && diffY > 50) {
            scrollToTop();
        }
        
        startX = 0;
        startY = 0;
    });
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handlers
const debouncedNavbarScroll = debounce(handleNavbarScroll, 10);
const debouncedUpdateActiveNav = debounce(updateActiveNavLink, 10);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    hideLoading();
    
    // Initialize countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Initialize navigation
    navToggle.addEventListener('click', toggleNavMenu);
    initSmoothScrolling();
    
    // Initialize scroll effects
    window.addEventListener('scroll', debouncedNavbarScroll);
    window.addEventListener('scroll', debouncedUpdateActiveNav);
    
    // Initialize forms
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationForm);
    }
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize lightbox
    initLightboxKeyboard();
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize parallax
    initParallax();
    
    // Initialize touch gestures
    initTouchGestures();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            closeNavMenu();
        }
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
            }
            50% {
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 68, 68, 0.6);
            }
        }
        
        .floating-card {
            animation: float 6s ease-in-out infinite, glow 3s ease-in-out infinite;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            font-size: 1rem;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add logo animation on page load
    const logoImg = document.querySelector('.nav-logo .logo-img');
    if (logoImg) {
        logoImg.style.opacity = '0';
        logoImg.style.transform = 'scale(0.8)';
        setTimeout(() => {
            logoImg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            logoImg.style.opacity = '1';
            logoImg.style.transform = 'scale(1)';
        }, 500);
    }
    
    console.log('Durga Puja 2K25 Barcelona website loaded successfully! 🎉');
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox; 