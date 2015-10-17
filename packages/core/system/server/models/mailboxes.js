'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
   PhoneRegEx = /^[2-9][0-9]{0,9}$/,
   StateRegEx = /^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/,
     ZipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/,
PasscodeRegEx = /^[A-Z]+$/;

var MailboxSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    match: PhoneRegEx,
    required: true
  },
  name: { type: String },
  address: {
    street1: { type: String, uppercase: true, trim: true, required: true },
    street1: { type: String, uppercase: true, trim: true, },
    city: { type: String, uppercase: true, trim: true, required: true},
    state: { type: String, uppercase: true, trim: true, match: StateRegEx, required: true },
    zip: { type: String, match: ZipRegEx }
  },
  letters: [{
    operator: { type: String, match: PhoneRegEx, required: true },
    direction: { type: String, enum: ['incoming', 'outgoing'], required: true },
    created: { type: Date, required: true },
    mailed: Date,
    address: {
      street1: { type: String, uppercase: true, trim: true, required: true },
      street1: { type: String, uppercase: true, trim: true, },
      city: { type: String, uppercase: true, trim: true, required: true},
      state: { type: String, uppercase: true, trim: true, match: StateRegEx, required: true },
      zip: { type: String, match: ZipRegEx, required: true }
    },
    passcode: { type: String, uppercase: true, match: PasscodeRegEx },
    infoPages: {
      type: [{
        image: {
          data: Buffer,
          contentType: String
        }
      }],
      private: true
    },
    publicPages: [{
      image: {
        data: Buffer,
        contentType: String
      }
    }],
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
      private: true
    },
    cost: Number
  }],
  operator: {
    type: {
      user: { type: Schema.Types.ObjectId, unique: true, required: true },
      office: { type: String, match: PhoneRegEx, required: true }
    },
    sparse: true
  }
});

exports.Mailbox = mongoose.model('Mailbox', MailboxSchema);
