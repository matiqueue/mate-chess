"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Apple, ArrowRight, Download, ExternalLink, Globe, Laptop, MonitorSmartphone, Monitor, ShieldCheck, Terminal, Zap } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { useIsDesktopApp } from "@/hooks/use-desktop-app"
import { RELEASES_URL, type DesktopAsset, type DesktopPlatform, type DesktopRelease } from "@/lib/releases"

const platforms: { id: DesktopPlatform; icon: typeof Apple }[] = [
  { id: "macos", icon: Apple },
  { id: "windows", icon: Monitor },
  { id: "linux", icon: Terminal },
]

/** Rozpoznaje system odwiedzającego, żeby podpowiedzieć właściwy instalator. */
function detectPlatform(): { platform: DesktopPlatform | null; preferArm: boolean } {
  if (typeof navigator === "undefined") return { platform: null, preferArm: true }
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes("mac")) return { platform: "macos", preferArm: true }
  if (ua.includes("win")) return { platform: "windows", preferArm: false }
  if (ua.includes("linux") && !ua.includes("android")) return { platform: "linux", preferArm: false }
  return { platform: null, preferArm: false }
}

function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(0)} MB`
}

/**
 * Strona pobierania aplikacji desktopowej Mate Chess (Tauri) – macOS, Windows i Linux.
 * Lista plików pochodzi z najnowszego wydania na GitHub Releases.
 */
export function DownloadPage({ release }: { release: DesktopRelease | null }) {
  const { t, i18n } = useTranslation()
  const isDesktopApp = useIsDesktopApp()
  const [detected, setDetected] = useState<{ platform: DesktopPlatform | null; preferArm: boolean }>({ platform: null, preferArm: true })

  useEffect(() => setDetected(detectPlatform()), [])

  const assetsByPlatform = useMemo(() => {
    const map: Record<DesktopPlatform, DesktopAsset[]> = { macos: [], windows: [], linux: [] }
    release?.assets.forEach((asset) => map[asset.platform].push(asset))
    return map
  }, [release])

  const recommended = useMemo(() => {
    if (!detected.platform) return null
    const assets = assetsByPlatform[detected.platform]
    if (detected.platform === "macos") return assets.find((a) => a.kind === (detected.preferArm ? "macArm" : "macIntel")) ?? assets[0] ?? null
    if (detected.platform === "windows") return assets.find((a) => a.kind === "exe") ?? assets[0] ?? null
    return assets.find((a) => a.kind === "appimage") ?? assets[0] ?? null
  }, [assetsByPlatform, detected])

  const releaseDate = release ? new Date(release.publishedAt).toLocaleDateString(i18n.language || "en") : null

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Baner – w stylu strony debiutów */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mb-12">
        <Card className="overflow-hidden relative">
          <div className="absolute inset-0 m-5 rounded-lg bg-cover bg-center grayscale" style={{ backgroundImage: "url('/backgrounds/playBgImage.png')" }}>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-background via-background/85 to-background/40" />
          </div>

          <div className="relative z-10 p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <MonitorSmartphone className="h-3 w-3" />
                {t("downloadPage.badge")}
              </Badge>
              {release && <Badge variant="outline">{t("downloadPage.version", { version: release.version })}</Badge>}
            </div>
            <h1 className="mb-4 text-3xl font-bold">{t("downloadPage.title")}</h1>
            <p className="mb-6 max-w-2xl text-lg text-muted-foreground">{t("downloadPage.subtitle")}</p>

            {isDesktopApp ? (
              <p className="text-sm font-medium">{t("downloadPage.alreadyDesktop")}</p>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                {recommended ? (
                  <Button size="lg" asChild>
                    <a href={recommended.url}>
                      <Download className="mr-2 h-5 w-5" />
                      {t("downloadPage.downloadFor", { os: t(`downloadPage.platforms.${recommended.platform}`) })}
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" asChild>
                    <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" />
                      {t("downloadPage.seeReleases")}
                    </a>
                  </Button>
                )}
                <Button size="lg" variant="outline" asChild>
                  <Link href="/play">
                    <Globe className="mr-2 h-5 w-5" />
                    {t("downloadPage.playInBrowser")}
                  </Link>
                </Button>
              </div>
            )}
            {releaseDate && <p className="mt-4 text-xs text-muted-foreground">{t("downloadPage.released", { date: releaseDate })}</p>}
          </div>
        </Card>
      </motion.div>

      {/* Platformy */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("downloadPage.allPlatforms")}</h2>
        <a
          href={RELEASES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("downloadPage.allReleases")}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-3">
        {platforms.map(({ id, icon: Icon }, index) => {
          const assets = assetsByPlatform[id]
          return (
            <motion.div key={id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.08 }}>
              <Card className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-6 w-6" />
                  </div>
                  {detected.platform === id && <Badge>{t("downloadPage.yourSystem")}</Badge>}
                </div>
                <h3 className="mb-1 text-xl font-bold">{t(`downloadPage.platforms.${id}`)}</h3>
                <p className="mb-6 text-sm text-muted-foreground">{t(`downloadPage.requirements.${id}`)}</p>

                <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
                  {assets.length > 0 ? (
                    assets.map((asset) => (
                      <Button key={asset.name} variant="outline" className="w-full justify-between" asChild>
                        <a href={asset.url}>
                          <span className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            {t(`downloadPage.assets.${asset.kind}`)}
                          </span>
                          <span className="text-xs text-muted-foreground">{formatSize(asset.size)}</span>
                        </a>
                      </Button>
                    ))
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      {t("downloadPage.comingSoon")}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {!release && (
        <Card className="mb-12 p-6">
          <p className="text-sm text-muted-foreground">{t("downloadPage.notAvailable")}</p>
        </Card>
      )}

      {/* Dlaczego wersja desktopowa */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { key: "native", icon: Laptop },
          { key: "fast", icon: Zap },
          { key: "safe", icon: ShieldCheck },
        ].map(({ key, icon: Icon }) => (
          <div key={key} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="mb-1 font-semibold">{t(`downloadPage.features.${key}.title`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`downloadPage.features.${key}.description`)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="ghost" asChild>
          <Link href="/home">
            {t("downloadPage.backHome")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
