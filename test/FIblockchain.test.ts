// FinancialInstitutionBlockchain.test.ts

import FinancialInstitutionBlockchain from "../src/classes/FinancialInstitutionBlockchain"
describe('FinancialInstitutionBlockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new FinancialInstitutionBlockchain();
  });

  it('should have a genesis block when initialized', () => {
    expect(blockchain.chain.length).toBe(1);
    expect(blockchain.chain[0].data.institutionDetails).toBe('Institution Details');
  });

  it('should add a new block to the chain', () => {
    const institutionDetails = 'New Institution Details';
    blockchain.addBlock(institutionDetails);

    expect(blockchain.chain.length).toBe(2);
    expect(blockchain.chain[1].data.institutionDetails).toBe(institutionDetails);
  });

  it('should validate a valid chain', () => {
    const institutionDetails1 = 'Institution 1';
    const institutionDetails2 = 'Institution 2';

    blockchain.addBlock(institutionDetails1);
    blockchain.addBlock(institutionDetails2);

    expect(FinancialInstitutionBlockchain.isValidChain(blockchain.chain)).toBe(true);
  });

  it('should invalidate a chain with a tampered block', () => {
    const institutionDetails1 = 'Institution 1';
    const institutionDetails2 = 'Institution 2';

    blockchain.addBlock(institutionDetails1);
    blockchain.addBlock(institutionDetails2);

    // Tamper with a block
    blockchain.chain[1].data.institutionDetails = 'Tampered Details';

    expect(FinancialInstitutionBlockchain.isValidChain(blockchain.chain)).toBe(false);
  });
});
