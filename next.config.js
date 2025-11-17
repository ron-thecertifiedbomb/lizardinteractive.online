const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      "dev.to",
      "news.ycombinator.com",
      "github.blog",
      "www.redditstatic.com",
      "techcrunch.com",
      "www.theverge.com",
      "www.wired.com",
      "news.bbcimg.co.uk",
      "cdn.cnn.com",
    ],
  },
});
