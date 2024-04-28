/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dummyjson.com",
      },

      {
        hostname:"files.stripe.com"
      }
    ],
  },
};

export default nextConfig;
