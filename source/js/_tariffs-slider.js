(function() {
  /*
  Активируем слайдер на мобильном экране
  Убиваем слайдер на планшетном брейкпойнте
  Пример позаимствован здесь: https://codepen.io/aaronkahlhamer/pen/GveaXP
  */

  const breakpoint = window.matchMedia( '(min-width: 660px)' );

  let slider;

  function initSlider() {
    slider = new Swiper('.tariffs-table__slider', {
      wrapperClass: 'tariffs-table__wrapper',
      slideClass: 'tariffs-table__column',
    
      slidesPerView: 1.2,
      centeredSlides: true,
      initialSlide: 1,

      pagination: {
        el: '.tariffs-table__pagination',
        bulletClass: 'pagination__bullet',
        bulletActiveClass: 'pagination__bullet--active',
        clickable: true,
      }
    });
  }

  function breakpointChecker() {
    if (breakpoint.matches == true) {
      if (slider != undefined) slider.destroy(true, true);
      return;
    } else if (breakpoint.matches == false) {
      return initSlider();
    }
  }

  breakpoint.addEventListener('change', breakpointChecker);

  breakpointChecker();
})();