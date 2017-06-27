angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('tabsController.homeTabDefaultPage', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'home/homeTabDefaultPage.html',
        controller: 'homeTabDefaultPageCtrl'
      }
    }
  })

  .state('tabsController.callendarTabDefaultPage', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'calendar/callendarTab.html',
        controller: 'callendarTabCtrl'
      }
    }
  })
  .state('allevents', {
    url: '/allevents',
    templateUrl: 'home/allevents.html',
    controller: 'homeTabDefaultPageCtrl'
  })


  .state('tabsController.exploreTabDefaultPage', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/exploreTabDefaultPage.html',
        controller: 'exploreTabDefaultPageCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  })
  .state('events', {
    url: '/events',
    templateUrl: 'home/events.html',
    controller: 'homeTabDefaultPageCtrl'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'home/profile.html',
    controller: 'homeTabDefaultPageCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'login/register.html',
    controller: 'loginCtrl'
  })

$urlRouterProvider.otherwise('/login')



});
