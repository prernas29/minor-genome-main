require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli:{
      url:'https://eth-goerli.g.alchemy.com/v2/E7K1NaKG5ss1HaH-0-ZOwH7sPe3Rvn6O',
      accounts:['647aa47246531ee912231714d873d1d9dda8eb351471907d1c77538ea3e21877']
    }
    ,
    sepolia:{
      url: 'https://eth-sepolia.g.alchemy.com/v2/pCrx-Ym24qTYDGU--1a64EXHStT11jr0',
      accounts: [
        '4533dd97d1f4a27bdee3f79cfe8ad64056b561363ef2bd00b4bc1996cbba87ca'
      ]
    }
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
