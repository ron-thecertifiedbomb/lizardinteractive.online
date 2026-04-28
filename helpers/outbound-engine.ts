import { MongoClient, ObjectId } from "mongodb";
import nodemailer from "nodemailer";

// MongoDB Connection Caching
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");

  cachedClient = new MongoClient(process.env.MONGODB_URI);
  await cachedClient.connect();
  return cachedClient;
}

export async function processOutboundLead() {
  const client = await connectToDatabase();
  const db = client.db("lizrd_core");
  const collection = db.collection("prospects");

  // 1. Find a lead that hasn't been contacted yet
  const prospect = await collection.findOne({ contacted: false });

  if (!prospect) {
    return { success: false, message: "No fresh leads in lizrd_core." };
  }

  // 2. Configure the Transporter (Resend SMTP)
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  });

  // 3. The "Killer" Audit Template
  const mailOptions = {
    from: `Ronan | Lizrd Interactive <${process.env.EMAIL_FROM}>`,
    replyTo: process.env.REPLY_TO,
    to: prospect.email,
    subject: `Technical Audit: ${prospect.websiteUrl}`,
    html: `
            <div style="font-family: monospace; background: #050505; color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #111;">
                <h2 style="color: #10b981; letter-spacing: -1px;">[LIZRD_PERFORMANCE_PROTOCOL]</h2>
                <p>Hello ${prospect.name},</p>
                <p>I recently analyzed <strong>${prospect.websiteUrl}</strong> for mobile latency.</p>
                <p>Your current architecture is leaking potential revenue due to sub-optimal load times. I specialize in bridging this gap with 100/100 Lighthouse optimizations.</p>
                <p>See my performance ledger here: <a href="https://lizardinteractive.online/results" style="color: #10b981; text-decoration: none; font-weight: bold;">lizardinteractive.online/results</a></p>
                <p>Are you open to a 5-minute technical breakdown of how we can fix this?</p>
                <br />
                <p style="color: #444; font-size: 10px;">Sent via Lizrd Engine v1.0</p>
            </div>
        `,
  };

  // 4. Send Email & Update Database
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

  return { success: true, email: prospect.email };
}
