// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
(function () {
var eve=angular.module('app', ['ionic',
  'base64',
  'ngCordova',
  'angular-storage',
  'LocalStorageModule',
  'ngAnimate',
  'ui.rCalendar',
  'app.controllers',
  'app.routes',
  'app.services',
  'app.directives',
  'login',
  'calendar',
  'home',
  'ionic-modal-select',
   'onezone-datepicker',
   'ionic-material',
   'ionMdInput',

  'ui.router'
])

eve.run(function($ionicPlatform,$animate) {
  'use strict';
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);


    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(device.platform === "iOS") {
        window.plugin.notification.local.promptForPermission();
    }
    window.plugin.notification.local.onschedule = function (id, state, json) {
            var notification = {
                id: id,
                state: state,
                json: json
            };
            $timeout(function() {
                $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
            });
        };
        document.addEventListener("deviceReady", function() {
      // Event handling for Local Notifications
      window.plugin.notification.local.ontrigger  = function(id, state, json) {
        $rootScope.$broadcast('onNotificationClick', id, state, json);
      };
      // You can add more here for oncancel, ontrigger etc.
    });
  })
})
eve.config(function($ionicConfigProvider,$stateProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
  $ionicConfigProvider.views.swipeBackEnabled(true);
$ionicConfigProvider.navBar.alignTitle('center');
$stateProvider.state('menu',{});

})
eve.directive('selectClick', function($ionicPlatform) {
  'use strict';

  return {
    restrict: 'A',
    scope: true,

    controller: function($scope, $element) {

      $element.bind('click', function() {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      });
      var select = $element.find('select');
      select.bind('blur', function() {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      });
    }
  }
});

}());
