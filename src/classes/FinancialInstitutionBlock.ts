import { cryptoHash } from "../utils/generateHash";

export interface BlockData {
  reference: string;
};

export interface InstitutionDetails {
  name: string;
  registrationNumber: string;
  email: string;
  password: string;
  profilePictureUrl: string;
}

export type FinancialInstitutionBlockData = BlockData | InstitutionDetails;

type BlockConstructorArgs = {
  timestamp: string | number | Date;
  previousHash: string;
  hash: string;
  data: BlockData | InstitutionDetails;
  nonce: number;
  difficulty: number;
};

class Block {
  timestamp: string | number | Date;
  previousHash: string;
  hash: string;
  data: BlockData | InstitutionDetails;
  nonce: number;
  difficulty: number;

  constructor(args: BlockConstructorArgs) {
    const { timestamp, previousHash, hash, data, nonce, difficulty } = args;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis(details: InstitutionDetails) {
    const timestamp = Date.now();
    const previousHash = "0".repeat(64);
    const nonce = 0;
    const difficulty = 3;
    const hash = cryptoHash(
      timestamp,
      previousHash,
      nonce,
      difficulty,
      details
    );

    return new this({
      timestamp,
      previousHash,
      hash,
      data: details,
      nonce,
      difficulty,
    });
  }

  static mineBlock({
    previousBlock,
    data,
  }: {
    previousBlock: Block;
    data: BlockData;
  }) {
    let hash, timestamp;
    const previousHash = previousBlock.hash;
    const { difficulty } = previousBlock;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(
        timestamp,
        previousHash,
        nonce,
        difficulty,
        data.reference
      );
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

  static isFinancialInstitutionBlock(block: Block): block is Block {
    return (
      (block as Block).data.hasOwnProperty("name") &&
      (block as Block).data.hasOwnProperty("registrationNumber") &&
      (block as Block).data.hasOwnProperty("email") &&
      (block as Block).data.hasOwnProperty("password") &&
      (block as Block).data.hasOwnProperty("profilePictureUrl")
    );
  }

  static isBlock(block: Block): block is Block {
    return (block as Block).data.hasOwnProperty("reference");
  }
}

export default Block;
