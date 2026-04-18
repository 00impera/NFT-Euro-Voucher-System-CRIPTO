import { useState, useEffect } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { getContract, prepareContractCall, toWei } from "thirdweb";
import { client, MONAD_MAINNET, ALL_PAIRS, WMOON, fetchPairReserves } from "../lib/config";
import styles from "./SwapTab.module.css";

export default function EvmSwapTab() {
  const account = useActiveAccount();
  const { mutate: sendTx } = useSendTransaction();

  const [fromAmt,    setFromAmt]    = useState("");
  const [toToken,    setToToken]    = useState(ALL_PAIRS[0]);
  const [dexPrices,  setDexPrices]  = useState({});
  const [estimate,   setEstimate]   = useState("—");
  const [swapStatus, setSwapStatus] = useState(null);

  // Load DEX prices for all pairs
  useEffect(() => {
    async function loadPrices() {
      const results = {};
      await Promise.all(ALL_PAIRS.map(async (p) => {
        const data = await fetchPairReserves(p.pair);
        if (!data) return;
        const tc = p.contract.toLowerCase();
        results[p.pair] = {
          price: tc < WMOON
            ? Number((data.r1 * 1000000n) / data.r0) / 1000000
            : Number((data.r0 * 1000000n) / data.r1) / 1000000,
        };
      }));
      setDexPrices(results);
    }
    loadPrices();
    const id = setInterval(loadPrices, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!fromAmt || !toToken) { setEstimate("—"); return; }
    const pd = dexPrices[toToken.pair];
    if (!pd) { setEstimate("loading…"); return; }
    const est = (parseFloat(fromAmt) || 0) / pd.price;
    setEstimate(est > 0 ? est.toFixed(4) + " " + toToken.symbol : "—");
  }, [fromAmt, toToken, dexPrices]);

  function handleSwap() {
    if (!account || !fromAmt || !toToken) return;
    setSwapStatus({ type: "pending", msg: "⏳ Confirm in wallet…" });
    const tc = getContract({
      client, chain: MONAD_MAINNET, address: toToken.contract,
      abi: [{ name: "buyTokens", type: "function", inputs: [], outputs: [], stateMutability: "payable" }],
    });
    sendTx(
      prepareContractCall({ contract: tc, method: "buyTokens", params: [], value: toWei(fromAmt) }),
      {
        onSuccess: (r) => {
          setSwapStatus({ type: "success", msg: `✅ Swapped ${fromAmt} MON → ${toToken.symbol}! TX: ${(r.transactionHash||"").slice(0,18)}…` });
          setFromAmt("");
        },
        onError: (e) => setSwapStatus({ type: "error", msg: "❌ " + (e?.message || "Failed").slice(0, 100) }),
      }
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>⚡ EVM Swap — MON → Any Token</div>
      <div className={styles.infoBox}>
        Swap <strong style={{ color: "var(--accent)" }}>MON</strong> into any of the{" "}
        <strong style={{ color: "var(--cyan)" }}>17 Meta Tokens</strong> directly on-chain.
        No router — uses each token's <code className={styles.code}>buyTokens()</code> function.
      </div>

      {!account ? (
        <div className={styles.connectNote}>🔌 Connect wallet to swap</div>
      ) : (
        <>
          <div className={styles.swapRow}>
            {/* From */}
            <div className={styles.fieldWrap}>
              <label className={styles.fieldLabel}>You Pay</label>
              <div className={styles.inputRow}>
                <input
                  className={styles.amtInput}
                  type="number"
                  placeholder="0.0"
                  value={fromAmt}
                  onChange={e => setFromAmt(e.target.value)}
                />
                <span className={styles.unit}>MON</span>
              </div>
            </div>

            <div className={styles.arrow}>→</div>

            {/* To */}
            <div className={styles.fieldWrap}>
              <label className={styles.fieldLabel}>You Get</label>
              <select
                className={styles.tokenSelect}
                value={toToken.symbol}
                onChange={e => setToToken(ALL_PAIRS.find(p => p.symbol === e.target.value))}
              >
                {ALL_PAIRS.map(p => (
                  <option key={p.symbol} value={p.symbol}>{p.symbol} — {p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Info pills */}
          <div className={styles.pill}>
            <span>Estimated Output</span>
            <span style={{ color: "var(--cyan)", fontWeight: 700 }}>{estimate}</span>
          </div>
          {dexPrices[toToken.pair] && (
            <div className={styles.pill}>
              <span>DEX Price</span>
              <span style={{ color: "var(--cyan)", fontWeight: 700 }}>
                {dexPrices[toToken.pair].price.toFixed(6)} WMON/{toToken.symbol}
              </span>
            </div>
          )}

          {/* Token color accent */}
          <button
            className={styles.btnSwap}
            style={{ background: `linear-gradient(135deg, ${toToken.color}99, ${toToken.color})` }}
            onClick={handleSwap}
            disabled={!fromAmt || swapStatus?.type === "pending"}
          >
            {swapStatus?.type === "pending"
              ? "⏳ Swapping…"
              : `⚡ Swap MON → ${toToken.symbol}`}
          </button>

          {swapStatus && (
            <div className={`${styles.statusMsg} ${styles[swapStatus.type]}`}>
              {swapStatus.msg}
            </div>
          )}

          <div className={styles.noteBox}>
            ℹ️ MON is sent directly to the token contract — no approval step, no slippage config needed.
          </div>
        </>
      )}
    </div>
  );
}
