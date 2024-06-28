/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dummyjson.com",
      },

      {
        hostname:"files.stripe.com"
      },
      {
        hostname:"lh3.googleusercontent.com"
      }
    ],
  },
};

export default nextConfig;
