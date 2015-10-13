'use strict';

angular.module('mean.system').controller('LetterController', ['$scope', '$modalInstance',  'Upload',
  function($scope, $modalInstance, Upload) {

    // ...

    $scope.submit = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  }
]);