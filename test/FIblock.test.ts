// FinancialInstitutionBlock.test.ts

import FinancialInstitutionBlock from '../src/classes/FinancialInstitutionBlock';

describe('FinancialInstitutionBlock', () => {
  it('should create a genesis block', () => {
    const institutionDetails = 'Institution Details';
    const genesisBlock = FinancialInstitutionBlock.genesis(institutionDetails);

    expect(genesisBlock.timestamp).toBeDefined();
    expect(genesisBlock.previousHash).toBe("0".repeat(64));
    expect(genesisBlock.hash).toBeDefined();
    expect(genesisBlock.data.institutionDetails).toBe(institutionDetails);
    expect(genesisBlock.nonce).toBe(0);
    expect(genesisBlock.difficulty).toBe(3);
  });

  it('should mine a new block', () => {
    const previousBlock = FinancialInstitutionBlock.genesis('Previous Institution');
    const newData = { institutionDetails: 'New Institution' };
    const newBlock = FinancialInstitutionBlock.mineBlock({ previousBlock, data: newData });

    expect(newBlock.timestamp).toBeDefined();
    expect(newBlock.previousHash).toBe(previousBlock.hash);
    expect(newBlock.hash).toBeDefined();
    expect(newBlock.data.institutionDetails).toBe(newData.institutionDetails);
    expect(newBlock.nonce).toBeDefined();
    expect(newBlock.difficulty).toBeDefined();
  });

  it('should have a hash that meets the difficulty criteria', () => {
    const previousBlock = FinancialInstitutionBlock.genesis('Previous Institution');
    const newData = { institutionDetails: 'New Institution' };
    const newBlock = FinancialInstitutionBlock.mineBlock({ previousBlock, data: newData });

    const { difficulty, hash } = newBlock;

    expect(hash.substring(0, difficulty)).toBe("0".repeat(difficulty));
  });
});
