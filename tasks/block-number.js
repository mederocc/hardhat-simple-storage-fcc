// custom task to get the current block number of the blockchain we're working in
// more info: https://hardhat.org/hardhat-runner/docs/advanced/create-task

// scripts and tasks both can basically do the same things. deploy contracts, intercat with contracts, etc.
// tasks may be better for plugins as opposed to our local development environment.
// That being said, everything could be done with tasks instead.

const { task } = require('hardhat/config');

task('block-number', 'Prints the current block number').setAction(
  async (taksArgs, hre) => {
    // hre stands for hardhat runtime environment. It can access the same packages as hardhat

    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log('Current block number: ' + blockNumber);
  }
);

module.exports = {};
