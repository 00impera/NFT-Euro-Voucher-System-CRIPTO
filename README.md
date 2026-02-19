# 🎫 Euro Voucher NFT System on Monad Blockchain

<p align="center">
  <img src="https://files.catbox.moe/qlf6vq.jpeg" alt="Euro Voucher NFT" width="300"/>
</p>

A decentralized application (dApp) for purchasing, managing, and redeeming Euro-denominated vouchers as NFTs on the Monad blockchain.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Euro Banknote Gallery](#euro-banknote-gallery)
- [Features](#features)
- [Live Demo](#live-demo)
- [Smart Contract](#smart-contract)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contract Functions](#smart-contract-functions)
- [NFT Metadata](#nft-metadata)
- [Tech Stack](#tech-stack)
- [License](#license)

---

## 🌟 Overview

The Euro Voucher NFT System allows users to:
- Purchase Euro-denominated vouchers (5€, 10€, 20€, 50€, 100€, 500€) using MON tokens
- Receive ERC-721 NFTs representing their vouchers
- Transfer vouchers between wallets
- Redeem vouchers when needed
- Track purchase history and timestamps

Each NFT voucher contains:
- Euro value
- Purchase price in MON
- Unique voucher ID
- Purchase timestamp
- Redemption status
- Beautiful euro banknote imagery

---

## 💶 Euro Banknote Gallery

<p align="center">
  <img src="https://files.catbox.moe/mszp1d.jpeg" alt="5 Euro" width="200"/>
  <img src="https://files.catbox.moe/otcljk.jpeg" alt="10 Euro" width="200"/>
  <img src="https://files.catbox.moe/c11h9p.jpeg" alt="20 Euro" width="200"/>
</p>

<p align="center">
  <img src="https://files.catbox.moe/4jezdg.jpeg" alt="50 Euro" width="200"/>
  <img src="https://files.catbox.moe/qlf6vq.jpeg" alt="100 Euro" width="200"/>
  <img src="https://files.catbox.moe/ir84ab.jpeg" alt="500 Euro" width="200"/>
</p>

### Available Denominations

| Denomination | Image | Price (MON) |
|--------------|-------|-------------|
| 5€ | <img src="https://files.catbox.moe/mszp1d.jpeg" width="80"/> | 100 MON |
| 10€ | <img src="https://files.catbox.moe/otcljk.jpeg" width="80"/> | 200 MON |
| 20€ | <img src="https://files.catbox.moe/c11h9p.jpeg" width="80"/> | 300 MON |
| 50€ | <img src="https://files.catbox.moe/4jezdg.jpeg" width="80"/> | 500 MON |
| 100€ | <img src="https://files.catbox.moe/qlf6vq.jpeg" width="80"/> | 1,000 MON |
| 500€ | <img src="https://files.catbox.moe/ir84ab.jpeg" width="80"/> | 5,000 MON |

---

## ✨ Features

### 🎨 **Frontend Features**
- ✅ MetaMask wallet connection
- ✅ Automatic Monad network detection/switching
- ✅ Visual voucher selection (6 denominations)
- ✅ Real-time transaction status
- ✅ Voucher details reader
- ✅ Responsive neon-themed UI
- ✅ Euro banknote images on each voucher

### 🔐 **Smart Contract Features**
- ✅ ERC-721 compliant NFTs
- ✅ Dynamic pricing system
- ✅ Ownership tracking
- ✅ Redemption mechanism
- ✅ Transfer functionality
- ✅ Owner-only admin functions
- ✅ Event emission for tracking

### 🖼️ **NFT Features**
- ✅ On-chain metadata
- ✅ Unique voucher IDs
- ✅ Purchase timestamps
- ✅ Euro banknote images
- ✅ QR code data support

---

## 🌐 Live Demo

**Frontend:** [https://euro-voucher-frontend.vercel.app](https://euro-voucher-frontend.vercel.app)

**Metadata API:** [https://euro-voucher-metadata.vercel.app](https://euro-voucher-metadata.vercel.app)

**Explorer:** [View Contract on Monad Explorer](https://explorer.monad.xyz/address/0xa4d064E4ac881234961C076d314Abf9ac8d4E4BB)

---

## 📜 Smart Contract
const VAULT_ADDRESS = `0xE00454506f50ac31A0b87324513e28f77Db2a8F9`
const SWAP_ROUTER_ADDRESS = `0x334cf8898EecCC0B98420E6910A3ae83A00b32e0`
**Contract Address:** `0xa4d064E4ac881234961C076d314Abf9ac8d4E4BB`

**Network:** Monad Mainnet (Chain ID: 143)

**Token Standard:** ERC-721

**Name:** Euro Voucher NFT

**Symbol:** EVNFT

---

## 🏗️ Architecture

```
┌─────────────────┐
│   User Wallet   │
│   (MetaMask)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐      ┌──────────────────┐
│    Frontend     │─────→│ Smart Contract   │
│   (Vercel)      │      │   (Monad Chain)  │
└─────────────────┘      └────────┬─────────┘
                                  │
                                  ↓
                         ┌──────────────────┐
                         │  Metadata API    │
                         │   (Vercel)       │
                         └──────────────────┘
```

### **Components:**

1. **Frontend (HTML/JS/Tailwind)**
   - User interface for buying/reading vouchers
   - Web3.js integration for blockchain interaction
   - Deployed on Vercel

2. **Smart Contract (Solidity)**
   - ERC-721 NFT implementation
   - Voucher logic and state management
   - Deployed on Monad blockchain

3. **Metadata API (Node.js/Express)**
   - Serves NFT metadata (JSON)
   - Returns euro banknote images
   - OpenSea-compatible format

---

## 🚀 Installation

### Prerequisites
- Node.js v16+
- MetaMask browser extension
- Git

### Clone Repository
```bash
git clone https://github.com/yourusername/euro-voucher-nft.git
cd euro-voucher-nft
```

### Frontend Setup
```bash
cd frontend
# No build required - it's a static HTML file
# Just open index.html in browser or deploy to Vercel
vercel --prod
```

### Metadata API Setup
```bash
cd metadata-api
npm install
npm start

# Or deploy to Vercel
vercel --prod
```

---

## 📖 Usage

### 1. **Connect Wallet**
<img src="https://files.catbox.moe/mszp1d.jpeg" width="60" align="left"/>

- Click "CONNECT TO MONAD"
- Approve MetaMask connection
- Switch to Monad network if needed

<br clear="left"/>

### 2. **Purchase Voucher**
<img src="https://files.catbox.moe/4jezdg.jpeg" width="60" align="left"/>

- Select denomination (5€ - 500€)
- Click "BUY" button
- Confirm transaction in MetaMask
- Receive NFT in your wallet

<br clear="left"/>

### 3. **Read Voucher**
<img src="https://files.catbox.moe/qlf6vq.jpeg" width="60" align="left"/>

- Enter Token ID
- Click "Read Voucher"
- View all voucher details

<br clear="left"/>

### 4. **Transfer Voucher**
- Use MetaMask to send NFT
- Or call `transferFrom()` function

### 5. **Redeem Voucher**
- Call `redeemVoucher(tokenId)` when ready to use

---

## 🔧 Smart Contract Functions

### **📖 Read Functions (View)**

#### `getVoucher(uint256 tokenId)`
<img src="https://files.catbox.moe/otcljk.jpeg" width="40" align="right"/>

Get complete voucher information.

**Returns:**
- `euroValue` - Denomination (5, 10, 20, 50, 100, 500)
- `pricePaidMON` - Price paid in MON (wei)
- `buyer` - Wallet address of purchaser
- `purchaseTimestamp` - Unix timestamp
- `redeemed` - Redemption status (bool)
- `voucherId` - Unique voucher ID string

**Example:**
```javascript
const voucher = await contract.methods.getVoucher(1).call();
console.log(voucher);
// Output: [50, "500000000000000000000", "0xABC...", 1737380000, false, "VOC-123"]
```

---

#### `getPrice(uint256 euroValue)`
Get current price for a denomination.

**Parameters:**
- `euroValue` - Euro denomination (5, 10, 20, 50, 100, 500)

**Returns:**
- `price` - Price in MON (wei)

**Example:**
```javascript
const price = await contract.methods.getPrice(50).call();
console.log(web3.utils.fromWei(price, 'ether')); // "500"
```

---

#### `getVouchersByOwner(address owner)`
Get all token IDs owned by an address.

**Parameters:**
- `owner` - Wallet address

**Returns:**
- `uint256[]` - Array of token IDs

**Example:**
```javascript
const tokens = await contract.methods.getVouchersByOwner("0xYourAddress").call();
console.log(tokens); // [1, 5, 12, 25]
```

---

#### `balanceOf(address owner)`
Get number of vouchers owned by address.

**Example:**
```javascript
const balance = await contract.methods.balanceOf("0xYourAddress").call();
console.log(balance); // 4
```

---

#### `ownerOf(uint256 tokenId)`
Get owner of a specific token.

**Example:**
```javascript
const owner = await contract.methods.ownerOf(1).call();
console.log(owner); // "0xABC..."
```

---

#### `isVoucherValid(uint256 tokenId)`
Check if voucher exists and is not redeemed.

**Returns:**
- `bool` - True if valid and unredeemed

**Example:**
```javascript
const valid = await contract.methods.isVoucherValid(1).call();
console.log(valid); // true
```

---

#### `getQRCodeData(uint256 tokenId)`
Get QR code data string for voucher.

**Returns:**
- `string` - QR code data

**Example:**
```javascript
const qr = await contract.methods.getQRCodeData(1).call();
console.log(qr); // "EURO_VOUCHER:1:50:VOC-123..."
```

---

#### `getVoucherStats(uint256 euroValue)`
Get statistics for a denomination.

**Returns:**
- `totalMinted` - Total vouchers of this value
- `currentPrice` - Current price in MON

**Example:**
```javascript
const stats = await contract.methods.getVoucherStats(50).call();
console.log(stats); // [15, "500000000000000000000"]
```

---

#### `tokenURI(uint256 tokenId)`
Get metadata URI for NFT (OpenSea compatible).

**Returns:**
- `string` - Metadata URL

**Example:**
```javascript
const uri = await contract.methods.tokenURI(1).call();
console.log(uri); 
// "https://euro-voucher-metadata.vercel.app/metadata/1"
```

---

#### `totalSupply()`
Get total number of vouchers minted.

**Example:**
```javascript
const supply = await contract.methods.totalSupply().call();
console.log(supply); // 42
```

---

#### `getContractBalance()`
Get contract's MON balance.

**Example:**
```javascript
const balance = await contract.methods.getContractBalance().call();
console.log(web3.utils.fromWei(balance, 'ether')); // "5000"
```

---

### **✍️ Write Functions (Payable/Nonpayable)**

#### `purchaseVoucher(uint256 euroValue, string voucherId)` 💰
<img src="https://files.catbox.moe/ir84ab.jpeg" width="50" align="right"/>

Purchase a new voucher NFT.

**Parameters:**
- `euroValue` - Denomination (5, 10, 20, 50, 100, 500)
- `voucherId` - Unique voucher ID string

**Payable:** Must send exact MON amount

**Example:**
```javascript
const price = await contract.methods.getPrice(50).call();
await contract.methods.purchaseVoucher(50, "VOC-123").send({
  from: userAddress,
  value: price
});
```

---

#### `redeemVoucher(uint256 tokenId)`
Mark voucher as redeemed (only owner can redeem).

**Example:**
```javascript
await contract.methods.redeemVoucher(1).send({ from: userAddress });
```

---

#### `transferFrom(address from, address to, uint256 tokenId)`
Transfer voucher to another wallet.

**Example:**
```javascript
await contract.methods.transferFrom(
  userAddress,
  "0xRecipient...",
  1
).send({ from: userAddress });
```

---

#### `safeTransferFrom(address from, address to, uint256 tokenId)`
Safely transfer voucher (checks if recipient can receive NFTs).

**Example:**
```javascript
await contract.methods.safeTransferFrom(
  userAddress,
  "0xRecipient...",
  1
).send({ from: userAddress });
```

---

#### `approve(address to, uint256 tokenId)`
Approve another address to transfer your voucher.

**Example:**
```javascript
await contract.methods.approve("0xSpender...", 1).send({ 
  from: userAddress 
});
```

---

#### `setApprovalForAll(address operator, bool approved)`
Approve/revoke operator to manage all your vouchers.

**Example:**
```javascript
await contract.methods.setApprovalForAll("0xOperator...", true).send({
  from: userAddress
});
```

---

### **👑 Owner-Only Functions**

#### `updatePrice(uint256 euroValue, uint256 newPrice)`
Update price for a denomination.

**Example:**
```javascript
await contract.methods.updatePrice(50, web3.utils.toWei("600", "ether")).send({
  from: ownerAddress
});
```

---

#### `withdraw()`
Withdraw all contract balance to owner.

**Example:**
```javascript
await contract.methods.withdraw().send({ from: ownerAddress });
```

---

#### `withdrawTo(address payable to, uint256 amount)`
Withdraw specific amount to address.

**Example:**
```javascript
await contract.methods.withdrawTo(
  "0xRecipient...",
  web3.utils.toWei("1000", "ether")
).send({ from: ownerAddress });
```

---

#### `transferOwnership(address newOwner)`
Transfer contract ownership.

**Example:**
```javascript
await contract.methods.transferOwnership("0xNewOwner...").send({
  from: ownerAddress
});
```

---

## 🎨 NFT Metadata

### **Metadata Structure**

```json
{
  "name": "Euro Voucher - 50€",
  "description": "A 50 Euro voucher NFT on Monad blockchain. Purchase Date: 1/20/2026. Status: Active",
  "image": "https://files.catbox.moe/4jezdg.jpeg",
  "attributes": [
    {
      "trait_type": "Euro Value",
      "value": 50
    },
    {
      "trait_type": "Price Paid (MON)",
      "value": 500
    },
    {
      "trait_type": "Status",
      "value": "Active"
    },
    {
      "trait_type": "Purchase Date",
      "value": "2026-01-20"
    },
    {
      "trait_type": "Voucher ID",
      "value": "VOC-1737380000-XYZ123"
    }
  ]
}
```

### **Euro Banknote Images**

| Denomination | Preview | Image URL |
|--------------|---------|-----------|
| 5€ | <img src="https://files.catbox.moe/mszp1d.jpeg" width="100"/> | https://files.catbox.moe/mszp1d.jpeg |
| 10€ | <img src="https://files.catbox.moe/otcljk.jpeg" width="100"/> | https://files.catbox.moe/otcljk.jpeg |
| 20€ | <img src="https://files.catbox.moe/c11h9p.jpeg" width="100"/> | https://files.catbox.moe/c11h9p.jpeg |
| 50€ | <img src="https://files.catbox.moe/4jezdg.jpeg" width="100"/> | https://files.catbox.moe/4jezdg.jpeg |
| 100€ | <img src="https://files.catbox.moe/qlf6vq.jpeg" width="100"/> | https://files.catbox.moe/qlf6vq.jpeg |
| 500€ | <img src="https://files.catbox.moe/ir84ab.jpeg" width="100"/> | https://files.catbox.moe/ir84ab.jpeg |

---

## 🎯 Events

The contract emits these events for tracking:

### `VoucherPurchased`
```solidity
event VoucherPurchased(
    uint256 indexed tokenId,
    address indexed buyer,
    uint256 euroValue,
    uint256 pricePaid,
    string voucherId,
    uint256 timestamp
);
```

### `VoucherRedeemed`
```solidity
event VoucherRedeemed(
    uint256 indexed tokenId,
    address indexed redeemer,
    uint256 euroValue,
    uint256 timestamp
);
```

### `VoucherTransferred`
```solidity
event VoucherTransferred(
    uint256 indexed tokenId,
    address indexed from,
    address indexed to,
    uint256 timestamp
);
```

### `PriceUpdated`
```solidity
event PriceUpdated(
    uint256 euroValue,
    uint256 oldPrice,
    uint256 newPrice
);
```

---

## 💻 Tech Stack

### **Frontend**
- HTML5
- JavaScript (ES6+)
- Tailwind CSS
- Web3.js v1.10.4
- JetBrains Mono Font

### **Smart Contract**
- Solidity ^0.8.20
- OpenZeppelin Contracts
- ERC-721 Standard
- Ownable Pattern

### **Backend**
- Node.js
- Express.js
- CORS enabled

### **Deployment**
- Vercel (Frontend & API)
- Monad Blockchain (Smart Contract)

### **Tools**
- MetaMask
- Remix IDE
- Monad Explorer

---

## 📊 Pricing Structure

| Euro Value | Preview | Price (MON) | Wei Value |
|------------|---------|-------------|-----------|
| 5€ | <img src="https://files.catbox.moe/mszp1d.jpeg" width="60"/> | 100 MON | 100000000000000000000 |
| 10€ | <img src="https://files.catbox.moe/otcljk.jpeg" width="60"/> | 200 MON | 200000000000000000000 |
| 20€ | <img src="https://files.catbox.moe/c11h9p.jpeg" width="60"/> | 300 MON | 300000000000000000000 |
| 50€ | <img src="https://files.catbox.moe/4jezdg.jpeg" width="60"/> | 500 MON | 500000000000000000000 |
| 100€ | <img src="https://files.catbox.moe/qlf6vq.jpeg" width="60"/> | 1,000 MON | 1000000000000000000000 |
| 500€ | <img src="https://files.catbox.moe/ir84ab.jpeg" width="60"/> | 5,000 MON | 5000000000000000000000 |

---

## 🔒 Security Features

- ✅ Reentrancy protection
- ✅ Owner-only admin functions
- ✅ Duplicate voucher ID prevention
- ✅ Valid denomination checking
- ✅ Ownership verification
- ✅ Safe transfer checks
- ✅ Event emission for tracking

---

## 🛣️ Roadmap

- [ ] Add voucher expiration dates
- [ ] Implement bulk purchase discounts
- [ ] Create voucher marketplace
- [ ] Add voucher gifting feature
- [ ] Mobile app integration
- [ ] Multi-chain support
- [ ] Voucher redemption portal
- [ ] Analytics dashboard

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Project Maintainer:** Impera
const VAULT_ADDRESS = `0xE00454506f50ac31A0b87324513e28f77Db2a8F9`
const SWAP_ROUTER_ADDRESS = `0x334cf8898EecCC0B98420E6910A3ae83A00b32e0`
**Contract Address:** `0xa4d064E4ac881234961C076d314Abf9ac8d4E4BB`

**Frontend:** https://euro-voucher-frontend.vercel.app

**Metadata API:** https://euro-voucher-metadata.vercel.app

---

## 🙏 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Monad blockchain for fast, low-cost transactions
- Vercel for reliable hosting
- MetaMask for wallet integration
- European Central Bank for euro banknote designs

---

## ⚠️ Disclaimer

This is an experimental project. Always do your own research before interacting with smart contracts. The developers are not responsible for any losses incurred through the use of this system.

---

<p align="center">
  <img src="https://files.catbox.moe/mszp1d.jpeg" width="80"/>
  <img src="https://files.catbox.moe/otcljk.jpeg" width="80"/>
  <img src="https://files.catbox.moe/c11h9p.jpeg" width="80"/>
  <img src="https://files.catbox.moe/4jezdg.jpeg" width="80"/>
  <img src="https://files.catbox.moe/qlf6vq.jpeg" width="80"/>
  <img src="https://files.catbox.moe/ir84ab.jpeg" width="80"/>
</p>

<p align="center">
  <strong>Built with ❤️ on Monad Blockchain</strong> 🚀
</p>
