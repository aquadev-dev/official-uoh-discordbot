const { Schema, model } = require('mongoose');

const botReportGuildConfigurationSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    reportChannelIds: {
        type: [String],
        default: [],
    }
});

module.exports = model('botReportGuildConfiguration', botReportGuildConfigurationSchema);