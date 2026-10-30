/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — `npm run build` emits a fully static site in ./out
  // that can be hosted anywhere (Vercel, Netlify, GitHub Pages, S3…).
  output: "export",
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
