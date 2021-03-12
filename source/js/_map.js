(function () {
    ymaps.ready(initMap);

    function initMap() {
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

        // myMap.behaviours.disable('scrollZoom');
    }
})();