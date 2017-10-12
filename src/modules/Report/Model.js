/**
 * Created by siddhartha on 23/7/17 03:34 PM.
 */

var mongoose = require("mongoose");

module.exports = mongoose.model("Report", new mongoose.Schema({
    diagnosticLabId: { type: mongoose.Schema.Types.ObjectId, ref: "DiagnosticLab" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    file: String,
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
}));
