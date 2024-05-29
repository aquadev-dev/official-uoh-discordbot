const {EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder().setName('rules-embed').setDescription('Send the rules embed'),

    /**
     * 
     * @param {Object} param0 
     * @param {Client} param0.client
     * @param {ChatInputCommandInteraction} param0.interaction
     */

    run: ({interaction, client}) => {
        const embed = new EmbedBuilder()
            .setTitle('Rules of the server')
            .setColor(0x30b73)
            .setDescription('Please follow these simple rules to keep the server a nice and safe place :)')
            .addFields(
                {
                    name: '1.) Be a nice person (Pretty basic requirement)',
                    value: 'If everyone is nice to each other we can have a good time.'
                },
                {
                    name: '2.) No bullying or discrimination to any member of the server',
                    value: 'This includes any comments or remarks that are racist, sexist, and any other forms of hatred that will not be tolerated'  
                },
                {
                    name: '3.) Please stick to the right channels',
                    value: 'Try to keep things organised as best as you can.'
                },
                {
                    name: '4.) Please don\'t abuse this bot',
                    value: 'This quite self explanatory but the bot is here to make the server a better place not for it to be broken.'
                },
                {
                    name: '5.) No Spamming GIFs, Memes or `@everyone` in the chat',
                    value: 'We get that GIFs/Memes are sometimes appreciated for a bit of a laugh, but not for no reason in chats where it\'s not needed. Please keep the majority of GIFs/Memes in the <#1203809835628498944> channel.'
                },
                {
                    name: ' ',
                    value: 'If you break rule five specifically or any other rule for that matter, punishments such as bans and timeouts will occur.'
                },
                {
                    name: ' ',
                    value: `Please remember to check out <#1203325007149797417> to selcet the role for your specific course`
                },
                {
                    name: ' ',
                    value: 'Other than that enjoy your stay : )'
                }
            )
            .setFooter({text: 'UoH Compsci Discord Server', iconURL: 'https://cdn.discordapp.com/avatars/1141762624296583210/4f0beb1f11dd0c86e17eefeeb7f58fb6.png?size=256'});
        
        
        const channel = client.channels.cache.get('1143162457456644187');

        
        channel.send({embeds: [embed]});
        interaction.reply({ content: 'Embed Sent', ephemeral: true});
    },

    options: {
        userPermissions: ['Administrator'],
        botPermissions: ['Administrator'],
    }
};