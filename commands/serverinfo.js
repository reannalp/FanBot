const Discord = require('discord.js');

module.exports = {
  name: 'serverinfo',
  description: 'Information about server.',
  execute(client, message, args) {
    const dateCreated = new Date(message.guild.createdTimestamp);
    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name} Information`)
      .setThumbnail(message.guild.iconURL())
      .addField('Owner', message.guild.owner, true)
      .addField('Created', dateCreated.toDateString(), true)
      .addField('Nitro Boost', `Level ${message.guild.premiumTier}`, true)
      .addField('Members', `${message.guild.memberCount} (${message.guild.members.cache.filter((member) => member.user.bot).size} bots)`, true)
      .addField('Channels', `${message.guild.channels.cache.filter((chan) => chan.type === 'text').size} text, ${message.guild.channels.cache.filter((chan) => chan.type === 'voice').size} voice.`, true)
      .addField('Roles', message.guild.roles.cache.size, true);
    message.channel.send({ embed });
  },
};
