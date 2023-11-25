import * as fs from "fs";
import Block from "./Block";
import { cryptoHash } from "../utils/generateHash";

class Blockchain {
  chain: Block[];

  constructor() {
    this.chain = [Block.genesis()];
    this.loadBlockchainFromFile("blockchain.json"); // Load blockchain from file by default
  }

  addBlock(data: any) {
    const newBlock = Block.mineBlock({
      previousBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
    return newBlock.hash;
  }

  replaceChain(chain: Block[]) {
    if (chain.length <= this.chain.length) {
      console.log("Received chain is not longer than the current chain.");
    } else if (!Blockchain.isValidChain(chain)) {
      console.log("Received chain is invalid.");
    } else {
      console.log("Replacing Chain with", chain);
      this.chain = chain;
    }
    this.saveBlockchainToFile("blockchain.json");
    return;
  }

  static isValidChain(chain: Block[]) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, previousHash, hash, nonce, difficulty, data } =
        chain[i];

      const actualPreviousHash = chain[i - 1].hash;

      if (previousHash !== actualPreviousHash) return false;

      const validatedHash = cryptoHash(
        timestamp,
        previousHash,
        nonce,
        difficulty,
        data
      );

      if (hash !== validatedHash) return false;
    }
    return true;
  }

  findOneByHash(hashToFind: string) {
    for (const block of this.chain) {
      if (block.hash === hashToFind) {
        return block;
      }
    }
    return null;
  }

  saveBlockchainToFile(fileName: string) {
    console.log("Saving blockchain to file...");
    try {
      const blockchainData = JSON.stringify(this.chain, null, 2);
      fs.writeFileSync(fileName, blockchainData, "utf-8");
      console.log(`Blockchain saved to ${fileName}`);
    } catch (error) {
      console.error(`Error saving blockchain to ${fileName}: ${error}`);
    }
  }

  loadBlockchainFromFile(fileName: string) {
    console.log("hi");
    try {
      const fileContent = fs.readFileSync(fileName, "utf-8");
      const loadedChain = JSON.parse(fileContent);

      if (Blockchain.isValidChain(loadedChain)) {
        this.chain = loadedChain;
        console.log(`Blockchain loaded from ${fileName}`);
      } else {
        console.log("Loaded chain is invalid. Keeping the current chain.");
      }
    } catch (error) {
      console.error(`Error loading blockchain from ${fileName}: ${error}`);
    }
  }
}

export default Blockchain;
