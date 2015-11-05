'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema;

var StateRegEx = /^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/,
    ZipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/;

var MailboxSchema = new Schema({
  street1: { type: String, uppercase: true, trim: true, required: true },
  street1: { type: String, uppercase: true, trim: true, },
  city: { type: String, uppercase: true, trim: true, required: true},
  state: { type: String, uppercase: true, trim: true, match: StateRegEx, required: true },
  zip: { type: String, match: ZipRegEx, required: true }
});

exports.Mailbox = mongoose.model('Mailbox', MailboxSchema);
