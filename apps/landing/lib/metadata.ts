import type { Metadata } from "next"
import { dictionaries, type Lang } from "./i18n"

export const SITE_URL = "https://getmatechess.vercel.app"

export function buildMetadata(lang: Lang): Metadata {
  const t = dictionaries[lang]
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: lang === "pl" ? "/" : "/en", languages: { pl: "/", en: "/en" } },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: lang === "pl" ? "/" : "/en",
      siteName: "Mate Chess",
      locale: lang === "pl" ? "pl_PL" : "en_US",
      type: "website",
      images: [{ url: "/screens/game.jpg", width: 1440, height: 900, alt: "Mate Chess" }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: ["/screens/game.jpg"] },
  }
}
