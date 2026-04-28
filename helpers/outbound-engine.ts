import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

// Reuse the Mongo client to avoid "Too many connections" errors
let cachedClient: MongoClient | null = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  cachedClient = new MongoClient(process.env.MONGODB_URI!);
  await cachedClient.connect();
  return cachedClient;
}

export async function processOutboundLead() {
  const client = await getMongoClient();
  const db = client.db("lizrd_core");
  const collection = db.collection("prospects");

  // 1. Fetch one prospect
  const prospect = await collection.findOne({ contacted: false });
  if (!prospect)
    return { success: false, message: "No leads left in the chamber." };

  // 2. Setup Transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  });

  // 3. Email Template
  const mailOptions = {
    from: process.env.EMAIL_FROM, // ronan@lizardinteractive.online
    replyTo: process.env.REPLY_TO, // lizardinteractive.online@gmail.com
    to: prospect.email,
    subject: `Performance Audit: ${prospect.websiteUrl}`,
    html: `
            <div style="font-family: monospace; background: #050505; color: #fff; padding: 30px; border: 1px solid #111; border-radius: 12px;">
                <h2 style="color: #10b981; text-transform: uppercase;">[LIZRD_PROTOCOL_V1]</h2>
                <p>Attention: ${prospect.name}</p>
                <p>I ran a performance diagnostic on <strong>${prospect.websiteUrl}</strong>.</p>
                <p>The latency metrics are currently sub-optimal. I can bridge the gap to a 100/100 Lighthouse score.</p>
                <p>Check my recent benchmarks: <a href="https://lizardinteractive.online/results" style="color: #10b981;">Performance Ledger</a></p>
                <p>Shall we optimize?</p>
                <br />
                <p style="color: #444;">-- Ronan Sibunga</p>
            </div>
        `,
  };

  // 4. Send and Update
  await transporter.sendMail(mailOptions);
  await collection.updateOne(
    { _id: prospect._id },
    { $set: { contacted: true, contactedAt: new Date() } },
  );

  return { success: true, email: prospect.email };
}
