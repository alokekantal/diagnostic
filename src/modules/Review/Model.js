/**
 * Created by siddhartha on 5/8/17  at 11:46 PM.
 */

var mongoose = require("mongoose");

module.exports = mongoose.model("Review", new mongoose.Schema({
    diagnosticLabId: { type: mongoose.Schema.Types.ObjectId, ref: "DiagnosticLab" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: String,
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
}));
