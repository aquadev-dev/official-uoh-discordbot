const { SlashCommandBuilder, ChannelType, ChatInputCommandInteraction } = require('discord.js');
const BotReportGuildConfiguration = require('../../models/BotReports/BotReportGuildConfiguration');

module.exports = {
    /**
     * @param {Object} param0
     * @param {ChatInputCommandInteraction} param0.interaction
     */

    run: async ({interaction}) => {
        let botReportGuildConfiguration = await BotReportGuildConfiguration.findOne({ guildId: interaction.guildId});

        if (!botReportGuildConfiguration) {
            botReportGuildConfiguration = new BotReportGuildConfiguration({ guildId: interaction.guildId});
        };

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'add') {
            const channel = interaction.options.getChannel('channel');

            if (botReportGuildConfiguration.reportChannelIds.includes(channel.id)) {
                await interaction.reply(`${channel} is already a bot report channel.`)
                return;
            }

            botReportGuildConfiguration.reportChannelIds.push(channel.id);
            await botReportGuildConfiguration.save();

            await interaction.reply(`Added ${channel} to bot reports channels.`);
            return;
        }

        if (subcommand === 'remove') {
            const channel = interaction.options.getChannel('channel');

            if (!botReportGuildConfiguration.reportChannelIds.includes(channel.id)) {
                await interaction.reply(`${channel} is not a bot report channel.`)
                return;
            };

            botReportGuildConfiguration.reportChannelIds = botReportGuildConfiguration.reportChannelIds.filter(
                (id) => id !== channel.id
            );
            await botReportGuildConfiguration.save();

            await interaction.reply(`Removed ${channel} from bot report channels`);
            return;
        }
    },

    options: {
        userPermissions: ['Administrator']
    },

    data: new SlashCommandBuilder()
        .setName('config-botreports')
        .setDescription('Configure Bot Reports.')
        .setDMPermission(false)
        .addSubcommand((subcommand) => 
            subcommand
                .setName('add')
                .setDescription('Add bot report channel')
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
                .setDescription('Remove bot report channel')
                .addChannelOption((option) =>
                    option
                        .setName('channel')
                        .setDescription('The channel you want to remove.')
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        )
};