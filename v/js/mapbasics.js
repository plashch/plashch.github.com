var country;

function centerShift (m){
  return ([m[0], m[1] - 0.055]);
}


ymaps.ready(function () {
  var geolocation = ymaps.geolocation,

  myMap = new ymaps.Map('map', {
      center: [55.753559, 37.409218],
      zoom: 11,
      controls: ['zoomControl']
  }, {
      searchControlProvider: 'yandex#search'
  });





  ymaps.geolocation.get().then(function (result) {
      var country = result.geoObjects.get(0).properties.get('metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName');

      $('#inputPlace').attr('placeholder', country);
  });

       $('.radio-button__radio_side_right, .wordwide').on('click', function(){
            myMap.setCenter([30.753559, -70.409218], 2, {
            checkZoomRange: true
          });
       });
       $('.radio-button__radio_side_left, .nearby').on('click', function(){
            myMap.setCenter([55.753559, 37.409218], 11, {
            checkZoomRange: true
          });
       });


      myMap.behaviors.disable('scrollZoom');

      myMap.controls
       .remove('zoomControl')
       .remove('rulerControl');




       var zoomControl = new ymaps.control.ZoomControl({options: { position: { right: 30, top: 200 }}});

      myMap.controls.add(zoomControl);


//Точки

var myPlacemark = new ymaps.Placemark([55.6789,37.8076],{
   hintContent: 'Благотворительный день города!'
});
var myPlacemark2 = new ymaps.Placemark([55.8292,37.6330],{
   hintContent: 'Фестиваль оркестров на ВДНХ'
},{
        preset: 'islands#redIcon'
    });

var myPlacemark3 = new ymaps.Placemark([55.7648,37.6387],{
   hintContent: 'Раздача еды и тепла бездомным людям'
});

var myPlacemark4 = new ymaps.Placemark([55.7282,37.6002],{
       hintContent: 'Раздача еды и тепла бездомным людям'
},{
      preset: 'islands#greenIcon'
});

var myPlacemark5 = new ymaps.Placemark([55.7053,37.5774],{
       hintContent: 'Шередарь'
},{
      preset: 'islands#yellowStretchyIcon'
});

var myPlacemark6 = new ymaps.Placemark([-33.8933,151.1710],{
       hintContent: 'Conservation Volunteers'
});
var myPlacemark7 = new ymaps.Placemark([43.8512,-69.6098],{
       hintContent: 'Appalachian Trail Conference'
});
var myPlacemark8 = new ymaps.Placemark([32.0494,34.7739],{
       hintContent: 'Appalachian Trail Conference'
});

var myPlacemark9 = new ymaps.Placemark([55.7341,37.5877],{
       hintContent: 'Последний звонок в Школе дизайна Яндекса'
},{
      preset: 'islands#greenIcon'
});




// Добавление на карту

myMap.geoObjects.add(myPlacemark);
myMap.geoObjects.add(myPlacemark2);
myMap.geoObjects.add(myPlacemark3);
myMap.geoObjects.add(myPlacemark4);
myMap.geoObjects.add(myPlacemark5);
myMap.geoObjects.add(myPlacemark6);
myMap.geoObjects.add(myPlacemark7);
myMap.geoObjects.add(myPlacemark8);
myMap.geoObjects.add(myPlacemark9);


// Сценарии

var myPlacemarkCenter = centerShift(myPlacemark.geometry.getCoordinates());
myPlacemark.events.add('click', function () {
  $('.events-list li').removeClass('active');
  $('#event-1').addClass('active');
  myMap.setCenter(myPlacemarkCenter, 13);
  location.href = '#event-1';

});
$('#event-1').on('click',function(){
    myMap.setCenter(myPlacemarkCenter, 13);
});

var myPlacemark2Center = centerShift(myPlacemark2.geometry.getCoordinates());
myPlacemark2.events.add('click', function () {
  $('.events-list li').removeClass('active');
  $('#event-2').addClass('active');
  myMap.setCenter(myPlacemark2Center, 13);
  location.href = '#event-2';
});
$('#event-2').on('click',function(){
    myMap.setCenter(myPlacemark2Center, 13);

});

var myPlacemark3Center = centerShift(myPlacemark3.geometry.getCoordinates());
myPlacemark3.events.add('click', function () {
  $('.events-list li').removeClass('active');
  $('#event-3').addClass('active');
  myMap.setCenter(myPlacemark3Center, 13);
  location.href = '#event-3';
});
$('#event-3').on('click',function(){
    myMap.setCenter(myPlacemark3Center, 13);

});

var myPlacemark4Center = centerShift(myPlacemark4.geometry.getCoordinates());
myPlacemark4.events.add('click', function () {
  $('.events-list li').removeClass('active');
  $('#event-4').addClass('active');
  myMap.setCenter(myPlacemark4Center, 13);
  location.href = '#event-4';
});
$('#event-4').on('click',function(){
    myMap.setCenter(myPlacemark4Center, 13);
});

var myPlacemark5Center = centerShift(myPlacemark5.geometry.getCoordinates());
myPlacemark5.events.add('click', function () {
  $('.events-list li').removeClass('active');
  $('#event-5').addClass('active');
  myMap.setCenter(myPlacemark5Center, 13);
  location.href = '#event-5';
});
$('#event-5').on('click',function(){
    myMap.setCenter(myPlacemark5Center, 13);
});

var myPlacemark9Center = centerShift(myPlacemark9.geometry.getCoordinates());
myPlacemark9.events.add('click', function () {
  $('.events-list li').removeClass('active');
  $('#event-9').addClass('active');
  myMap.setCenter(myPlacemark9Center, 13);
  location.href = '#event-9';
});
$('#event-9').on('click',function(){
    myMap.setCenter(myPlacemark9Center, 13);
});






$('.events__local .events-list li').on('click', function(e){

      var element = e.target;

      if (!$(element).hasClass('add')){
        location.href = 'inner_page.html';
      }


});


$('.events-list li .add').on('click', function(){


  if(!$(this).parents('li').hasClass('active')){
      $('.events-list li').removeClass('active');
      $(this).parents('li').addClass('active');
  } else {

    myMap.setCenter([55.753559, 37.409218], 11, {
        checkZoomRange: true
    });

    $('.events-list li').removeClass('active');

    return false;
  }
});





});
