/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'react-native-sqlite-storage': false,
      '@sap/hana-client/extension/Stream': false,
      'mysql': false,
    };
    
    return config;
  },
};

export default nextConfig;
