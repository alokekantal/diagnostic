/**
 * Created by siddhartha on 18/7/17.
 */

var express           = require('express');
var router            = express.Router();
var DiagnosticLab     = require('./Model');

router.get('/get/:id', function(req, res){
    DiagnosticLab.findOne({
        _id: mongoose.Types.ObjectId(req.params.id),
        isActive: true
    }, function(err, data) {
        if(err)
            res.status(500).send();
        else
            res.status(200).json(data);

    });
});

router.get('/getAll', function(req, res){
    DiagnosticLab
        .find({ isActive: true })
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
    var diagnosticLab = new DiagnosticLab(data);
    diagnosticLab.save(function (err) {
        if(err) res.status(500).send();
        else res.status(201).send();
    });
});

module.exports = router;
