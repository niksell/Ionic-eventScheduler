angular.module('home', ['angular-storage', 'ui.router'])
  .controller('homeTabDefaultPageCtrl', function($state, $http, $rootScope, $scope, $ionicHistory, $ionicPopup, $timeout, $cordovaLocalNotification, $ionicPlatform, $interval, ionicMaterialInk, ionicMaterialMotion) {
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
      $scope.$on("$ionicView.beforeEnter", function() {
        $scope.addToday();
      });

      $scope.$on("$cordovaLocalNotification:added", function(id, state, json) {
        alert("Added a notification");
      });
      $scope.stories = [];
      $scope.name = [];
      //$scope.upcoming = [];
      $scope.gender = {
        0: 'male',
        1: 'female'
      };
      $scope.date = [];
      $scope.info = {}
      $scope.add = {}

      $scope.sett = [];
      $scope.settF = [];
      $scope.data = [];
      //  $scope.reseInfo=[];
      $scope.final = {}
      $scope.resdata = {};
      var dateB;
      var area;
      $scope.avaiTabl = [];
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
      $scope.flag_ids = [];
      $scope.flag_name = [];
      $scope.flag_machine = [];

      $scope.temptime;
      $scope.temptimeR;
      $scope.tim = [];
      $scope.timesss = [];
      $scope.listTa = [];
      $scope.temparea;
      //  $scope.Secustomers=[];
      $scope.data = {};
      $scope.originCu = true;
      $scope.SearchCu = false;
      $scope.main = true;
      $scope.searchR = false;
      $scope.today1=[];
      /*$interval($scope.doRefresh, 5000);
      setInterval(function() {
        $scope.doRefresh()
      }, 120000); // This is time period in milliseconds 1000 ms = 1 second.
      */
      $scope.myGoBack = function() {
        //  $scope.res();
        //  $scope.main=true;
        //  $scope.searchR=false;
        $ionicHistory.goBack();
      };

      $scope.allevents = function() {
        console.log(1);
        $state.go('allevents');
      }
      $scope.profil = function() {

        $state.go('profile');

      }
      $scope.myevents = function() {

        $state.go('mine');

      }
      $scope.calendar = function() {

        $state.go('tabsController.callendarTabDefaultPage');
      }
      $scope.$on('onNotificationClick', function(event, id, state, json) {
        if (id == 1) {
          $state.go('todayRes');
        } else {
          $state.go('upcomingR');
        }
      });
      $scope.addToday = function() {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes());
        $cordovaLocalNotification.schedule({
          id: 1,
          date: alarmTime,
          message: "New Events",
          title: "Today",
          autoCancel: true,
          sound: null
        }).then(function() {
          console.log("The notification has been set");
        });
      };
      $scope.doRefresh = function() {
        //$scope.today.length=0;
        $scope.today1.length=0;
        $http.get($scope.urlT[0])
          .success(function(response) {
            console.log(response);
            if (response.status == 200) {
              angular.forEach(response.data, function(ch) {
                angular.forEach(ch.dates, function(seprdate) {

                $scope.today1.push({
                  title:ch.name,
                  firstname: ch.firstname,
                  lastname: ch.lastname,
                  Time: ch.times,
                  location:ch.location,
                  email: ch.email,
                  description: ch.description,
                  date: seprdate.date,
                  date_id:seprdate.id,
                  id: ch.id
                });
              })

              })
              console.log($scope.today1.length);
              console.log($scope.today.length);
              if ($scope.today1.length>$scope.today.length) {
                $scope.addToday();
                $scope.today.length=0;
                $scope.today=$scope.today1;
              }
            }
            console.log($scope.today);
          })

        $scope.$broadcast('scroll.refreshComplete');

      };


      $scope.profile = function() {
        console.log('jwt');
        console.log(localStorage.getItem('jwt'));
        $http.get($scope.urlP[0], {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }})
          .success(function(response) {
            console.log(response);
            $scope.profile=response.user;
          })
        }
        $scope.loadMoreToday = function() {
          console.log(2);
          $http.get($scope.urlT[0])
            .success(function(response) {
              console.log(response);
              if (response.status == 200) {
                angular.forEach(response.data, function(ch) {
                  angular.forEach(ch.dates, function(seprdate) {

                  $scope.today.push({
                    title:ch.name,
                    firstname: ch.firstname,
                    lastname: ch.lastname,
                    Time: ch.times,
                    location:ch.location,
                    email: ch.email,
                    description: ch.description,
                    date: seprdate.date,
                    date_id:seprdate.id,
                    id: ch.id
                  });
                })

                })
              }
              console.log($scope.today);
            })



        }
        $scope.takepart=function () {
          console.log($scope.event[0]);
          console.log($scope.resdata.time);
          $http.post($scope.urlTakePart[0],
             {
              events_id:$scope.event[0].id,
              event_date_id: $scope.event[0].date_id,
              event_time_id: $scope.resdata.time.id
            },
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
              }})
            .success(function(response) {
              console.log(response);
              var alertPopup = $ionicPopup.alert({
                title: 'You Take part',
                template: 'succesfully!'
              });

            }).error(function(response) {
              var alertPopup = $ionicPopup.alert({
                title: 'Something Went Wrong !',
                template: ''
              });
            });
        }
        $scope.getMine=function () {
          $http.get($scope.urlTakeMine[0], {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
              }})
            .success(function(response) {
              console.log(response);

            })
        }
        $scope.onEventSelected = function(events) {
          console.log(events);
            $scope.event.length=0;
          $scope.event.push({
            firstname: events.firstname,
            lastname: events.lastname,
            machine: events.machine,
            Time: events.Time,
            area: events.area,
            title:events.title,
            location:events.location,
            date: events.date,
            date_id:events.date_id,
            email: events.email,
            description: events.description,
            id: events.id

          });

          $state.go('events')


        };

      })
