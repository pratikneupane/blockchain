import crypto from "crypto";

export const cryptoHash = (
  timestamp: string | number | Date,
  previousHash: string,
  data: any
): string => {
  const str = [timestamp, previousHash, data];
  const hash = crypto.createHash("sha256");
  hash.update(str.sort().join(""));
  return hash.digest("hex");
};
