'use strict';

angular.module('mean.system').controller('UploadController', ['$scope', '$modalInstance',  'FileUploader', 'Mailboxes', 'Letter', 'lodash',
  function($scope, $modalInstance, FileUploader, Mailboxes, Letter, _) {

    $scope.Letter = Letter;

    var mainUploader = $scope.mainUploader = new FileUploader({
      url: '(URL is set dynamically in onAfterAddingFile)'
    });

    var handlingUploader = $scope.handlingUploader = new FileUploader({
      url: '(URL is set dynamically in onAfterAddingFile)'
    });

    var paymentsUploader = $scope.paymentsUploader = new FileUploader({
      url: '(URL is set dynamically in onAfterAddingFile)'
    });

    mainUploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|jpeg|'.indexOf(type) !== -1;
        // |jpg|png|jpeg|bmp|gif|
      }
    });

    $scope.uploadLetter = function () {
      var letter = $scope.Letter.newLetter()
      letter.main = _.map($scope.mainUploader.queue, function(fileItem) { return fileItem.page; });
      letter.handling = _.map($scope.handlingUploader.queue, function(fileItem) { return fileItem.page; });
      letter.payments = _.map($scope.paymentsUploader.queue, function(fileItem) { return fileItem.page; });

      var mailbox = angular.copy($scope.mailbox);
      mailbox.letters.push(letter);
      var upsert = mailbox._id ? Mailboxes.update : Mailboxes.save;
      upsert(mailbox).$promise.then(function(mailbox) {
        $scope.mailbox = mailbox;
        $modalInstance.close();
      }, function(err) {
        $scope.error = 'Status ' + err.status + ': ' + err.statusText;
        console.log(err);  // TODO: Need an error display on the modal
      });
    };

    // Need to call this outside of modal in result.then() as well
    $scope.cancelUpload = function () {
      $scope.mainUploader.cancelAll();
      $scope.handlingUploader.cancelAll();
      $scope.paymentsUploader.cancelAll();
      $modalInstance.dismiss('cancel');
    };

    mainUploader.onAfterAddingFile = function(fileItem) {
      fileItem.page = ObjectId();
      fileItem.url = '/api/v1/images/' + $scope.Letter._id + '/' + fileItem.page;
    };
  }]);

  // Thumbnail directive
  angular.module('mean.system').directive('ngThumb', ['$window', function($window) {
    var helper = {
      support: !!($window.FileReader && $window.CanvasRenderingContext2D),
      isFile: function(item) {
        return angular.isObject(item) && item instanceof $window.File;
      },
      isImage: function(file) {
        var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    };

    return {
      restrict: 'A',
      template: '<canvas/>',
      link: function(scope, element, attributes) {
        if (!helper.support) return;

        var params = scope.$eval(attributes.ngThumb);

        if (!helper.isFile(params.file)) return;
        if (!helper.isImage(params.file)) return;

        var canvas = element.find('canvas');
        var reader = new FileReader();

        reader.onload = onLoadFile;
        reader.readAsDataURL(params.file);

        function onLoadFile(event) {
          var img = new Image();
          img.onload = onLoadImage;
          img.src = event.target.result;
        }

        function onLoadImage() {
          var width = params.width || this.width / this.height * params.height;
          var height = params.height || this.height / this.width * params.width;
          canvas.attr({ width: width, height: height });
          canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
        }
      }
    };
  }
]);