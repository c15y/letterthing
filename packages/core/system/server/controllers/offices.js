'use strict';

 var mongoose = require('mongoose'),
 Office = mongoose.model('Office'),
 _ = require('lodash');

/**
* Create Office
*/
 exports.create = function(req, res, next) {
    var office = new Office(req.body);

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    office.save(function(err) {
        if (err) {
            var modelErrors = [];
            switch (err.code) {
                case 11000:
                case 11001:
                res.status(400).json([{
                    msg: 'Office name already in use',
                    param: 'name'
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
* Load Office by id
*/
exports.load = function(req, res, next, id) {
    Office.findOne({
        id: id
    }).exec(function(err, office) {
        if (err) return next(err);
        if (!office) return next(new Error('Failed to load Office by id ' + id));
        req.params.office = office;
        next();
    });
};

/**
 * List of Offices
 */
exports.all = function(req, res) {
    Office.find().sort('+name').populate('office', 'name').exec(function(err, offices) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.send(offices);
        }
    });
};

/**
* Get Office
*/
exports.get = function(req, res) {
    res.send(req.params.office);
};
