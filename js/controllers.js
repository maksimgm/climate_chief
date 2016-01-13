// breezometer API call
// app.controller("MainController", function($scope, $http, $rootScope){
//   // api key... 1827fecc1c064b05b2e2d07f90961a74
//   var url = "https://api.breezometer.com/baqi/?lat=40.7324296&lon=-73.9977264&key=1827fecc1c064b05b2e2d07f90961a74";
//     $http.get(url).then(function(data){
//       $scope.data = data;
//       console.log(data);
//   });

    // Adds autocomplete to trip form location text field
//GOOGLE MAPS AUTO COMPLETE API = AIzaSyDRtPelzvMVwlTwyQuhN-goYUByFUVNlIo


// });
app.controller('MainController', function($scope) {
  var geocoder = new google.maps.Geocoder();
  $scope.geoFun = function() {
    geocoder.geocode( { "address": $scope.address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
            $scope.lat = results[0].geometry.location.lat();
            $scope.lng = results[0].geometry.location.lng();
            $scope.initMap();
        }
    });
  };

  $scope.initMap = function() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: $scope.lat, lng: $scope.lng},
      scrollwheel: false,
      zoom: 12
    });
  };
});