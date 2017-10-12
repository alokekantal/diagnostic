/**
 * Created by siddhartha on 23/7/17.
 */
var mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "AccessRole" },
    createdAt: Date,
    updateAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
}));