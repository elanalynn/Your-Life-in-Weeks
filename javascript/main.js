//Splash Page Scripts Start

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

//Button in initial-modal to got to grid page

function setPersonalInfo() {
  var username = $( '.username' ).val();
  localStorage.setItem( 'username', username );
  var birthday = $( '.birthday' ).val();
  localStorage.setItem( 'birthday', birthday );
}

$('#initial-submit').click(function() {
  window.location = 'grid.html';
});

//Index scripts end

//Grid page scripts start

function drawGrid() {
  var unitCounter = 1,
      unit,
      rowNumber,
      rowCounter = 1,
      description;

  for(var i = 0; i < 100; i++) {
    rowNumber = '<p class= "row-number" >' + rowCounter++ + '</p>';
    $('#weeks-grid').append(rowNumber);
    for(var j = 0; j < 52; j++) {
      unit = '<div class = "week-unit" id = "' + unitCounter++ + '" data-toggle="tooltip" title = "' + description + '"></div>';
      $('#weeks-grid').append(unit);
    }
  }
}

function displayPersonalInfo() {
  $('#desc-box').prepend('<p>April 1, 1984</p>');//localStorage.getItem('birthday');
  $('#desc-box').prepend('<h4>banana</h4>');//localStorage.getItem('username');

}

function cursorToPointer() {
  $( '.week-unit' ).hover(function() {
    $( this ).css( 'cursor', 'pointer' );
   });
  $( '.get-started' ).hover(function() {
    $( this ).css( 'cursor', 'pointer' );
  });
}

function getFormData() {
  var title = $('$event-title').val();
  var description = $('$event-description').val();
  localStorage.setItem('title', $('#event-title'));
  localStorage.setItem('description', $('#description-id'));
  console.log(title, desciption);
  return title, description;
}

function clickHandler(title, description) {
  $( '.week-unit' ).click(function() {
    if ($( this ).hasClass( 'blue' )){
      $( this ).removeClass( 'blue' );
      $( '.desc-box').remove(title);
      $( '.desc-box').remove(description);
    } else {
      $( this ).addClass( 'blue' );
      $( '.desc-box').append(title);
      $( '.desc-box').append(description);
    }
  });
}

function hoverEffect() {
  $( '.week-unit' ).hover(function() {
    $( this ).fadeOut( 100 );
    $( this ).fadeIn( 500 );
  });
}

function init () {
  drawGrid();
  cursorToPointer();
  clickHandler();
  hoverEffect();
  setPersonalInfo();
  displayPersonalInfo();
}
//Grid Page Scripts Start

//Generic Ready Function
$(document).ready(init());
