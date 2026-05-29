import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ["gamedig"],
  async redirects() {
    return [
      {
        source: "/servers/cs16",
        destination: "/ro/server/cs16-classic",
        statusCode: 301,
      },
      {
        source: "/servers/respawn",
        destination: "/ro/server/respawn",
        statusCode: 301,
      },
      {
        source: "/servers/cs2",
        destination: "/ro/server/cs2",
        statusCode: 301,
      },
      {
        source: "/servers/global",
        destination: "/ro/server/global",
        statusCode: 301,
      },
      {
        source: "/ro/servers/cs16",
        destination: "/ro/server/cs16-classic",
        statusCode: 301,
      },
      {
        source: "/en/servers/cs16",
        destination: "/en/server/cs16-classic",
        statusCode: 301,
      },
      {
        source: "/ro/servers/respawn",
        destination: "/ro/server/respawn",
        statusCode: 301,
      },
      {
        source: "/en/servers/respawn",
        destination: "/en/server/respawn",
        statusCode: 301,
      },
      {
        source: "/ro/servers/cs2",
        destination: "/ro/server/cs2",
        statusCode: 301,
      },
      {
        source: "/en/servers/cs2",
        destination: "/en/server/cs2",
        statusCode: 301,
      },
      {
        source: "/ro/servers/global",
        destination: "/ro/server/global",
        statusCode: 301,
      },
      {
        source: "/en/servers/global",
        destination: "/en/server/global",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
