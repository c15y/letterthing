'use strict';

var app = angular.module('mean.system');

app.controller('IndexController', ['$scope', 'Global', '$location', '$state', '$stateParams', 'MeanUser', 'focus', 'Letters', '$uibModal', 'Shifted', '$q',
  function($scope, Global, $location, $state, $stateParams, User, focus, Letters, $uibModal, Shifted, $q) {
    $scope.global = Global;
    $scope.user = User;

    function query() {
      var searchExpr = $scope.search ? { $regex: '\\b' + $scope.search + '\\b'} : undefined;
      var query = {
        $or: [{
          'name': searchExpr
        },
        {
          'subject': searchExpr
        }],
        'key': $scope.key
      };

      Letters.query({ 'query': query },
        function(data) {
          $scope.letters = data;
          if ($scope.letters.length == 1) {
            $scope.letter = $scope.letters[0];
          }
          else {
            $scope.letter = {};
          }
        },
        function(err) {
          $scope.letters = undefined;
          $scope.letter = {};
          console.log(err);
        }
      );
    }

    // Letter search
    $scope.$watch('searchField', function(newValue, oldValue) {
      $scope.search = $scope.searchField;
      query();
    });

    // Logic for selecting a key
    $scope.$watch('keyField', function(newValue, oldValue) {
      if (oldValue && oldValue.length > 4 && newValue && newValue.length <= 4) {
        return;
      }

      function allowValidKey() {
        var valid = function(key) {
          if (key && !key.match(/^[0-9]{0,4}$/g) && !key.match(/^[A-Za-z]{0,4}$/g)) {
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

      var key = allowValidKey();
      key = key ? key.toUpperCase() : undefined;
      $scope.keyField = key;

      var newKey = key && key.length == 4 ? key : undefined;

      if (newKey != $scope.key) {
        $scope.key = newKey;
        query();
      }
    });

    $scope.letters = undefined;
    $scope.letter = {};
    focus('searchField');

    // Clear the selected letter
    $scope.clearLetter = function() {
      return $scope.letter = {};
    }

    // Return image data by key
    $scope.image = function(key) {
      return key;
    }

    // Modal for uploading a letter
    $scope.uploadLetter = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'system/views/upload.html',
        controller: 'UploadController',
        scope: $scope
      });

      modalInstance.result.then(null, function () {
        console.log('Modal dismissed at: ' + new Date());
        // TODO: Cleanup temp files
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

// Focus directive
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

