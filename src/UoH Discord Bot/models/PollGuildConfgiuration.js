const { Schema, model} = require('mongoose');

const guildConfigurationSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    pollChannelIds: {
        type: [String],
        default: [],
    }
});

module.exports = model('GuildConfiguration', guildConfigurationSchema)