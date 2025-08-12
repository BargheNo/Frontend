import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        config.ignoreWarnings = [{ module: /@opentelemetry\/instrumentation/ }];
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // Allow all HTTPS domains
            },
            {
                protocol: "http",
                hostname: "**", // Allow all HTTP domains (optional)
            },
        ],
        // domains: [
        //     "barghe-no-profile-pic.s3.ir-thr-at1.arvanstorage.ir",
        //     "barghe-no-ticket-image.s3.ir-thr-at1.arvanstorage.ir",
        //     "barghe-no-blog-media.s3.ir-thr-at1.arvanstorage.ir",
        //     "barghe-no-taxpayer-certificate.s3.ir-thr-at1.arvanstorage.ir",
        //     "barghe-no-news-media.s3.ir-thr-at1.arvanstorage.ir",
        //     "barghe-no-logo-pic.s3.ir-thr-at1.arvanstorage.ir",
        //     "barghe-no-official-newspaper-ad.s3.ir-thr-at1.arvanstorage.ir",
        // ],
        // remotePatterns: [
        //     {
        //         protocol: "https",
        //         hostname:
        //             "barghe-no-ticket-image.s3.ir-thr-at1.arvanstorage.ir",
        //     },
        //     {
        //         protocol: "https",
        //         hostname: "barghe-no-blog-media.s3.ir-thr-at1.arvanstorage.ir",
        //     },
        //     {
        //         protocol: "https",
        //         hostname:
        //             "barghe-no-taxpayer-certificate.s3.ir-thr-at1.arvanstorage.ir",
        //     },
        //     {
        //         protocol: "https",
        //         hostname:
        //             "barghe-no-official-newspaper-ad.s3.ir-thr-at1.arvanstorage.ir",
        //     },
        //     {
        //         protocol: "https",
        //         hostname: "barghe-no-logo-pic.s3.ir-thr-at1.arvanstorage.ir",
        //     },
        //     {
        //         protocol: "https",
        //         hostname: "barghe-no-news-media.s3.ir-thr-at1.arvanstorage.ir",
        //     },
        //     {
        //         protocol: "https",
        //         hostname: "barghe-no-profile-pic.s3.ir-thr-at1.arvanstorage.ir",
        //     },
        // ],
    },
};

export default nextConfig;
