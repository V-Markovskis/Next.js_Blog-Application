/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.familyhandyman.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media.hswstatic.com",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
};
