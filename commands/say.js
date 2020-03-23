module.exports = {
  name: 'say',
  description: 'Say!',
  execute(message, args) {
    // if (message.author.id !== client.config.ownerID) return;
    message.channel.send(args.join(' '));
    message.delete();
  },
};
