// ==========================================================
// PARTE 1: CUENTA REGRESIVA
// ==========================================================
// La fecha debe ser 2026, 1 (Febrero), 14
const eventDate = new Date(2026, 1, 14, 20, 0, 0).getTime();

const updateCountdown = function() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) {
            countdownEl.innerHTML = "¡Llegó el Gran Día!";
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    if (document.getElementById("hours")) document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    if (document.getElementById("minutes")) document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    if (document.getElementById("seconds")) document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
};

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// ==========================================================
// PARTE 2: APERTURA DEL SOBRE Y MÚSICA
// ==========================================================
const coverPage = document.getElementById('cover');
const invitationContainer = document.getElementById('invitation-container');
const music = document.getElementById("background-music");

coverPage.addEventListener('click', function() {
    // 1. Oculta la página de cubierta
    coverPage.style.opacity = '0';
    
    // 2. Muestra el contenido principal después de 1 segundo
    setTimeout(() => {
        coverPage.style.display = 'none';
        invitationContainer.style.display = 'block';

        // 3. Inicia la música después de la interacción del clic
        music.play().catch(error => {
            console.log("Música iniciada por interacción.");
        });
        
    }, 1000); 
});


// ==========================================================
// PARTE 3: CARRUSEL DE FOTOS
// ==========================================================
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const dotsContainer = document.querySelector('.dots-container');
let currentSlide = 0;

if (slides.length > 0) {
    const showSlide = function(index) {
        const dots = document.querySelectorAll('.dot');
        
        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides[currentSlide].style.display = 'block';
        if (dots.length > currentSlide) {
            dots[currentSlide].classList.add('active');
        }
    };

    // Inicializa los puntos de navegación
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dot);
    });

    if(prevButton) prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
    if(nextButton) nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
    
    showSlide(currentSlide);
    setInterval(() => showSlide(currentSlide + 1), 5000);
}