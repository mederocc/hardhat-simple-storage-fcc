const { ethers } = require('hardhat');
const { assert, expect } = require('chai');

describe('SimpleStorage', function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it('Should start with a favorite number of 0', async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = '0';

    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue.toString()).to.equal(expectedValue);
  });
  it('Should update when we call store', async function () {
    const expectedValue = '7';
    const transactionResponse = await simpleStorage.store(7);
    transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue, expectedValue);
  });

  describe('addPerson()', () => {
    it('should add a person to the people array and the nameToFavoriteNumber mapping', async () => {
      const name = 'Alice';
      const favoriteNumber = 23;
      await simpleStorage.addPerson(name, favoriteNumber);

      const people = await simpleStorage.people(0);
      assert.equal(people.name, name);
      assert.equal(people.favoriteNumber, favoriteNumber);

      const storedFavoriteNumber = await simpleStorage.nameToFavoriteNumber(
        name
      );
      assert.equal(storedFavoriteNumber, favoriteNumber);
    });
  });
});
