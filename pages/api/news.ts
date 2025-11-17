import type { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

const FEEDS = [
  { id: "hn", url: "https://news.ycombinator.com/rss" },
  { id: "devto", url: "https://dev.to/feed" },
  { id: "github", url: "https://github.blog/feed/" },
  { id: "rprogramming", url: "https://www.reddit.com/r/programming/.rss" },
];

type NormalizedItem = {
  title: string;
  link: string;
  source: string;
  date: string | null;
  image: string | null;
  summary: string;
};

async function fetchFeeds(): Promise<NormalizedItem[]> {
  const parser = new Parser({ defaultRSS: 2.0 });

  const feedPromises = FEEDS.map(async (f) => {
    try {
      const feed = await parser.parseURL(f.url);
      return (feed.items || []).map((it: any) => {
        // Try RSS enclosure/media fields first
        let image =
          (it.enclosure && it.enclosure.url) ||
          (it["media:content"] && it["media:content"].url) ||
          (it["media:thumbnail"] && it["media:thumbnail"].url) ||
          null;

        // Fallback: extract first <img> from content HTML
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
  const items = await fetchFeeds();
  res.status(200).json(items);
}
