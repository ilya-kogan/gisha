jQuery(function($){
	
	/* Top Bar Search */
	$('.js-open-search, .js-close-search').click(function(e){
		e.preventDefault();

		$(this).parents('.top-bar-search').toggleClass('top-search-active');
	});


	$('.js-submit-search').click(function(e){
		e.preventDefault();

		$(this).parents('form').submit();
	});


});