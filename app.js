'use strict';
const Discord = require('discord.js');
const axios = require('axios');

const config = require('./config.json');

const client = new Discord.Client({
  // partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'],
});

client.on('ready', async () => {
  console.log('Starting!');
  client.user.setActivity(config.activity);
});

client.on('message', async (msg) => {
  if (msg.author.bot) {
    return;
  }
  console.log(msg.content);
  if (msg.content.startsWith('!poll ')) {
    let tmp = msg.content.replace('!poll ', '');
    let values = tmp.split(' ');
    if (values.length === 2) {
      let intValues = values.map((d) => d.split('/').map((e) => parseInt(e)));
      let start = new Date(`2022-${intValues[0][1]}-${intValues[0][0]} UTC`);
      let end = new Date(`2022-${intValues[1][1]}-${intValues[1][0]} UTC`);
      for (let i = 0; i <= (end - start) / 1000 / 3600 / 24; i++) {
        msg.channel
          .send(new Date(start.getTime() + i * 86400000).toDateString())
          .then((m) => {
            m.react('✅');
            return m;
          })
          .then((m) => m.react('❌'));
      }
    } else {
      msg.channel.send('wrong argument. Need 2 date.');
    }
  }
});

client
  .login(config.token)
  .then(() => console.log("We're in!"))
  .catch((err) => console.log(err));
