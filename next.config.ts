import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	webpack: (config) => {
		config.ignoreWarnings = [
			{ module: /@opentelemetry\/instrumentation/ }
		];
		return config;
	}
};

export default nextConfig;
