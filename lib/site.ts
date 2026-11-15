// The site's public address, used to build full links for social sharing
// (Facebook, Viber, WhatsApp need "https://..." links, not "/vlogs").
//
// Where it comes from, in order:
// 1. NEXT_PUBLIC_SITE_URL: set this when MentorLann has its own domain,
//    e.g. NEXT_PUBLIC_SITE_URL=https://mentorlann.com
// 2. On Vercel: Vercel gives the production address automatically
//    (VERCEL_PROJECT_PRODUCTION_URL, without "https://").
// 3. On your own computer: http://localhost:3000
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "MentorLann";
