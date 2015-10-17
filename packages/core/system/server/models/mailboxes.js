'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
          _   = require('lodash'),
   modelUtils = require('./model-utils');

var MailboxSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    match: modelUtils.PhoneRegEx
  },
  name: { type: String, required: false },
  letters: [ mongoose.model('Letter').schema ],
  office: {
    type: Boolean,
    required: false,
    sparse: true
  },
  user: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: false,
    sparse: true
  }
});

modelUtils.allFieldsRequiredByDefautlt(MailboxSchema);

exports.Mailbox = mongoose.model('Mailbox', MailboxSchema);
