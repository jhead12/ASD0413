$(document).on('pageinit', function(event) {
	$.ajax({
	  url: '_view/poems',
	  type: 'GET',
	  dataType: 'json',
	  success: function(data) {
	    //called when successful
	    // console.log(data);
	 
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error
	    console.log("ajax didnt work");
	  }
	});
	
});

$('#poems').on('pageinit', function() {
	$.ajax({
	  url: '_view/poems',
	  type: 'GET',
	  dataType: 'json',
	  
	  
	  success: function(data, poems) {
	    //called when successful
	    console.log(data);
	    	var vhtml  = "";

	       $.each(data.rows, function(index, poems) {
	    	 //iterate through array or object
	    	 // console.log(poems);
	    	 var title = poems.value.title;
	    	 var poet  = poems.value.poet;
	    	 var poem = poems.value.poem;

	    	 $('.plist1').empty();

	    	 		vhtml += '<li>' + title;
	    	 		vhtml += '<ul><li>'+ poem +'</li>';
	    	 		vhtml += '<li> <a href="#music">This Inspired'+ title +' music! </a> </li>';
	    	 		vhtml += '<li> <a href="#pics">This Inspired'+ title +' Art! </a> </li>';
	    	 		vhtml += '<li> <a href="#poems">Poems Home </a> </li>';
	    	 		vhtml += '</ul>';
					

					
	    	 
	    	
	    	
	    	 
	    });
	       	vhtml+='</li>';
	       	 $('.plist1').append(vhtml);
	        $('.plist1').listview('refresh');


	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error
	  }
	});
	
});



$('#poets').on('pageinit', function() {


	 var xhtml = '';

	$.ajax({
	  url: '_view/poets',
	  type: 'GET',
  dataType: 'json',
	  success: function(data, poets) {
	    //called when successful
	    $(".plist").empty();
	    console.log(data);
	    $.each(data.rows, function(index, poets) {
	    	 //iterate through array or object
	    	 var name = poets.key;
	    	 var city = poets.value.city;
	    	 var bday = poets.value.birthDate;
	    	 var bio = poets.value.bio;
	    	 var age = poets.value.age;
	    	 var pic = poets.value.pic;

	    	 console.log(pic);
	    	 xhtml += '<li> Poet:'+ name;
	    	 xhtml += '<ul><li><h1>Bio of '+ name +'</h1>';
	    	 xhtml += '<div class="imgS">'+ pic + '</div>';
	    	 xhtml += '<p>From:'+ city + '</p>';
	    	 xhtml += '<p>Bday:'+ bday +'</p>';
	    	 xhtml += '<p>Age:'+ age+'</p>';
	    	 xhtml += '<p>Bio: ' + bio +'</p>';
	    	 xhtml += '</li>';
	    	 xhtml += '<li><a href="#poets" data-theme="b">Back</a></li>';
	    	 xhtml += '</ul>';
	    	 


	    });
	    	
	    	$(".plist").append(xhtml);
	    	$('.plist').listview('refresh');
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error
	  }
	});
	
	


});