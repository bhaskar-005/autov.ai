import { Partitioners, Producer } from "kafkajs";
import { Kafka } from "kafkajs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const kafka_broker_url = process.env.kAFKA_BROKER_URL!;
const kafka_username = process.env.kAFKA_USERNAME!;
const kafka_password = process.env.KAFKA_PASSWORD!;

class kafkaConfig {
    kafka: Kafka;
    Producer: Producer;

    constructor(){
       this.kafka = new Kafka({
         clientId: 'clip-genrate',
         brokers: [kafka_broker_url],
         ssl: {
            ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")]
         },
         sasl: {
            username: kafka_username, 
            password: kafka_password,
            mechanism: "plain",
         }
       });
       
       this.Producer = this.kafka.producer({createPartitioner: Partitioners.LegacyPartitioner})
       
    }
    async produce(topic:string , messages:any[]){
      try {
        await this.Producer.connect();
        await this.Producer.send({
            topic,
            messages: messages.map((message)=> (
               {value: JSON.stringify(message)}
            ))
        });
        
       } catch (error) {
        console.log(error);
       } finally {
        await this.Producer.disconnect();
       }
    }
}

export const kafka_config =  new kafkaConfig;