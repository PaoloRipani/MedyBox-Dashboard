/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://www.gesiqa.it/' : '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  distDir: "build",
  output: "export",
}

module.exports = nextConfig