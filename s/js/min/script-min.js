var showList=function(){$("body").addClass("list"),$("#srch").val("бизнес-ланч Парк Культуры")};$(function(){var o=["бизнес-ланч Парк Культуры","бизнес","бизнес-ланч","Парк","Культуры","бабочка","багаж"];$("#srch").autocomplete({source:o}),$("body").addClass("done"),$("#showTools").on("click",function(){$("body").toggleClass("show-tools")}),$(".button").on("click",function(){showList()}),document.onkeyup=function(o){return o=o||window.event,13===o.keyCode&&showList(),!1}});