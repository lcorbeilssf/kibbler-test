// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards', 'starter.controllers', 'RESTConnection', 'KibblerServices'])

//new shizz

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                  console.log(element);
                    modelSetter(scope.$parent, element[0].files[0]);
                    console.log(scope);
                });
            });
        }
    };
}])


.directive('noScroll', function() {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $element.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  };
})

//end of new shizz
.directive('noScroll', function() {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $element.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  };
})



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
  
  .state('swipe', {
    url: '/',
    templateUrl: 'templates/swipe.html',
    controller: 'CardsCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
  })
  .state('file',{
    url: '/file',
    templateUrl: 'templates/doggies.html',
    controller: 'FileCtrl'
  })
  .state('bank', {
    url: '/bank',
    templateUrl: 'templates/bank.html',
    controller: 'BankCtrl'
  });
  
});