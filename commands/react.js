module.exports = {
  name: 'react',
  description: 'testing command, adds a reaction to message',
  execute(client, message, args) {
    message.react(client.emojis.cache.find((x) => x.name === 'sanime'));
  },
};
