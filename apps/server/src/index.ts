/**
 * Plik: server.ts
 * Autor: matiqueue (Szymon Góral)
 * Opis: Konfiguracja serwera Express i Socket.IO, zarządzanie lobby oraz logowaniem zdarzeń serwera.
 */

import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import linkRouter from "./api/link"
import onlineRouter from "./api/online"
import { setupSockets } from "./sockets/lobby"
import { Lobby } from "./types"
import chalk from "chalk"

const app = express()
const server = http.createServer(app)

/**
 * Dozwolone adresy frontendu dla Socket.io – lokalnie web (3000) i admin (3001),
 * a po wdrożeniu dodatkowe adresy z CORS_ORIGINS (rozdzielone przecinkami).
 */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  ...(process.env.CORS_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? []),
]

export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true, // Dodaj, jeśli używasz ciasteczek lub autoryzacji
  },
})

export const lobbies: { [key: string]: Lobby } = {}

// Tablica przechowująca logi (max 200)
const serverLogs: string[] = []
const MAX_LOGS = 200

// Namespace dla logów admina
const adminLogsNamespace = io.of("/admin-logs")

/**
 * Usuwa kody ANSI z podanego ciągu znaków.
 *
 * @param {string} str - Ciąg znaków zawierający kody ANSI.
 * @returns {string} Ciąg znaków bez kodów ANSI.
 *
 * @remarks
 * Autor: matiqueue (Szymon Góral)
 * @note ta funkcja jest zrobiona z AI
 */
const stripAnsi = (str: string): string => {
  return str.replace(/\x1B\[[0-9;]*[mK]/g, "")
}

/**
 * Nadpisanie funkcji console.log w celu przechwytywania logów serwera.
 * Przechwycone logi są czyszczone z kodów ANSI, zapisywane w tablicy oraz emitowane do namespace "/admin-logs".
 */
const originalConsoleLog = console.log
console.log = function (...args: any[]) {
  const message = args.map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg))).join(" ")
  originalConsoleLog(message)
  const cleanMessage = stripAnsi(message)
  if (serverLogs.length >= MAX_LOGS) {
    serverLogs.shift()
  }
  serverLogs.push(cleanMessage)
  adminLogsNamespace.emit("log", cleanMessage)
}

/**
 * Obsługa połączeń admina do namespace "/admin-logs".
 * Przy połączeniu wysyłane są wszystkie dotychczasowe logi, a przy rozłączeniu logowany jest komunikat.
 */
adminLogsNamespace.on("connection", (socket) => {
  originalConsoleLog(chalk.bgYellow.black.bold(" [ADMIN] ") + chalk.yellow(" Admin podłączony do logów "))
  socket.emit("initial_logs", serverLogs)
  socket.on("disconnect", () => {
    originalConsoleLog(chalk.bgYellow.black.bold(" [ADMIN] ") + chalk.yellow(" Admin odłączony "))
  })
})

app.use(cors())
app.use(express.json())

app.use("/api", linkRouter)
app.use("/api", onlineRouter)

setupSockets(io)

/**
 * Inicjalizacja serwera HTTP na porcie 4000.
 * Po uruchomieniu logowany jest komunikat o starcie serwera.
 */
const PORT = Number(process.env.PORT) || 4000

server.listen(PORT, () => {
  console.log(chalk.bgGreen.black.bold(" [SERVER] ") + chalk.green(` Serwer uruchomiony na porcie ${PORT} `))
})
