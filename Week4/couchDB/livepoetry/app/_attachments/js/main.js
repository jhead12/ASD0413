$(document).on('pageinit', function (event) {
    $.ajax({
        url: '_view/poems',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //called when successful
            // console.log(data);

        },
        error: function (xhr, textStatus, errorThrown) {
            //called when there is an error
            console.log("ajax didnt work");
        }
    });

});

$('#poems').on('pageinit', function () {
    var $db = $.couch.db('livepoetry');
    $("#plist1").selectmenu("refresh");


    $db.view('app/poems', {

        success: function (data) {
            //called when successful
            // console.log(data);
            var vhtml = "";

            $.each(data.rows, function (index, poems) {
                //iterate through array or object
                // console.log(poems);
                var title = poems.value.title;
                var poet = poems.value.poet;
                var poem = poems.value.poem;

                $('.plist1').empty();

                vhtml += '<li>' + title;
                vhtml += '<ul><li>' + poem + '</li>';
                vhtml += '<li> <a href="#music">This Inspired' + title + ' music! </a> </li>';
                vhtml += '<li> <a href="#pics">This Inspired' + title + ' Art! </a> </li>';
                vhtml += '<li> <a href="#poems">Poems Home </a> </li>';
                vhtml += '</ul>';

            });
            vhtml += '</li>';
            $('.plist1').append(vhtml);
            $('.plist1').listview('refresh');


        },
        error: function (xhr, textStatus, errorThrown) {
            //called when there is an error
            alert('Somethis is wrong with the Poem Ajax Call!');
        }
    });

});



$('#poets').on('pageinit', function () {

    $(".plist").listview("refresh");

    var xhtml = '';

    $.ajax({
        url: '_view/poets',
        type: 'GET',
        dataType: 'json',
        success: function (data, poets) {
            //called when successful
            $(".plist").empty();


            $.each(data.rows, function (index, poets) {
                //iterate through array or object
                var name = poets.key;
                var city = poets.value.city;
                var bday = poets.value.birthDate;
                var bio = poets.value.bio;
                var age = poets.value.age;
                var pic = poets.value.pic;
                var rev = poets.value.rev;

               


                // console.log(pic);
                xhtml += '<li id="id-1"> Poet:' + name;
                xhtml += '<ul><li><h1>Bio of ' + name + '</h1>';
                xhtml += '<div class="imgS"><img src="profile/' + pic + '" alt="' + pic + '"></div>';
                xhtml += '<p>From:' + city + '</p>';
                xhtml += '<p>Bday:' + bday + '</p>';
                xhtml += '<p>Age:' + age + '</p>';
                xhtml += '<p>Bio: ' + bio + '</p>';
                xhtml += '</li>';
                xhtml += '<li><a href="#poets" data-theme="b">Back</a></li>';
                xhtml += '<li class="dl"></li>';
                xhtml += '</ul>';

                $('dl').bind( name, function() {
                    // Act on the event
                    console.log(name);
                });



            });

            $(".plist").append(xhtml);
             linkList();


             // $(".db").click(function(event) {
             //     return this;
             //    });
             //    $(".db").click(function(event) {
             //    console.log( event.result );
             //    });

             $('.db').on('click', function(data) {
               
                 console.log($('#id-1').data(data, 'rev'));

                deletePoet();
            });
            $('.plist').listview('refresh');
            $('.plist li div div a').bind('click', data, function(event) {
                 // Act on the event
                 console.log(this);
             });

             $('#clearAll').click(function(key) {
                 // Act on the event
                 var ask = confirm('Are you sure you want to Delete All Records?');
                 console.log(key);
                
                 if (ask) {

                    deleteAll();
                 }

                

            });





        }



    });//ajaxEnd




});


$("#pics").on('pageinit', function () {
    var $db = $.couch.db('livepoetry');

    $db.view('app/poems', {
        success: function (data) {
            // var poems = poems.value.poems;
            $.each(data.rows, function (index, poems) {
                //iterate through array or object


            });
        }
    });
});

