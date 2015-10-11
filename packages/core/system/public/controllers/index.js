'use strict';

var app = angular.module('mean.system');

app.controller('IndexController', ['$scope', 'Global', '$location', '$state', '$stateParams', 'MeanUser', 'focus', 'MailStops', '$uibModal',
  function($scope, Global, $location, $state, $stateParams, User, focus, MailStops, $uibModal) {
    $scope.global = Global;
    $scope.user = User;

    $scope.$watch('msc', function(newValue, oldValue) {
      if (oldValue && oldValue.length > 10) {
        return;
      }

      var allowValidMSC = function () {
        var valid = function(msc) {
          if (msc !== undefined && msc != "" && !msc.match(/^[1-9][0-9]{0,9}$/g)) {
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

      var msc = $scope.msc = allowValidMSC();

      if (msc && msc.length == 10 && msc != oldValue) {
        $state.go('msc', { "msc": msc });
      }

      if (!msc || msc.length != 10) {
        $scope.mailStop = undefined;
      }
      else if (!$scope.mailStop || $scope.mailStop.code != msc) {
        var mailStop = MailStops.get({"code": msc});
        $scope.mailStop = mailStop;
      }

      $scope.letter = {}
    });

    $scope.msc = $stateParams.msc;
    focus('msc');

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
    return function(msc) {
      if (!msc) { return ''; }

      var area = msc.toString().slice(0, 3);
      var number = msc.toString().slice(3);

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




