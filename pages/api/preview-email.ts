import type { NextApiRequest, NextApiResponse } from "next";
import { getAuditEmailHtml } from "../../helpers/email-template";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let html = getAuditEmailHtml("Ronan", "https://example.com");

  // Point to the public folder image so it renders correctly in the browser
  html = html.replace("cid:email_image", "/email_image.jpg");

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
