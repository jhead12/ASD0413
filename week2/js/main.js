


$('#home').on('pageinit', function() {

	var $page =  $("#content");
	//List deleated
	$('#content').empty();

	$('#content').html("<ul></ul>");
	$list = $('#content ul');

	$('#json').on('click', function() {
			event.preventDefault();


			$.each(json, function(i, val) {
			//iterate through array or object

			//Html Creation
			var nHtml = '<li> First Name: ' + val.fname;
			nHtml += "<h1> Last Name" + val.lname + "</h1>"
			nHtml += "<h2> Id#'" + val.id +  "'</h2>";
			nHtml += "<h1>" + val.email +"</h1>"
			nHtml += "</li>";

				$list.append(nHtml);

				console.log(nHtml);


			});

			$list.listview();
	});


	$("#xml").on('click', function(event) {
		event.preventDefault();
		// Act on the event
		$.ajax({
			url: 'xhr/data.xml',
			type: 'GET',
			dataType: 'xml',

			success: function(data, status) {
			//called when successful 
			$.each(data, function(val, i ) {
				// body...
				console.log(i);

				
			})

		},
		error: function(data, status) {
		//called when there is an error
		console.log(status);
	}
});
	});
});