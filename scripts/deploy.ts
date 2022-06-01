import { ethers } from "hardhat";

async function main() {
  const BxlersNFT = await ethers.getContractFactory("BxlersNFT");
  const bxlersNFT = await BxlersNFT.deploy();

  await bxlersNFT.deployed();

  console.log("BxlersNFT deployed to:", bxlersNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
