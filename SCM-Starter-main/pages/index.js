import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  // Fetch and connect to the user's wallet
  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Once wallet is set, get a reference to the deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
    setATM(atmContract);
  };

  // Function to add a book
  const addBook = async () => {
    if (atm) {
      const bookName = prompt("Enter the name of the book:");
      const copies = prompt("Enter the number of copies:");
      if (!bookName || !copies) {
        alert("Book name and number of copies are required!");
        return;
      }

      try {
        let tx = await atm.addBook(bookName, parseInt(copies));
        await tx.wait();
        alert(`"${bookName}" added successfully with ${copies} copies!`);
      } catch (err) {
        alert(`Failed to add the book: ${err.message}`);
      }
    }
  };

  const borrowBook = async () => {
    if (atm) {
      const bookName = prompt("Enter the book name to borrow:");
      try {
        let tx = await atm.borrowBook(bookName);
        await tx.wait();
        alert(`You have borrowed "${bookName}" successfully!`);
      } catch (err) {
        alert(`Failed to borrow "${bookName}": ${err.message}`);
      }
    }
  };

  const returnBook = async () => {
    if (atm) {
      const bookName = prompt("Enter the book name to return:");
      try {
        let tx = await atm.returnBook(bookName);
        await tx.wait();
        alert(`You have returned "${bookName}" successfully!`);
      } catch (err) {
        alert(`Failed to return "${bookName}": ${err.message}`);
      }
    }
  };

  const checkCopies = async () => {
    if (atm) {
      const bookName = prompt("Enter the book name to check availability:");
      try {
        const copies = await atm.getAvailableCopies(bookName);
        alert(`Available copies of "${bookName}": ${copies.toNumber()}`);
      } catch (err) {
        alert(`Failed to check availability of "${bookName}": ${err.message}`);
      }
    }
  };

  const initUser = () => {
    // Check if the user has MetaMask
    if (!ethWallet) {
      return <p>Please install MetaMask to use this library system.</p>;
    }

    // Check if the user is connected. If not, prompt to connect
    if (!account) {
      return <button onClick={connectAccount}>Connect MetaMask Wallet</button>;
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <button onClick={addBook}>Add a Book</button>
        <button onClick={borrowBook}>Borrow a Book</button>
        <button onClick={returnBook}>Return a Book</button>
        <button onClick={checkCopies}>Check Book Availability</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Library System!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
