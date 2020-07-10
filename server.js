const Discord = require('discord.js');
const client = new Discord.Client();
const randomnum = require("unique-random");
const rand = randomnum(1, 6);

const { MessageEmbed } = require("discord.js");
const { get } = require("snekfetch");

const prefix = ","
const token = process.env.TOKEN;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Node version: " + process.version);
  console.log("DiscordJS version: " + Discord.version);

  client.user.setPresence({ game: { name: 'pièce', type: 0 } });
});

client.on('message', message => {
  
  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  
  if (message.content === 'ping') {
    message.reply('pong!');
  }

  if (message.content.startsWith(prefix + "help")) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x1abc9c)
      .setTitle("Listes des commandes")
      .addField(",sad", "Afficher votre tristesse")
      .addField(",mytho", "Giga mytho")
      .addField(",nrv", "Afficher que vous êtes 13NRV")
      .addField(",dance", "Déhanchez-vous sur le dancefloor")
      .addField(",cat", "Envoie une image aléatoire de chat")
      .addField(",dice", "Fait rouler un dé entre 1 et 6")
      .addField(",lenny", "( ͡° ͜ʖ ͡°)")
    message.channel.send(embed);
    console.log("help");
  }

  if (message.content.startsWith(prefix + "sad")) {
    message.channel.send("rt si c trist", {files: ["https://i.pinimg.com/originals/74/65/29/7465290119e3c6e757ab77ddcb9ef5dc.gif"]});
  }

  if (message.content.startsWith(prefix + "mytho")) {
    message.channel.send("rt si c trist", {files: ["https://media.discordapp.net/attachments/731067309426343946/731067949300973608/flute.gif"]});
  }

  if (message.content.startsWith(prefix + "nrv")) {
    message.channel.send("13NRV", {files: ["https://media0.giphy.com/media/l4FGr2zM1Z3u3OC5i/source.gif"]});
  }

  if (message.content.startsWith(prefix + "dance")) {
    message.channel.send("dance comme Balkany", {files: ["https://media.discordapp.net/attachments/556815696399564802/724662886865174578/1592818682-ezgif-2-093ae4545c4f_1.gif"]});
  }

  if (message.content.startsWith(prefix + "cat")) {
    try {
      get("https://aws.random.cat/meow").then(response => {
        message.channel.send({
          files: [
            {
              attachment: response.body.file,
              name: `cat.${response.body.file.split(".")[4]}`
            }
          ]
        });
        console.log("cat");
      });
    } catch (e) {
      console.log("Erreur de $cat");
    }
  }

  if (message.content.startsWith(prefix + "dice")) {
    message.channel
      .send("Le dé roule...")
      .then(message => message.edit(`Le numéro du dé est ${rand()}`));
    console.log(`dice ${rand()}`);
  }

  if (message.content.startsWith(prefix + "lenny")) {
    message.channel.send("( ͡° ͜ʖ ͡°)");
    console.log("lenny");
  }
  
  if(message.content.startsWith(prefix + "say")) {
    if(message.member.roles.cache.some(r=>["kd"].includes(r.name))) {
      let text = args.slice(0).join(" ");
      message.delete();
      message.channel.send(text);
      console.log("say")
    }

});

module.exports.help = {
  name: "dice"
};

client.login(token);
