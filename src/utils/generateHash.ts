import Blake2b from "./blake2b";

export const cryptoHash = (
  timestamp: string | number | Date,
  previousHash: string,
  nonce: number,
  difficulty: number,
  data: any
) => {
  const combinedData = `${timestamp}${previousHash}${nonce}${difficulty}${data}`;
  const blake2 = new Blake2b();
  const hash =  blake2.hashString(combinedData);
  return hash;
};
