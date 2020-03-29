const Discord = require('discord.js');

module.exports = {
  name: 'roles',
  description: '',
  async execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Roles')
      .setDescription('Lorem ipsum');
    const sent = await message.channel.send({ embed });
    sent.react('403412254562713600')
      .then(() => sent.react('587840927863799841'))
      .then(() => sent.react('620481819321565184'));
  },
};
