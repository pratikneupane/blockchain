import PubSub from "../src/classes/PubSub";
import Blockchain from "../src/classes/Blockchain";
import Block from "../src/classes/Block";

describe("PubSub", () => {
  let pubSub: PubSub;
  let blockchain: Blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
    pubSub = new PubSub(blockchain);
  });

  afterEach(() => {
    // Clean up after each test
    pubSub.publisher.disconnect();
    pubSub.subscriber.disconnect();
  });

  test("handleMessage updates the blockchain with received blocks", () => {
    const block = Block.genesis();
    const newBlock = Block.mineBlock({
      previousBlock: block,
      data: "Test Data",
    });

    jest.spyOn(blockchain, "replaceChain");

    pubSub.handleMessage("BLOCKCHAIN", JSON.stringify([newBlock]));

    expect(blockchain.replaceChain).toHaveBeenCalledWith([newBlock]);
  });

  test("publish sends the message to the specified channel", () => {
    const publishSpy = jest.spyOn(pubSub.publisher, "publish");
    const channel = "TEST_CHANNEL";
    const message = "Test Message";

    pubSub.publish(channel, message);
    
    expect(publishSpy).toHaveBeenCalledWith(channel, message);
  });

  test("broadcastBlockchain publishes the blockchain to the BLOCKCHAIN channel", () => {
    const publishSpy = jest.spyOn(pubSub.publisher, "publish");
    const blockchainData = [
      Block.genesis(),
      Block.mineBlock({ previousBlock: Block.genesis(), data: "Test Data" }),
    ];

    pubSub.broadcastBlockchain();

    expect(publishSpy).toHaveBeenCalledWith(
      "BLOCKCHAIN",
      JSON.stringify(blockchainData)
    );
  });
});
