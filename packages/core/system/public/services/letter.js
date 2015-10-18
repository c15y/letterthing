'use strict';

var ObjectID = require('./objectid');

angular.module('mean.system').factory('Letter', function() {

  function LetterKlass() {
      this._id = ObjectID.generate();
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