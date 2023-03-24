const { ethers, run, network } = require('hardhat');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
  // because we are getting ethers from hardha instead of the ethers library, it can read the SimpleStorage file in the contracts folder
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  console.log('deploying contract');

  const simpleStorage = await SimpleStorageFactory.deploy();
  // we are able to deploy the contract without passing neither the private key nor the RPC URL
  // this is because hardhat has a default network that it uses, akin to Ganache
  // The default network already comes with a private key and RPC URL
  // we should specify the default network anyway in the hardhat.config.js file, even if to leave it as is
  // we can add additional networks in a networks property
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);

  //  we don't want to verify our contract if it's been deployed to the hardhat network, as it won't show on etherscan anyway

  console.log(network.config);

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    // etherscan may not be aware of the transaction as soon as we deploy the contract, so we wait for a few blocks to be mined before verifying our contract
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log('Current value is: ' + currentValue);
  const transactionResponde = await simpleStorage.store(7);
  await transactionResponde.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log('Updated value is: ' + updatedValue);
}

// etherscan offers an api for programmatic varification
// hardhat offers a plugin that makes it even easier though
// we'll first need to add our etherscan api key to a hardhat.config.js
// adding our api key will add a new verify task to the list available when passing npx hardhat in the terminal
// we won't be verifying through CLI though. We'll create a verify function instead

async function verify(contractAddress, args) {
  console.log('verifying contract');
  // we can run any of the hardhat tasks by using the run package
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArgsParams: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log('already verified!');
    } else {
      console.log(error);
    }
  }
  // check what it expects with npx hardhat verify --help
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
