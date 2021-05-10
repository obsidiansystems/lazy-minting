const { expect } = require("chai");

describe("TestLazyMint", function() {
    it ("Should have a base uri", async function() {
        const TestLazyMint = await ethers.getContractFactory("TestLazyMint");
        const tlm = await TestLazyMint.deploy("https://dank.ca");

        // await tlm.setBaseURI("https://dank.ca");
        expect(await tlm.baseURI()).to.equal("https://dank.ca");
    });
});
