const { Schema, model} = require('mongoose');

const suggestionGuildConfigurationSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    suggestionChannelIds: {
        type: [String],
        default: [],
    }
});

module.exports = model('SuggestionGuildConfiguration', suggestionGuildConfigurationSchema)