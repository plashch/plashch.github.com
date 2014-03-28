var buttonDisabled = false;
var actions = {
    buttonText: '',
    delayedProccessTimeout: false,
    successMessage : function(block, message){
        block.removeClass('form__notice-failure').removeClass('form__notice-warning').removeClass('form__notice-info');
        block.addClass('form__notice-success');
        block.find('div').html(message);
        block.fadeIn('slow');
        setTimeout(function(){block.fadeOut('slow');}, 10000);
    },
    failureMessage : function(block, message){
        block.addClass('form__notice-failure');
        block.find('div').html(message);
        block.fadeIn('slow');
        setTimeout(function(){block.fadeOut('slow');}, 10000);
    },
    warningMessage : function(block, message){
        block.addClass('form__notice-warning');
        block.find('div').html(message);
        block.fadeIn('slow');
        setTimeout(function(){block.fadeOut('slow');}, 10000);
    },
    infoMessage : function(block, message){
        block.addClass('form__notice-info');
        block.find('div').html(message);
        block.fadeIn('slow');
        setTimeout(function(){block.fadeOut('slow');}, 10000);
    },
    validateEmail : function (email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    },
    enableButton : function (button) {
        button.html(self.buttonText);
        button.removeAttr('disable');
        button.removeClass('form__button-disabled');
    },
    disableButton : function (button) {
        self.buttonText = button.html();
        button.html('<div class="form__button__loading"></div>');
        button.attr('disable','disable');
        button.addClass('form__button-disabled');
    },
    delayedProccess : function(func){
        if(self.delayedProccessTimeout) clearTimeout(self.delayedProccessTimeout);
        self.delayedProccessTimeout = setTimeout(func, 3000);
    },
    clearTimeout : function() {
        if(self.delayedProccessTimeout) clearTimeout(self.delayedProccessTimeout);
    }
};


