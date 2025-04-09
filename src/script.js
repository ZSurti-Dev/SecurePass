document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const strengthText = document.getElementById('strength');
    const strengthValue = document.getElementById('strengthValue');
    const strengthBar = document.getElementById('strengthBar');
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeSlashIcon = document.getElementById('eyeSlashIcon');
    
    // Requirement check elements
    const lengthIndicator = document.getElementById('lengthIndicator');
    const lengthCheckIcon = document.getElementById('lengthCheckIcon');
    const numberIndicator = document.getElementById('numberIndicator');
    const numberCheckIcon = document.getElementById('numberCheckIcon');
    const lowercaseIndicator = document.getElementById('lowercaseIndicator');
    const lowercaseCheckIcon = document.getElementById('lowercaseCheckIcon');
    const uppercaseIndicator = document.getElementById('uppercaseIndicator');
    const uppercaseCheckIcon = document.getElementById('uppercaseCheckIcon');
    const specialIndicator = document.getElementById('specialIndicator');
    const specialCheckIcon = document.getElementById('specialCheckIcon');

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.add('hidden');
            eyeSlashIcon.classList.remove('hidden');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('hidden');
            eyeSlashIcon.classList.add('hidden');
        }
    });

    // Check password strength
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let strength = 0;
        
        // Reset all indicators
        resetIndicators();
        
        if (password.length === 0) {
            updateStrengthUI(0, 'Empty', 'text-gray-500', 'bg-gray-300', '0%');
            return;
        }
        
        // Check length
        const hasValidLength = password.length >= 8;
        if (hasValidLength) {
            strength += 20;
            updateIndicator(lengthIndicator, lengthCheckIcon, true);
        }
        
        // Check for numbers
        const hasNumber = /[0-9]/.test(password);
        if (hasNumber) {
            strength += 20;
            updateIndicator(numberIndicator, numberCheckIcon, true);
        }
        
        // Check for lowercase letters
        const hasLowercase = /[a-z]/.test(password);
        if (hasLowercase) {
            strength += 20;
            updateIndicator(lowercaseIndicator, lowercaseCheckIcon, true);
        }
        
        // Check for uppercase letters
        const hasUppercase = /[A-Z]/.test(password);
        if (hasUppercase) {
            strength += 20;
            updateIndicator(uppercaseIndicator, uppercaseCheckIcon, true);
        }
        
        // Check for special characters
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        if (hasSpecial) {
            strength += 20;
            updateIndicator(specialIndicator, specialCheckIcon, true);
        }
        
        // Determine strength level
        if (strength <= 20) {
            updateStrengthUI(strength, 'Very Weak', 'text-red-600', 'bg-red-600', strength + '%');
        } else if (strength <= 40) {
            updateStrengthUI(strength, 'Weak', 'text-red-500', 'bg-red-500', strength + '%');
        } else if (strength <= 60) {
            updateStrengthUI(strength, 'Fair', 'text-yellow-500', 'bg-yellow-500', strength + '%');
        } else if (strength <= 80) {
            updateStrengthUI(strength, 'Good', 'text-green-400', 'bg-green-400', strength + '%');
        } else {
            updateStrengthUI(strength, 'Strong', 'text-green-600', 'bg-green-600', strength + '%');
        }
    });
    
    function updateStrengthUI(strength, label, textColor, barColor, width) {
        strengthText.textContent = 'Strength:';
        strengthValue.textContent = label;
        strengthValue.className = `text-base font-medium ${textColor}`;
        strengthBar.className = `${barColor} h-2.5 rounded-full transition-all duration-300`;
        strengthBar.style.width = width;
    }
    
    function updateIndicator(indicator, checkIcon, isValid) {
        if (isValid) {
            indicator.classList.remove('bg-gray-200');
            indicator.classList.add('bg-green-500');
            checkIcon.classList.remove('hidden');
        } else {
            indicator.classList.add('bg-gray-200');
            indicator.classList.remove('bg-green-500');
            checkIcon.classList.add('hidden');
        }
    }
    
    function resetIndicators() {
        const indicators = [
            { indicator: lengthIndicator, icon: lengthCheckIcon },
            { indicator: numberIndicator, icon: numberCheckIcon },
            { indicator: lowercaseIndicator, icon: lowercaseCheckIcon },
            { indicator: uppercaseIndicator, icon: uppercaseCheckIcon },
            { indicator: specialIndicator, icon: specialCheckIcon }
        ];
        
        indicators.forEach(item => {
            item.indicator.classList.add('bg-gray-200');
            item.indicator.classList.remove('bg-green-500');
            item.icon.classList.add('hidden');
        });
    }
});