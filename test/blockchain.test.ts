import Blockchain from "../src/classes/Blockchain";
import Block from "../src/classes/Block";

describe("Blockchain", () => {
  let blockchain: Blockchain;
  let originalChain: Block[];

  beforeEach(() => {
    blockchain = new Blockchain();
    originalChain = blockchain.chain;
  });

  it("should start with the genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("should add a new block to the chain", () => {
    const data = { transactions: ["tx1", "tx2"] };
    blockchain.addBlock(data);

    expect(blockchain.chain.length).toBe(2);
    expect(blockchain.chain[1].data).toEqual(data);
    expect(blockchain.chain[1].previousHash).toEqual(blockchain.chain[0].hash);
  });

  it("should replace the chain with a valid chain", () => {
    const newChain = [
      Block.genesis(),
      Block.mineBlock({
        previousBlock: Block.genesis(),
        data: { transactions: ["tx1"] },
      }),
    ];
    blockchain.replaceChain(newChain);

    expect(blockchain.chain).toEqual(newChain);
  });

  it("should not replace the chain with one of equal or lesser length", () => {
    const newChain = [Block.genesis()];
    blockchain.replaceChain(newChain);

    expect(blockchain.chain.length).toBe(originalChain.length);
    expect(blockchain.chain[0]).toEqual(originalChain[0]);
  });

  it("should not replace the chain with an invalid chain", () => {
    const invalidChain = [
      Block.genesis(),
      new Block({
        timestamp: Date.now(),
        previousHash: "previous-hash",
        hash: "hash",
        data: { transactions: ["tx1"] },
        nonce: 1,
        difficulty: 1,
      }),
    ];
    blockchain.replaceChain(invalidChain);

    expect(blockchain.chain).toEqual(originalChain);
  });

  it("should validate a valid chain", () => {
    const validChain = [
      Block.genesis(),
      Block.mineBlock({
        previousBlock: Block.genesis(),
        data: { transactions: ["tx1"] },
      }),
    ];
    expect(Blockchain.isValidChain(validChain)).toBe(true);
  });

  it("should invalidate a chain with a corrupt genesis block", () => {
    const corruptGenesis = new Block({
      timestamp: Date.now(),
      previousHash: "previous-hash",
      hash: "hash",
      data: { transactions: ["tx1"] },
      nonce: 1,
      difficulty: 1,
    });
    const invalidChain = [
      corruptGenesis,
      Block.mineBlock({
        previousBlock: corruptGenesis,
        data: { transactions: ["tx2"] },
      }),
    ];
    expect(Blockchain.isValidChain(invalidChain)).toBe(false);
  });

  it("should invalidate a chain with a corrupt block", () => {
    const validChain = [
      Block.genesis(),
      Block.mineBlock({
        previousBlock: Block.genesis(),
        data: { transactions: ["tx1"] },
      }),
    ];

    const corruptBlock = new Block({
      timestamp: Date.now(),
      previousHash: "jdsabadbfi",
      hash: "hash",
      data: { transactions: ["tx2"] },
      nonce: 1,
      difficulty: 1,
    });
    validChain.push(corruptBlock);

    expect(Blockchain.isValidChain(validChain)).toBe(false);
  });
});
