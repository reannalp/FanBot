const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const { token, prefix } = require('./config.json');

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
    client.on(evtName, evt.bind(null, client));
  });
});

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  // SQLite only
  storage: 'database.sqlite',
});

const Recs = sequelize.define('recs', {
  workid: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  wordcount: Sequelize.INTEGER,
  summary: Sequelize.TEXT,
  comments: Sequelize.TEXT,
  recby: Sequelize.STRING,
  recdate: Sequelize.DATE,
});

client.once('ready', () => {
  Recs.sync();
});

client.on('message', async (message) => {
  if (message.content.startsWith(prefix)) {
    const input = message.content.slice(prefix.length).split(' ');
    const command = input.shift();
    const commandArgs = input.join(' ');

    if (command === 'addrec') {
      const splitArgs = commandArgs.split(' ');
      const workID = splitArgs.shift();

      // fetch
      const axios = require('axios');
      const cheerio = require('cheerio');
      const fetchData = async () => {
        const result = await axios.get(`https://archiveofourown.org/works/${workID}`);
        return cheerio.load(result.data);
      };
      const $ = await fetchData();
      const workTitle = $('.preface > .title').text().trim();
      const workAuthor = $('.preface > .byline').text().trim();
      const wordCount = $('.stats > dd.words').text().trim();
      const workSummary = $('.summary > .userstuff').text().trim();
      console.log(`${workTitle} by ${workAuthor}\nWords: ${wordCount}\n Summary: ${workSummary}`);
      message.channel.send(`${workTitle} by ${workAuthor}\nWords: ${wordCount}\n Summary: ${workSummary}`);
      //

      try {
        const rec = await Recs.create({
          workid: workID,
          title: workTitle,
          author: workAuthor,
          wordcount: wordCount,
          summary: workSummary,
          // comments: comments/tags,
          recby: message.author.id,
          // recdate: datetime added
        });
        return message.reply(`https://archiveofourown.org/works/${workID} added.`);
      } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
          return message.reply('That fic has already been recommended.');
        }
        return message.reply('Something went wrong with adding this rec.');
      }
    } else if (command === 'rec') {
      //! pull randomized rec IF no argument, pull specific rec IF workID or Title, give usage if other arg
      const workID = commandArgs;
      const rec = await Recs.findOne({ where: { workid: workID } });
      if (rec) {
        return message.channel.send(`https://archiveofourown.org/works/${rec.get('workid')} was recommended by ${rec.recby} on DATE`);
      }
      return message.reply(`Could not find rec: ${workID}`); // change to randomization
    } else if (command === 'updaterec') {
      //! updates/edits info of specific rec by workID
      const splitArgs = commandArgs.split(' ');
      const workID = splitArgs.shift();

      // fetch
      const axios = require('axios');
      const cheerio = require('cheerio');
      const fetchData = async () => {
        const result = await axios.get(`https://archiveofourown.org/works/${workID}`);
        return cheerio.load(result.data);
      };
      const $ = await fetchData();
      const workTitle = $('.preface > .title').text().trim();
      const workAuthor = $('.preface > .byline').text().trim();
      const wordCount = $('.stats > dd.words').text().trim();
      const workSummary = $('.summary > .userstuff').text().trim();
      // end fetch

      const affectedRows = await Recs.update({
        title: workTitle, author: workAuthor, wordcount: wordCount, summary: workSummary,
      }, { where: { workid: workID } });
      if (affectedRows > 0) {
        return message.reply(`Rec ${workID} was updated.`);
      }
      return message.reply(`Could not find a rec with ID ${workID}.`);
    } else if (command === 'removerec') {
      // delete specfic rec by workID
      const workID = commandArgs;
      const rowCount = await Recs.destroy({ where: { workid: workID } });
      if (!rowCount) return message.reply('There is no rec with that ID');

      return message.reply(`Rec of ${workID} deleted.`);
    }
  }
});

client.login(token);
