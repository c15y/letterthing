'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema;

var KeyRegEx = /^[0-9]{4}|[A-Z]{4}$/;

var PersonSchema = new Schema({
  name: String,
  signature: Schema.Types.ObjectId,
  images: [Schema.Types.ObjectId],
  user: Schema.Types.ObjectId,
  screens: {
    type: [{
      label: String,
      key: { type: String, match: KeyRegEx },
      cents: Number
    }], required: true }
});

PersonSchema.index({ name: 1, signature: 1 }, { unique: true });

exports.Person = mongoose.model('Person', PersonSchema);

