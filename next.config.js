/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

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

module.exports = withTM({
  nextConfig
});
