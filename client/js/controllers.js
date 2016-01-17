
    // Adds autocomplete to trip form location text field
//GOOGLE MAPS AUTO COMPLETE API = AIzaSyDRtPelzvMVwlTwyQuhN-goYUByFUVNlIo
// CONSIDER USING REDIS TO CACHE USER SEARCH

// });
app.controller('MainController', function($scope, $http, $filter) {
  

  // BTN DIV TOGGLE, 
  $scope.firstWrapper = false;
  $scope.firstToggle = function(){
    if(($scope.secondWrapper || $scope.thirdWrapper || $scope.fourthWrapper) === false){
      $scope.firstWrapper = !$scope.firstWrapper;
    }
  };
// second wrapper
  $scope.secondWrapper = false;
  $scope.secondToggle = function(){
    if(($scope.firstWrapper || $scope.thirdWrapper || $scope.fourthWrapper) === false){
      $scope.secondWrapper = !$scope.secondWrapper;
    }
  };

  $scope.thirdWrapper = false;
  $scope.thirdToggle = function(){
    if(($scope.firstWrapper || $scope.secondWrapper || $scope.fourthWrapper) === false){
      $scope.thirdWrapper = !$scope.thirdWrapper;
    }
  };

  $scope.fourthWrapper = false;
  $scope.fourthToggle = function(){
    if(($scope.firstWrapper || $scope.secondWrapper || $scope.thirdWrapper) === false){
      $scope.fourthWrapper = !$scope.fourthWrapper;
    }
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

    // var url =  "http://itunes.apple.com/&search?term=jack+johnson";
  // airData = function(){
  //     $http({
  //       method: 'jsonp',
  //       url: "https://itunes.apple.com/search?term=jack+johnson"
  //     }).then(function successCb(res){
  //       console.log(res);
  //     }), function errorCb(res){

  //      console.log(res);
  //       }
   
  // };
  // airData();



  // National Resource Energy Lab... Solar energy... Lat and Long.
  solarEnergy = function(){
    var url = "https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=aaeAF66WRB6IQou8P3WqLT7XQjXROd27QuUS4FFG&lat="+ $scope.lat +"&lon="+ $scope.lng;
    $http.get(url).then(function(solar){
      var objDni = solar.data.outputs.avg_dni.monthly,
       DniArr = _(objDni).toArray(),
      objGhi = solar.data.outputs.avg_ghi.monthly,
       GhiArr = _(objGhi).toArray(),
      objLatTilt = solar.data.outputs.avg_lat_tilt.monthly,
       LatTiltArr = _(objLatTilt).toArray();
    // do the same for other two arrays
      DniArr.forEach(function(ele,i,arr){
        console.log(ele);
      });
          
    });
  };


  weather = function(){
    var url = "http://api.openweathermap.org/data/2.5/weather?lat="+ $scope.lat+"&lon="+ $scope.lng+"&appid=2de143494c0b295cca9337e1e96b00e0"     
    $http.get(url).then(function(weather){
      // console.log(weather);
      // CLOUD NUMBER...WHAT DOES THIS MEAN???
      // console.log(weather.data.clouds);
      // main information
       console.log("wind degree: "+weather.data.wind.deg);
       console.log("Winde Speed: "+weather.data.wind.speed);

      // console.log("Temp: "+weather.data.main.temp);
      // console.log("Temp MIN: "+weather.data.main.temp_min);
      // console.log("Temp MAX: "+weather.data.main.temp_max);
      // console.log("Pressure: "+weather.data.main.pressure);
      // console.log("humidity: "+weather.data.main.humidity);


      // console.log(weather.data.main.rain);
      // console.log(weather.data.main.weather);
    });
  };
  




// breezeOmeter air info... API call
  var breezeData = function(){
    var url = "https://api.breezometer.com/baqi/?lat="+ $scope.lat +"&lon="+ $scope.lng +"&key=1827fecc1c064b05b2e2d07f90961a74";
    $http.get(url).then(function(data){
      if(data.data.data_valid === false){
        // $scope.error_message = data.data.error.message;
        // alert(data.data.error.message);
        // return;
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
      // console.log(data.data_valid);
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
      // solarEnergy();
      weather();
      // airData();
      // CHECK TO SEE IF BREEZEOMETER DATA IS AVAILABLE. IF IT IS NOT AVAILABLE THEN RETURN A FLASH MESSAGE.
    });
  };
  $scope.initMap();

});


    
  