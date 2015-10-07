'use strict';

angular.module('mean.system').controller('MSCController', ['$scope', 'Global', '$stateParams',
  function($scope, Global, $stateParams) {
    $scope.global = Global;
    $scope.MSC = $stateParams.msc;
}]);
