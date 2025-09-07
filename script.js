/* =============================== Modern Portfolio JavaScript ================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTypingEffect();
    initializeNavigation();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeContactForm();
    initializeColorSwitcher();
    initializeAnimations();
});

/* =============================== Typing Animation ================================ */
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const typed = new Typed('.typing', {
            strings: ['Information Systems Student', 'Software Developer', 'System Analyst', 'Database Designer', 'IT Professional'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true
        });
    }
}

/* =============================== Navigation ================================ */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle scroll-based navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* =============================== Theme Toggle ================================ */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark');
        
        if (body.classList.contains('dark')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

/* =============================== Mobile Menu ================================ */
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

/* =============================== Scroll Effects ================================ */
function initializeScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarBackground() {
        const isDark = document.body.classList.contains('dark');
        
        if (window.scrollY > 50) {
            if (isDark) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (isDark) {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = '#ffffff';
                navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }
        }
    }
    
    window.addEventListener('scroll', updateNavbarBackground);
    // Update on theme change
    document.body.addEventListener('DOMSubtreeModified', updateNavbarBackground);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.service-card, .portfolio-card, .skill-card, .info-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

/* =============================== Contact Form ================================ */
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

/* =============================== Color Switcher ================================ */
function initializeColorSwitcher() {
    const colorSwitcher = document.getElementById('color-switcher');
    const colorToggle = document.querySelector('.color-switcher-toggle');
    const colorOptions = document.querySelectorAll('.color-option');
    
    if (colorToggle) {
        colorToggle.addEventListener('click', function() {
            colorSwitcher.classList.toggle('open');
        });
    }
    
    // Handle color changes
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            setActiveColor(color);
            
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
        });
    });
    
    // Load saved color
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
        setActiveColor(savedColor);
        document.querySelector(`[data-color="${savedColor}"]`)?.classList.add('active');
    } else {
        setActiveColor('color-1');
        document.querySelector('[data-color="color-1"]')?.classList.add('active');
    }
}

function setActiveColor(colorClass) {
    // Remove all color classes
    document.body.className = document.body.className.replace(/color-\d+/g, '');
    
    // Add new color class
    document.body.classList.add(colorClass);
    
    // Save preference
    localStorage.setItem('selectedColor', colorClass);
}

/* =============================== Animations ================================ */
function initializeAnimations() {
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Portfolio hover effects
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/* =============================== Utility Functions ================================ */

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Handle close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Smooth scroll function
function smoothScrollTo(target, offset = 0) {
    const targetPosition = target.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Debounce function for scroll events
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
    
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        flex-direction: column;
        padding: 1rem;
        border-top: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

console.log('Modern Portfolio - All systems loaded successfully! 🚀');
