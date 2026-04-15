const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dev.to" },
      { protocol: "https", hostname: "news.ycombinator.com" },
      { protocol: "https", hostname: "github.blog" },
      { protocol: "https", hostname: "www.redditstatic.com" },
      { protocol: "https", hostname: "techcrunch.com" },
      { protocol: "https", hostname: "www.theverge.com" },
      { protocol: "https", hostname: "www.wired.com" },
      { protocol: "https", hostname: "news.bbcimg.co.uk" },
      { protocol: "https", hostname: "cdn.cnn.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "mcdn.wallpapersafari.com" },
    ],
  },
  // FIX: This block resolves the PDF.js "Object.defineProperty" error
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

module.exports = withMDX(nextConfig);
