const { Schema, model } = require('mongoose');
const { randomUUID } = require('crypto');

const botReportSchema = new Schema({
    reportId: {
        type: String,
        default: randomUUID,
    },
    authorId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    messageId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    }
}, {timestamps: true});

module.exports = model('botReport', botReportSchema)