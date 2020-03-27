const Discord = require('discord.js');

module.exports = {
  name: 'example',
  description: '',
  execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('#9cff00')
      .setDescription('Here is some text that is [a link](https://google.com).');
    message.channel.send({ embed });
  },
};
