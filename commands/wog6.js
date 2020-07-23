const Discord = require('discord.js');

module.exports = {
  name: 'wog6',
  description: '',
  execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('#2f7da3')
      .setDescription('In order to gain server access you will need to agree to the rules and then introduce yourself and request any roles you\'d like in <#387340348726312961>.')
      .setURL('https://profoundnet.fandom.com/wiki/Roles')
      .setAuthor('Roles and Introductions', 'https://66.media.tumblr.com/97a867a682e2849b20bb3f133cad24ff/tumblr_pan6axySOy1rlt8b4o2_250.jpg', 'https://profoundnet.fandom.com/wiki/Roles')
      .addFields(
        { name: '**Your introduction doesn\'t have to be a big fancy one (unless you want it to be).**', value: 'For example, Crypto\'s intro would be something like this: \n> Hi there, I\'m Reanna/Cryptomoon, but most people just call me Crypto. I am in PST and use she/her pronouns. I would like Artist, Salty, and Kinky please!' },
        { name: '**Basic Roles**', value: 'These are the basic roles available to you. You can find the full list of roles and their purpose on the [wiki](https://profoundnet.fandom.com/wiki/Roles). We recommend that you start with a just a few basic roles and add additional roles later when you\'ve settled into the server a bit.' },
        { name: '**Creator Roles**', value: '<@&387344772114939904>\n<@&387344715588173824>\n<@&522626815420923904>', inline: true },
        { name: '**Section Roles**', value: '<@&387345102722564107>\n<@&387344950897147906>\n<@&387345183982878731>\n<@&387345238236069889>', inline: true },
        { name: '**Notification Roles**', value: '<@&387344863689179138>\n<@&413161569774600202>\n<@&522626942038573067>', inline: true },
        { name: '**Informational Roles**', value: '**Pronouns:** <@&387345249506426890>, <@&387345779729104897>, <@&387345820305063945>, <@&724445800662302780>, etc.\n**Timezones:** <@&419399621442273280>, <@&419399684600102930>, <@&419399739092762633>, <@&426882602729865216>, <@&419399949772521488>, etc.\nVisit the [wiki](https://profoundnet.fandom.com/wiki/Roles) for the full list. Please let a mod know if your pronouns or timezone aren\'t available.' },
      );
    message.channel.send({ embed });
    message.delete();
  },
};
