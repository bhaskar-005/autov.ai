import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotevn from 'dotenv';

dotevn.config();
const User = process.env.POSTGRES_USERNAME;
const Password = process.env.POSTGRES_PASSWORD;
const Host = process.env.POSTGRES_DB_HOST;
const db_name = process.env.POSTGRES_DB_NAME;

export const client = new Client({
  user: User,
  host: Host,
  database: db_name, 
  password: Password,
  port: 27190,
  ssl: {
    rejectUnauthorized: true,
    ca: [fs.readFileSync(path.resolve("./pg.pem"), "utf-8")]
  }
})

let isConnected = false;
export const connectToDb = async () => {
  try {
    if (!isConnected) { 
      await client.connect();
      isConnected = true;
      console.log('Database connection established successfully.');
    }
  } catch (error) {
    isConnected = false;
    console.error("Error connecting to the database:", error);
  }
};

