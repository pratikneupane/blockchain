import Block from '../src/classes/Block';
import { cryptoHash } from '../src/utils/generateHash';

describe('Block', () => {
  let genesisBlock: Block;

  beforeEach(() => {
    genesisBlock = Block.genesis();
  });

  it('should create a valid genesis block', () => {
    expect(genesisBlock).toBeInstanceOf(Block);
    expect(genesisBlock.timestamp).toBeDefined();
    expect(genesisBlock.previousHash).toBe('0x00000');
    expect(genesisBlock.hash).toBeDefined();
    expect(genesisBlock.data).toEqual(expect.any(Object));
    expect(genesisBlock.nonce).toEqual(expect.any(Number));
    expect(genesisBlock.difficulty).toEqual(expect.any(Number));
  });

  it('should mine a new block with the correct properties', () => {
    const previousBlock = genesisBlock;
    const data = { transactions: ['tx1', 'tx2'] };
    const newBlock = Block.mineBlock({ previousBlock, data });

    expect(newBlock).toBeInstanceOf(Block);
    expect(newBlock.timestamp).toBeDefined();
    expect(newBlock.previousHash).toBe(previousBlock.hash);
    expect(newBlock.hash).toEqual(
      cryptoHash(
        newBlock.timestamp,
        newBlock.previousHash,
        newBlock.nonce,
        newBlock.difficulty,
        data
      )
    );
    expect(newBlock.data).toEqual(data);
    expect(newBlock.nonce).toEqual(expect.any(Number));
    expect(newBlock.difficulty).toEqual(previousBlock.difficulty);
  });
});
