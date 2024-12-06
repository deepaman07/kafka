const kafkaInstance = require("./kafka.js");
const group = process.argv[2];

let consumer;

const initializeConsumer = async () => {
  if (!consumer) {
    consumer = kafkaInstance.getConsumer(group);
    console.log("Connecting to Kafka producer...");
    await consumer.connect();
    console.log("Kafka producer connected...");
  }
};

const consumeMessage = async (topic) => {
  await initializeConsumer(group);
  await consumer.subscribe({ topic: topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
      });
    },
  });
};

const disconnectConsumer = async () => {
  if (consumer) {
    await consumer.disconnect();
    console.log("Kafka consumer disconnected.");
    consumer = null;
  }
};

consumeMessage("pbpartners");

module.exports = {
  consumeMessage,
  disconnectConsumer,
};
