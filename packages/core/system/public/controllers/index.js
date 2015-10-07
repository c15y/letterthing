'use strict';

var app = angular.module('mean.system');

app.controller('IndexController', ['$scope', 'Global', '$location', '$state', '$stateParams', 'focus',
  function($scope, Global, $location, $state, $stateParams, focus) {
    $scope.global = Global;

    $scope.$watch('MSC', function(newValue, oldValue) {
      if(newValue !== undefined && !newValue.toString().match(/^[0-9]{0,10}$/g)) {
        $scope.MSC = oldValue;
      }

      var msc = $scope.MSC;

      if (msc && msc.length == 10) {
        $state.go('msc', { "msc": msc});
      }
    });

    $scope.MSC = $stateParams.msc;
    focus('msc');
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




