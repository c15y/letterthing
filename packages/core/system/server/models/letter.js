'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema;

var Page = {
 image: Schema.Types.ObjectId,
 text: {
   template: String,
   collab: [{
     user: Schema.Types.ObjectId,  // TODO: User or system process
     data: Object
   }]
 }
};

var LetterSchema = new Schema({
  person: { type: Schema.Types.ObjectId, required: true },
  mailbox: { type: Schema.Types.ObjectId, required: true },
  direction: { type: String, enum: ['incoming', 'outgoing'], required: true },
  operator: { type: Schema.Types.ObjectId, required: true },

  tags: [ String ],
  screen: { type: Schema.Types.ObjectId, required: true },
  envelope: [Page],
  cover: { type: [Page], access: 'protected' },
  content: [Page],

  accounting: {
    type: {
      checks: [{ cents: Number, image: Schema.Types.ObjectId }],
      stamps: Number,
      epayments: [{ cents: Number, ref: String }]
    }, access: 'protected'
  },

  flow: {
    created: { type: Date, default: Date.now, required: true },
    rendered: { type: Date, required: true },
    settled: Date,
    handled: Date,
    mailed: Date
  },

  publish: {
    type: {
      strategy: String,
      args: Object
    }, access: 'protected'
  },

  subscribe: {
    type: {
      strategy: String,
      args: Object,
      cron: String
    }, access: 'protected'
  },

  discussion: [{
    user: { type: Schema.Types.ObjectId,  required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true }
  }]
});

exports.Letter = mongoose.model('Letter', LetterSchema);
