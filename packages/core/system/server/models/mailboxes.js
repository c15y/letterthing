'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
          _   = require('lodash');

var validateUniqueMailboxCode = function(value, callback) {
  var Mailbox = mongoose.model('Mailbox');
  Mailbox.find({
    $and: [{
      code: value
    }, {
      _id: {
        $ne: this._id
      }
    }]
  }, function(err, mailbox) {
    callback(err || mailbox.length === 0);
  });
};

var MailboxSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
    validate: [validateUniqueMailboxCode, "Code is already in use"]
  },
  letters: [ mongoose.model('Letter').schema ]
});

exports.Mailbox = mongoose.model('Mailbox', MailboxSchema);