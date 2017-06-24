angular.module('login', ['angular-storage', 'ui.router'])

.controller('loginCtrl', function($timeout,ionicMaterialInk,$rootScope, $scope, $ionicPopup, $state, $http, $base64, store,$ionicSideMenuDelegate) {
  $scope.data = {};
  ionicMaterialInk.displayEffect();
  $ionicSideMenuDelegate.canDragContent(false)
  $scope.logout = function() {
    $http.defaults.headers.common['Authorization'] = undefined;
    localStorage.removeItem('jwt');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('mobile');
    $scope.data.username = '';
    $scope.data.password = '';
    $state.go('login');

  }
  //$scope.$parent.clearFabs();

  $scope.guest=function () {
    $state.go('tabsController.homeTabDefaultPage');
  }
  $scope.login = function() {
    var base64EncodedString = $base64.encode($scope.data.username + ':' + $scope.data.password);
    //$base64.encode($scope.data.username+':'+$scope.data.password);

    var token;
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
    //$http.defaults.headers.common['Authorization'] = 'Basic ' + base64EncodedString;
    $rootScope.in = 1;
    //$state.go('tabsController.homeTabDefaultPage');
    var headers = {
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			};


    $http.post($scope.urlLogin[0], {
        email: $scope.data.email,
        password: $scope.data.password
      })
      .success(function(response) {
        console.log(response);

        /*angular.forEach(response, function(child) {
          token = $base64.encode(child.email + ':' + child.id);
          localStorage.setItem('user_id', child.id);
          localStorage.setItem('email', child.email);
          localStorage.setItem('firstname', child.firstname);
          localStorage.setItem('lastname', child.lastname);
          localStorage.setItem('mobile', child.mobile);

        })*/
        localStorage.setItem('jwt', token);
        $rootScope.in = 1;
        $state.go('tabsController.homeTabDefaultPage');

      }).error(function(response) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
  }
})
