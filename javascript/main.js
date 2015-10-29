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
    };
  };
}

function cursorToPointer() {
  $('.week-unit').hover(function() {
    $(this).css('cursor', 'pointer');
   });
}

function toggleBlue() {
  $('.week-unit').click(function() {
    if ($(this).hasClass('blue')){
      $(this).removeClass('blue');
    } else {
      $(this).addClass('blue');
    }
  });
}

// function toggleDesc() {
//   var description = "description";
//   var title = "title";
//   $('.week-unit').click(function() {
//     if (('week-unit').hasClass('descOn')) {
//       $('.description').removeClass('descOn')
//       $('.description').addClass('descOff')
//     } else {
//       $(this).addClass('descOn');
//       $('.desc-box').append('<h4 class = "event-title">' + title + '</h4> <p class = "description">' + description + '</p>');
//     }
//   });
// }

function toggleDesc() {
  var description = "description";
  var title;
  $('.submit-event').click(function() {
    title = $("#event-title").val();
  });
  $('.week-unit').click(function() {
    $('.desc-box').append('<h4 class = "event-title">' + title + '</h4> <p class = "description">' + description + '</p>');
  });


}

function init () {
  drawGrid();
  cursorToPointer();
  toggleBlue();
  toggleDesc();
};

$(document).ready(init());
