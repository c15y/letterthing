'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
   ModelUtils = require('./model-utils');

var MailboxSchema = new Schema({
  msc: {
    type: String,
    unique: true,
    match: ModelUtils.PhoneRegEx
  },
  name: { type: String },
  letters: [ mongoose.model('Letter').schema ],
  operator: {
    type: {
      user: { type: Schema.Types.ObjectId, required: true },
      office: { type: String, match: ModelUtils.PhoneRegEx, required: true }
    },
    access: 'private',
    sparse: true
  }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

exports.Mailbox = mongoose.model('Mailbox', MailboxSchema);
