const slideWidth = 400;
const imageNumber = 5;
let currentIndex = 0;
let autoSlideTimer;

function moveToSlide(index) {
  if (index >= 0 && index < imageNumber) {
    const offset = -index * slideWidth;
    carouselDiv.style.transform = `translateX(${offset}px)`;
    currentIndex = index;
    updateNavButtons();
  }
}

function nextImage() {
  moveToSlide((currentIndex + 1) % imageNumber);
}

function previousImage() {
  moveToSlide((currentIndex - 1 + imageNumber) % imageNumber);
}

function updateNavButtons() {
  navButtons.forEach((button, index) => {
    button.style.opacity = index === currentIndex ? "1" : "0.5";
  });
}

function startAutoSlide() {
  autoSlideTimer = setInterval(nextImage, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlideTimer);
}

// select DOM elements
const prevButton = document.querySelector("#prev");
const nxtButton = document.querySelector("#nxt");
const slides = document.querySelectorAll("img");
const navButtons = document.querySelectorAll(".circles > button");
const carouselDiv = document.querySelector(".carousel-slides");

// Add event listeners
navButtons.forEach((button, index) => {
  button.addEventListener("click", function () {
    stopAutoSlide(); // Stop auto-slide on manual navigation
    moveToSlide(index);
    startAutoSlide(); // Restart auto-slide
  });
});

nxtButton.addEventListener("click", function () {
  stopAutoSlide();
  nextImage();
  startAutoSlide();
});

prevButton.addEventListener("click", function () {
  stopAutoSlide();
  previousImage();
  startAutoSlide();
});

// Initialize carousel
updateNavButtons();
startAutoSlide();
