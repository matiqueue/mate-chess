"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { DOWNLOAD_PAGE_URL } from "@/lib/links"
import type { DesktopAsset, DesktopPlatform } from "@/lib/releases"

type Detected = { platform: DesktopPlatform; arm: boolean } | null

/** Rozpoznaje system odwiedzającego (Mac z Apple Silicon jest dziś domyślny dla macOS). */
function detectPlatform(): Detected {
  const ua = navigator.userAgent.toLowerCase()
  // Telefony i tablety (UA iPhone'a zawiera „like Mac OS X”) – aplikacja desktopowa nie jest dla nich
  if (/iphone|ipad|ipod|android/.test(ua) || (ua.includes("mac") && navigator.maxTouchPoints > 1)) return null
  if (ua.includes("mac")) return { platform: "macos", arm: true }
  if (ua.includes("win")) return { platform: "windows", arm: false }
  if (ua.includes("linux") && !ua.includes("android")) return { platform: "linux", arm: false }
  return null
}

function pickAsset(assets: DesktopAsset[], detected: NonNullable<Detected>) {
  const forPlatform = assets.filter((a) => a.platform === detected.platform)
  const preferred = { macos: detected.arm ? "macArm" : "macIntel", windows: "exe", linux: "appimage" }[detected.platform]
  return forPlatform.find((a) => a.kind === preferred) ?? forPlatform[0] ?? null
}

/**
 * Przycisk „Pobierz na …” – bezpośrednio pobiera instalator dla wykrytego systemu z najnowszego wydania.
 * Gdy systemu nie da się rozpoznać albo nie ma jeszcze instalatora, prowadzi do strony pobierania w aplikacji web.
 */
export function DownloadButton({
  assets,
  labels,
  className,
}: {
  assets: DesktopAsset[]
  labels: { downloadFor: string; download: string; platforms: Record<DesktopPlatform, string> }
  className?: string
}) {
  const [detected, setDetected] = useState<Detected>(null)
  useEffect(() => setDetected(detectPlatform()), [])

  const asset = detected ? pickAsset(assets, detected) : null
  const label = detected ? labels.downloadFor.replace("{os}", labels.platforms[detected.platform]) : labels.download

  return (
    <a href={asset?.url ?? DOWNLOAD_PAGE_URL} className={className}>
      <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      {label}
    </a>
  )
}
