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
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('.newsletter-form');

// Video Modal Elements
const videoModal = document.getElementById('videoModal');
const videoModalPlayer = document.getElementById('videoModalPlayer');
const videoModalTitle = document.getElementById('videoModalTitle');
const videoModalClose = document.getElementById('videoModalClose');

// Mobile Button Fix - Ensure Register Now button is clickable on mobile
function initMobileButtonFix() {
    const registerButton = document.querySelector('.hero-buttons .btn');
    if (registerButton) {
        
        // Add touch event listener for mobile devices
        registerButton.addEventListener('touchstart', function(e) {
            // Don't prevent default to allow normal navigation
        }, { passive: true });
        
        // Add click event listener as backup
        registerButton.addEventListener('click', function(e) {
            // Don't prevent default to allow normal navigation
        });
        
        // Add mousedown event for better mobile support
        registerButton.addEventListener('mousedown', function(e) {
        });
        
        // Ensure the button is properly styled for mobile
        registerButton.style.position = 'relative';
        registerButton.style.zIndex = '20';
        registerButton.style.pointerEvents = 'auto';
        registerButton.style.touchAction = 'manipulation';
        registerButton.style.webkitTapHighlightColor = 'rgba(255, 255, 255, 0.3)';
        registerButton.style.minHeight = '44px';
        registerButton.style.minWidth = '44px';
        
        // Add focus and active states
        registerButton.addEventListener('focus', function() {
            this.style.outline = '2px solid #fff';
            this.style.outlineOffset = '2px';
        });
        
        registerButton.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        // Ensure the button is accessible
        registerButton.setAttribute('role', 'button');
        registerButton.setAttribute('tabindex', '0');
    }
}

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
    const targetDate = new Date('2025-09-28T08:00:00+02:00'); // Durga Puja 2025 - September 28th
    const timeLeft = targetDate.getTime() - now.getTime();

    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (timeLeft <= 0) {
        const countdownElement = document.getElementById('countdown');
        
        const countdownMessage = `
            <div class="countdown-message">
                <i class="fas fa-star"></i>
                <span>Durga Puja 2025 has begun!</span>
                <i class="fas fa-star"></i>
            </div>
        `;
        
        if (countdownElement) countdownElement.innerHTML = countdownMessage;
        
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

    // Check if we're on a multi-page site (not just index.html with sections)
    const currentPage = window.location.pathname;
    const isMultiPageSite = currentPage !== '/' && currentPage !== '/index.html' && !currentPage.endsWith('index.html');
    
    // If we're on a multi-page site, don't update active links on scroll
    if (isMultiPageSite) {
        return;
    }

    // Debounce scroll updates
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.substring(1) === currentSection) {
                link.classList.add('active');
            }
        });

        // If no section is active, check if we're at the top (home)
        if (!currentSection && scrollPos < 200) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === '#home' || href === 'index.html' || href === '/') {
                    link.classList.add('active');
                }
            });
        }
    }, 50);
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

    // Only update active nav link on single-page sites (index.html with sections)
    const currentPage = window.location.pathname;
    const isSinglePageSite = currentPage === '/' || currentPage === '/index.html' || currentPage.endsWith('index.html');
    
    if (isSinglePageSite) {
        updateActiveNavLink();
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
    
    // Initial call to set active nav link on page load
    setTimeout(() => {
        updateActiveNavLink();
    }, 100);
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



    // Production mode - send to Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxNnWhmvY5RLAvr29gjdPaFHmNCGnaJ8Qt_Pr7UkPjVOqVmQdX3_reC9qn-GEup7QHwiQ/exec'; // ⚠️ REPLACE WITH YOUR NEW DEPLOYED URL!

    
    
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
        console.error('Error sending to Google Sheets:', error);
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
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-item, .event-card, .timeline-item, .gallery-item, .contact-item, .animate-on-scroll');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add staggered animation for event cards
    const eventCards = document.querySelectorAll('.event-card.animate-on-scroll');
    eventCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
    
    
    
    // Mobile fallback: Trigger animations on scroll for mobile devices
    if (window.innerWidth <= 768) {
        const mobileAnimateElements = document.querySelectorAll('.animate-on-scroll');
        mobileAnimateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });
        
        // Simple scroll listener for mobile
        let mobileObserver;
        try {
            mobileObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animate');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
            
            mobileAnimateElements.forEach(el => mobileObserver.observe(el));
        } catch (e) {
            console.log('Intersection Observer not supported, using scroll fallback');
            // Fallback for older browsers
            window.addEventListener('scroll', () => {
                mobileAnimateElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                        el.classList.add('animate');
                    }
                });
            });
        }
    }
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
    if (loading) {
        setTimeout(() => {
            if (loading && loading.classList) {
                loading.classList.add('hidden');
            }
            setTimeout(() => {
                if (loading && loading.style) {
                    loading.style.display = 'none';
                }
            }, 500);
        }, 1000);
    }
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
    // Handle contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Handle newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
}

