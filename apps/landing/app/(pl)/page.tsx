import { Landing } from "@/components/landing"

// Lista instalatorów z GitHub Releases odświeżana co 10 minut
export const revalidate = 600

export default function Page() {
  return <Landing lang="pl" />
}
