const { Schema, model} = require('mongoose');

const pollGuildConfigurationSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    pollChannelIds: {
        type: [String],
        default: [],
    }
});

module.exports = model('PollGuildConfiguration', pollGuildConfigurationSchema)