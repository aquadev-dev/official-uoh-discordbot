const { Message, Client, ChatInputCommandInteraction, time } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

/**
 * 
 * @param {Message} message 
 * @param {Client} client 
 * @param {ChatInputCommandInteraction} interaction 
 */



module.exports = async (message, client, interaction) => {
    const channel = client.channels.cache.get('1203325007149797417');
    const eventUser = message.member.roles.highest.position;
    const botGuild = client.guilds.cache.get(message.member.guild.id);
    const botPosition = botGuild.members.me.roles.highest.position;
    
    if (eventUser >= botPosition && message.channelId.match(channel.id)) {
        switch (message.content.toLowerCase()) {
            case "comp":
                const hasCompRole = message.member.roles.cache.has('1142015628220313600')
                if (hasCompRole) {
                    await message.member.roles.remove('1142015628220313600')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);

                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142015628220313600');
                    message.delete(message.id);
                    return;
                }
                
            case "compsci":
                const hasCompsciRole = message.member.roles.cache.has('1142015761540456479')
                if (hasCompsciRole) {
                    await message.member.roles.remove('1142015761540456479')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142015761540456479');
                    message.delete(message.id);
                    return;
                }
            case "cybersec":
                const hasCybersecRole = message.member.roles.cache.has('1142015872886652949')
                if (hasCybersecRole) {
                    await message.member.roles.remove('1142015872886652949')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142015872886652949');
                    message.delete(message.id);
                    return;
                }
            case "games-prog":
                const hasGamesProgRole = message.member.roles.cache.has('1142016924344139837')
                if (hasGamesProgRole) {
                    await message.member.roles.remove('1142016924344139837')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142016924344139837');
                    message.delete(message.id);
                    return;
                }
            case "AI":
                const hasAIRole = message.member.roles.cache.has('1142016999627690064')
                if (hasAIRole) {
                    await message.member.roles.remove('1142016999627690064')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142016999627690064');
                    message.delete(message.id);
                    return;
                }
            case "I-T":
                const hasITRole = message.member.roles.cache.has('1142017074168860672')
                if (hasITRole) {
                    await message.member.roles.remove('1142017074168860672')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142017074168860672');
                    message.delete(message.id);
                    return;
                }
            case "comp-biss":
                const hasCompBissRole = message.member.roles.cache.has('1142017156599533608')
                if (hasCompBissRole) {
                    await message.member.roles.remove('1142017156599533608')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142017156599533608');
                    message.delete(message.id);
                    return;
                }
            case "softw-eng":
                const hasSoftWEngRole = message.member.roles.cache.has('1142017495704817675')
                if (hasSoftWEngRole) {
                    await message.member.roles.remove('1142017495704817675')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142017495704817675');
                    message.delete(message.id);
                    return;
                }
            case "other-c":
                const hasOtherCRole = message.member.roles.cache.has('1142017306306826320')
                if (hasOtherCRole) {
                    await message.member.roles.remove('1142017306306826320')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142017306306826320');
                    message.delete(message.id);
                    return;
                }
            
            default:
                break;
        }

        if (message.content === "Your role has been removed!") {
            await wait(3_000);
            message.delete(message.id);
        } else {
            message.delete(message.id);
        }
    
        return;
    }

    if (message.channelId.match(channel.id)) {
        switch (message.content.toLowerCase()) {
            case "comp":
                const hasCompRole = message.member.roles.cache.has('1142015628220313600')
                if (hasCompRole) {
                    await message.member.roles.remove('1142015628220313600')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);

                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142015628220313600');
                    message.delete(message.id);
                    return;
                }
                
            case "compsci":
                const hasCompsciRole = message.member.roles.cache.has('1142015761540456479')
                if (hasCompsciRole) {
                    await message.member.roles.remove('1142015761540456479')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142015761540456479');
                    message.delete(message.id);
                    return;
                }
            case "cybersec":
                const hasCybersecRole = message.member.roles.cache.has('1142015872886652949')
                if (hasCybersecRole) {
                    await message.member.roles.remove('1142015872886652949')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142015872886652949');
                    message.delete(message.id);
                    return;
                }
            case "games-prog":
                const hasGamesProgRole = message.member.roles.cache.has('1142016924344139837')
                if (hasGamesProgRole) {
                    await message.member.roles.remove('1142016924344139837')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142016924344139837');
                    message.delete(message.id);
                    return;
                }
            case "AI":
                const hasAIRole = message.member.roles.cache.has('1142016999627690064')
                if (hasAIRole) {
                    await message.member.roles.remove('1142016999627690064')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142016999627690064');
                    message.delete(message.id);
                    return;
                }
            case "I-T":
                const hasITRole = message.member.roles.cache.has('1142017074168860672')
                if (hasITRole) {
                    await message.member.roles.remove('1142017074168860672')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142017074168860672');
                    message.delete(message.id);
                    return;
                }
            case "comp-biss":
                const hasCompBissRole = message.member.roles.cache.has('1142017156599533608')
                if (hasCompBissRole) {
                    await message.member.roles.remove('1142017156599533608')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142017156599533608');
                    message.delete(message.id);
                    return;
                }
            case "softw-eng":
                const hasSoftWEngRole = message.member.roles.cache.has('1142017495704817675')
                if (hasSoftWEngRole) {
                    await message.member.roles.remove('1142017495704817675')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142017495704817675');
                    message.delete(message.id);
                    return;
                }
            case "other-c":
                const hasOtherCRole = message.member.roles.cache.has('1142017306306826320')
                if (hasOtherCRole) {
                    await message.member.roles.remove('1142017306306826320')
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add('1142017306306826320');
                    message.delete(message.id);
                    return;
                }
            
            default:
                break;
        }
    
        if (message.content === "Your role has been removed!") {
            await wait(3_000);
            message.delete(message.id);
        } else {
            message.delete(message.id);
        }
    
        return;
    }
    
}