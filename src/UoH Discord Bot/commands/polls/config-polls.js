const { SlashCommandBuilder, ChannelType, ChatInputCommandInteraction } = require('discord.js');
const PollGuildConfiguration = require('../../models/PollGuildConfgiuration');

module.exports = {
    /**
     * 
     * @param {Object} param0
     * @param {ChatInputCommandInteraction} param0.interaction 
     */

    run: async ({interaction}) => {
        let pollGuildConfiguration = await PollGuildConfiguration.findOne({ guildId: interaction.guildId });

        if (!pollGuildConfiguration) {
            pollGuildConfiguration = new PollGuildConfiguration({ guildId: interaction.guildId })
        };

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'add') {
            const channel = interaction.options.getChannel('channel');

            if (pollGuildConfiguration.pollChannelIds.includes(channel.id)) {
                await interaction.reply(`${channel} is already a poll channel.`);
                return;
            }

            pollGuildConfiguration.pollChannelIds.push(channel.id);
            await pollGuildConfiguration.save();

            await interaction.reply(`Added ${channel} to poll channels.`);
            return;
        }

        if (subcommand === 'remove') {
            const channel = interaction.options.getChannel('channel');

            if (!pollGuildConfiguration.pollChannelIds.includes(channel.id)) {
                await interaction.reply(`${channel} is not a poll channel.`);
                return;
            };

            pollGuildConfiguration.pollChannelIds = pollGuildConfiguration.pollChannelIds.filter(
                (id) => id !== channel.id
            );
            await pollGuildConfiguration.save();

            await interaction.reply(`Removed ${channel} from poll channels`);
            return;
        }
    },

    options: {
        userPermissions: ['Administrator']
    },

    data: new SlashCommandBuilder()
        .setName('config-polls')
        .setDescription('Configure Polls.')
        .setDMPermission(false)
        .addSubcommand((subcommand) => 
            subcommand
                .setName('add')
                .setDescription('Add poll channel')
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
                .setDescription('Remove poll channel')
                .addChannelOption((option) =>
                    option
                        .setName('channel')
                        .setDescription('The channel you want to remove.')
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        )
};