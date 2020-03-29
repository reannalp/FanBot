module.exports = (client, reaction, user) => {
  if (!user.bot && reaction.message.embeds[0].title === 'Roles' && reaction.emoji.id === '403412254562713600') {
    const addRole = reaction.message.guild.roles.cache.find((cb) => cb.name === 'Artist');
    reaction.message.guild.members.cache.get(user.id).roles.add(addRole)
      .then(reaction.message.channel.send(`Added ${addRole.toString()} role to ${user.username}`))
      .catch((err) => console.error(err));
  }
};