$(document).ready(function(){
    
    /* Действие, выполняемое по нажатии на кнопку "Сохранить настройки" */
    $('.form__settings #save-settings').on('click', function(){
        $(this).attr('disable','disable');
        var checked = $('.settings input[type=checkbox]').is(':checked') ? 1 : 0;
        $.ajax({
            url: "/account/subscribe-notification",
            type: "post",
            dataType: "json",
            data: {'isSubscribed' : checked},
            success: function(response){
                var noticeBlock = $('.form__settings .form__notice');
                actions.successMessage(noticeBlock, response.message);
            },
            error: function(){
                var noticeBlock = $('.form__settings .form__notice');
                actions.failureMessage(noticeBlock, "Сервис временно недоступен. Повторите попытку позже.");
            }
        });
        
    });
    
    /* Действие, выполняемое при каждом нажатии клавиши в поле нового email адреса */
    function validateEmail(){
        var submitButton = $('#set-new-email');
        $('input#new-email').removeClass('input-incorrect');
        
        if(actions.validateEmail($('input#new-email').val())){
            $('input#new-email').addClass('fieldset__field-input--ok');
            $('#change-email-error-block div').html('');
            $('#change-email-error-block').hide();
        } else {
            $('input#new-email').addClass('input-incorrect');
            $('input#new-email').removeClass('fieldset__field-input--ok');
            $('#change-email-error-block div').html('Вы ввели неверный Email адрес');
            $('#change-email-error-block').show();
        }
    };
    
    /* Действие, выполняемое по нажатии на кнопку "Изменить email" */
    function setNewEmail(){
        actions.clearTimeout();
        if($('#set-new-email').attr('disable') == 'disable') return;
        
        $('#change-email-error-block').hide();
        $('#set-new-email').removeClass('form__button-disabled');
        
        $('.popup-changeEmail input').removeClass('.input-incorrect');
        
        var buttonText = $('#set-new-email').html();
        
        $.ajax({
            url: "/account/change-email",
            type: "post",
            dataType: "json",
            data: {
                'email' : $('#new-email').val(),
                'password' : $('#oldPasswordEmail').val()
            },
            beforeSend: function(){
                $('#set-new-email').attr('disable','disable');
                $('#set-new-email').html('<div class="form__button__loading"></div>');
                $('#set-new-email').addClass('form__button-disabled');
            },
            complete: function(){
                $('#set-new-email').html(buttonText);
                $('#set-new-email').removeClass('form__button-disabled');
            },
            success: function(response){
                if(response.success != undefined && response.success == true) {
                    var noticeBlock = $('.form__mydata .form__notice');
                    actions.warningMessage(noticeBlock, response.message);
                    $('#close-change-email-popup').click();
                } else {
                    $('#change-email-error-block div').html(response.message);
                    $('#change-email-error-block').show();
                    
                    if(response.errorBlock == 'email'){
                        $('input#new-email').addClass('input-incorrect');
                        $('input#new-email').removeClass('fieldset__field-input--ok');
                    } else if(response.errorBlock == 'password'){
                        $('input#oldPasswordEmail').addClass('input-incorrect');
                        $('input#oldPasswordEmail').removeClass('fieldset__field-input--ok');
                    }
                }
            
                $('#set-new-email').removeAttr('disable');
            },
            error: function(){
                $('input#new-email').addClass('input-incorrect');
                $('input#new-email').removeClass('fieldset__field-input--ok');
                
                $('#change-email-error-block div').html("Сервис временно недоступен. Повторите попытку позже.");
                $('#change-email-error-block').show();
                $('#set-new-email').removeAttr('disable');
            }
        });
    };
    $('#set-new-email').on('click', function(){setNewEmail()});
    $('#new-email').on('keyup', function(event){
        if(event.keyCode == 13) {
            setNewEmail();
        }else{
            actions.delayedProccess(validateEmail)
        }
    });
    
    /* Действие, выполняемое по нажатии на кнопку "Изменить пароль" */
    function changePassword(validation){
        actions.clearTimeout();
        if($('#set-new-password').attr('disable') == 'disable') return;
        $('#change-password-error-block').hide();
        
        var buttonText = $('#set-new-password').html();
        $.ajax({
            url: "/account/change-password",
            type: "post",
            dataType: "json",
            data: {
                'oldPassword' : $('#oldPassword').val(),
                'newPassword' : $('#newPassword').val(),
                'newPasswordConfirm' : $('#newPasswordConfirm').val(),
                'isValidation' : validation
            },
            beforeSend: function(){
                if(validation == 1) return;
                $('input[type=password]').removeClass('input-incorrect');
                $('input[type=password]').removeClass('fieldset__field-input--ok');
                $('#set-new-password').attr('disable','disable');
                $('#set-new-password').addClass('form__button-disabled');
                $('#set-new-password').html('<div class="form__button__loading"></div>');
            },
            complete: function(){
                if(validation == 1) return;
                $('#set-new-password').removeAttr('disable');
                $('#set-new-password').removeClass('form__button-disabled');
                $('#set-new-password').html(buttonText);
            },
            success: function(response){
                if(response.success != undefined && response.success == true) {
                    var noticeBlock = $('.form__mydata .form__notice');
                    actions.successMessage(noticeBlock, response.message);
                    $('#close-change-password-popup').click();
                    $('.popup-changePassword input[type=password]').val('');
                } else {
                    if(response.errorBlock == 'old') {
                        $('#oldPassword').addClass('input-incorrect');
                    } else if(response.errorBlock == 'ok') {
                        $('input[type=password]').addClass('fieldset__field-input--ok');
                    }
                    
                    $('#change-password-error-block div').html(response.message);
                    $('#change-password-error-block').show();
                }
            },
            error: function(){
                $('#change-password-error-block div').html("Сервис временно недоступен. Повторите попытку позже.");
                $('#change-password-error-block').show();
                $('#set-new-password').removeAttr('disable');
            }
        });
    };
    
    /* Действие, выполняемое по нажатии на кнопку "Отвязать телефон" */
    $('#resendUnbindSMS').on('click', function(){
        $('#unbind-phone-error-block').hide();
        
        $.ajax({
            url: '/account/send-unbind-phone',
            dataType: 'json',
            success: function(response){
                $('#unbind-phone-error-block div').css('color', 'green');
                $('#unbind-phone-error-block div').html(response.message);
                $('#unbind-phone-error-block').show();
            },
            error: function(){
                $('#unbind-phone-error-block div').css('color', 'red');
                $('#unbind-phone-error-block div').html('Выполнение предыдущего запроса. Повторите попытку позже.');
                $('#unbind-phone-error-block').show();
            }
        });
    });
    
    $('#unbind-phone-code-button').on('click', function(){
        $('#unbind-phone-error-block').hide();
        var buttonText = $('#unbind-phone-code-button').html();
        
        $.ajax({
            url: '/account/unbind-phone',
            data: {
                code: $('#phone-unbind-code').val()
            },
            dataType: 'json',
            success: function(response){
                if(response.success != undefined && response.success == true) {
                    $('#unbind-phone-error-block div').css('color', 'green');
                    $('#unbind-phone-error-block div').html(response.message);
                    $('#unbind-phone-error-block').show();
                    setTimeout(function(){window.location.href = window.location.href}, 1500);
                } else {
                    $('#unbind-phone-error-block div').css('color', 'red');
                    $('#unbind-phone-error-block div').html(response.message);
                    $('#unbind-phone-error-block').show();
                }
            },
            error: function(){
                $('#unbind-phone-error-block div').css('color', 'red');
                $('#unbind-phone-error-block div').html('Выполнение предыдущего запроса. Повторите попытку позже.');
                $('#unbind-phone-error-block').show();
            },
            complete: function(){
                $('#unbind-phone-code-button').removeAttr('disable');
                $('#unbind-phone-code-button').removeClass('form__button-disabled');
                $('#unbind-phone-code-button').html(buttonText);
            },
            beforeSend: function(){
                $('input#phone-unbind-code').removeClass('input-incorrect');
                $('input#phone-unbind-code').removeClass('fieldset__field-input--ok');
                $('#unbind-phone-code-button').attr('disable','disable');
                $('#unbind-phone-code-button').addClass('form__button-disabled');
                $('#unbind-phone-code-button').html('<div class="form__button__loading"></div>');
            }
        });
    });
    
    /* Валидация формы с паролем */
    function validatePasswords(){
        $('#newPassword, #newPasswordConfirm').removeClass('fieldset__field-input--ok').addClass('input-incorrect');
        $('#change-password-error-block').show();
        
        var regex = /^[a-zA-Z0-9]{4,20}$/;
        
        if($('#newPassword').val() == ''){
            $('#change-password-error-block div').html("Поля должны быть заполнены");
        } else if($('#newPassword').val().length < 4) {
            $('#change-password-error-block div').html("Пароль должен состоять минимум из 4 символов");
        } else if($('#newPassword').val().length > 20) {
            $('#change-password-error-block div').html("Пароль должен состоять максимум из 20 символов");
        } else if($('#newPassword').val() == $('#currentUserName').html()) {
            $('#change-password-error-block div').html("Пароль не должен совпадать с логином");
        } else if(regex.test($('#newPassword').val()) == false) {
            $('#change-password-error-block div').html("Использован недопустимый символ. Разрешены только символы латинского алфавита и цифры");
        } else if($('#newPassword').val() != $('#newPasswordConfirm').val()){
            $('#change-password-error-block div').html("Введенные пароли не совпадают");
        } else {
            $('#newPassword, #newPasswordConfirm').addClass('fieldset__field-input--ok');
            $('#newPassword, #newPasswordConfirm').removeClass('input-incorrect');
            $('#change-password-error-block').hide();
        }
    }
    
    $('#set-new-password').on('click', function(){changePassword(0); validatePasswords();});
    $('#oldPassword').on('keyup', function(event){if(event.keyCode == 13) {changePassword(0);validatePasswords();}});
    $('#newPassword, #newPasswordConfirm').on('keyup', function(event){if(event.keyCode == 13) {changePassword(0)} else {actions.delayedProccess(validatePasswords)}});
    
    /* Действие, выполняемое по нажатии на кнопку "Изменить телефон" */
    function setNewPhone(validation){
        actions.clearTimeout();
        if($('#set-new-phone').attr('disable') == 'disable') return;
        $('#change-phone-error-block').hide();
        $('#change-phone-error-block div').css('color', 'red');
        
        var responseObject = null;
        var buttonText = $('#set-new-phone').html();
        
        $.ajax({
            url: "/account/change-phone",
            type: "post",
            dataType: "json",
            async: false,
            data: {
                'phone' : $('#phone').val(),
                'oldPhone' : $('#oldPhonePrefix').val() + $('#oldPhone').val(),
                'isValidation': validation
            },
            beforeSend: function(){
                if(validation == 1) return;
                $('.popup-changePhone input[type=text]').removeClass('input-incorrect');
                $('.popup-changePhone input[type=text]').removeClass('fieldset__field-input--ok');
                $('#set-new-phone').html('<div class="form__button__loading"></div>');
                $('#set-new-phone').attr('disable','disable');
                $('#set-new-phone').addClass('form__button-disabled');
            },
            complete: function(){
                if(validation == 1) return;
                $('#set-new-phone').removeClass('form__button-disabled');
                $('#set-new-phone').html(buttonText);
                $('#set-new-phone').removeAttr('disable');
            },
            success: function(response){
                responseObject = response;
                if(response.success != undefined && response.success == true) {
                    $('#phonenumber').hide('slow');
                    $('#phone-confirmation-code').show('slow');
                    $('#set-new-phone').hide('slow');
                    $('#enter-confirmation-code').show('slow');
                    $('#phone-confirm-code').focus();
                } else {
                    $('#change-phone-error-block div').html(response.message);
                    $('#change-phone-error-block').show();
                    
                    if(response.errorBlock == 'new'){
                        $('#oldPhone').addClass('fieldset__field-input--ok');
                        $('#phone').addClass('input-incorrect');
                    } else if(response.errorBlock == 'old') {
                        $('#oldPhone').addClass('input-incorrect');
                    } else if(response.errorBlock == 'ok') {
                        $('.popup-changePhone input[type=text]').addClass('fieldset__field-input--ok');
                        $('#change-phone-error-block').hide();
                    } else if(response.errorBlock == undefined){
                        $('#change-phone-error-block').hide();
                    }
                }
            },
            error: function(){
                $('#change-phone-error-block div').html("Сервис временно недоступен. Повторите попытку позже.");
                $('#change-phone-error-block').show();
                $('#set-new-phone').removeAttr('disable');
            }
        });
        
        return responseObject;
    };
    
    function validatePhone(){
        var phoneNumber = $('#phone').val();
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        if(phoneNumber.length < 10 || phoneNumber.length > 12){
            $('#change-phone-error-block div').html('Поле с номером телефона должно быть заполнено в соответствии с международным форматом');
            $('#change-phone-error-block').show();
            $('#phone').addClass('input-incorrect');
        } else {
            $('#phone').removeClass('input-incorrect');
            $('#change-phone-error-block').hide();
        }
    }
    
    $('#set-new-phone').on('click', function(){setNewPhone(0)});
    $('#oldPhone').on('keyup', function(event){if(event.keyCode == 13) setNewPhone(0)});
    $('#phone').on('keyup', function(event){if(event.keyCode == 13) {setNewPhone(0)}else{actions.delayedProccess(validatePhone)}});
    
    /* Действие, выполняемое по нажатии на кнопку "Проверить код из SMS" */
    function checkPhoneCode(){
        actions.clearTimeout();
        if($('#enter-confirmation-code').attr('disable') == 'disable') return;
        $('#change-phone-error-block').hide();
        
        var buttonText = $('#enter-confirmation-code').html();
        $.ajax({
            url: "/confirm/phone/" + $('#phone-confirm-code').val(),
            type: "post",
            dataType: "json",
            beforeSend: function(){
                $('#confirm-phone-error-block').hide();
                $('#enter-confirmation-code').attr('disable','disable');
                $('#enter-confirmation-code').addClass('form__button-disabled');
                $('#phone-confirm-code').removeClass('input-incorrect');
                $('#phone-confirm-code').removeClass('fieldset__field-input--ok');
                $('#enter-confirmation-code').html('<div class="form__button__loading"></div>');
            },
            complete: function(){
                $('#enter-confirmation-code').removeClass('form__button-disabled');
                $('#enter-confirmation-code').html(buttonText);
            },
            success: function(response){
                if(response.success != undefined && response.success == true) {
                    var noticeBlock = $('.form__mydata .form__notice');
                    actions.successMessage(noticeBlock, response.message);
                    $('#close-change-phone-popup').click();
                    $('#phoneNotation').html('<div class="field__notice field__notice-success">Телефон привязан к аккаунту</div>');
                    var phoneVal = $('#phone').val();
                    $('#phoneValue div.form__field-value').html(phoneVal.substring(0, phoneVal.length - 4) + '****');
                    window.location.href = window.location.href;
                    
                } else {
                    $('#confirm-phone-error-block div').css('color', 'red');
                    $('#phone-confirm-code').addClass('input-incorrect');
                    $('#confirm-phone-error-block div').html(response.message);
                    $('#confirm-phone-error-block').show();
                }
                $('#enter-confirmation-code').removeAttr('disable');
            },
            error: function(){
                $('#confirm-phone-error-block div').html("Сервис временно недоступен. Повторите попытку позже.");
                $('#confirm-phone-error-block').show();
                $('#enter-confirmation-code').removeAttr('disable');
            }
        });
    };
    $('#enter-confirmation-code').on('click', function(){checkPhoneCode()});
    $('#phone-confirm-code').on('keyup', function(event){if(event.keyCode == 13) checkPhoneCode()});
    
    /* Действие, выполняемое по нажатии на кнопку "Проверить код из SMS" */
    $('#send-confirm-email-yes').on('click', function(){
        if($(this).attr('disable') == 'disable') return;
        
        var noticeBlock = $('.form__mydata .form__notice');
        var buttonText = $('#send-confirm-email-yes').html();
        
        $.ajax({
            url: $('#send-confirm-email').attr('href'),
            type: "get",
            beforeSend: function(){
                $('#send-confirm-email-yes').attr('disable','disable').addClass('form__button-disabled');
                $('#send-confirm-email-no').attr('disable','disable').addClass('form__button-disabled');
                $('#send-confirm-email-yes').html('<div class="form__button__loading"></div>');
            },
            complete: function(){
                $('#send-confirm-email-yes').removeClass('form__button-disabled').removeAttr('disable').html(buttonText);
                $('#send-confirm-email-no').removeClass('form__button-disabled').removeAttr('disable');
            },
            success: function(response){
                actions.warningMessage(noticeBlock, 'На ваш Email отправлено письмо с ссылкой активации');
                $('#send-confirm-email-close').click();
            },
            error: function(){
                actions.failureMessage(noticeBlock, 'Идет обработка предыдущего запроса. Повторите свою попытку позже.');
                $('#send-confirm-email-close').click();
            }
        });
    });
    
    /* Действие, выполняемое по нажатии на кнопку "Заново отправить SMS" */
    $('#resendSMS').on('click', function(){
        if(buttonDisabled) return;
        
        buttonDisabled = true;
        $('#confirm-phone-error-block').hide();
        var textButton = $('#enter-confirmation-code').html();
        $('#enter-confirmation-code').html('<div class="form__button__loading"></div>');
        $('#enter-confirmation-code').addClass('form__button-disabled');
        var responseObject = setNewPhone(0);
        
        if(responseObject.success === true){
            $('#confirm-phone-error-block div').css('color', 'green');
            $('#confirm-phone-error-block div').html('Сообщение успешно отправлено');
        } else {
            $('#confirm-phone-error-block div').css('color', 'red');
            $('#confirm-phone-error-block div').html(responseObject.message);
        }
        
        $('#enter-confirmation-code').removeClass('form__button-disabled');
        $('#confirm-phone-error-block').show();
        $('#enter-confirmation-code').html(textButton);
        buttonDisabled = false;
    });
    
    $('#send-confirm-email-no').on('click', function(){
        if($(this).attr('disable') == 'disable') return;
        $('#send-confirm-email-close').click();
    });
    
    $('#reenter-phone').on('click', function(){
        $('#phone-confirmation-code').fadeOut();
        $('#phonenumber').fadeIn();
        $('#set-new-phone').show();
    });
});