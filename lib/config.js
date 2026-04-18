import { createThirdwebClient, defineChain, getContract } from "thirdweb";

export const CLIENT_ID     = "821819db832d1a313ae3b1a62fbeafb7";
export const NEAR_JWT      = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIwMjUtMDEtMTItdjEifQ.eyJ2IjoxLCJrZXlfdHlwZSI6ImRpc3RyaWJ1dGlvbl9jaGFubmVsIiwicGFydG5lcl9pZCI6ImNyeXB0b2Nhc2gtbmZ0IiwiaWF0IjoxNzczMDc3MzExLCJleHAiOjE4MDQ2MTMzMTF9.Wi55S8cwVmAXPtOG0ymr7ldX-5CXVygzuanbjAAJHP-Am14_52C6i4cQG5FvjcAorw0KD8k8JD_YX5AM4QKhNqYtU5gsI4-KKe0KavO5_69NowzUKc_ubtjYn85eFjWskzZQvICMqSZkdGOSnMT_hNEePA8qYi_wSov4a4bQh4zIfNA0znEdDIV3rGI_bDM9dgOk0PnJRIpwi_aXOQ8Q4e50IO2UMrZEDtBVmUhK5-Mno3S_iS7tZl4QSui_4_bNCapQolFwUPB9Zqyxay_6rPVEr7j-8Ez5-htwkR5ZYvTb1mJaj3DVPpWPL9QTxhjvhbJ7nKrWpibcWX3AVoXZ6g";
export const NEAR_API      = "https://1click.chaindefuser.com";

export const NFT_CONTRACT_ADDRESS = "0xa4d064E4ac881234961C076d314Abf9ac8d4E4BB";
export const EURO_CONTRACT        = "0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79";
export const OWNER_ADDRESS        = "0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e";
export const WMOON                = "0x2ce8c8f4961a54b2e87585f4178467006b76b418";

export const MONAD_MAINNET = defineChain({
  id: 143,
  name: "Monad Mainnet",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpc: "https://rpc.monad.xyz",
  blockExplorers: [{ name: "Monad Explorer", url: "https://monad.socialscan.io" }],
});

export const client = createThirdwebClient({ clientId: CLIENT_ID });

export const VOUCHER_PRICES = [
  { euros: 5,   mon: 100  },
  { euros: 10,  mon: 200  },
  { euros: 20,  mon: 300  },
  { euros: 50,  mon: 500  },
  { euros: 100, mon: 1000 },
  { euros: 500, mon: 5000 },
];

export const ALL_PAIRS = [
  { symbol:"EURO",   name:"Meta EuroCoin",  color:"#00ff88", cat:"euro",   pair:"0x9E32FdD909a5BdcCfb874DEE72F24169AfE4eC02", contract:"0x5548D8405F343a6075a46a45CB954bCeB8Ba4E79" },
  { symbol:"mBTC",   name:"Meta Bitcoin",   color:"#F7931A", cat:"meta",   pair:"0x47Dc73D3e1C520056AdF52349A6A282e5262D56d", contract:"0x5078A3531Dba3Dea11AB4aaF641DB6f0fE88579e" },
  { symbol:"mETH",   name:"Meta Ethereum",  color:"#627EEA", cat:"meta",   pair:"0xDE92BC23146222B86e638B6E88E23917eD378a6E", contract:"0x271028A77301bb705C293Bd1fFA79E239AB1Daec" },
  { symbol:"mSOL",   name:"Meta Solana",    color:"#9945FF", cat:"meta",   pair:"0xf8dbc8Cc478506fb0844C670B35b90A7AD6Ad912", contract:"0xEd59c5bA2180ce57a723Dbc04FF3A81e1ba84B3C" },
  { symbol:"mBNB",   name:"Meta BNB",       color:"#F3BA2F", cat:"meta",   pair:"0xd77B55A199EA0DC81EB4c7c36d45fBda4D6477B6", contract:"0xb1326c51F73814f071bb4d3db44c86dD03DC8C76" },
  { symbol:"mXRP",   name:"Meta XRP",       color:"#00AAE4", cat:"meta",   pair:"0x69884c6C8Fe6F833aEEDE2A4c0949e667C7F79fB", contract:"0x379563529988bD76DeD9bc4a175AD59df6191B75" },
  { symbol:"mUSDC",  name:"Meta USDC",      color:"#2775CA", cat:"stable", pair:"0x3BE5B19348d6Ccbc20e0DCF3Cab0aDF9e4643dCa", contract:"0xe0Ed08D1bC86b98434861ae0403be968bD95465E" },
  { symbol:"mUSDT",  name:"Meta Tether",    color:"#26A17B", cat:"stable", pair:"0xAB4CFB051E73db47f75c4A2c31dFaAFd3A82A8b8", contract:"0x085368cae9d4eCffe676806c3a8105433377164b" },
  { symbol:"mMATIC", name:"Meta Polygon",   color:"#8247E5", cat:"meta",   pair:"0x5F5908aD27AFf28b0BDbAD8F93470e83310aE365", contract:"0x43C60d3cec23b0E85678602A4F5C1156a7398daC" },
  { symbol:"mDOGE",  name:"Meta Dogecoin",  color:"#C2A633", cat:"meta",   pair:"0x8e71b96897c6D5EF3954b06636c24EdB4866b488", contract:"0x111b31d8474Aee70767337FD794a7fb0A08788A8" },
  { symbol:"mLTC",   name:"Meta Litecoin",  color:"#a8a8a8", cat:"meta",   pair:"0xd4faf6a3B43105395C1f3db6525eA0fBF5B3aF9a", contract:"0x8abAe4dbf7A2e286d688fa7101bea0fAE4C0Dd75" },
  { symbol:"mTRX",   name:"Meta TRON",      color:"#EF4444", cat:"meta",   pair:"0x77A4Ad2ac41775A543353C8255cd88C7bF58e404", contract:"0x1A3206c56993d4906ec26Fe85194399E0dBD8EBf" },
  { symbol:"mBASE",  name:"Meta Base",      color:"#2563eb", cat:"meta",   pair:"0x9f1b9A6D727DF983a74F11252EDa0Fa96132cc12", contract:"0xeA66DaF739823505817d4DAfEdBb43Dc0C2E5372" },
  { symbol:"mEURO",  name:"Meta Euro",      color:"#3b82f6", cat:"euro",   pair:"0x2f3B240444F5b8Dc6f211373ff29CCE0Ba798114", contract:"0x4443892C796f7A519C9D099417EC8422f88F5867" },
  { symbol:"mMONAD", name:"Meta Monad",     color:"#836EF9", cat:"meta",   pair:"0xc7a8f6A2452D1ec709006E36A3B89f4Df7188a9a", contract:"0xbF5E34B1EBE37F9a98BFcE48645dc67Dd84E5fD6" },
  { symbol:"mEURC",  name:"Meta EURC",      color:"#FFD700", cat:"euro",   pair:"0x669d78953a14a147DA6730dA255b4E7A7b15b111", contract:"0x7bD9bbFc0086B033ede5736e4Aa9C16a451D0904" },
  { symbol:"mCRO",   name:"Meta Cronos",    color:"#60a5fa", cat:"meta",   pair:"0x7D9e8050Ba0c0a6c8336A49a5Af6748AA6BD855C", contract:"0x0127B3c3C864cfC1BB519beB935477299b961d46" },
];

