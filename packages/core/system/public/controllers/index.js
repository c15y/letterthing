'use strict';

var app = angular.module('mean.system');

app.controller('IndexController', ['$scope', 'Global', '$location', '$state', '$stateParams', 'MeanUser', 'focus', 'Mailboxes', '$uibModal',
  function($scope, Global, $location, $state, $stateParams, User, focus, Mailboxes, $uibModal) {
    $scope.global = Global;
    $scope.user = User;

    $scope.$watch('code', function(newValue, oldValue) {
      if (oldValue && oldValue.length > 10 && newValue && newValue.length <= 10) {
        return;
      }

      var allowValidCode = function () {
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

    $scope.addLetter = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'system/views/add-letter.html',
        controller: 'LetterController',
        scope: $scope
      });
    };
  }
]);

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




