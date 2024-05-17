/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '',
  // Uncomment and set your asset prefix if needed
  // assetPrefix: 'https://www.websiteurl.it/',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  distDir: "build",
  output: "export",
  env: {
    SKETCHFAB_API_KEY: process.env.SKETCHFAB_API_KEY,
  },
  trailingSlash: true,
};

module.exports = nextConfig;