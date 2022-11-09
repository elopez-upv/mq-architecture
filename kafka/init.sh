#!/bin/bash
kafka-topics --bootstrap-server $KAFKA_BROKER --list

echo -e 'Creating kafka topics'
kafka-topics --bootstrap-server $KAFKA_BROKER --create --if-not-exists --topic $TOPIC_NAME --replication-factor 1 --partitions 1

echo -e 'Successfully created the following topics:'
kafka-topics --bootstrap-server $KAFKA_BROKER --list