const { ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const BotReportGuildConfiguration = require('../../models/BotReports/BotReportGuildConfiguration');
const BotReport = require('../../models/BotReports/BotReport');
const Suggestion = require('../../models/Suggestions/Suggestion');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-report')
        .setDescription('Create a bug report about the bot')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('title')
                .setDescription('The title of your bug report.')
                .setRequired(true)
        ),   

    /**
     * 
     * @param {Object} param0
     * @param {ChatInputCommandInteraction} param0.interaction
     */

    run: async ({ interaction }) => {
        try {
            const guildConfiguration = await BotReportGuildConfiguration.findOne({ guildId: interaction.guildId });

            if (!guildConfiguration?.reportChannelIds.length) {
                await interaction.reply(
                    'This server has not been configured to use bot reports yet.\n Ask an admin to run `/config-botreports add` to set this up.'

                );
                return;
            }

            if (!guildConfiguration.reportChannelIds.includes(interaction.channelId)) {
                await interaction.reply(
                    `This channel is not configured to use suggestions. Try one of these channels instead: ${guildConfiguration.
                        reportChannelIds
                        .map((id) => `<#${id}>`)
                        .join(', ')}`
                );

                return;
            }
            
            const modal = new ModalBuilder().setTitle('Create a bot report').setCustomId(`botreport-${interaction.user.id}`);

            const textInput = new TextInputBuilder()
                .setCustomId('botreport-input')
                .setLabel('Please describe the issue you have been having with the bot.')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setMaxLength(1000);
            
            const actionRow = new ActionRowBuilder().addComponents(textInput);

            modal.addComponents(actionRow);

            await interaction.showModal(modal);

            const filter = (i) => i.customId === `botreport-${interaction.user.id}`;

            const modalInteraction = await interaction.awaitModalSubmit({
                filter,
                time: 1000 * 60 * 3
            }).catch((error) => console.log(error));

            await modalInteraction.deferReply({ ephemeral: true });

            let botReportMessage;

            try{
                botReportMessage = await interaction.channel.send('Creating bot report, please wait...');

            } catch (error) {
                modalInteraction.editReply(
                    'Failed to create suggestion message in this channel. I may not have enough permissions.'
                );
                return;
            }

            const botReoportText = modalInteraction.fields.getTextInputValue('suggestion-input');

            const newBotReport = new BotReport({
                authorId: interaction.user.id,
                guildId: interaction.guildId,
                messageId: botReportMessage.id,
                title: interaction.options.getString('title'),
                content: botReoportText,            
            })

            await newBotReport.save();

            modalInteraction.editReply('Bot report created!');

            // Bot Report Embed
            const botReportEmbed = new EmbedBuilder()
                .setTitle(interaction.options.getString('title'))
                .setAuthor({
                    name: interaction.user.username,
                    iconURL: interaction.user.displayAvatarURL({ size: 256 }),
                })
                .addFields([
                    { name: 'Bot Report', value: botReoportText },
                    { name: 'Status', value: '⏳ Awaiting Admin'},
                ])
                .setColor('DarkBlue');
            
            //Buttons
            const lookedAtButton = new ButtonBuilder()
                .setEmoji('👀')
                .setLabel('Looked At')
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`botreport.${newBotReport.reportId}.looked-at`);

            const findingASolutionButton = new ButtonBuilder()
                .setEmoji('🤔')
                .setLabel('Finding a Solution')
                .setStyle(ButtonStyle.Secondary)
                .setCustomId(`botreport.${newBotReport.reportId}.finding-solution`);
            
            const beingFixedButton = new ButtonBuilder()
                .setEmoji('🛠️')
                .setLabel('Being Fixed')
                .setStyle(ButtonStyle.Secondary)
                .setCustomId(`botreport.${newBotReport.reportId}.looked-at`);
            
            const fixedButton = new ButtonBuilder()
                .setEmoji('✅')
                .setLabel('Fixed')
                .setStyle(ButtonStyle.Success)
                .setCustomId(`botreport.${newBotReport.reportId}.looked-at`)
            
            const firstRow = new ActionRowBuilder.addComponents(lookedAtButton, findingASolutionButton);
            const secondRow = new ActionRowBuilder.addComponents(beingFixedButton, fixedButton);

            botReportMessage.edit({
                content: `${interaction.user} Bot Report created!`,
                embeds: [botReportEmbed],
                components: [firstRow, secondRow],
            })


        } catch (error) {
            console.log(`Error in /bot-report: ${error}`);
        }
        
    },
}