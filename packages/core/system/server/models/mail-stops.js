'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
          _   = require('lodash');

var validateUniqueMailStopCode = function(value, callback) {
  var MailStop = mongoose.model('MailStop');
  MailStop.find({
    $and: [{
      code: value
    }, {
      _id: {
        $ne: this._id
      }
    }]
  }, function(err, mailStop) {
    callback(err || mailStop.length === 0);
  });
};

var MailStopSchema = new Schema({
  code: {
    type: Number,
    unique: true,
    required: true,
    match: ["/^[0-9]{10}$/g", "Code must be a 10-digit number"],
    validate: [validateUniqueMailStopCode, "Code is already in use"]
  }
});

mongoose.model('MailStop', MailStopSchema);