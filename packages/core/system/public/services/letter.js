'use strict';

angular.module('mean.system').factory('Letter', ['$resource', 'MeanUser',
  function($resource, User) {
    function LetterKlass() {
        this._id = ObjectId();
        this.allFiles = undefined;
        this.pagesStart = undefined;
        this.paymentsStart = undefined;
    }

    LetterKlass.prototype.front = function() {
      return this.allFiles && this.allFiles().length >= 1 ? { _id: this.allFiles()[0]._id } : undefined;
    };

    LetterKlass.prototype.back = function() {
      return this.allFiles && this.allFiles().length >= 2 ? { _id: this.allFiles()[1]._id }  : undefined;
    };

    LetterKlass.prototype.handling = function() {
      // TODO
      return undefined;
    };

    LetterKlass.prototype.pages = function() {
      // TODO
      return undefined;
    };

    LetterKlass.prototype.payments = function() {
      // TODO
      return undefined;
    };

    LetterKlass.prototype.newLetter = function(mailbox) {
      return {
        _id: this._id,
        mailbox: mailbox._id,
        operator: '5419754290', // TODO
        direction: 'incoming',
        envelope: {
          front: this.front(),
          back: this.front() // TODO
        },
        handling: this.handling(),
        pages: this.pages(),
        payments: this.payments()
      };
    };

    return new LetterKlass();
  }
]);
