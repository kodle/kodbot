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
  if (message.content === 'ping') {
    message.reply('pong!');
  }

  if (message.content.startsWith(prefix + "help")) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x1abc9c)
      .setTitle("Listes des commandes")
      .addField(",cat", "Envoie une image aléatoire de chat")
      .addField(",dice", "Fait rouler un dé entre 1 et 6")
      .addField(",lenny", "( ͡° ͜ʖ ͡°)")
    message.channel.send(embed);
    console.log("help");
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

});

module.exports.help = {
  name: "dice"
};

client.login(token);
