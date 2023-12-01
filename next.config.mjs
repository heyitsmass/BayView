/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  experimental: {
    instrumentationHook: true,
    esmExternals: "loose"
  },
  images: {
    remotePatterns: [
      {
        hostname: "loremflickr.com"
      },
      {
        hostname: "cloudflare-ipfs.com"
      },
      {
        hostname: "avatars.githubusercontent.com"
      }
    ]
  },
  //reactStrictMode: false,
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true
      },
      {
        source: "/policies",
        destination: "/policies/privacy",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
