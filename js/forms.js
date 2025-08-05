// Form handling for Excellence Academy Website

document.addEventListener('DOMContentLoaded', function() {
    initRegistrationForm();
    initContactForm();
    initFormValidation();
});

// Registration form functionality
function initRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateRegistrationForm()) {
                submitRegistrationForm();
            }
        });

        // Real-time validation
        const inputs = registrationForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });

        // Program selection change handler
        const programSelect = document.getElementById('program');
        if (programSelect) {
            programSelect.addEventListener('change', function() {
                updateFormBasedOnProgram(this.value);
            });
        }
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContactForm();
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Form validation initialization
function initFormValidation() {
    // Custom validation messages
    const validationMessages = {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        date: 'Please enter a valid date',
        minLength: 'This field must be at least {min} characters long',
        maxLength: 'This field must be no more than {max} characters long'
    };

    // Set custom validation messages
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('invalid', function(e) {
            e.preventDefault();
            showFieldError(this, getValidationMessage(this));
        });
    });
}

// Registration form validation
function validateRegistrationForm() {
    const form = document.getElementById('registrationForm');
    let isValid = true;

    // Clear previous errors
    clearAllErrors(form);

    // Required fields validation
    const requiredFields = [
        'firstName', 'lastName', 'dateOfBirth', 'gender', 'program',
        'parentName', 'relationship', 'parentPhone', 'address'
    ];

    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });

    // Email validation (if provided)
    const emailField = document.getElementById('parentEmail');
    if (emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    const phoneField = document.getElementById('parentPhone');
    if (phoneField.value && !isValidPhone(phoneField.value)) {
        showFieldError(phoneField, 'Please enter a valid phone number');
        isValid = false;
    }

    // Date of birth validation
    const dobField = document.getElementById('dateOfBirth');
    if (dobField.value && !isValidAge(dobField.value)) {
        showFieldError(dobField, 'Please enter a valid date of birth');
        isValid = false;
    }

    // Terms and conditions
    const termsField = document.getElementById('terms');
    if (!termsField.checked) {
        showFieldError(termsField, 'You must agree to the terms and conditions');
        isValid = false;
    }

    return isValid;
}

// Contact form validation
function validateContactForm() {
    const form = document.getElementById('contactForm');
    let isValid = true;

    // Clear previous errors
    clearAllErrors(form);

    // Required fields validation
    const requiredFields = ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'];

    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });

    // Email validation
    const emailField = document.getElementById('contactEmail');
    if (emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation (if provided)
    const phoneField = document.getElementById('contactPhone');
    if (phoneField.value && !isValidPhone(phoneField.value)) {
        showFieldError(phoneField, 'Please enter a valid phone number');
        isValid = false;
    }

    return isValid;
}

// Individual field validation
function validateField(field) {
    clearFieldError(field);

    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'This field is required');
        return false;
    }

    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }

    if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }

    if (field.type === 'date' && field.value && field.id === 'dateOfBirth' && !isValidAge(field.value)) {
        showFieldError(field, 'Please enter a valid date of birth');
        return false;
    }

    return true;
}

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Ghana phone number format: +233XXXXXXXXX or 0XXXXXXXXX
    const phoneRegex = /^(\+233|0)[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isValidAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= 3 && age <= 25; // Reasonable age range for students
}

// Error handling functions
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Add error class to field
    field.classList.add('error');

    // Create and add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;

    formGroup.appendChild(errorElement);
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    field.classList.remove('error');
    const errorElement = formGroup.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function clearAllErrors(form) {
    const errorElements = form.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());

    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// Form submission functions
function submitRegistrationForm() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    
    // Show loading state
    showFormLoading(form, 'Submitting your application...');

    // Convert FormData to object for easier handling
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Simulate API call (replace with actual endpoint)
    setTimeout(() => {
        // In a real implementation, you would send this to your server
        console.log('Registration data:', data);
        
        // Show success message
        showFormSuccess(form, 'Application submitted successfully! Our admissions team will contact you within 2-3 business days.');
        
        // Send WhatsApp notification (optional)
        sendWhatsAppNotification('registration', data);
        
        // Reset form
        form.reset();
        
    }, 2000);
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Show loading state
    showFormLoading(form, 'Sending your message...');

    // Convert FormData to object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Simulate API call
    setTimeout(() => {
        console.log('Contact data:', data);
        
        // Show success message
        showFormSuccess(form, 'Message sent successfully! We will get back to you soon.');
        
        // Send WhatsApp notification (optional)
        sendWhatsAppNotification('contact', data);
        
        // Reset form
        form.reset();
        
    }, 1500);
}

// Form state management
function showFormLoading(form, message) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="loading"></span> ${message}`;
    }
}

function showFormSuccess(form, message) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.textContent.includes('Submit') ? 'Submit Application' : 'Send Message';
    }

    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
    
    // Scroll to top of form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// WhatsApp integration
function sendWhatsAppNotification(type, data) {
    let message = '';
    
    if (type === 'registration') {
        message = `New student registration:\n\nName: ${data.firstName} ${data.lastName}\nProgram: ${data.program}\nParent: ${data.parentName}\nPhone: ${data.parentPhone}`;
    } else if (type === 'contact') {
        message = `New contact inquiry:\n\nName: ${data.contactName}\nEmail: ${data.contactEmail}\nSubject: ${data.contactSubject}\nMessage: ${data.contactMessage}`;
    }
    
    // In a real implementation, you might want to automatically send this to your WhatsApp Business API
    console.log('WhatsApp notification:', message);
}

// Program-specific form updates
function updateFormBasedOnProgram(program) {
    // You can customize the form based on the selected program
    // For example, show different fields for different programs
    
    const additionalInfo = document.getElementById('comments');
    if (additionalInfo) {
        switch(program) {
            case 'primary':
                additionalInfo.placeholder = 'Any special requirements for primary education?';
                break;
            case 'jhs':
                additionalInfo.placeholder = 'Any specific subjects of interest for JHS?';
                break;
            case 'shs':
                additionalInfo.placeholder = 'Which track are you most interested in (Science, Arts, Business, Technical)?';
                break;
            default:
                additionalInfo.placeholder = 'Any additional information you\'d like to share';
        }
    }
}

// Utility function to get validation message
function getValidationMessage(field) {
    if (field.validity.valueMissing) {
        return 'This field is required';
    }
    if (field.validity.typeMismatch) {
        if (field.type === 'email') return 'Please enter a valid email address';
        if (field.type === 'tel') return 'Please enter a valid phone number';
    }
    if (field.validity.patternMismatch) {
        return field.getAttribute('title') || 'Please enter a valid value';
    }
    return 'Please enter a valid value';
}
