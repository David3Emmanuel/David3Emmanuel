export const env = {
  STRAPI_URL: import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337',
  SITE_URL: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
} as const
