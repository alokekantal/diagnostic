/**
 * Created by siddhartha on 17/7/17.
 */

var mongoose = require("mongoose");

module.exports = mongoose.model("DiagnosticTest", new mongoose.Schema({
    name: String,
    diagnosticLabId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiagnosticLab'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiagnosticTestCategory',
        required: true
    },
    description: { type: String, required: true },
    presenceRequired: Boolean,
    samplesRequired: [String],
    bookingStartTime: Number,
    bookingEndTime: Number,
    concurrency: Number,
    cost: Number,
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
}));


