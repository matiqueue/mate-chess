import Image from "next/image"
import { Apple, ArrowUpRight, Monitor, Terminal, Users } from "lucide-react"
import {
  siGithub,
  siNextdotjs,
  siReact,
  siRust,
  siSocketdotio,
  siTailwindcss,
  siTauri,
  siThreedotjs,
  siTurborepo,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons"

import { dictionaries, type Lang } from "@/lib/i18n"
import { DOWNLOAD_PAGE_URL, GITHUB_URL, LICENSE_URL, PLAY_URL, WEB_APP_URL } from "@/lib/links"
import { getLatestDesktopRelease, RELEASES_URL, type DesktopAsset, type DesktopPlatform } from "@/lib/releases"
import { DownloadButton } from "./download-button"
import { Reveal } from "./reveal"
import { SiteNav } from "./site-nav"

const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const primaryButton =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-foreground/90 active:scale-[0.98]"
const secondaryButton =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-foreground transition hover:bg-white/5 active:scale-[0.98]"

const stack: SimpleIcon[] = [siNextdotjs, siReact, siTypescript, siTauri, siRust, siThreedotjs, siSocketdotio, siTailwindcss, siTurborepo, siVercel]

function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor">
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  )
}

/** Zrzut ekranu aplikacji w ramce okna przeglądarki (prawdziwy screenshot z matechess.vercel.app). */
function BrowserShot({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex h-9 items-center gap-3 border-b border-white/[0.06] px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="mx-auto rounded-full bg-white/[0.06] px-3 py-0.5 font-mono text-[11px] text-muted-foreground">matechess.vercel.app</span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <Image src={src} alt={alt} width={1440} height={900} priority={priority} sizes="(min-width: 1024px) 720px, 100vw" className="h-auto w-full" />
    </div>
  )
}

const platformIcons: Record<DesktopPlatform, typeof Apple> = { macos: Apple, windows: Monitor, linux: Terminal }

