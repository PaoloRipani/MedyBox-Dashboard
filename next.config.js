/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/web',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://www.aloisiprogetti.com/web/' : '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  distDir: "build",
  output: "export",
}

module.exports = nextConfig