/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  experimental: {
    instrumentationHook: true,
    esmExternals: 'loose'
  },
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      },
      {
        source: '/home',
        missing: [
          {
            type: 'cookie',
            key: 'refresh_token'
          },
          {
            type: 'cookie',
            key: 'access_token'
          }
        ],
        destination: '/auth/login',
        permanent: false
      },
      {
        source: '/auth/login',
        has: [
          {
            type: 'cookie',
            key: 'refresh_token'
          }
        ],
        destination: '/home',
        permanent: false
      }
    ];
  }
};

export default nextConfig;
