module.exports = {
  name: 'ping',
  description: 'Ping!',
  cooldown: 10,
  execute(client, message, args) {
    message.channel.send('...').then((msg) => {
      const days = Math.floor(client.uptime / 86400000);
      const hours = Math.floor(client.uptime / 3600000) % 24;
      const minutes = Math.floor(client.uptime / 60000) % 60;
      const seconds = Math.floor(client.uptime / 1000) % 60;

      const latency = msg.createdTimestamp / 1000 - message.createdTimestamp / 1000;
      msg.edit(`__Latency__: ${latency.toFixed(3)} seconds\n__API Latency__: ${Math.round(client.ws.ping) / 1000} seconds\n__Uptime__: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    });
  },
};
