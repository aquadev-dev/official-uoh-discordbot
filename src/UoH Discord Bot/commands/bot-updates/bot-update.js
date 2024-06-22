const { error } = require("console");
const { SlashCommandBuilder, ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const fs = require('fs');


module.exports = {
    // /bot-update <title> <version> (Open model for the new features/fixes)

    data: new SlashCommandBuilder()
        .setName('bot-update')
        .setDescription('Make an announcement about the recent updates of the bot.')
        .setDMPermission(false)
        .addStringOption(option =>
            option
                .setName('title')
                .setDescription('Title of the update')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('version')
                .setDescription('The version that the bot is going to update to.')
                .setRequired(true)
        ),
    
    /**
     * 
     * @param {Object} param0 
     * @param {ChatInputCommandInteraction} param0.interaction
     */
    
    run: async ({ interaction }) => {

        try {
            const updateChannel = interaction.client.channels.cache.get('1253401017668599809');

            if (interaction.channelId != updateChannel) {
                interaction.reply({content: 'Please run this command in the channel <#1253401017668599809>', ephemeral: true })
                return;
            }

            const updateTitle = interaction.options.get('title').value;
            const updateVersion = interaction.options.get('version').value;

            const modal = new ModalBuilder().setTitle('New Features/Bug Fixes?').setCustomId(`update-${interaction.user.id}`);

            const textInput = new TextInputBuilder()
                .setCustomId('update-features-bugs')
                .setLabel('New features/Bug fixes?')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setMaxLength(1024);

            const actionRow = new ActionRowBuilder().addComponents(textInput);

            modal.addComponents(actionRow);

            await interaction.showModal(modal);

            const filter = (i) => i.customId === `update-${interaction.user.id}`;

            const modalInteraction = await interaction.awaitModalSubmit({
                filter,
                time: 1000 * 60 * 3
            }).catch((error) => console.log(error));

            await modalInteraction.deferReply({ ephemeral: true });

            let updateMessage;

            try{
                updateMessage = await interaction.channel.send('Creating update, please wait...');
            } catch (error) {
                modalInteraction.editReply(
                    'Failed to create suggestion message in this channel. I may not have enough permissions.'
                );
                return;
            }


            const updateFeatures = modalInteraction.fields.getTextInputValue('update-features-bugs');

            modalInteraction.editReply('Update Message created!');

            const updateEmbed = new EmbedBuilder()
                .setTitle(`${updateTitle} for version ${updateVersion}`)
                .setColor(0x30b73)
                .addFields({name: 'Features and Bug Fixes:', value: updateFeatures})
                .setFooter({text: 'UoH Compsci Discord Server', iconURL: 'https://cdn.discordapp.com/avatars/1141762624296583210/4f0beb1f11dd0c86e17eefeeb7f58fb6.png?size=256'});
            
            updateMessage.edit({
                content: ' ',
                embeds: [updateEmbed],
            });

            fs.readFile('package.json', (error, data) => {
                if (error) throw error;

                var packageJSONobj = JSON.parse(data);

                packageJSONobj.version = updateVersion;

                packageJSONobj = JSON.stringify(packageJSONobj);

                fs.writeFile('package.json', packageJSONobj, (error) => {
                    if (error) throw error;

                    console.log('version changed in package.json!')
                });
            })

            


        } catch (error) {
            console.log(`Error in /bot-update: ${error}`)
            console.log(error)
        }
        


    },

    options: {
        devOnly: true,
    }


    
}