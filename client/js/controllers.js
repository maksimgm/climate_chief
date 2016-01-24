// TODOS....
// make the app more responsive

    // Adds autocomplete to trip form location text field
//GOOGLE MAPS AUTO COMPLETE API = AIzaSyDRtPelzvMVwlTwyQuhN-goYUByFUVNlIo
// CONSIDER USING REDIS TO CACHE USER SEARCH

// });
app.controller('MainController', function($scope, $http, $filter, $auth) {
  
  // window.onload=function(){
  // $(function(){
  //   if(window.location.protocol==="https:")
  //     window.location.protocol="http";
  //   });
  // };

  $scope.user = $auth.getPayload().user;
  
populateChart = function(){
FusionCharts.ready(function () {
  var visitChart = new FusionCharts({
    type: 'msline',
    renderAt: 'chart-container',
    width: '550',
    height: '350',
    backgroundColor: "#428BCA",
    borderRadius: "3px",
    margin: "0 auto",
    dataFormat: 'json',
    dataSource: {
      "chart": {
        "backgroundColor": "red",
        "caption": "Annual Solar Data",
        "subCaption": "All values in: kWh/m2/day",
        "captionFontSize": "14",
        "subcaptionFontSize": "14",
        "subcaptionFontBold": "0",
        "paletteColors": "#0075c2, #1aaf5d, #FF0000",
        "showBorder": "0",
        "showShadow": "0",
        "showCanvasBorder": "0",
        "usePlotGradientColor": "0",
        "legendBorderAlpha": "0",
        "legendShadow": "0",
        "showAxisLines": "0",
        "showAlternateHGridColor": "0",
        "divlineThickness": "1",
        "divLineIsDashed": "1",
        "divLineDashLen": "1",
        "divLineGapLen": "1",
        "xAxisName": "Months",
        "showValues": "0",
        "exportenabled": "1",
        "exportatclient": "0"               
      },
      "categories": [
        {
          "category": [
            { "label": "Jan" }, 
            { "label": "Feb" }, 
            { "label": "Mar" },
            { "label": "Apr" },
            { "label": "May" },
            { "label": "Jun" },
            { "label": "Jul" },
            { "label": "Aug" },
            { "label": "Sep" },
            { "label": "Oct" },
            { "label": "Nov" },
            { "label": "Dec" },
          ]
        }
      ],
      "dataset": [
        {
          "seriesname": "DNI",
          "data": [
              {"value": dniArr[0]},
              {"value": dniArr[1]},
              {"value": dniArr[2]},
              {"value": dniArr[3]},
              {"value": dniArr[4]},
              {"value": dniArr[5]},
              {"value": dniArr[6]},
              {"value": dniArr[7]},
              {"value": dniArr[8]},
              {"value": dniArr[9]},
              {"value": dniArr[10]},
              {"value": dniArr[11]}
            ]     
        }, 
        {
          "seriesname": "GHI",
          "data": [
            {"value": ghiArr[0]},
            {"value": ghiArr[1]},
            {"value": ghiArr[2]},
            {"value": ghiArr[3]},
            {"value": ghiArr[4]},
            {"value": ghiArr[5]},
            {"value": ghiArr[6]},
            {"value": ghiArr[7]},
            {"value": ghiArr[8]},
            {"value": ghiArr[9]},
            {"value": ghiArr[10]},
            {"value": ghiArr[11]}
          ]
        },
        {
          "seriesname": "Lat Tilt",
          "data": [
            {"value": latTiltArr[0]},
            {"value": latTiltArr[1]},
            {"value": latTiltArr[2]},
            {"value": latTiltArr[3]},
            {"value": latTiltArr[4]},
            {"value": latTiltArr[5]},
            {"value": latTiltArr[6]},
            {"value": latTiltArr[7]},
            {"value": latTiltArr[8]},
            {"value": latTiltArr[9]},
            {"value": latTiltArr[10]},
            {"value": latTiltArr[11]}
          ]
        }
      ], 
      "trendlines": [
        {
          "line": [
            {
              "color": "#6baa01",
              "valueOnRight": "1",
              "displayvalue": "Annual Avg"
            }
          ]
        }
      ]
    }
  }).render();
});
};
  // BTN DIV TOGGLE, 
  $scope.firstWrapper = false;
  $scope.firstToggle = function(){
    debugger;
    $scope.firstWrapper = true;
    $scope.secondWrapper = false;
    $scope.thirdWrapper = false;
    $scope.showMap = false;
  };
// second wrapper
  $scope.secondWrapper = false;
  $scope.secondToggle = function(){
    $scope.secondWrapper = !$scope.secondWrapper;
    $scope.firstWrapper = false;
    $scope.thirdWrapper = false;
    $scope.showMap = false;
  };

  $scope.thirdWrapper = false;
  $scope.thirdToggle = function(){
    $scope.thirdWrapper = !$scope.thirdWrapper;
    $scope.firstWrapper = false;
    $scope.secondWrapper = false;
    $scope.showMap = false;
  };

  $scope.showMap = false;
  $scope.mapToggle = function(){
    $scope.showMap = !$scope.showMap;
    $scope.firstWrapper = false;
    $scope.secondWrapper = false; 
    $scope.thirdWrapper = false;
  };

  



  // National Resource Energy Lab... Solar energy... Lat and Long.
  solarEnergy = function(){
    var url = "https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=aaeAF66WRB6IQou8P3WqLT7XQjXROd27QuUS4FFG&lat="+ $scope.lat +"&lon="+ $scope.lng;
    $http.get(url).then(function(solar){
      objDni = solar.data.outputs.avg_dni.monthly;
        dniArr = _(objDni).toArray();
      objGhi = solar.data.outputs.avg_ghi.monthly;
        ghiArr = _(objGhi).toArray();
      objLatTilt = solar.data.outputs.avg_lat_tilt.monthly;
        latTiltArr = _(objLatTilt).toArray();
      populateChart();
    });
  };


  weather = function(){
    $http.get('/auth/weather/'+$scope.lat+'/'+$scope.lng)
    .success(function(weather){
      $scope.weather = {
        temp: weather.body.currently.apparentTemperature,
        cloud: weather.body.currently.cloudCover,
        hum: weather.body.currently.humidity,
        ozone: weather.body.currently.ozone,
        pres: weather.body.currently.pressure,
        windSpeed: weather.body.currently.windSpeed,
        summary: weather.body.daily.summary,
      };
    });
  };

removeGauge = function(){
  var element = document.getElementById("gauge");
  var gaugeSvg;
  if(!!element.firstChild){
    gaugeSvg = document.getElementsByTagName("svg");
    element.removeChild(element.firstChild);    
  }
};

// breezeOmeter air info... API call
  breezeData = function(){
    var url = "https://api.breezometer.com/baqi/?lat="+ $scope.lat +"&lon="+ $scope.lng +"&key=1827fecc1c064b05b2e2d07f90961a74";
    $http.get(url).then(function(data){
      if(data.data.data_valid === false){
        // $scope.error_message = data.data.error.message;
        alert(data.data.error.message);
        return;
      }
      removeGauge();
      $scope.data = {
        airQualityDesc: data.data.breezometer_description,
        airQualityIndex: data.data.breezometer_aqi,
        healthRecommendations: data.data.random_recommendations.health,
        dominantPollutant: data.data.dominant_pollutant_description,
        pollutionEffects: data.data.dominant_pollutant_text.effects
      };
      airQualityIndexGauage(data.data.breezometer_aqi);
    });
  };

  // gauge for air quality
  airQualityIndexGauage = function(val){
    var g = new JustGage({
      id: "gauge",
      class : 'currentGage',
      value: val,
      min: 0,
      max: 100,
      title: "Local Air Quality"
    });
  };
  

   function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.7833, lng: -85.4167},
      zoom: 8
    });
    var input = /** @type {!HTMLInputElement} */(
    document.getElementById('pac-input'));
    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
    var autocomplete = new google.maps.places.Autocomplete(input) ;
