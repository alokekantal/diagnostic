/**
 * Created by siddhartha on 17/7/17.
 */

var express                 = require('express');
var mongoose                = require('mongoose');
var router                  = express.Router();
var DiagnosticTest          = require('./Model');
var DiagnosticTestCategory  = require('./DiagnosticTestCategoryModel');

router.get('/getAll', function(req, res){
    DiagnosticTest
        .find({ isActive: true })
        .populate('category')
        .exec(function(err, data) {
            if(err) {
                res.status(500).send();
            }else {
                res.status(200).json(data);
            }
        });
});

router.get('/get/:id', function(req, res){
    DiagnosticTest
        .findOne({ _id: mongoose.Types.ObjectId(req.params.id), isActive: true })
        .populate('category')
        .exec(function(err, data) {
            if(err) {
                res.status(500).send();
            }else {
                res.status(200).json(data);
            }
        });
});

router.get('/getByDiagnosticLab/:diagnosticLabId', function(req, res){
    DiagnosticTest
        .find({ diagnosticLabId: mongoose.Types.ObjectId(req.params.diagnosticLabId), isActive: true })
        .populate('category')
        .exec(function(err, data) {
            if(err) {
                res.status(500).send();
            }else {
                res.status(200).json(data);
            }
        });
});

router.get('/getByDiagnosticLabAndCategory/:diagnosticLabId/:categoryId', function(req, res){
    DiagnosticTest
        .find({
            diagnosticLabId: mongoose.Types.ObjectId(req.params.diagnosticLabId),
            category: mongoose.Types.ObjectId(req.params.categoryId),
            isActive: true
        })
        .exec(function(err, data) {
            if(err) {
                res.status(500).send();
            }else {
                res.status(200).json(data);
            }
        });
});

router.post('/create', function (req, res) {
    var data = req.body;
    data.createdAt = new Date();
    data.category = mongoose.Types.ObjectId(req.body.category);
    var diagnosticTest = new DiagnosticTest(data);
    diagnosticTest.save(function (err) {
        if(err) res.status(500).send();
        else res.status(201).send();
    });
});

router.post('/category/create', function (req, res) {
    var data = req.body;
    data.createdAt = new Date();
    var diagnosticTestCat = new DiagnosticTestCategory(data);
    diagnosticTestCat.save(function (err) {
        if(err) res.status(500).send();
        else res.status(201).send();
    });
});

router.get('/category/getAll', function (req, res) {
    DiagnosticTestCategory
        .find({ isActive: true })
        .exec(function(err, data) {
            if(err) {
                res.status(500).send();
            }else {
                res.status(200).json(data);
            }
        });
});

module.exports = router;