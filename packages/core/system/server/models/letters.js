'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
          _   = require('lodash');

var validateUniqueLetterSequence = function(value, callback) {
  var Letter = mongoose.model('Letter');
  Letter.find({
    $and: [{
      sequence: value
    }, {
      _id: {
        $ne: this._id
      }
    }]
  }, function(err, letter) {
    callback(err || letter.length === 0);
  });
};

var LetterSchema = new Schema({
  mailbox: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mailbox'
  },
  sequence: {
    type: Number,
    unique: true,
    required: true,
    validate: [validateUniqueLetterSequence, "Sequence is already in use"]
  },
  received: {
    type: Date,
    required: true,
  }
});

exports.Letter = mongoose.model('Letter', LetterSchema);