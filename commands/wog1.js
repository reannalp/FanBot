module.exports = {
  name: 'wog1',
  description: '',
  execute(client, message, args) {
    message.channel.send({ files: ['./assets/ProfoundBond.png'] });
    message.delete();
  },
};
