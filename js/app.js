var app = angular.module("EssentialAir", []);





app.directive('myMaps', function(){
   return{
     restruct:'E',
     template: "<div></div>",
     replace: true,
     link: function(scope,element,attrs){
       var myLatLng = new google.maps.LatLng(40.7324296, -73.9977264);
       var mapOptions  = {
         center: myLatLng,
         zoom: 16,
         // Default is ROADMAP
         mapTypeId: google.maps.MapTypeId.HYBRID
       };
       var map = new google.maps.Map(document.getElementById(attrs.id),
         mapOptions);
       var marker = new google.maps.Marker({
         position: myLatLng,
         map: map,
         title: "Home"
       });
       marker.setMap(map);
     }
   };
 });