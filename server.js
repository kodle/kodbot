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
const moment = require("moment");
moment.locale();
const time = moment().format("Do MMMM YYYY, h:mm:ss");
const token = process.env.TOKEN;

let points = JSON.parse(fs.readFileSync("./points.json", "utf-8"));
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

  var member = message.mentions.members.first();
  const log = "[" + time + "] Commande executé par " + message.author + ": ";
  var snekfetch = require("snekfetch");

  // -------- COMMANDES -------

  if (message.content.startsWith(prefix + "rules")) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x1abc9c)
      .setTitle("Bienvenue !")
      .addField(
        "Les règles",
        "Pas de provocations, d'insultes, de violences verbales et toutes autres réactions inutiles.\nPas de flood ni de flame, réglez vos problèmes en privé.\nPas de propos ou images pornographiques, racistes, xénophobes, subversifs, obscènes, homophobe etc...\nPas de liens illégaux dans les discussions, par message ou autre.\nCe discord n'est pas un panneau de pub, donc interdiction de puber son propre Discord personnel ici.\n Tout pseudo, tag ou propos à caractère diffamatoire, antisémite, homophobe, agressif ou injurieux est interdit.\nRespectez-vous les uns les autres et restez courtois, vous êtes tous ici avec un point commun alors pas besoin de faire la bagarre."
      );
    message.channel.send(embed);
    console.log(log + "rules");
  }

  if (message.content.startsWith(prefix + "help")) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x1abc9c)
      .setTitle("Listes des commandes")
      .addField(",rules", "Envoie les règles")
      .addField(",info", "Envoie quelques infos sur le bot")
      .addField(",level", "Envoie votre niveau et vos points")
      .addField(",cat", "Envoie une image aléatoire de chat")
      .addField(",dice", "Fait rouler un dé et donne un nombre entre 1 et 6")
      .addField(",lenny", "( ͡° ͜ʖ ͡°)")
    message.channel.send(embed);
    console.log(log + "help");
  }

  if (message.content.startsWith(prefix + "info")) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x1abc9c)
      .setTitle("À propos")
      .addField("Dev", "@kodle#1857")
      .addField("GitHub", "https://github.com/kodle/kodbot");
    message.channel.send(embed);
    console.log(log + "info");
  }

  if (message.content.startsWith(prefix + "lenny")) {
    message.channel.send("( ͡° ͜ʖ ͡°)");
    console.log(log + "( ͡° ͜ʖ ͡°)");
  }

  if (message.content.startsWith(prefix + "avatar")) {
    if (!message.mentions.users.size) {
      return message.reply(`${message.author.displayAvatarURL}`);
    }
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

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      level: 0
    };
  let userData = points[message.author.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(`Tu passes au level **${curLevel}**!`);
  }

  if (message.content.startsWith(prefix + "level")) {
    message.reply(
      `Tu es level ${userData.level}, avec ${userData.points} points.`
    );
  }
  fs.writeFile("./points.json", JSON.stringify(points), err => {
    if (err) console.error(err);
  });
});

client.on("guildMemberAdd", member => {
  member.guild.channels
    .get("329322280201224203")
    .send("Bienvenue sur la Compagnie !");
});

client.on("guildMemberRemove", member => {
  if (newUsers.has(member.id)) newUsers.delete(member.id);
});

module.exports.help = {
  name: "dice"
};

client.login(token);
