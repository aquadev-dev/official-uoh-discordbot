const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restart the bot using pm2!'),

    /**
     * 
     * @param {Object} param0
     * @param {ChatInputCommandInteraction} param0.interaction 
     */
    
    run: async ({ interaction }) => {
        interaction.reply('♻️ Bot Restarting please wait ... ');
        await wait(3_000);
        process.exit();
    }
}