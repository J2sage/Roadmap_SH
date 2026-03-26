// script.js
document.addEventListener('DOMContentLoaded', function() {
    const birthdateInput = document.getElementById('birthdate');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultCard = document.getElementById('resultCard');
    const errorMessage = document.getElementById('errorMessage');
    const funFactElement = document.getElementById('funFact');
    
    // Set max date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    birthdateInput.max = `${yyyy}-${mm}-${dd}`;
    
    // Calculate age function
    function calculateAge(birthDate) {
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();
        
        // Adjust for negative days
        if (days < 0) {
            months--;
            // Get last day of previous month
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }
        
        return { years, months, days };
    }
    
    // Calculate total days lived
    function getTotalDays(birthDate) {
        const today = new Date();
        const timeDiff = today.getTime() - birthDate.getTime();
        return Math.floor(timeDiff / (1000 * 3600 * 24));
    }
    
    // Calculate detailed age information
    function getDetailedAge(birthDate) {
        const today = new Date();
        const age = calculateAge(birthDate);
        const totalDays = getTotalDays(birthDate);
        
        // Calculate total months
        const totalMonths = (age.years * 12) + age.months;
        
        // Calculate total weeks
        const totalWeeks = Math.floor(totalDays / 7);
        
        // Calculate total hours
        const totalHours = totalDays * 24;
        
        // Calculate total minutes
        const totalMinutes = totalHours * 60;
        
        // Calculate next birthday
        const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        const daysToBirthday = Math.ceil((nextBirthday - today) / (1000 * 3600 * 24));
        
        return {
            ...age,
            totalDays,
            totalWeeks,
            totalMonths,
            totalHours,
            totalMinutes,
            daysToBirthday
        };
    }
    
    // Generate fun facts based on age
    function generateFunFact(age, totalDays, daysToBirthday) {
        const facts = [
            `You have lived for approximately ${Math.floor(totalDays / 365.25)} years!`,
            `Your heart has beaten about ${Math.floor(totalDays * 100000)} times!`,
            `You have slept for approximately ${Math.floor(totalDays / 3)} days of your life!`,
            `You have taken about ${Math.floor(totalDays * 20000)} steps in your lifetime!`,
            `Your hair has grown about ${Math.floor(totalDays * 0.35)} cm since birth!`,
            `You have experienced about ${Math.floor(totalDays / 365.25)} New Year celebrations!`,
            `If you were a dog, you'd be ${Math.floor(totalDays / 365.25 * 7)} years old!`,
            `You have blinked approximately ${Math.floor(totalDays * 14400)} times!`,
            `Your fingernails have grown about ${Math.floor(totalDays * 0.1)} meters!`,
            `You've spent about ${Math.floor(totalDays / 30)} months eating meals!`
        ];
        
        // Add birthday-specific fact
        if (daysToBirthday === 0) {
            facts.push("🎉 Happy Birthday! Today is your special day! 🎉");
        } else if (daysToBirthday <= 7) {
            facts.push(`🎈 Your birthday is in just ${daysToBirthday} days! Get ready to celebrate! 🎈`);
        } else {
            facts.push(`📅 Your next birthday is in ${daysToBirthday} days!`);
        }
        
        // Add age milestone fact
        if (age.years === 18) {
            facts.push("🎊 Congratulations on turning 18! You're now an adult! 🎊");
        } else if (age.years === 21) {
            facts.push("🎉 Happy 21st birthday! You've reached a major milestone! 🎉");
        } else if (age.years === 50) {
            facts.push("🏆 Golden Jubilee! 50 years of amazing life! 🏆");
        } else if (age.years === 100) {
            facts.push("💯 Centenarian! 100 years of wisdom and experience! 💯");
        }
        
        return facts[Math.floor(Math.random() * facts.length)];
    }
    
    // Validate date
    function isValidDate(date) {
        return date instanceof Date && !isNaN(date);
    }
    
    // Main calculation function
    function calculate() {
        const birthdateValue = birthdateInput.value;
        
        if (!birthdateValue) {
            showError('Please select your birth date');
            return;
        }
        
        const birthDate = new Date(birthdateValue);
        
        if (!isValidDate(birthDate)) {
            showError('Please enter a valid date');
            return;
        }
        
        // Check if date is in future
        if (birthDate > new Date()) {
            showError('Birth date cannot be in the future');
            return;
        }
        
        // Check if date is too old (over 120 years)
        const ageInYears = (new Date() - birthDate) / (1000 * 3600 * 24 * 365.25);
        if (ageInYears > 120) {
            showError('Please enter a valid birth date (age cannot exceed 120 years)');
            return;
        }
        
        hideError();
        
        // Calculate age details
        const ageDetails = getDetailedAge(birthDate);
        
        // Update display
        document.getElementById('years').textContent = ageDetails.years;
        document.getElementById('months').textContent = ageDetails.months;
        document.getElementById('days').textContent = ageDetails.days;
        document.getElementById('totalDays').textContent = ageDetails.totalDays.toLocaleString();
        document.getElementById('totalWeeks').textContent = ageDetails.totalWeeks.toLocaleString();
        document.getElementById('totalMonths').textContent = ageDetails.totalMonths.toLocaleString();
        document.getElementById('totalHours').textContent = ageDetails.totalHours.toLocaleString();
        document.getElementById('totalMinutes').textContent = ageDetails.totalMinutes.toLocaleString();
        
        // Next birthday display
        let nextBirthdayText = '';
        if (ageDetails.daysToBirthday === 0) {
            nextBirthdayText = 'Today! 🎉 Happy Birthday! 🎉';
        } else if (ageDetails.daysToBirthday === 1) {
            nextBirthdayText = 'Tomorrow! 🎈';
        } else {
            nextBirthdayText = `${ageDetails.daysToBirthday} days`;
        }
        document.getElementById('nextBirthday').textContent = nextBirthdayText;
        
        // Generate and display fun fact
        const funFact = generateFunFact(
            { years: ageDetails.years },
            ageDetails.totalDays,
            ageDetails.daysToBirthday
        );
        funFactElement.textContent = funFact;
        
        // Show result card with animation
        resultCard.style.display = 'block';
        resultCard.classList.remove('fadeIn');
        void resultCard.offsetWidth; // Trigger reflow
        resultCard.classList.add('fadeIn');
        
        // Store in localStorage for persistence
        localStorage.setItem('lastCalculatedBirthdate', birthdateValue);
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        resultCard.style.display = 'none';
        
        // Auto-hide error after 3 seconds
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
    }
    
    function hideError() {
        errorMessage.classList.remove('show');
    }
    
    // Load last calculated date from localStorage
    function loadLastCalculated() {
        const lastDate = localStorage.getItem('lastCalculatedBirthdate');
        if (lastDate) {
            birthdateInput.value = lastDate;
            calculate();
        }
    }
    
    // Add event listeners
    calculateBtn.addEventListener('click', calculate);
    
    // Calculate on Enter key press
    birthdateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });
    
    // Real-time validation
    birthdateInput.addEventListener('change', function() {
        if (this.value) {
            const selectedDate = new Date(this.value);
            if (selectedDate > new Date()) {
                showError('Birth date cannot be in the future');
                this.value = '';
            }
        }
    });
    
    // Load last calculation on page load
    loadLastCalculated();
});

// Additional utility functions for more accurate calculations
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateAge, getTotalDays, isLeapYear };
}