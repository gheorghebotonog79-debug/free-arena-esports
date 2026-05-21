import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ["gamedig"],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
