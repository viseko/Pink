(function () {
    ymaps.ready(prepareMap);

    let mapInit = false;
    const mapWrapper = document.querySelector('.map__interactive');

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
        }
    }

})();