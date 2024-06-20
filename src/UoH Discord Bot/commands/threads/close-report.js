const { SlashCommandBuilder, ChatInputCommandInteraction, Client, ThreadChannel, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close-report')
        .setDescription('Close a bot report thread when either fixed or based of legitimacy.')
        .setDMPermission(false)
        .addStringOption(option => 
            option
                .setName('reason')
                .setDescription('Reason for thread to close.')
                .setRequired(true)
                
        ),
    
    /**
     * 
     * @param {Object} param0 
     * @param {ChatInputCommandInteraction} param0.interaction
     * @param {Client} param0.client
     * 
     */
    
    run: async ({interaction, client, handler}) => {
        if (!interaction.channel.isThread()) return;

        const thread = interaction.channel;
        const reportChannel = client.channels.cache.get('1252290701182632016');
        

        

        const reason = interaction.options.get('reason').value;

        await interaction.deferReply();

        

        if (thread.parentId == reportChannel.id) {
            const embed = new EmbedBuilder()
                        .setTitle(`This thread has been closed by the admin ${interaction.user.displayName} because for the reason of ${reason}`)
                        .setDescription(
                            "If you find another issue with the bot please create another thread!" 
                            + "\n Thank you for reporting this issue - Nathan (The Bots Developer)"
                        )
                        .setColor('Green');
            
            interaction.editReply({content: ' ', embeds: [embed]});
            
            thread.setLocked(true);
            thread.setArchived(true);
            
            return;
        } else {
            console.log('I\'m doing the wrong thing.');
        }
        

    },

    options: {
        userPermissions: ['ManageThreads'],
        botPermissions: ['Administrator', 'ManageThreads'],
    },
}