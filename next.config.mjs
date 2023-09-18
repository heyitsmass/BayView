/** @type {import('next').NextConfig} */
import { merge } from 'webpack-merge';

const config = (fb, { defaultConfig }) => {
  return {
    webpack: (cfg, { isServer, ...ctx }) => {
      if (isServer) {
        return merge(cfg, {
          module: {
            rules: [
              {
                test: /\.node$/,
                loader: 'node-loader'
              }
            ]
          },
          node: {
            __dirname: false
          }
        });
      }
      return cfg;
    },
    redirects: async () => [
      {
        source: '/',
        permanent: true,
        destination: '/home'
      }
    ],
    experimental: {
      serverActions: true,
      esmExternals: 'loose',
      instrumentationHook: true
    }
  };
};

export default config;
