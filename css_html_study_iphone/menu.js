if( 'ontouchstart' in window ){ var click = 'touchstart'; }
	else { var click = 'click'; }




	/*	Menu */
	$('div.button').on(click, function(){
		if( !$('div.content').hasClass('inactive') ){

			$('div.circle').remove();


			$('div.content').addClass('inactive');
			setTimeout(function(){ $('div.content').addClass('flag'); }, 100);


			$('div.status').fadeOut(100, function(){
				$(this).toggleClass('active').fadeIn(300);
			});


			var timer = 0;
			$.each($('li'), function(i,v){
				timer = 40 * i;
				setTimeout(function(){
					$(v).addClass('visible');
				}, timer);
			});
		}
	});




	function closeMenu() {

		$('div.content').removeClass('inactive flag');


		$('div.status').fadeOut(100, function(){
			$(this).toggleClass('active').fadeIn(300);
		});

		// Reset menu
		setTimeout(function(){
			$('li').removeClass('visible');
		}, 300);
	}

	$('div.content').on(click, function(){
		if( $('div.content').hasClass('flag') ){
			closeMenu();
		}
	});
	$('li a').on(click, function(e){
		e.preventDefault();
		closeMenu();
	});