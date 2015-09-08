
ymaps.ready(function () {
  var geolocation = ymaps.geolocation,

  myMap = new ymaps.Map('mapInner', {
      center: [55.7341,37.5877],
      zoom: 15,
      controls: ['zoomControl']
  }, {
      searchControlProvider: 'yandex#search'
  });

  myMap.behaviors.disable('scrollZoom');

  var myPlacemark = new ymaps.Placemark([55.7341,37.5877],{
         hintContent: 'Последний звонок в Школе дизайна Яндекса'
  },{
        preset: 'islands#redIcon'
  });

  myMap.geoObjects.add(myPlacemark);




});
