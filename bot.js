"""
╔══════════════════════════════════════════════════════════╗
║   EUROSPACE + EURO VOUCHER NFT — Telegram Bot            ║
║   Python · python-telegram-bot v20+                      ║
║   pip install python-telegram-bot requests               ║
╚══════════════════════════════════════════════════════════╝
"""

import os
import logging
import requests
from datetime import datetime, timezone
from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo,
    InputMediaPhoto,
)
from telegram.ext import (
    Application,
    CommandHandler,
    CallbackQueryHandler,
    ContextTypes,
)

# ══════════════════════════════════════════════════════════
# CONFIG
# ══════════════════════════════════════════════════════════
BOT_TOKEN   = os.getenv("BOT_TOKEN", "8566606318:AAF8IRAwUxct4WvO2zHWSkWShoBQtg9NNrY")

# ── Mini Apps (WebApp URLs) ──────────────────────────────
EUROSPACE_APP = "https://eurocoin-websitecom.nelutz2you.workers.dev"   # EUROSPACE presale
VOUCHER_APP   = "https://telegram8.winnowin-game.pages.dev/"           # Euro Voucher dApp

# ── Contracts ────────────────────────────────────────────
EURO_CONTRACT    = "0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79"        # EURO ERC-20
VOUCHER_CONTRACT = "0xa4d064E4ac881234961C076d314Abf9ac8d4E4BB"        # Voucher ERC-721

# ── Chain ────────────────────────────────────────────────
CHAIN_ID  = 143
EXPLORER  = "https://monad.socialscan.io"
RPC_URL   = "https://rpc.monad.xyz"

# ── Social ───────────────────────────────────────────────
TWITTER    = "https://x.com/bnbgold277983"
DISCORD    = "https://discord.com/channels/1316093079090106472"
TG_CHANNEL = "https://t.me/eurocoin_monad_bot"

# ── NFT Voucher images (catbox) ──────────────────────────
VOUCHER_IMAGES = {
    5:   "https://files.catbox.moe/mszp1d.jpeg",
    10:  "https://files.catbox.moe/otcljk.jpeg",
    20:  "https://files.catbox.moe/c11h9p.jpeg",
    50:  "https://files.catbox.moe/4jezdg.jpeg",
    100: "https://files.catbox.moe/qlf6vq.jpeg",
    500: "https://files.catbox.moe/ir84ab.jpeg",
}

# Voucher denominations: euros → MON price
VOUCHER_PRICES = {
    5:   100,
    10:  200,
    20:  300,
    50:  500,
    100: 1000,
    500: 5000,
}

# ── EURO Logo ────────────────────────────────────────────
EURO_LOGO = "https://raw.githubusercontent.com/00impera/eurocoin-website/master/logo.png"

# ── All 17 EUROSPACE tokens ──────────────────────────────
PRESALE_START = datetime(2026, 3, 21, 0,  0,  0,  tzinfo=timezone.utc)
PRESALE_END   = datetime(2026, 4, 20, 23, 59, 59, tzinfo=timezone.utc)

