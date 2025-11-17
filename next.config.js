const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    domains: [
      "media2.dev.to",
      "cdn.hashnode.com",
      "hacker-news.com",
      "pbs.twimg.com",
      "github.blog",
      "i.redd.it",
      "external-preview.redd.it",
    ],
  },
});
