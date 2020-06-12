const Discord = require('discord.js');

module.exports = {
  name: 'wog2',
  description: '',
  execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('#2f7da3')
      .setTitle('Welcome to ProfoundBond, the Destiel fandom\'s home on Discord')
      .setURL('https://wiki.profoundbond.net')
      .setDescription('This server was created in December 2017 to simply give fans of Destiel a place to find one another and chat. Over the last few years it has grown and evolved into a home for our members. \n\n**ProfoundBond** strives to be a place where the fandom can come together to meet new friends and chat with old ones, receive and offer support, and participate in the fandom in a way that promotes a sense of community.')
      .addField('Server Invite', 'You\'re welcome to invite people to ProfoundBond. Many of our members like to include the invite in their fics and art posts, etc.\nJust give anyone you\'d like to invite this link: https://discord.gg/profoundbond');
    message.channel.send({ embed });
    message.delete();
  },
};
