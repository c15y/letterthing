'use strict';

 var mongoose = require('mongoose'),
 MailStop = mongoose.model('MailStop'),
 _ = require('lodash');

/**
* Create a MailStop
*/
 exports.create = function(req, res, next) {
    var mailStop = new MailStop(req.body);

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    mailStop.save(function(err) {
        if (err) {
            var modelErrors = [];
            switch (err.code) {
                case 11000:
                case 11001:
                res.status(400).json([{
                    msg: 'Mail Stop Code already in use',
                    param: 'code'
                }]);
                break;
                default:
                if (err.errors) {
                    for (var x in err.errors) {
                        modelErrors.push({
                            param: x,
                            msg: err.errors[x].message,
                            value: err.errors[x].value
                        });
                    }

                    res.status(400).json(modelErrors);
                }
            }
            return res.status(400);
        }

        res.status(200);
    });
};

/**
* Get a MailStop by code
*/
exports.get = function(req, res, next, code) {
    MailStop.findOne({
        code: code
    }).exec(function(err, mailStop) {
        if (err) return next(err);
        if (!mailStop) return next(new Error('Failed to load MailStop by code ' + code));
        next();
    });
};
