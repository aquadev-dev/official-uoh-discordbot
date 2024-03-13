const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder} = require("discord.js");
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
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        await interaction.deferReply({ephemeral: true});

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.editReply("That user doesn't exist in this server.");
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("You can't ban that user because they are the server owner");
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

        // Construct Admin Log Embed
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.displayName} has banned ${targetUser.user.displayName} for ${reason}`)
            .setColor('Red');
        
        // Ban the target user
        
        try {
            await targetUser.ban({ reason })
            await interaction.editReply("User Banned!");
            await adminLogChannel.send({content: ' ', embeds: [embed]})
        } catch (error) {
            console.log(`There was an error when banning: ${error}`);
        }
    },

    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user that has broken the rules')
        .addUserOption((option) => 
            option
                .setName('user')
                .setDescription('The user you want to ban.')
                .setRequired(true)
        )
        .addStringOption((option) => 
            option
                .setName('reason')
                .setDescription('Reason why you banned the user.')
        
        ),
    
    
    options: {
        userPermissions: ['BanMembers'],
        botPermissions: ['Administrator', 'BanMembers'],
    },
    
    
}   