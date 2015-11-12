'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema;

var SecretRegEx = /^[0-9]{4}|[A-Z]{4}$/;

var WriterSchema = new Schema({
  name: String,
  signature: Schema.Types.ObjectId,
  images: [Schema.Types.ObjectId],
  seals: {
    type: [{
      image: Schema.Types.ObjectId,
      secret: { type: String, match: SecretRegEx },
      readers: [ { type: Schema.Types.ObjectId, ref: 'User' } ]
    }], required: true }
});

WriterSchema.index({ name: 1, signature: 1 }, { unique: true });

exports.Writer = mongoose.model('Writer', WriterSchema);

