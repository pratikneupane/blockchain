import { formatDate } from "./utils/dateformat";
import GENESIS_DATA from "./utils/genesis";
import { cryptoHash } from "./utils/hash";

type ConstructorArgs = {
  timestamp: string | number | Date;
  previousHash: string;
  hash: string;
  data: any;
};

class Block {
  timestamp: string | number | Date;
  previousHash: string;
  hash: string;
  data: any;
  
  constructor(args: ConstructorArgs) {
    const { timestamp, previousHash, hash, data } = args;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
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
    const timestamp = formatDate(Date.now());
    const previousHash = previousBlock.hash;
    const hash = cryptoHash(timestamp, previousHash, data);
    return new this({
      timestamp,
      previousHash,
      hash,
      data,
    });
  }
}

export default Block;
