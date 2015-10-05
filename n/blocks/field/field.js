(function() {

    var fieldLinkClick = function() {

        var popup = $(this).data('popup');

        $('.popup-' + popup).fadeIn();
        $('.popup-' + popup + ' input[type=text]').val('').removeClass('input-incorrect').removeClass('fieldset__field-input--ok');
        $('.popup-' + popup + ' input[type=password]').val('').removeClass('input-incorrect').removeClass('fieldset__field-input--ok');
        $('.error-block').hide();
    };

    $(function() {
        $('.field__change__pseudo-link, .field__notice__pseudo-link').click(fieldLinkClick);
    });

})();
