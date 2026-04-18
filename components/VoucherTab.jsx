import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { getContract, prepareContractCall, toWei } from "thirdweb";
import { client, MONAD_MAINNET, NFT_CONTRACT_ADDRESS, NFT_ABI, VOUCHER_PRICES, MONAD_RPCS } from "../lib/config";
import styles from "./VoucherTab.module.css";

const VOUCHER_IMGS = {
  5:   "https://files.catbox.moe/mszp1d.jpeg",
  10:  "https://files.catbox.moe/otcljk.jpeg",
  20:  "https://files.catbox.moe/c11h9p.jpeg",
  50:  "https://files.catbox.moe/4jezdg.jpeg",
  100: "https://files.catbox.moe/qlf6vq.jpeg",
  500: "https://files.catbox.moe/ir84ab.jpeg",
};

export default function VoucherTab() {
  const account = useActiveAccount();
  const { mutate: sendTx } = useSendTransaction();

  const [selected,   setSelected]   = useState(null);
  const [status,     setStatus]     = useState(null);
  const [readId,     setReadId]     = useState("");
  const [readResult, setReadResult] = useState(null);
  const [readLoading,setReadLoading]= useState(false);

  const nftContract = getContract({
    client, chain: MONAD_MAINNET, address: NFT_CONTRACT_ADDRESS, abi: NFT_ABI,
  });

  async function handleBuy() {
    if (!account || !selected) return;
    setStatus({ type: "pending", msg: "💳 Confirm transaction in your wallet..." });
    const voucherId = `VOC-${Date.now()}-${Math.random().toString(36).slice(2,9).toUpperCase()}`;
    try {
      const tx = prepareContractCall({
        contract: nftContract,
        method: "purchaseVoucher",
        params: [BigInt(selected.euros), voucherId],
        value: toWei(selected.mon.toString()),
      });
      sendTx(tx, {
        onSuccess: (r) => {
          setStatus({ type: "success", msg: `✅ Voucher minted! TX: ${(r.transactionHash||"").slice(0,18)}…` });
          setSelected(null);
        },
        onError: (e) => setStatus({ type: "error", msg: "❌ " + (e?.message || "Transaction failed").slice(0, 100) }),
      });
    } catch (e) {
      setStatus({ type: "error", msg: "❌ " + (e?.message || "Failed").slice(0, 100) });
    }
  }

  async function handleRead() {
    if (!readId || isNaN(readId)) return;
    setReadLoading(true); setReadResult(null);
    try {
      const rpc = MONAD_RPCS[0];
      const sig = "0x9b3f1d19"; // getVoucher(uint256)
      const padded = parseInt(readId).toString(16).padStart(64, "0");
      const res = await fetch(rpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0", id: 1, method: "eth_call",
          params: [{ to: NFT_CONTRACT_ADDRESS, data: sig + padded }, "latest"],
        }),
      });
      const data = await res.json();
      if (!data.result || data.result === "0x") throw new Error("Token not found");
      // Decode: euroValue, pricePaid, buyer(address), timestamp, redeemed(bool), voucherId(string)
      // Simple decode for fixed parts
      const hex = data.result.slice(2);
      const euroValue = parseInt(hex.slice(0,64), 16);
      const priceMON  = BigInt("0x" + hex.slice(64, 128));
      const buyer     = "0x" + hex.slice(88, 128); // address in slot 2 (last 20 bytes)
      const timestamp = parseInt(hex.slice(192, 256), 16);
      const redeemed  = parseInt(hex.slice(256, 320), 16) === 1;
      setReadResult({ euroValue, priceMON: (Number(priceMON) / 1e18).toFixed(4), buyer, timestamp, redeemed });
    } catch (e) {
      setReadResult({ error: e.message || "Token may not exist" });
    }
    setReadLoading(false);
  }

  return (
    <div>
      {/* Voucher grid */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>🎫 Select Voucher Value</div>
        <div className={styles.voucherGrid}>
          {VOUCHER_PRICES.map(v => (
            <button
              key={v.euros}
              className={`${styles.voucherBtn} ${selected?.euros === v.euros ? styles.selected : ""}`}
              onClick={() => setSelected(v)}
              style={{ backgroundImage: `url(${VOUCHER_IMGS[v.euros]})` }}
            >
              <div className={styles.voucherOverlay}>
                <div className={styles.voucherEuro}>{v.euros}€</div>
                <div className={styles.voucherMon}>{v.mon.toLocaleString("en-US")} MON</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Buy button */}
      <div className={styles.card}>
        <button
          className={styles.btnBuy}
          onClick={handleBuy}
          disabled={!account || !selected || status?.type === "pending"}
        >
          {!account
            ? "Connect Wallet First"
            : !selected
            ? "Select a Voucher"
            : status?.type === "pending"
            ? "⏳ Processing…"
            : `◈ Mint ${selected.euros}€ Voucher — ${selected.mon.toLocaleString("en-US")} MON`}
        </button>
        {status && (
          <div className={`${styles.statusMsg} ${styles[status.type]}`}>
            {status.msg}
          </div>
        )}
      </div>

      {/* Read voucher */}
      <div className={styles.card} style={{ borderColor: "rgba(255,0,0,0.4)" }}>
        <div className={styles.cardTitle} style={{ color: "#ff6666" }}>🎁 Token Gift ID Lookup</div>
        <div className={styles.readRow}>
          <input
            className={styles.readInput}
            type="number"
            placeholder="Enter tokenId"
            value={readId}
            onChange={e => setReadId(e.target.value)}
          />
          <button className={styles.btnRead} onClick={handleRead} disabled={readLoading}>
            {readLoading ? "Loading…" : "Read Gift"}
          </button>
        </div>
        {readResult && (
          readResult.error
            ? <div className={`${styles.statusMsg} ${styles.error}`}>❌ {readResult.error}</div>
            : <div className={styles.readResult}>
                <div><b>Euro Value:</b> {readResult.euroValue}€</div>
                <div><b>Price Paid:</b> {readResult.priceMON} MON</div>
                <div><b>Buyer:</b> {readResult.buyer}</div>
                <div><b>Purchase Time:</b> {new Date(readResult.timestamp * 1000).toLocaleString("en-US")}</div>
                <div><b>Redeemed:</b> {readResult.redeemed ? "✅ Yes" : "❌ No"}</div>
              </div>
        )}
      </div>

      {/* Reward pool */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>✨ Reward Token Pool</div>
        <div className={styles.coinRow}>
          {Object.values(VOUCHER_IMGS).map((src, i) => (
            <img key={i} src={src} alt="token" className={styles.coinLogo} />
          ))}
        </div>
      </div>
    </div>
  );
}
