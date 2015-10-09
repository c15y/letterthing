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
  mailStop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MailStop'
  },
  sequence: {
    type: Number,
    unique: true,
    required: true,
    match: ["/^[0-9]+$/g", "Sequence must be a positive integer"],
    validate: [validateUniqueLetterSequence, "Sequence is already in use"]
  },
  received: {
    type: Date,
    required: true,
  }
});

exports.Letter = mongoose.model('Letter', LetterSchema);