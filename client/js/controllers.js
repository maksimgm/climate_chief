
    // Adds autocomplete to trip form location text field
//GOOGLE MAPS AUTO COMPLETE API = AIzaSyDRtPelzvMVwlTwyQuhN-goYUByFUVNlIo
// CONSIDER USING REDIS TO CACHE USER SEARCH

// });
app.controller('MainController', function($scope, $http) {
  

  // BTN DIV TOGGLE, TO ACCESS INFO ON 
  $scope.firstWrapper = false;
  $scope.divToggle = function(){
    $scope.firstWrapper = !$scope.firstWrapper;
  };

  $scope.fillerClick = function(){

  };




  var breezeData = function(){
    var url = "https://api.breezometer.com/baqi/?lat="+ $scope.lat +"&lon="+ $scope.lng +"&key=1827fecc1c064b05b2e2d07f90961a74";
    $http.get(url).then(function(data){
      $scope.data = {
        airQualityDesc: data.data.breezometer_description,
        airQualityIndex: data.data.breezometer_aqi,
        healthRecommendations: data.data.random_recommendations.health,
        dominantPollutant: data.data.dominant_pollutant_description,
        pollutionEffects: data.data.dominant_pollutant_text.effects
      };
      // error handeling... why is this not working????
      console.log(data.data_valid);
      if($scope.data.data_valid === false){
        alert("Data not found!");
      }
    });
  };

  $scope.initMap = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7833, lng: -85.4167},
      zoom: 8
    });
    var input = /** @type {!HTMLInputElement} */(
        document.getElementById('pac-input'));
// add a submit button
    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
    var autocomplete = new google.maps.places.Autocomplete(input) ;
// { types: ['(cities)'], componentRestrictions : { country: 'usa' }}
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    // var marker = new google.maps.Marker({
    //   map: map,
    //   anchorPoint: new google.maps.Point(0, -29)
    // });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      // marker.setVisible(false);
      var place = autocomplete.getPlace();
      

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(16);  // Why 16? Because it looks good. :)
      }
       if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }
      $scope.lat = place.geometry.location.lat();
      $scope.lng = place.geometry.location.lng();
      breezeData();
      // CHECK TO SEE IF BREEZEOMETER DATA IS AVAILABLE. IF IT IS NOT AVAILABLE THEN RETURN A FLASH MESSAGE.
    });
  };
  $scope.initMap();

});


    
  