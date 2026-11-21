"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Contact, MessagesSquare, Newspaper, Shield, Tv, UserPlus, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@workspace/ui/components/button"

/**
 * ComingSoon
 *
 * Spójny ekran dla sekcji, które nie są jeszcze gotowe (zamiast pustej strony).
 *
 * @param section - sekcja (określa tytuł z `comingSoon.pages.<section>` i ikonę)
 */
const sectionIcons = {
  social: Users,
  clubs: Shield,
  forums: MessagesSquare,
  friends: UserPlus,
  members: Contact,
  news: Newspaper,
  watch: Tv,
}

export type ComingSoonSection = keyof typeof sectionIcons

export function ComingSoon({ section }: { section: ComingSoonSection }) {
  const { t } = useTranslation()
  const Icon = sectionIcons[section]

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md rounded-xl border bg-card p-8 text-center text-card-foreground shadow-sm"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Icon className="h-6 w-6" />
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("comingSoon.badge")}</p>
        <h1 className="mb-3 text-2xl font-bold">{t(`comingSoon.pages.${section}`)}</h1>
        <p className="mb-6 text-sm text-muted-foreground">{t("comingSoon.description")}</p>
        <Button asChild>
          <Link href="/home">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("comingSoon.back")}
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
