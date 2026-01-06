/**
 * Personal Brand & Beauty Academy
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initBookingModal();
    initSuccessModal();
    initForms();
    initAnimations();
    initDatePicker();
});

/**
 * Navigation Module
 */
function initNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Mobile menu close
    if (navClose) {
        navClose.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Active link highlighting based on scroll position
    highlightActiveLink();
}

/**
 * Highlight active navigation link based on scroll position
 */
function highlightActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav__link');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav__link[href*="' + sectionId + '"]');

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItems.forEach(function(item) {
                        item.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

/**
 * Scroll Effects Module
 */
function initScrollEffects() {
    const header = document.getElementById('header');

    function handleScroll() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/**
 * Booking Modal Module
 */
function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    const modalClose = modal ? modal.querySelector('.modal__close') : null;
    const modalOverlay = modal ? modal.querySelector('.modal__overlay') : null;
    const bookingButtons = document.querySelectorAll('[data-modal="booking"]');

    // Open modal
    bookingButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(modal);
        });
    });

    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal(modal);
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            closeModal(modal);
        });
    }

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });
}

/**
 * Success Modal Module
 */
function initSuccessModal() {
    const modal = document.getElementById('success-modal');
    const closeBtn = document.getElementById('success-close');
    const modalClose = modal ? modal.querySelector('.modal__close') : null;
    const modalOverlay = modal ? modal.querySelector('.modal__overlay') : null;

    // Close events
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal(modal);
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal(modal);
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            closeModal(modal);
        });
    }

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });
}

/**
 * Form Handling Module
 */
function initForms() {
    const bookingForm = document.getElementById('booking-form');
    const inquiryForm = document.getElementById('inquiry-form');
    const consultationForm = document.getElementById('consultation-form');

    if (bookingForm) {
        setupBookingForm(bookingForm);
    }

    if (inquiryForm) {
        setupInquiryForm(inquiryForm);
    }

    if (consultationForm) {
        setupConsultationForm(consultationForm);
    }
}

/**
 * Booking Form Setup
 */
function setupBookingForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        if (validateForm(form)) {
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Изпращане...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(function() {
                closeModal(document.getElementById('booking-modal'));
                openModal(document.getElementById('success-modal'));
                
                // Reset form
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });

    // Input validation on blur
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            validateField(input);
        });

        input.addEventListener('input', function() {
            clearFieldError(input);
        });
    });
}

/**
 * Inquiry Form Setup
 */
function setupInquiryForm(form) {
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm(form)) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Изпращане...';
            submitBtn.disabled = true;

            setTimeout(function() {
                closeModal(document.getElementById('booking-modal'));
                openModal(document.getElementById('success-modal'));
                
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            validateField(input);
        });

        input.addEventListener('input', function() {
            clearFieldError(input);
        });
    });
}

/**
 * Consultation Form Setup
 */
