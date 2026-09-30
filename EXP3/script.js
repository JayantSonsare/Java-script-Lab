document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPasswordBtn');
    const alertBox = document.getElementById('alertBox');

    // Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', function () {
        toggleVisibility(passwordInput, 'eyeOpenIcon', 'eyeClosedIcon');
    });

    toggleConfirmPasswordBtn.addEventListener('click', function () {
        toggleVisibility(confirmPasswordInput, 'confirmEyeOpenIcon', 'confirmEyeClosedIcon');
    });

    function toggleVisibility(inputEl, openIconId, closedIconId) {
        const openIcon = document.getElementById(openIconId);
        const closedIcon = document.getElementById(closedIconId);

        if (inputEl.type === 'password') {
            inputEl.type = 'text';
            openIcon.style.display = 'none';
            closedIcon.style.display = 'block';
        } else {
            inputEl.type = 'password';
            openIcon.style.display = 'block';
            closedIcon.style.display = 'none';
        }
    }

    // Input Listeners
    passwordInput.addEventListener('input', function () {
        validatePassword();
        checkPasswordMatch();
    });

    confirmPasswordInput.addEventListener('input', checkPasswordMatch);

    // Initial state setup for SVG icons
    resetRuleIcons();

    function resetRuleIcons() {
        const rules = ['ruleLength', 'ruleUppercase', 'ruleLowercase', 'ruleNumber', 'ruleSpecial'];
        rules.forEach(rule => setRuleState(rule, false));
    }

    function setRuleState(elementId, isValid) {
        const element = document.getElementById(elementId);
        if (!element) return;

        if (isValid) {
            element.classList.remove('invalid');
            element.classList.add('valid');
            element.querySelector('svg').innerHTML = `
                <circle cx="12" cy="12" r="10" fill="#10b981"></circle>
                <path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
            `;
        } else {
            element.classList.remove('valid');
            element.classList.add('invalid');
            element.querySelector('svg').innerHTML = `
                <circle cx="12" cy="12" r="10" fill="#cbd5e1"></circle>
                <path d="M12 8v4M12 16h.01" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
            `;
        }
    }

    function validatePassword() {
        const val = passwordInput.value;

        const hasLength = val.length >= 8;
        const hasUpper = /[A-Z]/.test(val);
        const hasLower = /[a-z]/.test(val);
        const hasDigit = /[0-9]/.test(val);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>_+\-=\[\]\\\/]/.test(val);

        setRuleState('ruleLength', hasLength);
        setRuleState('ruleUppercase', hasUpper);
        setRuleState('ruleLowercase', hasLower);
        setRuleState('ruleNumber', hasDigit);
        setRuleState('ruleSpecial', hasSpecial);

        // Count score (how many rules are satisfied)
        let score = 0;
        if (hasLength) score++;
        if (hasUpper) score++;
        if (hasLower) score++;
        if (hasDigit) score++;
        if (hasSpecial) score++;

        updateStrengthMeter(score);
        return score === 5;
    }

    function updateStrengthMeter(score) {
        const seg1 = document.getElementById('strengthSeg1');
        const seg2 = document.getElementById('strengthSeg2');
        const seg3 = document.getElementById('strengthSeg3');
        const label = document.getElementById('strengthLabel');

        // Reset segments background
        seg1.style.backgroundColor = '';
        seg2.style.backgroundColor = '';
        seg3.style.backgroundColor = '';

        if (score === 0) {
            label.innerHTML = '<span style="color: #cbd5e1;">Too Weak</span>';
        } else if (score <= 2) {
            seg1.style.backgroundColor = '#ef4444'; // Red
            label.innerHTML = '<span style="color: #ef4444;">Weak</span>';
        } else if (score <= 4) {
            seg1.style.backgroundColor = '#f59e0b'; // Orange/Yellow
            seg2.style.backgroundColor = '#f59e0b';
            label.innerHTML = '<span style="color: #f59e0b;">Medium</span>';
        } else if (score === 5) {
            seg1.style.backgroundColor = '#10b981'; // Green
            seg2.style.backgroundColor = '#10b981';
            seg3.style.backgroundColor = '#10b981';
            label.innerHTML = '<span style="color: #10b981;">Strong</span>';
        }
    }

    function checkPasswordMatch() {
        const pwd = passwordInput.value;
        const cpwd = confirmPasswordInput.value;
        const feedback = document.getElementById('confirmFeedback');

        if (cpwd === "") {
            feedback.style.display = "none";
            feedback.className = "feedback-message";
            return false;
        }

        feedback.style.display = "flex";
        if (pwd === cpwd) {
            feedback.className = "feedback-message match";
            feedback.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#10b981">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Passwords match
            `;
            return true;
        } else {
            feedback.className = "feedback-message mismatch";
            feedback.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#ef4444">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                Passwords do not match
            `;
            return false;
        }
    }

    // Submit handler
    window.handleFormSubmit = function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const isPasswordValid = validatePassword();
        const isMatch = checkPasswordMatch();

        alertBox.style.display = 'none';
        alertBox.className = 'alert-box';

        if (!isPasswordValid) {
            showAlert('Password does not meet all security requirements.', 'error');
            return false;
        }

        if (!isMatch) {
            showAlert('Passwords do not match.', 'error');
            return false;
        }

        showAlert(`Registration successful! Account created for <strong>${username}</strong>.`, 'success');
        return true;
    };

    function showAlert(message, type) {
        alertBox.innerHTML = message;
        alertBox.style.display = 'block';
        if (type === 'success') {
            alertBox.classList.add('alert-success');
        } else {
            alertBox.classList.add('alert-error');
        }
    }
});