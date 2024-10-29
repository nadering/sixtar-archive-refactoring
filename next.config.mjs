/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: "/:mode",
        destination: "/",
        permanent: true,
      },
    ]
  },
  reactStrictMode: false,
};

export default nextConfig;
