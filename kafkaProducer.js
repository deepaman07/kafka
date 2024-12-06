const kafkaInstance = require("./kafka.js");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let producer;

const initializeProducer = async () => {
  if (!producer) {
    producer = kafkaInstance.getProducer();
    console.log("Connecting to Kafka producer...");
    await producer.connect();
    console.log("Kafka producer connected...");
  }
};

const sendMessageToKafka = async () => {
  await initializeProducer();
  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function (line) {
    const [Insurer, location, policyNumber] = line.split(" ");
    await producer.send({
      topic: "pbpartners",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "policyDetails",
          value: JSON.stringify({ insurerName: Insurer, location: location, policyNumber: policyNumber }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
  return { msg: "Message sent!" };
};

const disconnectProducer = async () => {
  if (producer) {
    await producer.disconnect();
    console.log("Kafka producer disconnected.");
    producer = null;
  }
};

sendMessageToKafka()

module.exports = {
  sendMessageToKafka,
  disconnectProducer,
};
