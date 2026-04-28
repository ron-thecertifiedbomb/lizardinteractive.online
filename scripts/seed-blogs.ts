// scripts/seed-blogs.ts
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import path from "path";
// Update: Ensure this path is 100% correct relative to this script
import { blogArticles } from "../data/lists/blogArticle";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI;
const DB_NAME = "lizrd_core"; // Updated to match your URI
const COLLECTION_NAME = "articles";

async function seed() {
  if (!uri) {
    console.error("❌ MONGODB_URI is missing in .env.local");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    console.log(
      `📦 Seeding ${blogArticles.length} articles into ${DB_NAME}...`,
    );

    for (const article of blogArticles) {
      await collection.updateOne(
        { id: article.id }, // Find by slug
        { $set: article }, // Update all fields
        { upsert: true }, // Create if it doesn't exist
      );
      console.log(`✅ Seeded: ${article.id}`);
    }

    console.log("🚀 Database successfully seeded!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await client.close();
    process.exit();
  }
}

seed();
