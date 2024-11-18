import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import "./App.css";

const identityVerificationAddress = "0x84ef2711a55D27596020c5fa38fa599B619333e4";
const IdentityVerificationABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "initialOwner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "identityAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "email",
        "type": "string"
      }
    ],
    "name": "IdentityRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "identityAddress",
        "type": "address"
      }
    ],
    "name": "IdentityVerified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_identityAddress",
        "type": "address"
      }
    ],
    "name": "getIdentity",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "identities",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "registerIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_identityAddress",
        "type": "address"
      }
    ],
    "name": "verifyIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const PINATA_API_KEY = "d0361af6724d73c33c65";
const PINATA_SECRET_API_KEY = "9c0ae134ee4433af6a86e7ee748082850ff8a9706b7c251c0269eb5114d65757";
const PINATA_ENDPOINT = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pinataURLs, setPinataURLs] = useState([]);
  const [fetchedIdentities, setFetchedIdentities] = useState([]);

  useEffect(() => {
    const connectMetaMask = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            identityVerificationAddress,
            IdentityVerificationABI,
            signer
          );
          const accounts = await provider.send("eth_accounts", []);
          setAccount(accounts[0]);
          setProvider(provider);
          setSigner(signer);
          setContract(contract);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
          alert("Failed to connect MetaMask");
        }
      } else {
        alert("Please install MetaMask!");
      }
    };

    connectMetaMask();
  }, []);

  async function registerIdentity() {
    if (!contract || !account) {
      alert("Contract or account not initialized");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const transaction = await contract.registerIdentity(name, email);
      await transaction.wait();

      console.log(
        `Identity registered for account: ${account} with name: ${name} and email: ${email}`
      );
      alert("Identity registered successfully!");
      uploadIdentityToIPFS();
    } catch (error) {
      console.error("Error registering identity:", error.message);
      setError("Failed to register identity: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function uploadIdentityToIPFS() {
    if (!name || !email) {
      alert("Please register identity with valid name and email.");
      return;
    }

    const identityData = {
      name: name,
      email: email,
      account: account,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(PINATA_ENDPOINT, identityData, {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      });

      const hash = response.data.IpfsHash;
      const url = `https://gateway.pinata.cloud/ipfs/${hash}`;
      setPinataURLs((prevURLs) => [...prevURLs, url]); // Add to list of URLs
      alert("Identity data uploaded to Pinata successfully! URL: " + url);
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      setError("Failed to upload to Pinata: " + error.message);
    } finally {
      setLoading(false);
    }
  }
  const verifyIdentity = async () => {
    setLoading(true);
    try {
      const tx = await contract.verifyIdentity(account);
      await tx.wait();
      alert("Identity verified successfully!");
    } catch (error) {
      alert("Verification failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchAllIdentitiesFromIPFS = async () => {
    setLoading(true);
    setError(null);
    setFetchedIdentities([]);

    try {
      const identities = await Promise.all(
        pinataURLs.map(async (url) => {
          const response = await axios.get(url);
          return response.data;
        })
      );
      setFetchedIdentities(identities);
    } catch (error) {
      console.error("Error fetching data from IPFS:", error);
      setError("Failed to fetch data from IPFS: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App-container">
      <h1>Decentralized Identity Verification</h1>
      <p>Connected Account: {account ? account : "Not connected"}</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="App-form">
        <h3>Register Identity</h3>
        <input
          className="App-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="App-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="App-button" onClick={registerIdentity} disabled={loading}>
          Register and Store on IPFS
        </button>
      </div>

      {pinataURLs.length > 0 && (
        <div className="App-form">
          <h3>IPFS Data URLs</h3>
          {pinataURLs.map((url, index) => (
            <div key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="App-form">
        <h2>Verify Identity</h2>
        <button className="App-button" onClick={verifyIdentity} disabled={loading}>
          Verify Identity
        </button>
        <h3>Fetch All Identities from IPFS</h3>
        <button className="App-button" onClick={fetchAllIdentitiesFromIPFS} disabled={loading}>
          Fetch All Data
        </button>
      </div>

      {fetchedIdentities.length > 0 && (
        <div className="App-form">
          <h3>Fetched Identities</h3>
          {fetchedIdentities.map((identity, index) => (
            <div key={index}>
              <p><strong>User {index + 1}</strong></p>
              <p>Name: {identity.name}</p>
              <p>Email: {identity.email}</p>
              <p>Account: {identity.account}</p>
              <hr />
            </div>
          ))}
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;