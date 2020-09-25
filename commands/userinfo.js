const Discord = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'Information about user',
  execute(client, message, args) {
    const member = message.mentions.members.first() || message.member; const { user } = member;
    const dateJoined = new Date(member.joinedTimestamp);
    const embed = new Discord.MessageEmbed()
      .setColor(`${member.displayHexColor}`)
      .setTitle(`${member.displayName}'s Member Information`)
      .setThumbnail(member.user.avatarURL())
      .addFields(
        { name: 'Username', value: member.user.tag, inline: true },
        { name: 'Joined', value: dateJoined.toDateString(), inline: true },
        { name: 'Currently', value: member.presence.status, inline: true },
        { name: 'Roles', value: member.roles.cache.map((r) => `${r}`).join(', '), inline: false },
      )
      .setFooter(`User ID: ${member.user.id}`);
    message.channel.send({ embed });
  },
};
