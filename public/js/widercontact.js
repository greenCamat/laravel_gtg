
//var BASE_PATH = "http://localhost/wu/wc/";
//var BASE_PATH = "http://www.widercontact.com/";
var BASE_PATH = "http://staging.widercontact.com/";

var wu = {};

wu.delegateMethod = function ( obj , method ) {
	var f = function ( p ) { 
		obj[method](p);
	};
	return f;
};

wu.xmlToObject = function ( text ) {
	var xdoc = wu.stringToXML ( text ) ;
	return 	wu.parseElement( xdoc.documentElement );
};
 
wu.stringToXML = function (text) {
	var cleanText =  text.replace(/(\n\t)/g, '');
	cleanText = cleanText.replace(/>\s</g, '><');
	if (window.ActiveXObject){
	  //ie
      var doc = new ActiveXObject('Microsoft.XMLDOM');
      doc.async = 'false';
      doc.loadXML(cleanText);
    } else {
      var parser = new DOMParser();
      var doc = parser.parseFromString(cleanText,'text/xml');
	}
	return doc;
};
   
//all attributes will become the property of object
//all child nodes will belong to the children property
//nodevalue will become textcontent

wu.parseElement = function ( element  ) {
 	var  obj = {};
 	if( element.nodeName == "#text" ) {
 		obj.textElement = element.nodeValue;
 		return obj;
 	}
 	//parse attributes to become proprties
 	for (var i = 0; i < element.attributes.length ; i++ ) {
 		var attr = element.attributes[i];
 		obj[attr.nodeName ] = attr.nodeValue;
 	}
 	//parse childNodes to become children
 	if( element.childNodes.length == 1 ) {	 		
 		obj[element.firstChild.nodeName] = wu.parseElement(element.firstChild);
 	} else if( element.childNodes.length > 1) {
 		obj.children = [];
 		for( var i = 0; i < element.childNodes.length; i++  ) {
 			 obj.children.push(wu.parseElement(element.childNodes[i])) ;
 		}	
 	}
 	return obj;
}
 
  
 
wu.WiderContact = function() {
	 this.error_messages = null;
	 this.data;
};
 
wu.WiderContact.prototype.post = function ( on_complete_func, url , request_data , parse_data ) {
	var self = this;
	function callback ( response_data , textStatus , jqXHR ) {
		 if( on_complete_func != null ) {
		 	if( parse_data == null ) {
		   		on_complete_func ( wu.xmlToObject (  response_data    ), response_data  );	
		   	} else {
		   		on_complete_func ( null , response_data  );
		   	}
		 }
	};
	var full_url = BASE_PATH + url;
	 
	$.post( full_url  , request_data, callback , "text" );
};

 
wu.WiderContact.prototype.signup = function ( data , callback  ) {
	this.post( callback , "api/user/signup" , data );
};


wu.WiderContact.prototype.login = function ( data, callback  ) {
	this.post( callback , "api/user/login" , data );
};

wu.WiderContact.prototype.logout = function( data, callback ) {
	this.post(callback, "api/user/logout", data );
}

 
wu.WiderContact.prototype.users  = function ( data, callback  ) {
	this.post( callback , "api/users" , data );
};

wu.WiderContact.prototype.contact_create  = function ( data, callback  ) {
	this.post(  callback , "api/contacts/create" , data );
};

wu.WiderContact.prototype.contacts  = function ( data, callback  ) {
	this.post( callback, "api/contacts" , data );
};

wu.WiderContact.prototype.contact  = function ( data, callback  ) {
	this.post( callback , "api/contact" , data );
};

wu.WiderContact.prototype.contact_update  = function ( data , callback ) {
	this.post( callback , "api/contact/update" , data );
};

wu.WiderContact.prototype.contact_delete  = function ( data, callback  ) {
	this.post( callback , "api/contact/delete" , data );
};


wu.WiderContact.prototype.group  = function ( data, callback  ) {
	this.post(  callback , "api/group" , data );
};

wu.WiderContact.prototype.group_create  = function ( data, callback  ) {
	this.post(  callback , "api/group/create" , data );
};
 
wu.WiderContact.prototype.group_delete  = function ( data, callback  ) {
	this.post(  callback , "api/group/delete" , data );
};

wu.WiderContact.prototype.group_update  = function ( data, callback  ) {
	this.post(  callback , "api/group/update" , data );
};


wu.WiderContact.prototype.group_join  = function ( data, callback  ) {
	this.post( callback, "api/group/join" , data );
};

wu.WiderContact.prototype.group_unsubscribe  = function ( data, callback  ) {
	this.post( callback, "api/group/unsubscribe" , data );
};
 
wu.WiderContact.prototype.groups  = function ( data, callback  ) {
	this.post(  callback , "api/groups" , data );
};

wu.WiderContact.prototype.group_quick_create  = function ( data, callback  ) {
	this.post(  callback , "api/group/quick_create" , data );
};

