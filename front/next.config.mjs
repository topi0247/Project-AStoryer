import createNextIntlPlugin from "next-intl/plugin"
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.jp', 'aceternity.com'], // ダミー画像のURLを許可
  }
};

export default withNextIntl(nextConfig);
