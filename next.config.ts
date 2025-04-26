import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	webpack: (config) => {
		config.ignoreWarnings = [{ module: /@opentelemetry\/instrumentation/ }];
		return config;
	},
=======
  /* config options here */
>>>>>>> develop
};

export default nextConfig;
