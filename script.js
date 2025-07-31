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

// Language System
const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.events': 'Events',
        'nav.schedule': 'Schedule',
        'nav.gallery': 'Gallery',
        'nav.registration': 'Registration',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.title': 'Durga Puja 2K25',
        'hero.subtitle': 'Experience the divine celebration of Bengali culture in Barcelona. Join our community in preserving traditions and celebrating our rich heritage.',
        'hero.feature.rituals': 'Traditional Puja Rituals',
        'hero.feature.performances': 'Cultural Performances',
        'hero.feature.cuisine': 'Authentic Bengali Cuisine',
        'hero.feature.community': 'Community Bonding',
        'hero.register': 'Register Now',
        'hero.countdown.title': 'Countdown to Durga Puja',
        'hero.countdown.days': 'Days',
        'hero.countdown.hours': 'Hours',
        'hero.countdown.minutes': 'Minutes',
        'hero.countdown.seconds': 'Seconds',
        'hero.countdown.message': 'Durga Puja 2K25 has begun!',
        
        // Quick Info
        'quick.event.date': 'Event Date',
        'quick.event.date.value': 'October 15-22, 2025',
        
        // Venue Section
        'venue.title': 'Find Us',
        'venue.subtitle': 'Visit us at these convenient Barcelona locations',
        'venue.main.title': 'Valid World Hall (Main Pujo Venue)',
        'venue.main.address': 'Carrer de Buenaventura Muñoz 6, Barcelona',
        'venue.main.metro': 'Metro: Arc de Triomf (L1)',
        'venue.main.directions': 'Get Directions',
        'venue.community.title': 'Federación de Entidades Calàbria (Community Programs)',
        'venue.community.address': 'Carrer Calàbria 66, Barcelona',
        'venue.community.metro': 'Metro: Rocafort (L1)',
        'venue.community.directions': 'Get Directions',
        
        // Footer
        'footer.description': 'Preserving and promoting Bengali culture in Barcelona through community events and traditional celebrations.',
        'footer.copyright': '© 2025 Bengali Cultural Association Barcelona. All rights reserved.',
        
        // About Page
        'about.title': 'Bengali Cultural Association (BCA) - Barcelona',
        'about.subtitle': 'Bringing the Indian Bengali community together in Spain since 2021',
        'about.us.title': 'About Us',
        'about.us.content': 'The Bengali Cultural Association of India in Spain, a non-profit organisation founded in 2021, is passionately committed to enriching the lives of our vibrant subcontinent community. Our mission is to foster unity and celebrate all the Bengali cultural events together.',
        'about.history.title': 'Our History',
        'about.history.quote1': 'Maa Durga aschhen, Kumartuli theke',
        'about.history.content1': 'It all began with a spark — a few friends (Sanjay, Anindya, Siddharth and Shreyashree), a bold idea, and just 11 days to bring Maa Durga to Barcelona. In 2021, the Bengali Cultural Association (BCA) was born, driven by the belief:',
        'about.history.quote2': 'Maa Durga nijei nijer pujo koraben. Shob hoye jaabe.',
        'about.history.content2': 'By 2024, that dream came alive. With unity, love, and unwavering dedication, we brought an Ek-Chala fibreglass idol from Kumartuli — Kolkata\'s sacred hub of Durga artisans — to Spain.',
        'about.history.content3': 'That year also marked BCA\'s official recognition as a non-profit organisation in Spain, becoming a cultural beacon for the Bengali diaspora.',
        'about.history.content4': 'Now, as we pass the torch to a new generation of leaders, we continue with the same faith:',
        'about.history.quote3': 'Where there is devotion, everything is possible. Maa will guide the way.',
        'about.team.title': 'Our Team',
        'about.team.subtitle': 'Meet the dedicated people who make BCA Barcelona possible',
        'about.team.founding': 'Founding Members:',
        'about.team.working': 'Working Committee',
        'about.idol.title': 'Pratima 2024',
        'about.idol.subtitle': 'Arrived from Kumartuli, Kolkata',
        'about.idol.blessed': 'Sacred and Blessed',
        
        // Events Page
        'events.title': 'Festival Events',
        'events.subtitle': 'Join us for a week of cultural celebration and spiritual awakening',
        'events.mahalaya.title': 'Mahalaya',
        'events.mahalaya.time': '6:00 AM - 8:00 AM',
        'events.mahalaya.description': 'Traditional invocation of Goddess Durga with devotional songs and prayers.',
        'events.mahalaya.button': 'Learn More',
        'events.saptami.title': 'Saptami Puja',
        'events.saptami.time': '8:00 AM - 12:00 PM',
        'events.saptami.description': 'The main day of Durga Puja with elaborate rituals and community feast.',
        'events.saptami.button': 'Register Now',
        'events.featured': 'Main Event',
        
        // Schedule Page
        'schedule.title': 'Event Schedule',
        'schedule.subtitle': 'Complete timeline of Durga Puja 2K25 celebrations',
        
        // Gallery Page
        'gallery.title': 'Photo Gallery',
        'gallery.subtitle': 'Relive the moments from our previous celebrations',
        
        // Registration Page
        'registration.title': 'Event Registration',
        'registration.subtitle': 'Secure your spot for Durga Puja 2K25',
        
        // Contact Page
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Get in touch with the Bengali Cultural Association',
        
        // Form Labels
        'form.name': 'Full Name',
        'form.email': 'Email Address',
        'form.phone': 'Phone Number',
        'form.message': 'Message',
        'form.submit': 'Submit',
        'form.register': 'Register Now',
        'form.send': 'Send Message',
        'form.subscribe': 'Subscribe',
        
        // Notifications
        'notification.registration.success': 'Registration submitted successfully! We will contact you soon.',
        'notification.contact.success': 'Message sent successfully! We will get back to you soon.',
        'notification.newsletter.success': 'Successfully subscribed to our newsletter!',
        'notification.error': 'Please fill in all required fields.',
        
        // Loading
        'loading.text': 'Loading Durga Puja 2K25...',
        
        // Back to top
        'back.to.top': 'Back to top'
    },
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.about': 'Acerca de',
        'nav.events': 'Eventos',
        'nav.schedule': 'Programa',
        'nav.gallery': 'Galería',
        'nav.registration': 'Registro',
        'nav.contact': 'Contacto',
        
        // Hero Section
        'hero.title': 'Durga Puja 2K25',
        'hero.subtitle': 'Experimenta la celebración divina de la cultura bengalí en Barcelona. Únete a nuestra comunidad para preservar tradiciones y celebrar nuestro rico patrimonio.',
        'hero.feature.rituals': 'Rituales Tradicionales de Puja',
        'hero.feature.performances': 'Actuaciones Culturales',
        'hero.feature.cuisine': 'Cocina Bengalí Auténtica',
        'hero.feature.community': 'Unión Comunitaria',
        'hero.register': 'Registrarse Ahora',
        'hero.countdown.title': 'Cuenta Regresiva para Durga Puja',
        'hero.countdown.days': 'Días',
        'hero.countdown.hours': 'Horas',
        'hero.countdown.minutes': 'Minutos',
        'hero.countdown.seconds': 'Segundos',
        'hero.countdown.message': '¡Durga Puja 2K25 ha comenzado!',
        
        // Quick Info
        'quick.event.date': 'Fecha del Evento',
        'quick.event.date.value': '15-22 de Octubre, 2025',
        
        // Venue Section
        'venue.title': 'Encuéntranos',
        'venue.subtitle': 'Visítanos en estas convenientes ubicaciones de Barcelona',
        'venue.main.title': 'Valid World Hall (Sede Principal de Pujo)',
        'venue.main.address': 'Carrer de Buenaventura Muñoz 6, Barcelona',
        'venue.main.metro': 'Metro: Arc de Triomf (L1)',
        'venue.main.directions': 'Obtener Direcciones',
        'venue.community.title': 'Federación de Entidades Calàbria (Programas Comunitarios)',
        'venue.community.address': 'Carrer Calàbria 66, Barcelona',
        'venue.community.metro': 'Metro: Rocafort (L1)',
        'venue.community.directions': 'Obtener Direcciones',
        
        // Footer
        'footer.description': 'Preservando y promoviendo la cultura bengalí en Barcelona a través de eventos comunitarios y celebraciones tradicionales.',
        'footer.copyright': '© 2025 Asociación Cultural Bengalí Barcelona. Todos los derechos reservados.',
        
        // About Page
        'about.title': 'Asociación Cultural Bengalí (BCA) - Barcelona',
        'about.subtitle': 'Uniendo a la comunidad bengalí india en España desde 2021',
        'about.us.title': 'Acerca de Nosotros',
        'about.us.content': 'La Asociación Cultural Bengalí de la India en España, una organización sin fines de lucro fundada en 2021, está apasionadamente comprometida a enriquecer las vidas de nuestra vibrante comunidad del subcontinente. Nuestra misión es fomentar la unidad y celebrar juntos todos los eventos culturales bengalíes.',
        'about.history.title': 'Nuestra Historia',
        'about.history.quote1': 'Maa Durga aschhen, Kumartuli theke',
        'about.history.content1': 'Todo comenzó con una chispa — unos pocos amigos (Sanjay, Anindya, Siddharth y Shreyashree), una idea audaz, y solo 11 días para traer a Maa Durga a Barcelona. En 2021, nació la Asociación Cultural Bengalí (BCA), impulsada por la creencia:',
        'about.history.quote2': 'Maa Durga nijei nijer pujo koraben. Shob hoye jaabe.',
        'about.history.content2': 'Para 2024, ese sueño cobró vida. Con unidad, amor y dedicación inquebrantable, trajimos un ídolo Ek-Chala de fibra de vidrio desde Kumartuli — el sagrado centro de artesanos de Durga en Kolkata — a España.',
        'about.history.content3': 'Ese año también marcó el reconocimiento oficial de BCA como organización sin fines de lucro en España, convirtiéndose en un faro cultural para la diáspora bengalí.',
        'about.history.content4': 'Ahora, mientras pasamos la antorcha a una nueva generación de líderes, continuamos con la misma fe:',
        'about.history.quote3': 'Donde hay devoción, todo es posible. Maa guiará el camino.',
        'about.team.title': 'Nuestro Equipo',
        'about.team.subtitle': 'Conoce a las personas dedicadas que hacen posible BCA Barcelona',
        'about.team.founding': 'Miembros Fundadores:',
        'about.team.working': 'Comité de Trabajo',
        'about.idol.title': 'Pratima 2024',
        'about.idol.subtitle': 'Llegó desde Kumartuli, Kolkata',
        'about.idol.blessed': 'Sagrada y Bendecida',
        
        // Events Page
        'events.title': 'Eventos del Festival',
        'events.subtitle': 'Únete a nosotros para una semana de celebración cultural y despertar espiritual',
        'events.mahalaya.title': 'Mahalaya',
        'events.mahalaya.time': '6:00 AM - 8:00 AM',
        'events.mahalaya.description': 'Invocación tradicional de la Diosa Durga con canciones devocionales y oraciones.',
        'events.mahalaya.button': 'Saber Más',
        'events.saptami.title': 'Puja Saptami',
        'events.saptami.time': '8:00 AM - 12:00 PM',
        'events.saptami.description': 'El día principal de Durga Puja con rituales elaborados y festín comunitario.',
        'events.saptami.button': 'Registrarse Ahora',
        'events.featured': 'Evento Principal',
        
        // Schedule Page
        'schedule.title': 'Programa de Eventos',
        'schedule.subtitle': 'Cronología completa de las celebraciones de Durga Puja 2K25',
        
        // Gallery Page
        'gallery.title': 'Galería de Fotos',
        'gallery.subtitle': 'Revive los momentos de nuestras celebraciones anteriores',
        
        // Registration Page
        'registration.title': 'Registro de Eventos',
        'registration.subtitle': 'Asegura tu lugar para Durga Puja 2K25',
        
        // Contact Page
        'contact.title': 'Contáctanos',
        'contact.subtitle': 'Ponte en contacto con la Asociación Cultural Bengalí',
        
        // Form Labels
        'form.name': 'Nombre Completo',
        'form.email': 'Dirección de Email',
        'form.phone': 'Número de Teléfono',
        'form.message': 'Mensaje',
        'form.submit': 'Enviar',
        'form.register': 'Registrarse Ahora',
        'form.send': 'Enviar Mensaje',
        'form.subscribe': 'Suscribirse',
        
        // Notifications
        'notification.registration.success': '¡Registro enviado exitosamente! Te contactaremos pronto.',
        'notification.contact.success': '¡Mensaje enviado exitosamente! Te responderemos pronto.',
        'notification.newsletter.success': '¡Suscrito exitosamente a nuestro boletín!',
        'notification.error': 'Por favor completa todos los campos requeridos.',
        
        // Loading
        'loading.text': 'Cargando Durga Puja 2K25...',
        
        // Back to top
        'back.to.top': 'Volver arriba'
    }
};

