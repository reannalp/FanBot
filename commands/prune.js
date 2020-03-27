// module.exports = {
//   name: 'prune',
//   description: 'Prune user messages',
//   args: true,
//   execute(client, message, args) {
//     const amount = parseInt(args[0], 10) + 1;

//     if (isNaN(amount)) {
//       return message.reply('that doesn\'t seem to be a valid number.');
//     } if (amount <= 1 || amount > 100) {
//       return message.reply('you need to input a number between 1 and 99.');
//     }
//     message.channel.bulkDelete(amount, true).catch((err) => {
//       console.error(err);
//       message.channel.send('There was an error trying to prune messages in this channel.');
//     });
//   },
// };

// Lock this to mods only
