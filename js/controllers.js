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



































// app.controller('geolocCtrl', ['$scope', function($scope) {

//   var geocoder;
//   var map;
//   $scope.initialize = function(){
//       geocoder = new google.maps.Geocoder();
//       map = new google.maps.Map(document.getElementById("map"),
//       {
//           zoom: 8,
//           center: new google.maps.LatLng(22.7964,79.5410),
//           mapTypeId: google.maps.MapTypeId.ROADMAP
//       });
//   };

//   $scope.codeAddress = function()
//   {
//       var address = document.getElementById("address").value;
//       geocoder.geocode( { 'address': address}, function(results, status)
//       {
//           if (status == google.maps.GeocoderStatus.OK)
//           {
//               map.setCenter(results[0].geometry.location);
//               var marker = new google.maps.Marker(
//               {
//                   map: map,
//                   position: results[0].geometry.location
//               });
//           }
//           else
//           {
//               alert("Geocode was not successful for the following reason: " + status);
//           }
//       });
//   };
// }]);