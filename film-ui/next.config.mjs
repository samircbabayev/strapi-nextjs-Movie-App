/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost"], // Add 'localhost' to allowed domains
  },
};

export default nextConfig;
