(function () {
    const mapWrapper = document.querySelector('.map__interactive');
    let mapLoading = false;

    if (mapWrapper) {
        prepareMap();
    }

    function prepareMap() {
        mapWrapper.addEventListener("click", loadMap);
    }

    function loadMap() {
        if (!mapLoading) {
            mapLoading = true;

            const mapMessage = mapWrapper.querySelector('p');
            mapMessage.innerHTML = 'Загрузка карты..';

            const script = document.createElement('script');
            script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

            document.body.appendChild(script);

            let timeout = 100;
            const poll = function() {
                setTimeout(function() {
                    timeout--;

                    if (typeof ymaps !== 'undefined') {
                        ymaps.ready(initMap);
                    } else if (timeout > 0) {
                        poll();
                    } else {
                      mapMessage.innerHTML = 'Не удалось загрузить карту :(';
                    }
                }, 100);
            };

            poll();
        }
    }

    function initMap() {
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

})();
