/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.imagin.studio", "api.carmd.com"]
    },
    typescript: {
        ignoreBuildErrors: true
    }
}

module.exports = nextConfig
