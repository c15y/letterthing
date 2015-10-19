'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
   ModelUtils = require('./model-utils');

var MailboxSchema = new Schema({
  phone: {
    type: String,
    unique: true,
    match: ModelUtils.PhoneRegEx,
    required: true,
    index: true
  },
  name: { type: String },
  letters: [ mongoose.model('Letter').schema ],
  operator: {
    type: {
      user: { type: Schema.Types.ObjectId, unique: true, required: true },
      office: { type: String, match: ModelUtils.PhoneRegEx, required: true }
    },
    access: 'private',
    sparse: true
  }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

exports.Mailbox = mongoose.model('Mailbox', MailboxSchema);
