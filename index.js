const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (message.author.bot) return;
  const args = message.content.split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === 'ping') {
    message.channel.send('...').then((msg) => {
      const latency = msg.createdTimestamp / 1000 - message.createdTimestamp / 1000;
      msg.edit(`Latency: ${latency.toFixed(3)} seconds\nAPI Latency: ${Math.round(client.ws.ping) / 1000} seconds`);
    });
  }
  if (command === 'say') {
    message.channel.send(args.join(' '));
    message.delete();
  }
});

client.login(config.token);
