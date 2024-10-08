import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import  dotenv  from "dotenv";
dotenv.config();

const apiKey = process.env.ApiKey!;
const sepoliaPrivateKey = process.env.SepoliaPrivateKey!;

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
      accounts: [sepoliaPrivateKey],
    },
  },
};

export default config;