// Keyboard Navigation for Lightbox
function initLightboxKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'block') {
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

// Function to set initial active navigation link based on current page
function setInitialActiveNavLink() {
    const currentPage = window.location.pathname;
    const currentHash = window.location.hash;
    
    // Remove all active classes first
    navLinks.forEach(link => link.classList.remove('active'));
    
    // If there's a hash in the URL, set that as active
    if (currentHash) {
        const activeLink = document.querySelector(`.nav-link[href="${currentHash}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            return;
        }
    }
    
    // Otherwise, set active based on current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Handle different page scenarios for home page
        if (href === currentPage || 
            (currentPage === '/' && (href === 'index.html' || href === '#home')) ||
            (currentPage === '/index.html' && (href === 'index.html' || href === '#home')) ||
            (currentPage.endsWith('index.html') && (href === 'index.html' || href === '#home')) ||
            (currentPage.endsWith('/') && (href === 'index.html' || href === '#home'))) {
            link.classList.add('active');
            return; // Exit early if we found the home link
        }
        
        // Handle specific page matches - use exact matching for better reliability
        if (currentPage.includes('about.html') && href === 'about.html') {
            link.classList.add('active');
            return;
        }
        if (currentPage.includes('events.html') && href === 'events.html') {
            link.classList.add('active');
            return;
        }
        if (currentPage.includes('schedule.html') && href === 'schedule.html') {
            link.classList.add('active');
            return;
        }
        if (currentPage.includes('gallery.html') && href === 'gallery.html') {
            link.classList.add('active');
            return;
        }
        if (currentPage.includes('registration.html') && href === 'registration.html') {
            link.classList.add('active');
            return;
        }
        if (currentPage.includes('contact.html') && href === 'contact.html') {
            link.classList.add('active');
            return;
        }
    });
    
    
    console.log('Current page:', currentPage);
    console.log('Active link set for:', currentPage);
    
    // Verify active link was set
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        console.log('Active link found:', activeLink.getAttribute('href'));
    } else {
        console.log('No active link found - this might be an issue');
    }
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
    initVideoModal();
    initMobileButtonFix(); // Initialize mobile button fix
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target)) {
            closeNavMenu();
        }
    });
    
    // Set initial active navigation link based on current page
    setInitialActiveNavLink();
    
    // Ensure active state persists by setting it again after a short delay
    setTimeout(() => {
        setInitialActiveNavLink();
    }, 100);
    
    // Add click handlers to nav links to maintain active state
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
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

// Video Modal Functions
function openVideoModal(videoSrc, title) {
    console.log('Opening video modal:', videoSrc, title);
    if (videoModal && videoModalPlayer && videoModalTitle) {
        // Create a unique session ID for this modal open
        const sessionId = Date.now() + Math.random();
        currentVideoModalSession = sessionId;
        
        // Store current scroll position
        const scrollY = window.scrollY;
        videoModal.setAttribute('data-scroll-position', scrollY);
        videoModal.setAttribute('data-session-id', sessionId);
        
        videoModalTitle.textContent = title;
        
        // iOS Safari Video Fixes
        videoModalPlayer.setAttribute('webkit-playsinline', 'true');
        videoModalPlayer.setAttribute('playsinline', 'true');
        videoModalPlayer.setAttribute('x-webkit-airplay', 'allow');
        videoModalPlayer.setAttribute('controls', 'true');
        videoModalPlayer.setAttribute('preload', 'metadata');
        
        // Show modal first, then set video source to prevent race conditions
        videoModal.style.display = 'flex';
        requestAnimationFrame(() => {
            // Check if this session is still current
            if (currentVideoModalSession !== sessionId) {
                console.log('Modal session changed, aborting video load');
                return;
            }
            
            videoModal.classList.add('active');
            
            // Validate video source before setting
            if (!videoSrc || videoSrc === '') {
                console.error('Invalid video source:', videoSrc);
                showNotification('Video source not found. Please try again.', 'error');
                return;
            }
            
            console.log('Setting video source:', videoSrc);
            
            // Set video source after modal is visible
            videoModalPlayer.src = videoSrc;
            
            // Load the video
            videoModalPlayer.load();
        });
        
        // Prevent body scroll while maintaining position
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflowY = 'scroll'; // Prevent layout shift
        
        // Handle video metadata loaded to set proper dimensions
        const handleMetadataLoaded = function() {
            // Check if this session is still current
            if (currentVideoModalSession !== sessionId) {
                console.log('Session changed during metadata load, aborting');
                return;
            }
            
            console.log('Video metadata loaded successfully');
            const videoWidth = this.videoWidth;
            const videoHeight = this.videoHeight;
            const aspectRatio = videoWidth / videoHeight;
            
            // Calculate dimensions to fit screen while maintaining aspect ratio
            let width = videoWidth;
            let height = videoHeight;
            
            const maxWidth = window.innerWidth * 0.9; // 90% of screen width
            const maxHeight = window.innerHeight * 0.9; // 90% of screen height
            
            if (width > maxWidth) {
                width = maxWidth;
                height = width / aspectRatio;
            }
            
            if (height > maxHeight) {
                height = maxHeight;
                width = height * aspectRatio;
            }
            
            // Apply calculated dimensions
            this.style.width = `${width}px`;
            this.style.height = `${height}px`;

            // Update modal content width to match video
            const modalContent = this.closest('.video-modal-content');
            if (modalContent) {
                modalContent.style.width = `${width}px`;
            }
            
            // Remove the event listener to prevent memory leaks
            this.removeEventListener('loadedmetadata', handleMetadataLoaded);
        };
        
        videoModalPlayer.addEventListener('loadedmetadata', handleMetadataLoaded);
        
        // Add error handling for video loading
        const loadStartHandler = function() {
            console.log('Video loading started');
        };
        
        videoModalPlayer.addEventListener('loadstart', loadStartHandler);
        
        const canPlayHandler = function() {
            console.log('Video can play');
        };
        
        videoModalPlayer.addEventListener('canplay', canPlayHandler);
        
        const errorHandler = function(e) {
            // Check if this session is still current (use currentVideoModalSession directly)
            if (!currentVideoModalSession) {
                console.log('No active session, ignoring error');
                return;
            }
            
            console.error('Video playback error:', e);
            console.error('Video error details:', {
                error: videoModalPlayer.error,
                networkState: videoModalPlayer.networkState,
                readyState: videoModalPlayer.readyState,
                src: videoModalPlayer.src
            });
            
            // Only show error for actual video loading failures, not autoplay restrictions
            if (videoModalPlayer.error && videoModalPlayer.error.code !== 4) { // 4 = MEDIA_ERR_SRC_NOT_SUPPORTED
                const errorMessage = 'Video playback failed. Please check your connection and try again.';
                showNotification(errorMessage, 'error');
                
                // Close modal after error (but give user time to see the message)
                setTimeout(() => {
                    closeVideoModal();
                }, 3000);
            }
        };
        
        videoModalPlayer.addEventListener('error', errorHandler);
        
        // Focus on close button for accessibility
        if (videoModalClose) {
            setTimeout(() => {
                videoModalClose.focus();
            }, 100);
        }
        
        // iOS Video Load and Play Fix - removed duplicate load() call
        
        // Handle video play with iOS compatibility
        const playVideo = () => {
            videoModalPlayer.play().catch(function(error) {
                console.log('Video autoplay failed (normal on iOS):', error);
                // Show play button or instruction for iOS
                const playButton = document.createElement('div');
                playButton.innerHTML = '<i class="fas fa-play"></i> Tap to Play';
                playButton.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    z-index: 10;
                `;
                videoModalPlayer.parentElement.style.position = 'relative';
                videoModalPlayer.parentElement.appendChild(playButton);
                
                const playButtonClickHandler = function() {
                    // Check if this session is still current
                    if (currentVideoModalSession !== sessionId) {
                        console.log('Session changed, removing play button');
                        this.remove();
                        return;
                    }
                    
                    videoModalPlayer.play().catch(function(playError) {
                        console.error('Manual play failed:', playError);
                        // Only show error for actual playback failures, not autoplay restrictions
                        if (playError.name !== 'NotAllowedError') {
                            showNotification('Video playback failed. Please try again.', 'error');
                        }
                    });
                    this.remove();
                };
                
                playButton.addEventListener('click', playButtonClickHandler);
            });
        };
        
        // Try to play immediately
        playVideo();
        
        // Add keyboard event listener for escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeVideoModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Handle window resize
        const handleResize = debounce(() => {
            if (videoModalPlayer.videoWidth && videoModalPlayer.videoHeight) {
                const aspectRatio = videoModalPlayer.videoWidth / videoModalPlayer.videoHeight;
                const maxWidth = window.innerWidth * 0.9;
                const maxHeight = window.innerHeight * 0.9;
                
                let width = videoModalPlayer.videoWidth;
                let height = videoModalPlayer.videoHeight;
                
                if (width > maxWidth) {
                    width = maxWidth;
                    height = width / aspectRatio;
                }
                
                if (height > maxHeight) {
                    height = maxHeight;
                    width = height * aspectRatio;
                }
                
                videoModalPlayer.style.width = `${width}px`;
                videoModalPlayer.style.height = `${height}px`;

                // Update modal content width on resize
                const modalContent = videoModalPlayer.closest('.video-modal-content');
                if (modalContent) {
                    modalContent.style.width = `${width}px`;
                }
            }
        }, 100);
        
        window.addEventListener('resize', handleResize);
        
        console.log('Video modal opened successfully');
    } else {
        console.error('Video modal elements not found:', {
            videoModal: !!videoModal,
            videoModalPlayer: !!videoModalPlayer,
            videoModalTitle: !!videoModalTitle
        });
    }
}

