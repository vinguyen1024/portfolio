/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        deviceSizes: [640, 1280],
        imageSizes: [288, 395, 576, 790],
        formats: ['image/avif', 'image/webp'],
    }
};

export default nextConfig;
