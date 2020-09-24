const Discord = require('discord.js');

module.exports = {
  name: 'wog4',
  description: '',
  execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('#2f7da3')
      .setDescription('**Please read the following rules and guidelines critically and in their entirety.**\n')
      .setURL('https://wiki.profoundbond.net')
      .setAuthor('Chat Guidelines', 'https://66.media.tumblr.com/97a867a682e2849b20bb3f133cad24ff/tumblr_pan6axySOy1rlt8b4o2_250.jpg', 'https://profoundnet.fandom.com/wiki/Rules')
      .addFields(
        { name: '**Keep chat to the proper channels.**', value: 'Please refer to the [full channel guide](https://profoundnet.wikia.com/wiki/Channels) on the wiki. Each room also has room descriptions and pins which you should read. If you start to go off topic please redirect the conversation to the appropriate channel.' },
        { name: '**All art must include a source.**', value: 'If you don\'t know the source, and want to post, you may post in <#398651924649345025> and ask for help finding the source.' },
        { name: '**No spoilers outside the spoiler rooms.**', value: 'The server spoiler policy, per member poll, is that while the season is running details of each episode is considered spoilers until the next episode airs. During hiatus the finale is considered spoilers for a month after the season finishes. Currently we are considering S15 as a complete season until the final episodes air in the fall.' },
        { name: '**No explicit content outside the NSFW section.**', value: 'Despite this being an 18+ server, the main areas of the ProfoundBond are SFW. A dirty joke here and there is fine, explicit descriptions of sexual acts or NSFW images are not.' },
        { name: '**Event, fest, & challenge rules apply here.**', value: 'Please keep in mind that ProfoundBond is a *public server* with over a thousand members when seeking help with art or fics you\'re creating for outside events. If it\'s against the rules of said event to share your unrevealed artwork or writing publicly then that rule applies here. When in doubt, you should ask the mods of the event in question if you can ask for help or share WIPs here.' },
      );
    message.channel.send({ embed });
    message.delete();
  },
};
