import { cryptoHash } from "./generateHash";

const INITIAL_DIFFICULTY = 2;

let initialData = {
  timestamp: 1,
  previousHash: "0x00000",
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: [],
};

const GENESIS_DATA = {
  timestamp: initialData.timestamp,
  previousHash: initialData.previousHash,
  data: initialData.data,
  difficulty: initialData.difficulty,
  nonce: initialData.nonce,
  hash: cryptoHash(
    initialData.timestamp,
    initialData.previousHash,
    initialData.nonce,
    initialData.difficulty,
    initialData.data
  ),
};

export default GENESIS_DATA;
