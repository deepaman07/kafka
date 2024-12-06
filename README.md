# kafka
Basic setup for kafka server

==============================================
Command to run docker for Zookeeper : 
  docker run -p 2181:2181 zookeeper

==============================================
Command to run docker for kafka : 
  docker run -p 9092:9092 \
  -e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka

==============================================
Command to start any producer : 
  node kafkaProducer.js

==============================================
Command to start any consumer : 
  node kafkaConsumer.js <group_name>

==============================================
Once pub/sub is intiated one can directly start producing message through producer in terminal itself.
==============================================
