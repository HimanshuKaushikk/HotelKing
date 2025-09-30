// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initBookingForm();
    initAnimations();
    initSmoothScrolling();
    initParallaxEffect();
});

// Navigation functionality
function initNavigation() {
    const navContainer = document.querySelector('.nav-container');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Sticky navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navContainer.style.background = 'rgba(26, 26, 46, 0.98)';
            navContainer.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navContainer.style.background = 'rgba(26, 26, 46, 0.95)';
            navContainer.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Booking form functionality
function initBookingForm() {
    const bookingForm = document.querySelector('.booking-form');
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');

    if (!checkInInput || !checkOutInput) {
        // Booking form inputs not present on this page, skip initialization
        return;
    }
    
    // Set minimum dates for check-in and check-out
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    checkInInput.min = formatDate(today);
    checkOutInput.min = formatDate(tomorrow);
    
    // Update check-out min date when check-in changes
    checkInInput.addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        const minCheckOut = new Date(checkInDate);
        minCheckOut.setDate(minCheckOut.getDate() + 1);
        checkOutInput.min = formatDate(minCheckOut);
        
        // If check-out is before new min date, reset it
        if (new Date(checkOutInput.value) < minCheckOut) {
            checkOutInput.value = '';
        }
    });
    
    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            checkIn: checkInInput.value,
            checkOut: checkOutInput.value,
            adults: document.getElementById('adults').value,
            children: document.getElementById('children').value
        };
        
        // Simulate form submission
        simulateBookingCheck(formData);
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeToNewsletter(email);
        });
    }
    
    // Footer newsletter form
    const footerNewsletter = document.querySelector('.footer-newsletter');
    if (footerNewsletter) {
        footerNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeToNewsletter(email);
        });
    }
}

// Animation initialization
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .room-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Parallax effect
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Utility functions
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function simulateBookingCheck(formData) {
    // Show loading state
    const submitBtn = document.querySelector('.btn-booking');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Availability found! Redirecting to booking page...', 'success');
        
        // Reset form and button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Redirect to rooms page (simulated)
        setTimeout(() => {
            window.location.href = '../Rooms/index.html';
        }, 2000);
        
    }, 1500);
}

function subscribeToNewsletter(email) {
    // Show loading state
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            
            // Simulate subscription
            setTimeout(() => {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1000);
        }
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem 1rem 1rem;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem 1rem 1rem;
        background: #2196F3;
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    }
    
    .notification.success {
        background: #4CAF50;
    }
    
    .notification button {
        position: absolute;
        top: 5px;
        right: 5px;
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
    }
`;
document.head.appendChild(notificationStyles);

// Add CSS for mobile menu
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(26, 26, 46, 0.98);
            backdrop-filter: blur(10px);
            padding: 1rem;
            display: none;
            flex-direction: column;
            gap: 1rem;
        }
        
        .nav-menu.active {
            display: flex;
        }
        
        .nav-links {
            flex-direction: column;
            gap: 1rem;
        }
        
        .mobile-menu-toggle.active i::before {
            content: '\\f00d';
        }
    }
`;
document.head.appendChild(mobileMenuStyles);

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
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
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(animationStyles);
