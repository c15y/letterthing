'use strict';

var app = angular.module('mean.system');

app.controller('IndexController', ['$scope', 'Global', '$location', '$state', '$stateParams', 'MeanUser', 'focus', 'Mailboxes', '$uibModal', 'Shifted', '$q',
  function($scope, Global, $location, $state, $stateParams, User, focus, Mailboxes, $uibModal, Shifted, $q) {
    $scope.global = Global;
    $scope.user = User;

    // Logic for selecting a mailbox by msc
    $scope.$watch('msc', function(newValue, oldValue) {
      if (oldValue && oldValue.length > 10 && newValue && newValue.length <= 10) {
        return;
      }

      function allowValidMsc() {
        var valid = function(msc) {
          if (msc != undefined && msc != "" && !msc.match(/^[2-9][0-9]{0,9}$/g)) {
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

      var msc = $scope.msc = allowValidMsc();

      if (msc && msc.length == 10 && msc != oldValue &&
        !$state.is('mailbox', { "msc": msc })) {
        $state.go('mailbox', { "msc": msc });
      }
      else if (!msc || msc.length != 10) {
        $scope.mailbox = undefined;
      }
      else if (!$scope.mailbox) {
        Mailboxes.get({"msc": msc}, function(data) {
          $scope.mailbox = data;
        }, function() {
          $scope.mailbox = { msc: msc, letters: [] }
        });
      }

      $scope.letter = {}
    });

    $scope.msc = $stateParams.msc;
    focus('msc');

    // Modal for uploading a letter to a mailbox
    $scope.uploadLetter = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'system/views/upload.html',
        controller: 'UploadController',
        scope: $scope
      });

      modalInstance.result.then(function (item) {
        // Nothing?
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
        // Cleanup?
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

// Filter for translating an msc to a phone number
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




