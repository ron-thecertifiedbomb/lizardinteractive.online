import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const uri = process.env.MONGO_URI;

async function fetchPortfolio() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("portfolioDB");
    const collection = db.collection("portfolio");

    const data = await collection.findOne({});
    console.log(data);
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    await client.close();
  }
}

fetchPortfolio();
