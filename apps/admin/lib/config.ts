/** Adresy usług używanych przez panel admina (patrz apps/web/lib/config.ts). */
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000"

export const ERRORS_WS_URL = process.env.NEXT_PUBLIC_ERRORS_WS_URL || (process.env.NODE_ENV === "development" ? "ws://localhost:3005" : "")
