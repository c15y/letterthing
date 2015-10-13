'use strict';

var app = angular.module('mean.system');

app.controller('IndexController', ['$scope', 'Global', '$location', '$state', '$stateParams', 'MeanUser', 'focus', 'Mailboxes', '$uibModal', 'Shifted',
  function($scope, Global, $location, $state, $stateParams, User, focus, Mailboxes, $uibModal, Shifted) {
    $scope.global = Global;
    $scope.user = User;

    // Logic for selecting a mailbox by code
    $scope.$watch('code', function(newValue, oldValue) {
      if (oldValue && oldValue.length > 10 && newValue && newValue.length <= 10) {
        return;
      }

      function allowValidCode() {
        var valid = function(code) {
          if (code != undefined && code != "" && !code.match(/^[2-9][0-9]{0,9}$/g)) {
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

      var code = $scope.code = allowValidCode();

      if (code && code.length == 10 && code != oldValue) {
        $state.go('mailbox', { "code": code });
      }
      else if (!code || code.length == 0) {
        $state.go('home');
      }

      if (!code || code.length != 10) {
        $scope.mailbox = undefined;
      }
      else if (!$scope.mailbox || $scope.mailbox.code != code) {
        var mailbox = Mailboxes.get({"code": code});
        $scope.mailbox = mailbox;
      }

      $scope.letter = {}
    });

    $scope.code = $stateParams.code;
    focus('code');

    // Modal for adding a letter to a mailbox
    $scope.addLetter = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'system/views/add-letter.html',
        controller: 'LetterController',
        scope: $scope
      });
    };

    // Event handlers
    $scope.onKeyDown = function ($event) {
      if ($event.keyCode == 18) { // Alt
        Shifted.setShifted(true);
      }
    };

    $scope.onKeyUp = function ($event) {
      if ($event.keyCode == 18) { // Alt
        Shifted.setShifted(false);
      }
    };
  }
]);

// Filter for translating a mailbox code to a phone number
app.filter('phone', function() {
    return function(code) {
      if (!code) { return ''; }

      var area = code.toString().slice(0, 3);
      var number = code.toString().slice(3);

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




