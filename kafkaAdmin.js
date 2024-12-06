const kafkaInstance = require("./kafka.js");

let admin;

const initializeAdmin = async () => {
  if (!admin) {
    admin = kafkaInstance.getAdmin();
    console.log("Connecting to Kafka admin...");
    await admin.connect();
    console.log("Kafka admin connected...");
  }
};

const listKafkaTopics = async () => {
  await initializeAdmin();
  const topics = await admin.listTopics();
  console.log("Available topics:", topics);
  return topics;
};

const createKafkaTopic = async (topic, numPartitions, replicationFactor) => {
  await initializeAdmin();
  const listTopics = await listKafkaTopics(topic, numPartitions, replicationFactor);

  if (listTopics.includes(topic)) {
    return "Topic already exists.";
  } else {
    await admin.createTopics({
      topics: [
        {
          topic: topic,
          numPartitions: numPartitions,
          replicationFactor: replicationFactor,
        },
      ],
    });
    return "Topic created.";
  }
};

const disconnectAdmin = async () => {
  if (admin) {
    await admin.disconnect();
    console.log("Kafka admin disconnected.");
    admin = null;
  }
};

listKafkaTopics();

module.exports = {
  listKafkaTopics,
  createKafkaTopic,
  disconnectAdmin,
};
