//Joshua Head$('#home').on('pageinit', function(){	//code needed for home page goes here	});$('#adPage').on('pageinit', function(){	//code needed for home page goes here	$('#clear').click(function(){clearLocal()});	$("#displayLink").click(function(){getData()});});$('#data').on('pageinit', function() {	var data = $('.delete');	data.bind('pageShow', function(event, ui) {		// Act on the event		console.log(event);		deleteItem();	});});//$("#error").bind( "mobileinit", function(){//   $.mobile.dialog.prototype.options.initSelector = "div.error";//});		$('#signUp').on('pageinit', function(){	var resetButton = $("#reset").validate();	resetButton.resetForm();	var myForm = $('#contactForm');	myForm.validate({		invalidhandler: function(myForm, validator){					var errors = myForm.numberOfInvalids();					if (errors){						var message = errors == 1						? 'You missed 1 filed. It has been highlighted'						: 'you miss' + errors + ' fields. They have been highlighted';						$('div.error span').html(message);						$('div.error').show();						}else{						$('div.error').hide();						}					},			rules:{				firstname: 	'required',				lastname: 	'required',				username:	'required',				password:	'required',				price: 		'required',				process:	'required',				group:		'required',					startdate:	'required',				email:		'required'			},			messages:{				firstname: "Please enter your first Name",				lastname:	'Please enter your Last Name',				username:	'Please enter a Username',				password: 'Please enter a password',				price: 'Please enter a price range',				process: 'Please Enter a Marketing Type',				group:	'Please Enter a AdType',				startdate: 'Please enter a start date',				email:	'Please Enter an Email Address'			},				submitHandler: function(myForm) {		var data = $('#contactForm').serializeArray();			storeData(data);			//console.log(data);		}	});	//any other code needed for adPage page goes here	$('#select_02').append(function () {		$.each(processType, function(index, val) {		//iterate through array or object		console.log(val);		$('#select_02').append('<option value =' + val + '>' + val + '</option>');		});    });    $('#select').append(function () {        $.each(adTypeGroup, function(index, val) {        //iterate through array or object        	        	 $('#select').append('<option value =' + val + '>' + val + '</option>');        });          })	});//The functions below can go inside or outside the pageinit function for the page in which it is needed.var autoFillData = function (){		//The Json object Data is coming from the json.js to from the html		//Then it is put the data in Local Data		$.each(json, function(index, val) {		//iterate through array or object		var id = Math.floor(Math.random()*10001);			 localStorage.setItem(id, JSON.stringify(val));		});	};var getData = function(){		if(localStorage.length === 0){			alert("There is no data in Local Storage so using default");			$(".img").empty();			autoFillData();		}		//Write Data from Local Storage to the browser		// $(".img").append("<li class='list'></li>");		// $('#items').css("style", "display");		for (var i = 0, len = localStorage.length; i <len; i++){			// var linksLi = $(".list").append('<li class="links"></li>');			// makeList.append(makeli);			var key = localStorage.key(i);			var value = localStorage.getItem(key);			// console.log(key);			//Convert the string from local storage value back to an object using JSON			var obj = JSON.parse(value);			console.log(obj.fname[i]);			// var optSubText = obj[n][0]+" "+obj[n][1];			// var opt1 = obj[n][1];			var html  = '<li class="test">';				html += '<a href="#data">';				html += "<img src='images/" + obj.adType[1] + ".png'/>";				html += '<h3>' + obj.fname[1] + " "+ obj.lname[1] + '</h3>';				html += '<p>'+ obj.email[1]+'</p>';				html += '</a></li>';			$('.img').append(html);			// getImage(obj.adType[1]);}//end of For Loop			$(".img").listview();			$(".img").listview({ inset: true });			// for( var n in obj){			// 	var optSubText ="<p>" + obj[n][0] + obj[n][1] + "</p>";			// 	// makeSubli.innerHTML = optSubText;			// 	// makeSubList.appendChild(linksLi);				// console.log(obj);				// $(".list").append("<li>"+ optSubText + "</li>");				makeItemLinks(localStorage.key(i), linksLi); //create our edit and Delete buttons for each item in local storage		// }		$(".list").listview('refresh');	};var storeData = function(data){	var id = Math.floor(Math.random()*10001);		getSelectedRadio();		userTypeRadio();						var item = {};			item.uname			= ["User Name:", $('#uname').val()];			item.fname			= ["First Name:", $('#fname').val()];			item.lname			= ["Last Name:", $('#lname').val()];			item.pword			= ["Password:", $('#pword-chk').val()];			item.sex			= ["sex:", sexValue];			item.userType		= ["UserType:", $('#userType')];			item.email			= ["Email:", $('#email').val()];			item.adType			= ["Ad Type:", $('#group').val()];			item.process		= ["Process:",$('#process').val()];			item.url			= ["Url:", $('url').val()];				localStorage.setItem(id, JSON.stringify(data));				alert("Your Data is Stored!");			};var clearLocal = function () {        if (localStorage.length === 0) {            alert("Theres is no data to clear");        } else {            localStorage.clear();            alert("All record were deleted");            window.location.reload();            return false;        }    };var getSelectedRadio = function(){		$('.radios :checked  ');	};	var userTypeRadio = function(){	$('.radios2 :checked  ')	};var processType = ["--Choose Process of Advertising--", "Telephone Ads", "Internet  Impressions", "Video Ads"];var adTypeGroup = ["--Choose A Group--", "Computers & Electronics", "Educational", "Music", "Lifestyle", "Parenting", "Animals & Pets", "Auto & Cycles", "Business & Finance", "Cooking, Food & Beverage", "Entertainment & TV", "Fashion & Style", "Home & Gardening"];// var getImage = function(imgName, makeSubList){	// 	$(".test").append("<img src='images/" + imgName + ".png'/>");// };var makeItemLinks = function (key, linksLi){	var editLink = linksLi.append('<a href="#signUp" class="edit"></a>');		editLink.key = key;	$(".edit").on('click', function() {		event.preventDefault();		// Act on the event		editItem();	});		// editLink.href = '#signUp';		// editLink.key = key;		// editText = "Edit User";		// editLink.addEventListener('click', editItem);		// editLink.innerHTML = editText;		// linksLi.appendChild(editLink);//				//Line Break		// var breakTag = document.createElement('br');		// linksLi.appendChild(breakTag);		$(".edit").html('<br />');		//add Delete Linke		$(".delete").append('<a href="#"></a>');	// var deleteLink = document.createElement('a');	// 	deleteLink.href = "#";	// 	deleteLink.key = key;	// 	deleteText = "Delete User";	// 	deleteLink.addEventListener("click", deleteItem);	// 	deleteLink.innerHTML = deleteText;	// 	linksLi.appendChild(deleteLink);	};var editItem =	function (){		//Grab the data from our item from Local Storage		var value = localStorage.getItem(this.key);		var item = JSON.parse(value);		//console.log("This is the Console Log " + value);		//Populate the form field with current local storage values		$("#fname").value = item.fname[1];		$('#lname').value = item.lname[1];		$('#pword-chk').value = item.pword[1];		$('#email').value = item.email[1];		$('#adType').value = item.adType[1];		$('#uname').value = item.uname[1];		$('#url').value = item.url[1];		var radios = $('.radios :checked');			if (radios == "Male" && item.sex[1] == "Male"){				radios[i].setAttribute("checked", "checked");			}else if(radios == "Female" && item.sex[1] == "Female"){				radios[i].setAttribute("checked", "checked");			}				var radios02 = document.forms[0].userType;		for(var i = 0; i < radios02.length; i++){			if (radios02[i].value == "Publisher" && item.userType[1] == "Publisher"){				radios02[i].setAttribute("checked", "checked");			}else if(radios02[i].value == "Advertiser" && item.userType[1] == "Advertiser"){				radios02[i].setAttribute("checked", "checked");			}		}													//Remove the initial listener from the input "save data" button		$('submit').off("click", storeData);		//Change Submit button Value to Edit button		$('submit').value = "Edit User";		var editSubmit = $('submit');		editSubmit.on("click", validate);		editSubmit.key= this.key;		//Save the key value established in this function is the property event, that could be used when savin the data.				};