const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
       
    },
    visitedHistory: [{timeStamp: {type: Number}}],
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;