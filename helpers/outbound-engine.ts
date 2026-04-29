import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";
import { getAuditEmailHtml } from "./email-template";

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  cachedClient = new MongoClient(process.env.MONGODB_URI!);
  await cachedClient.connect();
  return cachedClient;
}

export async function processOutboundLead() {
  const client = await connectToDatabase();
  const db = client.db("lizrd_core");
  const collection = db.collection("prospects");

  // 1. Fetch ALL uncontacted leads
  const prospects = await collection.find({ contacted: false }).toArray();

  if (prospects.length === 0) {
    return { success: false, message: "No fresh leads found." };
  }

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
      filename: "email_image.jpg",
    
      path: `https://www.lizardinteractive.online/email_image.jpg`,
      cid: "email_image",
    },
  ],
};

    try {
      await transporter.sendMail(mailOptions);
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
    } catch (err) {
      console.error(`Failed: ${prospect.email}`, err);
    }
  }

  return { success: true, sentEmails: results };
}
