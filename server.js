const Discord = require('discord.js');
const client = new Discord.Client();
const randomnum = require("unique-random");
const rand = randomnum(1, 6);


const { MessageEmbed } = require("discord.js");
const { get } = require("snekfetch");

const prefix = "/";
const delprefix = prefix + "del";

const token = process.env.TOKEN;
// var giphy = require('giphy-api')(process.env.GIPHY);

client.on('guildMemberAdd', member => {
  member.guild.channels.cache.get('589895016231600158').send(member.user.username + ", bienvenue sur la Compagnie !");
  member.roles.add(member.guild.roles.cache.find(r => r.name === "Membre"));
  console.log("nouveau membre");
});

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get('589895016231600158').send(member.user.username + ', a quitté la Compagnie :(');
});

client.on('ready', () => {

  client.user.setActivity("Flight simulator 2020", { type: "PLAYING"})

  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Node version: " + process.version);
  console.log("DiscordJS version: " + Discord.version);

});

client.on('message', message => {

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  const guildMember = message.member;
  //const fedora = client.emojis.cache.get("731065867802116169");

  const csgo = message.guild.roles.cache.find(r => r.name === "Counter-Strike");
  const mc = message.guild.roles.cache.find(r => r.name === "Minecraft");
  const tts = message.guild.roles.cache.find(r => r.name === "Tabletop Simulator");
  const terraria = message.guild.roles.cache.find(r => r.name === "Terraria");
  const valo = message.guild.roles.cache.find(r => r.name === "VALORANT");
  const wow = message.guild.roles.cache.find(r => r.name === "World of Warcraft");
  const dtd = message.guild.roles.cache.find(r => r.name === "7 Days To Die");

  // -- Commande de test --

  if (message.content === 'ping') {
    message.reply('pong!');
  }

  // -- Help --

  if (message.content.startsWith(prefix + "help")) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x1abc9c)
      .setTitle("Listes des commandes")
      .addField("roles", "Afficher les rôles")
      .addField("sad", "Afficher votre tristesse")
      .addField("nrv", "Afficher que vous êtes 13NRV")
      .addField("dance", "Déhanchez-vous sur le dancefloor")
      //.addField("bonjour", "Envoie un gif aléatoire de Bonjour")
      .addField("cat", "Envoie une image aléatoire de chat")
      .addField("dice", "Fait rouler un dé entre 1 et 6")
      .addField("lenny", "( ͡° ͜ʖ ͡°)")
      .addField("spotify", "Les playlists de kodle")
    message.channel.send(embed);
    console.log("help");
  }

  if (message.content.startsWith(prefix + "roles")) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x1abc9c)
      .setTitle("Listes des rôles")
      .addField("csgo", "Counter-Strike")
      .addField("mc", "Minecraft")
      .addField("tts", "Tabletop Simulator")
      .addField("terraria", "Terraria")
      .addField("valo", "VALORANT")
      .addField("wow", "World of Warcraft")
      .addField("7dtd", "7 Days To Die")
      .addField("del(role)", "Supprimer le rôle")
    message.channel.send(embed);
    console.log("roles");
  }

  if (message.content.startsWith(prefix + "majordome")) {
    message.channel.send("Ça c'est moi, je ne suis qu'un simple majordome. \nFaites /help pour afficher les autres commandes.")
  }

  // -- Commande pour ajouter un rôle --

  if (message.content.startsWith(prefix + "csgo")) {
    if (message.member.roles.cache.has('650815370256449536')) {
       message.reply("tu as déjà ce rôle.")
  } else {
    guildMember.roles.add(csgo);
    message.reply("le rôle a été ajouté.")
    }
  }

  if (message.content.startsWith(prefix + "mc")) {
    if (message.member.roles.cache.has('615833963885494291')) {
       message.reply("tu as déjà ce rôle.")
  } else {
    guildMember.roles.add(mc);
    message.reply("le rôle a été ajouté.")
    }
  }

  if (message.content.startsWith(prefix + "tts")) {
    if (message.member.roles.cache.has('732205263641247844')) {
       message.reply("tu as déjà ce rôle.")
  } else {
    guildMember.roles.add(tts);
    message.reply("le rôle a été ajouté.")
    }
  }

  if (message.content.startsWith(prefix + "terraria")) {
    if (message.member.roles.cache.has('618367727404449792')) {
       message.reply("tu as déjà ce rôle.")
  } else {
    guildMember.roles.add(terraria);
    message.reply("le rôle a été ajouté.")
    }
  }

  if (message.content.startsWith(prefix + "valo")) {
    if (message.member.roles.cache.has('712606554934739015')) {
       message.reply("tu as déjà ce rôle.")
  } else {
    guildMember.roles.add(valo);
    message.reply("le rôle a été ajouté.")
    }
  }

  if (message.content.startsWith(prefix + "wow")) {
    if (message.member.roles.cache.has('705358835413680239')) {
       message.reply("tu as déjà ce rôle.")
  } else {
    guildMember.roles.add(wow);
    message.reply("le rôle a été ajouté.")
    }
  }

  if (message.content.startsWith(prefix + "7dtd")) {
    if (message.member.roles.cache.has('727984505834569751')) {
       message.reply("tu as déjà ce rôle.")
  } else {
    guildMember.roles.add(dtd);
    message.reply("le rôle a été ajouté.")
    }
  }

  // -- Commande pour supprimer un rôle --

  if (message.content.startsWith(delprefix + "csgo")) {
    guildMember.roles.remove(csgo);
    message.reply("le rôle a été supprimé.")
  } /* else {
    if (message.member.roles.cache.has('650815370256449536')) {
       message.reply("tu n'as pas ce rôle.")
    }
  } */

  if (message.content.startsWith(delprefix + "mc")) {
    guildMember.roles.remove(mc);
    message.reply("le rôle a été supprimé.")
  } /* else {
    if (message.member.roles.cache.has('615833963885494291')) {
       message.reply("tu n'as pas ce rôle.")
    }
  } */

  if (message.content.startsWith(delprefix + "tts")) {
    guildMember.roles.remove(dtd);
    message.reply("le rôle a été supprimé.")
  }


  if (message.content.startsWith(delprefix + "terraria")) {
    guildMember.roles.remove(terraria);
    message.reply("le rôle a été supprimé.")
  } /* else {
    if (message.member.roles.cache.has('618367727404449792')) {
       message.reply("tu n'as pas ce rôle.")
    }
  } */

  if (message.content.startsWith(delprefix + "valo")) {
    guildMember.roles.remove(valo);
    message.reply("le rôle a été supprimé.")
  } /* else {
    if (message.member.roles.cache.has('712606554934739015')) {
       message.reply("tu n'as pas ce rôle.")
    }
  } */

  if (message.content.startsWith(delprefix + "wow")) {
    guildMember.roles.remove(wow);
    message.reply("le rôle a été supprimé.")
  } /* else {
    if (message.member.roles.cache.has('705358835413680239')) {
       message.reply("tu n'as pas ce rôle.")
    }
  } */

  if (message.content.startsWith(delprefix + "7dtd")) {
    guildMember.roles.remove(dtd);
    message.reply("le rôle a été supprimé.")
  } /* else {
    if (message.member.roles.cache.has('727984505834569751')) {
       message.reply("tu n'as pas ce rôle.")
    }
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

  /*if (message.content.startsWith(prefix + "bonjour")) {
    giphy.search("bonjour", { q: "fail" })
      .then(response => {
        var totalResponses = response.data.length;
        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
        var responseFinal = response.data[responseIndex]

        message.channel.send({
          files: [responseFinal.images.fixed_height.url]
        })
    });
  }*/

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

  if (message.content.startsWith(prefix + "spotify")) {
    message.channel.send("https://open.spotify.com/user/1hg3mjywldar5fd24m5lii7el?si=cFkYjDXaQ7aE5bww8aw6GA")
    console.log("spotify")
  }

});

module.exports.help = {
  name: "dice"
};

client.login(token);
