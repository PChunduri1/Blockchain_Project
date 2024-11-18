# Decentralized Identity Verification DApp

## Overview
A secure and decentralized solution for identity verification using Ethereum smart contracts and IPFS. This DApp allows users to register and verify their identities securely, ensuring data privacy and integrity on the blockchain.

## Table of Contents
- [About the Project](#about the project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

-[Usage](#usage)
## About the Project
This Decentralized Identity Verification DApp aims to provide a blockchain-based platform for users to securely register and verify their identities. The system leverages Ethereum smart contracts for identity management and IPFS for decentralized file storage, ensuring that user data remains private, tamper-proof, and verifiable.
## Features
- **Decentralized Identity Storage**: User identities are securely stored on the Ethereum blockchain.
- **IPFS Integration**: Sensitive files or metadata are stored on IPFS for distributed and reliable access.
- **Identity Verification**: Smart contracts ensure tamper-proof verification of user data.
- **Web3 Connectivity**: Easy connection with MetaMask for user interaction.
- **User-Friendly Interface**: Simple and intuitive UI for registration, storage, and verification.
## Technologies Used
- **Smart Contracts**: Solidity
- **Blockchain Platform**: Ethereum
- **Frontend**: React.js
- **Backend**: Ethers.js
- **Data Storage**: IPFS, Pinata API
- **Wallet Integration**: MetaMask

Getting Started
### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v14 or later)
- MetaMask browser extension
- npm or yarn
- An Ethereum development environment (Ganache, Hardhat, or Alchemy for testnets)

### Installation

### Clone the Repository
Clone the repository using the following commands:
```bash
git clone https://github.com/PChunduri1/Blockchain-Project.git
cd Blockchain_Project
```
### Install Dependencies
Navigate to your project directory and install the required npm packages:

```bash
npm install
```

### Deploy Your Smart Contract
Run the following command to deploy your ERC-20 token smart contract:

```bash
npx hardhat run scripts/deploy.js --network localhost
```
Ensure that the deployment is successful and take note of the contract address printed in the console.

### Update the DApp Configuration
In your app.js file, update the following variables with your deployed contract address and ABI:

```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace with your contract address
const abi = YOUR_ABI_HERE; // Replace with your contract ABI
REACT_APP_PINATA_API_KEY=your-api-key
REACT_APP_PINATA_SECRET_API_KEY=your-secret-key
REACT_APP_INFURA_PROJECT_ID=your-infura-project-id
```
### Run the Application

```bash
npx start
```

## Usage
- Open the application in your browser: http://localhost:3000.
- Connect your MetaMask wallet.
- Use the Register Identity form to upload your identity data securely.
- Verify your identity via the blockchain and view the associated IPFS hash.
- Retrieve and display your stored identity information from the blockchain.
