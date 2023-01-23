/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true
  },
  images: {
    unoptimized: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }]
    });

    return config;
  }
};
const SentryWebpackPluginOptions = {
  silent: true
};

const withPlugins = require('next-compose-plugins');
const { withSentryConfig } = require('@sentry/nextjs');

const withTM = require('next-transpile-modules')([
  '@fullcalendar/react',
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
  '@fullcalendar/daygrid'
]);

module.exports = withSentryConfig(
  withPlugins([withTM, SentryWebpackPluginOptions], {
    ...nextConfig,
    async rewrites() {
      return {
        fallback: [
          {
            source: '/api/:path*',
            destination: `http://localhost:8080/:path*`
          }
        ]
      };
    }
  })
);
