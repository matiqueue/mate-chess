import { Providers } from "@/components/providers" // Import komponentu Providers
import { Metadata } from "next" // Import typu Metadata
import { desktopFlagScript } from "@/lib/desktop"

/**
 * Metadane aplikacji.
 *
 * @remarks
 * Autor: matiqueue (Szymon Góral)
 */
export const metadata: Metadata = {
  title: "Mate Chess",
  description: "Play chess online, against a bot or locally – Mate Chess.",
}

/**
 * RootLayout
 *
 * Główny layout aplikacji, który opakowuje zawartość w Providers.
 *
 * @param {object} props - Właściwości komponentu.
 * @param {React.ReactNode} props.children - Zawartość aplikacji.
 * @returns {JSX.Element} Element JSX reprezentujący główny layout.
 *
 * @remarks
 * Autor: matiqueue (Szymon Góral)
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: desktopFlagScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
