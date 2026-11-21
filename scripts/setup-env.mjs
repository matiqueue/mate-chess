#!/usr/bin/env node
/**
 * Tworzy pliki .env dla aplikacji w monorepo na podstawie zmiennych środowiskowych.
 *
 * Sekrety NIE są trzymane w repozytorium – lokalnie ustaw je w powłoce (albo skopiuj pliki
 * .env.example i uzupełnij ręcznie), a w CI przekaż je z GitHub Secrets.
 *
 * Użycie:
 *   pnpm env:setup            # tworzy brakujące pliki .env (istniejących nie rusza)
 *   pnpm env:setup --force    # nadpisuje istniejące pliki .env
 */
import { existsSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const force = process.argv.includes("--force")

/** Zmienne dla każdej aplikacji: [nazwa, wartość domyślna | null (sekret, brak domyślnej)] */
const apps = {
  "apps/web": [
    ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", null],
    ["CLERK_SECRET_KEY", null],
    ["NEXT_PUBLIC_CLERK_SIGN_IN_URL", "/sign-in"],
    ["NEXT_PUBLIC_CLERK_SIGN_UP_URL", "/sign-up"],
    ["NEXT_PUBLIC_SERVER_URL", "http://localhost:4000"],
    ["DATABASE_URL", null],
  ],
  "apps/errors": [["GROQ_API_KEY", null]],
  "apps/admin": [
    ["NEXT_PUBLIC_ADMIN_USERNAME", null],
    ["NEXT_PUBLIC_ADMIN_PASSWORD", null],
  ],
}

let missing = 0
for (const [app, vars] of Object.entries(apps)) {
  const file = join(root, app, ".env")
  if (existsSync(file) && !force) {
    console.log(`= ${app}/.env już istnieje – pomijam (użyj --force, aby nadpisać)`)
    continue
  }
  const lines = []
  for (const [name, fallback] of vars) {
    const value = process.env[name] ?? fallback
    if (value == null || value === "") {
      console.warn(`! ${app}: brak zmiennej ${name} – uzupełnij ją ręcznie w ${app}/.env`)
      missing++
      lines.push(`${name}=`)
    } else {
      lines.push(`${name}=${value}`)
    }
  }
  writeFileSync(file, lines.join("\n") + "\n")
  console.log(`+ zapisano ${app}/.env`)
}

if (missing > 0) {
  console.warn(`\nBrakuje ${missing} zmiennych – aplikacje mogą nie działać poprawnie, dopóki ich nie uzupełnisz.`)
}
