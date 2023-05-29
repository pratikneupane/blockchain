import Redis from "ioredis";
import Blockchain from "./Blockchain";
import Block from "./Block";

const CHANNELS = {
  BLOCKCHAIN: "BLOCKCHAIN",
};

class PubSub {
  publisher: Redis;
  subscriber: Redis;
  blockchain: Blockchain;

  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain;
    this.publisher = new Redis();
    this.subscriber = new Redis();
    this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
    this.subscriber.on("message", (channel: string, message: string) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel: string, message: string) {
    const parsedMessage: Block[] = JSON.parse(message);
    if (channel === CHANNELS.BLOCKCHAIN) {
      this.blockchain.replaceChain(parsedMessage);
    }
  }

  publish(channel: string, message: string) {
    this.publisher.publish(channel, message);
  }

  broadcastBlockchain() {
    this.publish(CHANNELS.BLOCKCHAIN, JSON.stringify(this.blockchain.chain));
  }
}

export default PubSub;
