const Discord = require('discord.js');

module.exports = {
  name: 'wog7',
  description: '',
  execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('#2f7da3')
      .setTitle('If you just got here please scroll to the very beginning of this channel and review all the information here carefully.')
      .setURL('https://discordapp.com/channels/387340156534915092/387340283760607233/721138893180764251')
      .setDescription('Please react below if you have critically read and agree to abide by the [core values](https://profoundnet.fandom.com/wiki/Core_Values) and [rules](https://profoundnet.fandom.com/wiki/Rules) of ProfoundBond and are at least eighteen years of age.');
    message.channel.send({ embed });
    message.delete();
  },
};
