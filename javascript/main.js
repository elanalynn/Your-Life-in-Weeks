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

function init () {
  drawGrid();
  descClick();

  $('.week-unit').hover(function() {
    $(this).css('cursor', 'pointer');
   });

  $('.week-unit').click(function() {
    $(this).addClass('blue');
  });
}


$(document).ready(init());
