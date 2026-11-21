import { RootDocument } from "@/components/root-document"
import { buildMetadata } from "@/lib/metadata"

export const metadata = buildMetadata("pl")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="pl">{children}</RootDocument>
}