$('#addPoem').on('pageinit', function () {
    var $db = $.couch.db('livepoetry');


    var storeData = function (data) {
        // body...
        var id = "poem-" + $('#_id').val();
        var item = {};
        item._id = id;
        item.title = $('#title').val();
        item.poem = $('#poem').val();
        // console.log(item);

       console.log(this.key);

        $db.saveDoc(item, {
            success: function (data) {
                // body...
                alert('Data Has been Stored!');
                console.log(data);
            },
            error: function (data) {
                // body...
                console.log(data);
                alert('Something is Wrong!');
            }
        });


    };

    $("form").on('submit', function () {


        storeData();
        alert("There was an Attempt to store Data!");


        // $db.saveDoc(serial);



    });
});

$('#signUp').on('pageinit', function () {

    var $db = $.couch.db('livepoetry');
    $("#pic_1").selectmenu("refresh");

    console.log(pImages);
    var getProfile = function (data) {
        // body...
        $('#pic_1').empty();


        $.each(pImages, function (index, val) {
            //iterate through array or object
            $('#pic_1').append('<option value="' + val + '">' + val + '</option>');
        });
        $("#pic_1").selectmenu("refresh");

    };
    getProfile();




    var storePoet = function (data) {


        var id = "poet:" + $('#nPoet').val();
        var item = {};
        item._id = id;
        item.city = $('#nCity').val();
        item.age = $('#age').val();
        item.birthDate = $('#bday').val();
        item.bio = $('#bio').val();
        item.pic = $('#pic_1').val();

        $db.saveDoc(item, {
            success: function (data) {
                // body...
                alert('Data Has been Stored!');
                window.location.reload();
            },
            error: function (data) {
                // body...
                console.log(data);
                alert('Something is Wrong!');
            }
        });


    };


    var myForm = $('#sign1');
    console.log(myForm);

    myForm.validate({
        invalidHandler: function (myForm, validator) {
            // body...
            alert('something is Missing.');



        },
        errorLabelContainer: "#errors",
        wrapper: "li",
        rules: {
            nPoet: 'required',
            age: 'required',
            nCity: 'required',
            bio: 'required'


        },
        messages: {
            nPoet: 'Please create your Poet Name.',
            age: 'How old are you?',
            nCity: 'Where are you From?',
            bio: 'Tell us a little bit more than that about you.'
        },
        submitHandler: function (myForm) {
            // body...
            storePoet();
            $.mobile.changePage("index.html#poets", {
                transition: "slideup"
            });

        }
    });

});

// Global DataBase Name
var $db = $.couch.db('livepoetry');

//images for Profiles
var pImages = [
        "B'galla Mask.gif",
        "Bauchi Mask.gif",
        "Baule Mask.gif",
        "Pointy.gif",
        "PurpGuy.gif",
        "profile-1.gif",
        "RedDog.gif",
        "Rukai Mask.gif",
        "Tsonoqua Mask.gif",
        "Woof.gif",
        "Yoruba Mask.gif"
];

//Delete Data Function
var linkList = function (data) {
    // body...
    var alink  = '<a class="db" href="#">';
        alink += "Delete";
        alink += "</a>";
        $('.dl').append(alink);
};

var deletePoet = function (data) {
    console.log($(this));
    confirm('Are you sure you want to delete this record?');
    $db.allDocs({
        success:function(data) {
            // body...

            if ($(this)) {

                $.each(data.rows, function(index, val) {
                 //iterate through array or object
                 if (val.id.substr(0, 5)=== "poet:") {
                    var rev = val.value.rev;
                    var id = val.id;
                    var item = {};
                        item._id = id;
                        item.rev = rev;

                        console.log(item);



                    }

            });


            }



        }
    });

};

var deleteAll = function (data) {
    $db.view('app/poets', {
        success:function(data){
            $.each(data.rows, function(i, poets) {
                 //iterate through array or object
                 var id = poets.id;
                var key= poets.key;
                 var rev = poets.value.rev;
                 var item= {};
                    item._id = id;
                    item._rev = rev;

                    console.log(id);

                  $db.removeDoc(item, {
                    success: function(data) {
                        // body...
                        alert('All the Data has been erased from Database!');
                        window.location.reload();
                    },
                    error: function(data) {
                        // body...
                        alert('There was an Error while deleting All Data.');
                    }

                  });

            });
    
        }
});
};