ALL_TOKENS = [
    {"symbol": "EURO",   "name": "Meta EuroCoin",  "cat": "euro",   "contract": "0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79", "pair": "0x9E32FdD909a5BdcCfb874DEE72F24169AfE4eC02"},
    {"symbol": "mBTC",   "name": "Meta Bitcoin",   "cat": "meta",   "contract": "0x5078A3531Dba3Dea11AB4aaF641DB6f0fE88579e", "pair": "0x47Dc73D3e1C520056AdF52349A6A282e5262D56d"},
    {"symbol": "mETH",   "name": "Meta Ethereum",  "cat": "meta",   "contract": "0x271028A77301bb705C293Bd1fFA79E239AB1Daec", "pair": "0xDE92BC23146222B86e638B6E88E23917eD378a6E"},
    {"symbol": "mSOL",   "name": "Meta Solana",    "cat": "meta",   "contract": "0xEd59c5bA2180ce57a723Dbc04FF3A81e1ba84B3C", "pair": "0xf8dbc8Cc478506fb0844C670B35b90A7AD6Ad912"},
    {"symbol": "mBNB",   "name": "Meta BNB",       "cat": "meta",   "contract": "0xb1326c51F73814f071bb4d3db44c86dD03DC8C76", "pair": "0xd77B55A199EA0DC81EB4c7c36d45fBda4D6477B6"},
    {"symbol": "mXRP",   "name": "Meta XRP",       "cat": "meta",   "contract": "0x379563529988bD76DeD9bc4a175AD59df6191B75", "pair": "0x69884c6C8Fe6F833aEEDE2A4c0949e667C7F79fB"},
    {"symbol": "mUSDC",  "name": "Meta USDC",      "cat": "stable", "contract": "0xe0Ed08D1bC86b98434861ae0403be968bD95465E", "pair": "0x3BE5B19348d6Ccbc20e0DCf3Cab0aDF9e4643dCa"},
    {"symbol": "mUSDT",  "name": "Meta Tether",    "cat": "stable", "contract": "0x085368cae9d4eCffe676806c3a8105433377164b", "pair": "0xAB4CFB051E73db47f75c4A2c31dFaAFd3A82A8b8"},
    {"symbol": "mMATIC", "name": "Meta Polygon",   "cat": "meta",   "contract": "0x43C60d3cec23b0E85678602A4F5C1156a7398daC", "pair": "0x5F5908aD27AFf28b0BDbAD8F93470e83310aE365"},
    {"symbol": "mDOGE",  "name": "Meta Dogecoin",  "cat": "meta",   "contract": "0x111b31d8474Aee70767337FD794a7fb0A08788A8", "pair": "0x8e71b96897c6D5EF3954b06636c24EdB4866b488"},
    {"symbol": "mLTC",   "name": "Meta Litecoin",  "cat": "meta",   "contract": "0x8abAe4dbf7A2e286d688fa7101bea0fAE4C0Dd75", "pair": "0xd4faf6a3B43105395C1f3db6525eA0fBF5B3aF9a"},
    {"symbol": "mTRX",   "name": "Meta TRON",      "cat": "meta",   "contract": "0x1A3206c56993d4906ec26Fe85194399E0dBD8EBf", "pair": "0x77A4Ad2ac41775A543353C8255cd88C7bF58e404"},
    {"symbol": "mBASE",  "name": "Meta Base",      "cat": "meta",   "contract": "0xeA66DaF739823505817d4DAfEdBb43Dc0C2E5372", "pair": "0x9f1b9A6D727DF983a74F11252EDa0Fa96132cc12"},
    {"symbol": "mEURO",  "name": "Meta Euro",      "cat": "euro",   "contract": "0x4443892C796f7A519C9D099417EC8422f88F5867", "pair": "0x2f3B240444F5b8Dc6f211373ff29CCE0Ba798114"},
    {"symbol": "mMONAD", "name": "Meta Monad",     "cat": "meta",   "contract": "0xbF5E34B1EBE37F9a98BFcE48645dc67Dd84E5fD6", "pair": "0xc7a8f6A2452D1ec709006E36A3B89f4Df7188a9a"},
    {"symbol": "mEURC",  "name": "Meta EURC",      "cat": "euro",   "contract": "0x7bD9bbFc0086B033ede5736e4Aa9C16a451D0904", "pair": "0x669d78953a14a147DA6730dA255b4E7A7b15b111"},
    {"symbol": "mCRO",   "name": "Meta Cronos",    "cat": "meta",   "contract": "0x0127B3c3C864cfC1BB519beB935477299b961d46", "pair": "0x7D9e8050Ba0c0a6c8336A49a5Af6748AA6BD855C"},
]

# ══════════════════════════════════════════════════════════
# LOGGING
# ══════════════════════════════════════════════════════════
logging.basicConfig(
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    level=logging.INFO,
)
log = logging.getLogger(__name__)

# ══════════════════════════════════════════════════════════
# RPC / CHAIN HELPERS
# ══════════════════════════════════════════════════════════
def rpc_call(method, params):
    try:
        r = requests.post(
            RPC_URL,
            json={"jsonrpc": "2.0", "id": 1, "method": method, "params": params},
            timeout=8,
        )
        return r.json().get("result")
    except Exception as e:
        log.warning(f"RPC [{method}]: {e}")
        return None

def decode_uint(h):
    return int(h, 16) if h and h not in ("0x", "0x0", None) else 0

def eth_call(contract, data):
    return rpc_call("eth_call", [{"to": contract, "data": data}, "latest"])

def get_euro_supply():
    return decode_uint(eth_call(EURO_CONTRACT, "0x18160ddd")) / 1e18

