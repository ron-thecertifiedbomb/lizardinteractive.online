import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Path to your mongo client file
import { BlogArticle } from "@/data/lists/blogArticle";
// Path to your interface

const DB_NAME = "production";
const COLLECTION_NAME = "articles";

// GET: Fetch all articles or a single one via ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    if (id) {
      const article = await db.collection(COLLECTION_NAME).findOne({ id });
      return NextResponse.json(article);
    }

    const articles = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(articles);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}

// POST: Create or Update an article (Upsert)
export async function POST(request: Request) {
  try {
    const body: BlogArticle = await request.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Auto-generate a slug (id) from the title if not provided
    if (!body.id && body.title) {
      body.id = body.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    // Auto-use the featured image for the social sharing (OG) image if not provided
    if (!body.ogImage && body.image) {
      body.ogImage = body.image;
    }

    // We use 'id' (the slug) as the unique identifier instead of Mongo's _id
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { id: body.id },
        { $set: { ...body, updatedAt: new Date().toISOString() } },
        { upsert: true },
      );

    return NextResponse.json({ success: true, result });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to save article" },
      { status: 500 },
    );
  }
}
