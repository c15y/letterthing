'use strict';

angular.module('mean.system').factory('Letter', ['$resource', 'MeanUser',
  function($resource, User) {
    function LetterKlass() {
        this._id = ObjectId();
        this.msc = undefined;
        this.key = undefined
        this.main = undefined;
        this.handling = undefined;
        this.payments = undefined;
    }

    LetterKlass.prototype.newLetter = function() {
      return {
        _id: this._id,
        msc: this.msc,
        key: this.key,
        operator: User.user._id,
        direction: 'incoming',
        main: this.main,
        handling: this.handling,
        payments: this.payments
      };
    };

    return new LetterKlass();
  }
]);
