/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  // assetPrefix: 'https://www.gesiqa.it/',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  distDir: "build",
  output: "export",
}

module.exports = nextConfig