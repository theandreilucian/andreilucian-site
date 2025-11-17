// Newsletter form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterFormBottom = document.getElementById('newsletterFormBottom');
    const emailInput = document.getElementById('emailInput');
    const emailInputBottom = document.getElementById('emailInputBottom');
    const substackUrlFromAttr = document.body ? document.body.getAttribute('data-substack-url') : null;
    const SUBSTACK_URL = substackUrlFromAttr || (typeof window !== 'undefined' && window.SUBSTACK_URL) || 'https://newsletter.andreilucian.com';
    const formMessage = document.getElementById('formMessage');
    const formMessageBottom = document.getElementById('formMessageBottom');
    const articleUnlockForm = document.getElementById('articleUnlockForm');
    const articleEmailInput = document.getElementById('articleEmail');
    const articleUnlockMessage = document.getElementById('articleUnlockMessage');
    const articleBody = document.getElementById('articleBody');
    const articleLockOverlay = document.getElementById('articleLockOverlay');
    const articleUnlockKey = articleBody ? articleBody.getAttribute('data-unlock-key') : null;
    const articleUnlockStorageKey = articleUnlockKey ? `andrei_unlock_${articleUnlockKey}` : null;

    // Top form handler
    if (newsletterForm) {
        // If a Substack URL is configured, send users there instead of local handling
        if (SUBSTACK_URL) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                window.location.href = SUBSTACK_URL;
            });
        } else {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmission(emailInput, formMessage);
            });
        }
    }

    // Bottom form handler
    if (newsletterFormBottom) {
        if (SUBSTACK_URL) {
            newsletterFormBottom.addEventListener('submit', function(e) {
                e.preventDefault();
                window.location.href = SUBSTACK_URL;
            });
        } else {
            newsletterFormBottom.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmission(emailInputBottom, formMessageBottom);
            });
        }
    }

    // Article unlock handler
    if (articleUnlockStorageKey && localStorage.getItem(articleUnlockStorageKey) === 'true') {
        unlockArticleBody();
    }

    if (articleUnlockForm) {
        articleUnlockForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!articleEmailInput) return;

            const email = articleEmailInput.value.trim();

            if (!email) {
                showMessage(articleUnlockMessage, 'Please enter your email address.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage(articleUnlockMessage, 'Please enter a valid email address.', 'error');
                return;
            }

            unlockArticleBody();

            showMessage(articleUnlockMessage, 'Unlocked! Enjoy the full breakdown.', 'success');
            setTimeout(() => {
                clearMessage(articleUnlockMessage);
            }, 4000);
            articleEmailInput.value = '';
        });
    }

    document.querySelectorAll('[data-scroll-target]').forEach(button => {
        button.addEventListener('click', () => {
            const targetSelector = button.getAttribute('data-scroll-target');
            if (!targetSelector) return;
            const target = document.querySelector(targetSelector);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Rewrite any "newsletter" anchor links to Substack if configured
    if (SUBSTACK_URL) {
        document.querySelectorAll('a[href="#newsletter-signup"]').forEach(link => {
            link.setAttribute('href', SUBSTACK_URL);
            link.removeAttribute('data-scroll-target');
        });
    }

    function unlockArticleBody() {
        if (!articleBody) return;
        articleBody.classList.remove('locked');
        if (articleLockOverlay) {
            articleLockOverlay.style.display = 'none';
        }
        if (articleUnlockStorageKey) {
            localStorage.setItem(articleUnlockStorageKey, 'true');
        }
    }
});

// Handle form submission
function handleFormSubmission(emailInput, messageElement) {
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage(messageElement, 'Please enter your email address.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage(messageElement, 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Here you would typically send the email to your backend
    // For now, we'll just show a success message
    console.log('Email submitted:', email);
    
    showMessage(messageElement, 'Thank you! Your submission has been received!', 'success');
    
    // Reset form after 2 seconds
    setTimeout(() => {
        emailInput.value = '';
        clearMessage(messageElement);
    }, 3000);
}

// Show message
function showMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
}

// Clear message
function clearMessage(element) {
    if (!element) return;
    
    element.textContent = '';
    element.className = 'form-message';
    element.style.display = 'none';
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scroll for anchor links
(function() {
    const substackUrlFromAttr = document.body ? document.body.getAttribute('data-substack-url') : null;
    const SUBSTACK_URL = substackUrlFromAttr || (typeof window !== 'undefined' && window.SUBSTACK_URL) || null;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Allow normal behavior for placeholders
            if (href === '#') return;
            // If this is the newsletter anchor and a Substack URL is configured, don't smooth-scroll
            if (href === '#newsletter-signup' && SUBSTACK_URL) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// Make resource cover images act like their card buttons
document.addEventListener('DOMContentLoaded', function() {
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        const button = card.querySelector('.resource-button');
        const coverImage = card.querySelector('img');
        if (!button || !coverImage) return;

        // Show it's clickable
        coverImage.style.cursor = 'pointer';

        // Delegate image click to the card's primary button
        coverImage.addEventListener('click', function(e) {
            e.preventDefault();
            button.click();
        });
    });
});

// Product filtering (if filter buttons are added in the future)
function filterProducts(category) {
    const products = document.querySelectorAll('.resource-card');
    products.forEach(product => {
        if (category === 'all') {
            product.style.display = 'block';
        } else if (category === 'free' && product.classList.contains('free')) {
            product.style.display = 'block';
        } else if (category === 'paid' && product.classList.contains('paid')) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Optional: Add countdown timer for offers
function initOfferCountdown() {
    const countdownElements = document.querySelectorAll('.offer-countdown');
    countdownElements.forEach(element => {
        const endDate = new Date(element.getAttribute('data-end')).getTime();
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate - now;
            
            if (distance < 0) {
                element.textContent = 'Offer Expired';
                clearInterval(timer);
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            element.textContent = `${days}d ${hours}h ${minutes}m remaining`;
        }, 1000);
    });
}

// Initialize countdown on page load if countdown elements exist
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelectorAll('.offer-countdown').length > 0) {
        initOfferCountdown();
    }
});
