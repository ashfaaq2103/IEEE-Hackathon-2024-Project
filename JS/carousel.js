const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const carouselWrapper = document.querySelector('.carousel-wrapper');
let index = 0;

function updateCarousel() {
  const totalItems = document.querySelectorAll('.carousel-item').length;
  const offset = -index * 100;
  carouselWrapper.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
  index = (index > 0) ? index - 1 : 0;
  updateCarousel();
});

nextButton.addEventListener('click', () => {
  const totalItems = document.querySelectorAll('.carousel-item').length;
  index = (index < totalItems - 1) ? index + 1 : totalItems - 1;
  updateCarousel();
});
