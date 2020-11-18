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

// Add rec by workID OR URL.

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
  authorURL: Sequelize.STRING,
  wordcount: Sequelize.INTEGER,
  warnings: Sequelize.STRING,
  rating: Sequelize.STRING,
  freeformtags: Sequelize.TEXT,
  summary: Sequelize.TEXT,
  comments: Sequelize.TEXT,
  recby: Sequelize.STRING,
  recdate: Sequelize.STRING,
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
      const recSent = new Date(message.createdTimestamp);

      // fetch
      const axios = require('axios');
      const cheerio = require('cheerio');
      const fetchData = async () => {
        const result = await axios.get(`https://archiveofourown.org/works/${workID}?view_adult=true&view_full_work=true`);
        return cheerio.load(result.data);
      };
      const $ = await fetchData();
      const workTitle = $('.preface > .title.heading').text().trim();
      const workAuthor = $('.preface > .byline > a').first().text().trim();
      const coAuthors = Array.from($('.preface > .byline > a').nextAll()).map((e) => e.children[0].data.toString()).join(', ');
      const workAuthorURL = $('.byline > a').attr('href');
      // coauthor urls here, also really need the authors to go into their own table. :/
      // need to put coauthors in embed and handle coauthors being empty
      const wordCount = $('.stats > dd.words').text().trim();
      const workSummary = $('.summary > .userstuff').first().text().trim();
      const trimmedSummary = workSummary.length > 800 ? `${workSummary.substring(0, 900 - 21)}... [read more](https://archiveofourown.org/works/${workID})` : workSummary;
      const freeformTagsList = $('.freeform > .commas').contents().children();
      const freeformTags = Array.from(freeformTagsList).map((e) => e.children[0].data.toString()).join(', ');
      const trimmedTags = freeformTags.length > 800 ? `${freeformTags.substring(0, 900 - 21)}... [read more](https://archiveofourown.org/works/${workID})` : freeformTags;
      const workWarningsList = $('.warning > .commas').contents().children();
      const workWarnings = Array.from(workWarningsList).map((e) => e.children[0].data.toString()).join(', ');
      const workRatingList = $('.rating > .commas').contents().children();
      const workRating = Array.from(workRatingList).map((e) => e.children[0].data.toString()).join(', ');
      const recDate = recSent.toDateString();

      const embed = new Discord.MessageEmbed()
        .setColor('#970000')
        .setThumbnail('http://www.userlogos.org/files/logos/mfrog/AO3logo3-02.png')
        .setDescription(`\u200b**[${workTitle}](https://archiveofourown.org/works/${workID})** by *[${workAuthor}](https://archiveofourown${workAuthorURL})*`)
        .addFields(
          { name: 'Word Count', value: `\u200b${wordCount.toLocaleString()}`, inline: true },
          { name: 'Rating', value: `\u200b${workRating}`, inline: true },
          { name: 'Warnings', value: `\u200b${workWarnings}`, inline: false },
          { name: 'Tags', value: `\u200b${trimmedTags}`, inline: false },
          { name: 'Summary', value: `\u200b${trimmedSummary}`, inline: false },
        )
        .setFooter(`Recommended by ${message.author.username} on ${recDate}.`, 'https://images-ext-1.discordapp.net/external/YlQNt-XbFK952sJEvUsXB7FgU4Urjj9JcpFZeAQMKyw/https/images-ext-2.discordapp.net/external/TAHw2BUvSlB7GzuU4YnZBI9w4vInaI-2OonKfGze000/https/cdn.discordapp.com/emojis/388209945343950858.png');

      try {
        const rec = await Recs.create({
          workid: workID,
          title: workTitle,
          author: workAuthor,
          authorURL: workAuthorURL,
          wordcount: wordCount,
          warnings: workWarnings,
          rating: workRating,
          summary: workSummary,
          // comments: comments argument???? Probably not
          freeformtags: freeformTags,
          recby: message.author.id,
          recdate: recDate,
        });
        message.channel.send({ embed });
      } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
          return message.reply('That fic has already been recommended.')
            .then((msg) => msg.delete({ timeout: 10000 }), message.delete({ timeout: 10000 }));
        }
        return message.reply('Something went wrong with adding this rec.');
      }
    } else if (command === 'rec') {
      //! pull randomized rec IF no argument, pull specific rec IF workID or URL, give usage if other arg
      const workID = commandArgs;
      const rec = await Recs.findOne({ where: { workid: workID } });
      if (rec) {
        const rb = client.users.fetch(rec.get('recby'));
        const trimmedSummary = rec.get('summary').length > 800 ? `${rec.get('summary').substring(0, 900 - 21)}... [read more](https://archiveofourown.org/works/${workID})` : rec.get('summary');
        const trimmedTags = rec.get('freeformtags').length > 800 ? `${rec.get('freeformtags').substring(0, 900 - 21)}... [read more](https://archiveofourown.org/works/${workID})` : rec.get('freeformtags');
        const embed = new Discord.MessageEmbed()
          .setColor('#970000')
          .setThumbnail('http://www.userlogos.org/files/logos/mfrog/AO3logo3-02.png')
          .setDescription(`\u200b**[${rec.get('title')}](https://archiveofourown.org/works/${workID})** by *[${rec.get('author')}](https://archiveofourown.org${rec.get('authorURL')})*`)
          .addFields(
            { name: 'Word Count', value: `\u200b${rec.get('wordcount').toLocaleString()}`, inline: true },
            { name: 'Rating', value: `\u200b${rec.get('rating')}`, inline: true },
            { name: 'Warnings', value: `\u200b${rec.get('warnings')}`, inline: false },
            { name: 'Tags', value: `\u200b${trimmedTags}`, inline: false },
            { name: 'Summary', value: `\u200b${trimmedSummary}`, inline: false },
          )
          .setFooter(`Recommended by ${(await rb).username}, ${rec.recdate}.`, 'https://images-ext-1.discordapp.net/external/YlQNt-XbFK952sJEvUsXB7FgU4Urjj9JcpFZeAQMKyw/https/images-ext-2.discordapp.net/external/TAHw2BUvSlB7GzuU4YnZBI9w4vInaI-2OonKfGze000/https/cdn.discordapp.com/emojis/388209945343950858.png');
        message.channel.send({ embed });
        return;
      }
      return message.reply(`Could not find rec: ${workID}`); // change to updaterec if entry exists, randomize if no argument, usage if garbage argument
    } else if (command === 'updaterec') {
      //! updates/edits info of specific rec by workID
      const splitArgs = commandArgs.split(' ');
      const workID = splitArgs.shift();

      // fetch
      const axios = require('axios');
      const cheerio = require('cheerio');
      const fetchData = async () => {
        const result = await axios.get(`https://archiveofourown.org/works/${workID}?view_adult=true&view_full_work=true`);
        return cheerio.load(result.data);
      };
      const $ = await fetchData();
      const workTitle = $('.preface > .title.heading').text().trim();
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
      return message.reply(`Could not find a rec with ID ${workID}.`); // addrec then or give usage if garbage
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
