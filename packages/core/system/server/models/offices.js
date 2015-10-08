'use strict';

var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
          _   = require('lodash');

var escapeProperty = function(value) {
  return _.escape(value);
};

var OfficeSchema = new Schema({
  received: {
    type: String,
    unique: true,
    required: true,
    get: escapeProperty
  }
});

mongoose.model('Office', OfficeSchema);
