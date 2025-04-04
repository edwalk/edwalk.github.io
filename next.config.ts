/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/edwalk.github.io', // Add this if your repo name is edwalk.github.io
  assetPrefix: '/edwalk.github.io/', // Add this if your repo name is edwalk.github.io
}

module.exports = nextConfig
