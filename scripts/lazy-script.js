const hre = require("hardhat");

async function main() {
  const [owner01, owner02, owner03, person04] = await ethers.getSigners();
  console.log("owner01.getAddress():", await owner01.getAddress());
  console.log("owner01.address:", await owner01.address);

  const TestLazyMint = await hre.ethers.getContractFactory("TestLazyMint");
  const testLazyMint = await TestLazyMint.deploy("https://dank.ca/");

  await testLazyMint.deployed();

  console.log("TestLazyMint deployed to:", testLazyMint.address);
  console.log("TestLazyMint base uri:", await testLazyMint.baseURI());

  owner01Addr = await owner01.getAddress();
  tokenId = ethers.BigNumber.from(owner01Addr + "000000000000000000000000");

  await testLazyMint.mintAndTransfer(
    {
      tokenId: tokenId,
      uri: "{id}.json",
      supply: 2,
      creators: [{ account: owner01.getAddress(), value: 10000 }],
      royalties: [{ account: owner01.getAddress(), value: 10000 }],
      signatures: [],
    },
    person04.getAddress(),
    1
  );
  console.log("TestLazyMint uri:", await testLazyMint.uri(0));
  console.log(
    "TestLazyMint balance:",
    await testLazyMint.balanceOf(owner01.getAddress(), 0)
  );
  console.log("TestLazyMint creator:", await testLazyMint.getCreator(0));
  console.log("TestLazyMint supply:", await testLazyMint.getSupply(0));
}

// NOTE: This is recommmended to be able to use async/await everywhere
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
