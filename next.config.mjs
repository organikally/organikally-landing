/** @type {import('next').NextConfig} */
const nextConfig = {
  // `output: 'export'` REMOVED (STORE_CONTRACT §2.1): Vercel runs the Next.js server
  // so the /store/** routes can be request-time SSR (PDP) + ISR (listing). Marketing
  // routes (/, /journal/**) stay statically rendered — no perf/Lighthouse regression.
  reactStrictMode: true,
  trailingSlash: true, // keep the existing URL shape (/store/, /store/<slug>/)
  // Storefront reuses the house <img>/Media.tsx pattern, so the Vercel image
  // optimizer is intentionally NOT engaged (no remotePatterns open-proxy). Backend
  // media is already AVIF/WebP at origin. Keeps the Cloudflare fallback trivial.
  images: { unoptimized: true },
};

export default nextConfig;
