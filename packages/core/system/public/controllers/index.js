'use strict';

var app = angular.module('mean.system');

app.controller('IndexController', ['$scope', 'Global', '$location', '$state', '$stateParams', 'MeanUser', 'focus', 'Mailboxes', '$uibModal', 'Shifted', '$q',
  function($scope, Global, $location, $state, $stateParams, User, focus, Mailboxes, $uibModal, Shifted, $q) {
    $scope.global = Global;
    $scope.user = User;

    // Logic for selecting a mailbox by phone
    $scope.$watch('phone', function(newValue, oldValue) {
      if (oldValue && oldValue.length > 10 && newValue && newValue.length <= 10) {
        return;
      }

      function allowValidPhone() {
        var valid = function(phone) {
          if (phone != undefined && phone != "" && !phone.match(/^[2-9][0-9]{0,9}$/g)) {
            return false;
          }
          return true;
        }

        if (valid(newValue)) {
          return newValue;
        }
        else if (valid(oldValue)) {
          return oldValue;
        }
        else {
          return undefined;
        }
      }

      var phone = $scope.phone = allowValidPhone();

      if (phone && phone.length == 10 && phone != oldValue &&
        !$state.is('mailbox', { "phone": phone })) {
        $state.go('mailbox', { "phone": phone });
      }
      else {
        if (!phone || phone.length != 10) {
          $scope.mailbox = undefined;
        }
        else if (!$scope.mailbox) {
          Mailboxes.get({"phone": phone}, function(data) {
            $scope.mailbox = data;
          }, function() {
            $scope.mailbox = { phone: phone, letters: [] }
          });
        }
      }

      $scope.letter = {}
    });

    $scope.phone = $stateParams.phone;
    focus('phone');

    // Modal for uploading a letter to a mailbox
    $scope.uploadLetter = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'system/views/upload.html',
        controller: 'UploadController',
        scope: $scope
      });
    };

    // Event handlers
    $scope.onKeyDown = function ($event) {
      if ($event.keyPhone == 18) { // Alt
        Shifted.setShifted(true);
      }
    };

    $scope.onKeyUp = function ($event) {
      if ($event.keyPhone == 18) { // Alt
        Shifted.setShifted(false);
      }
    };
  }
]);

// Filter for translating a mailbox phone to a phone number
app.filter('phoneFormat', function() {
    return function(phone) {
      if (!phone) { return ''; }

      var area = phone.toString().slice(0, 3);
      var number = phone.toString().slice(3);

      if (area.length == 3) {
        area = "(" + area + ") ";
      }

      if (number.length >= 3) {
        number = number.slice(0, 3) + '-' + number.slice(3);
      }

      return area + number;
    };
});

// A directive that should be moved to its own file...
app.directive('focusOn', function() {
   return function(scope, elem, attr) {
      scope.$on('focusOn', function(e, name) {
        if(name === attr.focusOn) {
          elem[0].focus();
        }
      });
   };
});

app.factory('focus', function ($rootScope, $timeout) {
  return function(name) {
    $timeout(function (){
      $rootScope.$broadcast('focusOn', name);
    });
  }
});




