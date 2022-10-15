/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  publicRuntimeConfig: {
    BOARD_SERVER_PATH: process.env.BOARD_SERVER_PATH,
    API_SERVER_PATH: process.env.API_SERVER_PATH,
  }
}

module.exports = nextConfig
