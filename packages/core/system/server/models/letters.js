'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
          _   = require('lodash'),
   ModelUtils = require('./model-utils');

var StateRegEx = /^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/,
      ZipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/,
 PasscodeRegEx = /^[A-Z]+$/;

var LetterSchema = new Schema({
  operator: { type: String, match: ModelUtils.PhoneRegEx, required: true },
  direction: { type: String, enum: ['incoming', 'outgoing'], required: true },
  created: { type: Date, default: Date.now, required: true },
  rendered: { type: Date, default: Date.now, required: true },
  inre: Schema.Types.ObjectId,
  alarm: Date,
  mailed: Date,
  address: {
    type: {
      street1: { type: String, uppercase: true, trim: true, required: true },
      street1: { type: String, uppercase: true, trim: true, },
      city: { type: String, uppercase: true, trim: true, required: true},
      state: { type: String, uppercase: true, trim: true, match: StateRegEx, required: true },
      zip: { type: String, match: ZipRegEx, required: true }
    },
    required: false
  },
  subject: String,
  summary: String,
  note: { type: String, private: true },
  tags: [ String ],
  passcode: { type: String, uppercase: true, match: PasscodeRegEx, private: true },
  envelope: {
    front: { type: Schema.Types.ObjectId, required: true },
    back: { type: Schema.Types.ObjectId, required: true }
  },
  handling: {
    type: [{
      page: { type: Schema.Types.ObjectId, required: true },
      signature: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        w: { type: Number, required: true },
        h: { type: Number, required: true }
      },
      handled: Date
    }],
    private: true
  },
  pages: { type: [Schema.Types.ObjectId], required: false },
  payments: {
    type: [{
      page: { type: Schema.Types.ObjectId, required: true },
      amount: { type: Number, required: true },
      type: { type: String, enum: ['check', 'epayment'], required: true },
      ref: { type: String, required: true },
      mailed: Date,
      deposited: Date
    }],
    private: true
  },
  cost: Number
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

LetterSchema.virtual('balance').get(function () {
  var balance = _.reduce(this.payments, function(balance, payment) {
      return balance.amount + payment.amount;
  }, -this.cost);

  if (inre) {
    balance += this.inre.balance;
  }

  return balance;
});

exports.Letter = mongoose.model('Letter', LetterSchema);
