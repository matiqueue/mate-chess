"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { PLAY_URL } from "@/lib/links"
import type { Dictionary, Lang } from "@/lib/i18n"

/** Górna nawigacja (sticky, 64 px). Na telefonach linki chowają się w rozwijanym menu. */
export function SiteNav({ t, lang }: { t: Dictionary; lang: Lang }) {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "#features", label: t.nav.features },
    { href: "#desktop", label: t.nav.desktop },
    { href: "#team", label: t.nav.team },
  ]
  const otherLangHref = lang === "pl" ? "/en" : "/"

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={lang === "pl" ? "/" : "/en"} className="flex items-center gap-2.5 font-semibold tracking-tight">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" width={28} height={28} className="h-7 w-7" />
          Mate Chess
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={otherLangHref}
            aria-label={t.nav.switchLangLabel}
            className="rounded-full px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.switchLang}
          </Link>
          <a
            href={PLAY_URL}
            className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:bg-foreground/90 active:scale-[0.98] sm:inline-flex"
          >
            {t.cta.play}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/[0.06] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm hover:bg-white/5">
                {link.label}
              </a>
            ))}
            <a href={PLAY_URL} className="mt-2 rounded-full bg-foreground px-4 py-2.5 text-center text-sm font-medium text-background">
              {t.cta.play}
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
