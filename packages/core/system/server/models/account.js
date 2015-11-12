'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema;

var AccountSchema = new Schema({
  writer: { type: Schema.Types.ObjectId, ref: 'Writer' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  cents: Number
});

exports.Account = mongoose.model('Account', AccountSchema);

