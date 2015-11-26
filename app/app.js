var app = angular.module('feedApp', []);

app.controller('feedLoader', function($scope, $window){
  $scope.entries = $window.results.entries || [1,2,3];
  $scope.results = $window.results;

  console.log($scope.entries);
});