// { types: ['(cities)'], componentRestrictions : { country: 'usa' }}
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    

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
      weather();
      solarEnergy();
    });
  }
  initMap();
});


app.controller("LoginController", function($scope, $auth, $location){
  $scope.authenticate = function(provider) {
  $auth.authenticate(provider)
    .then(function() {
      console.log('You have successfully signed in with ' + provider + '!');
      $location.path('/home');
    })
    .catch(function(error) {
      if (error.error) {
        // Popup error - invalid redirect_uri, pressed cancel button, etc.
        console.log(error.error);
      } else if (error.data) {
        // HTTP response error from server
        console.log(error.data.message, error.status);
      } else {
        console.log(error);
      }
    });
  };
});


app.controller('LogoutController', function($location, $auth) {
  if (!$auth.isAuthenticated()) { return; }
  $auth.logout()
    .then(function() {
      console.log('You have been logged out');
      $location.path('/');
    });
  });


app.controller('SignupController', function($scope, $location, $auth) {
  $scope.authenticate = function(provider) {
  $auth.authenticate(provider)
    .then(function() {
      console.log('You have successfully signed in with ' + provider + '!');
      $location.path('/home');
    })
    .catch(function(error) {
      if (error.error) {
        // Popup error - invalid redirect_uri, pressed cancel button, etc.
        console.log(error.error);
      } else if (error.data) {
        // HTTP response error from server
        console.log(error.data.message, error.status);
      } else {
        console.log(error);
      }
  });
  };
  $scope.signup = function() {
    $auth.signup($scope.user)
      .then(function(response){
        $auth.setToken(response);
        $location.path('/');
        console.log('You have successfully created a new account and have been signed-in');
      })
      .catch(function(response) {
        console.log(response.data.message);
      });
    };
  });