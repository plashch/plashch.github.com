

    var type = 'Пицца', size = "стандартного размера", thick = "на тонком тесте";

    $('#controls li').on('click', function(){

      var thisParent = $(this).parent();
      var thisParentSiblings = thisParent.siblings();
      var title = $(this).attr('title');

      switch (thisParent.attr('class'))
        {
        case 'type':
          type = title;
          break;
        case 'size':
          size = title;
          break;
        case 'thick':
          thick = title;
        }

      $(this).addClass('select').siblings().removeClass('select');



      if(thisParent.hasClass('type') && !thisParentSiblings.children().hasClass('select')){

        thisParentSiblings.find(':first').addClass('select');

      } else if(!thisParent.hasClass('type') && !thisParentSiblings.children().hasClass('select') ){
        thisParentSiblings.not('.type').find(':first').addClass('select');
      }

      var $order = $('#order');

      var $bth = $('#bth');

      if(!$order.hasClass('connection')){
        $order.addClass('connection');
        $bth.append('s_: Подключение к Bluetooth вашего устройства <br>');
        setTimeout(function(){ $bth.append('s_: Bluetooth подключен <br>');}, 11200);
      }



    });


    $('#order').on('click', function(){
      if($(this).hasClass('connection')){
        $(this).removeClass('connection').addClass('ready');
        $('ul li').removeClass('select');
        $('#bth').append('s_: Отправка вашего заказа <br>');
        setTimeout(function(){ $('#order').removeClass('ready'); }, 1200);
        setTimeout(function(){ $('#bth').append('s_:  Ваш заказ: <br>'+ type + ', ' + size + ', <br>' + thick +', – отправлен. <br> Вам перезвонят в течении 3 минут. Спасибо! <br>');}, 1200);
        setTimeout(function(){ $('#ilb').addClass('lowbattery'); $('#bth').append('s_: Низкий уровень заряда <br>');}, 2000);
        setTimeout(function(){ $('#ilb').removeClass('lowbattery');}, 25000);
      } else {
        $(this).addClass('connection');
        $('#bth').append('s_: Подключение к Bluetooth вашего устройства <br>');
        setTimeout(function(){ $('#order').removeClass('connection').addClass('ready'); $('#bth').append('s_: Отправка вашей заявки <br>');  }, 11200);
        setTimeout(function(){ $('#order').removeClass('ready'); $('#bth').append('s_: Ваша заявка отправлена. <br> Вам перезвонят в течение 3 минут. Спасибо. <br>'); }, 13600);
        setTimeout(function(){ $('#ilb').addClass('lowbattery'); $('#bth').append('s_: Низкий уровень заряда <br>');}, 15000);

      }
    });


    $('#color-selection').on('click', 'li', function(){
      var color = $(this).attr('class');
      $('body').attr('class', color);
    });

    $(window).load(function () {
        $('html').addClass('start');
    });

    $('#transition_1').on('click', function(){
        $('html').attr('class', 'desk');
    });

    $('#back').on('click', function(){
        $('.scale').toggleClass('back');
    });
