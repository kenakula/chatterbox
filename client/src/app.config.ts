export const appConfig = {
  mode: import.meta.env.VITE_NODE_ENV,
  apiUrl: import.meta.env.VITE_BASE_API_URL,
  authCookieName: import.meta.env.VITE_JWT_COOKIE_NAME,
};
