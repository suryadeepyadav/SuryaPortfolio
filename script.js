// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme (dark mode default)
    initTheme();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize form submission
    initContactForm();
    
    // Initialize skill progress bars
    initSkillBars();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize scroll effects
    initScrollEffects();
});

// Initialize Navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');
    const themeToggler = document.querySelector('.theme-toggle');
    const backToTop1 = document.querySelector('.back-to-top');
    // Create overlay element for mobile navigation
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    
    // Fix for z-index stacking and make links clickable in mobile view
    document.querySelector('.theme-toggle').style.zIndex = "1003"; 
    
    // Apply pointer-events: auto to ensure links are clickable
    navLinkItems.forEach(link => {
        link.style.pointerEvents = "auto";
    });
    
    // Toggle mobile navigation
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('show');
        overlay.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile navigation when clicking on a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu when link is clicked
            hamburger.classList.remove('active');
            navLinks.classList.remove('show');
            overlay.classList.remove('show');
            document.body.classList.remove('no-scroll');
        });
        
        // Ensure links are properly clickable on touch devices
        link.addEventListener('touchend', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('show');
                    overlay.classList.remove('show');
                    document.body.classList.remove('no-scroll');
                    
                    // Smooth scroll to the section
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });
    
    // Close mobile navigation when clicking on overlay
    overlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
        overlay.classList.remove('show');
        document.body.classList.remove('no-scroll');
    });
    
    // Make sure touch events are properly handled
    navLinks.addEventListener('touchstart', function(e) {
        // Let the event propagate to child elements
    }, {passive: true});
    
    // Prevent any potential touch conflicts
    document.body.addEventListener('touchmove', function(e) {
        if (navLinks.classList.contains('show') && !navLinks.contains(e.target)) {
            e.preventDefault();
        }
    }, {passive: false});
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY;
        
        // Change header style on scroll
        if (scrollPos > 50) {
            if(window.innerWidth <= 768){
            hamburger.style.top = '1.2rem';
            themeToggler.style.top = '0.5rem';
            backToTop1.style.right = '2rem';
            }
            // themeToggler.style.width = '3rem';
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'var(--shadow)';
        } else {
            if(window.innerWidth <= 768){
            themeToggler.style.top = '1.5rem';
            backToTop1.style.right = '7rem';
            hamburger.style.top = '2.3rem';
            }
            header.style.padding = '2rem 0';
            header.style.boxShadow = 'var(--shadow)';
        }
        
        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinkItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
}

// Initialize Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (name && email && subject && message) {
                // EmailJS template params
                const templateParams = {
                    name: `Name - ${name}`,
                    email: `Email - ${email}`,
                    subject:`Subject - ${subject}`,
                    message: `Message - ${message}`,
                };

                // Send email using EmailJS
                emailjs.send("service_d7fmqsk", "template_ljv5y5n", templateParams)
                    .then(function(response) {
                        formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                        formStatus.classList.add('success');
                        contactForm.reset();

                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            formStatus.textContent = '';
                            formStatus.classList.remove('success');
                        }, 5000);
                    }, function(error) {
                        console.error('Error sending email:', error);
                        formStatus.textContent = 'Failed to send message. Please try again later.';
                        formStatus.classList.add('error');

                        // Hide error message after 3 seconds
                        setTimeout(() => {
                            formStatus.textContent = '';
                            formStatus.classList.remove('error');
                        }, 3000);
                    });
            } else {
                formStatus.textContent = 'Please fill all fields.';
                formStatus.classList.add('error');

                // Hide error message after 3 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.classList.remove('error');
                }, 3000);
            }
        });
    }
}
// Initialize Skill Bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Animate the skill bars immediately
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') + '%';
            // Small delay for visual effect
            setTimeout(() => {
                bar.style.width = progress;
            }, 300);
        });
    }
    
    // Immediately animate skill bars on page load
    animateSkillBars();
    
    // Also trigger animation when skills section comes into view
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Ensure skill bars are animated if user scrolls directly to skills section
    function checkSkillBars() {
        const skillsSection = document.getElementById('skills');
        if (skillsSection && isInViewport(skillsSection)) {
            animateSkillBars();
            window.removeEventListener('scroll', checkSkillBars);
        }
    }
    
    window.addEventListener('scroll', checkSkillBars);
}

// Initialize Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize Theme Functionality
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Create the icon element
    const toggleIcon = document.createElement('i');
    toggleIcon.className = 'fas fa-sun';
    themeToggle.innerHTML = ''; // Clear any existing content
    themeToggle.appendChild(toggleIcon);
    
    // Set default theme to dark mode
    document.documentElement.setAttribute('data-theme', 'dark');
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'light') {
            toggleIcon.className = 'fas fa-moon';
        } else {
            toggleIcon.className = 'fas fa-sun';
        }
    }
}

// Initialize scroll effects for various elements
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Fade in elements on scroll
    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .project-card, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize element styles for fade in effect
    document.querySelectorAll('.timeline-item, .project-card, .contact-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add scroll event for fade in effect
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Check on initial load
}
