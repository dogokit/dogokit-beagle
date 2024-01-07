declare global {
  interface Window {
    ENV: {
      NODE_ENV: string
      SENTRY_DSN: string
    }
  }
}

export const isDevelopment = window.ENV.NODE_ENV === "development"
export const isProduction = window.ENV.NODE_ENV === "production"
