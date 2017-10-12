/**
 * Created by siddhartha on 23/7/17 at 03:49 PM.
 */

var express    = require('express');
var router     = express.Router();
var Report     = require('./Model');

router.get('/get/:id', function(req, res){
    Report.findOne({ _id: mongoose.Types.ObjectId(req.params.id), isActive: true }, function(err, data) {
        if(err) {
            res.status(500).send();
        }else {
            res.status(200).json(data);
        }
    });
});

router.get('/getAllByUser/:id', function(req, res){
    Report.find({ _id: mongoose.Types.ObjectId(req.params.id), isActive: true }, function(err, data) {
        if(err) {
            res.status(500).send();
        }else {
            res.status(200).json(data);
        }
    });
});

router.get('/getAllByDiagnosticLab/:id', function(req, res){
    Report.find({ _id: mongoose.Types.ObjectId(req.params.id), isActive: true }, function(err, data) {
        if(err) {
            res.status(500).send();
        }else {
            res.status(200).json(data);
        }
    });
});

router.get('/getGeneratedReportCountByDiagnosticLab/:id', function(req, res){
    Report.aggregate([
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