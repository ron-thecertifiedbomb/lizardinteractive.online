import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

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
      bcc: process.env.REPLY_TO, // This ensures you get your copy
      replyTo: process.env.REPLY_TO,
      subject: `Performance Gap: ${prospect.websiteUrl} (Mobile Latency Audit)`,
      html: `
        <div style="font-family: monospace; background: #050505; color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #111;">
            <h2 style="color: #10b981; letter-spacing: -1px;">[LIZRD_PERFORMANCE_PROTOCOL]</h2>
            <p>Hello ${firstName},</p>
            <p>I recently analyzed <strong>${prospect.websiteUrl}</strong> for mobile latency.</p>
            <p>Your current architecture is leaking potential revenue due to sub-optimal load times. I specialize in bridging this gap with 100/100 Lighthouse optimizations.</p>
            <p>See my performance ledger here: <a href="https://lizardinteractive.online/results" style="color: #10b981; text-decoration: none; font-weight: bold;">lizardinteractive.online/results</a></p>
            <p>Are you open to a 5-minute technical breakdown of how we can fix this?</p>
            <br />
            <p style="color: #444; font-size: 10px;">Sent via Lizrd Engine v1.0</p>
        </div>
      `,
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
