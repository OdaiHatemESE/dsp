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
   
};

export default nextConfig;
