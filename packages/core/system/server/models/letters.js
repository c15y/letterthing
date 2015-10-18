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
  created: { type: Date, required: true },
  rendered: { type: Date, required: true },
  inre: Schema.Types.ObjectId,
  alarm: Date,
  mailed: Date,
  address: {
    street1: { type: String, uppercase: true, trim: true, required: true },
    street1: { type: String, uppercase: true, trim: true, },
    city: { type: String, uppercase: true, trim: true, required: true},
    state: { type: String, uppercase: true, trim: true, match: StateRegEx, required: true },
    zip: { type: String, match: ZipRegEx, required: true }
  },
  title: String,
  summary: String,
  note: { type: String, private: true },
  tags: [ String ],
  passcode: { type: String, uppercase: true, match: PasscodeRegEx, private: true },
  envelope: {
    front: {
      type: {
        image: { type: Schema.Types.ObjectId, required: true },
        text: String,
        caption: String,
        summary: String,
        note: { type: String, private: true }
      },
      required: true
    },
    back: {
      type: {
        image: { type: Schema.Types.ObjectId, required: true },
        text: String,
        caption: String,
        summary: String,
        note: { type: String, private: true }
      },
      required: true
    }
  },
  coverPages: {
    type: [{
      image: { type: Schema.Types.ObjectId, required: true },
      text: String,
      note: String,
      processed: Date
    }],
    private: true
  },
  pages: [{
    image: { type: Schema.Types.ObjectId, required: true },
    text: String,
    caption: String,
    summary: String,
    note: String
  }],
  payments: {
    type: [{
      image: { type: Schema.Types.ObjectId, required: true },
      text: String,
      amount: { type: Number, required: true },
      type: { type: String, enum: ['check', 'epayment'], required: true },
      ref: { type: String, required: true },
      note: String,
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
