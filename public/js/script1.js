/* Site-wide scripts */

$(document).ready(function () {
  $('input, textarea').placeholder();
  
  //select all the a tag with name equal to modal
	$('a[name=modal]').click(function(e) {
		//Cancel the link behavior
		e.preventDefault();
		
		//Get the A tag
		var id = $(this).attr('href');
	
		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	
		//Set heigth and width to mask to fill up the whole screen
		$('#overlay').css({'width':maskWidth,'height':maskHeight});
		
		//transition effect		
		//$('#overlay').fadeIn(1000);	
		$('#overlay').fadeTo("fast",0.7);	
	
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
              
		//Set the popup window to center
		$(id).css('top',  winH/2-$(id).height()/2);
		$(id).css('left', winW/2-$(id).width()/2);
	
		//transition effect
		$(id).show(); 
	
	});
	
	//if close button is clicked
	$('.modal .btn-close, .modal .cancel-link').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();
		
		$('#overlay').hide();
		$('.modal').hide();
	});		
	
	//if mask is clicked
	$('#overlay').click(function () {
		$(this).hide();
		$('.modal').hide();
	});			

	$(window).resize(function () {
	 
 		var box = $('#modal-wrap .modal');
 
        //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
      
        //Set height and width to mask to fill up the whole screen
        $('#overlay').css({'width':maskWidth,'height':maskHeight});
               
        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();

        //Set the popup window to center
        box.css('top',  winH/2 - box.height()/2);
        box.css('left', winW/2 - box.width()/2);
	 
	});
	
	$(".chckbx-list").change(function() {
  		$(this).parent('li').toggleClass("selected", this.checked);
	});
  
}); // document.ready

