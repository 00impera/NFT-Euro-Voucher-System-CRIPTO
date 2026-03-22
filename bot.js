require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const WEBSITE = 'https://nftcriptocash.nelutz2you.workers.dev';
const CONTRACT = 'update_with_real_contract';

const bot = new TelegramBot(token, { polling: true });

console.log('💶 Euro Voucher Bot is running...');

const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '🚀 BUY NOW — Get Euro Voucher NFT!', url: WEBSITE }],
      [{ text: '🎁 FREE AIRDROP — Claim Now!', url: WEBSITE }],
      [{ text: '🎫 View Vouchers', callback_data: 'vouchers' }, { text: '💶 How It Works', callback_data: 'howto' }],
      [{ text: '📜 Contract', callback_data: 'contract' }, { text: '❓ Help', callback_data: 'help' }],
      [{ text: '🌐 Open dApp', url: WEBSITE }],
    ]
  },
  parse_mode: 'Markdown'
};

const WELCOME_BANNER =
  '🟡🟠🔴🟣🔵🟢🟡🟠🔴🟣🔵🟢\n' +
  '💶 *EURO CASH NFT VOUCHER SYSTEM* 💶\n' +
  '🟢🔵🟣🔴🟠🟡🟢🔵🟣🔴🟠🟡\n\n' +
  '━━━━━━━━━━━━━━━━━━━━━━━\n' +
  '🔥 *AIRDROP IS LIVE — CLAIM NOW!* 🔥\n' +
  '━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
  '💵 *€5* · 💴 *€10* · 💶 *€20* · 💷 *€50*\n' +
  '💰 *€100* · 💎 *€200* · ⭐ *€500* VOUCHERS\n\n' +
  '✅ _Decentralized Euro vouchers on Monad_\n' +
  '🔐 Fully on-chain · Secure · Instant\n' +
  '⚡ Monad Blockchain Speed\n' +
  '🎁 *FREE NFT AIRDROP* for early holders!\n\n' +
  '━━━━━━━━━━━━━━━━━━━━━━━\n' +
  '👇 *TAP BUY NOW TO GET YOURS!* 👇\n' +
  '━━━━━━━━━━━━━━━━━━━━━━━';

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, WELCOME_BANNER, mainMenu);
});

bot.onText(/\/vouchers/, (msg) => sendVouchers(msg.chat.id));
bot.onText(/\/howto/, (msg) => sendHowTo(msg.chat.id));
bot.onText(/\/contract/, (msg) => sendContract(msg.chat.id));
bot.onText(/\/airdrop/, (msg) => sendAirdrop(msg.chat.id));
bot.onText(/\/website/, (msg) => {
  bot.sendMessage(msg.chat.id, `🌐 Euro Voucher dApp:\n${WEBSITE}`, {
    reply_markup: { inline_keyboard: [[{ text: '🚀 Open dApp NOW', url: WEBSITE }]] }
  });
});
bot.onText(/\/help/, (msg) => sendHelp(msg.chat.id));

function sendVouchers(chatId) {
  bot.sendMessage(chatId,
    '🟡🟠🔴🟣🔵🟢🟡🟠🔴🟣🔵🟢\n' +
    '🎫 *EURO VOUCHER NFT COLLECTION* 🎫\n' +
    '🟢🔵🟣🔴🟠🟡🟢🔵🟣🔴🟠🟡\n\n' +
    '🟢 *€5 Voucher NFT* — Entry · Common 🎟️\n' +
    '🔵 *€10 Voucher NFT* — Standard · Common 🎟️\n' +
    '🟡 *€20 Voucher NFT* — Popular · Uncommon 🌟\n' +
    '🟠 *€50 Voucher NFT* — Premium · Rare 💫\n' +
    '🔴 *€100 Voucher NFT* — Elite · Epic 🔥\n' +
    '💜 *€200 Voucher NFT* — Exclusive · Legendary ⚡\n' +
    '⭐ *€500 Voucher NFT* — Ultra Rare · Mythic 👑\n\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '🎁 *AIRDROP* — Free NFT for early buyers!\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚀 BUY NOW!', url: WEBSITE }],
          [{ text: '🎁 CLAIM AIRDROP', url: WEBSITE }],
          [{ text: '🔙 Back', callback_data: 'menu' }]
        ]
      }
    }
  );
}

