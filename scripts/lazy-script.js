const hre = require("hardhat");

const Mint1155DataType = {
  Part: [
    { name: "account", type: "address" },
    { name: "value", type: "uint96" },
  ],
  Mint1155Data: [
    { name: "tokenId", type: "uint" },
    { name: "uri", type: "string" },
    { name: "supply", type: "uint" },
    { name: "creators", type: "Part[]" },
    { name: "royalties", type: "Part[]" },
    { name: "signatures", type: "bytes[]" },
  ],
};

const domain = {
  name: "Ether Mail",
  version: "1",
  chainId: 1,
  verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
};

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

  const mint1155DataValue = {
    tokenId: tokenId,
    uri: "{id}.json",
    supply: 2,
    creators: [{ account: owner01Addr, value: 10000 }],
    royalties: [{ account: owner01Addr, value: 10000 }],
    signatures: [],
  };

  signature = await owner01._signTypedData(
    domain,
    Mint1155DataType,
    mint1155DataValue
  );

  await testLazyMint.mintAndTransfer(
    {
      tokenId: tokenId,
      uri: "{id}.json",
      supply: 2,
      creators: [{ account: owner01Addr, value: 10000 }],
      royalties: [{ account: owner01Addr, value: 10000 }],
      signatures: [signature],
    },
    owner01Addr,
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
