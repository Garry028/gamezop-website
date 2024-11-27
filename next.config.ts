import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["static.gamezop.com"],
  },
};
// hostname "static.gamezop.com" is not configured under images in your `next.config.js`
const withPWA = withPWAInit({
  dest: "public",
  disable: false,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: false,
  }
});



export default withPWA(nextConfig);
