require('@nomicfoundation/hardhat-toolbox');
const dotenv = require('dotenv');
require('@nomiclabs/hardhat-etherscan');
require('./tasks/block-number');
require('hardhat-gas-reporter');
require('solidity-coverage');

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || 'https://eth-sepolia';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xkey';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'key';
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || 'key';

// hardhat will restart the network after every command
// but we can run npx hardhat node to lift a server much like Ganache would
// it's a local host in the hardhat runtime environment. It should be added to the networks array with the same chainId as hardhat

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      // no need to pass accounts; they're automatically set
      chainId: 31337,
    },
  },
  solidity: '0.8.18',
  etherscan: { apiKey: ETHERSCAN_API_KEY },
  gasReporter: {
    enabled: false,
    outputFile: 'gas-reportError.tx', // saves output to a file gas-reportError.tx
    noColors: true, // colors can cause formatting errors
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    // token: 'MATIC', // check what the cost with a different token would be instead
  },
};
