import fs from "fs";
import path from "path";
import { getAuditEmailHtml } from "./email-template";

// 1. Generate the HTML with dummy data
let html = getAuditEmailHtml("Ronan", "https://example.com");

// 2. Replace the email-specific CID with a relative path for local browser viewing
html = html.replace("cid:email_image", "../public/email_image.jpg");

// 3. Write it to a file
const outputPath = path.join(process.cwd(), "email-preview.html");
fs.writeFileSync(outputPath, html);

console.log(`✅ Email preview generated at: ${outputPath}`);
console.log(
  `Double-click the file or drag it into your web browser to view the design.`,
);
