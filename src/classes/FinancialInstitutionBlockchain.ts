import { cryptoHash } from "../utils/generateHash";
import FinancialInstitutionBlock from "./FinancialInstitutionBlock";

class FinancialInstitutionBlockchain {
  chain: FinancialInstitutionBlock[];

  constructor() {
    this.chain = [FinancialInstitutionBlock.genesis("Institution Details")];
  }

  addBlock(institutionDetails: string) {
    const previousBlock = this.chain[this.chain.length - 1];
    const newBlock = FinancialInstitutionBlock.mineBlock({
      previousBlock,
      data: { institutionDetails },
    });
    this.chain.push(newBlock);
    return newBlock.hash;
  }

  static isValidChain(chain: FinancialInstitutionBlock[]) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(FinancialInstitutionBlock.genesis(""))) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, previousHash, hash, nonce, difficulty, data } = chain[i];

      const actualPreviousHash = chain[i - 1].hash;

      if (previousHash !== actualPreviousHash) return false;

      const validatedHash = cryptoHash(
        timestamp,
        previousHash,
        nonce,
        difficulty,
        JSON.stringify(data)
      );

      if (hash !== validatedHash) return false;
    }
    return true;
  }
}

export default FinancialInstitutionBlockchain;
