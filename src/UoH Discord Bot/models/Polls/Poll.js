const {Schema, model} = require('mongoose');
const { randomUUID } = require('crypto');

const pollSchema = new Schema({
    pollId: {
        type: String,
        default: randomUUID,
    },
    authorId: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
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
    option1Name: {
        type: String,
        required: true,
    },
    option1Votes: {
        type: [String],
        default: [],
    },
    option2Name: {
        type: String,
        required: true,
    },
    option2Votes: {
        type: [String],
        default: [],
    },


}, { timestamps: true });

module.exports = model('Poll', pollSchema)
