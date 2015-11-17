//Splash Page Scripts Start

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($( '.navbar' ).offset().top > 50 ) {
        $( '.navbar-fixed-top' ).addClass( 'top-nav-collapse' );
    } else {
        $( '.navbar-fixed-top' ).removeClass( 'top-nav-collapse' );
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$( function() {
    $( 'a.page-scroll' ).bind( 'click', function( event ) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$( '.navbar-collapse ul li a' ).click( function() {
    $( '.navbar-toggle:visible' ).click();
});

//Button in initial-modal to got to grid page

function setPersonalInfo() {
  var username = $( '.username' ).val();
  localStorage.setItem( 'username', username );
  var birthday = $( '.birthday' ).val();
  localStorage.setItem( 'birthday', birthday );
}

$('#initial-submit').click(function() {
  setPersonalInfo();
  window.location = 'grid.html';
});

//Index scripts end

//Grid page scripts start

function drawGrid() {
  var unitCounter = 1,
      dateCounter = new Date(localStorage.getItem( 'birthday' )),
      unit,
      rowNumber,
      rowCounter = 1;

      dateCounter.setDate( dateCounter.getDate() + 1 );

  for(var i = 0; i < 100; i++) {
    rowNumber = '<p class= "row-number" >' + rowCounter++ + '</p>';
    $('#weeks-grid').append(rowNumber);
    for(var j = 0; j < 52; j++) {
      unit = '<div class = "week-unit" id = "' + unitCounter + '"data-date="' + dateCounter + '" data-toggle="tooltip"></div>';
      unitCounter ++;
      dateCounter.setDate(dateCounter.getDate() + 7);
      $('#weeks-grid').append(unit);
    }
  }
}

function displayPersonalInfo() {
  $('#desc-box').prepend('<p> DOB: ' + localStorage.birthday + '</p>');
  $('#desc-box').prepend('<h4>' + localStorage.username + '</h4>');
}

function cursorToPointer() {
  $( '.week-unit' ).hover(function() {
    $( this ).css( 'cursor', 'pointer' );
   });
  $( '.get-started' ).hover(function() {
    $( this ).css( 'cursor', 'pointer' );
  });
}

//End init functions on grid page

//get Form Data

// $(".add-event").submit(function(e) {
//   e.preventDefault();
//   e.stopPropagation();
// });

$( '#event-submit' ).click( function() {
  var address = $( '.event-address' ).val();
  //getAddress( address );
  setEventInfo();
  window.location = 'grid.html';
  return address;

});

function setEventInfo() {

  var eventInfo = {};
  eventInfo.date = $( '.event-date' ).val();
  eventInfo.title = $( '.event-title' ).val();
  eventInfo.description = $( '.event-description' ).val();
  eventInfo.color = $( '.event-color' ).val();
  eventInfo.address = $( '.event-address' ).val();
  localStorage.setItem( 'data', JSON.stringify( eventInfo ) );

  checkDate( 'eventInfo.date' );

}

function checkDate( date ) {
  var birthdayMS = new Date(localStorage.getItem( 'birthday' )).getTime();
  var eventDateMS = new Date(date).getTime();

  console.log(birthdayMS, eventDateMS);

  //attachEvent();
}

function attachEvent(eventInfo) {
  console.log(JSON.parse(localStorage.getItem( 'data' )));
  var currentEventDate = JSON.parse(localStorage.getItem( 'data.date' ));
  //console.log('eventInfo = ', eventInfo );
  localStorage.setItem('currentEventDate', currentEventDate );

//  for(var i = 0; i < 5201; i++){
    // if( $( 'div[id="' + i + '"]' )) {
    //   if( currentEventDate === $(this[data-date]).val()) {
    //     console.log( 'HAPPY BIRTHDAY!' );
    //   } else {
    //     console.log('Grr');
    //   }
    // }
  //}
}

function clickHandler(title, description) {
  $( '.week-unit' ).click(function() {
    if ($( this ).hasClass( 'blue' )){
      $( this ).removeClass( 'blue' );
      $( '#desc-box').remove('.event-info');
      // $( '#desc-box').remove('.event-title');
      // $( '#desc-box').remove('.event-description');
      // $( '#desc-box').remove('.event-address');
      // $( '#desc-box').remove('.event-color');
    } else {
      $( this ).addClass( 'blue' );
      $( '#desc-box').append('.event-date');
      $( '#desc-box').append('.event-title');
      $( '#desc-box').append('.event-description');
      $( '#desc-box').append('.event-address');
      $( '#desc-box').append('.event-color');
    }
  });
}

function hoverEffect() {
  $( '.week-unit' ).hover(function() {
    $( this ).fadeOut( 100 );
    $( this ).fadeIn( 500 );
  });
}

// Map Functionality

//   var map = new google.maps.Map( document.getElementById( 'map' ), {
//     center: { lat: 39.7675, lng: -105.0200 },
//     zoom: 15,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });
//
//   console.log(google.maps.LatLng);
//
// function eventListener() {
//
//   $( '#event-submit' ).click( function() {
//     var address = $( '.event-address' ).val();
//     getAddress( address );
//     //getAddressAddPin( address );
//   });
// }
//
// function getAddress( address ) {
//
//   console.log( address + " gotAddressAgain");
//
//   var mapsAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
//
//   var defferedMap = $.get( mapsAPI + address);
//
//   defferedMap.done(function( data ) {
//     localStorage.setItem( 'defferedMap', JSON.stringify(data) );
//     adjustMapCenter(map, data.results[0].geometry.location);
//     console.log( data );
//   });
//
//   defferedMap.fail(function( data ) {
//     console.log( 'Failed');
//   });
// }
//
// function adjustMapCenter( map, location ) {
//   var myLatLng = location;
//
//   var mapOptions = {
//     center: myLatLng,
//     zoom: 15,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//
//   map.setOptions(mapOptions);
// }

// function getAddressAddPin( address ) {
//
//   console.log( address );
//
//   var mapsAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
//
//   var defferedPin = $.get( mapsAPI + address);
//
//   defferedPin.done(function( data ) {
//     localStorage.setItem( 'deferredPin', JSON.stringify(data) );
//     placePin(map, data.results[0].geometry.location);
//     console.log( data );
// });
//
// defferedPin.fail(function( data ) {
//   console.log( 'Failed');
// });
// }



// function placePin( map, location ) {
// var myLatLng = location;
//
// var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     title: 'This is where it happened'
//   });
//
// console.log( marker.position );
// console.log( myLatLng );
// console.log( marker.title );
// }

//Map functions end

function init () {
  drawGrid();
  cursorToPointer();
  clickHandler();
  hoverEffect();
  displayPersonalInfo();
  // eventListener();
}
//Grid Page Scripts Start

//Generic Ready Function
$(document).ready(init());
