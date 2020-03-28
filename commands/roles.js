const Discord = require('discord.js');

// respond to command to create an embed with role information
module.exports = {
  name: 'roles',
  description: '',
  async execute(client, message, args) {
  //    create embed
    const embed = new Discord.MessageEmbed()
      .setDescription('Lorem ipsum');
    //    send embed
    const sent = await message.channel.send({ embed });
    const { id } = sent;
    //    log message id
    console.log(id);
    // react to created message with emoji representing each assignable role
    sent.react('👍').then(() => sent.react('👎'));
  },
};

// listen for reactions on message by emoji
// when reacted to with specified emoji, toggle associated role on member who reacted
// respond with confirmation of add/remove
