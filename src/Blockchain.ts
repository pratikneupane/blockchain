import Block from "./Block";
import { cryptoHash } from "./utils/generateHash";

class Blockchain {
  chain: Block[];
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data: any) {
    const newBlock = Block.mineBlock({
      previousBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  replaceChain(chain: Block[]) {
    if (chain.length <= this.chain.length) {
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      return;
    }
    console.log("Replacing Chain with", chain);
    this.chain = chain;
  }

  static isValidChain(chain: Block[]) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, previousHash, hash, nonce, difficulty, data } =
        chain[i];
      const actualPreviousHash = chain[i - 1].hash;
      if (previousHash !== actualPreviousHash) {
        return false;
      }
      const validatedHash = cryptoHash(timestamp, previousHash, nonce, difficulty, data);
      if (hash !== validatedHash) {
        return false;
      }
      return true;
    }
  }
}

export default Blockchain;
