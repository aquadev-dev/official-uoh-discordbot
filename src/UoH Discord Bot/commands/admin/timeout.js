const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');
const ms = require('ms');

require('dotenv/config');

module.exports = {
    /**
     * 
     * @param {Object} param0
     * @param {ChatInputCommandInteraction} param0.interaction
     * @param {Client} param0.client
     */

    run: async ({interaction, client, handler}) => {
        const adminLogChannelId = process.env.ADMIN_CHANNEL_ID;
        const adminLogChannel = client.channels.cache.get(adminLogChannelId);
        const targetUserId = interaction.options.get('user').value;
        const duration = interaction.options.get('duration').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        await interaction.deferReply({ephemeral: true});

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.editReply("That user doesn't exist in this server.");
            return;
        }

        if (targetUser.user.bot) {
            await interaction.editReply("I can't timeout a bot.");
        }

        // Convert duration from human readable format to milliseconds
        const msDuration = ms(duration);

        if (isNaN(msDuration)) {
            await interaction.editReply("Please provide a valid timeout duration!");
            return;
        }

        if (msDuration < 5000 || msDuration > 2.419e9) {
            await interaction.editReply("Timeout duration cannot be less than 5 seconds or more than 28 days!");
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply("You can't ban that user because they have the same/higher role than you.");
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I can't ban that user because they have the same/higher role than me.");
            return;
        }

        const { default: prettyMs } = await import('pretty-ms');

        // Construct the Admin Log Embed
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.displayName} has timed out ${targetUser.user.displayName} for ${prettyMs(msDuration, {verbose: true})} with the reason of ${reason}`)
            .setColor('Red');
        
        try {
            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`${targetUser}'s has been updated to ${prettyMs(msDuration, { verbose: true})}`);
                embed.setTitle(`${interaction.user.displayName} has updated ${targetUser.user.displayName}'s time out to ${prettyMs(msDuration, {verbose: true})} with the reason of ${reason}`);
                await adminLogChannel.send({content: ' ', embeds: [embed]});
                return;
            }
            
            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`${targetUser} has been timed out ${prettyMs(msDuration, { verbose: true})}`);
            await adminLogChannel.send({content: ' ', embeds: [embed]});
        } catch (error) {
            console.log(`there was an error when timing out: ${error}`);
        }
    },

    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user whos misbehaving.')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('The user you want to timeout.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('duration')
                .setDescription('Timeout duration (30m, 1h, 1 day).')
                .setRequired(true)
        )
        .addStringOption(option => 
            option
                .setName('reason')
                .setDescription('The reason for the timeout.')
        ),
    
    

    options: {
        userPermissions: ['MuteMembers'],
        botPermissions: ['Administrator', 'MuteMembers']
    },
}