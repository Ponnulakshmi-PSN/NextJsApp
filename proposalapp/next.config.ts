/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/proposal',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
