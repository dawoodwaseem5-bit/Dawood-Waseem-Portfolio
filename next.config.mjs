/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/v2",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
