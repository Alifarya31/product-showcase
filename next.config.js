/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Product images are loaded straight from FakeStore by the visitor's browser.
    // Routing them through Vercel's image optimizer fails when FakeStore blocks
    // requests that come from Vercel's servers.
    unoptimized: true,
  },
};

module.exports = nextConfig;
