
(function() {
    'use strict';

    const TARGET_MONTH = 11; // December (0-indexed: Jan=0, Dec=11)
    const TARGET_DAY = 1;
    
    /**
     * @returns {Date} The target launch date object.
     */
    function getTargetDate() {
        const now = new Date();
        const currentYear = now.getFullYear();
        

        let target = new Date(currentYear, TARGET_MONTH, TARGET_DAY, 0, 0, 0);

        if (now.getTime() > target.getTime()) {
            target = new Date(currentYear + 1, TARGET_MONTH, TARGET_DAY, 0, 0, 0);
        }

        return target;
    }

    /**
     * Updates the DOM elements with the remaining time.
     * @param {Date} targetDate - The future date to count down to.
     */
    function updateTimer(targetDate) {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        if (distance < 0) {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            
            const title = document.querySelector('.title');
            if (title) title.innerText = "WE ARE LIVE!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    }

    /**
     */
    function init() {
        const targetDate = getTargetDate();
        
        updateTimer(targetDate);
        
        setInterval(() => {
            updateTimer(targetDate);
        }, 1000);
        
        console.log(`Countdown initialized. Target: ${targetDate}`);
    }

    document.addEventListener('DOMContentLoaded', init);

})();
