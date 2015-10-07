'use strict';

var app = angular.module('mean.system');

app.controller('IndexController', ['$scope', 'Global', '$location', '$state',
  function($scope, Global, $location, $state) {
    $scope.global = Global;

    $scope.$watch('MSC', function(newValue, oldValue) {
      if(newValue !== undefined && !newValue.toString().match(/^[0-9]{0,10}$/g)) {
        $scope.MSC = oldValue;
      }

      var msc = $scope.MSC;

      if (msc.length == 10) {
        $state.go('msc', { "msc": msc});
      }
    });

    $scope.MSC = 5557771234;
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
