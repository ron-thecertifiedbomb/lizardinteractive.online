const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: false,
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

  // ADDED: Webpack fix for tls/net/fs errors
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "x-robots-tag",
            value: "index, follow",
          },
        ],
      },
      {
        source: "/roms/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
