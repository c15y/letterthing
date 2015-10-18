'use strict';

angular.module('mean.system').factory('Shifted', function() {

  function ShiftedKlass() {
      this.shifted = false;
  }

  ShiftedKlass.prototype.setShifted = function(val) {
    this.shifted = val;
  }

  ShiftedKlass.prototype.isShifted = function() {
    return this.shifted;
  }

  return new ShiftedKlass();

});