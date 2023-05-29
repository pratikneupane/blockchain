import Blockchain from "./classes/Blockchain";
import express, { Request, Response } from "express";
import PubSub from "./classes/PubSub";
import request from "request";

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub(blockchain);

setTimeout(() => pubsub.broadcastBlockchain(), 2000);

app.use(express.json());

const DEFAULT_PORT = 3000;

app.get("/api/blocks", (req: Request, res: Response) => {
  res.json(blockchain.chain);
});

app.post("/api/mine", (req: Request, res: Response) => {
  const { data } = req.body;
  blockchain.addBlock(data);
  pubsub.broadcastBlockchain();
  console.log("New block added");
  console.log(blockchain.chain);
  res.json(blockchain.chain);
});

let PEER_PORT: number | undefined;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

const syncChains = () => {
  request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response) => {
    if (!error && response.statusCode === 200) {
      const rootChain = JSON.parse(response.body);
      console.log("replace chain on a sync with", rootChain);
      blockchain.replaceChain(rootChain);
    }
  });
};

app.listen(PORT, () => {
  syncChains();
  console.log(`🚀[app] http://localhost:${PORT}`);
  console.log(blockchain.chain);
});
