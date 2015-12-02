// var feedInfo;
// var entries = [];

// var initialize = function () {
//   var feedUrl = "http://feeds.feedburner.com/tedtalks_video"
//   var entryCount = 20;
//   console.log(google.feeds)
//   var feed = new google.feeds.Feed(feedUrl);
//   feed.setNumEntries(entryCount);
  
//   feed.load(function(result) {
//     if (!result.error) {
//       console.log(result);
//       results = result.feed;
//       var app = angular.module('feedApp', []);
//       app.controller('feedLoader', function($scope){
//         $scope.entries = result.feed.entries;
//       })
//     }
//   });
  

// }

/******** INVOCATION *********/
google.load("feeds", "1");
console.log('post load')
console.log(google);
// google.setOnLoadCallback(initialize);
