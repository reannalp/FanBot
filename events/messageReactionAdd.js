module.exports = (client, reaction, user) => {
  if (!user.bot && reaction.message.embeds.length > 0 && reaction.message.embeds[0].title === 'Roles' && reaction.emoji.id === '403412254562713600') {
    const addRole = reaction.message.guild.roles.cache.find((cb) => cb.name === 'Artist');
    if (!addRole) return reaction.message.channel.send('That role does not exist on this server.');
    reaction.message.guild.members.cache.get(user.id).roles.add(addRole)
      .then(reaction.message.channel.send(`Added ${addRole.toString()} role to ${user.username}`))
      .catch(console.error);
  }
};
