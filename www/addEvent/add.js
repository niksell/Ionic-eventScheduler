angular.module('add', ['angular-storage', 'ui.router'])
  .controller('exploreTabDefaultPageCtrl', function($state, $http, $rootScope, $scope, $ionicHistory, $ionicPopup, $timeout, $cordovaLocalNotification, $ionicPlatform, $interval, ionicMaterialInk, ionicMaterialMotion) {
      function onDeviceReady() {
        var Fetcher = window.plugins.backgroundFetch;

        // Your background-fetch handler.
        var fetchCallback = function() {
          console.log('BackgroundFetch initiated');

          //  $scope.doRefresh();

          Fetcher.finish(); // <-- N.B. You MUST called #finish so that native-side can signal completion of the background-thread to the os.

        }
        Fetcher.configure(fetchCallback);
      }
      ionicMaterialInk.displayEffect();

      ionicMaterialMotion.pushDown({
        selector: '.push-down'
      });
      ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .card .item'
      });

      $scope.dat =new Date();
    //  $scope.onezoneDatepicker.date=$scope.dat;
    $scope.timesss=[];
    $scope.resdata={};
      $scope.onezoneDatepicker = {
        date: $scope.dat, // MANDATORY
        mondayFirst: false,
        //startDate: startDate,
        //endDate: endDate,
        disablePastDays: false,
        disableSwipe: false,
        disableWeekend: false,
        //disableDates: disableDates,
        //disableDaysOfWeek: disableDaysOfWeek,
        showDatepicker: false,
        showTodayButton: true,
        calendarMode: false,
        hideCancelButton: false,
        hideSetButton: false,
        //highlights: highlights
        callback: function(value){
            // your code
        }
    }
    $scope.submit = function() {

      $state.go('submit');

    }
    $scope.test=function () {
      console.log($scope.resdata.time);
      $rootScope.selected_times.length=0;
      angular.forEach($scope.resdata.time, function(ch) {
        console.log(ch);

      $rootScope.selected_times.push(ch);
    })
    }
    $scope.Complete = function() {
      console.log($scope.resdata);
      console.log($rootScope.selected_times);
      if ($scope.onezoneDatepicker.date != null) {
        var d=$scope.onezoneDatepicker.date;


        var dt = d.getDate();
        var mn = d.getMonth();
        mn++;
        var yy = d.getFullYear();
        dateB = yy + "-" + mn + "-" + dt;


        $rootScope.date.length = 0;
        $rootScope.date.push(dateB);

      }
      var params = {
        firstname:$scope.resdata.firstname,
        lastname: $scope.resdata.lastname,
        all_day:1,
        email:$scope.resdata.email,
        description:$scope.resdata.description,
        date:$rootScope.date,
        time:$rootScope.selected_times,
        name:$scope.resdata.event_name,
        location:$scope.resdata.location
      }
      console.log(params);
      $http.post($scope.urlcreate[0],
          params,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt')
          }})
        .success(function(response) {
          console.log(response);
          var alertPopup = $ionicPopup.alert({
            title: 'You Create'+$scope.resdata.name,
            template: 'succesfully!'
          });
            $state.go('tabsController.homeTabDefaultPage');
        }).error(function(response) {
          var alertPopup = $ionicPopup.alert({
            title: 'Something Went Wrong !',
            template: ''
          });
        });
      console.log(dateB);

    }
    $scope.init=function () {
      var day = moment("08:00", "HH:mm")
      var neh = "08:00";
      while (neh != "22:00") {
        $scope.timesss.push(neh);
        neh = day.add(30, 'minutes').format("HH:mm");
      //  console.log(neh);
      }
      $scope.timesss.push(neh);
    }


})
