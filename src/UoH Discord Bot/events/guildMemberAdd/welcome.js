const {EmbedBuilder, GuildMember, Client} = require('discord.js');

/**
 * @param {GuildMember} member
 * @param {Client} client
 */

module.exports = (member, client) => {
    const channelId = '881119318149066802';

    const welcomeEmbed = new EmbedBuilder()
        .setTitle(`Hello ${member.user.displayName}, welcome to the UoH Computer Science Server!`)
        .setDescription('Make sure to read through <#1143162457456644187> and go to <#1203325007149797417> to select your course role\nThank you and enjoy your stay :)')
        .setColor('Green');
    
    const channel = client.channels.cache.get(channelId);
    channel.send({content: ' ', embeds: [welcomeEmbed]});

    return;

}