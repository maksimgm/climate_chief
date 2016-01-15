
    // Adds autocomplete to trip form location text field
//GOOGLE MAPS AUTO COMPLETE API = AIzaSyDRtPelzvMVwlTwyQuhN-goYUByFUVNlIo
// CONSIDER USING REDIS TO CACHE USER SEARCH

// });
app.controller('MainController', function($scope, $http, $filter) {
  

  // BTN DIV TOGGLE, 
  $scope.firstWrapper = false;
  $scope.firstToggle = function(){
    $scope.firstWrapper = !$scope.firstWrapper;
  };
// second wrapper
  $scope.secondWrapper = false;
  $scope.secondToggle = function(){
    $scope.secondWrapper = !$scope.secondWrapper;
  };

  $scope.thirdWrapper = false;
  $scope.thirdToggle = function(){
    $scope.thirdWrapper = !$scope.thirdWrapper;
  };

  $scope.fourthWrapper = false;
  $scope.fourthToggle = function(){
    $scope.fourthWrapper = !$scope.fourthWrapper;
  };
  // $scope.fillerClick = function(){

  // };
// Air Now detailed air information... API call

  // use this date to plug into the airData
  $scope.filterdatetime = $filter('date')(new Date(), 'yyyy MM dd');


  // var airData = function(){
  //   var url = "http://www.airnowapi.org/aq/forecast/latLong/?callback=JSON_CALLBACK&format=application/json&latitude=39.0509&longitude=-121.4453&date=2016-01-15&distance=25&API_KEY=708F86AF-4832-4810-A182-AFA9466E23CB";
  //   $http.get({method:"JSONP", url:url})
  //     .then(function(res){
  //       console.log(res);
  //   },function(err){
  //     console.log(err);
  //   });
  // };

  // airData();

  var airData = function(){
    // var url =  "http://itunes.apple.com/&search?term=jack+johnson";
      $http({method: 'jsonp', url: "http://itunes.apple.com/&search?term=jack+johnson"}).
      success(function(data) {
        $scope.countries = data;
        console.log('success');
      }).
      error(function(data) {
        console.log('error');
    });
  };

  airData();





// breezeOmeter air info... API call
  var breezeData = function(){
    var url = "https://api.breezometer.com/baqi/?lat="+ $scope.lat +"&lon="+ $scope.lng +"&key=1827fecc1c064b05b2e2d07f90961a74";
    $http.get(url).then(function(data){
      if(data.data.data_valid === false){
        // $scope.error_message = data.data.error.message;
        alert(data.data.error.message);
        return;
      }
      $scope.data = {
        airQualityDesc: data.data.breezometer_description,
        airQualityIndex: data.data.breezometer_aqi,
        healthRecommendations: data.data.random_recommendations.health,
        dominantPollutant: data.data.dominant_pollutant_description,
        pollutionEffects: data.data.dominant_pollutant_text.effects
      };
      // error handeling... why is this not working????
      // ERROR HANDELING!!!
      console.log(data.data_valid);
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
      if(place.geometry.viewport) {
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
      // airData();
      // CHECK TO SEE IF BREEZEOMETER DATA IS AVAILABLE. IF IT IS NOT AVAILABLE THEN RETURN A FLASH MESSAGE.
    });
  };
  $scope.initMap();

});


    
  