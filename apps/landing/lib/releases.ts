/**
 * Pobieranie informacji o wydaniach aplikacji desktopowej z GitHub Releases (ta sama logika co w apps/web/lib/releases.ts).
 *
 * Wydania budowane są przez workflow `.github/workflows/release.yml` (tauri-action). Szukamy najnowszego
 * opublikowanego wydania, które zawiera instalatory desktopowe – inne wydania w repozytorium są pomijane.
 */
export const GITHUB_REPO = "matiqueue/mate-chess"
export const RELEASES_URL = `https://github.com/${GITHUB_REPO}/releases`

export type DesktopPlatform = "macos" | "windows" | "linux"

export type DesktopAssetKind = "macArm" | "macIntel" | "exe" | "msi" | "appimage" | "deb" | "rpm"

export interface DesktopAsset {
  kind: DesktopAssetKind
  platform: DesktopPlatform
  name: string
  url: string
  size: number
}

export interface DesktopRelease {
  version: string
  publishedAt: string
  url: string
  assets: DesktopAsset[]
}

const assetMatchers: { kind: DesktopAssetKind; platform: DesktopPlatform; test: RegExp }[] = [
  { kind: "macArm", platform: "macos", test: /aarch64\.dmg$/i },
  { kind: "macIntel", platform: "macos", test: /(x64|x86_64)\.dmg$/i },
  { kind: "exe", platform: "windows", test: /-setup\.exe$/i },
  { kind: "msi", platform: "windows", test: /\.msi$/i },
  { kind: "appimage", platform: "linux", test: /\.AppImage$/i },
  { kind: "deb", platform: "linux", test: /\.deb$/i },
  { kind: "rpm", platform: "linux", test: /\.rpm$/i },
]

interface GitHubRelease {
  tag_name: string
  html_url: string
  draft: boolean
  prerelease: boolean
  published_at: string
  assets: { name: string; browser_download_url: string; size: number }[]
}

/** Zwraca najnowsze wydanie z instalatorami desktopowymi albo `null`, gdy takiego jeszcze nie ma. */
export async function getLatestDesktopRelease(): Promise<DesktopRelease | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=30`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 600 },
    })
    if (!res.ok) return null
    const releases = (await res.json()) as GitHubRelease[]

    for (const release of releases) {
      if (release.draft || release.prerelease) continue
      const assets: DesktopAsset[] = []
      for (const asset of release.assets) {
        const match = assetMatchers.find((m) => m.test.test(asset.name))
        if (match) {
          assets.push({ kind: match.kind, platform: match.platform, name: asset.name, url: asset.browser_download_url, size: asset.size })
        }
      }
      if (assets.length > 0) {
        return { version: release.tag_name.replace(/^v/, ""), publishedAt: release.published_at, url: release.html_url, assets }
      }
    }
    return null
  } catch {
    return null
  }
}
