'use strict';

angular.module('mean.system').controller('MSCController', function($scope, $stateParams) {
  $scope.MSC = $stateParams.msc;
});
