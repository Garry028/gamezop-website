import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
};

const withPWA =  withPWAInit({
  dest: "public",
  disable:false,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline:true,
  workboxOptions:{
    disableDevLogs: false,
  }
});



export default withPWA(nextConfig);
