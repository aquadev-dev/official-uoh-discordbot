const { Client, ChatInputCommandInteraction, ChannelType, EmbedBuilder, ThreadChannel } = require("discord.js");


/**
 * 
 * @param {ThreadChannel} thread 
 * @param {Client} client 
 */




module.exports = async (thread, client) => {  

    reportForumId = '1252290701182632016';
     
    if (thread.parentId != reportForumId) {
        return;
    } else {
        const embed = new EmbedBuilder()
        .setTitle("Thank you for creating a bot report!")
        .setDescription(
            "Please allow an admin or the bot developer to respond/read through your post and answer it!" 
            + "\n Once the problem has been fixed an admin will close the thread"
        );

    
        await thread.send({content: ' ', embeds: [embed]});
    }


    
    
}