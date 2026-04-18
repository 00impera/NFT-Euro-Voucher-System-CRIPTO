import { useState, useEffect, useRef } from "react";
import { useActiveAccount } from "thirdweb/react";
import {
  NEAR_API, NEAR_JWT, EURO_CONTRACT,
  getNearIntentsTokens, getNearIntentsQuote, pollSwapStatus,
  encodeERC20Transfer,
} from "../lib/config";
import styles from "./SwapTab.module.css";

const STEP_LABELS = [
  "Quote — deposit address ready",
  "Deposit sent",
  "Processing by market makers",
  "Funds delivered",
];

export default function NearSwapTab() {
  const account = useActiveAccount();

  const [tokens,      setTokens]      = useState([]);
  const [originAsset, setOriginAsset] = useState("");
  const [amount,      setAmount]      = useState("");
  const [quote,       setQuote]       = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [quoteErr,    setQuoteErr]    = useState(null);
  const [sendStatus,  setSendStatus]  = useState(null);
  const [steps,       setSteps]       = useState([0, 0, 0, 0]); // 0=pending 1=active 2=done 3=failed
  const [showTracker, setShowTracker] = useState(false);

  const pollRef = useRef(null);

  useEffect(() => {
    getNearIntentsTokens()
      .then(list => setTokens(
        list.filter(t =>
          ["eth","btc","sol","usdc","usdt","near","bnb","matic","arb"].some(s =>
            t.symbol?.toLowerCase().includes(s)
          )
        )
      ))
      .catch(() => {});
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  function resetSwap() {
    setQuote(null); setQuoteErr(null); setSendStatus(null);
    setSteps([0,0,0,0]); setShowTracker(false);
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  }

  async function handleGetQuote() {
    if (!originAsset || !amount || !account) return;
    setLoading(true); resetSwap();

    try {
      const destAsset   = `nep141:monad-${EURO_CONTRACT.toLowerCase()}.omft.near`;
      const originToken = tokens.find(t => t.assetId === originAsset);
      const decimals    = originToken?.decimals || 18;
      const amountRaw   = BigInt(Math.round(parseFloat(amount) * Math.pow(10, decimals))).toString();

      const q = await getNearIntentsQuote({
        originAsset,
        destinationAsset: destAsset,
        amount: amountRaw,
        recipient: account.address,
      });
      setQuote(q);
      setSteps([2,0,0,0]); // step 1 done
      setShowTracker(true);
    } catch (e) {
      setQuoteErr("Could not fetch quote — try a different token or amount.");
    }
    setLoading(false);
  }

  async function handleSend() {
    if (!quote?.depositAddress || !account) return;
    setSendStatus({ type: "pending", msg: "⏳ Confirm deposit in wallet…" });
    setSteps([2,1,0,0]);

    const originToken = tokens.find(t => t.assetId === originAsset);
    const decimals    = originToken?.decimals || 18;
    const amountBig   = BigInt(Math.round(parseFloat(amount) * Math.pow(10, decimals)));
    const depositAddr = quote.depositAddress;
    const depositMemo = quote.depositMemo || null;

    try {
      let txHash;
      if (originToken?.contractAddress) {
        // ERC-20 transfer
        txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: account.address,
            to: originToken.contractAddress,
            data: encodeERC20Transfer(depositAddr, amountBig),
            value: "0x0",
          }],
        });
      } else {
        // Native ETH / gas token
        txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: account.address,
            to: depositAddr,
            value: "0x" + amountBig.toString(16),
          }],
        });
      }

      setSendStatus({ type: "info", msg: `✅ Deposit sent! TX: ${txHash.slice(0,18)}… Polling for completion…` });
      setSteps([2,2,1,0]);

      // Notify NEAR Intents
      try {
        await fetch(`${NEAR_API}/v0/deposit`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + NEAR_JWT },
          body: JSON.stringify({ depositAddress: depositAddr, txHash }),
        });
      } catch (_) {}

      // Start polling
      startPolling(depositAddr, depositMemo);

    } catch (e) {
      const msg = e.code === 4001 ? "❌ Transaction rejected" : "❌ " + (e.message || "Failed").slice(0, 100);
      setSendStatus({ type: "error", msg });
      setSteps([2,3,0,0]);
    }
  }

  function startPolling(depositAddr, depositMemo) {
    if (pollRef.current) clearInterval(pollRef.current);
    let attempts = 0;
    pollRef.current = setInterval(async () => {
      if (++attempts > 72) {
        clearInterval(pollRef.current); pollRef.current = null;
        setSendStatus({ type: "error", msg: "⏳ Timed out — check NEAR Intents explorer." });
        return;
      }
      try {
        const d = await pollSwapStatus(depositAddr, depositMemo);
        if (!d) return;
        const st = (d.status || "").toUpperCase();
        if (st === "PENDING_DEPOSIT") {
          setSteps([2,1,0,0]);
          setSendStatus({ type: "info", msg: "⟳ Waiting for deposit detection…" });
        } else if (st === "PROCESSING") {
          setSteps([2,2,1,0]);
          setSendStatus({ type: "info", msg: "⚙️ Market makers executing…" });
        } else if (st === "SUCCESS") {
          clearInterval(pollRef.current); pollRef.current = null;
          setSteps([2,2,2,2]);
          setSendStatus({ type: "success", msg: `🎉 SWAP COMPLETE! ${d.amountInFormatted || amount} ${tokens.find(t=>t.assetId===originAsset)?.symbol||""} → ${d.amountOutFormatted || ""} EURO` });
        } else if (st === "REFUNDED") {
          clearInterval(pollRef.current); pollRef.current = null;
          setSteps([2,2,3,3]);
          setSendStatus({ type: "error", msg: "↩ Refunded: " + (d.refundReason || "unknown") });
        } else if (st === "FAILED") {
          clearInterval(pollRef.current); pollRef.current = null;
          setSteps([2,2,3,3]);
          setSendStatus({ type: "error", msg: "❌ Failed: " + (d.errorMessage || "") });
        }
      } catch (_) {}
    }, 5000);
  }

  const originToken = tokens.find(t => t.assetId === originAsset);

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>⬡ Swap → EURO via NEAR Intents</div>

      <div className={styles.partnerBadge}>
        ✅ Partner JWT active — <b>cryptocash-nft</b> · zero extra fees · priority routing
      </div>

      <div className={styles.infoBox}>
        Powered by <strong style={{ color: "var(--near)" }}>NEAR Intents</strong> — swap ETH, BTC, SOL, USDC and more → EURO on Monad.
        Get a quote, then click <strong style={{ color: "var(--accent)" }}>⚡ SEND NOW</strong>.
      </div>

      {!account ? (
        <div className={styles.connectNote}>🔌 Connect wallet to swap</div>
      ) : (
        <>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>From Token</label>
            <select
              className={styles.tokenSelect}
              value={originAsset}
              onChange={e => { setOriginAsset(e.target.value); resetSwap(); }}
            >
              <option value="">Select token…</option>
              {tokens.map(t => (
                <option key={t.assetId} value={t.assetId}>
                  {t.symbol} — {t.blockchain?.toUpperCase() || ""}
                  {t.price ? ` ($${Number(t.price).toFixed(2)})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Amount to Swap</label>
            <div className={styles.inputRow}>
              <input
                className={styles.amtInput}
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={e => { setAmount(e.target.value); resetSwap(); }}
              />
              {originToken && <span className={styles.unit}>{originToken.symbol}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Receive To (EVM Address)</label>
            <input className={styles.amtInput} value={account.address} readOnly style={{ color: "var(--muted)", fontSize: 12 }} />
          </div>

          <button
            className={styles.btnSwap}
            onClick={handleGetQuote}
            disabled={!originAsset || !amount || loading}
          >
            {loading ? "⬡ Fetching Quote…" : "◈ Get Best Quote"}
          </button>

          {quoteErr && <div className={`${styles.statusMsg} ${styles.error}`}>{quoteErr}</div>}

          {/* Quote details */}
          {quote && !quoteErr && (
            <>
              <div className={styles.quoteBox}>
                {[
                  ["You Send",    `${amount} ${originToken?.symbol || ""}`],
                  ["You Receive", quote.amountOutFormatted ? `${quote.amountOutFormatted} EURO` : "—"],
                  ["Slippage",    "1%"],
                  ["Route",       `${originToken?.blockchain?.toUpperCase() || ""} → MONAD`],
                  ["Deadline",    quote.deadline ? new Date(quote.deadline).toLocaleTimeString() : "10 min"],
                ].map(([k, v]) => (
                  <div key={k} className={styles.quoteRow}>
                    <span>{k}</span><span>{v}</span>
                  </div>
                ))}
              </div>

              {quote.depositAddress && (
                <div className={styles.depositBox}>
                  <div className={styles.depositLabel}>📬 DEPOSIT ADDRESS</div>
                  <div className={styles.depositAddr}>{quote.depositAddress}</div>
                  {quote.depositMemo && (
                    <div className={styles.depositMemo}>MEMO: {quote.depositMemo}</div>
                  )}
                  <button className={styles.btnSend} onClick={handleSend} disabled={sendStatus?.type === "pending"}>
                    {sendStatus?.type === "pending" ? "⏳ Sending…" : "⚡ SEND NOW (One-Click)"}
                  </button>
                  <button className={styles.btnOutline} onClick={() => navigator.clipboard.writeText(quote.depositAddress)}>
                    📋 Copy Deposit Address
                  </button>
                </div>
              )}
            </>
          )}

          {sendStatus && (
            <div className={`${styles.statusMsg} ${styles[sendStatus.type]}`}>
              {sendStatus.msg}
            </div>
          )}

          {/* Progress tracker */}
          {showTracker && (
            <div className={styles.tracker}>
              <div className={styles.trackerTitle}>SWAP PROGRESS</div>
              {STEP_LABELS.map((label, i) => {
                const s = steps[i];
                const cls = s === 2 ? styles.stepDone : s === 1 ? styles.stepActive : s === 3 ? styles.stepFailed : styles.stepPending;
                const icon = s === 2 ? "✓" : s === 3 ? "✗" : i + 1;
                return (
                  <div key={i} className={`${styles.step} ${cls}`}>
                    <span className={styles.stepIcon}>{icon}</span>
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      <div className={styles.poweredBy}>
        POWERED BY{" "}
        <a href="https://docs.near-intents.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--near)" }}>
          NEAR INTENTS 1-CLICK API
        </a>{" "}
        · 35+ CHAINS
      </div>
    </div>
  );
}
