/**
 * Created by siddhartha on 6/8/17 at 9:00 PM.
 */

var express                 = require('express');
var mongoose                = require('mongoose');
var router                  = express.Router();
var User                    = require('./Model');

router.post('/create', function(req, res){
    var data = req.body;
    data.createdAt = new Date();
    var user = new User(data);
    user.save(function(err) {
        if(err)
            res.status(500).send();
        else
            res.status(201).send();
    })
});

router.post('/signIn', function(req, res){
    var data = req.body;
    console.log(data);
    req.logIn(data, function(){
        res.redirect('/diagnosticLab');
    });
});

router.get('/get/:id', function(req, res){
    User.findOne({
        _id: mongoose.Types.ObjectId(req.params.id),
        isActive: true
    })
    .populate("role")
    .exec(function(err, data) {
        if(err)
            res.status(500).send();
        else
            res.status(200).json(data);

    });
});

module.exports = router;
