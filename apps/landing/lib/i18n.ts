/** Teksty wizytówki po polsku (domyślnie, `/`) i angielsku (`/en`). */
export type Lang = "pl" | "en"

const pl = {
  meta: {
    title: "Mate Chess - szachy w przeglądarce i na komputerze",
    description: "Graj w szachy ze znajomymi i z botem, rozwiązuj łamigłówki i ucz się debiutów. Za darmo w przeglądarce oraz na macOS, Windows i Linuksie.",
  },
  nav: { features: "Funkcje", desktop: "Aplikacja", team: "Zespół", switchLang: "EN", switchLangLabel: "English version" },
  cta: { play: "Zagraj teraz", downloadFor: "Pobierz na {os}", download: "Pobierz aplikację" },
  hero: {
    eyebrow: "Darmowe i open source",
    title: "Twoje szachy, gdziekolwiek grasz.",
    subtitle: "Partie ze znajomymi i z botem, łamigłówki, lekcje i debiuty. Za darmo, na macOS, Windows i Linuksie.",
    shotAlt: "Partia z botem w Mate Chess",
  },
  stack: "Zbudowane na",
  features: {
    title: "Wszystko do gry w jednym miejscu",
    bot: {
      title: "Gra z botem",
      body: "Trzy poziomy trudności. Najmocniejszy bot gra debiutami z partii 12 arcymistrzów, od Morphy'ego po Carlsena.",
      alt: "Wybór poziomu bota",
    },
    board: { title: "Plansza 2D i 3D", body: "Klasyczny widok albo trójwymiarowa szachownica, przełączana w trakcie partii.", alt: "Szachownica 3D" },
    puzzles: { title: "Łamigłówki i quiz", body: "Sprawdź wiedzę i trenuj taktykę krok po kroku.", alt: "Quiz szachowy" },
    openings: { title: "Lekcje i debiuty", body: "Partia włoska, obrona sycylijska, gambit hetmański i więcej.", alt: "Debiuty szachowe" },
    friends: { title: "Gra ze znajomym", body: "Zagraj na jednym komputerze albo wyślij znajomemu link do lobby." },
  },
  desktop: {
    title: "Mate Chess na Twoim pulpicie",
    body: "Lekka aplikacja w osobnym oknie, bez kart przeglądarki. Przy każdym uruchomieniu ładuje najnowszą wersję gry.",
    shotAlt: "Aplikacja desktopowa Mate Chess",
    soon: "Wkrótce",
    allReleases: "Wszystkie wydania",
    platforms: { macos: "macOS", windows: "Windows", linux: "Linux" },
    assets: {
      macArm: "Apple Silicon",
      macIntel: "Intel",
      exe: "Instalator .exe",
      msi: "Instalator .msi",
      appimage: "AppImage",
      deb: "Debian / Ubuntu",
      rpm: "Fedora",
    },
  },
  numbers: [
    { value: "3", label: "tryby gry: lokalnie, z botem i przez link" },
    { value: "12", label: "arcymistrzów w bazie debiutów bota" },
    { value: "3", label: "języki interfejsu: polski, angielski, rosyjski" },
    { value: "3", label: "systemy: macOS, Windows i Linux" },
  ],
  team: {
    eyebrow: "Motorola Science Cup 2024/2025",
    title: "Zespół Digital Gods",
    body: "Mate Chess powstał jako projekt konkursowy pięcioosobowego zespołu. Kod jest otwarty i dostępny na GitHubie.",
    members: [
      { name: "Mateusz Lis", role: "Właściciel projektu", github: "Maxicom0001" },
      { name: "Szymon Góral", role: "Kierownik projektu", github: "matiqueue" },
      { name: "Jakub Batko", role: "Bazy danych i frontend", github: "nasakrator" },
      { name: "Filip Serwatka", role: "Frontend i grafika", github: "awres" },
      { name: "Wojciech Piątek", role: "Frontend i grafika", github: "wojooo" },
    ],
  },
  final: { title: "Pierwszy ruch należy do Ciebie.", body: "Bez instalacji i bez reklam. Otwórz grę w przeglądarce albo pobierz aplikację." },
  footer: { tagline: "Szachy w przeglądarce i na komputerze.", webApp: "Aplikacja web", download: "Pobieranie", license: "Licencja", rights: "Digital Gods" },
}

