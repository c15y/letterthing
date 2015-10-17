'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
          _   = require('lodash'),
   modelUtils = require('./model-utils');

var StateRegEx = /^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/;
var ZipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/;

var LetterSchema = new Schema({
  operator: { type: String, index: true, match: modelUtils.PhoneRegEx },
  received: { type: Date },
  address: {
      street1: { type: String, uppercase: true, trim: true },
      street1: { type: String, uppercase: true, trim: true, required: false },
      city: { type: String, uppercase: true, trim: true},
      state: { type: String, uppercase: true, trim: true, match: StateRegEx },
      zip: { type: String, match: ZipRegEx },
  },
  infoages: {
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
      ref: String
    }],
    required: false,
    private: true
  },
  returned: { type: Date, required: false },
  shredded: { type: Date, required: false },
  notes: [{
    operator: { type: String, match: modelUtils.PhoneRegEx },
    text: String,
    timestamp: Date
  }]
});

modelUtils.allFieldsRequiredByDefautlt(LetterSchema);

exports.Letter = mongoose.model('Letter', LetterSchema);