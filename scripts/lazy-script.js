const hre = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();

    const TestLazyMint = await hre.ethers.getContractFactory("TestLazyMint");
    const testLazyMint = await TestLazyMint.deploy("https://dank.ca/");

    await testLazyMint.deployed();

    console.log("TestLazyMint deployed to:", testLazyMint.address);
    console.log("TestLazyMint base uri:", await testLazyMint.baseURI());

    await testLazyMint.mintAndTransfer({tokenId: 0, uri: "{id}.json", supply: 1, creator: owner.getAddress()}, owner.getAddress(), 1);
    console.log("TestLazyMint uri:", await testLazyMint.uri(0));
    console.log("TestLazyMint balance:", await testLazyMint.balanceOf(owner.getAddress(), 0));
    console.log("TestLazyMint creator:", await testLazyMint.getCreator(0));
    console.log("TestLazyMint supply:", await testLazyMint.getSupply(0));
}

// NOTE: This is recommmended to be able to use async/await everywhere
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
