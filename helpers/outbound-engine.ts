import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";
import { getAuditEmailHtml } from "./email-template";

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cachedClient = new MongoClient(process.env.MONGODB_URI);
  await cachedClient.connect();
  return cachedClient;
}

export async function processOutboundLead() {
  const client = await connectToDatabase();
  // We explicitly target lizrd_core to avoid falling into the "test" db trap
  const db = client.db("lizrd_core");
  const collection = db.collection("prospects");

  // 1. LIZARD DEBUG: Check what the engine actually sees
  const totalCount = await collection.countDocuments();
  console.log(
    `Pantry Check: ${totalCount} total docs in ${db.databaseName}.prospects`,
  );

  // 2. Fetch leads (Targeting anything NOT true to be safe)
  const prospects = await collection
    .find({
      contacted: { $ne: true },
    })
    .toArray();

  if (prospects.length === 0) {
    return {
      success: false,
      message: "No fresh leads found.",
      meta: { db: db.databaseName, totalInColl: totalCount },
    };
  }

  // 3. Setup Transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    secure: false,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  });

  const results = [];

  // 4. Execution Loop
  for (const prospect of prospects) {
    const firstName = prospect.name.split(" ")[0].replace(/,/g, "");

    const mailOptions = {
      from: `Ronan | Lizrd Interactive <${process.env.EMAIL_FROM}>`,
      to: prospect.email,
      bcc: process.env.REPLY_TO,
      replyTo: process.env.REPLY_TO,
      subject: `Performance Gap: ${prospect.websiteUrl} (Mobile Latency Audit)`,
      html: getAuditEmailHtml(firstName, prospect.websiteUrl),
      attachments: [
        {
          filename: "performance-audit.jpg",
          path: `https://www.lizardinteractive.online/email_image.jpg`,
          cid: "email_image",
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);

      // Update DB so we don't double-strike
      await collection.updateOne(
        { _id: prospect._id },
        {
          $set: {
            contacted: true,
            contactedAt: new Date(),
            status: "audit_sent",
          },
        },
      );
      results.push(prospect.email);
      console.log(`Strike Successful: ${prospect.email}`);
    } catch (err) {
      console.error(`Strike Failed: ${prospect.email}`, err);
    }
  }

  return {
    success: true,
    sentCount: results.length,
    deliveredTo: results,
  };
}
