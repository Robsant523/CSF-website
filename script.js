let currentSlideIndex = 1;
const totalSlides = 8;

function showSlide(n) {
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.slide');
    
    if (n > totalSlides) currentSlideIndex = 1;
    if (n < 1) currentSlideIndex = totalSlides;
    
    dots.forEach(dot => dot.classList.remove('active'));
    slides.forEach(slide => slide.classList.remove('active'));
    
    dots[currentSlideIndex - 1].classList.add('active');
    slides[currentSlideIndex - 1].classList.add('active');
}

function nextSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

function previousSlide() {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
}

function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
}

// Navigation menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('overlay');
    
    navMenu.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Calendar navigation
let currentDate = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function updateCalendarHeader() {
    const currentMonth = document.getElementById('currentMonth');
    currentMonth.textContent = monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendarHeader();
    // Here you would typically regenerate the calendar grid
    // generateCalendarGrid();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendarHeader();
    // Here you would typically regenerate the calendar grid
    // generateCalendarGrid();
}

// Event modal functions
function openEventModal(title, date, description) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDate').textContent = date;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('eventModal').style.display = 'block';
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    document.getElementById('eventModal').style.display = 'none';
    
    // Restore body scrolling
    document.body.style.overflow = '';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize calendar
    updateCalendarHeader();
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('eventModal');
        if (event.target == modal) {
            closeEventModal();
        }
    }
    
    // Close menu when clicking on overlay
    document.getElementById('overlay').addEventListener('click', function() {
        toggleMenu();
    });
    
    // Handle menu state changes for body overflow
    const navMenu = document.getElementById('navMenu');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (navMenu.classList.contains('open')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    observer.observe(navMenu, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Close menu on resize to prevent layout issues
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('navMenu');
            const overlay = document.getElementById('overlay');
            navMenu.classList.remove('open');
            overlay.classList.remove('open');
        }
    });
    
    // Touch event optimization for mobile
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
    
    // Handle escape key for modal and menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Close modal if open
            const modal = document.getElementById('eventModal');
            if (modal.style.display === 'block') {
                closeEventModal();
            }
            
            // Close menu if open
            const navMenu = document.getElementById('navMenu');
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        }
    });
});

// Optional: Calendar generation function for dynamic calendars
function generateCalendarGrid() {
    const calendarGrid = document.getElementById('calendarGrid');
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Clear existing calendar (except headers)
    const headers = calendarGrid.querySelectorAll('.calendar-day-header');
    calendarGrid.innerHTML = '';
    headers.forEach(header => calendarGrid.appendChild(header));
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Add previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayElement = createCalendarDay(daysInPrevMonth - i, true);
        calendarGrid.appendChild(dayElement);
    }
    
    // Add current month's days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = (year === today.getFullYear() && 
                        month === today.getMonth() && 
                        day === today.getDate());
        const dayElement = createCalendarDay(day, false, isToday);
        calendarGrid.appendChild(dayElement);
    }
    
    // Add next month's leading days
    const totalCells = calendarGrid.children.length - 7; // Subtract headers
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = createCalendarDay(day, true);
        calendarGrid.appendChild(dayElement);
    }
}

function createCalendarDay(dayNumber, isOtherMonth = false, isToday = false) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }
    
    if (isToday) {
        dayElement.classList.add('today');
    }
    
    const dayNumberElement = document.createElement('div');
    dayNumberElement.className = 'day-number';
    dayNumberElement.textContent = dayNumber;
    
    dayElement.appendChild(dayNumberElement);
    
    // Add click event for today
    if (isToday) {
        dayElement.onclick = () => openEventModal('Today', 
            `${monthNames[currentDate.getMonth()]} ${dayNumber}, ${currentDate.getFullYear()}`, 
            'Current day highlighted');
    }
    
    return dayElement;
}

// Sample events data structure (you can expand this)
const eventsData = {
    '2025-08-05': {
        title: 'CSF Meeting',
        description: 'Monthly CSF chapter meeting at 3:30 PM in Room 205'
    },
    '2025-08-12': {
        title: 'Community Service',
        description: 'Community service project at local food bank from 9:00 AM to 2:00 PM'
    },
    '2025-08-15': {
        title: 'Study Session',
        description: 'Group study session for upcoming semester in the library from 4:00 PM to 6:00 PM'
    },
    '2025-08-19': {
        title: 'Awards Ceremony',
        description: 'CSF Awards Recognition Ceremony in the auditorium at 7:00 PM'
    },
    '2025-08-25': {
        title: 'New Member Orientation',
        description: 'Orientation for new CSF members at 3:30 PM in Room 205'
    }
};

// Function to add events to calendar days (for dynamic calendar)
function addEventsToCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    Object.keys(eventsData).forEach(dateKey => {
        const eventDate = new Date(dateKey);
        if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
            const day = eventDate.getDate();
            const dayElements = document.querySelectorAll('.calendar-day:not(.other-month)');
            
            dayElements.forEach(dayElement => {
                const dayNumber = dayElement.querySelector('.day-number').textContent;
                if (parseInt(dayNumber) === day) {
                    dayElement.classList.add('has-event');
                    
                    const eventIndicator = document.createElement('div');
                    eventIndicator.className = 'event-indicator';
                    eventIndicator.textContent = eventsData[dateKey].title;
                    dayElement.appendChild(eventIndicator);
                    
                    dayElement.onclick = () => openEventModal(
                        eventsData[dateKey].title,
                        `${monthNames[month]} ${day}, ${year}`,
                        eventsData[dateKey].description
                    );
                }
            });
        }
    });
}

// Slideshow functionality (if needed)
function initializeSlideshow() {
    const slideshowTrack = document.getElementById('slideshowTrack');
    if (slideshowTrack) {
        // You can add dynamic slideshow functionality here
        // For now, it uses CSS animations
        
        // Pause animation on hover
        slideshowTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        slideshowTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
});