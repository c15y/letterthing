'use strict';

angular.module('mean.system').factory('Letter', [
  function() {

    function LetterKlass(){
      this.operator = {};
      this.images = [];
    }

    LetterKlass.prototype.onSubmitFail = function (response) {
      $location.path(response.redirect);
      this.submitError = 'Letter submission failed.';
      $rootScope.$emit('submitfailed');
    };

    LetterKlass.prototype.submit = function(images) {
      this.operator = {}; // Current User
      this.images = images;

      /* TODO: Figure out image updload
      $http.post('/api/:msc/addLetter', {
        operator: operator
      }).error(this.onSubmitFail.bind(this));
      */
    };

    return new LetterKlass();
  }
]);