def get_euro_enabled():
    return decode_uint(eth_call(EURO_CONTRACT, "0xf582d293")) != 0

def get_tokens_per_mon():
    return decode_uint(eth_call(EURO_CONTRACT, "0x19cb3e21"))

def get_voucher_total_supply():
    r = eth_call(VOUCHER_CONTRACT, "0x18160ddd")
    return decode_uint(r)

def get_pair_price(pair_addr):
    try:
        res = eth_call(pair_addr, "0x0902f1ac")
        if not res or res == "0x" or len(res) < 130:
            return None
        r0 = int(res[2:66],   16)
        r1 = int(res[66:130], 16)
        if r0 == 0 or r1 == 0:
            return None
        return round(r1 / r0, 6)
    except Exception:
        return None

# ══════════════════════════════════════════════════════════
# COUNTDOWN / PROGRESS
# ══════════════════════════════════════════════════════════
def get_countdown():
    diff = PRESALE_END - datetime.now(timezone.utc)
    if diff.total_seconds() <= 0:
        return "⏰ Presale ended"
    d = diff.days
    h = diff.seconds // 3600
    m = (diff.seconds % 3600) // 60
    s = diff.seconds % 60
    return f"{d}d {h:02d}h {m:02d}m {s:02d}s"

def get_progress_bar():
    now     = datetime.now(timezone.utc)
    total   = (PRESALE_END - PRESALE_START).total_seconds()
    elapsed = (now - PRESALE_START).total_seconds()
    pct     = min(100, max(0, int((elapsed / total) * 100)))
    filled  = int(pct / 5)
    bar     = "█" * filled + "░" * (20 - filled)
    return bar, pct

# ══════════════════════════════════════════════════════════
# KEYBOARDS
# ══════════════════════════════════════════════════════════
def main_kb():
    return InlineKeyboardMarkup([
        # Row 1 — Two Mini App launchers
        [
            InlineKeyboardButton("💶 EUROSPACE App",    web_app=WebAppInfo(url=EUROSPACE_APP)),
            InlineKeyboardButton("🎫 Voucher dApp",     web_app=WebAppInfo(url=VOUCHER_APP)),
        ],
        # Row 2 — Stats & Countdown
        [
            InlineKeyboardButton("📊 Live Stats",       callback_data="stats"),
            InlineKeyboardButton("⏳ Countdown",         callback_data="countdown"),
        ],
        # Row 3 — Price & Contract
        [
            InlineKeyboardButton("💰 Price & Rate",     callback_data="price"),
            InlineKeyboardButton("📜 Contracts",         callback_data="contracts"),
        ],
        # Row 4 — Tokens & DEX
        [
            InlineKeyboardButton("🪙 17 Tokens",        callback_data="tokens"),
            InlineKeyboardButton("📈 DEX Pairs",         callback_data="dex"),
        ],
        # Row 5 — NFT Vouchers
        [
            InlineKeyboardButton("🎁 NFT Vouchers",     callback_data="vouchers"),
            InlineKeyboardButton("🎁 Airdrop",           callback_data="airdrop"),
        ],
        # Row 6 — Swap & How To
        [
            InlineKeyboardButton("⇄ NEAR Intents Swap", callback_data="swap"),
            InlineKeyboardButton("🚀 How To Buy",        callback_data="howtobuy"),
        ],
        # Row 7 — Explorer & Website
        [
            InlineKeyboardButton("🔍 Explorer",  url=f"{EXPLORER}/address/{EURO_CONTRACT}"),
            InlineKeyboardButton("🌐 Website",   url=EUROSPACE_APP),
        ],
        # Row 8 — Social
        [
            InlineKeyboardButton("𝕏 Twitter",  url=TWITTER),
            InlineKeyboardButton("💬 Discord",  url=DISCORD),
            InlineKeyboardButton("✈️ Telegram", url=TG_CHANNEL),
        ],
    ])

def back_kb():
    return InlineKeyboardMarkup([[
        InlineKeyboardButton("💶 Open App", web_app=WebAppInfo(url=EUROSPACE_APP)),
        InlineKeyboardButton("⬅️ Back",     callback_data="back"),
    ]])

def voucher_app_kb():
    return InlineKeyboardMarkup([[
        InlineKeyboardButton("🎫 Open Voucher dApp", web_app=WebAppInfo(url=VOUCHER_APP)),
        InlineKeyboardButton("⬅️ Back", callback_data="back"),
    ]])

