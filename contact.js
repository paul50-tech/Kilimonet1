/**
 * Kilimonet Integrated Agrisystems - Contact Form Client-Side Validation
 */

const initContactValidation = () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const nameInput = document.getElementById('contact-name');
  const phoneInput = document.getElementById('contact-phone');
  const emailInput = document.getElementById('contact-email');
  const countyInput = document.getElementById('contact-county');
  const farmTypeInput = document.getElementById('contact-farm-type');
  const serviceInterestInput = document.getElementById('contact-service-interest');
  const messageInput = document.getElementById('contact-message');
  const statusContainer = document.getElementById('contact-status');

  // Error message elements
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  const emailError = document.getElementById('email-error');
  const countyError = document.getElementById('county-error');
  const farmTypeError = document.getElementById('farm-type-error');
  const serviceInterestError = document.getElementById('service-interest-error');
  const messageError = document.getElementById('message-error');

  // RFC 5322 compliant regex for robust email format validation
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  // Phone validation helper
  const PHONE_CHAR_REGEX = /^[+0-9\s\-()]+$/;

  const setFieldError = (input, errorEl, message) => {
    if (!input || !errorEl) return;
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorEl.id);
    errorEl.textContent = message;
    errorEl.hidden = false;
  };

  const clearFieldError = (input, errorEl) => {
    if (!input || !errorEl) return;
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    errorEl.textContent = '';
    errorEl.hidden = true;
  };

  // Validation functions
  const validatePhone = () => {
    if (!phoneInput || !phoneError) return true;
    const value = phoneInput.value.trim();

    // 1. Non-empty check
    if (!value) {
      setFieldError(phoneInput, phoneError, 'Phone number is required and cannot be empty.');
      return false;
    }

    // 2. Format and length check
    const digitsOnly = value.replace(/\D/g, '');
    if (!PHONE_CHAR_REGEX.test(value) || digitsOnly.length < 7 || digitsOnly.length > 15) {
      setFieldError(
        phoneInput,
        phoneError,
        'Please enter a valid phone number (e.g. +254 798 981 760 or 0798981760).'
      );
      return false;
    }

    clearFieldError(phoneInput, phoneError);
    return true;
  };

  const validateEmail = () => {
    if (!emailInput || !emailError) return true;
    const value = emailInput.value.trim();

    // 1. Non-empty check
    if (!value) {
      setFieldError(emailInput, emailError, 'Email address is required.');
      return false;
    }

    // 2. Proper email format check
    if (!EMAIL_REGEX.test(value)) {
      setFieldError(
        emailInput,
        emailError,
        'Please enter a valid email address (e.g. name@example.com).'
      );
      return false;
    }

    clearFieldError(emailInput, emailError);
    return true;
  };

  const validateName = () => {
    if (!nameInput || !nameError) return true;
    const value = nameInput.value.trim();
    if (!value) {
      setFieldError(nameInput, nameError, 'Please enter your name.');
      return false;
    }
    clearFieldError(nameInput, nameError);
    return true;
  };

  const validateCounty = () => {
    if (!countyInput || !countyError) return true;
    const value = countyInput.value.trim();
    if (!value) {
      setFieldError(countyInput, countyError, 'Please enter your county.');
      return false;
    }
    clearFieldError(countyInput, countyError);
    return true;
  };

  const validateFarmType = () => {
    if (!farmTypeInput || !farmTypeError) return true;
    const value = farmTypeInput.value.trim();
    if (!value) {
      setFieldError(farmTypeInput, farmTypeError, 'Please specify your farm type.');
      return false;
    }
    clearFieldError(farmTypeInput, farmTypeError);
    return true;
  };

  const validateServiceInterest = () => {
    if (!serviceInterestInput || !serviceInterestError) return true;
    const value = serviceInterestInput.value.trim();
    if (!value) {
      setFieldError(serviceInterestInput, serviceInterestError, 'Please specify your service interest.');
      return false;
    }
    clearFieldError(serviceInterestInput, serviceInterestError);
    return true;
  };

  const validateMessage = () => {
    if (!messageInput || !messageError) return true;
    const value = messageInput.value.trim();
    if (!value) {
      setFieldError(messageInput, messageError, 'Please enter a message describing your needs.');
      return false;
    }
    if (value.length < 5) {
      setFieldError(messageInput, messageError, 'Message must be at least 5 characters long.');
      return false;
    }
    clearFieldError(messageInput, messageError);
    return true;
  };

  // Real-time validation listeners on input and blur
  const fields = [
    { input: nameInput, error: nameError, validator: validateName },
    { input: phoneInput, error: phoneError, validator: validatePhone },
    { input: emailInput, error: emailError, validator: validateEmail },
    { input: countyInput, error: countyError, validator: validateCounty },
    { input: farmTypeInput, error: farmTypeError, validator: validateFarmType },
    { input: serviceInterestInput, error: serviceInterestError, validator: validateServiceInterest },
    { input: messageInput, error: messageError, validator: validateMessage }
  ];

  fields.forEach(({ input, validator }) => {
    if (!input) return;

    input.addEventListener('blur', () => {
      // Validate on blur when leaving the field
      validator();
    });

    input.addEventListener('input', () => {
      // Clear error immediately when user corrects input
      if (input.classList.contains('is-invalid')) {
        validator();
      }
    });
  });

  // Intercept form submission
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (statusContainer) {
      statusContainer.hidden = true;
      statusContainer.className = 'contact-status';
      statusContainer.textContent = '';
    }

    // Run all validations
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();
    const isCountyValid = validateCounty();
    const isFarmTypeValid = validateFarmType();
    const isServiceInterestValid = validateServiceInterest();
    const isMessageValid = validateMessage();

    const isFormValid =
      isNameValid &&
      isPhoneValid &&
      isEmailValid &&
      isCountyValid &&
      isFarmTypeValid &&
      isServiceInterestValid &&
      isMessageValid;

    if (!isFormValid) {
      // Find and focus the first invalid input for accessibility
      const firstInvalidField = contactForm.querySelector('.is-invalid');
      if (firstInvalidField) {
        firstInvalidField.focus();
      }

      if (statusContainer) {
        statusContainer.hidden = false;
        statusContainer.className = 'contact-status error';
        statusContainer.textContent = 'Please correct the highlighted errors in the form before submitting.';
      }
      return;
    }

    // Form is valid! Display success confirmation
    const submittedName = nameInput ? nameInput.value.trim() : 'there';
    const submittedPhone = phoneInput ? phoneInput.value.trim() : '';
    const submittedEmail = emailInput ? emailInput.value.trim() : '';

    if (statusContainer) {
      statusContainer.hidden = false;
      statusContainer.className = 'contact-status success';
      statusContainer.innerHTML = `<strong>Thank you, ${escapeHtml(submittedName)}!</strong> Your message has been received. Our team will contact you shortly via <strong>${escapeHtml(submittedPhone)}</strong> or <strong>${escapeHtml(submittedEmail)}</strong>.`;
      statusContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    contactForm.reset();

    // Reset validation states
    fields.forEach(({ input, error }) => {
      clearFieldError(input, error);
    });
  });

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactValidation);
} else {
  initContactValidation();
}
