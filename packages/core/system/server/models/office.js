'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema;

var OfficeSchema = new Schema({
  mailbox: { type: Schema.Types.ObjectId, required: true },
  operators: { type: [Schema.Types.ObjectId], required: true },
  printers: { type: [{ model: String, dpi: Number }], required: true }
});

exports.Office = mongoose.model('Office', OfficeSchema);
