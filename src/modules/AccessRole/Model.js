/**
 * Created by siddhartha on 6/8/17 at 10:39 AM.
 */

var roleModel = {
    "create" : [String],
    "read" : [String],
    "update" : [String],
    "delete" : [String],
    "name" : String,
    "description" : String,
    "createdAt": Date,
    "updatedAt": { type: Date, default: Date.now },
    "isActive": { type: Boolean, default: true }
};


var mongoose = require("mongoose");

module.exports = mongoose.model("AccessRole", new mongoose.Schema(roleModel));