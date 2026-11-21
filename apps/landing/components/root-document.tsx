import "@workspace/ui/globals.css"
import { geist, geistMono } from "@/lib/fonts"
import type { Lang } from "@/lib/i18n"

/** Wspólny dokument HTML dla wersji językowych (każda grupa tras ma własny root layout z atrybutem `lang`). */
export function RootDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`dark ${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-[100dvh] bg-background font-[family-name:var(--font-geist)] text-foreground antialiased selection:bg-white/20">{children}</body>
    </html>
  )
}
