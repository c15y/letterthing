'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema;

var Page = {
 image: Schema.Types.ObjectId,
 text: {
   template: String,
   collab: [{
     user: { type: Schema.Types.ObjectId, ref: 'User' },
     data: Object
   }]
 }
};

var LetterSchema = new Schema({
  writer: { type: Schema.Types.ObjectId, required: true, ref: 'Writer' },
  mailbox: { type: Schema.Types.ObjectId, required: true, ref: 'Mailbox' },
  direction: { type: String, enum: ['incoming', 'outgoing'], required: true },
  operator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },

  tags: [ String ],
  seal: Schema.Types.ObjectId,
  envelope: [Page],
  cover: { type: [Page], access: 'protected' },
  content: [Page],

  accounting: {
    type: {
      checks: [{ cents: Number, image: Schema.Types.ObjectId }],
      stamps: Number,
      settled: Date
    }, access: 'protected'
  },

  flow: {
    created: { type: Date, default: Date.now, required: true },
    rendered: { type: Date, required: true },
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