wu.WiderContact.prototype.groups_schedules  = function ( data, callback  ) {
	this.post(  callback , "api/groups/schedules" , data );
};

wu.WiderContact.prototype.group_contacts  = function ( data, callback  ) {
	this.post( callback , "api/group/contacts" , data );
};

wu.WiderContact.prototype.group_welcome_message  = function ( data, callback  ) {
	this.post( callback , "api/group/welcome_message" , data );
}

wu.WiderContact.prototype.message_create  = function ( data, callback  ) {
	this.post(  callback , "api/message/create" , data );
}; 

wu.WiderContact.prototype.message_delete = function ( data, callback ) {
	this.post(  callback , "api/message/delete" , data );
};

wu.WiderContact.prototype.message_update = function ( data, callback ) {
	this.post(  callback , "api/message/update" , data );
};

wu.WiderContact.prototype.message = function ( data, callback ) {
	this.post(  callback , "api/message" , data );
};

wu.WiderContact.prototype.messages  = function ( data , callback ) {
	this.post( callback , "api/messages" , data );
};

wu.WiderContact.prototype.message_send_test = function ( data, callback ) {
	this.post(  callback , "api/message/send_test" , data );
};

wu.WiderContact.prototype.message_schedule = function ( data, callback ) {
	this.post(  callback , "api/message/schedule" , data  );
};

wu.WiderContact.prototype.message_unschedule = function ( data, callback ) {
	this.post(  callback , "api/message/unschedule" , data  );
};

wu.WiderContact.prototype.messages_schedules = function ( data, callback ) {
	this.post(  callback , "api/messages/schedules" , data  );
};

wu.WiderContact.prototype.message_blast = function (data, callback) {
	this.post(  callback , "api/message/blast" , data  );
};


wu.WiderContact.prototype.message_body = function ( data, callback ) {
	this.post(  callback , "api/message/body" , data , true);
};

 
wu.WiderContact.prototype.message_schedule  = function ( data, callback  ) {
	this.post(  callback , "api/message/schedule" , data );
};


wu.WiderContact.prototype.import_csv = function ( data , callback ) {
	this.multipart_post( callback , "api/group/import" , data  , false );
};

/*
 * MULTIPART 
 */
  
wu.WiderContact.prototype.multipart_post = function ( on_complete_func , url , request_data, should_parse ) {
	var self = this;
	var full_url = BASE_PATH + url;
	function callback( data, textStatus , jqXHR ) {
		 if( on_complete_func != null ) {
		 	if( should_parse == true ) {
		   		on_complete_func ( wu.xmlToObject (  data    ),  data );	
		   	} else {
		   		on_complete_func ( null , data  );
		   	}
		 }
	}
	
	var content_type = "text";
	if( request_data.content_type != null ) {
		type = request_data.content_type;
	}
	
	var file_name = "widercontact_file.txt";
	if( request_data.file_name  != null ) {
		file_name = request_data.file_name
	}
	
	var file_field_name ="wcfile";
	if( request_data.file_field_name ) {
		file_field_name = request_data.file_field_name;
	}
	
	var body = wu.multipart_formdata (  request_data.form_data , WU_BOUNDARY);
	body += wu.multipart_file( request_data.content_data ,  file_name , file_field_name , content_type , WU_BOUNDARY );
	//console.log(body + "\n\n\n");
	 
	function set_headers(xhr) {
		wu.multipart_header( xhr , WU_BOUNDARY  , body ,  request_data.form_data );
	}
	
	var ajax_params = {};	
	
	ajax_params.type = "POST";
	ajax_params.url = full_url;
	ajax_params.data = body;
	ajax_params.success = callback;
	ajax_params.beforeSend = set_headers;
	
	$.ajax(ajax_params);
};

var WU_BOUNDARY = "---post-mulitpart-boundary---";
wu.multipart_formdata = function ( form_data, boundary  ) {
	var  body = "";
	for( var i in form_data ) {
		body += "--" + boundary + "\n\r";
		body += "Content-Disposition: form-data; name=\"" + i + "\"\r\n\r\n";
		body +=   form_data[i]   + "\r\n";
	}
	return body;
}  
 

wu.multipart_file = function ( file_content, filename, dataname , content_type , boundary) {
	var body = "";
	body += "--" + boundary + "\r\n";
	body += "Content-Disposition: form-data; name=\"" + dataname + "\"; filename=\"" + filename + "\"\r\n";
	body += "Content-Type: " + content_type + "\r\n\r\n";
	body += file_content;
	body += "\r\n";
	body += "--" + boundary + "\r\n";
	return body;
}
 
wu.multipart_header  = function( xhr, boundary, body , form_data ) {
	xhr.setRequestHeader ("Content-Type", "multipart/form-data; boundary=" + boundary );
	for( var i in form_data ) {
		xhr.setRequestHeader( i, form_data[i] );
	}
}
  
wu.wider_contact = new wu.WiderContact();

  
