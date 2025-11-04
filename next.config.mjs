/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'agentic-6218397a.vercel.app']
    }
  }
};

export default nextConfig;
