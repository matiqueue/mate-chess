"use client"

import { useEffect, useState } from "react"

type WindowAction = "minimize" | "toggleMaximize" | "close"
type Platform = "mac" | "other"

/** Wykonuje akcję na oknie aplikacji desktopowej (Tauri) – import dynamiczny, bo API działa tylko w aplikacji. */
function runWindowAction(action: WindowAction) {
  import("@tauri-apps/api/window")
    .then(({ getCurrentWindow }) => getCurrentWindow()[action]())
    .catch((error) => console.warn("Nie udało się wykonać akcji okna:", error))
}

/**
 * DesktopWindowControls
 *
 * Własne przyciski okna (minimalizuj / maksymalizuj / zamknij) w prawym górnym rogu – aplikacja desktopowa
 * nie ma systemowego paska tytułu. Na macOS w stylu „świateł”, na Windows i Linuksie w stylu Windows.
 * Dodatkowo cienki pasek u góry okna służy do przeciągania okna (podwójne kliknięcie – maksymalizacja).
 * W przeglądarce komponent nic nie renderuje.
 */
export function DesktopWindowControls() {
  const [platform, setPlatform] = useState<Platform | null>(null)

  useEffect(() => {
    if (!("__TAURI_INTERNALS__" in window)) return
    setPlatform(/mac/i.test(navigator.userAgent) ? "mac" : "other")
  }, [])

  if (!platform) return null

  return (
    <>
      <div data-tauri-drag-region className="fixed inset-x-0 top-0 z-[2147483646] h-2.5" />
      {platform === "mac" ? <MacControls /> : <WindowsControls />}
    </>
  )
}

const macButtons: { action: WindowAction; label: string; color: string; glyph: string }[] = [
  { action: "minimize", label: "Minimize", color: "#febc2e", glyph: "M2.5 6h7" },
  { action: "toggleMaximize", label: "Maximize", color: "#28c840", glyph: "M6 2.5v7M2.5 6h7" },
  { action: "close", label: "Close", color: "#ff5f57", glyph: "M3 3l6 6M9 3l-6 6" },
]

function MacControls() {
  return (
    <div className="group fixed right-4 top-3.5 z-[2147483647] flex items-center gap-2">
      {macButtons.map(({ action, label, color, glyph }) => (
        <button
          key={action}
          type="button"
          aria-label={label}
          onClick={() => runWindowAction(action)}
          className="flex h-3 w-3 items-center justify-center rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]"
          style={{ backgroundColor: color }}
        >
          <svg viewBox="0 0 12 12" className="h-2 w-2 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
            <path d={glyph} stroke="rgba(0,0,0,0.6)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      ))}
    </div>
  )
}

const windowsButtons: { action: WindowAction; label: string; glyph: string; danger?: boolean }[] = [
  { action: "minimize", label: "Minimize", glyph: "M1 5.5h9" },
  { action: "toggleMaximize", label: "Maximize", glyph: "M1.5 1.5h8v8h-8z" },
  { action: "close", label: "Close", glyph: "M1.5 1.5l8 8M9.5 1.5l-8 8", danger: true },
]

function WindowsControls() {
  return (
    <div className="fixed right-0 top-0 z-[2147483647] flex">
      {windowsButtons.map(({ action, label, glyph, danger }) => (
        <button
          key={action}
          type="button"
          aria-label={label}
          onClick={() => runWindowAction(action)}
          className={
            "flex h-8 w-11 items-center justify-center text-foreground/80 transition-colors " +
            (danger ? "hover:bg-[#e81123] hover:text-white" : "hover:bg-foreground/10")
          }
        >
          <svg viewBox="0 0 11 11" className="h-2.5 w-2.5" aria-hidden="true">
            <path d={glyph} stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </button>
      ))}
    </div>
  )
}
