/**
 * Created by siddhartha on 12/8/17 at 02:43 PM.
 */
var express      = require('express');
var mongoose     = require('mongoose');
var router       = express.Router();
var AccessRole   = require('./Model');

router.post('/create', function(req, res){
    var data = req.body;
    data.createdAt = new Date();
    var accessRole = new AccessRole(data);
    accessRole.save(function(err) {
        if(err)
            res.status(500).send();
        else
            res.status(201).send();
    })
});

module.exports = router;


