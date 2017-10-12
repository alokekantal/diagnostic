/**
 * Created by siddhartha on 23/7/17 09:57 AM.
 */
var express                 = require('express');
var mongoose                = require('mongoose');
var router                  = express.Router();
var DiagnosticTestBooking   = require('./Model');
var User                    = require('./../User/Model');
var CONSTANTS               = require('./../../util/Constants');

router.get('/getPendingBookingCountByDiagnosticLab/:diagnosticLabId', function(req, res){
    DiagnosticTestBooking.aggregate([
        { $match: { status: "pending", diagnosticLabId: req.params.diagnosticLabId } },
        { $group: { _id: null, total: { $sum: 1 } } }
    ], function(err, doc) {
        if(err) {
            res.status(500).send();
        } else {
            res.send(doc);
        }
    });
});

router.get('/getCompletedBookingCountByDiagnosticLab/:diagnosticLabId', function(req, res){
    DiagnosticTestBooking.aggregate([
        { $match: { status: "completed", diagnosticLabId: req.params.diagnosticLabId } },
        { $group: { _id: null, total: { $sum: 1 } } }
    ], function(err, doc) {
        if(err) {
            res.status(500).send();
        } else {
            res.send(doc);
        }
    });
});

router.post('/create', function(req, res){
    var data = {};
    data.createdAt = new Date();
    data.diagnosticLabId = mongoose.Types.ObjectId('59744253c9aebe1254fd409b');
    data.diagnosticTest = mongoose.Types.ObjectId(req.body.diagnosticTest);
    data.bookedTime = new Date();
    data.bookingType = 'Offline';
    User.findOne({
        phone: req.body.phone,
        isActive: true
    }, function (err, result) {
        if(err) {
            res.status(500).send();
        }else {
            if(result == null) {
                var user =  {};
                user['firstname'] = req.body.firstname;
                user['lastname']  = req.body.lastname;
                user['email']     = req.body.email;
                user['phone']     = req.body.phone;
                user['role']      = mongoose.Types.ObjectId(CONSTANTS.USER_ROLE_ID);
                user['createdAt'] = new Date();
                var u = new User(user);
                u.save(function(err, doc) {
                    if(err) {
                        res.status(500).send();
                    } else {
                        data.userId = mongoose.Types.ObjectId(doc._id);
                        var booking = new DiagnosticTestBooking(data);
                        booking.save(function(err) {
                            if(err)
                                res.status(500).send();
                            else
                                res.status(201).send();
                        });
                    }

                })
            } else {
                data.userId = mongoose.Types.ObjectId(result._id);
                var booking = new DiagnosticTestBooking(data);
                booking.save(function(err) {
                    if(err)
                        res.status(500).send();
                    else
                        res.status(201).send();
                })
            }
        }
    })

});

router.get('/get/:bookingId', function(req, res){
    DiagnosticTestBooking.findOne({ _id: mongoose.Types.ObjectId(req.params.bookingId), isActive: true }, function(err, data) {
        if(err) {
            res.status(500).send();
        }else {
            res.status(200).json(data);
        }
    });
});

router.get('/getBookingsByDiagnosticLab/:diagnosticLabId', function(req, res){
    DiagnosticTestBooking.find({ diagnosticLabId: req.params.diagnosticLabId, isActive: true }, function(err, docs) {
        if(err) {
            res.status(500).send();
        } else {
            res.send(docs);
        }
    });
});

router.get('/getAll', function(req, res){
    DiagnosticTestBooking
    .find({ isActive: true })
    .populate("userId")
    .populate("diagnosticLabId")
    .populate('diagnosticTest')
    .exec(function(err, data) {
        if(err) {
            res.status(500).send();
        }else {
            res.status(200).json(data);
        }
    });
});

module.exports = router;