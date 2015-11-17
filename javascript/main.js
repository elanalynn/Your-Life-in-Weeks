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

function initialSubmit() {
  $('#initial-submit').click(function() {
    setPersonalInfo();
    window.location = 'grid.html';
  });
}

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
  $('#details-box').prepend('<p> DOB: ' + localStorage.birthday + '</p>');
  $('#details-box').prepend('<h4>' + localStorage.username + '</h4>');
}

function cursorToPointer() {
  $( '.week-unit' ).hover(function() {
    $( this ).css( 'cursor', 'pointer' );
   });
  $( '.get-started' ).hover(function() {
    $( this ).css( 'cursor', 'pointer' );
  });
}

function hoverEffect() {
  $( '.week-unit' ).hover( function() {
    $( this ).fadeOut( 100 );
    $( this ).fadeIn( 500 );
  });
}

function checkEventsInLocalStorage() {

  for ( var key in localStorage ) {
    console.log ( key );
    for (var i = 0; i < 5200; i++) {
      if( key == i ){
        console.log('eventChecker');
        $( "#" + i ).addClass( 'red' );
      }
    }
  }
}

//End init functions on grid page

//get Form Data

function eventSubmitListener() {
  $( '#event-submit' ).click( function() {
    var address = $( '.event-address' ).val();
    //getAddress( address );
    setEventInfo();
    return address;
  });
}

function weekClickListener() {
  var currentEvent = {},
      parsedDate,
      parsedTitle,
      parsedDesc;

  $( '.week-unit' ).click( function() {

    // Check if the week has an associated event
    if ($( this ).hasClass( 'red' )){
      console.log('Something happened this week');
    } else if ( ( $( this ).attr( 'id' ) ) > key1) {
      console.log('Stop.');
    } else {
      console.log('Nothing happened this week.');
    }

    // Loop through localStorage to compare keys to this
    for ( var key in localStorage ) {
      if ( $( this ).attr( 'id' ) == key ) {
        // Assign variables to display
        currentEvent = JSON.parse( localStorage.getItem( key ) );
        parsedDate = currentEvent.date;
        parsedTitle = currentEvent.title;
        parsedDesc = currentEvent.description;
    }
  }

    console.log( currentEvent, parsedDate, parsedTitle, parsedDesc );
    console.log(this);
    console.log( key );

    // Clear out .event-info if there is anything in it and re-show it
    $('.event-info').empty();
    $('.event-info').hide();
    $('.event-info').append( currentEvent );
    $('.event-info').show();

    // Append info to .event-info
    $( '.event-info' ).append
      ('<div class="event-info"><h4>' +
      parsedDate + '</h4><h3>' +
      parsedTitle + '</h3><p>' +
      parsedDesc + '</p></div>');

  });
}

function getLifeEvent(weeksDiff, eventInfo) {

  for (var i = 0; i < 5201; i++) {
    var parsedInfo,
        parsedDate,
        parsedTitle,
        parsedDescription;

    if( i === weeksDiff ){
      parsedInfo = JSON.parse( localStorage.getItem( i ) );
      parsedDate = parsedInfo.date;
      parsedTitle = parsedInfo.title;
      parsedDescription = parsedInfo.description;
      console.log( parsedDate, parsedTitle, parsedDescription );


    } else if ( i > weeksDiff) {
      return null;
    }
  }

}

function checkDate( date, eventInfo ) {
  var birthdayMS = new Date( localStorage.getItem( 'birthday' ) ).getTime();
  var eventDateMS = new Date( date ).getTime();
  var msToDayFactor = 86400000;
  var daysInWeek = 7;
  var weeksDiff = Math.ceil( ( eventDateMS - birthdayMS ) / msToDayFactor / daysInWeek );

  console.log( eventDateMS, birthdayMS, weeksDiff );
  localStorage.setItem( weeksDiff, JSON.stringify( eventInfo ) );

  getLifeEvent(weeksDiff, eventInfo);

  for( var i = 0; i < 5200; i++ ){
    if( weeksDiff === i ) {
      console.log('eventLogged');
      $( "#" + i ).addClass( 'red' );
    } else if ( weeksDiff < i ) {
      return null;
    }
  }
}

function setEventInfo() {

  var eventInfo = {};
  eventInfo.date = $( '.event-date' ).val();
  eventInfo.title = $( '.event-title' ).val();
  eventInfo.description = $( '.event-description' ).val();
  eventInfo.color = $( '.event-color' ).val();
  eventInfo.address = $( '.event-address' ).val();
  localStorage.setItem( 'eventInfo', JSON.stringify( eventInfo ) );

  checkDate(eventInfo.date, eventInfo);

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
  //Index initial functions
  initialSubmit();

  //Grid page initial functions
  drawGrid();
  cursorToPointer();
  hoverEffect();
  displayPersonalInfo();
  eventSubmitListener();
  weekClickListener();
  checkEventsInLocalStorage();
  // eventListener();
}
//Grid Page Scripts Start

//Generic Ready Function
$(document).ready(init());
