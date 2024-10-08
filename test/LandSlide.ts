import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { ethers as etherLibs } from "ethers";
import { Landslide } from "../typechain-types"

describe("LandSlide module", () => {
    let contract:Landslide , owner:Signer ,addr1:Signer, addr2:Signer;

    beforeEach(async () => {
        const TokenFactory = await ethers.getContractFactory("Landslide");
        [owner, addr1, addr2] = await ethers.getSigners();
        contract = await TokenFactory.deploy();
    });

    describe("deployment", async () => {
        it("Should assign right owner", async () => {
            expect(await contract.owner()).to.equals(owner);
        });
    });

    describe("Donate",  () => {
        it("should fail if donated less than 0 tokens", async () => {
         await expect(
            contract
             .connect(addr1)
             .donate("Ram", "God Bless Them", { value: 0 })
         ).to.be.revertedWith("plz send more than 0 ether");
        })
            
            it("Should accept the donation and accept the memo", async () => {
                const donationAmnt = etherLibs.parseEther("1.0");
            await expect(
              contract
                .connect(addr1)
                .donate("JOHN", "Great Idea", { value: donationAmnt })
            ).to.not.be.revertedWith("plz send more than 0 ether");
                
                const memos = await contract.retrieve(); 
                expect(await Number(memos.length)).to.equals(1)
        })
    })
})