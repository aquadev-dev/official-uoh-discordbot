const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit');
const path = require('path');
const mongoose = require('mongoose')
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
    devGuildIds: ['879384420807737405'],
    devUserIds: ['422043862509551627'],
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to Database.')
    client.login(process.env.TOKEN);
})
 