def contracts_kb():
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("🔍 EURO Token", url=f"{EXPLORER}/address/{EURO_CONTRACT}")],
        [InlineKeyboardButton("🎫 Voucher NFT",url=f"{EXPLORER}/address/{VOUCHER_CONTRACT}")],
        [InlineKeyboardButton("⬅️ Back", callback_data="back")],
    ])

def dex_kb_full():
    rows, row = [], []
    for i, t in enumerate(ALL_TOKENS):
        row.append(InlineKeyboardButton(
            t["symbol"],
            url=f"https://dexscreener.com/monad/{t['pair']}"
        ))
        if len(row) == 3:
            rows.append(row)
            row = []
    if row:
        rows.append(row)
    rows.append([
        InlineKeyboardButton("⚡ Trade on App", web_app=WebAppInfo(url=EUROSPACE_APP)),
        InlineKeyboardButton("⬅️ Back", callback_data="back"),
    ])
    return InlineKeyboardMarkup(rows)

def tokens_kb():
    return InlineKeyboardMarkup([[
        InlineKeyboardButton("⚡ Trade on App", web_app=WebAppInfo(url=EUROSPACE_APP)),
        InlineKeyboardButton("⬅️ Back", callback_data="back"),
    ]])

# ══════════════════════════════════════════════════════════
# MESSAGE BUILDERS
# ══════════════════════════════════════════════════════════
WELCOME = (
    "🟡🟠🔴🟣🔵🟢🟡🟠🔴🟣🔵🟢\n"
    "💶 *EUROSPACE \\+ EURO VOUCHER NFT* 💶\n"
    "🟢🔵🟣🔴🟠🟡🟢🔵🟣🔴🟠🟡\n\n"
    "━━━━━━━━━━━━━━━━━━━━\n"
    "🔥 *PRESALE & AIRDROP ARE LIVE\\!* 🔥\n"
    "━━━━━━━━━━━━━━━━━━━━\n\n"
    "🪙 *17 Tokens* — EURO \\+ 16 Meta Tokens\n"
    "📈 *17 DEX Pairs* — Live on Monad Mainnet\n"
    "🎫 *NFT Vouchers* — €5 · €10 · €20 · €50 · €100 · €500\n"
    "⇄ *NEAR Intents Swap* — 35\\+ chains\n"
    "⚡ *Buy & Sell* any token in the Mini App\n"
    "⛓ Monad Mainnet · Chain ID 143\n\n"
    "👇 *Choose an option below* 👇"
)

HOW_TO_BUY = (
    "💶🔵🟡🔴💶🔵🟡🔴💶🔵🟡🔴\n"
    "🚀 *HOW TO BUY ON EUROSPACE*\n"
    "🔴🟡🔵💶🔴🟡🔵💶🔴🟡🔵💶\n\n"
    "*Step 1* ✅ — Connect Wallet\n"
    "MetaMask, WalletConnect, Trust Wallet or Rabby\n\n"
    "*Step 2* ✅ — Switch to Monad\n"
    "Chain ID: 143 — added automatically\\!\n\n"
    "*Step 3* ✅ — Choose Your Token\n"
    "EURO COIN or any of the 16 Meta Tokens\n"
    "\\(mBTC, mETH, mSOL, mBNB, mXRP and more\\)\n\n"
    "*Step 4* ✅ — Enter MON Amount & Buy\n"
    "Tokens sent instantly to your wallet\\!\n\n"
    "*Step 5* ✅ — Buy NFT Voucher \\(Optional\\)\n"
    "€5 to €500 Euro Voucher NFTs on Monad\n\n"
    "*Step 6* ✅ — Claim FREE Airdrop 🎁\n"
    "FREE NFT airdropped after voucher purchase\\!\n"
    "━━━━━━━━━━━━━━━━━━━━"
)

def stats_text():
    supply        = get_euro_supply()
    enabled       = get_euro_enabled()
    rate          = get_tokens_per_mon()
    voucher_total = get_voucher_total_supply()
    status        = "OPEN ✅" if enabled else "CLOSED ❌"
    cd            = get_countdown()
    bar, pct      = get_progress_bar()
    return (
        "📊 *LIVE STATS*\n"
        "━━━━━━━━━━━━━━━━━━━━\n"
        f"🪙 EURO Supply: `{supply:,.2f} EURO`\n"
        f"💰 Rate: `{rate:,} EURO per MON`\n"
        f"🟢 Presale: `{status}`\n"
        f"🎫 Vouchers Minted: `{voucher_total}`\n"
        f"⏳ Ends In: `{cd}`\n"
        f"`{bar}` {pct}%\n"
        f"⛓ Monad \\#{CHAIN_ID}\n"
        "━━━━━━━━━━━━━━━━━━━━"
    )

