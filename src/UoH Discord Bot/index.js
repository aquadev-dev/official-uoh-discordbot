const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit');
const path = require('path');
const mongoose = require('mongoose');
const { execSync } = require('child_process');
require('dotenv/config'); 
 
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
 
new CommandKit({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    devGuildIds: [`${process.env.DEV_GUILD_ID}`],
    devUserIds: [`${process.env.OWNER_ID}`],
});

execSync('npm update');

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to Database.')
    client.login(process.env.TOKEN);
})
 
