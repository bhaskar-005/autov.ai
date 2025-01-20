import { kafka_config } from "./kafka/kafka_producer"
import { client, connectToDb } from "./utils/db";

const clipGeneratorTopic = 'generate_clip'
const kafkaConfig = kafka_config;
let emptyDataPollCount = 0;
let totalDataPollCount = 0;

const waitTime = async(time:number)=>{
   return new Promise((resolve) =>{
    setTimeout(() => {
       console.log(`waiting for ${time}`);
       resolve(true);
    }, time);
   })
}

const findAndUpdateOutbox = async()=>{
  try {
    await connectToDb();
    const result = await client.query(`
      WITH cte AS (
        SELECT id 
        FROM "Outbox"
        WHERE status = 'Pending'
        AND "eventType" = 'GENERATE_CLIPS' 
        ORDER BY "createdAt" ASC
        LIMIT 50
      )
      UPDATE "Outbox"
      SET status = 'InProgress'
      WHERE id IN (SELECT id FROM cte)
      RETURNING id, "eventType", payload, "uploadId";
    `)
    const updatedRecords = result.rows;

    console.warn(`updated ${updatedRecords.length} records`);
    
    if (updatedRecords.length !== 0) {
       emptyDataPollCount = 0;
       kafkaConfig.produce(clipGeneratorTopic, updatedRecords);
    }
    else{
      emptyDataPollCount += 1;

      if (emptyDataPollCount > 3) {
        console.info(`No data found, Empty data Polling Count: ${emptyDataPollCount}, Waiting for 5min`);
        await waitTime(1000 * 60 * 5) // wait for 5min if data is empty 3 times
      }
      else if(emptyDataPollCount > 6){
        console.info(`No data found, Empty data Polling Count: ${emptyDataPollCount}, Waiting for 5min`);
        await waitTime(1000 * 60 * 10)
      }
      else {
        console.info(`No data found, Waiting for 2min`);
        await waitTime(1000 * 60 * 2);
      }       
    }
  } catch (error) {
    console.error("unable to update", error);
    await waitTime(1000 * 60 *3); // while error wait for 3min for next poll
  }
}

const startPollingClipOutbox = async()=>{
  while (true) {
      totalDataPollCount ++;
      console.info(`new polling started TOTAL_POLL_COUNT: ${totalDataPollCount}`);
      await findAndUpdateOutbox();
      await waitTime(1000 * 30)
  }
}

startPollingClipOutbox();