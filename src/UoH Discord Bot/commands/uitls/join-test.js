const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName('join-test').setDescription('Sends a test welcome embed in the welcome channel.'),

    /**
     * 
     * @param {Object} param0
     * @param {ChatInputCommandInteraction} param0.interaction
     * @param {Client} param0.client 
     */

    run: ({interaction, client, handler}) => {
        const channelId = process.env.WELCOME_CHANNEL;

        const welcomeEmbed = new EmbedBuilder()
            .setTitle("Hello `<@MemberNameHere>`, welcome to the UoH Computer Science Server!")
            .setDescription('Make sure to read through <#1143162457456644187> and go to <#1203325007149797417> to select your course role.\nThank you and enjoy your stay :)')
            .setColor('Green');
    
        const channel = client.channels.cache.get(channelId);
        channel.send({content: ' ', embeds: [welcomeEmbed]});
        interaction.reply({content: "Embed Worked", ephemeral: true});
    },

    options: {
        devOnly: true
    }
}