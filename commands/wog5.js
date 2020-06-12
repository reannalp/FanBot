const Discord = require('discord.js');

module.exports = {
  name: 'wog5',
  description: '',
  execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('#2f7da3')
      .setDescription('These are the mods of ProfoundBond. They\'re here to help however they can. In most cases to get ahold of a mod you should ping <@&397971346610454528> in the relevant chatroom. You can also DM a mod if you aren\'t comfortable doing so in the main chat. However, it might take time to get a response. \n\nPlease note that mods discuss server issues as a team in order to support eachother and the community.')
      .setURL('https://profoundnet.fandom.com/wiki/Mods')
      .setAuthor('Mod Roster', 'https://66.media.tumblr.com/97a867a682e2849b20bb3f133cad24ff/tumblr_pan6axySOy1rlt8b4o2_250.jpg', 'https://profoundnet.fandom.com/wiki/Mods')
      .addFields(
        { name: '**Server Owner**', value: '<@&393904792470159368>, <@104656456103501824>' },
        { name: '**Admins**', value: '<@&397970442176167967>, <@386229714651578368>, <@400760993723973633>, <@202854953952215041>' },
        { name: '**Mods**', value: '<@&418842471708229633>, <@334701560162549771>, <@418447456301481984>, <@399014207669927936>, <@363950732048728065>, <@160477017232506880>, <@468938521776881675>, <@364420583582072832>' },
      );
    message.channel.send({ embed });
    message.delete();
  },
};
