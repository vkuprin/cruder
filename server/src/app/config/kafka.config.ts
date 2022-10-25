import { logLevel } from 'kafkajs';
import yn from 'yn';

const { MSK_BROKERS, KAFKA_GROUP_ID, KAFKA_SSL } = process.env;

export enum KafkaTopics {
  Email = 'Email',
  User = 'User',
}

export const kafkaConfig = {
  brokers: MSK_BROKERS ? MSK_BROKERS.split(',') : ['kafka:9092'],
  logLevel: logLevel.ERROR,
  groupId: KAFKA_GROUP_ID || 'account-service',
  ssl: yn(KAFKA_SSL) || false,
};
