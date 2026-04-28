// lib/scraper.ts
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

chromium.use(stealth());

export async function scrapeJobbers() {
  // 1. Launch with headless: false so you can see if you need to click a "Human" box
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();

  try {
    console.log("🌐 Navigating to Jobbers (Stealth Mode)...");

    // Use 'commit' to get in fast, then we wait manually
    await page.goto("https://www.jobbers.io/en/projects", {
      waitUntil: "commit",
      timeout: 60000,
    });

    // 2. Human-like pause to let Cloudflare finish its check
    console.log("⏳ Letting page settle...");
    await page.waitForTimeout(7000);

    // 3. Search for any project link
    console.log("📡 Looking for project links...");
    const selector = 'a[href*="/project/"]';
    await page.waitForSelector(selector, { timeout: 30000 });

    const jobs = await page.evaluate(() => {
      // Find all elements that look like cards or list items
      const cards = Array.from(
        document.querySelectorAll("li, .card, .project-item"),
      );
      return cards
        .map((el) => {
          const link = el.querySelector(
            'a[href*="/project/"]',
          ) as HTMLAnchorElement;
          const title = el.querySelector("h3, h4, .title, strong");
          const desc = el.querySelector("p, .description, .text-muted");

          return {
            title: title?.textContent?.trim() || "",
            description: desc?.textContent?.trim() || "",
            link: link?.href || "",
          };
        })
        .filter((j) => j.title.length > 5 && j.link !== "");
    });

    await browser.close();
    return jobs;
  } catch (error) {
    await page.screenshot({ path: "debug-screenshot.png" });
    console.log("📸 Screenshot updated. Check it for Cloudflare boxes.");
    await browser.close();
    throw error;
  }
}
