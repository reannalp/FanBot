module.exports = (client, reaction, user) => {
  if (!user.bot && reaction.message.embeds.length > 0 && reaction.message.embeds[0].title === 'Roles' && reaction.emoji.id === '403412254562713600') {
    const remRole = reaction.message.guild.roles.cache.find((cb) => cb.name === 'Artist');
    if (!remRole) return reaction.message.channel.send('That role does not exist on this server.');
    reaction.message.guild.members.cache.get(user.id).roles.remove(remRole)
      .then(reaction.message.channel.send(`Removed ${remRole.toString()} role from ${user.username}`))
      .catch(console.error);
  }
};
