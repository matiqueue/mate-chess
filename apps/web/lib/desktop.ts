/** Klucz w localStorage ustawiany, gdy strona działa w aplikacji desktopowej (Tauri ładuje `/home?desktop=1`). */
export const DESKTOP_APP_STORAGE_KEY = "mateChessDesktop"

/**
 * Skrypt uruchamiany przed hydratacją (app/layout.tsx) – zapamiętuje flagę `?desktop=1`,
 * żeby po nawigacji w aplikacji desktopowej nie pokazywać zachęt do jej pobrania.
 */
export const desktopFlagScript = `try{if(new URLSearchParams(location.search).get("desktop")==="1")localStorage.setItem("${DESKTOP_APP_STORAGE_KEY}","1")}catch(e){}`