export async function Landing({ lang }: { lang: Lang }) {
  const t = dictionaries[lang]
  const release = await getLatestDesktopRelease()
  const assets: DesktopAsset[] = release?.assets ?? []
  const downloadLabels = { downloadFor: t.cta.downloadFor, download: t.cta.download, platforms: t.desktop.platforms }

  return (
    <>
      <SiteNav t={t} lang={lang} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_60%_60%_at_75%_10%,rgba(255,255,255,0.09),transparent)]"
          />
          <div className={`${container} relative grid items-center gap-12 pb-20 pt-14 md:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:pt-24`}>
            <Reveal>
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{t.hero.eyebrow}</p>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter text-balance md:text-5xl lg:text-[3.5rem]">{t.hero.title}</h1>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted-foreground md:text-lg">{t.hero.subtitle}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={PLAY_URL} className={primaryButton}>
                  {t.cta.play}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
                <DownloadButton assets={assets} labels={downloadLabels} className={secondaryButton} />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="relative lg:[perspective:2000px]">
              <div aria-hidden="true" className="absolute -inset-x-10 -bottom-10 top-1/3 rounded-full bg-white/[0.04] blur-3xl" />
              <div className="relative lg:[transform:rotateY(-5deg)_rotateX(1.5deg)]">
                <BrowserShot src="/screens/game.jpg" alt={t.hero.shotAlt} priority />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Technologie */}
        <section className="border-y border-white/[0.06]">
          <div className={`${container} flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-12`}>
            <p className="shrink-0 text-sm text-muted-foreground">{t.stack}</p>
            <ul className="flex flex-wrap items-center gap-x-9 gap-y-5 text-foreground/45">
              {stack.map((icon) => (
                <li key={icon.slug} className="transition-colors hover:text-foreground/90">
                  <BrandIcon icon={icon} className="h-6 w-6" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Funkcje (bento) */}
        <section id="features" className={`${container} scroll-mt-20 py-24 md:py-32`}>
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">{t.features.title}</h2>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <Reveal className="md:col-span-2 md:row-span-2">
              <article className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl font-semibold tracking-tight">{t.features.bot.title}</h3>
                  <p className="mt-3 max-w-[48ch] leading-relaxed text-muted-foreground">{t.features.bot.body}</p>
                </div>
                <div className="relative ml-8 min-h-[260px] flex-1 overflow-hidden rounded-tl-2xl border-l border-t border-white/10 md:ml-16">
                  <Image
                    src="/screens/bot.jpg"
                    alt={t.features.bot.alt}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/screens/board3d.jpg"
                    alt={t.features.board.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold">{t.features.board.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.features.board.body}</p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                <div className="p-6">
                  <h3 className="font-semibold">{t.features.puzzles.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.features.puzzles.body}</p>
                </div>
                <div className="relative mt-auto aspect-[16/9] overflow-hidden border-t border-white/[0.06]">
                  <Image
                    src="/screens/puzzles.jpg"
                    alt={t.features.puzzles.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-[60%_45%] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.05}>
              <article className="group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-white/[0.07]">
                <Image
                  src="/screens/openings.jpg"
                  alt={t.features.openings.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-[70%_25%] opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="relative p-6">
                  <h3 className="font-semibold">{t.features.openings.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.features.openings.body}</p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-2">
              <article className="relative flex h-full min-h-[280px] items-end overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-900">
                {/* Szachownica jako faktura tła */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.07] [background-image:conic-gradient(#fff_25%,transparent_0_50%,#fff_0_75%,transparent_0)] [background-size:64px_64px] [mask-image:linear-gradient(to_left,black,transparent_75%)]"
                />
                <div className="relative flex w-full flex-col gap-6 p-8 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08]">
                      <Users className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">{t.features.friends.title}</h3>
                    <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-muted-foreground">{t.features.friends.body}</p>
                  </div>
                  <a href={PLAY_URL} className={`${secondaryButton} shrink-0`}>
                    {t.cta.play}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* Aplikacja desktopowa */}
        <section id="desktop" className="scroll-mt-20 border-t border-white/[0.06] bg-white/[0.015]">
          <div className={`${container} grid items-center gap-14 py-24 md:py-32 lg:grid-cols-2`}>
            <Reveal className="relative order-2 lg:order-1">
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
                <Image
                  src="/screens/desktop.jpg"
                  alt={t.desktop.shotAlt}
                  width={1280}
                  height={821}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" width={96} height={96} className="absolute -bottom-8 -right-4 h-20 w-20 drop-shadow-2xl md:h-24 md:w-24" />
            </Reveal>

            <Reveal delay={0.1} className="order-1 lg:order-2">
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{t.desktop.title}</h2>
              <p className="mt-5 max-w-[50ch] leading-relaxed text-muted-foreground md:text-lg">{t.desktop.body}</p>

              <div className="mt-10 flex flex-col gap-5">
                {(Object.keys(platformIcons) as DesktopPlatform[]).map((platform) => {
                  const Icon = platformIcons[platform]
                  const platformAssets = assets.filter((a) => a.platform === platform)
                  return (
                    <div key={platform} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="flex w-32 items-center gap-2.5 font-medium">
                        <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} aria-hidden="true" />
                        {t.desktop.platforms[platform]}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {platformAssets.length > 0 ? (
                          platformAssets.map((asset) => (
                            <a
                              key={asset.name}
                              href={asset.url}
                              className="rounded-full border border-white/15 px-4 py-1.5 text-sm transition hover:bg-white/5 active:scale-[0.98]"
                            >
                              {t.desktop.assets[asset.kind]}
                            </a>
                          ))
                        ) : (
                          <a href={DOWNLOAD_PAGE_URL} className="rounded-full border border-dashed border-white/15 px-4 py-1.5 text-sm text-muted-foreground">
                            {t.desktop.soon}
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <a href={RELEASES_URL} className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t.desktop.allReleases}
                {release && <span className="font-mono">v{release.version}</span>}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* Liczby */}
        <section className="border-y border-white/[0.06]">
          <div className={`${container} grid grid-cols-2 gap-y-10 py-16 lg:grid-cols-4`}>
            {t.numbers.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.06} className="border-l border-white/[0.08] pl-6">
                <p className="font-mono text-5xl font-medium tracking-tighter md:text-6xl">{item.value}</p>
                <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-muted-foreground">{item.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Zespół */}
        <section id="team" className={`${container} scroll-mt-20 py-24 md:py-32`}>
          <Reveal>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{t.team.eyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{t.team.title}</h2>
            <p className="mt-5 max-w-[60ch] leading-relaxed text-muted-foreground md:text-lg">{t.team.body}</p>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {t.team.members.map((member, index) => (
              <Reveal key={member.github} delay={index * 0.05}>
                <div className="border-t border-white/[0.08] pt-5">
                  <a href={`https://github.com/${member.github}`} className="group block">
                    <p className="text-xl font-medium tracking-tight">{member.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                      <BrandIcon icon={siGithub} className="h-3.5 w-3.5" />
                      {member.github}
                    </p>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Końcowe wezwanie do gry */}
        <section className={`${container} pb-24 md:pb-32`}>
          <Reveal>
            <div className="relative flex min-h-[420px] items-center overflow-hidden rounded-2xl border border-white/[0.07]">
              <Image src="/screens/space.jpg" alt="" fill sizes="100vw" className="object-cover object-[70%_50%]" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
              <div className="relative max-w-xl p-8 md:p-14">
                <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{t.final.title}</h2>
                <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">{t.final.body}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href={PLAY_URL} className={primaryButton}>
                    {t.cta.play}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                  <DownloadButton assets={assets} labels={downloadLabels} className={secondaryButton} />
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/[0.06]">
        <div className={`${container} flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between`}>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" width={32} height={32} className="h-8 w-8" />
            <div>
              <p className="font-semibold">Mate Chess</p>
              <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground">
            <a href={WEB_APP_URL} className="transition-colors hover:text-foreground">
              {t.footer.webApp}
            </a>
            <a href={DOWNLOAD_PAGE_URL} className="transition-colors hover:text-foreground">
              {t.footer.download}
            </a>
            <a href={GITHUB_URL} className="transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href={LICENSE_URL} className="transition-colors hover:text-foreground">
              {t.footer.license}
            </a>
          </nav>
        </div>
        <div className={`${container} pb-10 text-xs text-muted-foreground`}>
          © {new Date().getFullYear()} {t.footer.rights}
        </div>
      </footer>
    </>
  )
}