export const NFT_ABI = [
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
  {"inputs":[{"internalType":"uint256","name":"euroValue","type":"uint256"},{"internalType":"string","name":"voucherId","type":"string"}],"name":"purchaseVoucher","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getVoucher","outputs":[{"internalType":"uint256","name":"euroValue","type":"uint256"},{"internalType":"uint256","name":"pricePaidMON","type":"uint256"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"purchaseTimestamp","type":"uint256"},{"internalType":"bool","name":"redeemed","type":"bool"},{"internalType":"string","name":"voucherId","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"euroValue","type":"uint256"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getVouchersByOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"euroValue","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"pricePaid","type":"uint256"},{"indexed":false,"internalType":"string","name":"voucherId","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"VoucherPurchased","type":"event"},
];

export const MONAD_RPCS = ["https://rpc.monad.xyz", "https://monad.drpc.org"];

export async function rpcFetch(method, params) {
  for (const rpc of MONAD_RPCS) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    try {
      const r = await fetch(rpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
        signal: ctrl.signal,
      });
      clearTimeout(t);
      const d = await r.json();
      if (d.result !== undefined) return d.result;
    } catch (e) { clearTimeout(t); }
  }
  return null;
}

export async function fetchPairReserves(pairAddr) {
  try {
    const res = await rpcFetch("eth_call", [{ to: pairAddr, data: "0x0902f1ac" }, "latest"]);
    if (!res || res === "0x" || res.length < 130) return null;
    const r0 = BigInt("0x" + res.slice(2, 66));
    const r1 = BigInt("0x" + res.slice(66, 130));
    if (r0 === 0n || r1 === 0n) return null;
    return { r0, r1 };
  } catch (_) { return null; }
}

export function encodeERC20Transfer(to, amountBigInt) {
  return "0xa9059cbb"
    + to.toLowerCase().replace("0x", "").padStart(64, "0")
    + amountBigInt.toString(16).padStart(64, "0");
}

export function shortAddr(addr) {
  return addr ? addr.slice(0, 6) + "…" + addr.slice(-4) : "";
}

export async function getNearIntentsTokens() {
  const res = await fetch(`${NEAR_API}/v0/tokens`, {
    headers: { Authorization: "Bearer " + NEAR_JWT },
  });
  return res.json();
}

export async function getNearIntentsQuote({ originAsset, destinationAsset, amount, recipient }) {
  const deadline = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const res = await fetch(`${NEAR_API}/v0/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + NEAR_JWT },
    body: JSON.stringify({
      dry: false, swapType: "EXACT_INPUT", slippageTolerance: 100,
      originAsset, depositType: "ORIGIN_CHAIN", destinationAsset, amount,
      recipient, recipientType: "DESTINATION_CHAIN",
      refundTo: recipient, refundType: "ORIGIN_CHAIN", deadline,
    }),
  });
  return res.json();
}

export async function pollSwapStatus(depositAddr, depositMemo) {
  const url = `${NEAR_API}/v0/status/${depositAddr}` + (depositMemo ? `?memo=${encodeURIComponent(depositMemo)}` : "");
  const res = await fetch(url, { headers: { Authorization: "Bearer " + NEAR_JWT } });
  if (!res.ok) return null;
  return res.json();
}
