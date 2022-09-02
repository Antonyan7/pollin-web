/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

const withPlugins = require('next-compose-plugins');

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

module.exports = withPlugins([withTM], {
  nextConfig,
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
});
