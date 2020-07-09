const Discord = require("discord.js");
const newUsers = new Discord.Collection();
const client = new Discord.Client();
const fs = require("fs");
const { get } = require("snekfetch");
const ms = require("ms");
const randomnum = require("unique-random");
const rand = randomnum(1, 6);
const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");
const token = process.env.TOKEN;

const prefix = ",";

client.on("ready", () => {
  client.user.setPresence({ game: { name: 'aaaaaaaaaaa', type: 0 } });


  console.log(`===========================`);
  console.log(`Connecté en tant que ${client.user.tag}`);
  console.log("Votre token: " + token);
  console.log("");
  console.log("Version de Node: " + process.version);
  console.log("Version de DiscordJS: " + Discord.version);
  console.log(`===========================`);
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  var snekfetch = require("snekfetch");

  // -------- COMMANDES -------

  if (message.content.startsWith(prefix + "help")) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x1abc9c)
      .setTitle("Listes des commandes")
      .addField(",cat", "Envoie une image aléatoire de chat")
      .addField(",dice", "Fait rouler un dé et donne un nombre entre 1 et 6")
      .addField(",lenny", "( ͡° ͜ʖ ͡°)")
    message.channel.send(embed);
    console.log(log + "help");
  }

  if (message.content.startsWith(prefix + "lenny")) {
    message.channel.send("( ͡° ͜ʖ ͡°)");
    console.log(log + "( ͡° ͜ʖ ͡°)");
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
        console.log(log + "cat");
      });
    } catch (e) {
      console.log("Erreur de $cat");
    }
  }

  if (message.content.startsWith(prefix + "dice")) {
    message.channel
      .send("Le dé roule...")
      .then(message => message.edit(`Le numéro du dé est ${rand()}`));
    console.log(log + `dice ${rand()}`);
  }

module.exports.help = {
  name: "dice"
};

client.login(token);