def price_text():
    rate = get_tokens_per_mon() or 1000
    return (
        "💰 *EURO COIN PRICE*\n"
        "━━━━━━━━━━━━━━━━━━━━\n"
        f"🏷️ Rate: `{rate:,} EURO per MON`\n\n"
        f"▸ 1 MON → {rate:,} EURO\n"
        f"▸ 10 MON → {rate*10:,} EURO\n"
        f"▸ 100 MON → {rate*100:,} EURO\n"
        f"▸ 1,000 MON → {rate*1000:,} EURO\n"
        f"▸ 10,000 MON → {rate*10000:,} EURO\n"
        "━━━━━━━━━━━━━━━━━━━━\n"
        "🎫 *NFT Voucher Prices:*\n"
        "▸ €5 → 100 MON\n"
        "▸ €10 → 200 MON\n"
        "▸ €20 → 300 MON\n"
        "▸ €50 → 500 MON\n"
        "▸ €100 → 1,000 MON\n"
        "▸ €500 → 5,000 MON\n"
        "━━━━━━━━━━━━━━━━━━━━"
    )

def contracts_text():
    return (
        "📜 *CONTRACT INFO*\n"
        "━━━━━━━━━━━━━━━━━━━━\n"
        "💶 *EURO Token \\(ERC\\-20\\)*\n"
        f"`{EURO_CONTRACT}`\n\n"
        "🎫 *Euro Voucher NFT \\(ERC\\-721\\)*\n"
        f"`{VOUCHER_CONTRACT}`\n\n"
        f"🔗 Monad Mainnet · Chain ID: {CHAIN_ID}\n"
        "━━━━━━━━━━━━━━━━━━━━"
    )

def vouchers_text():
    lines = [
        "🟡🟠🔴🟣🔵🟢🟡🟠🔴🟣🔵🟢\n"
        "🎫 *EURO VOUCHER NFT COLLECTION* 🎫\n"
        "🟢🔵🟣🔴🟠🟡🟢🔵🟣🔴🟠🟡\n\n"
        "━━━━━━━━━━━━━━━━━━━━\n"
        "🎁 *FREE NFT AIRDROP for early buyers\\!*\n"
        "━━━━━━━━━━━━━━━━━━━━\n\n",
    ]
    rarities = {
        5:   "🟢 Common 🎟️",
        10:  "🔵 Common 🎟️",
        20:  "🟡 Uncommon 🌟",
        50:  "🟠 Rare 💫",
        100: "🔴 Epic 🔥",
        500: "⭐ Mythic 👑",
    }
    for eur, mon in VOUCHER_PRICES.items():
        rarity = rarities.get(eur, "")
        lines.append(f"▸ *€{eur} Voucher NFT* — {mon:,} MON — {rarity}\n")
    lines.append(
        "\n━━━━━━━━━━━━━━━━━━━━\n"
        "🔐 Fully on\\-chain · ERC\\-721 · Redeemable\n"
        "🔄 Tradeable · Transferable · Collectible\n"
        "🎁 Buy any voucher → receive FREE NFT airdrop\\!"
    )
    return "".join(lines)

def airdrop_text():
    return (
        "🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁\n"
        "⚡ *FREE NFT AIRDROP — LIVE NOW\\!* ⚡\n"
        "🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁🎁\n\n"
        "━━━━━━━━━━━━━━━━━━━━\n"
        "🔥 *HOW TO CLAIM YOUR FREE NFT:*\n"
        "━━━━━━━━━━━━━━━━━━━━\n\n"
        "*Step 1* 👉 Connect your wallet\n"
        "*Step 2* 👉 Buy any Euro Voucher NFT\n"
        "*Step 3* 👉 FREE NFT airdropped automatically\\!\n\n"
        "💶 *Available denominations:*\n"
        "€5 · €10 · €20 · €50 · €100 · €500\n\n"
        "⏰ *LIMITED TIME OFFER — ACT NOW\\!*\n"
        "━━━━━━━━━━━━━━━━━━━━"
    )

