// FinancialInstitutionBlock.ts

import { cryptoHash } from "../utils/generateHash";

type FinancialInstitutionBlockData = {
  institutionDetails: string;
};

type FinancialInstitutionBlockConstructorArgs = {
  timestamp: string | number | Date;
  previousHash: string;
  hash: string;
  data: FinancialInstitutionBlockData;
  nonce: number;
  difficulty: number;
};

class FinancialInstitutionBlock {
  timestamp: string | number | Date;
  previousHash: string;
  hash: string;
  data: FinancialInstitutionBlockData;
  nonce: number;
  difficulty: number;

  constructor(args: FinancialInstitutionBlockConstructorArgs) {
    const { timestamp, previousHash, hash, data, nonce, difficulty } = args;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis(institutionDetails: string) {
    const timestamp = Date.now();
    const previousHash = "0".repeat(64);
    const nonce = 0;
    const difficulty = 3;
    const hash = cryptoHash(timestamp, previousHash, nonce, difficulty, institutionDetails);

    return new this({
      timestamp,
      previousHash,
      hash,
      data: { institutionDetails },
      nonce,
      difficulty,
    });
  }

  static mineBlock({
    previousBlock,
    data,
  }: {
    previousBlock: FinancialInstitutionBlock;
    data: FinancialInstitutionBlockData;
  }) {
    let hash, timestamp;
    const previousHash = previousBlock.hash;
    const { difficulty } = previousBlock;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, previousHash, nonce, difficulty, data.institutionDetails);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this({
      timestamp,
      previousHash,
      hash,
      data,
      nonce,
      difficulty,
    });
  }
}

export default FinancialInstitutionBlock;
