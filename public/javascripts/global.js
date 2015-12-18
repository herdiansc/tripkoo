$( function() {
	$.backstretch(static_host+'/images/peaceful-place.jpg');

	$("a.scroll").click(function(e) {
		e.preventDefault();
	    $('html,body').animate({
	        scrollTop: $( $(this).attr('href') ).offset().top},
	        'slow');
	});

	$('.notification').bind('click',function(){
		$('.message').fadeOut('fast',function(){
			$('.message').remove();
		});
	});
});
