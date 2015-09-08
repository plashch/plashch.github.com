$(function(){
  $(document).click(function(e) {
    if ($(e.target).closest(".select").length) return;
    $(".select").removeClass('active');
    e.stopPropagation();

    if ($(e.target).closest(".radio-button__radio_side_left").length) return;
    $(".radio-button__radio_side_left").removeClass('active');
    e.stopPropagation();
  });

$('#add, .form__item_display_right, .add-form .popup__close').on('click', function(){
    $('#add').toggleClass('active');
    $('body').toggleClass('add-event');
});


var top = $(document).scrollTop();
var firsHeight = $('.sub-header').outerHeight();
if (top < firsHeight) $("body").removeClass('fix');
else $("body").addClass('fix');


    $(window).scroll(function() {
        var top = $(document).scrollTop();
        var firsHeight = $('.sub-header').outerHeight();
        if (top < firsHeight) $("body").removeClass('fix');
        else $("body").addClass('fix');
    });










$('.radio-button__radio').on('click', function(e){
      e.preventDefault();
      if(!$(this).hasClass('radio-button__radio_pressed_yes')){
        $('.radio-button .radio-button__radio').removeClass('radio-button__radio_pressed_yes');

        if($(this).hasClass('radio-button__radio_side_right')){
          $('body').addClass('global');
        } else {
            $('body').removeClass('global');
        }

        $(this).addClass('radio-button__radio_pressed_yes');
        $('.radio-button .radio-button__radio').removeClass('active');
      }
      else if($(this).hasClass('radio-button__radio_pressed_yes') && $(this).hasClass('radio-button__radio_side_left') ) {

          $(this).toggleClass('active');
      }
      $('body').animate({scrollTop: $('#filter').offset().top}, 700);

      return false;

});

$('.select__coverage li').on('click', function(e){
      e.preventDefault();
      if(!$(this).hasClass('selected')){

        if($(this).hasClass('wordwide')){
          $('body').addClass('global');
        } else {
            $('body').removeClass('global');
        }
      }
      $('.select').removeClass('active');



      $('body').animate({scrollTop: $('#filter').offset().top}, 700);

      return false;

});





$('.select').on('click', function(){
  if(!$(this).hasClass('active')){
    $('.select').removeClass('active');
    $(this).addClass('active');
    $('.radio-button__radio').removeClass('active');




  } else{
    $(this).removeClass('active');

  }

});


$(".select li, .calendar, .search").on('click', function(e){
  if(!$(this).parents().hasClass('select__coverage')){
    e.preventDefault();
    e.stopPropagation();
    showShein();
  }


});

$('#showPopup').on('click', function(){
    $('body').addClass('popupShow');
    return false;
});
$('.popup__close').on('click', function(){
      $('body').removeClass('popupShow');
});

});
