let currentSlide = 0;
let slides = [];
let slideshow = null;

function updateSlides() {
    slides.forEach((slide, idx) => {
        slide.classList.toggle("active", idx === currentSlide);
    });
}

function showSlideShow(direction) {
    if (!slides.length) return;

    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlides();
}

export function initSlideshow() {
    slides = Array.from(document.querySelectorAll(".slide"));
    slideshow = document.getElementById("slideshow");

    if (!slideshow || slides.length === 0) {
        console.warn("Geen slideshow gevonden — init verlaten.");
        return;
    }

    // eerste slide
    currentSlide = 0;
    updateSlides();

    // swipe support
    let startX = null;

    slideshow.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    slideshow.addEventListener("touchend", e => {
        if (!startX) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) showSlideShow(1);
            else showSlideShow(-1);
        }
        startX = null;
    });

    // 🔥 maak globale functies voor knoppen
    window.showSlideShow = showSlideShow;
}
