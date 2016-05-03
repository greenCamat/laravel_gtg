/* Site-wide scripts */
$.fn.validateEmail = function() {
    var email = $(this).val();
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    return pattern.test($.trim(email));
}

$.fn.doCenter = function () {
    var topVal = (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop();
    var leftVal = (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft();

    if (topVal < 0) topVal = 0;
    if (leftVal < 0) leftVal = 0;

    this.css("position","absolute");
    this.css("top", topVal + "px");
    this.css("left", leftVal + "px");

    return this;
}

$.fn.openModal = function (message, callback, timeout) {
    var modalWindow = $(this);
    if (!callback) callback = {};

    var zinx = 999;
    if (callback.parentModal) {
        var zinx = parseInt($(callback.parentModal).css('z-index')) + 1;
        $(callback.parentModal).css('z-index', 9);
    } else {
        $('.modal').fadeOut();
        $('.modal').css('z-index', 1);
    }

    var wheight = ($('body').height() < $(window).height()) ? $(window).height() : $('body').height();
    $('#fade').css('height', wheight);
    $('#fade').css('display','block');

    modalWindow.find('.message').html(message);
    modalWindow.doCenter();
    modalWindow.css('z-index', zinx);
    modalWindow.fadeIn(300);

	if (callback.title) modalWindow.find('.headerTitle').html(callback.title);

    modalWindow.find('.btn-close, .btn-cancel, .btn-no, .btnClose, .cancel-link').click(function() {
        if (typeof callback.beforeOut == 'function') callback.beforeOut();

        modalWindow.fadeOut(300, function() {
            if (typeof callback.afterOut == 'function') callback.afterOut();
            if (callback.parentModal) {
                $(callback.parentModal).css('z-index', 999);
            } else {
                $('#fade').css('display','none');
            }

            callback.afterOut = null;
        });

        callback.beforeOut = null;
        callback.ifYes = null;
        return false;
    });

    modalWindow.find('.btn-yes, .btnYes').click(function() {
        if (typeof callback.ifYes == 'function') callback.ifYes();
        callback.ifYes = null;
        return false;
    });

    // set timeout
    if (timeout) {
        setTimeout(function() {
            modalWindow.find('.btnClose, .modalClose, .btnNo').trigger('click');
        }, timeout);
    }
}

function convert_gmt(cdate) {
    var gmtdate = new Date(cdate);
    gmtdate.setMinutes(gmtdate.getMinutes() + gmtdate.getTimezoneOffset());

    var gdate = $.datepicker.formatDate('yy-mm-dd', gmtdate);
    var ghour = (gmtdate.getHours() < 10) ? '0'+gmtdate.getHours() : gmtdate.getHours();
    var gmins = (gmtdate.getMinutes() < 10) ? '0'+gmtdate.getMinutes() : gmtdate.getMinutes();

    return gdate+' '+ghour+':'+gmins+':00';
}
 
var wc_page_number = 1;
var wc_number_of_items = 15;
  
function wc_show_more(event) {
	event.preventDefault();
	wc_page_number++;
	load_more();
}

function wc_reset_more()  {
	wc_page_number = 1;
	wc_reset_checkboxes ();
}
 
function wc_show_modal (e , target) {
	if( e != null) e.preventDefault();
 	  
	//var id = $(this).attr('href');
	var id = target;

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
	 
}

function wc_highlight_selected_menu ( menu ) {
 	var id = "menu_" + menu + "_btn";
 	/*
 	if( id == "menu_dashboard_btn" ) {
		$("#menu_dashboard_btn")[0].className = "btn-dash selected";
	} else {
		$("#menu_dashboard_btn")[0].className = "btn-dash";
	}
	*/
	
	if( id == "menu_contacts_btn" ) {
		$("#menu_contacts_btn")[0].className = "btn-contacts selected";
	} else {
		$("#menu_contacts_btn")[0].className = "btn-contacts";
	}
	
	if( id == "menu_groups_btn" ) {
		$("#menu_groups_btn")[0].className = "btn-groups selected";
		
	} else {
		$("#menu_groups_btn")[0].className = "btn-groups";
	}
	
	if( id == "menu_campaigns_btn" ) {
		$("#menu_campaigns_btn")[0].className = "btn-campaigns selected";
	} else {
		$("#menu_campaigns_btn")[0].className = "btn-campaigns";
	}
	
 	if( id == "menu_schedules_btn" ) {
		$("#menu_schedules_btn")[0].className = "btn-sched selected";
	} else {
		$("#menu_schedules_btn")[0].className = "btn-sched";
	}
}

var wc_checkboxes = [];
var wc_datahash = {};
var wc_selected_items = {};

function wc_add_checkbox( name , data  ) {
	wc_checkboxes.push( name );
	 
	wc_datahash[name] = data;
}

function wc_reset_checkboxes ()  {
	wc_checkboxes = [];
	wc_datahash = {};
	wc_selected_items = {};
}
 
function wc_register_check_clicks () {
	for( var i = 0; i < wc_checkboxes.length;i++ ) {
		var name = wc_checkboxes[i];
		var chk = $("#" + name ) ;
		chk.click( wc_check_click );
	}
}

function wc_check_click( event ) {
	var target = event.target;
 	var name = target.id;
 	if( target.checked ) {
 		wc_selected_items[name] = wc_datahash[name];
 	} else {
 		delete wc_selected_items[name] ;
 	}
}

function wc_all_check( event ) {
	var all_chk = $("#all_chk")[0];
	var value = all_chk.checked;
	for( var i = 0; i < wc_checkboxes.length;i++ ) {
		var name = wc_checkboxes[i];
		var chk = $("#" + name )[0];
	 	chk.checked = value;
		if( value == true ) {
			wc_selected_items[name] = wc_datahash[name];
		} else {
			delete wc_selected_items[name];
		}
	}
}

function wc_get_selected( id_field ) {
	var ids = "";
	for( var i in wc_selected_items) {
		 
		var data = wc_selected_items[i];
		ids += data[id_field] + ",";
	}
	ids = ids.substr(0 , ids.length-1);
	return ids;
}

var wc_msg_modal_yes_callback;
 
function wc_show_confirm(  title, msg, yes_title , callback , show_cancel  , use_red) {
	wc_show_modal( null , "#msg_modal" );
	wc_msg_modal_yes_callback = callback;
	$("#msg_modal_title")[0].innerHTML = title;
	$("#msg_modal_content")[0].innerHTML = msg;	
	$("#msg_modal_yes_btn")[0].innerHTML = yes_title;
	
	 
	
	if( show_cancel == true ) {
		
		$("#msg_modal_no_btn").show();
		
		
	} else {
		$("#msg_modal_no_btn").hide();
	}
	
	if( use_red  == true ) {
		//document.getElementById("msg_modal_yes_btn").className = "btn-red";
		$("#msg_modal_yes_btn")[0].className = "btn-red";
	} else {
		//document.getElementById("msg_modal_yes_btn").className = "btn";
		 $("#msg_modal_yes_btn")[0].className = "btn";
	}
	
	
}

function wc_msg_modal_yes_click( event ) {
	event.preventDefault();
	if( wc_msg_modal_yes_callback != null ) {
		wc_msg_modal_yes_callback();
	}
	wc_msg_modal_yes_callback = null;
	$('#overlay').hide();
	$('.modal').hide();
}
  
function wc_logout(event)  {
	event.preventDefault();
	console.log("Loging out");
	wu.wider_contact.logout({user_id: user_id}, wc_logout_complete );
}

function wc_logout_complete (data, raw ) {
	console.log( raw );
	window.location = base_url;
}
  
$(document).ready(function () {
	$('.datetime').each(function() {
        var tzdate = new Date($(this).attr('data-gmdate'));
        tzdate.setMinutes(tzdate.getMinutes() - tzdate.getTimezoneOffset());
        var cdate = $.datepicker.formatDate('M d, yy', tzdate);
        var hours = tzdate.getHours();
        var mins = tzdate.getMinutes();
        var ampm = (tzdate.getHours() < 12) ? 'AM' : 'PM';

        if (hours == 0) hours = '12';
        if (hours > 12) hours = hours - 12;
        if (mins < 10) mins = '0'+mins;

        $(this).html(cdate+' at '+hours+':'+mins+' '+ampm);
    });

  	// init_page();

	// chosen plugin
	if ($.fn.chosen) { 
		$('.chzn-select').chosen();
		$('.chzn-nosearch').chosen({disable_search: true});
	}

	// datepicker plugin
    if ($.fn.datepicker) {
        $('.datepicker').datepicker();
        $('.icondate').click(function(e) {
            e.preventDefault();
            var elDate = $(this).attr('href');
            if ($(elDate).attr('disabled')) return false;

            $(elDate).datepicker('show');
        });
    }

	// datetimepicker plugin
    if ($.fn.datetimepicker) {
        $('.datetimepicker').datetimepicker();
        $('.icondatetime').click(function(e) {
            e.preventDefault();
            var elDate = $(this).attr('href');
            if ($(elDate).attr('disabled')) return false;

            $(elDate).datetimepicker('show');
        });
    }
 
  	$("#all_chk").click( wc_all_check );
  	$("#more_btn").click(wc_show_more);
 	$("#logout_btn").click(wc_logout);

  	if (window.delete_selected != null) {
  		$("#deleteall_btn").click( delete_selected );  	
  	} 
  
   
  	$("#msg_modal_yes_btn").click(wc_msg_modal_yes_click);
  
  	$('input, textarea').placeholder();
  
	$('a[name=modal]').click(function(e) {
		e.preventDefault();

		var modal = $(this).attr('href');
		$(modal).openModal();
	});

/* 
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
*/
	
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

