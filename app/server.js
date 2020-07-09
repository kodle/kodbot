const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NzMwODI2ODU2NDEyMjE3Mzc2.Xwdueg.MdHR0EsIIQiGOHZJOi-d6uqMjG0');
