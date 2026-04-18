import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { client, MONAD_MAINNET, NFT_CONTRACT_ADDRESS, shortAddr } from "../lib/config";
import VoucherTab  from "../components/VoucherTab";
import EvmSwapTab  from "../components/EvmSwapTab";
import NearSwapTab from "../components/NearSwapTab";

const TABS = [
  { id: "voucher",  label: "🎫 NFT Voucher" },
  { id: "evmswap",  label: "⚡ EVM Swap"    },
  { id: "nearswap", label: "🌊 NEAR Swap"   },
];

export default function Home() {
  const [tab, setTab] = useState("voucher");
  const account = useActiveAccount();

  return (
    <>
      {/* Scan line */}
      <div style={{
        position:"fixed",left:0,right:0,height:1,
        background:"linear-gradient(90deg,transparent,#2563eb,#00ff88,transparent)",
        opacity:0.1,animation:"scan 8s linear infinite",pointerEvents:"none",zIndex:1,
      }}/>
      <style>{`@keyframes scan{0%{top:-2px}100%{top:100vh}}`}</style>

      <div style={{ maxWidth:600, margin:"0 auto", padding:"20px 14px 120px", position:"relative", zIndex:2 }}>

        {/* Header */}
        <div style={{ textAlign:"center", padding:"28px 0 18px" }}>
          <img
            src="https://ipfs.io/ipfs/bafybeiaho7h7ysvoxmoqvi7rveh2rcls6rh4weagezoi6umctfpgrgkvp4"
            alt="Logo"
            style={{
              width:90,height:90,borderRadius:"50%",margin:"0 auto 14px",display:"block",
              objectFit:"cover",border:"2px solid #2563eb",
              boxShadow:"0 0 0 4px rgba(37,99,235,0.15),0 0 28px rgba(37,99,235,0.3)",
              animation:"float 4s ease-in-out infinite",
            }}
          />
          <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}`}</style>
          <div style={{
            fontFamily:"'Orbitron',monospace",fontSize:26,fontWeight:900,letterSpacing:4,
            background:"linear-gradient(90deg,#00ff88,#00e5ff,#2563eb)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
          }}>EUROSPACE NFT</div>
          <div style={{ fontSize:10,letterSpacing:3,color:"var(--muted)",textTransform:"uppercase",marginTop:4 }}>
            Euro Voucher System · Monad Blockchain
          </div>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:6,
            background:"var(--card2)",border:"1px solid var(--border)",
            borderRadius:20,padding:"5px 14px",fontSize:10,color:"var(--cyan)",
            marginTop:12,letterSpacing:1,fontFamily:"'Orbitron',monospace",
          }}>
            <span style={{width:6,height:6,background:"var(--accent)",borderRadius:"50%",display:"inline-block",animation:"pulse 2s infinite"}}/>
            MONAD MAINNET · CHAIN ID 143
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(0,255,136,0.4)}50%{opacity:.6;box-shadow:0 0 0 4px rgba(0,255,136,0)}}`}</style>
        </div>

        {/* Connect button */}
        <div style={{ display:"flex",justifyContent:"center",marginBottom:16 }}>
          <ConnectButton
            client={client}
            chain={MONAD_MAINNET}
            theme="dark"
            btnTitle="◈ Connect Wallet"
            connectModal={{
              title: "Connect to EUROSPACE NFT",
              size: "compact",
              welcomeScreen: {
                title: "EUROSPACE NFT",
                subtitle: "Buy Euro Voucher NFTs on Monad",
              },
            }}
            wallets={undefined}
          />
        </div>

        {/* Wallet info bar */}
        {account && (
          <div style={{
            display:"flex",justifyContent:"space-between",alignItems:"center",
            background:"rgba(37,99,235,0.07)",border:"1px solid rgba(37,99,235,0.2)",
            borderRadius:10,padding:"10px 16px",marginBottom:14,fontSize:11,
            flexWrap:"wrap",gap:6,
          }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <span style={{ fontFamily:"monospace",fontSize:12 }}>{shortAddr(account.address)}</span>
              <span style={{
                fontSize:9,background:"rgba(37,99,235,0.15)",border:"1px solid rgba(37,99,235,0.3)",
                borderRadius:4,padding:"2px 8px",color:"#60a5fa",letterSpacing:1,fontWeight:600,
              }}>EVM</span>
            </div>
            <a
              href={`https://monad.socialscan.io/address/${NFT_CONTRACT_ADDRESS}`}
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize:10,color:"#60a5fa",textDecoration:"none" }}
            >
              🔍 Contract ↗
            </a>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display:"flex",justifyContent:"center",gap:6,marginBottom:20,flexWrap:"wrap" }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding:"9px 20px",borderRadius:8,cursor:"pointer",
                fontFamily:"'Orbitron',monospace",fontSize:9,letterSpacing:2,
                textTransform:"uppercase",transition:"all 0.2s",
                background: tab === t.id ? "rgba(37,99,235,0.15)" : "transparent",
                color:       tab === t.id ? "#60a5fa" : "var(--muted)",
                border:      tab === t.id ? "1px solid rgba(37,99,235,0.5)" : "1px solid var(--border)",
                boxShadow:   tab === t.id ? "0 0 20px rgba(37,99,235,0.2)" : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "voucher"  && <VoucherTab  />}
        {tab === "evmswap"  && <EvmSwapTab  />}
        {tab === "nearswap" && <NearSwapTab />}

        {/* Footer */}
        <div style={{ textAlign:"center",padding:"24px 0 50px",fontSize:11,color:"var(--muted)",letterSpacing:1 }}>
          <div style={{
            fontFamily:"'Orbitron',monospace",fontSize:14,fontWeight:700,
            background:"linear-gradient(90deg,var(--accent),var(--cyan),var(--primary))",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",marginBottom:6,
          }}>EUROSPACE</div>
          <div style={{ fontSize:10,color:"var(--muted)" }}>MONAD MAINNET · 2026</div>
          <div style={{ display:"flex",justifyContent:"center",gap:10,marginTop:16,flexWrap:"wrap" }}>
            {[
              { href:"https://x.com/bnbgold277983",                      label:"𝕏 Twitter", color:"#e7e9ea" },
              { href:"https://discord.com/channels/1316093079090106472",  label:"Discord",   color:"#7289da" },
              { href:"https://t.me/eurocoin_monad_bot",                   label:"Telegram",  color:"#29aae1" },
            ].map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                display:"inline-flex",alignItems:"center",gap:6,
                background:"var(--card2)",border:"1px solid var(--border)",
                borderRadius:20,padding:"8px 18px",textDecoration:"none",
                fontSize:12,fontWeight:500,color:s.color,transition:"all .2s",
              }}>{s.label}</a>
            ))}
          </div>
          <div style={{ marginTop:18,fontSize:10,color:"var(--border)",letterSpacing:2 }}>
            © 2026 EUROSPACE · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </>
  );
}
