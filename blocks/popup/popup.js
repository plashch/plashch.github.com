(function() {

    var popupClose = function() {

        $(this).closest('.popup').fadeOut();

    };

    $(function() {
        $('.popup__header__cancel, popup__header__cancel-hover-label').click(popupClose);
    });

    $(function() {
        $('html').click(function(){
            $('.popup').fadeOut();
        });
    });

    $(function() {
        $('html').on('keyup', function(event){
            if(event.keyCode == 27) $('.popup').fadeOut();
        });
    });

    $(function() {
        $('.popup__wrapper, .field__change__pseudo-link, .field__notice-warning span').click(function(event){
            event.stopPropagation();
        });
    });

})();