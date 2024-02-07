const { Interaction } = require('discord.js');
const Poll = require('../../models/Poll');
const formatPolls = require('../../utils/formatPolls');

/**
 * 
 * @param {Interaction} interaction 
 */

module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId) return;

    try {
        const [type, pollId, action] = interaction.customId.split('.');

        if (!type || !pollId || !action) return;
        if (type !== 'poll') return;

        await interaction.deferReply( {ephemeral: true} );

        const targetPoll = await Poll.findOne({ pollId });
        const targetMessage = await interaction.channel.messages.fetch(targetPoll.messageId);
        const targetMessageEmbed = targetMessage.embeds[0];

        if (action === 'results') {
            if (!interaction.member.permissions.has('Administrator')) {
                await interaction.editReply('You do not have permission to show the results of a poll.')
                return;
            }

            targetMessageEmbed.data.color = 0x05f509;

            

            if (targetPoll.option1Votes.length > targetPoll.option2Votes.length) {
                targetMessageEmbed.data.title = `🥇 ${targetPoll.option1Name} wins!`
            } else if (targetPoll.option2Votes.length > targetPoll.option1Votes.length) {
                targetMessageEmbed.data.title = `🥇 ${targetPoll.option2Name} wins!`
            } else if (targetPoll.option1Votes.length === targetPoll.option2Votes.length) {
                targetMessageEmbed.data.title = `✏️ Its a draw between ${targetPoll.option1Name} and ${targetPoll.option2Name}!`
            } else {
                return;
            }

            interaction.editReply('Poll results released!');

            targetMessage.edit({
                embeds: [targetMessageEmbed],
                components: [],
            })
        }

        if (action === 'option1') {
            const hasVoted = targetPoll.option1Votes.includes(interaction.user.id) || targetPoll.option2Votes.includes(interaction.user.id);
            
            if (hasVoted) {
                await interaction.editReply('You have already casted your vote on this poll.');
                return;
            }

            targetPoll.option1Votes.push(interaction.user.id);

            await targetPoll.save();
            
            interaction.editReply('Voted for Option 1️⃣!');

            targetMessageEmbed.fields[1].value = formatPolls(
                targetPoll.option1Votes,
                targetPoll.option2Votes,
                0
            );

            targetMessageEmbed.fields[3].value = formatPolls(
                targetPoll.option1Votes,
                targetPoll.option2Votes,
                1
            )


            targetMessage.edit({
                embeds: [targetMessageEmbed],

            });
        }
        
        if (action === 'option2') {
            const hasVoted = targetPoll.option1Votes.includes(interaction.user.id) || targetPoll.option2Votes.includes(interaction.user.id);
            
            if (hasVoted) {
                await interaction.editReply('You have already casted your vote on this poll.');
                return;
            }

            targetPoll.option2Votes.push(interaction.user.id);

            await targetPoll.save();
            
            interaction.editReply('Voted for Option 2️⃣!');

            targetMessageEmbed.fields[1].value = formatPolls(
                targetPoll.option1Votes,
                targetPoll.option2Votes,
                0
            );

            targetMessageEmbed.fields[3].value = formatPolls(
                targetPoll.option1Votes,
                targetPoll.option2Votes,
                1
            )


            targetMessage.edit({
                embeds: [targetMessageEmbed],

            });
        } 
    } catch (error) {
        console.log(`Error in handleSuggestions.js ${error}`);
    }
}