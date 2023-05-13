import { cryptoHash } from "./hash";

let initialData = {
    timestamp: 1,
    previousHash: "0x00000",
    data: [],
}


const GENESIS_DATA = {
    timestamp: initialData.timestamp,
    previousHash: initialData.previousHash,
    data: initialData.data,
    hash: cryptoHash(initialData.timestamp, initialData.previousHash, initialData.data),
};

export default GENESIS_DATA;