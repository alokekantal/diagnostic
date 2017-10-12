/**
 * Created by siddhartha on 5/8/17 at 11:46 PM.
 */

var express    = require('express');
var router     = express.Router();
var Review     = require('./Model');

router.get('/get/:id', function(req, res){
    Review.findOne({ _id: mongoose.Types.ObjectId(req.params.id), isActive: true }, function(err, data) {
        if(err) {
            res.status(500).send();
        }else {
            res.status(200).json(data);
        }
    });
});

router.get('/getAllByUser/:id', function(req, res){
    Review.find({ _id: mongoose.Types.ObjectId(req.params.id), isActive: true }, function(err, data) {
        if(err) {
            res.status(500).send();
        }else {
            res.status(200).json(data);
        }
    });
});

router.get('/getAllByDiagnosticLab/:id', function(req, res){
    Review.find({ _id: mongoose.Types.ObjectId(req.params.id), isActive: true }, function(err, data) {
        if(err) {
            res.status(500).send();
        }else {
            res.status(200).json(data);
        }
    });
});

router.get('/getReviewCountByDiagnosticLab/:id', function(req, res){
    Review.aggregate([
        { $match: { _id: req.params.id, isActive: true }},
        { $group: { _id: null, total: { $sum: 1 } }}
    ], function(err, data) {
        if(err) {
            res.status(500).send();
        }else {
            res.status(200).json(data);
        }
    });
});



module.exports = router;