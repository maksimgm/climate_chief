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

  var geocoder = new google.maps.Geocoder();
  $scope.geoFun = function() {
    geocoder.geocode( { "address": $scope.address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
            $scope.lat = results[0].geometry.location.lat();
            $scope.lng = results[0].geometry.location.lng();
            initMap();
            breezeData();
            // call breeze function to get access to 
        }else if(status !== google.maps.GeocoderStatus.OK){
          alert("That Information is not available.");
        }
    });
  };


  initMap = function() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: $scope.lat, lng: $scope.lng},
      scrollwheel: false,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.HYBRID
    });

    // var input = document.getElementById('searchTextField');

    //   var autocomplete = new google.maps.places.Autocomplete(input);
    //   autocomplete.bindTo('bounds', map);

    //   var infowindow = new google.maps.InfoWindow();
      

    // autocomplete.addListener('place_changed', function() {
    //   infowindow.close();
    //   // marker.setVisible(false);
    //   var place = autocomplete.getPlace();
    //   if (!place.geometry) {
    //     window.alert("Autocomplete's returned place contains no geometry");
    //     return;
    //   }

    //   // If the place has a geometry, then present it on a map.
    //   if (place.geometry.viewport) {
    //     map.fitBounds(place.geometry.viewport);
    //   } else {
    //     map.setCenter(place.geometry.viewport);
    //     map.setZoom(17);  // Why 17? Because it looks good.
    //   }

    //   var address = '';
    //   if (place.address_components) {
    //     address = [
    //       (place.address_components[0] && place.address_components[0].short_name || ''),
    //       (place.address_components[1] && place.address_components[1].short_name || ''),
    //       (place.address_components[2] && place.address_components[2].short_name || '')
    //     ].join(' ');
    //   }
    // });
    
  };
            // initMap();
            // breezeData();


});