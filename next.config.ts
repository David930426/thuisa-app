import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The placeholder artwork in /public/images is SVG. Next refuses to
    // optimise SVG unless this is on. Everything served here is our own file,
    // and the CSP below stops an SVG from executing scripts.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
