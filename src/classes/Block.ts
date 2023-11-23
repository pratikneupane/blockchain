import GENESIS_DATA from "../utils/genesis";
import { cryptoHash } from "../utils/generateHash";

type ConstructorArgs = {
  timestamp: string | number | Date;
  previousHash: string;
  hash: string;
  data: any;
  nonce: number;
  difficulty: number;
};

class Block {
  timestamp: string | number | Date;
  previousHash: string;
  hash: string;
  data: any;
  nonce: number;
  difficulty: number;
  verified: Boolean = false;

  constructor(args: ConstructorArgs) {
    const { timestamp, previousHash, hash, data, nonce, difficulty } = args;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }
  
  static mineBlock({
    previousBlock,
    data,
  }: {
    previousBlock: Block;
    data: any;
  }) {
    let hash, timestamp;
    const previousHash = previousBlock.hash;
    const { difficulty } = previousBlock;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, previousHash, nonce, difficulty, data);
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

  verifyBlock() {
    this.data.verified = true;
    return this.data.verified;
  }
}

export default Block;
