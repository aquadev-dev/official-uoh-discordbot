const { Message, Client, ChatInputCommandInteraction, time } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

/**
 * 
 * @param {Message} message 
 * @param {Client} client 
 * @param {ChatInputCommandInteraction} interaction 
 */



module.exports = async (message, client, interaction) => {
    const channel = client.channels.cache.get(process.env.ROLE_CHANNEL);
    const eventUser = message.member.roles.highest.position;
    const botGuild = client.guilds.cache.get(message.member.guild.id);
    const botPosition = botGuild.members.me.roles.highest.position;
    
    if (eventUser >= botPosition && message.channelId.match(channel.id)) {
        switch (message.content.toLowerCase()) {
            case "comp":
                const hasCompRole = message.member.roles.cache.has(process.env.COMP_ROLE);
                if (hasCompRole) {
                    await message.member.roles.remove(process.env.COMP_ROLE);
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);

                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.COMP_ROLE);
                    message.delete(message.id);
                    return;
                }
                
            case "compsci":
                const hasCompsciRole = message.member.roles.cache.has(process.env.COMPSCI_ROLE)
                if (hasCompsciRole) {
                    await message.member.roles.remove(process.env.COMPSCI_ROLE);
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.COMPSCI_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "cybersec":
                const hasCybersecRole = message.member.roles.cache.has(process.env.CYBERSEC_ROLE)
                if (hasCybersecRole) {
                    await message.member.roles.remove(process.env.CYBERSEC_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.CYBERSEC_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "games-prog":
                const hasGamesProgRole = message.member.roles.cache.has(process.env.GAMESPROG_ROLE);
                if (hasGamesProgRole) {
                    await message.member.roles.remove(process.env.GAMESPROG_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.GAMESPROG_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "AI":
                const hasAIRole = message.member.roles.cache.has(process.env.AI_ROLE)
                if (hasAIRole) {
                    await message.member.roles.remove(process.env.AI_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.AI_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "I-T":
                const hasITRole = message.member.roles.cache.has(process.env.IT_ROLE)
                if (hasITRole) {
                    await message.member.roles.remove(process.env.IT_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.IT_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "comp-biss":
                const hasCompBissRole = message.member.roles.cache.has(process.env.COMPBISS_ROLE)
                if (hasCompBissRole) {
                    await message.member.roles.remove(process.env.COMPBISS_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.COMPBISS_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "softw-eng":
                const hasSoftWEngRole = message.member.roles.cache.has(process.env.SOFTW_ROLE)
                if (hasSoftWEngRole) {
                    await message.member.roles.remove(process.env.SOFTW_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.SOFTW_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "other-c":
                const hasOtherCRole = message.member.roles.cache.has(process.env.OTHER_ROLE)
                if (hasOtherCRole) {
                    await message.member.roles.remove(process.env.OTHER_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.OTHER_ROLE);
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
                const hasCompRole = message.member.roles.cache.has(process.env.COMP_ROLE)
                if (hasCompRole) {
                    await message.member.roles.remove(process.env.COMP_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);

                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.COMP_ROLE);
                    message.delete(message.id);
                    return;
                }
                
            case "compsci":
                const hasCompsciRole = message.member.roles.cache.has(process.env.COMPSCI_ROLE)
                if (hasCompsciRole) {
                    await message.member.roles.remove(process.env.COMPSCI_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.COMPSCI_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "cybersec":
                const hasCybersecRole = message.member.roles.cache.has(process.env.CYBERSEC_ROLE)
                if (hasCybersecRole) {
                    await message.member.roles.remove(process.env.CYBERSEC_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.CYBERSEC_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "games-prog":
                const hasGamesProgRole = message.member.roles.cache.has(process.env.GAMESPROG_ROLE)
                if (hasGamesProgRole) {
                    await message.member.roles.remove(process.env.GAMESPROG_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.GAMESPROG_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "AI":
                const hasAIRole = message.member.roles.cache.has(process.env.AI_ROLE)
                if (hasAIRole) {
                    await message.member.roles.remove(process.env.AI_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.AI_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "I-T":
                const hasITRole = message.member.roles.cache.has(process.env.IT_ROLE)
                if (hasITRole) {
                    await message.member.roles.remove(process.env.IT_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.IT_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "comp-biss":
                const hasCompBissRole = message.member.roles.cache.has(process.env.COMPBISS_ROLE)
                if (hasCompBissRole) {
                    await message.member.roles.remove(process.env.COMPBISS_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.COMPBISS_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "softw-eng":
                const hasSoftWEngRole = message.member.roles.cache.has(process.env.SOFTW_ROLE)
                if (hasSoftWEngRole) {
                    await message.member.roles.remove(process.env.SOFTW_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.SOFTW_ROLE);
                    message.delete(message.id);
                    return;
                }
            case "other-c":
                const hasOtherCRole = message.member.roles.cache.has(process.env.OTHER_ROLE)
                if (hasOtherCRole) {
                    await message.member.roles.remove(process.env.OTHER_ROLE)
                    message.reply({content: 'Your role has been removed!'});
                    await wait(3_000);
                    message.delete(message.id);
                    return;
                } else {
                    await message.member.roles.add(process.env.OTHER_ROLE);
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