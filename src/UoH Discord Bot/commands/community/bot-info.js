const { SlashCommandBuilder, version } = require('discord.js')
const package = require('../../../../package.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-info')
        .setDescription('Prints out the general information about the bot.')
        .setDMPermission(true),
    
    
    
    run: ({ interaction }) => {
       const discordJSVersion = version;
       const nodeJSVersion =  process.version;
       const botVersion = package.version;
       

    },

    
}
