// Property Carousel Functionality
class PropertyCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.totalSlides = this.slides.length;
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        
        this.init();
    }
    
    init() {
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Auto-advance carousel every 5 seconds
        setInterval(() => this.nextSlide(), 5000);
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        this.slides[index].classList.add('active');
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prevIndex);
    }
}

// Income Calculator
class IncomeCalculator {
    constructor() {
        this.propertyValueInput = document.getElementById('property-value');
        this.currentRentInput = document.getElementById('current-rent');
        this.propertyTypeSelect = document.getElementById('property-type');
        this.calculateBtn = document.querySelector('.calculate-btn');
        this.resultsDiv = document.querySelector('.results');
        
        this.init();
    }
    
    init() {
        if (this.calculateBtn) {
            this.calculateBtn.addEventListener('click', () => this.calculateIncome());
        }
        
        // Add real-time calculation on input change
        if (this.propertyValueInput && this.currentRentInput) {
            this.propertyValueInput.addEventListener('input', () => this.calculateIncome());
            this.currentRentInput.addEventListener('input', () => this.calculateIncome());
        }
    }
    
    calculateIncome() {
        const propertyValue = parseFloat(this.propertyValueInput.value) || 0;
        const currentRent = parseFloat(this.currentRentInput.value) || 0;
        const propertyType = this.propertyTypeSelect.value;
        
        if (propertyValue === 0 || currentRent === 0) {
            this.hideResults();
            return;
        }
        
        // Calculate potential income based on property type and value
        let multiplier = 1.5; // Default multiplier
        
        switch (propertyType) {
            case 'apartment':
                multiplier = 2.2;
                break;
            case 'house':
                multiplier = 2.5;
                break;
            case 'studio':
                multiplier = 1.8;
                break;
            case 'room':
                multiplier = 1.3;
                break;
        }
        
        // Adjust multiplier based on property value (higher value = higher potential)
        if (propertyValue > 500000) {
            multiplier += 0.3;
        } else if (propertyValue > 300000) {
            multiplier += 0.2;
        }
        
        const currentAnnual = currentRent * 12;
        const potentialAnnual = currentRent * multiplier * 12;
        const increase = ((potentialAnnual - currentAnnual) / currentAnnual) * 100;
        
        this.displayResults(currentAnnual, potentialAnnual, increase);
    }
    
    displayResults(currentAnnual, potentialAnnual, increase) {
        const currentAnnualEl = document.getElementById('current-annual');
        const potentialAnnualEl = document.getElementById('potential-annual');
        const incomeIncreaseEl = document.getElementById('income-increase');
        
        if (currentAnnualEl) currentAnnualEl.textContent = `£${currentAnnual.toLocaleString()}`;
        if (potentialAnnualEl) potentialAnnualEl.textContent = `£${potentialAnnual.toLocaleString()}`;
        if (incomeIncreaseEl) incomeIncreaseEl.textContent = `+${increase.toFixed(0)}%`;
        
        this.resultsDiv.classList.remove('hidden');
        
        // Add animation
        this.resultsDiv.style.animation = 'none';
        setTimeout(() => {
            this.resultsDiv.style.animation = 'fadeInUp 0.6s ease-out';
        }, 10);
    }
    
    hideResults() {
        this.resultsDiv.classList.add('hidden');
    }
}

// Form Handling
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const propertyType = formData.get('property-type');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            this.showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        this.showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        this.form.reset();
        
        // Log form data (replace with actual form submission)
        console.log('Form submitted:', {
            name,
            email,
            phone,
            propertyType,
            message
        });
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#d23b95'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-family: inherit;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// Smooth Scrolling
class SmoothScrolling {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }
    
    init() {
        if (this.mobileMenuBtn && this.navMenu) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking on links
            this.navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.mobileMenuBtn.classList.toggle('active');
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.mobileMenuBtn.classList.remove('active');
    }
}

// Header Scroll Effect
class HeaderScrollEffect {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }
    
    init() {
        if (this.header) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    }
    
    handleScroll() {
        if (window.scrollY > 100) {
            this.header.style.background = 'rgba(255, 255, 255, 0.98)';
            this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.header.style.background = 'rgba(255, 255, 255, 0.95)';
            this.header.style.boxShadow = 'none';
        }
    }
}

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.init();
    }
    
    init() {
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
        const animatedElements = document.querySelectorAll('.service-card, .process-step, .contact-form');
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    new PropertyCarousel();
    
    // Initialize income calculator
    new IncomeCalculator();
    
    // Initialize contact form
    new ContactForm();
    
    // Initialize smooth scrolling
    new SmoothScrolling();
    
    // Initialize mobile navigation
    new MobileNavigation();
    
    // Initialize header scroll effect
    new HeaderScrollEffect();
    
    // Initialize animation observer
    new AnimationObserver();
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 4rem;
                flex-direction: column;
                background-color: white;
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                padding: 2rem 0;
                border-top: 1px solid #e5e7eb;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu a {
                padding: 1rem;
                border-bottom: 1px solid #f3f4f6;
            }
            
            .nav-menu a:last-child {
                border-bottom: none;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
});

// Add loading animation to buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.calculate-btn, .submit-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.classList.contains('calculate-btn')) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                // Re-enable after a delay
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});

// Add hover effects to service cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add active state to navigation based on scroll position
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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
    });
    
    // Add active state styles
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-link.active {
            color: #d23b95 !important;
        }
    `;
    document.head.appendChild(activeStyle);
}); 