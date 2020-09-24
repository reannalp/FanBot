const Discord = require('discord.js');

module.exports = {
  name: 'wog3',
  description: '',
  execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('#2f7da3')
      .setDescription('**Please read the following rules and guidelines critically and in their entirety.**\n')
      .setURL('https://wiki.profoundbond.net')
      .setAuthor('Basic Rules', 'https://66.media.tumblr.com/97a867a682e2849b20bb3f133cad24ff/tumblr_pan6axySOy1rlt8b4o2_250.jpg', 'https://profoundnet.fandom.com/wiki/Rules')
      .addFields(
        { name: '**✨The Golden Rule - Don\'t be a jerk.✨**', value: 'Read through the community\'s [Core Values](https://profoundnet.fandom.com/wiki/Core_Values). It\'s very important that you read and understand this page. It\'s short, go read it. Seriously.' },
        { name: '**This is an adult-only server.**', value: 'You must be 18 years old to participate here regardless of the age of majority in your country. If you\'re found to be under 18 you will be kicked from the server and won\'t be allowed back until your 18th birthday. Please be honest.' },
        { name: '**Show the mods respect.**', value: 'The mods are here to keep this community enjoyable for all members. If a mod asks you to move channels, cease certain behavior, etc. please do so politely. Arguing excessively with mods, backseat modding, and rule lawyering will result in a warning.' },
        { name: '**Do not block server owner, admins, or mods.**', value: 'We understand that sometimes members and mods don\'t see eye to eye. However, blocking the mods makes it so we cannot do our jobs here. If you have an issue with a mod please contact one of the admins.' },
      );
    message.channel.send({ embed });
    message.delete();
  },
};