def swap_text():
    return (
        "⇄ *NEAR INTENTS SWAP*\n"
        "━━━━━━━━━━━━━━━━━━━━\n\n"
        "🌐 *35\\+ chains supported*\n"
        "✅ Partner JWT: cryptocash\\-nft\n"
        "💰 Zero extra fees · Priority routing\n\n"
        "*Supported tokens:*\n"
        "▸ ETH · USDC · USDT · DAI \\(Ethereum\\)\n"
        "▸ BTC \\(Bitcoin\\)\n"
        "▸ SOL \\(Solana\\)\n"
        "▸ NEAR \\(NEAR Protocol\\)\n"
        "▸ XRP · DOGE · ARB\n\n"
        "━━━━━━━━━━━━━━━━━━━━\n"
        "Open the Voucher dApp to use the swap widget\\!\n"
        "📱 Supports MetaMask, Rabby, Coinbase & more"
    )

def countdown_text():
    bar, pct = get_progress_bar()
    diff = PRESALE_END - datetime.now(timezone.utc)
    if diff.total_seconds() <= 0:
        return "⏰ *Presale has ended\\!*"
    d = diff.days
    h = diff.seconds // 3600
    m = (diff.seconds % 3600) // 60
    s = diff.seconds % 60
    return (
        "⏳ *PRESALE COUNTDOWN*\n"
        "━━━━━━━━━━━━━━━━━━━━\n\n"
        f"🗓 *{d}d {h:02d}h {m:02d}m {s:02d}s remaining*\n\n"
        f"`{bar}` {pct}%\n\n"
        "📅 Start: March 21, 2026\n"
        "📅 End: April 20, 2026\n"
        "━━━━━━━━━━━━━━━━━━━━"
    )

def dex_text():
    lines = [
        "📈 *DEX LIVE PAIRS — 17 Pairs*\n"
        "━━━━━━━━━━━━━━━━━━━━\n"
    ]
    for t in ALL_TOKENS:
        price = get_pair_price(t["pair"])
        price_str = f"{price:.6f} WMON" if price else "— loading"
        lines.append(f"▸ `{t['symbol']}` {price_str}")
    lines += [
        "\n━━━━━━━━━━━━━━━━━━━━",
        "Tap any symbol below for live DexScreener chart 👇",
    ]
    return "\n".join(lines)

def tokens_list_text():
    sections = [
        ("euro",   "🟡 EURO TOKENS"),
        ("stable", "🟢 STABLE TOKENS"),
        ("meta",   "🔵 META TOKENS"),
    ]
    lines = ["🪙 *ALL 17 TOKENS*\n━━━━━━━━━━━━━━━━━━━━\n"]
    for cat, label in sections:
        group = [t for t in ALL_TOKENS if t["cat"] == cat]
        if not group:
            continue
        lines.append(f"*{label}*")
        for t in group:
            short = f"{t['contract'][:10]}…{t['contract'][-6:]}"
            lines.append(f"▸ `{t['symbol']}` — {t['name']}\n  `{short}`")
        lines.append("")
    lines.append(
        "━━━━━━━━━━━━━━━━━━━━\n"
        "Tap ⚡ Trade in App to buy or sell any token\\!"
    )
    return "\n".join(lines)

# ══════════════════════════════════════════════════════════
# /start — with photo
# ══════════════════════════════════════════════════════════
async def start(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    try:
        await update.message.reply_photo(
            photo=EURO_LOGO,
            caption=WELCOME,
            parse_mode="MarkdownV2",
            reply_markup=main_kb(),
        )
    except Exception:
        await update.message.reply_text(
            WELCOME, parse_mode="MarkdownV2", reply_markup=main_kb()
        )

# ══════════════════════════════════════════════════════════
# COMMAND HANDLERS
# ══════════════════════════════════════════════════════════
async def help_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "❓ *EUROSPACE \\+ VOUCHER Bot Commands*\n\n"
        "/start — 🏠 Main menu\n"
        "/buy — 💶 Buy EURO / open Mini App\n"
        "/stats — 📊 Live presale stats\n"
        "/price — 💰 Prices \\(EURO \\+ Vouchers\\)\n"
        "/contracts — 📜 Contract addresses\n"
        "/tokens — 🪙 All 17 tokens list\n"
        "/dex — 📈 Live DEX pairs\n"
        "/countdown — ⏳ Presale timer\n"
        "/vouchers — 🎫 NFT voucher collection\n"
        "/airdrop — 🎁 Free NFT airdrop info\n"
        "/swap — ⇄ NEAR Intents Swap info\n"
        "/help — ❓ This menu",
        parse_mode="MarkdownV2",
        reply_markup=main_kb(),
    )

