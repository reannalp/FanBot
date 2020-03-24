const Discord = require('discord.js');

module.exports = {
  name: 'serverinfo',
  description: 'Information about server.',
  execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`${message.guild.name} Information`)
      .setThumbnail(message.guild.iconURL())
      .setFooter(message.guild.owner.user.tag, message.guild.owner.user.avatarURL())
      .addField('Members', `${message.guild.memberCount} members (${message.guild.members.cache.filter((member) => member.user.bot).size} bots)`)
      .addField('Channels', `${message.guild.channels.cache.filter((chan) => chan.type === 'text').size} text and ${message.guild.channels.cache.filter((chan) => chan.type === 'voice').size} voice.`)
      .addField('Roles', message.guild.roles.cache.map((role) => role.name).join(', '));
    message.channel.send({ embed });
  },
};
