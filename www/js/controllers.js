angular.module('app.controllers', ['angular-storage', 'ui.router'])
.run(function($rootScope) {
  $rootScope.merchant;
  $rootScope.target='https://burgerfreaks.gr';
  $rootScope.urlLogin=[$rootScope.target+'/api/authenticate'];

  $rootScope.urlLoadEvents=[$rootScope.target+'/api/event'];
  $rootScope.urlP=[$rootScope.target+'/api/authenticate/user'];
  $rootScope.url = [$rootScope.target+'/api/reservations/all/'+$rootScope.merchant];
  $rootScope.urlT = [$rootScope.target+'/api/event'];
  $rootScope.urlU = [$rootScope.target+'/api/reservations/upcoming/'+$rootScope.merchant];
  $rootScope.urlSettings=[$rootScope.target+'/api/settings/'+$rootScope.merchant+'?company=kuzina&venue=kuzina-athens'];

  $rootScope.reseInfo = [];
  $rootScope.recom = [];
  $rootScope.areaf = [];
  $rootScope.seatsf = [];
  $rootScope.session;
  $rootScope.AreaId = [];
  $rootScope.date = [];
  $rootScope.time = [];
  $rootScope.test = [];
  $rootScope.test1 = [];
  $rootScope.tab = [];
  $rootScope.Secustomers = [];
  $rootScope.SearcRes=[];
  $rootScope.Setable = [];
  $rootScope.event = [];
  $rootScope.eventClone = [];
  $rootScope.profile = [];
  $rootScope.temp = 0;
  $rootScope.temp1 = 0;
  $rootScope.temp2 = 0;
  $rootScope.temp3 = 0;
  $rootScope.ind = [];
  $rootScope.upcoming = [];
  $rootScope.today = [];
  $rootScope.all = [];
  $rootScope.dd;


  $rootScope.customers = [];
    $rootScope.customersS = [];
  $rootScope.in = 0;

})
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('homeTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('callendarTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('exploreTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
