/**
 * Created by siddhartha on 18/7/17.
 * Updated by siddhartha on 23/07/2017 09:20 AM
 */
var mongoose = require("mongoose");

module.exports = mongoose.model("DiagnosticLab", new mongoose.Schema({
    name: String,
    about: String,
    address: String,
    opensAt: String,
    closesAt: String,
    phone: String,
    createdAt: Date,
    updatedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
}));