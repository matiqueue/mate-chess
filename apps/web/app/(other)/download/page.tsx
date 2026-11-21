import type { Metadata } from "next"
import { DownloadPage } from "@/components/download/download-page"
import { getLatestDesktopRelease } from "@/lib/releases"

export const metadata: Metadata = {
  title: "Download desktop app | Mate-Chess",
  description: "Download Mate Chess for macOS, Windows and Linux.",
}

// Lista wydań odświeżana co godzinę (ISR)
export const revalidate = 3600

export default async function Page() {
  const release = await getLatestDesktopRelease()
  return <DownloadPage release={release} />
}
