import type { NextConfig } from "next";
import millionLint from "@million/lint";

const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
};

export default millionLint.next({ rsc: true })(nextConfig);
