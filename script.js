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