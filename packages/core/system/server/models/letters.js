'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
          _   = require('lodash');

var KeyRegEx = /^[0-9]{4}|[A-Z]{4}$/,
  StateRegEx = /^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/,
    ZipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/;

var LetterSchema = new Schema({
  operator: { type: Schema.Types.ObjectId, required: true },
  direction: { type: String, enum: ['incoming', 'outgoing'], required: true },

  name: String,
  key: { type: String, match: KeyRegEx, access: 'protected' },

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
  tags: [ String ],

  pages: {
    type: {
      key: {type: String, required: true },
      handling: Boolean,
      signature: Boolean,
      payment: Boolean,
      text: String,
      caption: String,
      summary: String,
      note: { type: String, private: true }
    },
    required: true
  },

  created: { type: Date, default: Date.now, required: true },
  rendered: { type: Date, default: Date.now, required: true },
  handled: Date,
  alarm: Date,
  mailed: Date,

  note: { type: String, access: 'protected' }
});

exports.Letter = mongoose.model('Letter', LetterSchema);
