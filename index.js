import { MongoClient } from "mongodb";
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express()
const PORT=process.env.PORT;

const MONGO_URL=process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌😊");
  return client;
}

const client = await createConnection();

app.use(cors());
app.use(express.json());

 app.get('/register', async function (request, response) {
  const data = await client.db("register").collection("signin").find({}).toArray();
 response.send(data);
});

app.post('/register', async function (request, response) {
  const data = request.body;
  const result = await client.db("register").collection("signin").insertOne(data);
  response.send(result);
 });

app.listen(PORT,()=>console.log(`APP is running at ${PORT}`))