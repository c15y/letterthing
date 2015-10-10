'use strict';

angular.module('mean.system').controller('LetterController', ['$scope', '$modalInstance', 'Letter',
  function ($scope, $modalInstance, Letter) {

    $scope.images = []

    $scope.submit = function () {
      Letter.submit($scope.images);
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.flowOpts = {
      target: '/api/letters' // /api/mailStops/1234567890
    };
}]);