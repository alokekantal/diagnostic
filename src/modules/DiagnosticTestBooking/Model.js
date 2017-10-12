/**
 * Created by siddhartha on 23/7/17 09:18 AM.
 */
var mongoose = require("mongoose");

module.exports = mongoose.model("DiagnosticTestBooking", new mongoose.Schema({
    bookingType: { type: String, required: true },
    diagnosticLabId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DiagnosticLab',
        required: true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    diagnosticTest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiagnosticTest',
        required: true
    },
    bookedTime: Date,
    sampleCollectionStatus: String,    
    sampleCollectionTime: Date,    
    status: { type: String, required: true, default: "pending" },  // pending, completed, cancelled
    reportId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DiagnosticLab',
        // required: true
    },
    createdAt: { type: Date, required: true },
    updateAt: { type: Date, default: Date.now, required: true },
    isActive: { type: Boolean, default: true }
}));