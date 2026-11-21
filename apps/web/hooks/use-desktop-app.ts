"use client"

import { useEffect, useState } from "react"
import { DESKTOP_APP_STORAGE_KEY } from "@/lib/desktop"

/** Zwraca `true`, gdy strona jest otwarta w aplikacji desktopowej Mate Chess. */
export function useIsDesktopApp() {
  const [isDesktopApp, setIsDesktopApp] = useState(false)

  useEffect(() => {
    try {
      setIsDesktopApp(localStorage.getItem(DESKTOP_APP_STORAGE_KEY) === "1")
    } catch {
      setIsDesktopApp(false)
    }
  }, [])

  return isDesktopApp
}
