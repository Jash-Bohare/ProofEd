# ProofEd 🎓

**Blockchain-Based Certificate Issuance & Verification System**

ProofEd is a decentralized platform that enables **universities to issue tamper-proof digital certificates** and allows **anyone to verify their authenticity** using blockchain technology.

This system eliminates fake certificates, ensures immutability, and provides public, trustless verification via QR codes and blockchain records.

---

## 🚀 Problem Statement

Traditional academic certificates:

* Are **easy to forge**
* Require **manual verification**
* Depend on **centralized authorities**
* Lack public, transparent verification

Employers and institutions cannot instantly verify whether a certificate is genuine.

---

## 💡 Solution

ProofEd solves this by:

* Issuing certificates with **cryptographic hashes**
* Storing proofs **on the blockchain**
* Linking certificates to **verified universities**
* Providing **QR-code based public verification**

Once issued, certificates **cannot be altered or forged**.

---

## 🧠 Core Features

### 👨‍🏫 University Onboarding

* Institutional email verification (OTP-based)
* Admin approval required
* Wallet binding (MetaMask)

### 🧑‍💼 Admin Panel

* Approve / reject university registrations
* Full control over trusted issuers

### 📜 Certificate Issuance

* University fills certificate details
* Deterministic hash generation
* Hash written on blockchain
* Metadata stored securely in database
* QR code generated for verification

### 🔍 Public Certificate Verification

* Scan QR or open verification link
* Fetch certificate from database
* Recompute hash
* Validate existence on blockchain
* Show **VALID / INVALID** status

---

## 🏗️ System Architecture

```
University Dashboard (React)
        |
        |  Certificate Metadata
        v
Backend API (Node.js + Express)
        |
        |  keccak256 Hash
        v
Blockchain (Ethereum / Sepolia)
        |
        |  Transaction Hash
        v
Database (MongoDB)
```

Verification Flow:

```
QR Code → Verification Page → DB Fetch → Hash Recompute → Blockchain Read
```

---

## 🔐 Why Blockchain?

* **Immutability**: Once issued, certificates cannot be changed
* **Trustless Verification**: No central authority needed
* **Public Proof**: Anyone can verify using blockchain explorers
* **Ownership**: Certificates belong to students forever

---

## 🧰 Tech Stack

### Frontend

* React.js
* React Router
* Ethers.js
* QRCode Generator
* Modern minimalist UI (inline styling)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Nodemailer (OTP verification)

### Blockchain

* Solidity Smart Contract
* Ethereum (Sepolia Testnet)
* Alchemy RPC
* MetaMask Wallet

---

## ⚙️ Environment Variables

### Backend (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ProofEd.git
cd ProofEd
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Expected output:

```
MongoDB connected successfully
Server running on port 5000
```

---

### 3️⃣ Create Admin Account

```bash
cd src/scripts
node createAdmin.js
```

---

### 4️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🧪 How to Use (End-to-End Flow)

### Admin

1. Login as Admin
2. View pending universities
3. Approve or reject registrations

### University

1. Signup with institutional email
2. Verify OTP
3. Connect MetaMask wallet
4. Wait for admin approval
5. Issue certificates

### Verifier (Public)

1. Scan QR code
2. View certificate details
3. See blockchain verification result

---

## ✅ Verification Logic

A certificate is **VALID** only if:

* Hash recomputed from DB matches stored hash
* Hash exists on blockchain
* Issuer is an approved university

Otherwise → **INVALID**

---

## 🎯 Judge Value Proposition

* **Immutability**: Blockchain-backed proof
* **Ownership**: Certificates controlled by issuer & student
* **Transparency**: Public verification
* **Scalability**: Can batch issue certificates
* **Real-World Use Case**: Education, hiring, credentials

---

## 🔮 Future Enhancements

* Batch certificate issuance
* Layer-2 support (Polygon)
* IPFS-based certificate PDFs
* Student wallets & profiles
* Revocation support
* Mobile-first UI

---

## 👨‍💻 Team Shippers

Jash Bohare: Blockchain Dev + Integration <br>
Krrish Devani: Backend Dev
