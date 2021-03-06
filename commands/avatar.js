module.exports = {
  name: 'avatar',
  description: '',
  args: true,
  usage: '@mention',
  aliases: ['icon', 'pfp'],
  execute(client, message, args) {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
    }
    const avatarList = message.mentions.users.map((user) => `${user.username}'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`);
    message.channel.send(avatarList);
  },
};
