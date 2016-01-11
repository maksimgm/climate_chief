app.controller("MainController", function($scope, $http, $rootScope){
  // api key... 1827fecc1c064b05b2e2d07f90961a74
  var url = "https://api.breezometer.com/baqi/?lat=40.7324296&lon=-73.9977264&key=1827fecc1c064b05b2e2d07f90961a74";
    $http.get(url).then(function(data){
      $scope.data = data;
      console.log(data);
  });
});