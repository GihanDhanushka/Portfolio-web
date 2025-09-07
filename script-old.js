/* =============================== Typing Animation ================================ */
const typed = new Typed('.typing', {
    strings: ['Information Systems Student', 'Software Developer', 'System Analyst', 'Database Designer', 'IT Professional'],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 2000,
    startDelay: 500,
    loop: true
});

/* =============================== Aside Navigation ================================ */
const nav = document.querySelector('.nav'),
      navList = nav.querySelectorAll('li'),
      totalNavList = navList.length,
      allSection = document.querySelectorAll('.section'),
      totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function() {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector('a').classList.contains('active')) {
                addBackSection(j);
            }
            navList[j].querySelector('a').classList.remove('active');
        }
        this.classList.add('active');
        showSection(this);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('back-section');
    }
}

function addBackSection(num) {
    allSection[num].classList.add('back-section');
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('active');
    }
    const target = element.getAttribute('href').split('#')[1];
    document.querySelector('#' + target).classList.add('active');
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector('a').classList.remove('active');
        const target = element.getAttribute('href').split('#')[1];
        if (target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) {
            navList[i].querySelector('a').classList.add('active');
        }
    }
}

/* =============================== Hire Me Button ================================ */
const hireMeBtn = document.querySelector('.hire-me');
if (hireMeBtn) {
    hireMeBtn.addEventListener('click', function() {
        const sectionIndex = this.getAttribute('data-section-index');
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex);
    });
}

/* =============================== Nav Toggler ================================ */
const navTogglerBtn = document.querySelector('.nav-toggler'),
      aside = document.querySelector('.aside');
      
navTogglerBtn.addEventListener('click', () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    aside.classList.toggle('open');
    navTogglerBtn.classList.toggle('open');
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle('open');
    }
}

/* =============================== Theme Colors ================================ */
const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
styleSwitcherToggle.addEventListener('click', () => {
    document.querySelector('.style-switcher').classList.toggle('open');
});

// Hide style switcher on scroll
window.addEventListener('scroll', () => {
    if (document.querySelector('.style-switcher').classList.contains('open')) {
        document.querySelector('.style-switcher').classList.remove('open');
    }
});

/* =============================== Theme Color Switcher ================================ */
function setActiveStyle(color) {
    // Remove all color classes
    document.body.className = document.body.className.replace(/color-\d+/g, '');
    // Add new color class
    document.body.classList.add(color);
    // Store preference
    localStorage.setItem('selectedTheme', color);
}

/* =============================== Day/Night Mode ================================ */
const dayNight = document.querySelector('.day-night');

dayNight.addEventListener('click', () => {
    dayNight.querySelector('i').classList.toggle('fa-sun');
    dayNight.querySelector('i').classList.toggle('fa-moon');
    document.body.classList.toggle('dark');
});

window.addEventListener('load', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        setActiveStyle(savedTheme);
    } else {
        setActiveStyle('color-1'); // Default theme
    }
    
    // Set day/night icon based on current theme
    if (document.body.classList.contains('dark')) {
        dayNight.querySelector('i').classList.add('fa-sun');
    } else {
        dayNight.querySelector('i').classList.add('fa-moon');
    }
});

/* =============================== Smooth Scrolling ================================ */
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

/* =============================== Form Validation ================================ */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[placeholder="Name"]').value;
        const email = this.querySelector('input[placeholder="Email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea[placeholder="Message"]').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

/* =============================== Scroll Animations ================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.service-item, .portfolio-item, .timeline-item, .skill-item').forEach(el => {
    observer.observe(el);
});

/* =============================== Skill Progress Animation ================================ */
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.progress-in');
        const percent = progressBar.style.width;
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.width = percent;
        }, 500);
    });
}

// Animate skill bars when About section is visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

/* =============================== Portfolio Lightbox ================================ */
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        createLightbox(imgSrc);
    });
});

function createLightbox(imageSrc) {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    
    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');
    
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-lightbox');
    closeBtn.innerHTML = '&times;';
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Portfolio Item';
    
    // Append elements
    lightboxContent.appendChild(closeBtn);
    lightboxContent.appendChild(img);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 30px;
        color: white;
        cursor: pointer;
        z-index: 1001;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    img.style.cssText = `
        width: 100%;
        height: auto;
        display: block;
    `;
    
    // Show lightbox
    setTimeout(() => lightbox.style.opacity = '1', 10);
    
    // Close lightbox functionality
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        setTimeout(() => document.body.removeChild(lightbox), 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    }, { once: true });
}

/* =============================== Loading Animation ================================ */
window.addEventListener('load', function() {
    // Hide loading animation if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Initialize animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

/* =============================== Particle Background ================================ */
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particles');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--skin-color);
            border-radius: 50%;
            opacity: 0.1;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Initialize particles on larger screens
if (window.innerWidth > 768) {
    createParticles();
}

/* =============================== Performance Optimizations ================================ */
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

// Throttle function for resize events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Optimize scroll and resize listeners
const optimizedScrollHandler = debounce(() => {
    // Add any scroll-based functionality here
}, 16);

const optimizedResizeHandler = throttle(() => {
    // Handle resize events
    if (window.innerWidth <= 768) {
        // Remove particles on mobile for performance
        const particles = document.querySelector('.particles');
        if (particles) particles.remove();
    }
}, 250);

window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', optimizedResizeHandler);

console.log('Atlas Portfolio - All systems loaded successfully! 🚀');
