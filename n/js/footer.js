$(document).ready(function(){
	// ��������� ������� ������ "��� ����� ZZIMA.COM"
	$('.z-foo__what-is-zzima').on('click', function(){
		$(this).closest('.z-foo').toggleClass('z-foo_open');
		return false;
	});

});