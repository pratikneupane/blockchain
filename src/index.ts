import Blockchain from "./classes/Blockchain";
import express, { Request, Response } from "express";

const app = express();
const blockchain = new Blockchain();

app.use(express.json());

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

app.get("/api/blocks", (req: Request, res: Response) => {
  res.json(blockchain.chain);
});

app.post("/api/mine", (req: Request, res: Response) => {
  const { data } = req.body;
  blockchain.addBlock(data);
  res.json(blockchain.chain);
});



app.listen(DEFAULT_PORT, () => {
  console.log(`🚀[app] ${ROOT_NODE_ADDRESS}`);
});
