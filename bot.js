require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const WEBSITE = 'https://voucher.imperamonad.xyz';
const CONTRACT = 'update_with_real_contract';

const bot = new TelegramBot(token, { polling: true });

console.log('💶 Euro Voucher Bot is running...');

const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '🌐 Open dApp', url: WEBSITE }],
      [{ text: '🎫 View Vouchers', callback_data: 'vouchers' }],
      [{ text: '💶 How It Works', callback_data: 'howto' }],
      [{ text: '📜 Contract', callback_data: 'contract' }],
      [{ text: '❓ Help', callback_data: 'help' }],
    ]
  },
  parse_mode: 'Markdown'
};

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
    '🎫 *Welcome to Euro Voucher NFT System!*\n\n' +
    '_Decentralized Euro vouchers on Monad Blockchain_\n\n' +
    '💶 Purchase, manage and redeem Euro vouchers as NFTs\n' +
    '🔐 Fully on-chain · Secure · Instant\n' +
    '⛓ Powered by Monad Blockchain\n\n' +
    'Choose an option below 👇',
    mainMenu
  );
});

bot.onText(/\/vouchers/, (msg) => sendVouchers(msg.chat.id));
bot.onText(/\/howto/, (msg) => sendHowTo(msg.chat.id));
bot.onText(/\/contract/, (msg) => sendContract(msg.chat.id));
bot.onText(/\/website/, (msg) => {
  bot.sendMessage(msg.chat.id, `🌐 Euro Voucher dApp:\n${WEBSITE}`, {
    reply_markup: { inline_keyboard: [[{ text: '🌐 Open dApp', url: WEBSITE }]] }
  });
});
bot.onText(/\/help/, (msg) => sendHelp(msg.chat.id));

function sendVouchers(chatId) {
  const text =
    '🎫 *Available Euro Voucher NFTs*\n\n' +
    '🟢 *€5 Voucher* — Entry level · Common\n' +
    '🔵 *€10 Voucher* — Standard · Common\n' +
    '🟡 *€20 Voucher* — Popular · Uncommon\n' +
    '🟠 *€50 Voucher* — Premium · Rare\n' +
    '🔴 *€100 Voucher* — Elite · Epic\n' +
    '💜 *€200 Voucher* — Exclusive · Legendary\n' +
    '⭐ *€500 Voucher* — Ultra Rare · Mythic\n';
  bot.sendMessage(chatId, text, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🌐 Buy Vouchers', url: WEBSITE }],
        [{ text: '🔙 Back', callback_data: 'menu' }]
      ]
    }
  });
}

function sendHowTo(chatId) {
  bot.sendMessage(chatId,
    '💶 *How Euro Voucher NFT Works*\n\n' +
    '*Step 1* — Connect your wallet\n' +
    '*Step 2* — Choose denomination\n' +
    '€5 · €10 · €20 · €50 · €100 · €200 · €500\n\n' +
    '*Step 3* — Purchase the NFT voucher\n' +
    '*Step 4* — Redeem anytime on-chain\n' +
    '*Step 5* — Transfer or trade freely\n\n' +
    '✅ *Benefits:*\n' +
    '• Fully decentralized\n' +
    '• Instant settlement\n' +
    '• Tradeable on NFT markets\n' +
    '• Euro-pegged value\n' +
    `• Monad blockchain speed\n\n🌐 ${WEBSITE}`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🌐 Get Started', url: WEBSITE }],
          [{ text: '🔙 Back', callback_data: 'menu' }]
        ]
      }
    }
  );
}

function sendContract(chatId) {
  bot.sendMessage(chatId,
    '📜 *Smart Contract*\n\n' +
    `🎫 *Euro Voucher NFT ERC-721*\n\`${CONTRACT}\`\n\n` +
    '⛓ Network: Monad Blockchain\n' +
    '🔐 Fully auditable on-chain\n' +
    '💶 Euro-denominated vouchers\n' +
    '🔄 Transferable & redeemable',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
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
    '/start — Main menu\n' +
    '/vouchers — View all voucher types\n' +
    '/howto — How it works\n' +
    '/contract — Smart contract\n' +
    '/website — Visit the dApp\n' +
    '/help — This menu',
    { parse_mode: 'Markdown' }
  );
}

bot.on('callback_query', (q) => {
  bot.answerCallbackQuery(q.id);
  const chatId = q.message.chat.id;
  if (q.data === 'menu') {
    bot.sendMessage(chatId,
      '🎫 *Euro Voucher NFT — Main Menu*\n\nChoose an option 👇',
      mainMenu
    );
  } else if (q.data === 'vouchers')  sendVouchers(chatId);
  else if (q.data === 'howto')       sendHowTo(chatId);
  else if (q.data === 'contract')    sendContract(chatId);
  else if (q.data === 'help')        sendHelp(chatId);
});

bot.on('polling_error', (err) => console.error('Polling error:', err.message));
