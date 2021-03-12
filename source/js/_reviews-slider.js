const reviewSlider = new Swiper('.reviews-slider__container', {
  loop: true,
  wrapperClass: 'reviews-slider__list',

  pagination: {
    el: '.reviews-slider__pagination',
    bulletClass: 'pagination__bullet',
    bulletActiveClass: 'pagination__bullet--active',
    clickable: true,
  }
});


// Костыль, сделанный с целью назначить кнопки навигации за пределами слайдер-контейнера.

// Выход не очень элегантный, но другого способа сделать в десктопном слайдере отсупы и чтобы кнопки располагались за контейнером, не нашел.

reviewSlider.nextBtn = document.querySelector('.reviews-slider__nav-btn--next');
reviewSlider.prevBtn = document.querySelector('.reviews-slider__nav-btn--prev');

reviewSlider.nextBtn.addEventListener("click", function() {
  reviewSlider.slideNext();
});

reviewSlider.prevBtn.addEventListener("click", function() {
  reviewSlider.slidePrev();
});