const Discord = require('discord.js');

module.exports = (client, reaction, user) => {
  const embed = new Discord.MessageEmbed()
    .setColor('#9cff00')
    .setDescription(`${user.username} reacted to [message](${reaction.message.url}) with ${reaction.emoji}`);
  client.channels.cache.get('506280692775256090').send({ embed });
};
