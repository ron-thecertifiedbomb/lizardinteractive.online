// lib/scraper.ts
import * as cheerio from "cheerio";
import * as fs from "fs";

export async function scrapeJobbers() {
  console.log("🌐 Sending request to We Work Remotely via Proxy API...");

  const API_KEY =
    "QK9HZCWVB5L46MBCNTEQ9J0KAU9569WP57VPRHBHRDPB4XMCO3VECC0QC5U0BG2TW1QZNO5BFIWY4EMP";

  // Targeting the "Front End" section specifically
  const targetUrl = encodeURIComponent(
    "https://weworkremotely.com/categories/remote-front-end-programming-jobs",
  );

  const proxyUrl = `https://app.scrapingbee.com/api/v1/?api_key=${API_KEY}&url=${targetUrl}&render_js=true`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`Proxy failed: ${response.status}`);

    const html = await response.text();
    fs.writeFileSync("debug-wwr.html", html);

    const $ = cheerio.load(html);
    const jobs: any[] = [];

    console.log("📡 Parsing We Work Remotely results...");

    // WWR uses <li> tags inside a .jobs container
    $("section.jobs article ul li").each((_, el) => {
      const titleEl = $(el).find(".title");
      const companyEl = $(el).find(".company");
      const linkEl = $(el).find("a[href^='/remote-jobs/']");
      const regionEl = $(el).find(".region");

      const title = titleEl.text().trim();
      const company = companyEl.text().trim();
      const link = linkEl.attr("href") || "";
      const region = regionEl.text().trim();

      if (title && link) {
        jobs.push({
          title: title,
          company: company,
          description: `Location: ${region}. Found on We Work Remotely.`,
          link: `https://weworkremotely.com${link}`,
          source: "WeWorkRemotely",
          postedAt: new Date().toISOString(),
        });
      }
    });

    console.log(`✅ Found ${jobs.length} roles.`);
    return jobs;
  } catch (error) {
    console.error("❌ Scrape failed:", error);
    throw error;
  }
}
