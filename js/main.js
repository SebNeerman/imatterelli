// DOM Elements
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const languageBtns = document.querySelectorAll('.lang-btn');
const mobileLangBtns = document.querySelectorAll('.mobile-lang-btn');
const sections = document.querySelectorAll('.section');
const copyrightYear = document.querySelector('.copyright-year');


// Current language (default: Italian)
let currentLang = 'it';

// Update copyright year
function updateCopyrightYear() {
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
}

// Handle header transparency on scroll
function handleHeaderTransparency() {
    if (window.scrollY > 50) {
        header.classList.remove('transparent');
    } else {
        header.classList.add('transparent');
    }
}

// Initialize the header state
function initHeader() {
    handleHeaderTransparency();
    window.addEventListener('scroll', handleHeaderTransparency);
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Close mobile menu when clicking a link
function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// Switch language
function switchLanguage(lang) {
    if (lang === currentLang) return;
    
    currentLang = lang;
    
    // Update active state on language buttons
    languageBtns.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    mobileLangBtns.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update all text elements with data-it and data-en attributes
    const elementsToTranslate = document.querySelectorAll('[data-it][data-en]');
    elementsToTranslate.forEach(element => {
        element.textContent = element.dataset[lang];
    });
}

// Add scroll animation to elements
function animateOnScroll() {
    const elementsToAnimate = document.querySelectorAll('.section-title, .content-wrapper, .pasta-image, .cooking-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Handle smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                closeMobileMenu();
            }
        });
    });
}

// Set the active navigation link based on scroll position
function updateActiveNavLink() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll(`.nav-link[href="#${sectionId}"]`).forEach(link => {
                link.classList.add('active');
            });
            
            document.querySelectorAll(`.mobile-nav-link[href="#${sectionId}"]`).forEach(link => {
                link.classList.add('active');
            });
        } else {
            document.querySelectorAll(`.nav-link[href="#${sectionId}"]`).forEach(link => {
                link.classList.remove('active');
            });
            
            document.querySelectorAll(`.mobile-nav-link[href="#${sectionId}"]`).forEach(link => {
                link.classList.remove('active');
            });
        }
    });
}

// Initialize all event listeners
function initEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Mobile menu links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Language switcher buttons
    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
    
    // Mobile language switcher buttons
    mobileLangBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initEventListeners();
    setupSmoothScrolling();
    animateOnScroll();
    
    // Set initial language
    switchLanguage('it');
});

// Load images for performance
function preloadImages() {
    const imageUrls = [
        'images/hero.jpg',
        'images/pasta-making.jpg',
        'images/cooking-class.jpg',
        'images/logo.svg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload images
preloadImages();