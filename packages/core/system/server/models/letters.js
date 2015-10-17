'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
          _   = require('lodash'),
   modelUtils = require('./model-utils');

var StateRegEx = /^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/;
var ZipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/;
var PasscodeRegEx = /^[A-Z]+$/;

var LetterSchema = new Schema({
  operator: { type: String, match: modelUtils.PhoneRegEx },
  direction: { type: String, enum: ['incoming', 'outgoing'] },
  created: Date,
  mailed: { type: Date, required: false },
  address: {
      street1: { type: String, uppercase: true, trim: true },
      street1: { type: String, uppercase: true, trim: true, required: false },
      city: { type: String, uppercase: true, trim: true},
      state: { type: String, uppercase: true, trim: true, match: StateRegEx },
      zip: { type: String, match: ZipRegEx },
  },
  passcode: { type: String, required: false, uppercase: true, match: PasscodeRegEx },
  infoPages: {
    type: [{
      image: {
        data: Buffer,
        contentType: String
      }
    }],
    required: false,
    private: true
  },
  publicPages: {
    type: [{
      image: {
        data: Buffer,
        contentType: String
      }
    }],
    required: false
  },
  paymentPages: {
    type: [{
      image: {
        data: Buffer,
        contentType: String
      },
      amount: Number,
      type: { type: String, enum: ['checks', 'stripe'] },
      ref: { type: String, required: false },
      cleared: { type: Date, required: false }
    }],
    required: false,
    private: true
  },
  cost: { type: Number, required: false }
});

modelUtils.allFieldsRequiredByDefautlt(LetterSchema);

exports.Letter = mongoose.model('Letter', LetterSchema);