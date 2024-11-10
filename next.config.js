/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        path: false,
        os: false,
      };
    }

    // Suppress the warnings
    config.infrastructureLogging = {
      level: 'error',
    };

    // Ignore TypeORM-specific node modules
    config.externals.push({
      'react-native-sqlite-storage': 'react-native-sqlite-storage',
      '@sap/hana-client': '@sap/hana-client',
      'mysql': 'mysql',
      'typeorm': 'typeorm',
    });

    return config;
  },
};

module.exports = nextConfig; 