// Current language
let currentLanguage = localStorage.getItem('language') || 'en';

// Language switcher function
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateLanguageUI();
    translatePage();
}

// Update language UI
function updateLanguageUI() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        }
    });
}

// Translate page content
function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.dataset.translate;
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Update meta tags
    updateMetaTags();
}

// Update meta tags for SEO
function updateMetaTags() {
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (currentLanguage === 'es') {
        if (title) title.textContent = 'Durga Puja 2K25 Barcelona - Asociación Cultural Bengalí';
        if (description) description.content = 'Únete a nosotros para la gran celebración de Durga Puja 2K25 en Barcelona. Experimenta la rica cultura bengalí, rituales tradicionales y festividades comunitarias.';
        if (ogTitle) ogTitle.content = 'Durga Puja 2K25 Barcelona - Asociación Cultural Bengalí';
        if (ogDescription) ogDescription.content = 'Experimenta la celebración divina de la cultura bengalí en el corazón de Barcelona';
    } else {
        if (title) title.textContent = 'Durga Puja 2K25 Barcelona - Bengali Cultural Association';
        if (description) description.content = 'Join us for the grand celebration of Durga Puja 2K25 in Barcelona. Experience the rich Bengali culture, traditional rituals, and community festivities.';
        if (ogTitle) ogTitle.content = 'Durga Puja 2K25 Barcelona - Bengali Cultural Association';
        if (ogDescription) ogDescription.content = 'Experience the divine celebration of Bengali culture in the heart of Barcelona';
    }
}

// Initialize language system
function initLanguageSystem() {
    // Create language switcher if it doesn't exist
    if (!document.querySelector('.language-switcher')) {
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            const languageSwitcher = document.createElement('div');
            languageSwitcher.className = 'language-switcher';
            languageSwitcher.innerHTML = `
                <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">EN</button>
                <button class="lang-btn ${currentLanguage === 'es' ? 'active' : ''}" data-lang="es">ES</button>
            `;
            
            // Insert before nav-toggle
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle) {
                navContainer.insertBefore(languageSwitcher, navToggle);
            }
            
            // Add event listeners
            const langButtons = languageSwitcher.querySelectorAll('.lang-btn');
            langButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    switchLanguage(btn.dataset.lang);
                });
            });
        }
    }
    
    // Initial translation
    translatePage();
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
        const message = translations[currentLanguage] ? translations[currentLanguage]['hero.countdown.message'] : 'Durga Puja 2K25 has begun!';
        countdownElement.innerHTML = `
            <div class="countdown-message">
                <i class="fas fa-star"></i>
                <span>${message}</span>
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
    if (toggle) {
        toggle.addEventListener('click', toggleNavMenu);
    }
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
    // Initialize language system first
    initLanguageSystem();
    
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