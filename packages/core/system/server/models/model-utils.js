'use strict';

exports.PhoneRegEx = /^[2-9][0-9]{0,9}$/;

exports.allFieldsRequiredByDefautlt = function(schema) {
    for (var i in schema.paths) {
        var attribute = schema.paths[i]
        if (attribute.isRequired == undefined) {
            attribute.required(true);
        }
    }
}