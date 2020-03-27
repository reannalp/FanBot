module.exports = {
  name: 'react',
  description: 'testing command, adds a reaction to message',
  args: true,
  usage: '<emojiname>',
  execute(client, message, args) {
    message.react(client.emojis.cache.find((x) => x.name === args.toString()));
  },
};