const en: typeof pl = {
  meta: {
    title: "Mate Chess - chess in your browser and on your computer",
    description: "Play chess with friends and against a bot, solve puzzles and learn openings. Free in the browser and on macOS, Windows and Linux.",
  },
  nav: { features: "Features", desktop: "Desktop", team: "Team", switchLang: "PL", switchLangLabel: "Wersja polska" },
  cta: { play: "Play now", downloadFor: "Download for {os}", download: "Download the app" },
  hero: {
    eyebrow: "Free and open source",
    title: "Your chess, wherever you play.",
    subtitle: "Games with friends and against a bot, puzzles, lessons and openings. Free on macOS, Windows and Linux.",
    shotAlt: "A game against the bot in Mate Chess",
  },
  stack: "Built with",
  features: {
    title: "Everything you need to play",
    bot: {
      title: "Play the bot",
      body: "Three difficulty levels. The strongest bot plays openings from the games of 12 grandmasters, from Morphy to Carlsen.",
      alt: "Choosing the bot level",
    },
    board: { title: "2D and 3D board", body: "A classic view or a three-dimensional board you can switch to mid-game.", alt: "3D chessboard" },
    puzzles: { title: "Puzzles and quiz", body: "Test your knowledge and train tactics step by step.", alt: "Chess quiz" },
    openings: { title: "Lessons and openings", body: "Italian Game, Sicilian Defense, Queen's Gambit and more.", alt: "Chess openings" },
    friends: { title: "Play a friend", body: "Share one computer or send a friend a link to your lobby." },
  },
  desktop: {
    title: "Mate Chess on your desktop",
    body: "A lightweight app in its own window, without browser tabs. It loads the latest version of the game every time you open it.",
    shotAlt: "Mate Chess desktop app",
    soon: "Coming soon",
    allReleases: "All releases",
    platforms: { macos: "macOS", windows: "Windows", linux: "Linux" },
    assets: {
      macArm: "Apple Silicon",
      macIntel: "Intel",
      exe: "Installer .exe",
      msi: "Installer .msi",
      appimage: "AppImage",
      deb: "Debian / Ubuntu",
      rpm: "Fedora",
    },
  },
  numbers: [
    { value: "3", label: "game modes: local, vs bot and via link" },
    { value: "12", label: "grandmasters in the bot's opening book" },
    { value: "3", label: "languages: Polish, English, Russian" },
    { value: "3", label: "desktop systems: macOS, Windows, Linux" },
  ],
  team: {
    eyebrow: "Motorola Science Cup 2024/2025",
    title: "Team Digital Gods",
    body: "Mate Chess started as a competition project by a five-person team. The code is open and available on GitHub.",
    members: [
      { name: "Mateusz Lis", role: "Project owner", github: "Maxicom0001" },
      { name: "Szymon Góral", role: "Project manager", github: "matiqueue" },
      { name: "Jakub Batko", role: "Databases and frontend", github: "nasakrator" },
      { name: "Filip Serwatka", role: "Frontend and graphics", github: "awres" },
      { name: "Wojciech Piątek", role: "Frontend and graphics", github: "wojooo" },
    ],
  },
  final: { title: "The first move is yours.", body: "No installation and no ads. Open the game in your browser or download the app." },
  footer: { tagline: "Chess in your browser and on your computer.", webApp: "Web app", download: "Downloads", license: "License", rights: "Digital Gods" },
}

export const dictionaries = { pl, en }
export type Dictionary = typeof pl
