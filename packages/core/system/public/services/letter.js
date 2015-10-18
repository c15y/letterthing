'use strict';

angular.module('mean.system').factory('Letter', function() {

  function LetterKlass() {
      this._id = ObjectId();
      this.allPages = [];
      this.pagesStart = 3;
      this.paymentsStart = undefined;
  }

  /*
  LetterKlass.prototype.front = function(val) {
    this...
  }
  */

  return new LetterKlass();
});