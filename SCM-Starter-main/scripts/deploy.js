// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy();
  await assessment.deployed();

  console.log(`Library contract deployed to ${assessment.address}`);

  const addBooks = async () => {
    await assessment.addBook("The Great Gatsby", 5);
    await assessment.addBook("1984", 3);
    await assessment.addBook("To Kill a Mockingbird", 4);
  };

  await addBooks();
  console.log("Library initialized with books.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
