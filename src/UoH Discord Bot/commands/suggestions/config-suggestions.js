const { SlashCommandBuilder, ChannelType, ChatInputCommandInteraction } = require('discord.js');
const SuggestionGuildConfiguration = require('../../models/Suggestions/SuggestionGuildConfiguration');

module.exports = {
    /**
     * 
     * @param {Object} param0 
     * @param {ChatInputCommandInteraction} param0.interaction
     */

    run: async ({interaction}) => {
        let suggestionGuildConfiguration = await SuggestionGuildConfiguration.findOne({ guildId: interaction.guildId });

        if (!suggestionGuildConfiguration) {
            suggestionGuildConfiguration = new SuggestionGuildConfiguration({ guildId: interaction.guildId })
        };

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'add') {
            const channel = interaction.options.getChannel('channel');

            if (suggestionGuildConfiguration.suggestionChannelIds.includes(channel.id)) {
                await interaction.reply(`${channel} is already a suggestions channel.`);
                return;
            }

            suggestionGuildConfiguration.suggestionChannelIds.push(channel.id);
            await suggestionGuildConfiguration.save();

            await interaction.reply(`Added ${channel} to suggestions channels.`);
            return;
        }

        if (subcommand === 'remove') {
            const channel = interaction.options.getChannel('channel');

            if (!suggestionGuildConfiguration.suggestionChannelIds.includes(channel.id)) {
                await interaction.reply(`${channel} is not a suggestion channel.`);
                return;
            };
            
            suggestionGuildConfiguration.suggestionChannelIds = suggestionGuildConfiguration.suggestionChannelIds.filter(
                (id) => id !== channel.id
            );
            await suggestionGuildConfiguration.save();

            await interaction.reply(`Removed ${channel} from suggestion channels`);
            return;
        }
    },


    options: {
        userPermissions: ['Administrator']
    },

    data: new SlashCommandBuilder()
        .setName('config-suggestions')
        .setDescription('Configure Suggestions.')
        .setDMPermission(false)
        .addSubcommand((subcommand) =>
            subcommand
                .setName('add')
                .setDescription('Add suggestion channel')
                .addChannelOption((option) => 
                    option
                        .setName('channel')
                        .setDescription('The channel you want to add.')
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('remove')
                .setDescription('Remove suggestion channel')
                .addChannelOption((option) => 
                    option
                        .setName('channel')
                        .setDescription('The channel you want to remove.')
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        )
};