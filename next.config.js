/** @type {import('next').NextConfig} */
const nextConfig = {
    // distDir: "build",
    images: {
        unoptimized : true,
        domains: ['mui.com','selife-bucket.s3.ap-south-1.amazonaws.com'],
    },
    experimental: {
        serverActions: {
          bodySizeLimit: '2mb',
        },
    },
}
module.exports = nextConfig