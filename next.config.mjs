/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // Set this to true to ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Set this to true to ignore TypeScript errors
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL, // Example environment variable
    LoginURL: process.env.LoginURL,
  },
};

export default nextConfig;
