module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(client, message, args) {
    message.channel.send('...').then((msg) => {
      const latency = msg.createdTimestamp / 1000 - message.createdTimestamp / 1000;
      msg.edit(`Latency: ${latency.toFixed(3)} seconds\nAPI Latency: ${Math.round(client.ws.ping) / 1000} seconds`);
    });
  },
};
