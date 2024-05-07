module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        //   pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "edzer.s3.amazonaws.com",
        port: "",
        //   pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "suzanawsbucket.s3.ap-south-1.amazonaws.com",
        port: "",
        //   pathname: '/account123/**',
      },
    ],
  },
  webpack: (config) => {
    // Add the file loader configuration for PDF files
    config.module.rules.push({
      test: /\.(pdf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next",
          name: "static/media/[name].[hash].[ext]",
        },
      },
    });

    // Disable canvas alias
    config.resolve.alias.canvas = false;

    return config;
  },
};
