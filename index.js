const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NTY0OTkxMjg2ODUyMDU5MTM2.XnfvQg.5bUeGYpgMNFXe07xTIv5GXmFT18');