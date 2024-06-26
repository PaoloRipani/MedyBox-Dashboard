/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '',
  // Uncomment and set your asset prefix if needed
  assetPrefix: 'https://test.3danimate.it/medyboxdashboard/',
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