import { Kafka, Producer } from 'kafkajs';
import { kafkaConfig } from '../../../config/kafka.config';

const kafka = new Kafka({
  brokers: kafkaConfig.brokers,
  logLevel: kafkaConfig.logLevel,
  ssl: kafkaConfig.ssl,
});

export class KafkaService {
  static producer: Producer;
  static connected: boolean;

  static async connect(): Promise<void> {
    if (!this.connected) {
      this.producer = kafka.producer();
      await this.producer.connect();
      this.connected = true;
    }
  }

  static async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }

  static async sendMessage(topic: string, message: any): Promise<void> {
    const acks = 1;
    const value = JSON.stringify(message);
    await this.producer.send({ topic, messages: [{ value }], acks });
  }
}
