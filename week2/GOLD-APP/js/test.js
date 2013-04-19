$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){
		 var resetButton = $("#reset").validate();
    			resetButton.resetForm();
		var myForm = $('#contactForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
		$('#select_02').append(function () {
        var makeOptions = document.createElement("option");
        for (var i = 0; i < processType.length; i++) {
            var processTest = processType[i];
            $('#select_02').append('<option value =' + processType[i] + '>' + processType[i] + '</option>');
        }
    }),    	$('#select').append(function () {
        var makeOptions = document.createElement("option");
        for (var i = 0; i < adTypeGroup.length; i++) {

            $('#select').append('<option value =' + adTypeGroup[i] + '>' + adTypeGroup[i] + '</option>');


        }


    })				
});
      

});
//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){	if(!key){		var id = Math.floor(Math.random()*10001);		}else{			id= key;		}				//Gather up all our form field values and store in an object.		//object properties contain array with the form label and input		getSelectedRadio();		userTypeRadio();				var item 				= {};			item.uname			= ["User Name:", $('#uname').val()];			item.fname			= ["First Name:", $('#fname').val()];			item.lname			= ["Last Name:", $('#lname').val()];			item.pword			= ["Password:", $('#pword-chk').val()];			item.sex			= ["sex:", sexValue];			item.userType		= ["sex:", userType];			item.email			= ["Email:", $('#email').val()];			item.adType			= ["Ad Type:", $('#adType').val()];			item.process		= ["Process:",$('#process').val()];			item.url			= ["Url:", $('#url').val()];		//Save data into Local Storage: Use Stringify to convert our object to a string.		localStorage.setItem(id, JSON.stringify(item));		alert("Your Data is Stored!");	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};

var processType = ["--Choose Process of Advertising--", "Telephone Ads", "Internet  Impressions", "Video Ads"];

var adTypeGroup = ["--Choose A Group--", "Computers & Electronics", "Educational", "Music", "Lifestyle", "Parenting", "Animals & Pets", "Auto & Cycles", "Business & Finance", "Cooking, Food & Beverage", "Entertainment & TV", "Fashion & Style", "Home & Gardening"];
