'use strict';

angular.module('mean.system').factory('Letter', ['$resource', 'MeanUser',
  function($resource, User) {
    function LetterKlass() {
        this._id = ObjectId();
        this.name = undefined;
        this.key = undefined
        this.pages = undefined;
    }

    LetterKlass.prototype.newLetter = function() {
      return {
        _id: this._id,
        operator: User.user._id,
        direction: 'incoming',
        name: this.name,
        key: this.key,
        pages: this.pages
      };
    };

    return new LetterKlass();
  }
]);
