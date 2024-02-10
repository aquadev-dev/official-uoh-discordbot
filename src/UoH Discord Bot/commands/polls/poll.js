const { SlashCommandBuilder, ChatInputCommandInteraction, ButtonStyle } = require('discord.js');
const PollGuildConfiguration = require('../../models/PollGuildConfgiuration');
const Poll = require('../../models/Poll');
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');
const formatPolls = require('../../utils/formatPolls');

module.exports = {

    /**
     * 
     * @param {Object} param0
     * @param {ChatInputCommandInteraction} param0.interaction 
     */

    run: async ({ interaction }) => {
        try {
            const pollGuildConfiguration = await PollGuildConfiguration.findOne({ guildId: interaction.guildId });

            if (!pollGuildConfiguration?.pollChannelIds.length) {
                await interaction.reply(
                    'This server has not been configured to use suggestions yet.\nAsk an admin to run `/config-suggestions add` to set this up.'
                );
                return;
            }

            if (!pollGuildConfiguration.pollChannelIds.includes(interaction.channelId)) {
                await interaction.reply(
                    `This channel is not configured to use suggestions. Try one of these channels instead: ${pollGuildConfiguration.
                        pollChannelIds
                        .map((id) => `<#${id}>`)
                        .join(', ')}`
                );

                return;
            }

            let pollMessage;

            await interaction.deferReply({ ephemeral: true })

            pollMessage = await interaction.channel.send('Creating Poll, please wait...')

            const newPoll = new Poll({
                authorId: interaction.user.id,
                guildId: interaction.guildId,
                messageId: pollMessage.id,
                title: interaction.options.getString('title'),
                option1Name: interaction.options.getString('option1'),
                option2Name: interaction.options.getString('option2'),
            })

            await newPoll.save();

            interaction.editReply('Poll Created!')

            

            const pollEmbed = new EmbedBuilder()
                .setAuthor({
                    name: interaction.user.username,
                    iconURL: interaction.user.displayAvatarURL({ size: 256 }),
                })
                .setTitle(interaction.options.getString('title'))
                .addFields([
                    { name: ' ', value: `1️⃣ ${interaction.options.getString('option1')}`},
                    { name: ' ', value: `${formatPolls(0, 0, 0)}`},
                    { name: ' ', value: `2️⃣ ${interaction.options.getString('option2')}`},
                    { name: ' ', value: `${formatPolls(0, 0, 1)}`}
                
                ])
                .setColor(0xfaf44b);
            
            const option1Button = new ButtonBuilder()
                .setLabel('Option 1️⃣')
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`poll.${newPoll.pollId}.option1`)
            
            const option2Button = new ButtonBuilder()
                .setLabel('Option 2️⃣')
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`poll.${newPoll.pollId}.option2`)
            
            const resultsButton = new ButtonBuilder()
                .setLabel('Results')
                .setStyle(ButtonStyle.Success)
                .setCustomId(`poll.${newPoll.pollId}.results`)
            
            const row = new ActionRowBuilder().addComponents(option1Button, option2Button, resultsButton);

            pollMessage.edit({
                content: `${interaction.user} Poll Created!`,
                embeds: [pollEmbed],
                components: [row],
            })

            
            
            

        } catch (error) {
            console.log(`Error in /poll: ${console.error(error)}`)
        }
    },

    data: new SlashCommandBuilder()
        .setName('poll-create')
        .setDescription('Create a Poll.')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('title')
                .setDescription('The title of the poll.')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('option1')
                .setDescription('The first option to vote for.')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('option2')
                .setDescription('The second option to vote for.')
                .setRequired(true)
        )
    
    
}