function setupConsultationForm(form) {
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm(form)) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Изпращане...';
            submitBtn.disabled = true;

            setTimeout(function() {
                closeModal(document.getElementById('booking-modal'));
                openModal(document.getElementById('success-modal'));
                
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

/**
 * Form Validation
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(function(field) {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Check if required and empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Това поле е задължително';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Моля, въведете валиден имейл адрес';
        }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\+\-\(\)]{7,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Моля, въведете валиден телефонен номер';
        }
    }

    // Checkbox validation
    if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
        isValid = false;
        errorMessage = 'Трябва да се съгласите с условията';
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const formGroup = field.closest('.form__group');
    if (formGroup) {
        formGroup.classList.add('has-error');
        const errorEl = document.createElement('span');
        errorEl.className = 'form__error';
        errorEl.textContent = message;
        formGroup.appendChild(errorEl);
    }
}

function clearFieldError(field) {
    const formGroup = field.closest('.form__group');
    if (formGroup) {
        formGroup.classList.remove('has-error');
        const errorEl = formGroup.querySelector('.form__error');
        if (errorEl) {
            errorEl.remove();
        }
    }
}

/**
 * Date Picker Initialization
 */
function initDatePicker() {
    const dateInput = document.getElementById('booking-date');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

/**
 * Animation Module
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(function(el) {
            el.classList.add('visible');
        });
    }
}

/**
 * Utility Functions
 */
function openModal(modal) {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(function() {
                firstInput.focus();
            }, 300);
        }
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = document.getElementById('header') ? 
                document.getElementById('header').offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading state to external links
document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

/**
 * Accordion functionality for course details
 */
document.querySelectorAll('.accordion__header').forEach(function(header) {
    header.addEventListener('click', function() {
        const accordion = this.closest('.accordion');
        const content = accordion.querySelector('.accordion__content');
        const icon = this.querySelector('.accordion__icon svg');
        
        // Toggle current accordion
        if (accordion.classList.contains('active')) {
            accordion.classList.remove('active');
            content.style.maxHeight = '0';
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        } else {
            // Close other accordions
            document.querySelectorAll('.accordion.active').forEach(function(activeAcc) {
                activeAcc.classList.remove('active');
                activeAcc.querySelector('.accordion__content').style.maxHeight = '0';
                const activeIcon = activeAcc.querySelector('.accordion__header .accordion__icon svg');
                if (activeIcon) {
                    activeIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Open current accordion
            accordion.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
            }
        }
    });
});

/**
 * Tab functionality for services/academy sections
 */
document.querySelectorAll('.tabs__nav-item').forEach(function(tab) {
    tab.addEventListener('click', function() {
        const tabGroup = this.closest('.tabs');
        const tabId = this.getAttribute('data-tab');
        
        // Update active tab
        tabGroup.querySelectorAll('.tabs__nav-item').forEach(function(item) {
            item.classList.remove('active');
        });
        this.classList.add('active');
        
        // Update active content
        tabGroup.querySelectorAll('.tabs__content').forEach(function(content) {
            content.classList.remove('active');
        });
        
        const activeContent = tabGroup.querySelector('#' + tabId);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    });
});

/**
 * Testimonial slider functionality
 */
const slider = document.querySelector('.testimonials__slider');
if (slider) {
    const track = slider.querySelector('.testimonials__track');
    const cards = slider.querySelectorAll('.testimonial-card');
    const prevBtn = slider.querySelector('.slider__prev');
    const nextBtn = slider.querySelector('.slider__next');
    let currentIndex = 0;
    
    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 20; // 20px gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (diff > swipeThreshold && currentIndex < cards.length - 1) {
            currentIndex++;
            updateSlider();
        } else if (diff < -swipeThreshold && currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }
}

/**
 * Counter animation for stats
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat__number');
    
    counters.forEach(function(counter) {
        const target = counter.textContent;
        const hasPlus = target.includes('+');
        const hasPercent = target.includes('%');
        const hasK = target.includes('K');
        
        let numericTarget;
        
        if (hasPlus) {
            numericTarget = parseInt(target);
        } else if (hasPercent) {
            numericTarget = parseInt(target);
        } else if (hasK) {
            numericTarget = parseFloat(target) * 1000;
        } else {
            numericTarget = parseInt(target);
        }
        
        const duration = 2000;
        const step = numericTarget / (duration / 16);
        let current = 0;
        
        const updateCounter = function() {
            current += step;
            
            if (current < numericTarget) {
                let displayValue;
                
                if (hasK) {
                    displayValue = (current / 1000).toFixed(0) + 'K';
                } else {
                    displayValue = Math.floor(current);
                }
                
                if (hasPlus) {
                    displayValue += '+';
                } else if (hasPercent) {
                    displayValue += '%';
                }
                
                counter.textContent = displayValue;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        counter.textContent = hasK ? '0K' : (hasPercent ? '0%' : '0+');
        requestAnimationFrame(updateCounter);
    });
}

// Initialize counter animation when stats section is visible
const statsSection = document.querySelector('.hero__stats');
if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

/**
 * Lazy loading for images
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    document.querySelectorAll('img[data-src]').forEach(function(img) {
        imageObserver.observe(img);
    });
}

/**
 * Add CSS for loaded images and form errors
 */
(function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        img { opacity: 0; transition: opacity 0.3s ease; }
        img.loaded { opacity: 1; }
        
        .form__group.has-error .form__input,
        .form__group.has-error .form__select,
        .form__group.has-error .form__textarea {
            border-color: #e74c3c;
        }
        
        .form__error {
            display: block;
            color: #e74c3c;
            font-size: 0.8125rem;
            margin-top: 0.25rem;
        }
        
        .accordion__content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .tabs__content {
            display: none;
        }
        
        .tabs__content.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .testimonials__track {
            display: flex;
            gap: 20px;
            transition: transform 0.3s ease;
        }
        
        .testimonials__track .testimonial-card {
            flex-shrink: 0;
        }
    `;
    document.head.appendChild(style);
})();

/**
 * Print functionality for booking confirmation
 */
function printBookingConfirmation() {
    window.print();
}

/**
 * Copy to clipboard functionality
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            showNotification('Адресът е копиран в клипборда');
        }).catch(function() {
            showNotification('Не успяхме да копираме адреса');
        });
    } else {
        showNotification('Копирането не се поддържа от вашия браузър');
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1A1A1A;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
(function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
})();

console.log('Personal Brand & Beauty Academy - Website loaded successfully');
