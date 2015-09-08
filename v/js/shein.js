function showShein () {
  console.log('1');
      $('#shein').addClass('show');

      setTimeout(function(){
        $('#shein').removeClass('show');  },
      5000);
      return false;
}
