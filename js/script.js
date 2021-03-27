let nojs = document.querySelector('html.nojs');

if (nojs) {
  nojs.removeAttribute('class');

};
// Взято здесь: https://gist.github.com/Protoff/d6643387f03d47b44b2d7c3cf7b3e0a0

document.addEventListener('DOMContentLoaded', function() {
  testWebP(document.body)
})

function testWebP(elem) {
  const webP = new Image();
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  webP.onload = webP.onerror = function () {
    webP.height === 2 ? elem.classList.add('webp') : elem.classList.add('no-webp')
  }
};

const handSlider = new Swiper('.hand-slider__screen-wrapper', {
  loop: true,

  autoplay: {
    delay: 3000,
  }
});;
const burgerBtn = document.querySelector('.burger-btn');
const navPanel = document.querySelector('.main-nav');

burgerBtn.addEventListener('click', function() {
  navPanel.classList.toggle('_active');
});;

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

if (document.querySelector('.reviews-slider__container')) {
  reviewSlider.nextBtn = document.querySelector('.reviews-slider__nav-btn--next');
  reviewSlider.prevBtn = document.querySelector('.reviews-slider__nav-btn--prev');
  
  reviewSlider.nextBtn.addEventListener("click", function() {
    reviewSlider.slideNext();
  });
  
  reviewSlider.prevBtn.addEventListener("click", function() {
    reviewSlider.slidePrev();
  });
}

;

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
})();;

(function () {
    const mapWrapper = document.querySelector('.map__interactive');
    let mapInit = false;

    if (mapWrapper) {
        const script = document.createElement('script');
        script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

        document.body.appendChild(script);

        let timeout = 100;
        const poll = function() {
            setTimeout(function() {
                timeout--;
                
                if (typeof ymaps !== 'undefined') {
                    ymaps.ready(prepareMap);
                } else if (timeout > 0) {
                    poll();
                } else {
                    console.log('Не удалось загрузить карту');
                }
            }, 100);
        };

        poll();
    }
    
    function prepareMap() {
        mapWrapper.addEventListener("click", initMap);
    }

    function initMap() {
        if (!mapInit) {
            mapInit = true;

            mapWrapper.classList.add('map__interactive--init');

            let myMap = new ymaps.Map("map-interactive", {
                center: [59.938635, 30.323118],
                zoom: 17,
                controls: ["zoomControl"]
            });

            let myGeoObjects = [];

            myGeoObjects = new ymaps.Placemark([59.938635, 30.323118], {
                baloonContentBody: 'Текст в балуне',
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/svg/map-marker.svg',
                iconImageSize: [36,36],
                iconImageOffset: [-18, -18]
            });

            let clusterer = new ymaps.Clusterer({
                clusterDisableClickZoom: false,
                cluseterOpenBaloonOnClick: false,
            });

            clusterer.add(myGeoObjects);
            myMap.geoObjects.add(clusterer);

            myMap.behaviors.disable('scrollZoom');
        }
    }

})();;

(function() {

  const filter = document.querySelector('.photo-post__filters');

  if (filter) {
    initTabs();
  }

  function initTabs() {
    const elems = {
      btns: [
        {
          name: 'crop',
          el: document.querySelector('.photo-post__filter-btn--crop')
        },
        {
          name: 'fill',
          el: document.querySelector('.photo-post__filter-btn--fill')
        },
        {
          name: 'contrast',
          el: document.querySelector('.photo-post__filter-btn--contrast')
        }
      ],

      scales: [
        {
          name: 'crop',
          el: document.querySelector('.photo-post__filter-input--crop')
        },
        {
          name: 'fill',
          el: document.querySelector('.photo-post__filter-input--fill')
        },
        {
          name: 'contrast',
          el: document.querySelector('.photo-post__filter-input--contrast')
        }
      ]
    };

    elems.btns.forEach(i => {
      let name = i.name,
        el = i.el;

      let targetTab = null;

      for (let i = 0 ; i < elems.scales.length; i++) {
        if (elems.scales[i].name === name) {
          targetTab = elems.scales[i].el;
        }
      }

      el.addEventListener('click', ()=>{
        activateTab(targetTab, el);
      });
    });

    function activateTab(targetTab, currentBtn) {
      let activeBtnClass = 'photo-post__filter-btn--active',
        activeTabClass = 'photo-post__filter-input--active'

      let activeBtn = document.querySelector(`.${activeBtnClass}`),
        activeTab = document.querySelector(`.${activeTabClass}`);

      if (activeBtn) activeBtn.classList.remove(activeBtnClass);
      if (activeTab) activeTab.classList.remove(activeTabClass);

      currentBtn.classList.add(activeBtnClass);
      targetTab.classList.add(activeTabClass);
    }
  }

})();;

const
  competitionForm = document.querySelector('.competition-form'),
  modalWrapper = document.querySelector('.modal__wrapper'),
  modalFormError = document.querySelector('.competition__error'),
  modalFormSuccess = document.querySelector('.competition__success'),
  closeButtons = document.querySelectorAll('.modal__close'),
  submitBtn = document.querySelector('.competition-form__submit-btn');

// ОБработка формы

if (competitionForm) {
  submitBtn.addEventListener('click', tryToSubmit);
}

if (closeButtons) {
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', closeModal);
  }
}

function tryToSubmit(e) {
  e.preventDefault();

  if (competitionForm.checkValidity()) {
    submitFormData();
  } else {
    showModal(modalFormError);
  }
}

function submitFormData() {
  // Здесь "отправляем данные формы аяксом" и очищаем форму
  competitionForm.reset();

  showModal(modalFormSuccess);
}

// Операции с модальными окнами

function showModal(modal) {
  modalWrapper.classList.add('modal--visible');
  modal.classList.add('modal--visible');
}

function closeModal() {
  const modals = document.querySelectorAll('.modal--visible');

  for (let i = 0; i < modals.length; i++) {
    modals[i].classList.remove('modal--visible');
  }
};