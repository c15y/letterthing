'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
          _   = require('lodash'),
   modelUtils = require('./model-utils');

var StateRegEx = /^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/;
var ZipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/;
var PasscodeRegEx = /^[A-Z]+$/;

var LetterSchema = new Schema({
  direction: { type: String, enum: ['incoming', 'outgoing'] },
  workflow: [{
    operator: { type: String, match: modelUtils.PhoneRegEx },
    timestamp: Date,
    state: { type: String, enum: ['created', 'stored', 'mailed', 'destroyed'] },
    text: { type: String, required: false }
  }],
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
      ref: { type: String, required: false }
    }],
    required: false,
    private: true
  },
  cost: Number
});

modelUtils.allFieldsRequiredByDefautlt(LetterSchema);

exports.Letter = mongoose.model('Letter', LetterSchema);