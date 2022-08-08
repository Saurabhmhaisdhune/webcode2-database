import { MongoClient } from "mongodb";
import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const PORT=process.env.PORT;

// const MONGO_URL = "mongodb://127.0.0.1:27017";

const MONGO_URL=process.env.MONGO_URL;
// mongodb+srv://saurabhm:sam1234@cluster0.jftmdkp.mongodb.net

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌😊");
  return client;
}

const client = await createConnection();

app.use(express.json());


 app.get('/register', async function (request, response) {
  const datas = await client.db("register").collection("signin").find({}).toArray();
 response.send(datas)
});

app.post('/register/data', async function (request, response) {
  const data = request.body;
  const result = await client.db("register").collection("signin").insertOne(data);
  
  response.send(result);
 });

app.listen(PORT)