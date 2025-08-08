// Registration Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const totalAmount = document.getElementById('totalAmount');
    const email = document.getElementById('email');
    const emailConfirm = document.getElementById('emailConfirm');
    const contact = document.getElementById('contact');
    const countryCode = document.getElementById('country-code');
    const successMessage = document.getElementById('successMessage');
    
    // Contact number validation
    contact.addEventListener('input', function() {
        // Remove any non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Validate length (minimum 9 digits)
        if (this.value.length < 9) {
            this.setCustomValidity('Please enter a valid phone number (minimum 9 digits)');
            this.style.borderColor = 'var(--red)';
            this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
        } else {
            this.setCustomValidity('');
            this.style.borderColor = 'var(--green)';
            this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
        }
    });

    // Style country code select on focus and change
    countryCode.addEventListener('focus', function() {
        this.style.borderColor = 'var(--red)';
        this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
    });

    countryCode.addEventListener('change', function() {
        this.style.borderColor = 'var(--green)';
        this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
    });

    countryCode.addEventListener('blur', function() {
        if (this.value) {
            this.style.borderColor = 'var(--green)';
            this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
        } else {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        }
    });
    
    // Prevent 'e', '+', '-' in number input
    contact.addEventListener('keydown', function(e) {
        if (e.key === 'e' || e.key === '+' || e.key === '-' || e.key === '.') {
            e.preventDefault();
        }
    });
    
    // Get all contribution checkboxes and their count inputs
    const contributionCheckboxes = document.querySelectorAll('input[name="contributionTypes"]');
    const countInputs = document.querySelectorAll('input[id$="-count"]');
    
    // Calculate total amount based on selected contributions
    function calculateTotal() {
        let total = 0;
        let hasValidSelections = false;
        
        contributionCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                // Handle student option differently
                if (checkbox.id === 'students') {
                    total += 55; // Add fixed price for one student
                    hasValidSelections = true;
                } else if (checkbox.id !== 'custom-donation') {
                    // Handle regular options (excluding custom donation)
                    const price = parseFloat(checkbox.dataset.price);
                    const countId = checkbox.id + '-count';
                    const countInput = document.getElementById(countId);
                    const count = parseInt(countInput.value) || 0;
                    total += price * count;
                    
                    if (count > 0) {
                        hasValidSelections = true;
                    }
                }
            }
        });
        
        // Add custom donation amount (always check for it)
        const customDonationAmount = parseFloat(document.getElementById('custom-donation-amount').value) || 0;
        if (customDonationAmount > 0) {
            total += customDonationAmount;
            hasValidSelections = true;
        }
        
        totalAmount.textContent = `€${total}`;
    }
    
    // Function to handle option disabling
    function handleOptionDisabling(checkbox) {
        const adultCheckbox = document.getElementById('adult');
        const childrenCheckbox = document.getElementById('children');
        const childrenUnder5Checkbox = document.getElementById('children-under-5');
        const studentCheckbox = document.getElementById('students');
        
        // Get the container divs
        const adultOption = adultCheckbox.closest('.contribution-option');
        const childrenOption = childrenCheckbox.closest('.contribution-option');
        const childrenUnder5Option = childrenUnder5Checkbox.closest('.contribution-option');
        const studentOption = studentCheckbox.closest('.contribution-option');

        if (checkbox.id === 'students') {
            // If student is selected/deselected
            const isStudentSelected = checkbox.checked;
            
            // Handle Regular and Children options
            adultCheckbox.disabled = isStudentSelected;
            childrenCheckbox.disabled = isStudentSelected;
            childrenUnder5Checkbox.disabled = isStudentSelected;
            
            // Add visual indication for disabled options
            adultOption.style.opacity = isStudentSelected ? '0.5' : '1';
            childrenOption.style.opacity = isStudentSelected ? '0.5' : '1';
            childrenUnder5Option.style.opacity = isStudentSelected ? '0.5' : '1';
            adultOption.style.cursor = isStudentSelected ? 'not-allowed' : 'pointer';
            childrenOption.style.cursor = isStudentSelected ? 'not-allowed' : 'pointer';
            childrenUnder5Option.style.cursor = isStudentSelected ? 'not-allowed' : 'pointer';
            
            if (isStudentSelected) {
                // Uncheck other options if student is selected
                if (adultCheckbox.checked) {
                    adultCheckbox.checked = false;
                    const adultCount = document.getElementById('adult-count');
                    adultCount.style.display = 'none';
                    adultCount.value = '0';
                    adultOption.style.borderColor = '#ddd';
                    adultOption.style.background = '#f8f9fa';
                }
                if (childrenCheckbox.checked) {
                    childrenCheckbox.checked = false;
                    const childrenCount = document.getElementById('children-count');
                    childrenCount.style.display = 'none';
                    childrenCount.value = '0';
                    childrenOption.style.borderColor = '#ddd';
                    childrenOption.style.background = '#f8f9fa';
                }
                if (childrenUnder5Checkbox.checked) {
                    childrenUnder5Checkbox.checked = false;
                    const childrenUnder5Count = document.getElementById('children-under-5-count');
                    childrenUnder5Count.style.display = 'none';
                    childrenUnder5Count.value = '0';
                    childrenUnder5Option.style.borderColor = '#ddd';
                    childrenUnder5Option.style.background = '#f8f9fa';
                }
            }
        } else {
            // If Regular or Children options are selected/deselected
            const isRegularOrChildrenSelected = adultCheckbox.checked || childrenCheckbox.checked || childrenUnder5Checkbox.checked;
            
            // Handle Student option
            studentCheckbox.disabled = isRegularOrChildrenSelected;
            
            // Add visual indication for disabled student option
            studentOption.style.opacity = isRegularOrChildrenSelected ? '0.5' : '1';
            studentOption.style.cursor = isRegularOrChildrenSelected ? 'not-allowed' : 'pointer';
            
            if (isRegularOrChildrenSelected && studentCheckbox.checked) {
                // Uncheck student if Regular or Children are selected
                studentCheckbox.checked = false;
                studentOption.style.borderColor = '#ddd';
                studentOption.style.background = '#f8f9fa';
            }
        }
        
        calculateTotal();
    }

    // Handle checkbox changes
    contributionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const countId = this.id + '-count';
            const countInput = document.getElementById(countId);
            const optionDiv = this.closest('.contribution-option');
            
            // Call handleOptionDisabling with the current checkbox
            handleOptionDisabling(this);
            
            if (this.checked) {
                if (this.id === 'custom-donation') {
                    // Handle custom donation
                    const customInputs = document.getElementById('custom-donation-inputs');
                    customInputs.style.display = 'block';
                    optionDiv.style.borderColor = '#FF6B35';
                    optionDiv.style.background = 'rgba(255, 107, 53, 0.05)';
                } else if (this.id === 'students') {
                    // Handle student option - no count needed
                    optionDiv.style.borderColor = '#FF6B35';
                    optionDiv.style.background = 'rgba(255, 107, 53, 0.05)';
                } else {
                    // Handle regular options
                    countInput.style.display = 'block';
                    countInput.value = '1';
                    optionDiv.style.borderColor = '#FF6B35';
                    optionDiv.style.background = 'rgba(255, 107, 53, 0.05)';
                }
            } else {
                if (this.id === 'custom-donation') {
                    // Handle custom donation
                    const customInputs = document.getElementById('custom-donation-inputs');
                    const warningElement = document.getElementById('custom-donation-warning');
                    customInputs.style.display = 'none';
                    document.getElementById('custom-donation-amount').value = '';
                    if (warningElement) {
                        warningElement.style.display = 'none';
                    }
                    optionDiv.style.borderColor = '#ddd';
                    optionDiv.style.background = '#f8f9fa';
                } else if (this.id === 'students') {
                    // Handle student option unchecked
                    optionDiv.style.borderColor = '#ddd';
                    optionDiv.style.background = '#f8f9fa';
                } else {
                    // Handle regular options
                    if (countInput) {
                        countInput.style.display = 'none';
                        countInput.value = '0';
                    }
                    optionDiv.style.borderColor = '#ddd';
                    optionDiv.style.background = '#f8f9fa';
                }
            }
            
            // Handle children-under-5 visibility based on adult selection
            updateChildrenUnder5Visibility();
            
            calculateTotal();
        });
    });
    
    // Function to update children-under-5 option visibility
    function updateChildrenUnder5Visibility() {
        const adultCheckbox = document.getElementById('adult');
        const childrenUnder5Option = document.getElementById('children-under-5').closest('.contribution-option');
        
        if (adultCheckbox.checked) {
            // Show children-under-5 option when adult is selected
            childrenUnder5Option.style.display = 'block';
            childrenUnder5Option.style.opacity = '1';
        } else {
            // Hide children-under-5 option when adult is not selected
            childrenUnder5Option.style.display = 'none';
            childrenUnder5Option.style.opacity = '0';
            
            // Uncheck and reset children-under-5 if adult is unchecked
            const childrenUnder5Checkbox = document.getElementById('children-under-5');
            const childrenUnder5Count = document.getElementById('children-under-5-count');
            if (childrenUnder5Checkbox.checked) {
                childrenUnder5Checkbox.checked = false;
                childrenUnder5Count.style.display = 'none';
                childrenUnder5Count.value = '0';
                childrenUnder5Option.style.borderColor = '#ddd';
                childrenUnder5Option.style.background = '#f8f9fa';
            }
        }
    }
    
    // Initialize children-under-5 visibility on page load
    updateChildrenUnder5Visibility();
    
    // Handle count input changes
    countInputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });
    
    // Handle custom donation input changes
    const customDonationAmount = document.getElementById('custom-donation-amount');
    
    if (customDonationAmount) {
        customDonationAmount.addEventListener('input', function() {
            const amount = parseFloat(this.value) || 0;
            const warningElement = document.getElementById('custom-donation-warning');
            
            // Visual feedback for amount
            if (amount > 0) {
                this.style.borderColor = '#228B22';
                this.style.boxShadow = '0 0 0 3px rgba(34, 139, 34, 0.1)';
                // Hide warning message
                if (warningElement) {
                    warningElement.style.display = 'none';
                }
            } else {
                this.style.borderColor = '#ddd';
                this.style.boxShadow = 'none';
                // Hide warning message when empty or zero
                if (warningElement) {
                    warningElement.style.display = 'none';
                }
            }
            
            calculateTotal();
        });
    }
    
    // Enhanced instantaneous email validation with visual indicators
    function validateEmails() {
        const emailValue = email.value.trim();
        const emailConfirmValue = emailConfirm.value.trim();
        
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Get or create validation message elements
        let emailMsg = document.getElementById('email-validation-msg');
        let emailConfirmMsg = document.getElementById('email-confirm-validation-msg');
        
        if (!emailMsg) {
            emailMsg = document.createElement('div');
            emailMsg.id = 'email-validation-msg';
            emailMsg.style.fontSize = '0.85rem';
            emailMsg.style.marginTop = '0.25rem';
            emailMsg.style.transition = 'all 0.3s ease';
            email.parentNode.appendChild(emailMsg);
        }
        
        if (!emailConfirmMsg) {
            emailConfirmMsg = document.createElement('div');
            emailConfirmMsg.id = 'email-confirm-validation-msg';
            emailConfirmMsg.style.fontSize = '0.85rem';
            emailConfirmMsg.style.marginTop = '0.25rem';
            emailConfirmMsg.style.transition = 'all 0.3s ease';
            emailConfirm.parentNode.appendChild(emailConfirmMsg);
        }
        
        // Validate first email field
        if (emailValue) {
            if (!emailRegex.test(emailValue)) {
                email.setCustomValidity('Please enter a valid email address');
                email.style.borderColor = '#ff4444';
                email.style.boxShadow = '0 0 0 3px rgba(255, 68, 68, 0.1)';
                emailMsg.textContent = '❌ Please enter a valid email address';
                emailMsg.style.color = '#ff4444';
            } else {
                email.setCustomValidity('');
                email.style.borderColor = '#228B22';
                email.style.boxShadow = '0 0 0 3px rgba(34, 139, 34, 0.1)';
                emailMsg.textContent = '✅ Valid email format';
                emailMsg.style.color = '#228B22';
            }
        } else {
            email.setCustomValidity('');
            email.style.borderColor = '#ddd';
            email.style.boxShadow = 'none';
            emailMsg.textContent = '';
        }
        
        // Validate second email field
        if (emailConfirmValue) {
            if (!emailRegex.test(emailConfirmValue)) {
                emailConfirm.setCustomValidity('Please enter a valid email address');
                emailConfirm.style.borderColor = '#ff4444';
                emailConfirm.style.boxShadow = '0 0 0 3px rgba(255, 68, 68, 0.1)';
                emailConfirmMsg.textContent = '❌ Please enter a valid email address';
                emailConfirmMsg.style.color = '#ff4444';
            } else if (emailValue && emailValue !== emailConfirmValue) {
                emailConfirm.setCustomValidity('Emails do not match');
                emailConfirm.style.borderColor = '#ff4444';
                emailConfirm.style.boxShadow = '0 0 0 3px rgba(255, 68, 68, 0.1)';
                emailConfirmMsg.textContent = '❌ Emails do not match';
                emailConfirmMsg.style.color = '#ff4444';
            } else if (emailValue && emailValue === emailConfirmValue) {
                emailConfirm.setCustomValidity('');
                emailConfirm.style.borderColor = '#228B22';
                emailConfirm.style.boxShadow = '0 0 0 3px rgba(34, 139, 34, 0.1)';
                emailConfirmMsg.textContent = '✅ Emails match perfectly!';
                emailConfirmMsg.style.color = '#228B22';
            } else {
                emailConfirm.setCustomValidity('');
                emailConfirm.style.borderColor = '#228B22';
                emailConfirm.style.boxShadow = '0 0 0 3px rgba(34, 139, 34, 0.1)';
                emailConfirmMsg.textContent = '✅ Valid email format';
                emailConfirmMsg.style.color = '#228B22';
            }
        } else {
            emailConfirm.setCustomValidity('');
            emailConfirm.style.borderColor = '#ddd';
            emailConfirm.style.boxShadow = 'none';
            emailConfirmMsg.textContent = '';
        }
    }
    
    // Add real-time validation with multiple event listeners for instant feedback
    email.addEventListener('input', validateEmails);
    email.addEventListener('blur', validateEmails);
    email.addEventListener('keyup', validateEmails);
    
    emailConfirm.addEventListener('input', validateEmails);
    emailConfirm.addEventListener('blur', validateEmails);
    emailConfirm.addEventListener('keyup', validateEmails);
    
    // Form submission to Google Sheets
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if at least one contribution type is selected
        const selectedContributions = document.querySelectorAll('input[name="contributionTypes"]:checked');
        if (selectedContributions.length === 0) {
            alert('Please select at least one contribution type.');
            return;
        }
        
        // Check if at least one contribution has a valid count
        const adultCount = parseInt(document.getElementById('adult-count').value) || 0;
        const childAboveCount = parseInt(document.getElementById('children-count').value) || 0;
        const childBelowCount = parseInt(document.getElementById('children-under-5-count').value) || 0;
        const customDonationInput = document.getElementById('custom-donation-amount');
        const customDonationAmount = parseFloat(customDonationInput.value) || 0;
        const isStudentSelected = document.getElementById('students').checked;
        
        const totalPeople = adultCount + (isStudentSelected ? 1 : 0) + childAboveCount + childBelowCount;
        
        if (totalPeople === 0 && customDonationAmount === 0) {
            alert('Please select at least one contribution type or enter an additional donation amount.');
            return;
        }
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Validate phone number format
        const phoneNumber = contact.value;
        if (phoneNumber.length < 9) {
            alert('Please enter a valid phone number (minimum 9 digits).');
            contact.focus();
            return;
        }
        
        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Prepare form data for Google Sheets
        const formData = new FormData(form);
        
        // Calculate total amount
        let totalAmountValue = (adultCount * 65) + (childAboveCount * 35);
        if (isStudentSelected) {
            totalAmountValue += 55;
        }
        totalAmountValue += customDonationAmount;
        
        // Handle Transaction ID
        const transactionId = document.getElementById('transactionId').value.trim();
        
        // Create data object for Google Script
        const data = {
            name: formData.get('name'),
            whatsapp: countryCode.value + formData.get('contact'), // Combine country code with number
            email: formData.get('email'),
            member_type: 'BCA Member',
            adult: adultCount,
            student: isStudentSelected ? 1 : 0,
            child_above: childAboveCount,
            child_below: childBelowCount,
            total_amount: totalAmountValue,
            payment_proof: transactionId || 'Not provided'
        };
        
        // Send to Google Sheets
        sendToGoogleSheets(data);
        
        
        function sendToGoogleSheets(data) {
            // Send to Registration Google Sheets
            const registrationScriptUrl = 'https://script.google.com/macros/s/AKfycbzF0ATmNUgdWwwmhQAn9PgXSTrd9LI1nnYCLBUHVWG-TPuarJyHsX_lOYZKA2Yejk2VmA/exec';
            
            console.log('Submitting registration data:', data);
            
            // Simple direct request (no CORS complications)
            fetch(registrationScriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(() => {
                console.log('✅ Registration submitted successfully!');
                console.log('📊 Check your Google Sheets for the entry');
                console.log('📁 Check your Google Drive folder for the file');
                
                // Hide form and show success message
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Reset form
                form.reset();
                totalAmount.textContent = '€0';
                
                // Reset contribution options styling
                contributionCheckboxes.forEach(checkbox => {
                    const countId = checkbox.id + '-count';
                    const countInput = document.getElementById(countId);
                    const optionDiv = checkbox.closest('.contribution-option');
                    
                    if (checkbox.id !== 'students') {
                        // Handle regular options
                        if (countInput) {
                            countInput.style.display = 'none';
                            countInput.value = '0';
                        }
                    }
                    
                    // Reset styling for all options
                    checkbox.checked = false;
                    optionDiv.style.borderColor = '#ddd';
                    optionDiv.style.background = '#f8f9fa';
                    optionDiv.style.opacity = '1';
                    optionDiv.style.cursor = 'pointer';
                    
                    // Re-enable all options
                    checkbox.disabled = false;
                });
                
                // Reset custom donation amount
                const customDonationInput = document.getElementById('custom-donation-amount');
                if (customDonationInput) {
                    customDonationInput.value = '';
                }
                
                // Reset children-under-5 visibility
                updateChildrenUnder5Visibility();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                console.log('Registration submitted successfully:', data);
            })
            .catch(error => {
                console.error('Error submitting registration:', error);
                
                // Try direct request as fallback (for production)
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('Trying direct request as fallback...');
                    
                    fetch(registrationScriptUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    })
                    .then(() => {
                        // Assume success for no-cors requests
                        console.log('Registration submitted via no-cors fallback');
                        
                        // Hide form and show success message
                        form.style.display = 'none';
                        successMessage.style.display = 'block';
                        
                        // Reset form and button
                        form.reset();
                        totalAmount.textContent = '€0';
                        
                        // Reset contribution options styling
                        contributionCheckboxes.forEach(checkbox => {
                            const countId = checkbox.id + '-count';
                            const countInput = document.getElementById(countId);
                            const optionDiv = checkbox.closest('.contribution-option');
                            
                            if (checkbox.id !== 'students') {
                                // Handle regular options
                                if (countInput) {
                                    countInput.style.display = 'none';
                                    countInput.value = '0';
                                }
                            }
                            
                            // Reset styling for all options
                            checkbox.checked = false;
                            optionDiv.style.borderColor = '#ddd';
                            optionDiv.style.background = '#f8f9fa';
                            optionDiv.style.opacity = '1';
                            optionDiv.style.cursor = 'pointer';
                            
                            // Re-enable all options
                            checkbox.disabled = false;
                        });
                        
                        // Reset custom donation amount
                        const customDonationInput = document.getElementById('custom-donation-amount');
                        if (customDonationInput) {
                            customDonationInput.value = '';
                        }
                        
                        // Reset children-under-5 visibility
                        updateChildrenUnder5Visibility();
                        
                        // Reset button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        // Scroll to success message
                        successMessage.scrollIntoView({ behavior: 'smooth' });
                    })
                    .catch(fallbackError => {
                        console.error('Fallback also failed:', fallbackError);
                        showError();
                    });
                } else {
                    showError();
                }
                
                function showError() {
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Show error message to user
                    alert('Registration failed. Please try again or contact support.');
                }
            });
        }
    });
    
    // Add focus effects to form inputs
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#FF6B35';
            this.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });
    

});

// Responsive slider sizing for any sliders on the page
function adjustSliderSize() {
    const slider = document.querySelector('.slideshow-container');
    if (slider) {
        if (window.innerWidth <= 768) {
            // Mobile
            slider.style.maxWidth = '100%';
            slider.style.height = '300px';
        } else if (window.innerWidth <= 1024) {
            // Tablet
            slider.style.maxWidth = '500px';
            slider.style.height = '350px';
        } else {
            // Desktop
            slider.style.maxWidth = '600px';
            slider.style.height = '400px';
        }
    }
}

// Adjust size on load and resize
window.addEventListener('load', adjustSliderSize);
window.addEventListener('resize', adjustSliderSize); 