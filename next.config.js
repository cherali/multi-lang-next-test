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
}

module.exports = nextConfig
