import * as fs from "fs";
import FinancialInstitutionBlock, {
  BlockData,
  InstitutionDetails,
} from "./FinancialInstitutionBlock";
import Block from "./Block";
import { cryptoHash } from "../utils/generateHash";

class FinancialInstitutionBlockchain {
  chain: (FinancialInstitutionBlock | Block)[];
  name: string;
  registrationNumber: string;
  email: string;
  password: string;
  profilePictureUrl: string;

  constructor(institutionDetails: InstitutionDetails) {
    const genesisBlock = FinancialInstitutionBlock.genesis(institutionDetails);
    this.chain = [genesisBlock];
    this.name = institutionDetails.name;
    this.registrationNumber = institutionDetails.registrationNumber;
    this.email = institutionDetails.email;
    this.password = institutionDetails.password;
    this.profilePictureUrl = institutionDetails.profilePictureUrl;

    this.saveBlockchainToFile();
  }

  addClientBlock(referenceId: string) {
    const clientBlock = Block.mineBlock({
      previousBlock: this.chain[this.chain.length - 1] as Block,
      data: { reference: referenceId },
    });

    this.chain.push(clientBlock);
    this.saveBlockchainToFile();
    return clientBlock;
  }

  static isValidChain(chain: (FinancialInstitutionBlock | Block)[]) {
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, previousHash, hash, nonce, difficulty, data } =
        chain[i];

      const actualPreviousHash = chain[i - 1].hash;

      if (previousHash !== actualPreviousHash) return false;

      if (
        FinancialInstitutionBlock.isFinancialInstitutionBlock(
          chain[i] as FinancialInstitutionBlock
        )
      ) {
        const validatedHash = cryptoHash(
          timestamp,
          previousHash,
          nonce,
          difficulty,
          JSON.stringify(data as InstitutionDetails)
        );
        if (hash !== validatedHash) return false;
      } else if (
        FinancialInstitutionBlock.isBlock(chain[i] as FinancialInstitutionBlock)
      ) {
        const validatedHash = cryptoHash(
          timestamp,
          previousHash,
          nonce,
          difficulty,
          JSON.stringify((data as BlockData).reference)
        );
        if (hash !== validatedHash) return false;
      }
    }
    return true;
  }

  saveBlockchainToFile() {
    const fileName = `${this.name}_blockchain.json`;
    const blockchainData = JSON.stringify(this.chain, null, 2);
    fs.writeFileSync(fileName, blockchainData, "utf-8");
    console.log(`Blockchain saved to ${fileName}`);
  }

  loadBlockchainFromFile() {
    const fileName = `${this.name}_blockchain.json`;
    try {
      const fileContent = fs.readFileSync(fileName, "utf-8");
      const loadedChain = JSON.parse(fileContent);

      if (FinancialInstitutionBlockchain.isValidChain(loadedChain)) {
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

export default FinancialInstitutionBlockchain;
