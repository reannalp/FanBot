const Discord = require('discord.js');
const Sequelize = require('sequelize');
const { prefix } = require('../config.json');

const cooldowns = new Discord.Collection();

module.exports = (client, message) => {
  // autoresponses
  if (message.content.match('^foo$')) return message.channel.send('bar');
  if (!message.author.bot && message.content.match('^[Hh]ello$')) return message.channel.send(`Hello, ${message.author.username}`);
  //

  // blacklist
  const blacklist = ['^nigg?(er|a)$', '^(fuck|lib|re)?tard(ed)?$', '^gyp(po|sy)?$', '^tranny$', '^fag(got)?$'];
  const blacklisted = blacklist.filter((word) => message.content.toLowerCase().match(word));
  if (!message.author.bot && blacklisted.length > 0) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Message Auto-Deleted')
      .addField('Message Content', `${message.content}`)
      .addField('Member', `${message.author.tag} (${message.author.id})`, true)
      .addField('Channel', `${message.channel}`, true)
      .setTimestamp(message.createdAt);

    message.delete()
      .then(message.author.send(`The following message on ProfoundBond was auto-deleted for containing a word on the server blacklist.\n>>> ${message.content}`))
      .then((msg) => client.channels.cache.get('575799962202275844').send({ embed }))
      .catch(console.err);
  }
  //

  // command
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
  || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}`;
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }
  //

  // cooldown
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  //

  try {
    command.execute(client, message, args);
  } catch (err) {
    console.error(err);
    message.reply('there was an error trying to execute that command!');
  }
};
