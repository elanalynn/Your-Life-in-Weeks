// Index page scripts start
// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($( '.navbar' ).offset().top > 50 ) {
        $( '.navbar-fixed-top' ).addClass( 'top-nav-collapse' );
    } else {
        $( '.navbar-fixed-top' ).removeClass( 'top-nav-collapse' );
    }
});

// jQuery for page scrolling feature (requires jQuery Easing plugin)
$( function() {
    $( 'a.page-scroll' ).bind( 'click', function( event ) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Close responsive menu on menu item click
$( '.navbar-collapse ul li a' ).click( function() {
    $( '.navbar-toggle:visible' ).click();
});

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
} // Index scripts end

// // Map Functionality
// function initMap() {
//   var map = new google.maps.Map( document.getElementById( 'map' ), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 10,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });
//   console.log(google.maps.LatLng);
//   return map;
// }
//
// function adjustMapCenter( map, location ) {
//   mapOptions = {
//     center: location,
//     zoom: 15,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//
//   map.setOptions(mapOptions);
// }
//
// function placePin( map, location ) {
//   var marker = new google.maps.Marker({
//       position: location,
//       map: map,
//       title: 'This is where it happened!'
//     });
//   console.log( marker.position );
//   console.log( location );
// }
//
// function getLatLng( map, address ) {
//   var mapsAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
//   var deffered = $.get( mapsAPI + address);
//
//   deffered.done( function( data ) {
//     localStorage.setItem( 'deffered', JSON.stringify(data) );
//     placePin( map, data.results[0].geometry.location );
//     adjustMapCenter( map, data.results[0].geometry.location );
//     console.log( 'Success', data );
//   });
//
//   deffered.fail(function( data ) {
//     console.log( 'Failed');
//   });
// } // End map functions

// Grid page scripts start
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

function checkEventsInLocalStorage() {
  for ( var key in localStorage ) {
    for (var i = 0; i < 5200; i++) {
      if( key == i ){
        $( "#" + i ).addClass( 'color' );
      }
    }
  }
} //End grid page init functions

function eventSubmitListener() {
  $( '#event-submit' ).click( function() {
    //var address = $( '.event-address' ).val();
    setEventInfo();
    //return address;
  });
}

function weekClickListener() {
  var currentEvent,
      parsedDate,
      parsedTitle,
      parsedDesc,
      parsedAddress;

  $( '.week-unit' ).click( function() {
    $( '.event-info' ).empty();

    // Check if the week has an associated event
    if ($( this ).hasClass( 'color' )){
      $( '.event-info' ).append('Something happened this week');
      // Loop through localStorage to compare keys to this
      for ( var key in localStorage ) {
        if ( $( this ).attr( 'id' ) == key ) {
          // Assign variables to display
          currentEvent = JSON.parse( localStorage.getItem( key ) );
          parsedDate = currentEvent.date;
          parsedTitle = currentEvent.title;
          parsedDesc = currentEvent.description;
          parsedAddress = currentEvent.address;
          console.log( currentEvent, parsedDate, parsedTitle, parsedDesc );
        }
      }
      $( '.event-info' ).append('<div class="event-info"><h4>' +
          parsedDate + '</h4><h3>' +
          parsedTitle + '</h3><p>' +
          parsedDesc + '</p><p>' +
          parsedAddress + '</p></div>');
    } else {
      $( '.event-info' ).append('Nothing happened this week.');
      $( '.event-info' ).append('<img src="../images/sad-cat.jpg">');
    }
  });
    //location = getLatLng( map, parsedAddress );
    //adjustMapCenter( map, location );
    // console.log( parsedAddress );
    // console.log( location );
}

function getLifeEvent(weeksDiff, eventInfo) {
  for (var i = 0; i < 5201; i++) {
    var parsedInfo,
        parsedDate,
        parsedTitle,
        parsedDescription,
        parsedAddress;

    if( i === weeksDiff ){
      parsedInfo = JSON.parse( localStorage.getItem( i ) );
      parsedDate = parsedInfo.date;
      parsedTitle = parsedInfo.title;
      parsedDescription = parsedInfo.description;
      parsedAddress = parsedInfo.address;
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

  localStorage.setItem( weeksDiff, JSON.stringify( eventInfo ) );

  getLifeEvent( weeksDiff, eventInfo );

  for( var i = 0; i < 5200; i++ ){
    if( weeksDiff === i ) {
      console.log( 'eventLogged' );
      $( "#" + i ).addClass( 'color' );
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

  checkDate( eventInfo.date, eventInfo );
}

function init () {
  //Index initial function invocations
  initialSubmit();

  //Grid page initial function invocations
  drawGrid();
  cursorToPointer();
  displayPersonalInfo();
  eventSubmitListener();
  weekClickListener();
  checkEventsInLocalStorage();
  //initMap();
}

$(document).ready(init());
