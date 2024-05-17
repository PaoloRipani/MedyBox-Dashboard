/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

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
  i18n,
  env: {
    SKETCHFAB_API_KEY: process.env.SKETCHFAB_API_KEY,
  },
  exportTrailingSlash: true,
};

module.exports = nextConfig;