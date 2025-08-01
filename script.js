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

// Update last modified time
function updateLastModified() {
    const lastUpdatedElement = document.querySelector('.last-updated small');
    if (lastUpdatedElement) {
        const lastModified = new Date(document.lastModified);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZoneName: 'short'
        };
        const formattedDate = lastModified.toLocaleString('en-US', options);
        lastUpdatedElement.textContent = `Last updated: ${formattedDate}`;
    }
}

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const targetDate = new Date('2025-10-15T08:00:00+02:00'); // Using ISO 8601 format with timezone offset
    const timeLeft = targetDate.getTime() - now.getTime();
    
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (timeLeft <= 0) {
        countdownElement.innerHTML = `
            <div class="countdown-message">
                <i class="fas fa-star"></i>
                <span>Durga Puja 2K25 has begun!</span>
                <i class="fas fa-star"></i>
            </div>
        `;
        if (window.countdownInterval) {
            clearInterval(window.countdownInterval);
            window.countdownInterval = null;
        }
        return;
    }

    // Update countdown display
    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    // Update numbers
    Object.entries(elements).forEach(([unit, element]) => {
        if (element) {
            const value = eval(unit);
            element.textContent = String(value).padStart(2, '0');
        }
    });

    // Update labels
    const labels = {
        days: document.querySelector('.days-label'),
        hours: document.querySelector('.hours-label'),
        minutes: document.querySelector('.minutes-label'),
        seconds: document.querySelector('.seconds-label')
    };

    // Update labels
    Object.entries(labels).forEach(([unit, label]) => {
        if (label) {
            const value = eval(unit);
            label.textContent = value === 1 ? unit.slice(0, -1) : unit;
        }
    });
}

// Initialize countdown timer with proper interval cleanup
function initCountdown() {
    // Clear any existing interval
    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
        window.countdownInterval = null;
    }

    // Initial update
    updateCountdown();
    
    // Set new interval
    window.countdownInterval = setInterval(updateCountdown, 1000);

    // Cleanup on page unload
    window.addEventListener('unload', () => {
        if (window.countdownInterval) {
            clearInterval(window.countdownInterval);
            window.countdownInterval = null;
        }
    });
}

// Ensure countdown is initialized when DOM is loaded
if (document.readyState === 'loading') {
    console.log('DOM still loading, adding DOMContentLoaded listener');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing countdown');
        initCountdown();
    });
} else {
    console.log('DOM already loaded, initializing countdown immediately');
    initCountdown();
}

// Navigation Functions
function toggleNavMenu() {
    const menu = document.getElementById('nav-menu');
    const toggle = document.getElementById('nav-toggle');
    if (menu && toggle) {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

function closeNavMenu() {
    const menu = document.getElementById('nav-menu');
    const toggle = document.getElementById('nav-toggle');
    if (menu && toggle) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
    }
}

// Initialize Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (toggle) {
        toggle.addEventListener('click', toggleNavMenu);
    }
    
    // Close menu when clicking on nav links (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeNavMenu();
            }
        });
    });
    
    // Close menu when clicking outside (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !toggle.contains(e.target)) {
                closeNavMenu();
            }
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeNavMenu();
        }
    });
    
    // Initialize last modified time
    updateLastModified();
});

let isScrolling;
function updateActiveNavLink() {
    // Skip on mobile devices
    if (window.innerWidth <= 768) return;

    // Debounce scroll updates
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
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
    }, 100);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 60;
        const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Optimized scroll event handling
function handleScroll() {
    // Handle navbar scroll effect
    if (window.scrollY > 100) {
        if (navbar) navbar.classList.add('scrolled');
        if (backToTopBtn) backToTopBtn.classList.add('show');
    } else {
        if (navbar) navbar.classList.remove('scrolled');
        if (backToTopBtn) backToTopBtn.classList.remove('show');
    }

    // Update active nav link
    if (window.innerWidth > 768) {
        const scrollPos = window.scrollY;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
}

// Use requestAnimationFrame for smooth scroll handling
let ticking = false;
function initScrollHandling() {
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Navbar Scroll Effect with debouncing for better performance
let scrollTimeout;
function handleNavbarScroll() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        if (window.scrollY > 100) {
            if (navbar) navbar.classList.add('scrolled');
            if (backToTopBtn) backToTopBtn.classList.add('show');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
            if (backToTopBtn) backToTopBtn.classList.remove('show');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Only handle internal links (those starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    closeNavMenu();
                    
                    // Calculate position with better precision
                    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 60;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    // Use native smooth scroll with fallback
                    try {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    } catch (error) {
                        // Fallback for older browsers
                        window.scrollTo(0, targetPosition);
                    }
                }
            }
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
    
    // Validate form data
    if (!data.contactName || !data.contactEmail || !data.contactSubject || !data.contactMessage) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Prepare data for Google Sheets
    const sheetData = {
        timestamp: new Date().toISOString(),
        name: data.contactName,
        email: data.contactEmail,
        subject: data.contactSubject,
        message: data.contactMessage
    };

    // Send to Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx6JnmiTu-QDht9yFoYxXuSyn--KTPBJjb4eCw8xOv8z39F1CECJ7b2YaBlVUvX6nJlAA/exec';
    
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData)
    })
    .then(response => {
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        e.target.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to send message. Please try again or contact us directly.', 'error');
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
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
    
    // Choose appropriate icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles with color based on type
    let bgColor = '#2196F3'; // default blue
    if (type === 'success') bgColor = '#4CAF50'; // green
    if (type === 'error') bgColor = '#f44336'; // red
    if (type === 'warning') bgColor = '#ff9800'; // orange
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
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
    let startTime = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const endTime = Date.now();
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        const timeDiff = endTime - startTime;
        
        // Only handle quick swipes (less than 300ms)
        if (timeDiff < 300) {
            // Swipe up to go to top - only if near bottom of page
            if (Math.abs(diffY) > 50 && Math.abs(diffY) > Math.abs(diffX) && diffY > 0) {
                const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
                if (scrolledToBottom) {
                    scrollToTop();
                }
            }
        }
        
        startX = 0;
        startY = 0;
        startTime = 0;
    }, { passive: true });
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

// Optimized scroll handler with throttling
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            requestAnimationFrame(() => {
                inThrottle = false;
            });
        }
    };
}

// Smooth scroll to top with acceleration
function scrollToTop() {
    const duration = 800;
    const start = window.pageYOffset;
    const startTime = performance.now();
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    function scroll() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
        
        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }
    
    requestAnimationFrame(scroll);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize countdown timer
    initCountdown();
    
    // Initialize scroll handling
    initScrollHandling();
    
    // Initialize other features
    hideLoading();
    if (navToggle) {
        navToggle.addEventListener('click', toggleNavMenu);
    }
    initSmoothScrolling();
    initFormValidation();
    initLightboxKeyboard();
    initScrollAnimations();
    initParallax();
    initTouchGestures();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target)) {
            closeNavMenu();
        }
    });
    
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
});

// Service Worker Registration (for PWA features) - Disabled for now
// Uncomment below if you want to add PWA features in the future
/*
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
*/

// Export functions for global access
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox; 

// Add styles for countdown message
const style = document.createElement('style');
style.textContent += `
    .countdown-message {
        text-align: center;
        color: var(--accent-color, #FF6B35);
        font-size: 1.5rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        animation: pulse 2s infinite;
    }

    .countdown-message i {
        color: gold;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style); 