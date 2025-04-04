/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '', // Remove basePath since the repo is username.github.io
  assetPrefix: '', // Remove assetPrefix since the repo is username.github.io
}

module.exports = nextConfig