async def buy_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    rate = get_tokens_per_mon() or 1000
    await update.message.reply_photo(
        photo=EURO_LOGO,
        caption=(
            f"💶 *Buy EURO COIN*\n\n"
            f"💰 Rate: *{rate:,} EURO per MON*\n\n"
            f"Also trade *16 Meta Tokens* — mBTC, mETH, mSOL and more\\!\n"
            f"🎫 Or buy a *Euro Voucher NFT* from €5 to €500\\!"
        ),
        parse_mode="MarkdownV2",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("💶 Open EUROSPACE App", web_app=WebAppInfo(url=EUROSPACE_APP))],
            [InlineKeyboardButton("🎫 Open Voucher dApp",  web_app=WebAppInfo(url=VOUCHER_APP))],
        ]),
    )

async def stats_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    msg = await update.message.reply_text("⏳ Fetching live stats…")
    await msg.edit_text(stats_text(), parse_mode="MarkdownV2", reply_markup=main_kb())

async def price_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(price_text(), parse_mode="Markdown", reply_markup=back_kb())

async def contracts_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(contracts_text(), parse_mode="MarkdownV2", reply_markup=contracts_kb())

async def tokens_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(tokens_list_text(), parse_mode="MarkdownV2", reply_markup=tokens_kb())

async def dex_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    msg = await update.message.reply_text("⏳ Loading DEX prices from chain…")
    await msg.edit_text(dex_text(), parse_mode="MarkdownV2", reply_markup=dex_kb_full())

async def countdown_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(countdown_text(), parse_mode="MarkdownV2", reply_markup=back_kb())

async def vouchers_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    """Show all 6 voucher NFTs as a photo gallery + text."""
    # Send a media group of all voucher images
    media = [
        InputMediaPhoto(
            media=url,
            caption=f"💶 *€{eur} Euro Voucher NFT* — {mon:,} MON" if i == 0 else f"€{eur} — {mon:,} MON",
            parse_mode="MarkdownV2" if i == 0 else None,
        )
        for i, (eur, (mon, url)) in enumerate(
            zip(range(len(VOUCHER_PRICES)),
                [(mon, VOUCHER_IMAGES[eur]) for eur, mon in VOUCHER_PRICES.items()])
        )
    ]
    # Build media group properly
    media_group = []
    for i, (eur, mon) in enumerate(VOUCHER_PRICES.items()):
        img_url = VOUCHER_IMAGES[eur]
        if i == 0:
            media_group.append(InputMediaPhoto(
                media=img_url,
                caption=f"🎫 *Euro Voucher NFT Collection*\n€{eur} – {mon:,} MON",
                parse_mode="Markdown",
            ))
        else:
            media_group.append(InputMediaPhoto(media=img_url))

    try:
        await update.message.reply_media_group(media=media_group)
    except Exception as e:
        log.warning(f"Media group failed: {e}")

    await update.message.reply_text(
        vouchers_text(),
        parse_mode="MarkdownV2",
        reply_markup=voucher_app_kb(),
    )

async def airdrop_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        airdrop_text(),
        parse_mode="MarkdownV2",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("🎁 Claim FREE Airdrop Now!", web_app=WebAppInfo(url=VOUCHER_APP))],
            [InlineKeyboardButton("🚀 Buy Voucher NFT",         web_app=WebAppInfo(url=VOUCHER_APP))],
            [InlineKeyboardButton("⬅️ Back",                    callback_data="back")],
        ]),
    )

async def swap_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        swap_text(),
        parse_mode="MarkdownV2",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("⇄ Open Swap in dApp", web_app=WebAppInfo(url=VOUCHER_APP))],
            [InlineKeyboardButton("⬅️ Back", callback_data="back")],
        ]),
    )

