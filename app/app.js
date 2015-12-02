google.load("feeds", "1");

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

app.controller('feedLoader', function($scope, $window, $sce, $location){
  $scope.entry;

  var initialize = function () {
    var feedUrl = "http://feeds.feedburner.com/tedtalks_video"
    var entryCount = 20;
    var feed = new $window.google.feeds.Feed(feedUrl);
    feed.setNumEntries(entryCount);
    feed.load(function(result) {
      if (!result.error) {
        $scope.results = result.feed;
        $scope.entries = result.feed.entries;
        console.log($scope.entries);
        $scope.$apply();
      }
    });
  };

  $scope.$on('$locationChangeStart', function(){
    console.log($location.$$path);
    if($location.$$path.length > 1){
      var entryIndex = $location.$$path.split('/')[1];
      var trustedResource = $sce.trustAsResourceUrl($scope.entries[entryIndex].mediaGroups[0].contents[0].url);
      $scope.entries[entryIndex].mediaGroups[0].contents[0].url = trustedResource;
      $scope.entries[entryIndex].content = $scope.entries[entryIndex].content.split('<img')[0];
      $scope.entry = $scope.entries[entryIndex];
    } 
  })

  $window.google.setOnLoadCallback(initialize);

});
