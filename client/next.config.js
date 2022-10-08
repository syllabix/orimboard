/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    API_URL: "http://localhost:8080",
  }
}

module.exports = nextConfig
