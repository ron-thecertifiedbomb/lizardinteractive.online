import { GetServerSideProps } from "next";
import { utilities } from "@/data/lists/utilities";

const generateSitemap = () => {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "https://www.lizardinteractive.online";
    const today = new Date().toISOString().split("T")[0];

    const staticPages = [
        { url: "/", priority: "1.0", changefreq: "daily" },
        { url: "/utilities", priority: "0.9", changefreq: "daily" },
        { url: "/about", priority: "0.7", changefreq: "monthly" },
        { url: "/results", priority: "0.7", changefreq: "monthly" },
        { url: "/blogs", priority: "0.8", changefreq: "weekly" },
        { url: "/games", priority: "0.6", changefreq: "weekly" },
        { url: "/services", priority: "0.7", changefreq: "monthly" },
    ];

    const toolPages = utilities.map((tool) => ({
        url: `/utilities/${tool.slug}`,  // ← was /tools/, now /utilities/
        priority: "0.8",
        changefreq: "weekly",
    }));

    const allPages = [...staticPages, ...toolPages];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
            .map(
                (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
            )
            .join("\n")}
</urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const sitemap = generateSitemap();
    res.setHeader("Content-Type", "text/xml");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
    res.write(sitemap);
    res.end();
    return { props: {} };
};

export default function Sitemap() {
    return null;
}