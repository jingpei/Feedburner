// google.load("feeds", "1");

var app = angular.module('feedApp', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './app/feedView.html',
      controller: 'feedLoader'
    })
    .when('/:entry', {
      templateUrl: './app/entryView.html',
      controller: 'feedLoader'
    })
    .otherwise({redirectTo: '/'})
})

app.controller('feedLoader', function($scope, $window, $http, $sce, $location){
  $scope.entry;

  var initialize = function () {
    var feedUrl = "https://agile-thicket-5774.herokuapp.com/feed" 
    
    $http({
      method: 'GET',
      url: feedUrl
    })
    .then(function(result){
      if(!result.error){
        console.log(result.data.items);
        window.data = result.data.items[0]
        $scope.entries = result.data.items;
      }
    });
  };

  $scope.$on('$locationChangeStart', function(){
    if($location.$$path.length > 1){
      var entryIndex = $location.$$path.split('/')[1];
      console.log($scope.entries[entryIndex])
      var trustedResource = $sce.trustAsResourceUrl($scope.entries[entryIndex]['media:content']['@url']);
      $scope.entries[entryIndex]['media:content']['@url'] = trustedResource;
      $scope.entries[entryIndex].description = $scope.entries[entryIndex].description.split('<img')[0];
      $scope.entry = $scope.entries[entryIndex];
    } 
  })

  initialize();

});