function sendAirdrop(chatId) {
  bot.sendMessage(chatId,
    '🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁\n' +
    '⚡ *FREE NFT AIRDROP — LIVE NOW!* ⚡\n' +
    '🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁\n\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '🔥 *HOW TO CLAIM YOUR FREE NFT:*\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
    '*Step 1* 👉 Connect your wallet\n' +
    '*Step 2* 👉 Buy any Euro Voucher NFT\n' +
    '*Step 3* 👉 FREE NFT airdropped to you!\n\n' +
    '💶 Available denominations:\n' +
    '€5 · €10 · €20 · €50 · €100 · €200 · €500\n\n' +
    '⏰ *LIMITED TIME OFFER — ACT NOW!*\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🎁 CLAIM FREE AIRDROP NOW!', url: WEBSITE }],
          [{ text: '🚀 BUY VOUCHER NFT', url: WEBSITE }],
          [{ text: '🔙 Back', callback_data: 'menu' }]
        ]
      }
    }
  );
}

function sendHowTo(chatId) {
  bot.sendMessage(chatId,
    '💶🔵🟡🔴💶🔵🟡🔴💶🔵🟡🔴\n' +
    '💶 *HOW EURO VOUCHER NFT WORKS* 💶\n' +
    '🔴🟡🔵💶🔴🟡🔵💶🔴🟡🔵💶\n\n' +
    '*Step 1* ✅ — Connect your wallet\n' +
    '*Step 2* ✅ — Choose denomination\n' +
    '€5 · €10 · €20 · €50 · €100 · €200 · €500\n\n' +
    '*Step 3* ✅ — Purchase the NFT voucher\n' +
    '*Step 4* ✅ — Receive FREE AIRDROP NFT 🎁\n' +
    '*Step 5* ✅ — Redeem anytime on-chain\n' +
    '*Step 6* ✅ — Transfer or trade freely\n\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '🏆 *WHY EURO CASH NFT?*\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '💎 Fully decentralized\n' +
    '⚡ Instant settlement on Monad\n' +
    '🔄 Tradeable on NFT markets\n' +
    '💶 Euro-pegged stable value\n' +
    '🎁 FREE airdrop for holders!\n',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚀 BUY NOW!', url: WEBSITE }],
          [{ text: '🎁 FREE AIRDROP', url: WEBSITE }],
          [{ text: '🔙 Back', callback_data: 'menu' }]
        ]
      }
    }
  );
}

function sendContract(chatId) {
  bot.sendMessage(chatId,
    '📜🔐📜🔐📜🔐📜🔐📜🔐📜🔐\n' +
    '📜 *SMART CONTRACT INFO* 📜\n' +
    '🔐📜🔐📜🔐📜🔐📜🔐📜🔐📜\n\n' +
    `🎫 *Euro Voucher NFT ERC-721*\n\`${CONTRACT}\`\n\n` +
    '⛓ Network: Monad Blockchain\n' +
    '🔐 Fully auditable on-chain\n' +
    '💶 Euro-denominated vouchers\n' +
    '🔄 Transferable & redeemable\n' +
    '🎁 Airdrop enabled for holders',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚀 BUY NOW!', url: WEBSITE }],
          [{ text: '🌐 Website', url: WEBSITE }],
          [{ text: '🔙 Back', callback_data: 'menu' }]
        ]
      }
    }
  );
}

function sendHelp(chatId) {
  bot.sendMessage(chatId,
    '❓ *Euro Voucher Bot Commands*\n\n' +
    '/start — 🏠 Main menu\n' +
    '/vouchers — 🎫 View all voucher types\n' +
    '/airdrop — 🎁 Free NFT airdrop info\n' +
    '/howto — 💶 How it works\n' +
    '/contract — 📜 Smart contract\n' +
    '/website — 🌐 Visit the dApp\n' +
    '/help — ❓ This menu',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚀 BUY NOW!', url: WEBSITE }],
          [{ text: '🎁 FREE AIRDROP', url: WEBSITE }],
        ]
      }
    }
  );
}

bot.on('callback_query', (q) => {
  bot.answerCallbackQuery(q.id);
  const chatId = q.message.chat.id;
  if (q.data === 'menu') {
    bot.sendMessage(chatId, WELCOME_BANNER, mainMenu);
  } else if (q.data === 'vouchers')  sendVouchers(chatId);
  else if (q.data === 'howto')       sendHowTo(chatId);
  else if (q.data === 'contract')    sendContract(chatId);
  else if (q.data === 'airdrop')     sendAirdrop(chatId);
  else if (q.data === 'help')        sendHelp(chatId);
});

bot.on('polling_error', (err) => console.error('Polling error:', err.message));
