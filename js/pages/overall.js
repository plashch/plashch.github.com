$(document).ready(function(){
    // обработка нажатия кнопки "ЧТО ТАКОЕ ZZIMA.COM"
    $('.z-foo__what-is-zzima').on('click', function(){
        if($(this).parent().hasClass('footer__opened')) {
            $('.z-foo-about').hide();
            $(this).parent().removeClass('footer__opened');
        } else {
            $('.z-foo-about').show();
            $(this).parent().addClass('footer__opened');
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        }
    });
    
    // обработка нажатия на кнопку "обновить капчу"
    $('.rerender-captcha').on('click', function(){
        
        $.ajax({
            url: "/index/rerender-captcha",
            type: "post",
            dataType: "json",
            beforeSend: function(){
                $('.captcha-error').hide();
            },
            success: function(response){
                if(response.id != undefined && response.image != undefined){
                    $('.captcha input[type=hidden]').val(response.id);
                    $('.captcha img').replaceWith(response.image);
                    return;
                }
                
                $('.captcha-error').html('Сервис временно недоступен. Повторите попытку позже').show();
            },
            error: function(){
                $('.captcha-error').html('Сервис временно недоступен. Повторите попытку позже').show();
            }
        });
        
    });
});