function closeVideoModal() {
    if (videoModal && videoModalPlayer) {
        console.log('Closing video modal...');
        
        // Clear the current session
        currentVideoModalSession = null;
        
        // Start closing animation
        videoModal.classList.remove('active');
        
        // Wait for animation to complete
        setTimeout(() => {
            try {
                // Pause video first
                if (videoModalPlayer.readyState >= 1) {
                    videoModalPlayer.pause();
                }
                
                // Clear video source
                videoModalPlayer.src = '';
                videoModalPlayer.load(); // Force reload to clear any cached data
                
                // Remove any play buttons that might have been added
                const playButtons = videoModal.querySelectorAll('[style*="position: absolute"]');
                playButtons.forEach(btn => {
                    try {
                        btn.remove();
                    } catch (e) {
                        console.log('Error removing play button:', e);
                    }
                });
                
                // Restore body scroll and position
                const scrollY = parseInt(videoModal.getAttribute('data-scroll-position') || '0');
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
                document.body.style.overflowY = '';
                
                // Use requestAnimationFrame for smooth scroll restoration
                requestAnimationFrame(() => {
                    try {
                        window.scrollTo(0, scrollY);
                    } catch (e) {
                        console.log('Error restoring scroll position:', e);
                    }
                });
                
                // Clean up modal
                videoModal.style.display = 'none';
                videoModal.removeAttribute('data-scroll-position');
                videoModal.removeAttribute('data-session-id'); // Clear session ID on close
                
                // Reset video player styles
                videoModalPlayer.style.width = '';
                videoModalPlayer.style.height = '';
                
                console.log('Video modal closed successfully');
                
            } catch (error) {
                console.error('Error during modal close:', error);
                // Fallback: just hide the modal
                videoModal.style.display = 'none';
                videoModal.classList.remove('active');
            }
        }, 300); // Match this with CSS transition duration
    } else {
        console.warn('Video modal elements not found for closing');
    }
}

