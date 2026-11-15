import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Match only the asset route; broad /reading/* globs also match reader pages.
  outputFileTracingIncludes: { '/reading/\\[file\\]': ['data/reading/*.gz'] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
