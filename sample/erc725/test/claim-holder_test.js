const { toBN, keccak256 } = web3.utils;
const { checkErrorRevert } = require('../helpers/utils');

const ClaimHolder = artifacts.require('ClaimHolder');

contract("ClaimHolder", async (accounts) => {
  const MANAGEMENT_PURPOSE = 1;
  const EXECUTION_PURPOSE = 2;
  const EXECUTION_AND_MANAGEMENT_PURPOSE = 3;
  const ECDSA_TYPE = 1;
  let claimHolder;
  beforeEach(async () => {
    claimHolder = await ClaimHolder.new();
    claimHolder.initialize();
  });
  it('test...', async function() {

  })
});
