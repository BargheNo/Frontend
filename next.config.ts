import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: false,
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	webpack: (config) => {
		config.ignoreWarnings = [{ module: /@opentelemetry\/instrumentation/ }];
		return config;
	},
	images: {
		domains: [
			"barghe-no-profile-pic.s3.ir-thr-at1.arvanstorage.ir",
			"barghe-no-ticket-image.s3.ir-thr-at1.arvanstorage.ir",
		],

		remotePatterns: [
			{
			  protocol: "https",
			  hostname: "barghe-no-ticket-image.s3.ir-thr-at1.arvanstorage.ir",
			},
		  ],
		  
	},
};

export default nextConfig;
