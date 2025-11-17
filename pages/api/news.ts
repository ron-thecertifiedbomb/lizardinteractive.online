import type { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

// Define feeds per category
const FEEDS: Record<string, { id: string; url: string }[]> = {
  programming: [
    { id: "hn", url: "https://news.ycombinator.com/rss" },
    { id: "devto", url: "https://dev.to/feed" },
    { id: "github", url: "https://github.blog/feed/" },
    { id: "rprogramming", url: "https://www.reddit.com/r/programming/.rss" },
  ],
  technology: [
    { id: "techcrunch", url: "https://techcrunch.com/feed/" },
    { id: "theverge", url: "https://www.theverge.com/rss/index.xml" },
    { id: "wired", url: "https://www.wired.com/feed/rss" },
  ],
  world: [
    { id: "bbc", url: "http://feeds.bbci.co.uk/news/world/rss.xml" },
    { id: "cnn", url: "http://rss.cnn.com/rss/edition_world.rss" },
  ],
  startups: [
    { id: "techcrunch-startups", url: "https://techcrunch.com/startups/feed/" },
  ],
};

type NormalizedItem = {
  title: string;
  link: string;
  source: string;
  date: string | null;
  image: string | null;
  summary: string;
};

async function fetchFeeds(
  feeds: { id: string; url: string }[]
): Promise<NormalizedItem[]> {
  const parser = new Parser({ defaultRSS: 2.0 });

  const feedPromises = feeds.map(async (f) => {
    try {
      const feed = await parser.parseURL(f.url);
      return (feed.items || []).map((it: any) => {
        let image =
          (it.enclosure && it.enclosure.url) ||
          (it["media:content"] && it["media:content"].url) ||
          (it["media:thumbnail"] && it["media:thumbnail"].url) ||
          null;

        if (!image && it.content) {
          const match = it.content.match(/<img[^>]+src=["']([^"']+)["']/i);
          if (match && match[1]) image = match[1];
        }

        const date = it.isoDate || it.pubDate || null;

        return {
          title: it.title || "Untitled",
          link: it.link || it.guid || "#",
          source: feed.title || f.id,
          date,
          image,
          summary:
            (it.contentSnippet && it.contentSnippet.substring(0, 220)) ||
            (it.summary && it.summary.substring(0, 220)) ||
            "",
        };
      });
    } catch {
      return [];
    }
  });

  const results = (await Promise.all(feedPromises)).flat();
  return results
    .sort((a, b) =>
      a.date && b.date
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : 0
    )
    .slice(0, 24);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;
  const categoryStr =
    typeof category === "string" ? category.toLowerCase() : "";

  const feeds = FEEDS[categoryStr] || [];

  if (!feeds.length) {
    return res.status(404).json({ error: "Category not found" });
  }

  const items = await fetchFeeds(feeds);
  res.status(200).json(items);
}
