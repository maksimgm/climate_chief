var app = angular.module("EssentialAir", ['ngRoute', 'satellizer', 'ng-fusioncharts']);


app.config(function($routeProvider, $locationProvider, $authProvider){
  $routeProvider
  .when('/about',{
    templateUrl:'templates/about.html'
  })
  .when('/home', {
    controller: "MainController",
    templateUrl: "templates/index.html",
    resolve: {
      loginRequired: loginRequired
    }
  })
  .when('/', {
    controller: "LoginController",
    templateUrl: "templates/login.html",
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .when('/signup', {
    controller: "SignupController",
    templateUrl: "templates/signup.html",
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .when('/logout', {
    template: null,
    controller: 'LogoutController'
  })
  .otherwise({redirectTo:'/'});

  $locationProvider.html5Mode(true);

  $authProvider.facebook({
    clientId: '1684535625138001',
    url: '/auth/facebook'
  });

  $authProvider.httpInterceptor = false;

  function skipIfLoggedIn($q, $auth, $location) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        $location.path('/home');
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/');
      }
      return deferred.promise;
    }
  
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });



});