# ══════════════════════════════════════════════════════════
# INLINE BUTTON HANDLER
# ══════════════════════════════════════════════════════════
async def button(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    q    = update.callback_query
    data = q.data
    await q.answer()

    if data == "back":
        await q.edit_message_text(WELCOME, parse_mode="MarkdownV2", reply_markup=main_kb())

    elif data == "stats":
        await q.edit_message_text("⏳ Fetching live stats…")
        await q.edit_message_text(stats_text(), parse_mode="MarkdownV2", reply_markup=main_kb())

    elif data == "countdown":
        await q.edit_message_text(countdown_text(), parse_mode="MarkdownV2", reply_markup=back_kb())

    elif data == "price":
        await q.edit_message_text(price_text(), parse_mode="Markdown", reply_markup=back_kb())

    elif data == "contracts":
        await q.edit_message_text(contracts_text(), parse_mode="MarkdownV2", reply_markup=contracts_kb())

    elif data == "tokens":
        await q.edit_message_text(tokens_list_text(), parse_mode="MarkdownV2", reply_markup=tokens_kb())

    elif data == "dex":
        await q.edit_message_text("⏳ Loading DEX prices from chain…")
        await q.edit_message_text(dex_text(), parse_mode="MarkdownV2", reply_markup=dex_kb_full())

    elif data == "howtobuy":
        await q.edit_message_text(HOW_TO_BUY, parse_mode="MarkdownV2", reply_markup=back_kb())

    elif data == "vouchers":
        # Can't send media group via edit_message — send new message instead
        await q.message.reply_text(
            vouchers_text(),
            parse_mode="MarkdownV2",
            reply_markup=voucher_app_kb(),
        )
        # Also try to send images
        media_group = []
        for i, (eur, mon) in enumerate(VOUCHER_PRICES.items()):
            img_url = VOUCHER_IMAGES[eur]
            if i == 0:
                media_group.append(InputMediaPhoto(
                    media=img_url,
                    caption=f"🎫 Euro Voucher NFTs — Tap to buy in dApp",
                ))
            else:
                media_group.append(InputMediaPhoto(media=img_url))
        try:
            await q.message.reply_media_group(media=media_group)
        except Exception as e:
            log.warning(f"Media group (button): {e}")

    elif data == "airdrop":
        await q.edit_message_text(
            airdrop_text(),
            parse_mode="MarkdownV2",
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("🎁 Claim FREE Airdrop!", web_app=WebAppInfo(url=VOUCHER_APP))],
                [InlineKeyboardButton("🚀 Buy Voucher NFT",     web_app=WebAppInfo(url=VOUCHER_APP))],
                [InlineKeyboardButton("⬅️ Back", callback_data="back")],
            ]),
        )

    elif data == "swap":
        await q.edit_message_text(
            swap_text(),
            parse_mode="MarkdownV2",
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("⇄ Open Swap in dApp", web_app=WebAppInfo(url=VOUCHER_APP))],
                [InlineKeyboardButton("⬅️ Back", callback_data="back")],
            ]),
        )

    elif data == "help":
        await q.edit_message_text(
            "❓ *Commands*\n\n"
            "/start /buy /stats /price /contracts\n"
            "/tokens /dex /countdown\n"
            "/vouchers /airdrop /swap /help",
            parse_mode="Markdown",
            reply_markup=main_kb(),
        )

# ══════════════════════════════════════════════════════════
# ENTRY POINT
# ══════════════════════════════════════════════════════════
def main():
    app = Application.builder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("start",     start))
    app.add_handler(CommandHandler("help",      help_cmd))
    app.add_handler(CommandHandler("buy",       buy_cmd))
    app.add_handler(CommandHandler("stats",     stats_cmd))
    app.add_handler(CommandHandler("price",     price_cmd))
    app.add_handler(CommandHandler("contract",  contracts_cmd))  # alias
    app.add_handler(CommandHandler("contracts", contracts_cmd))
    app.add_handler(CommandHandler("tokens",    tokens_cmd))
    app.add_handler(CommandHandler("dex",       dex_cmd))
    app.add_handler(CommandHandler("countdown", countdown_cmd))
    app.add_handler(CommandHandler("vouchers",  vouchers_cmd))
    app.add_handler(CommandHandler("airdrop",   airdrop_cmd))
    app.add_handler(CommandHandler("swap",      swap_cmd))
    app.add_handler(CallbackQueryHandler(button))

    log.info("🚀 EUROSPACE + Voucher Bot started")
    log.info("   EUROSPACE App : %s", EUROSPACE_APP)
    log.info("   Voucher dApp  : %s", VOUCHER_APP)
    app.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
