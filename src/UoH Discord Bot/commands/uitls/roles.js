const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, Client, ChatInputCommandInteraction } = require("discord.js");




module.exports = {
    data: new SlashCommandBuilder().setName('role-embed').setDescription('Makes the roles embed.'),

    /**
     * 
     * @param {Object} param0 
     * @param {Client} param0.client
     * @param {ChatInputCommandInteraction} param0.interaction
     */
    run: ({interaction, client}) => {
        const embed = new EmbedBuilder()
            .setTitle('Selcet a role corresponding to your course!')
            .setColor(0x30b73)
            .setDescription('"Please type the abbreviation in your course in this chat to receive your specific course role! If you want to change your role please ask an admin to reset you roles so you can select again\nPlease type one of the following abbreviations in this chat:')
            .setFooter({text: 'UoH Compsci Server', iconURL: 'https://cdn.discordapp.com/avatars/1141762624296583210/4f0beb1f11dd0c86e17eefeeb7f58fb6.png?size=256'})
            .addFields(
                {name: ' ', value: 'For ❤️ <@&1142015628220313600> type comp'},
                {name: ' ', value: 'For 💛 <@&1142015761540456479> type compsci'},
                {name: ' ', value: 'For 💙 <@&1142015872886652949> type cybersec'},
                {name: ' ', value: 'For 💚 <@&1142016924344139837> type games-prog'},
                {name: ' ', value: 'For 🧡 <@&1142016999627690064> type AI'},
                {name: ' ', value: 'For 💖 <@&1142017074168860672> type I-T'},
                {name: ' ', value: 'For 🤍 <@&1142017156599533608> type comp-biss'},
                {name: ' ', value: 'For 💜 <@&1142017495704817675> type softw-eng'},
                {name: ' ', value: 'For 🤎 <@&1142017306306826320> type other-c'},
            );
        
        const channel = client.channels.cache.get(process.env.ROLE_CHANNEL);

        channel.send({embeds: [embed]})

        interaction.reply({content: 'Embed sent', ephemeral: true});

        

    },

    options: {
        userPermissions: ['Administrator'],
        botPermissions: ['Administrator'],
    }


}