/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MID_CLIENT_KEY: process.env.MID_CLIENT_KEY,
  },
};

export default nextConfig;
