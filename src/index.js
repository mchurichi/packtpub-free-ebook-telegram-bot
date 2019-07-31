const packtpub = require('./packtpub');
const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.PACKTPUB_TELEGRAM_BOT_TOKEN)

bot.command('today', ({ reply }) => {
  packtpub.loadOffers(new Date(), function(offer) {
    reply(offer.coverImage);
    reply('Today free book is out!')
    reply(offer.title);
    reply('https://www.packtpub.com/free-learning');
  });
});

bot.launch()