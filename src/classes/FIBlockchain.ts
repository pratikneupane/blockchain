import FinancialInstitutionBlockchain from "./FinancialInstitutionBlockchain";

class FIBlockchain {
    private institutions: FinancialInstitutionBlockchain[] = [];
  
    addInstitution(institution: FinancialInstitutionBlockchain) {
      this.institutions.push(institution);
    }
  
    getInstitutionByEmail(email: string) {
      return this.institutions.find((institution) => institution.email === email);
    }
  
    getAllInstitutions() {
      return this.institutions;
    }
  
    saveAllBlockchainsToFile() {
      this.institutions.forEach((institution) => institution.saveBlockchainToFile());
    }
  
    loadAllBlockchainsFromFile() {
      this.institutions.forEach((institution) => institution.loadBlockchainFromFile());
    }
  }
  
  export default FIBlockchain;
  