/**
 * Centralna konfiguracja adresów usług używanych przez frontend.
 *
 * - `SERVER_URL` – serwer gry (Express + Socket.io, `apps/server`). Lokalnie domyślnie `http://localhost:4000`,
 *   w produkcji ustaw `NEXT_PUBLIC_SERVER_URL`.
 * - `ERRORS_WS_URL` – serwis logów błędów (`apps/errors`). Domyślnie włączony tylko w trybie deweloperskim,
 *   żeby odwiedzający wdrożoną stronę nie łączyli się z `localhost`.
 */
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000"

export const ERRORS_WS_URL = process.env.NEXT_PUBLIC_ERRORS_WS_URL || (process.env.NODE_ENV === "development" ? "ws://localhost:3005" : "")
