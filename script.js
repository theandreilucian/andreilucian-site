// Newsletter form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterFormBottom = document.getElementById('newsletterFormBottom');
    const newsletterFormGhostwriting = document.getElementById('newsletterFormGhostwriting');
    const emailInput = document.getElementById('emailInput');
    const emailInputBottom = document.getElementById('emailInputBottom');
    const emailInputGhostwriting = document.getElementById('emailInputGhostwriting');
    
    // ConvertKit Configuration
    // Get ConvertKit form ID from data attribute or use default
    const convertKitFormIdFromAttr = document.body ? document.body.getAttribute('data-convertkit-form-id') : null;
    const CONVERTKIT_FORM_ID = convertKitFormIdFromAttr || (typeof window !== 'undefined' && window.CONVERTKIT_FORM_ID) || 'YOUR_FORM_ID';
    const CONVERTKIT_API_KEY = (typeof window !== 'undefined' && window.CONVERTKIT_API_KEY) || 'YOUR_API_KEY';
    
    const formMessage = document.getElementById('formMessage');
    const formMessageBottom = document.getElementById('formMessageBottom');
    const formMessageGhostwriting = document.getElementById('formMessageGhostwriting');
    const articleUnlockForm = document.getElementById('articleUnlockForm');
    const articleEmailInput = document.getElementById('articleEmail');
    const articleUnlockMessage = document.getElementById('articleUnlockMessage');
    const articleBody = document.getElementById('articleBody');
    const articleLockOverlay = document.getElementById('articleLockOverlay');
    const articleUnlockKey = articleBody ? articleBody.getAttribute('data-unlock-key') : null;
    const articleUnlockStorageKey = articleUnlockKey ? `andrei_unlock_${articleUnlockKey}` : null;

    // Top form handler
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleConvertKitSubmission(emailInput, formMessage, CONVERTKIT_FORM_ID, CONVERTKIT_API_KEY);
        });
    }

    // Bottom form handler
    if (newsletterFormBottom) {
        newsletterFormBottom.addEventListener('submit', function(e) {
            e.preventDefault();
            handleConvertKitSubmission(emailInputBottom, formMessageBottom, CONVERTKIT_FORM_ID, CONVERTKIT_API_KEY);
        });
    }

    // Ghostwriting page form handler
    if (newsletterFormGhostwriting) {
        newsletterFormGhostwriting.addEventListener('submit', function(e) {
            e.preventDefault();
            handleConvertKitSubmission(emailInputGhostwriting, formMessageGhostwriting, CONVERTKIT_FORM_ID, CONVERTKIT_API_KEY);
        });
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

    // Keep newsletter anchor links for smooth scrolling
    // No need to rewrite them anymore since we're using ConvertKit

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

// Handle ConvertKit form submission
function handleConvertKitSubmission(emailInput, messageElement, formId, apiKey) {
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage(messageElement, 'Please enter your email address.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage(messageElement, 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Check if ConvertKit is configured
    if (formId === 'YOUR_FORM_ID' || apiKey === 'YOUR_API_KEY') {
        showMessage(messageElement, 'ConvertKit is not configured. Please add your Form ID and API Key.', 'error');
        console.error('ConvertKit not configured. Please set CONVERTKIT_FORM_ID and CONVERTKIT_API_KEY.');
        return;
    }
    
    // Show loading state
    showMessage(messageElement, 'Subscribing...', 'loading');
    emailInput.disabled = true;
    
    // ConvertKit API endpoint
    // For public forms, we can use the form's public endpoint
    // Alternative: Use the API endpoint with api_key as query parameter
    const convertKitUrl = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
    
    // Submit to ConvertKit
    // Note: For public forms, you can also use the form's embed URL
    // But using API gives more control
    fetch(convertKitUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key: apiKey,
            email: email,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.subscription) {
            showMessage(messageElement, 'Thank you for subscribing! Redirecting...', 'success');
            emailInput.value = '';
            
            // Check if there's a redirect URL configured (e.g., Gumroad link)
            const redirectUrl = (typeof window !== 'undefined' && window.CONVERTKIT_REDIRECT_URL) || null;
            
            if (redirectUrl) {
                // Redirect to Gumroad or thank you page after 1.5 seconds
                setTimeout(() => {
                    window.location.href = redirectUrl;
                }, 1500);
            } else {
                // No redirect - just show success message
                showMessage(messageElement, 'Thank you for subscribing! Check your email to confirm.', 'success');
                setTimeout(() => {
                    clearMessage(messageElement);
                }, 5000);
            }
        } else {
            throw new Error(data.error || 'Subscription failed');
        }
    })
    .catch(error => {
        console.error('ConvertKit subscription error:', error);
        showMessage(messageElement, 'Something went wrong. Please try again later.', 'error');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            clearMessage(messageElement);
        }, 3000);
    })
    .finally(() => {
        emailInput.disabled = false;
    });
}

// Legacy function for backward compatibility (if needed)
function handleFormSubmission(emailInput, messageElement) {
    handleConvertKitSubmission(emailInput, messageElement, 'YOUR_FORM_ID', 'YOUR_API_KEY');
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Allow normal behavior for placeholders
            if (href === '#') return;
            
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
