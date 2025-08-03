// Registration Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const totalAmount = document.getElementById('totalAmount');
    const email = document.getElementById('email');
    const emailConfirm = document.getElementById('emailConfirm');
    const successMessage = document.getElementById('successMessage');
    
    // Category selection elements
    const categorySelect = document.getElementById('categorySelect');
    const bcaMembersOptions = document.getElementById('bcaMembersOptions');
    const guestsOptions = document.getElementById('guestsOptions');
    
    // Get all contribution checkboxes and their count inputs
    const contributionCheckboxes = document.querySelectorAll('input[name="contributionTypes"]');
    const countInputs = document.querySelectorAll('input[id$="-count"]');
    
    // Handle category selection
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            
            // Hide all options first
            bcaMembersOptions.style.display = 'none';
            guestsOptions.style.display = 'none';
            
            // Uncheck all checkboxes and reset counts
            contributionCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                const countId = checkbox.id + '-count';
                const countInput = document.getElementById(countId);
                if (countInput) {
                    countInput.style.display = 'none';
                    countInput.value = '0';
                }
                
                // Reset styling
                const optionDiv = checkbox.closest('.contribution-option');
                if (optionDiv) {
                    optionDiv.style.borderColor = '#ddd';
                    optionDiv.style.background = '#f8f9fa';
                }
            });
            
            // Show selected category options
            if (selectedCategory === 'bca-members') {
                bcaMembersOptions.style.display = 'grid';
            } else if (selectedCategory === 'guests') {
                guestsOptions.style.display = 'grid';
            }
            
            // Reset total amount
            totalAmount.textContent = '€0';
            
            // Hide bank information
            const bankInfo = document.getElementById('bankInfo');
            if (bankInfo) {
                bankInfo.style.display = 'none';
            }
        });
    }
    
    // Calculate total amount based on selected contributions
    function calculateTotal() {
        let total = 0;
        let hasValidSelections = false;
        
        contributionCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = parseFloat(checkbox.dataset.price);
                const countId = checkbox.id + '-count';
                const countInput = document.getElementById(countId);
                const count = parseInt(countInput.value) || 0;
                total += price * count;
                
                if (count > 0) {
                    hasValidSelections = true;
                }
            }
        });
        
        totalAmount.textContent = `€${total}`;
        
        // Show/hide bank information based on selections
        const bankInfo = document.getElementById('bankInfo');
        if (hasValidSelections && total > 0) {
            bankInfo.style.display = 'block';
            bankInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            bankInfo.style.display = 'none';
        }
    }
    
    // Handle checkbox changes
    contributionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const countId = this.id + '-count';
            const countInput = document.getElementById(countId);
            const optionDiv = this.closest('.contribution-option');
            
            if (this.checked) {
                countInput.style.display = 'block';
                countInput.value = '1';
                optionDiv.style.borderColor = '#FF6B35';
                optionDiv.style.background = 'rgba(255, 107, 53, 0.05)';
            } else {
                countInput.style.display = 'none';
                countInput.value = '0';
                optionDiv.style.borderColor = '#ddd';
                optionDiv.style.background = '#f8f9fa';
            }
            
            calculateTotal();
        });
    });
    
    // Handle count input changes
    countInputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });
    
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
        
        // Check if all selected contributions have valid counts
        let hasValidCounts = false;
        selectedContributions.forEach(checkbox => {
            const countId = checkbox.id + '-count';
            const countInput = document.getElementById(countId);
            const count = parseInt(countInput.value) || 0;
            if (count > 0) {
                hasValidCounts = true;
            }
        });
        
        if (!hasValidCounts) {
            alert('Please enter a count greater than 0 for at least one selected contribution type.');
            return;
        }
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Prepare form data for Google Sheets
        const formData = new FormData(form);
        
        // Get contribution details
        let contributionDetails = [];
        let totalAmountValue = 0;
        
        selectedContributions.forEach(checkbox => {
            const countId = checkbox.id + '-count';
            const countInput = document.getElementById(countId);
            const count = parseInt(countInput.value) || 0;
            const price = parseFloat(checkbox.dataset.price);
            const total = price * count;
            
            if (count > 0) {
                contributionDetails.push(`${checkbox.nextElementSibling.textContent.trim()}: ${count} × €${price} = €${total}`);
                totalAmountValue += total;
            }
        });
        
        // Handle file upload
        const fileInput = document.getElementById('paymentProof');
        let fileData = null;
        let fileName = null;
        
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            fileName = file.name;
            
            // Convert file to base64
            const reader = new FileReader();
            reader.onload = function(e) {
                fileData = e.target.result.split(',')[1]; // Remove data URL prefix
                
                // Create data object for Google Sheets
                const data = {
                    name: formData.get('name'),
                    contact: formData.get('contact'),
                    email: formData.get('email'),
                    contributionTypes: contributionDetails.join('; '),
                    totalAmount: `€${totalAmountValue}`,
                    fileData: fileData,
                    fileName: fileName,
                    timestamp: new Date().toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })
                };
                
                // Send to Google Sheets
                sendToGoogleSheets(data);
            };
            
            reader.readAsDataURL(file);
        } else {
            // No file uploaded
            const data = {
                name: formData.get('name'),
                contact: formData.get('contact'),
                email: formData.get('email'),
                contributionTypes: contributionDetails.join('; '),
                totalAmount: `€${totalAmountValue}`,
                timestamp: new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
            };
            
            // Send to Google Sheets
            sendToGoogleSheets(data);
        }
        
        function sendToGoogleSheets(data) {
            // Send to Registration Google Sheets
            const registrationScriptUrl = 'https://script.google.com/macros/s/AKfycbwIjRlrsRWljVPm2BuKhtofNE2hrEvlJqLQGmcekQkpIeqKcvm5whQNC_mm41QSerRN/exec';
            
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
                    
                    countInput.style.display = 'none';
                    countInput.value = '0';
                    optionDiv.style.borderColor = '#ddd';
                    optionDiv.style.background = '#f8f9fa';
                });
                
                // Hide bank information
                const bankInfo = document.getElementById('bankInfo');
                bankInfo.style.display = 'none';
                
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
    
    // File upload handling
    const fileInput = document.getElementById('paymentProof');
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload only JPG, PNG, or PDF files.');
                this.value = '';
                return;
            }
            
            // Validate file size (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                alert('File size must be less than 5MB.');
                this.value = '';
                return;
            }
            
            // Show file name
            const fileName = file.name;
            const fileInfo = document.createElement('div');
            fileInfo.style.cssText = 'color: #228B22; font-size: 0.9rem; margin-top: 0.5rem; font-weight: 600;';
            fileInfo.textContent = `✓ ${fileName} selected`;
            
            // Remove previous file info
            const prevFileInfo = this.parentNode.querySelector('div[style*="color: #228B22"]');
            if (prevFileInfo) {
                prevFileInfo.remove();
            }
            
            this.parentNode.appendChild(fileInfo);
        }
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