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
// CONSIDER USING REDIS TO CACHE USER SEARCH

// });
app.controller('MainController', function($scope, $http) {
  // wrap info in a function
  
  breezeData = function(){
    var url = "https://api.breezometer.com/baqi/?lat="+ $scope.lat +"&lon="+ $scope.lng +"&key=1827fecc1c064b05b2e2d07f90961a74";
    $http.get(url).then(function(data){
      $scope.data = {
        airQualityIndex: data.data.breezometer_description,
        healthRecommendations: data.data.random_recommendations.health,
        dominantPollutant: data.data.dominant_pollutant_description,
        pollutionEffects: data.data.dominant_pollutant_text.effects
      };
      
    });
  };
    // air quality index
    // $scope.data.airQualityIndex = data.data.breezometer_aqi ;
    // var airQualityIndex = $scope.data.breezometer_aqi;
    
    // console.log(data.data.breezometer_description);
    // console.log(data.data.random_recommendations.health);
    // console.log(data.data.dominant_pollutant_description);
    // console.log(data.data.dominant_pollutant_text.effects);

  



  var geocoder = new google.maps.Geocoder();
  $scope.geoFun = function() {
    geocoder.geocode( { "address": $scope.address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
            $scope.lat = results[0].geometry.location.lat();
            $scope.lng = results[0].geometry.location.lng();
            initMap();
            breezeData();
            // call breez function to get access to 
        }
    });
  };

  initMap = function() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: $scope.lat, lng: $scope.lng},
      // add details about the type of map...HYBRID
      // add marker
      scrollwheel: false,
      zoom: 13
    });
  };


});