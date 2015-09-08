var showList = function(){
  $('body').addClass('list');
  $("#srch").val('бизнес-ланч Парк Культуры');
}

$(function() {
  var availableTags = [
    "бизнес-ланч Парк Культуры",
    "бизнес",
    "бизнес-ланч",
    "Парк",
    "Культуры",
    "бабочка",
    "багаж"
  ];
  $( "#srch" ).autocomplete({
    source: availableTags
  });

  $('body').addClass('done');

  $('#showTools').on('click', function(){
      $('body').toggleClass('show-tools');
  });

  $('.button').on('click', function(){
    showList();
  })

  document.onkeyup = function (e) {
      e = e || window.event;
      if (e.keyCode === 13) {
          showList();
      }
      return false;
    }

});
