const Discord = require('discord.js');
const client = new Discord.Client();
const randomnum = require("unique-random");
const rand = randomnum(1, 6);


const { MessageEmbed } = require("discord.js");
const { get } = require("snekfetch");

const prefix = ","
const token = process.env.TOKEN;

client.on('ready', () => {

  client.user.setActivity("@kodle#1857", { type: "WATCHING"})

  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Node version: " + process.version);
  console.log("DiscordJS version: " + Discord.version);

});

client.on('message', message => {

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  // var guildid = client.guilds.get("556815695120433152");
  let member = message.mentions.members.first();

  var csgo = member.guild.roles.cache.find(role => role.name === "Counter-Strike");
  var mc = member.guild.roles.cache.find(role => role.name === "Minecraft");
  var terraria = member.guild.roles.cache.find(role => role.name === "Terraria");
  var valo = member.guild.roles.cache.find(role => role.name === "VALORANT");
  var wow = member.guild.roles.cache.find(role => role.name === "World of Warcraft");
  var dtd = member.guild.roles.cache.find(role => role.name === "7 Days To Die");

  // -- Commande de test --

  if (message.content === 'ping') {
    message.reply('pong!');
  }

  // -- Help --

  if (message.content.startsWith(prefix + "help")) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x1abc9c)
      .setTitle("Listes des commandes")
      .addField(",roles", "Afficher les rôles")
      .addField(",sad", "Afficher votre tristesse")
      .addField(",nrv", "Afficher que vous êtes 13NRV")
      .addField(",dance", "Déhanchez-vous sur le dancefloor")
      .addField(",cat", "Envoie une image aléatoire de chat")
      .addField(",dice", "Fait rouler un dé entre 1 et 6")
      .addField(",lenny", "( ͡° ͜ʖ ͡°)")
    message.channel.send(embed);
    console.log("help");
  }

  if (message.content.startsWith(prefix + "roles")) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x1abc9c)
      .setTitle("Listes des rôles")
      .addField(",csgo", "Counter-Strike")
      .addField(",mc", "Minecraft")
      .addField(",terraria", "Terraria")
      .addField(",valo", "VALORANT")
      .addField(",wow", "World of Warcraft")
      .addField(",7dtd", "7 Days To Die")
    message.channel.send(embed);
    console.log("roles");
  }

  // -- Commande de rôles --

  /* if (message.content.startsWith(prefix + "csgo")) {
    member.addRole(csgo).catch(console.error);
    message.channel.send("Le rôle a été ajouté.")
  } */

  // -- GIF --

  if (message.content.startsWith(prefix + "sad")) {
    message.channel.send("rt si c trist", {files: ["https://i.pinimg.com/originals/74/65/29/7465290119e3c6e757ab77ddcb9ef5dc.gif"]});
  }

  if (message.content.startsWith(prefix + "nrv")) {
    message.channel.send("13NRV", {files: ["https://media0.giphy.com/media/l4FGr2zM1Z3u3OC5i/source.gif"]});
  }

  if (message.content.startsWith(prefix + "dance")) {
    message.channel.send("dance comme Balkany", {files: ["https://media.discordapp.net/attachments/556815696399564802/724662886865174578/1592818682-ezgif-2-093ae4545c4f_1.gif"]});
  }

  // -- Autres commandes --

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
