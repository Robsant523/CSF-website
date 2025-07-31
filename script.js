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

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('overlay');
    
    navMenu.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Auto-advance slideshow every 5 seconds
setInterval(nextSlide, 5000);

const events = [
    {
        date: '2025-08-15',
        title: 'CSF Welcome Back Meeting',
        description: 'Join us for our first meeting of the school year! We\'ll discuss membership requirements, upcoming events, and volunteer opportunities. Pizza will be provided!'
    },
    {
        date: '2025-08-22',
        title: 'Community Service: Food Bank',
        description: 'Help pack food donations at the local food bank. This counts toward your required community service hours. Meet at school at 9:00 AM.'
    },
    {
        date: '2025-09-05',
        title: 'Study Group Session',
        description: 'Peer tutoring session for all subjects. Senior CSF members will be available to help underclassmen with coursework.'
    },
    {
        date: '2025-09-12',
        title: 'Officer Elections',
        description: 'Elections for CSF cabinet positions. Applications due by September 10th. All current members are eligible to vote.'
    },
    {
        date: '2025-09-20',
        title: 'San Diego Zoo Field Trip',
        description: 'Annual educational field trip to the San Diego Zoo. Transportation and admission included. Limited spots available - sign up early!'
    },
    {
        date: '2025-10-10',
        title: 'Scholarship Workshop',
        description: 'Learn about available scholarships and get help with applications. Guest speakers from local colleges will be present.'
    },
    {
        date: '2025-10-25',
        title: 'Halloween Fundraiser',
        description: 'Costume contest and bake sale to raise funds for upcoming activities. Prizes for best costumes in each category!'
    },
    {
        date: '2025-11-15',
        title: 'Thanksgiving Food Drive',
        description: 'Annual food drive to help local families during Thanksgiving. Collection boxes will be placed around campus.'
    }
];

// Add event flyer images here - just add image paths to this array
const eventFlyers = [
    'flyer1.png',
    'flyer2.png',
    'flyer3.png',
    'flyer4.png',
    'flyer5.png',
    'flyer6.png',
    'flyer7.png',
    'flyer8.png'
];

// ================================
// CALENDAR FUNCTIONALITY
// ================================

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    
    // Clear existing calendar
    calendarGrid.innerHTML = '';
    
    // Set month/year display
    currentMonthElement.textContent = `${months[currentMonth]} ${currentYear}`;
    
    // Add day headers
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    // Add empty cells for previous month
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayCell = createDayCell(daysInPrevMonth - i, true);
        calendarGrid.appendChild(dayCell);
    }
    
    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = createDayCell(day, false);
        calendarGrid.appendChild(dayCell);
    }
    
    // Add empty cells for next month
    const remainingCells = 42 - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
        const dayCell = createDayCell(day, true);
        calendarGrid.appendChild(dayCell);
    }
}

function createDayCell(day, isOtherMonth) {
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day';
    
    if (isOtherMonth) {
        dayCell.classList.add('other-month');
    }
    
    // Check if this is today
    const today = new Date();
    if (!isOtherMonth && 
        day === today.getDate() && 
        currentMonth === today.getMonth() && 
        currentYear === today.getFullYear()) {
        dayCell.classList.add('today');
    }
    
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);
    
    // Check for events on this day
    if (!isOtherMonth) {
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(event => event.date === dateString);
        
        if (dayEvents.length > 0) {
            dayCell.classList.add('has-event');
            dayEvents.forEach(event => {
                const eventIndicator = document.createElement('div');
                eventIndicator.className = 'event-indicator';
                eventIndicator.textContent = event.title;
                dayCell.appendChild(eventIndicator);
            });
            
            // Add click event to show details
            dayCell.addEventListener('click', () => showEventDetails(dayEvents[0]));
        }
    }
    
    return dayCell;
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
}

function showEventDetails(event) {
    document.getElementById('modalTitle').textContent = event.title;
    document.getElementById('modalDate').textContent = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('modalDescription').textContent = event.description;
    document.getElementById('eventModal').style.display = 'block';
}

function closeEventModal() {
    document.getElementById('eventModal').style.display = 'none';
}

// ================================
// REVOLVING SLIDESHOW FUNCTIONALITY
// ================================

function generateSlideshow() {
    const slideshowTrack = document.getElementById('slideshowTrack');
    
    // Clear existing content
    slideshowTrack.innerHTML = '';
    
    // If no flyers, show placeholder
    if (eventFlyers.length === 0) {
        const placeholderSlide = document.createElement('div');
        placeholderSlide.className = 'slideshow-slide';
        placeholderSlide.innerHTML = '<div class="slideshow-placeholder">No event flyers available</div>';
        slideshowTrack.appendChild(placeholderSlide);
        return;
    }
    
    // Create slides - duplicate the array to ensure seamless looping
    const allFlyers = [...eventFlyers, ...eventFlyers];
    
    allFlyers.forEach((flyer, index) => {
        const slide = document.createElement('div');
        slide.className = 'slideshow-slide';
        slide.style.backgroundImage = `url('${flyer}')`;
        slide.title = `Event Flyer ${(index % eventFlyers.length) + 1}`;
        slideshowTrack.appendChild(slide);
    });
    
    // Adjust animation speed based on number of flyers
    if (eventFlyers.length <= 4) {
        slideshowTrack.classList.add('speed-slow');
    } else if (eventFlyers.length <= 6) {
        slideshowTrack.classList.add('speed-medium');
    } else {
        slideshowTrack.classList.add('speed-fast');
    }
}

// ================================
// MENU FUNCTIONALITY (from existing pages)
// ================================

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('overlay');
    
    navMenu.classList.toggle('open');
    overlay.classList.toggle('open');
}

// ================================
// INITIALIZE PAGE
// ================================

document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    generateSlideshow();
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('eventModal');
        if (event.target === modal) {
            closeEventModal();
        }
    });
});