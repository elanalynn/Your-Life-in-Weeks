(function() {
  var app = angular.module('weeks', []);

  app.controller('WeeksController', function(){
      this.unit = week;
  });
})();

var week = {
  name: 'week1',
  position: 1,
  description: 'first'
}
