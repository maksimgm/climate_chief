var app = angular.module("EssentialAir", ['angularReverseGeocode']);




app.directive('reverseGeocode', function () {
    return {
      restrict: 'E',
      template: '<div></div>',
      link: function (scope, element, attrs) {
          var geocoder = new google.maps.Geocoder();
          var LatLng = new google.maps.LatLng(attrs.lat, attrs.lng);
          geocoder.geocode({ 'latLng': LatLng }, function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                  if (results[1]) {
                      element.text(results[1].formatted_address);
                  } else {
                      element.text('Location not found');
                  }
              } else {
                  element.text('Geocoder failed due to: ' + status);
              }
          });
          var mapOptions  = {
            center: myLatLng,
            zoom: 16,
          // Default is ROADMAP
            mapTypeId: google.maps.MapTypeId.HYBRID
          };
          var map = new google.maps.Map(document.getElementById(attrs.id),mapOptions);
          var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: "Home"
          });
          marker.setMap(map);
        },
      replace: true
    };
});
