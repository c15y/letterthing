'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
   ModelUtils = require('./model-utils');

var MailboxSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    match: ModelUtils.PhoneRegEx,
    required: true
  },
  name: { type: String },
  letters: [ mongoose.model('Letter').schema ],
  operator: {
    type: {
      user: { type: Schema.Types.ObjectId, unique: true, required: true },
      office: { type: String, match: ModelUtils.PhoneRegEx, required: true }
    },
    private: true,
    sparse: true
  }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

MailboxSchema.virtual('phone').get(function () {
  var area = "(" + this._id.toString().slice(0, 3) + ") ";
  var number = this._id.toString().slice(3);
  number = number.slice(0, 3) + '-' + number.slice(3);
  return area + number;
});

exports.Mailbox = mongoose.model('Mailbox', MailboxSchema);
