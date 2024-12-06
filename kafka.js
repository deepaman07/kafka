const { Kafka } = require("kafkajs");

// Singleton Kafka client object
class KafkaSingleton {
  constructor() {
    let kafkaConfig = {
      clientId: "my-test-app",
      brokers: ["localhost:9092"],
    };

    if (!KafkaSingleton.instance) {
      this.kafka = new Kafka(kafkaConfig);
      this.admin = this.kafka.admin();
      this.producer = this.kafka.producer();
      KafkaSingleton.instance = this;
    }

    return KafkaSingleton.instance;
  }

  // Getter for the Kafka client
  getKafkaClient() {
    return this.kafka;
  }

  // Getter for a producer
  getProducer() {
    if (!this.producer) {
      this.producer = this.kafka.producer();
    }
    return this.producer;
  }

  // Getter for a consumer
  getConsumer(groupId) {
    console.log(groupId);
    return this.kafka.consumer({ groupId });
  }

  // Getter for an admin client
  getAdmin() {
    if (!this.admin) {
      this.admin = this.kafka.admin();
    }
    return this.admin;
  }
}

const kafkaInstance = new KafkaSingleton();
Object.freeze(kafkaInstance);

module.exports = kafkaInstance;
