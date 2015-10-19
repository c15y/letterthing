'use strict';

angular.module('mean.system').factory('Letter', ['$resource', 'MeanUser',
  function($resource, User) {
    function LetterKlass() {
        this._id = ObjectId();
        this.main = undefined;
        this.handling = undefined;
        this.payments = undefined;
    }

    LetterKlass.prototype.newLetter = function(mailbox) {
      return {
        _id: this._id,
        mailbox: mailbox._id,
        operator: '5419754290', // TODO
        direction: 'incoming',
        main: this.main,
        handling: this.handling,
        payments: this.payments
      };
    };

    return new LetterKlass();
  }
]);
