'use strict';

var mongoose  = require('mongoose'),
      Schema  = mongoose.Schema;

var PageSchema = new Schema({
  letter: { type: Schema.Types.ObjectId, required: true },
  text: String,
  caption: String,
  summary: String,
  note: { type: String, private: true }
}, { toObject: { virtuals: true } });

exports.Page = mongoose.model('Page', PageSchema);