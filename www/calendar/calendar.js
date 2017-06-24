angular.module('calendar', ['angular-storage', 'ui.router'])
  .controller('callendarTabCtrl', function(update, $ionicHistory, $rootScope, $state, $scope, $timeout, $ionicPopup, $http, $ionicPopover) {
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
    $scope.loadArea=function(id){
      $scope.fakeEvents = [];
      $scope.calendar.eventSource.length = 0;
      $http.get($scope.urlLoadEvents[0]+'?flag_id='+id)
        .success(function(response) {
          console.log(response);
          angular.forEach(response.reservations, function(child) {

            $scope.newDateST = new Date(child.start);
            $scope.newDateEn = new Date(child.end);
            //fakeEvents.push(child);
              $scope.fakeEvents.push({
                title: child.title + " " + child.firstname + " " + child.lastname,
                startTime: $scope.newDateST,
                endTime: $scope.newDateEn,
                id: child.id,
                popup: child.popup,
                time: child.time,
                firstname: child.firstname,
                lastname: child.lastname,
                mobile: child.mobile,
                seats: child.seats,
                table_id: child.table_id,
                machine: child.flag.machine,
                flag: child.flag.name,
                area: child.area_id,
                email: child.email,
                date: child.date,
                area_name: child.area.name,

                allDay: false

              });

          })

          $scope.calendar.eventSource = $scope.fakeEvents;

        })
    }
    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };

    $scope.openPopover = function($event) {
      console.log($event.target.id);
       var template = 'calendar/popover'+$event.target.id+'.html';
       $ionicPopover.fromTemplateUrl(template, {
         scope: $scope,
       }).then(function(popover) {
         console.log(popover);
         $scope.popover = popover;
         $scope.popover.show($event);
       });
  };

    $scope.calendar = {};
    $scope.changeMode = function(mode) {
      $scope.calendar.mode = mode;
    };
    $scope.init = function() {

      $http.get($scope.urlSettings[0])
        .success(function(response) {



          angular.forEach(response.areas, function(child) {

            $scope.calendarAreas.push({
              id: child.id,
              venue_id: child.venue_id,
              name: child.name,
              tables: child.tables,


            });
          })
          angular.forEach(response.flags, function(child) {
            $scope.states.push({
              id: child.id,
              name: child.name,
              machine: child.machine
            });
          })
        })
        console.log($scope.states);
        console.log($scope.calendarAreas);
      $scope.loadEvents(0);
    }
    $scope.deleteEvent = function(eve) {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Title',
        template: 'Are you sure?'
      });

      confirmPopup.then(function(res) {
        if (res) {


          $http.post($scope.urlDestroyReservation[0], {
              reservation_id: $scope.eventClone[0].id,
              merchant_token: $scope.merchant
            })
            .success(function(response) {
              if ($scope.ind[0] != -1) {
                $scope.all.splice($scope.ind[0], 1);
              }
              if ($scope.ind[1] != -1) {
                $scope.today.splice($scope.ind[1], 1);
              }
              if ($scope.ind[2] != -1) {
                $scope.upcoming.splice($scope.ind[2], 1);
              }
              $ionicHistory.goBack();
            })
        } else {
          console.log('Not sure!');
        }
      })
    }
    $scope.loadEvents = function(id) {

      $scope.fakeEvents = [];
      if(id==0){
          if ($scope.calendar.eventSource != null) {
            $scope.calendar.eventSource.length = 0

          }

          $http.get($scope.urlLoadEvents[0])
            .success(function(response) {
              angular.forEach(response.reservations, function(child) {
                $scope.newDateST = new Date(child.start);
                $scope.newDateEn = new Date(child.end);
                //fakeEvents.push(child);

                $scope.fakeEvents.push({
                  title: child.title,
                  startTime: $scope.newDateST,
                  endTime: $scope.newDateEn,
                  id: child.id,
                  popup: child.popup,
                  time: child.time,
                  firstname: child.firstname,
                  lastname: child.lastname,
                  mobile: child.mobile,
                  seats: child.seats,
                  table_id: child.table_id,
                  machine: child.flag.machine,
                  flag: child.flag.name,
                  area: child.area_id,
                  email: child.email,
                  date: child.date,
                  area_name: child.area.name,
                  allDay: false

                });

              })

              $scope.calendar.eventSource = $scope.fakeEvents;

            })
      }else {
        $scope.fakeEvents = [];
        $scope.calendar.eventSource.length = 0;
        $http.get($scope.urlLoadEvents[0]+'?area_id='+id)
          .success(function(response) {
            angular.forEach(response.reservations, function(child) {
              $scope.newDateST = new Date(child.start);
              $scope.newDateEn = new Date(child.end);
              //fakeEvents.push(child);
                $scope.fakeEvents.push({
                  title: child.title + " " + child.firstname + " " + child.lastname,
                  startTime: $scope.newDateST,
                  endTime: $scope.newDateEn,
                  id: child.id,
                  popup: child.popup,
                  time: child.time,
                  firstname: child.firstname,
                  lastname: child.lastname,
                  mobile: child.mobile,
                  seats: child.seats,
                  table_id: child.table_id,
                  machine: child.flag.machine,
                  flag: child.flag.name,
                  area: child.area_id,
                  email: child.email,
                  date: child.date,
                  area_name: child.area.name,

                  allDay: false

                });

            })

            $scope.calendar.eventSource = $scope.fakeEvents;

          })
      }
    };
    $scope.loadEventsTa = function() {
      $scope.fakeEvents = [];
      $scope.calendar.eventSource.length = 0;
      $http.get($scope.urlLoadEvents[0])
        .success(function(response) {
          angular.forEach(response.reservations, function(child) {
            $scope.newDateST = new Date(child.start);
            $scope.newDateEn = new Date(child.end);
            //fakeEvents.push(child);
            if (child.area_id == 1) {
              $scope.fakeEvents.push({
                title: child.title + " " + child.firstname + " " + child.lastname,
                startTime: $scope.newDateST,
                endTime: $scope.newDateEn,
                id: child.id,
                popup: child.popup,
                time: child.time,
                firstname: child.firstname,
                lastname: child.lastname,
                mobile: child.mobile,
                seats: child.seats,
                table_id: child.table_id,
                machine: child.flag.machine,
                flag: child.flag.name,
                area: child.area_id,
                email: child.email,
                date: child.date,
                area_name: child.area.name,

                allDay: false

              });
            }
          })

          $scope.calendar.eventSource = $scope.fakeEvents;

        })

    };
    $scope.loadEventsINT = function() {
      $scope.fakeEvents = [];
      $scope.calendar.eventSource.length = 0;
      $http.get($scope.urlLoadEvents[0])
        .success(function(response) {
          angular.forEach(response.reservations, function(child) {
            $scope.newDateST = new Date(child.start);
            $scope.newDateEn = new Date(child.end);
            //fakeEvents.push(child);
            if (child.area_id == 2) {
              $scope.fakeEvents.push({
                title: child.title + " " + child.firstname + " " + child.lastname,
                startTime: $scope.newDateST,
                endTime: $scope.newDateEn,
                id: child.id,
                popup: child.popup,
                time: child.time,
                firstname: child.firstname,
                lastname: child.lastname,
                mobile: child.mobile,
                seats: child.seats,
                table_id: child.table_id,
                machine: child.flag.machine,
                flag: child.flag.name,
                area: child.area_id,
                email: child.email,
                date: child.date,
                area_name: child.area.name,

                allDay: false

              });
            }
          })

          $scope.calendar.eventSource = $scope.fakeEvents;

        })

    };
    $scope.loadEventsExt = function() {
      $scope.fakeEvents = [];
      $scope.calendar.eventSource.length = 0;
      $http.get($scope.urlLoadEvents[0])
        .success(function(response) {
          angular.forEach(response.reservations, function(child) {
            $scope.newDateST = new Date(child.start);
            $scope.newDateEn = new Date(child.end);
            //fakeEvents.push(child);
            if (child.area_id == 3) {
              $scope.fakeEvents.push({
                title: child.title + " " + child.firstname + " " + child.lastname,
                startTime: $scope.newDateST,
                endTime: $scope.newDateEn,
                id: child.id,
                popup: child.popup,
                time: child.time,
                firstname: child.firstname,
                lastname: child.lastname,
                mobile: child.mobile,
                seats: child.seats,
                table_id: child.table_id,
                machine: child.flag.machine,
                flag: child.flag.name,
                area: child.area_id,
                email: child.email,
                date: child.date,
                area_name: child.area.name,

                allDay: false

              });
            }
          })

          $scope.calendar.eventSource = $scope.fakeEvents;

        })

    };
    $scope.loadEventsBalc = function() {
      $scope.fakeEvents = [];
      $scope.calendar.eventSource.length = 0
      $http.get($scope.urlLoadEvents[0])
        .success(function(response) {
          angular.forEach(response.reservations, function(child) {
            $scope.newDateST = new Date(child.start);
            $scope.newDateEn = new Date(child.end);
            //fakeEvents.push(child);

            if (child.area_id == 4) {
              $scope.fakeEvents.push({
                title: child.title,
                startTime: $scope.newDateST,
                endTime: $scope.newDateEn,
                id: child.id,
                popup: child.popup,
                time: child.time,
                firstname: child.firstname,
                lastname: child.lastname,
                mobile: child.mobile,
                seats: child.seats,
                table_id: child.table_id,
                machine: child.flag.machine,
                flag: child.flag.name,
                area: child.area_id,
                email: child.email,
                date: child.date,
                area_name: child.area.name,

                allDay: false

              });
            }
          })

          $scope.calendar.eventSource = $scope.fakeEvents;

        })

    };

    $scope.onEventSelected = function(event) {
      if ($scope.eventClone != null) {
        $scope.eventClone.length = 0;
      }
      var index = $scope.all.indexOf(event);
      $scope.i = -1;
      $scope.j = -1;
      $scope.b = -1;
      for (var k = 0; k < $scope.all.length; k++) {
        if ($scope.all[k].id == event.id) {
          $scope.b = k;
        }
      }
      for (var k = 0; k < $scope.today.length; k++) {
        if ($scope.today[k].id == event.id) {
          $scope.i = k;
        }
      }

      for (var k = 0; k < $scope.upcoming.length; k++) {
        if ($scope.upcoming[k].id == event.id) {
          $scope.j = k;
        }
      }



      $scope.ind.length = 0;
      $scope.ind.push($scope.b);
      $scope.ind.push($scope.i);
      $scope.ind.push($scope.j);
      console.log($scope.ind);
      $scope.eventClone.push(event);
      console.log($scope.eventClone);
      $scope.data = {}
        // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '',
        title: event.popup,
        subTitle: '',
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

    $scope.initEditEvent = function(event) {
      console.log(event);
      console.log($rootScope.date);
      if ($scope.d != null) {
        $scope.d.length = 0;
      }
      $scope.d.push(event[0].date);
      console.log($scope.d[0]);
      //$scope.add.date=event[0].date;
      $scope.date.push(event[0].date + "  |  " + event[0].area + " | " + event[0].seats + " | " + event[0].table_id);
      $scope.add.id = event[0].id;
      $scope.add.firstname = event[0].firstname;
      $scope.add.lastname = event[0].lastname;
      $scope.add.email = event[0].email;
      $scope.add.mobile = event[0].mobile;
      $scope.add.table = event[0].table_id;
      $scope.add.description = event[0].description;

      $http.get($scope.urlSettings[0])
        .success(function(response) {
          $scope.start = response.configuration.start_hour;
          $scope.end = response.configuration.stop_hour;



          angular.forEach(response.areas, function(child) {

            $scope.sett.push({
              id: child.id,
              venue_id: child.venue_id,
              name: child.name,
              tables: child.tables,


            });
          })
          angular.forEach(response.flags, function(child) {
            $scope.settF.push({
              id: child.id,
              name: child.name,
              machine: child.machine
            });
          })
          var name1 = $scope.sett[0].name;
          var name2 = $scope.sett[1].name;
          var name3 = $scope.sett[2].name;
          var name4 = $scope.sett[3].name;
          $scope.area = {
            0: 'Select area...',
            1: name1,
            2: name2,
            3: name3,
            4: name4
          };

          var day = moment($scope.start, "HH:mm")
          var neh = $scope.start;

          while (neh != $scope.end) {
            $scope.timesss.push(neh);
            neh = day.add(15, 'minutes').format("HH:mm");

          }
          $scope.timesss.push(neh);
          $scope.id = {

            1: $scope.sett[0].id,
            2: $scope.sett[1].id,
            3: $scope.sett[2].id,
            4: $scope.sett[3].id
          };


          for (var i = 0; i < $scope.sett.length; i++) {
            var temp = [];
            angular.forEach($scope.sett[i].tables, function(child) {
              temp.push(child.id);
            })
            $scope.avaiTabl.push(temp);
          }
          for (var i = 0; i < $scope.settF.length; i++) {

            $scope.flag_ids.push($scope.settF[i].id);
            $scope.flag_name.push($scope.settF[i].name);
            $scope.flag_machine.push($scope.settF[i].machine);
          }
          console.log($scope.flag_ids);
          console.log($scope.flag_name);
          $scope.listTa.length = 0;

          /*  for(var i=0;i<$scope.area.length;i++){

              if (event[0].area == $scope.area[i+1]) {
                console.log('mpppppppppp');
                  var temp=$scope.avaiTabl[$scope.id[i]];

              }
              $scope.listTa=(temp);
            }*/
          if (event[0].area_name == $scope.area[1]) {
            $scope.listTa = ($scope.avaiTabl[$scope.id[1] - 1]);
          } else if (event[0].area_name == $scope.area[2]) {
            $scope.listTa = ($scope.avaiTabl[$scope.id[2] - 1]);
          } else if (event[0].area_name == $scope.area[3]) {
            $scope.listTa = ($scope.avaiTabl[$scope.id[3] - 1]);
          } else if (event[0].area_name == $scope.area[4]) {
            $scope.listTa = ($scope.avaiTabl[$scope.id[4] - 1]);
          }
          console.log($scope.area[1]);;
        });

      $scope.add.area = event[0].area_name;
      $scope.add.time = event[0].time;
      $scope.add.seats = event[0].seats.toString();
      $scope.add.flag = event[0].flag;
    }
    $scope.submitEdit = function() {
      console.log($scope.d);
      var index = $scope.flag_name.indexOf($scope.add.flag);
      var flag = $scope.flag_ids[index];
      var machine = $scope.flag_machine[index];
      var area;
      if ($scope.add.area == $scope.area[1]) {
        area = $scope.id[1];
      } else if ($scope.add.area == $scope.area[2]) {
        area = $scope.id[2];
      } else if ($scope.add.area == $scope.area[3]) {
        area = $scope.id[3];
      } else if ($scope.add.area == $scope.area[4]) {
        area = $scope.id[4];
      }
      $scope.temparea = area;
      if ($scope.add.date != null) {
        var d = new Date(document.getElementById("dtne").value);


        var dt = d.getDate();
        var mn = d.getMonth();
        mn++;
        var yy = d.getFullYear();
        dateB = dt + "/" + mn + "/" + yy;


        $scope.d.length = 0;
        $scope.d.push(dateB);
        console.log($scope.d);
      }

      var params = {
        reservation_id: $scope.add.id,
        date: $scope.d[0],
        time: $scope.add.time,
        seats: $scope.add.seats,
        area_id: $scope.temparea,
        table_id: $scope.add.table,
        flag_id: flag,
        firstname: $scope.add.firstname,
        lastname: $scope.add.lastname,
        email: $scope.add.email,
        mobile: $scope.add.mobile,
        description: $scope.add.description,
        token: localStorage.getItem('jwt'),

        merchant_token: $scope.merchant
      }
      console.log(params);

      $http.post($scope.urlUpdate[0], params)
        .success(function(response) {
          if (response.status == 1) {
            console.log(response);
            var alertPopup = $ionicPopup.alert({
              title: 'profile updated successfully!',
              template: ''
            });
            var eventN=[{
              date:$scope.d[0],
              time:$scope.add.time,
              email:$scope.add.email,
              firstname:$scope.add.firstname,
              lastname:$scope.add.lastname,
              area_id:$scope.temparea,
              flag:$scope.add.flag,
              description:$scope.add.description,
              area:$scope.add.area,
              table_id:$scope.add.table,
              seats:$scope.add.seats,
              id:$scope.add.id,
              machine:machine,
              mobile:$scope.add.mobile
            }]
            $scope.eventClone[0].id = $scope.add.id;
            $scope.eventClone[0].firstname = $scope.add.firstname;
            $scope.eventClone[0].lastname = $scope.add.lastname;
            $scope.eventClone[0].table_id = $scope.add.table;
            $scope.eventClone[0].machine = machine;
            $scope.eventClone[0].Time = $scope.add.time;
            $scope.eventClone[0].area = $scope.temparea;
            $scope.eventClone[0].mobile = $scope.add.mobile;
            $scope.eventClone[0].seats = $scope.add.seats;
            $scope.eventClone[0].date = $scope.d[0];
            $scope.eventClone[0].email = $scope.add.email;
            $scope.eventClone[0].description = $scope.add.description;
            $scope.eventClone[0].flag = $scope.add.flag;
            update.add(eventN);
            $ionicHistory.goBack();
          } else {
            var alertPopup = $ionicPopup.alert({
              title: 'An unexpected error occurred',
              template: 'Please try again'
            });
          }

        }).error(function(response) {
          var alertPopup = $ionicPopup.alert({
            title: 'An unexpected error occurred',
            template: 'Please try again'
          });
        });

    }
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
