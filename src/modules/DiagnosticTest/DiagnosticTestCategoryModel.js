/**
 * Created by siddhartha on 15/8/17 at 01:11 PM.
 */
var mongoose = require("mongoose");

module.exports = mongoose.model("DiagnosticTestCategory", new mongoose.Schema({
    name: String,
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
}));



