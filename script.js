// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    updateNavbarBackground();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                progressBar.style.width = percentage + '%';
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Project Filtering
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Form Validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous error messages
    clearFormErrors();
    
    // Name validation
    if (name.length < 2) {
        showFormError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (message.length < 10) {
        showFormError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function showFormError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#EF4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#EF4444';
}

function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
    formFields.forEach(field => {
        field.style.borderColor = '';
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.tech-icon-card, .service-card, .project-card, .testimonial-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Navbar Background Update
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    updateNavbarBackground();
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Typing Effect for Hero Headline
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize Typing Effect
function initializeTypingEffect() {
    const heroHeadline = document.querySelector('.hero-headline');
    const originalText = heroHeadline.textContent;
    
    // Reset the text and start typing effect
    setTimeout(() => {
        typeWriter(heroHeadline, originalText, 50);
    }, 1000);
}

// Service Card Hover Effects
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// Project Card Hover Effects
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const buttons = card.querySelector('.project-buttons');
            if (buttons) {
                buttons.style.opacity = '1';
                buttons.style.transform = 'translateY(0)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const buttons = card.querySelector('.project-buttons');
            if (buttons) {
                buttons.style.opacity = '0.8';
                buttons.style.transform = 'translateY(10px)';
            }
        });
    });
}

// Social Icons Animation
function initializeSocialIcons() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
        icon.classList.add('fade-in');
    });
}

// Smooth Scroll for Navigation Links
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Scroll Indicator Click
function initializeScrollIndicator() {
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const techStackSection = document.getElementById('tech-stack');
            techStackSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}


// Form Submission
// Form Submission
function handleFormSubmission(e) {
    e.preventDefault();

    if (validateForm()) {
        const contactForm = e.target; // the form
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send data to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#10B981';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Something went wrong.');
                });
            }
        })
        .catch(error => {
            submitBtn.textContent = 'Error!';
            submitBtn.style.background = 'red';
            console.error(error);

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        });
    }
}


// Parallax Effect for Hero Section
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const avatar = document.querySelector('.avatar');
        
        if (hero && avatar) {
            const rate = scrolled * -0.5;
            avatar.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Initialize all features
    animateProgressBars();
    initializeProjectFilters();
    initializeScrollAnimations();
    initializeServiceCards();
    initializeProjectCards();
    initializeSocialIcons();
    initializeSmoothScroll();
    initializeScrollIndicator();
    initializeParallax();
    
    // Initialize typing effect after a short delay
    setTimeout(initializeTypingEffect, 500);
    
    // Initialize navbar background on page load
    updateNavbarBackground();
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
    });
    
    // Add CSS for active nav link
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary-color) !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
        .project-buttons {
            opacity: 0.8;
            transform: translateY(10px);
            transition: all 0.3s ease;
        }
        .social-icon {
            animation: fadeInUp 0.6s ease forwards;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add CSS for loading animation
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Utility function for smooth scrolling to any element
function scrollToElement(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Export functions for global use
window.scrollToSection = scrollToSection;
window.toggleTheme = toggleTheme; 