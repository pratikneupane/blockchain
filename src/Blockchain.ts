import Block from "./Block";
import { cryptoHash } from "./utils/hash";

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
      console.error("The incoming chain must be longer");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error("The incoming chain must be valid");
      return;
    }
    console.log("Replacing Chain with", chain);
    this.chain = chain;
  }

  static isValidChain(chain: Block[]) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      console.log("false in genesis");
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, previousHash, hash, data } = chain[i];
      const actualPreviousHash = chain[i - 1].hash;
      if (previousHash !== actualPreviousHash) {
        console.log("false in previousHash");
        return false;
      }
      const validatedHash = cryptoHash(timestamp, previousHash, data);
      if (hash !== validatedHash) {
        console.log("false in hash");
        console.log(hash);
        console.log(validatedHash);
        return false;
      }
      return true;
    }
  }
}

export default Blockchain;
