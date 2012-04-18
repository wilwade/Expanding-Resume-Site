/* Author: Wil Wade

	Basic Javascript to make sure everything happens.
	
	Note the site layout, design, and custom javascript are licensed under a Creative Commons Attribution 3.0 Unported License.
	Design by www.willmwade.com.
*/

//Makes the menu highlight the active section
function setActiveName(activeName)
{
	// Remove the active state
  $('nav li.active').removeClass('active');
  $('nav div').removeClass('active');
  
  //Setup the two active classes
  $('nav li.li' + activeName).addClass('active');
  $('nav #div_' + activeName).addClass('active');
  
}

//Looks for updates to what should be active
function scroll_update(){
	//Find all the nav anchors in the viewport	
	navAnchors = $('#content a.nav_anchors');
	var i = 0;
	var found = false;
	//Loop through those nav anchors (placed at the end of each section)
	while( ! found)
	{
		if(! $(navAnchors[i]).is(':above-the-top')) {
			found = true;
			setActiveName($(navAnchors[i]).attr('id'));
		}
		i++;
	}
}

//Smooths the scrolling
function setEaseScrolling() {
$('nav li.navli').bind('click',function(event){
		var $li = $(this);
		if($('#not_small_for_jquery').css('display') == 'none')
		{
			$('.nav_sections').hide();
			$($li.children('a').first().attr('href')).show();
			
		}
		else
		{
			$('.nav_sections').show();
		}
		$('html, body').stop().animate({
				scrollTop: $($li.children('a').first().attr('href')).offset().top
			}, 1500,'easeInOutExpo');
	});
$('a.smooth_scroll').bind('click',function(event){
		var $anchor = $(this);
		
		if($('#not_small_for_jquery').css('display') == 'none')
		{
			$('.nav_sections').hide();
			if($($anchor.attr('href')).hasClass('nav_sections')) {
				$($anchor.attr('href')).show();
			}
			else {
				$($anchor.attr('href')).parents('.nav_sections').show();
			}
			
		}

		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500,'easeInOutExpo');
	});
}


$(document).ready(function() {
  // All that onload stuff

	//Setup those links to show the learn_more articles
	$('a.learn_more').bind('click', function(e) {
		e.preventDefault();
		$(this).next('section').toggle('fast');
	});
  
  //Run the scrolling functions
  scroll_update();
  $(window).scroll($.throttle(500,scroll_update));
  //Setup the smooth scrolling on the navli
  setEaseScrolling();
  
  //Run a prevent default on all the nojs class links
  $('.nojs').bind('click', function(e){e.preventDefault();});
  
  
});
