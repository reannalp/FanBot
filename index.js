const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith('.js'));
    const evt = require(`./events/${file}`);
    const evtName = file.split('.')[0];
    try {
      client.on(evtName, evt.bind(null, client));
    } catch (error) {
      console.error(error);
    }
  });
});

client.login(token);
