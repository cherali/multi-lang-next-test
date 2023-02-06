/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  optimizeFonts: true,
  productionBrowserSourceMaps: true,
  i18n: {
    locales: ['en', 'fa', 'default'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  compiler: {
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production' && {
      exclude: ['error'],
    },
  },
}

module.exports = nextConfig