// Track if video modal has been initialized to prevent duplicate event listeners
let videoModalInitialized = false;
let videoModalEventListeners = [];
let currentVideoModalSession = null; // Track current modal session

function cleanupVideoModal() {
    // Remove any existing event listeners to prevent duplicates
    videoModalEventListeners.forEach(listener => {
        try {
            if (listener.element && listener.event && listener.handler) {
                listener.element.removeEventListener(listener.event, listener.handler);
            }
        } catch (e) {
            console.log('Error removing event listener:', e);
        }
    });
    videoModalEventListeners = [];
    currentVideoModalSession = null;
}

function addVideoModalEventListener(element, event, handler, options = {}) {
    try {
        element.addEventListener(event, handler, options);
        videoModalEventListeners.push({ element, event, handler, options });
    } catch (e) {
        console.error('Error adding event listener:', e);
    }
}

function initVideoModal() {
    // Prevent multiple initializations
    if (videoModalInitialized) {
        console.log('Video modal already initialized, skipping...');
        return;
    }
    
    console.log('Initializing video modal...');
    
    // Clean up any existing event listeners
    cleanupVideoModal();
    
    // Add click event listeners to feature items
    const featureItems = document.querySelectorAll('.feature-item[data-video]');
    console.log('Found feature items with videos:', featureItems.length);
    
    if (featureItems.length === 0) {
        console.warn('No feature items with data-video attribute found!');
        return;
    }
    
    featureItems.forEach((item, index) => {
        const videoSrc = item.getAttribute('data-video');
        const title = item.getAttribute('data-title');
        console.log(`Feature item ${index}:`, videoSrc, title);
        
        // Add click event listener to the entire feature item
        const clickHandler = function(e) {
            console.log('Feature item clicked:', this.getAttribute('data-video'));
            e.preventDefault();
            e.stopPropagation();
            const videoSrc = this.getAttribute('data-video');
            const title = this.getAttribute('data-title');
            openVideoModal(videoSrc, title);
        };
        
        addVideoModalEventListener(item, 'click', clickHandler);
        
        // Add touch event listener for mobile devices
        const touchHandler = function(e) {
            console.log('Feature item touched:', this.getAttribute('data-video'));
            e.preventDefault();
            e.stopPropagation();
            const videoSrc = this.getAttribute('data-video');
            const title = this.getAttribute('data-title');
            openVideoModal(videoSrc, title);
        };
        
        addVideoModalEventListener(item, 'touchstart', touchHandler, { passive: false });
        
        // Add keyboard support for accessibility
        const keyHandler = function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const videoSrc = this.getAttribute('data-video');
                const title = this.getAttribute('data-title');
                openVideoModal(videoSrc, title);
            }
        };
        
        addVideoModalEventListener(item, 'keydown', keyHandler);
        
        // Make feature items focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Play video: ${item.getAttribute('data-title')}`);
    });
    
    // Close modal when clicking close button
    if (videoModalClose) {
        const closeButtonHandler = (e) => {
            try {
                e.preventDefault();
                closeVideoModal();
            } catch (error) {
                console.error('Error in close button handler:', error);
                // Fallback: just hide the modal
                if (videoModal) {
                    videoModal.style.display = 'none';
                    videoModal.classList.remove('active');
                }
            }
        };
        
        addVideoModalEventListener(videoModalClose, 'click', closeButtonHandler);
        addVideoModalEventListener(videoModalClose, 'touchstart', closeButtonHandler, { passive: false });
        
        // Add keyboard support for close button
        const closeKeyHandler = function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeVideoModal();
            }
        };
        
        addVideoModalEventListener(videoModalClose, 'keydown', closeKeyHandler);
    }
    
    // Close modal when clicking outside
    if (videoModal) {
        const outsideClickHandler = (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        };
        
        addVideoModalEventListener(videoModal, 'click', outsideClickHandler);
        
        // Add touch event for mobile
        const outsideTouchHandler = function(e) {
            if (e.target === videoModal) {
                e.preventDefault();
                closeVideoModal();
            }
        };
        
        addVideoModalEventListener(videoModal, 'touchstart', outsideTouchHandler, { passive: false });
    }
    
    // Prevent body scroll when modal is open (mobile fix)
    if (videoModal) {
        const touchMoveHandler = function(e) {
            if (videoModal.classList.contains('active')) {
                e.preventDefault();
            }
        };
        
        addVideoModalEventListener(videoModal, 'touchmove', touchMoveHandler, { passive: false });
        
        // Prevent scroll on body when modal is open
        const wheelHandler = function(e) {
            if (videoModal.classList.contains('active')) {
                e.preventDefault();
            }
        };
        
        addVideoModalEventListener(videoModal, 'wheel', wheelHandler, { passive: false });
    }
    
    // Handle video player events
    if (videoModalPlayer) {
        const endedHandler = function() {
            // Optionally restart video or close modal when video ends
            // closeVideoModal();
        };
        
        addVideoModalEventListener(videoModalPlayer, 'ended', endedHandler);
        
        // Note: Error handling is done in openVideoModal function to access sessionId
    }
    
    // Mark as initialized
    videoModalInitialized = true;
    console.log('Video modal initialization completed successfully');
}

// Clean up video modal on page unload
window.addEventListener('beforeunload', () => {
    if (videoModalInitialized) {
        cleanupVideoModal();
        videoModalInitialized = false;
    }
});

// Export video modal functions
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal; 

// Add styles for countdown message and video modal
const style = document.createElement('style');
style.textContent += `
    /* Video Modal Styles */
    .video-modal {
        position: fixed !important;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 10000;
        display: none;
        justify-content: center;
        align-items: center;
    }

    .video-modal.active {
        display: flex !important;
    }

    .video-modal-content {
        position: relative;
        background: transparent;
        z-index: 10001;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;
    }

    .video-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        width: 100%;
        color: white;
        background: rgb(222 14 14 / 89%);
        border-radius: 4px;
        margin-bottom: 0.25rem;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10002;
    }

    .video-modal-body {
        position: relative;
        width: auto;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .video-modal-body video {
        max-width: 100vw;
        max-height: 100vh;
        width: auto;
        height: auto;
    }

    .video-modal-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        transition: transform 0.3s ease;
    }

    .video-modal-close:hover {
        transform: scale(1.1);
    }
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