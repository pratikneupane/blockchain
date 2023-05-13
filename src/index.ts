import Blockchain from "./Blockchain";

const blockchain = new Blockchain();

blockchain.addBlock("foo");

console.log(blockchain);

const isValid = Blockchain.isValidChain(blockchain.chain)
console.log(isValid);