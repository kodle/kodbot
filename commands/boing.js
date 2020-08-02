const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  if (message.content === 'boing') {
    message.channel.send("", {files: ["https://cdn.discordapp.com/attachments/589895016231600158/733621543212548170/416640644937678848.gif"]});
  }

}
module.exports.help = {
name:"boing"
}
