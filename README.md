# Smart-Contract-Management

This project is a decentralized application (DApp) for a library system that uses Ethereum smart contracts. Users can borrow and return books, check availability, and the librarian (contract owner) can add new books.

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Setup](#setup)
4. [Smart Contract Deployment](#smart-contract-deployment)
5. [Running the Frontend](#running-the-frontend)
6. [Usage Instructions](#usage-instructions)
7. [Example Scenarios](#example-scenarios)

---

## Features

- **Users:**
  - Borrow a book.
  - Return a book.
  - Check availability of books.

- **Librarian (Owner):**
  - Add new books to the library.
  - Manage the system via MetaMask wallet.

---

## Requirements

1. [Node.js](https://nodejs.org/) (v16 or higher)
2. [Hardhat](https://hardhat.org/)
3. [MetaMask](https://metamask.io/) extension installed in your browser
4. An Ethereum wallet for testing (via Hardhat or MetaMask)

---

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repository/blockchain-library-system.git
   cd blockchain-library-system
Install dependencies:

bash
Copy code
npm install
Compile the smart contracts:

bash
Copy code
npx hardhat compile
Smart Contract Deployment
Start the Hardhat network:

bash
Copy code
npx hardhat node
Deploy the contract:

bash
Copy code
npx hardhat run scripts/deploy.js --network localhost
Note the deployed contract address from the terminal output. Update the contractAddress variable in index.js with this address:

javascript
Copy code
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
Running the Frontend
Start the development server:

bash
Copy code
npm run dev
Open the application in your browser at:

arduino
Copy code
http://localhost:3000
Usage Instructions
Librarian (Contract Owner)
Connect your MetaMask wallet.
Use the "Add a Book" button to:
Enter the book's name.
Specify the number of available copies.
Users
Connect your MetaMask wallet.
Use the following actions:
Borrow a Book: Provide the book's name to borrow a copy.
Return a Book: Return a book by its name.
Check Availability: See the number of available copies for a book.
Example Scenarios
Adding a Book
As the contract owner, click "Add a Book".
Enter:
Book Name: The Great Gatsby
Copies: 5
Click OK. The book is now available for users to borrow.
Borrowing a Book
A user clicks "Borrow a Book".
Enters the book name: The Great Gatsby.
If available, the user successfully borrows the book, and the number of copies decreases by 1.
Returning a Book
A user clicks "Return a Book".
Enters the book name: The Great Gatsby.
The system increments the available copies by 1.
Checking Availability
A user clicks "Check Book Availability".
Enters the book name: The Great Gatsby.
The system displays the number of available copies.
Notes
Only the librarian (contract owner) can add books.
MetaMask is required for all interactions with the system.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Troubleshooting
MetaMask Not Detected: Ensure MetaMask is installed and enabled in your browser.
Transaction Fails: Verify you are connected to the correct network and have sufficient funds for gas fees.
markdown
Copy code

### Instructions for Use
- Copy the above content into a `README.md` file in the root directory of your project.
- Replace placeholder fields like `YOUR_CONTRACT_ADDRESS_HERE` with actual values.
