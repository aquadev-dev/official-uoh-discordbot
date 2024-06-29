const { SlashCommandBuilder, version, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')
const package = require('../../../../package.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-info')
        .setDescription('Prints out the general information about the bot.')
        .setDMPermission(true),
    
    
    /**
     * 
     * @param {Object} param0
     * @param {ChatInputCommandInteraction} param0.interaction
     */
    
    run: ({ interaction }) => {
       const discordJSVersion = version;
       const nodeJSVersion =  process.version;
       const botVersion = package.version;
       const numberOfGuilds = interaction.client.guilds.cache.size;
       const numberOfUsers = interaction.client.users.cache.size;

       const embed = new EmbedBuilder()
            .setTitle('UoH Compsci Server Stats')
            .setAuthor({
                name: interaction.client.user.username,
                iconURL: interaction.client.user.displayAvatarURL({ size: 256 }), 
            })
            .addFields([
                {name: 'Bot Version', value: botVersion},
                {name: 'discord.js Version', value: discordJSVersion},
                {name: 'NodeJS Version', value: nodeJSVersion},
                {name: 'Total Guilds', value: `${numberOfGuilds}`},
                {name: 'Total Users', value: `${numberOfUsers}`},
                {name: 'Bot Developer', value: `<@${process.env.OWNER_ID}>`},
            ])
            .setColor(0x30b73);
        
        interaction.reply({content: 'Info Displayed!', ephemeral: true});
        interaction.channel.send({embeds: [embed]});
        

    },

    
}
