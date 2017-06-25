angular.module('calendar', ['angular-storage', 'ui.router'])
  .controller('callendarTabCtrl', function( $ionicHistory, $rootScope, $state, $scope, $timeout, $ionicPopup, $http, $ionicPopover) {
    'use strict';
    $scope.add = {};
    $scope.date = [];
    $scope.sett = [];
    $scope.settF = [];
    $scope.avaiTabl = [];
    var dateB;
    var area;
    $scope.se = {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8'
    };
    $scope.states=[];
    $scope.calendarAreas=[];
    $scope.flag_ids = [];
    $scope.flag_name = [];
    $scope.flag_machine = [];
    $scope.d = [];
    $scope.temptime;
    $scope.temptimeR;
    $scope.tim = [];
    $scope.timesss = [];
    $scope.listTa = [];
    $scope.temparea;
    $scope.state={};

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };



    $scope.calendar = {};
    $scope.changeMode = function(mode) {
      $scope.calendar.mode = mode;
    };
    $scope.init = function() {


      $scope.loadEvents(0);
    }

    $scope.loadEvents = function(id) {
      console.log("adsdsadasdsa");
      $scope.fakeEvents = [];
      if(id==0){
          if ($scope.calendar.eventSource != null) {
            $scope.calendar.eventSource.length = 0

          }

          $http.get($scope.urlLoadEvents[0])
            .success(function(response) {
              console.log(response);
              angular.forEach(response.data, function(chil) {
                angular.forEach(chil.dates, function(child) {
                  var date=child.date+' '+chil.times[0].time;

                  console.log(date);

                $scope.newDateST = moment(date,"YYYY-MM-DD HH:mm");
                var le=chil.times.length;
                var date=child.date+' '+chil.times[le-1].time;

                $scope.newDateEn = moment(date,"YYYY-MM-DD HH:mm");
                //fakeEvents.push(child);

                $scope.fakeEvents.push({
                  title: chil.description,
                  startTime: $scope.newDateST,
                  endTime: $scope.newDateEn,
                  id: chil.id,
                  firstname: chil.firstname,
                  lastname: chil.lastname,

                  email: chil.email,
                  date: child.date,
                  allDay: false

                });
              })
              })
              console.log($scope.fakeEvents);
              $scope.calendar.eventSource = $scope.fakeEvents;

            })
      }
    };


    $scope.onEventSelected = function(event) {

      $scope.data = {}
        // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '',
        title: event.firstname,
        subTitle: event.title,
        scope: $scope,
        buttons: [

          {
            text: '<b>Ok</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data;
              }
            }
          }, {
            text: '<b>More</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (true) {
                $state.go('more');
              } else {
                return $scope.data;
              }
            }
          },
        ]
      });
      myPopup.then(function(res) {});
      $timeout(function() {
        myPopup.close(); //close the popup after 7 seconds for some reason
      }, 7000);


    };


    $scope.editEvent = function(event) {
      console.log(event);
      $state.go('editE');

    }
    $scope.onViewTitleChanged = function(title) {
      $scope.viewTitle = title;
    };

    $scope.today = function() {
      $scope.calendar.currentDate = new Date();
    };

    $scope.isToday = function() {
      var today = new Date(),
        currentCalendarDate = new Date($scope.calendar.currentDate);

      today.setHours(0, 0, 0, 0);
      currentCalendarDate.setHours(0, 0, 0, 0);
      return today.getTime() === currentCalendarDate.getTime();
    };

    $scope.onTimeSelected = function(selectedTime) {
      console.log('Selected time: ' + selectedTime);
    };

  })
