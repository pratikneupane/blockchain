import Blockchain from "./Blockchain";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import request from "request";

const app = express();
const blockchain = new Blockchain();

app.use(bodyParser.json());

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

app.get("/api/blocks", (req: Request, res: Response) => {
  res.json(blockchain.chain);
});

app.post("/api/mine", (req: Request, res: Response) => {
  const { data } = req.body;
  blockchain.addBlock(data);
  res.redirect("/api/blocks");
});

app.listen(DEFAULT_PORT, () => {
  console.log(`🚀[app] ${ROOT_NODE_ADDRESS}`);
});
