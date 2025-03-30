import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: "ignore-loader",
    });

    return config;
  },
  async rewrites() {
    return [
      // Allow the following routes to work correctly
      {
        source: '/checkout',
        destination: '/checkout',
      },
      {
        source: '/cart',
        destination: '/cart',
      },
      {
        source: '/checkout_success',
        destination: '/checkout_success',
      },
      {
        source: '/product-detail/:path*',
        destination: '/product-detail/:path*',
      },
      {
        source: '/products/:path*',
        destination: '/products/:path*',
      },
      // Catch-all for other routes (SPA behavior)
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
