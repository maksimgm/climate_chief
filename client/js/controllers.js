// TODOS....
// BACKEND SET UP AUTH FOR USERS...CHECK OUT NEW BRANCH
// CHOOSE THEME AND ADD STATIC PAGES...BOOTSWATCH THEME
// USER EXPERIENCE...CLICK BUTTONS AND STYLING THE DIVS
// DIVS
// TOUCH UP ON THE STYLING

    // Adds autocomplete to trip form location text field
//GOOGLE MAPS AUTO COMPLETE API = AIzaSyDRtPelzvMVwlTwyQuhN-goYUByFUVNlIo
// CONSIDER USING REDIS TO CACHE USER SEARCH

// });
app.controller('MainController', function($scope, $http, $filter, $auth) {
  $scope.user = $auth.getPayload().user;

  populateChart = function (){
    $('#container').highcharts({
        title: {
            text: 'Annual Solar Data',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: National Resource Energy Lab',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'kWh/m2/day'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#FF9955'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 5
        },
        chart:{
          // make responsive..
          width: 350,
          height: 300,
          backgroundColor: "#EE7942",
          borderRadius: 5,
          border: 2,
          borderSize: 4,
          // margin: 0  ,
          paddingLeft: 10
        },
        series: [{
            name: 'DNI',
            data: dniArr
        }, {
            name: 'GHI',
            data: ghiArr
        }, {
            name: 'LT',
            data: latTiltArr
        }]
    });
};

  // BTN DIV TOGGLE, 
  $scope.firstWrapper = false;
  $scope.firstToggle = function(){
    $scope.firstWrapper = !$scope.firstWrapper;
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
    $scope.showMap = false;
  };

  // $scope.fourthWrapper = false;
  // $scope.fourthToggle = function(){
  //   if(($scope.firstWrapper || $scope.secondWrapper || $scope.thirdWrapper) === false){
  //     $scope.fourthWrapper = !$scope.fourthWrapper;
  //   }
  // };
  // $scope.fillerClick = function(){

  // };
// Air Now detailed air information... API call

  // use this date to plug into the airData
  // $scope.filterdatetime = $filter('date')(new Date(), 'yyyy MM dd');


// gauge for air quality
airQualityIndexGauage = function(val){
  var opts = {
    lines: 12,
    angle: 0.5,
    lineWidth: 0.1,
    limitMax: 'false', 
    // percentColors: [[0, "#cccccc" ], [50, "#00ff00"], [100, "#00ff00"]], // !!!!
    strokeColor: 'white',
    generateGradient: false,
      pointer: {
      length: 0.9, // The radius of the inner circle
      strokeWidth: 0.035, // The rotation offset
    },
    };
    if (val < 33) {
      opts.colorStart = 'red';
    } else if(val < 67 && val > 33){
      opts.colorStart = 'orange';
    }else{
      opts.colorStart = 'green';
    }
    var target = document.getElementById('foo'); // your canvas element
    var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 100; // set max gauge value
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(val); // set actual value
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
      // do the same for other two arrays
      // return $scope.DniArr.forEach(function(ele,i,arr){
      //   console.log(ele);
      // });
      populateChart();
    });
  };


  weather = function(){
    var url = "//api.openweathermap.org/data/2.5/weather?lat="+ $scope.lat+"&lon="+ $scope.lng+"&appid=2de143494c0b295cca9337e1e96b00e0&units=imperial";
    $http.get(url).then(function(weather){
      
      // CLOUD NUMBER...WHAT DOES THIS MEAN???
    // LEFT CLUSTER

    $scope.weather = {
      temp: weather.data.main.temp,
      temp_min: weather.data.main.temp_min,
      temp_max: weather.data.main.temp_max,
      desc: weather.data.weather[0].description +" and "+ weather.data.weather[1].description,
      clouds: weather.data.clouds.all,
      pres: weather.data.main.pressure,
      hum: weather.data.main.humidity,
      wind_speed: weather.data.wind.speed,
      wind_degree: weather.data.wind.deg
    };  
    });
  };
  




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
      airQualityIndexGauage($scope.data.airQualityIndex);      
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
      solarEnergy();
      weather();
    });
  };
  $scope.initMap();

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