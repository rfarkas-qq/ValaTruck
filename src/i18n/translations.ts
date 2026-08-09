export type Language = "en" | "sk" | "ro" | "hu" | "de" | "pl" | "cs" | "tr" | "uk";

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
];

export const TRANSLATIONS = {
  en: {
    // Header
    siteHub: "Gate 6 Site Hub",
    offlineTilesReady: "Offline Tiles Ready",
    subTitle: "Gate 6 Industrial Site • Private Route Guidance System",
    zoneBounds: "Zone Bounds",
    gate6Hub: "Gate 6 Hub",

    // Search
    searchPlaceholder: "Search route by title or destination...",
    noRoutesFound: "No Routes Found",
    noRoutesDesc: "No haul route matches your search query.",

    // Route Card
    distance: "Distance",
    speedLimit: "Speed Limit",
    startNavigation: "Start Navigation",

    // Navigation Header
    backToRoutes: "Back to Routes",
    target: "Target",
    limit: "Limit",
    waypoint: "Waypoint",
    of: "of",

    // GPS & Warnings
    gpsDenied: "GPS Permission Denied",
    gpsDeniedDesc: "Switch to Simulation Mode to test navigation.",
    gpsSignalLost: "GPS Signal Lost",
    estimatedPositioning: "Using estimated site positioning.",
    startSimulation: "Start Simulation",

    // Controls Tooltips & Layers
    recenterMap: "Auto-Recenter Map on Truck",
    selectMapLayer: "Select Map Tile Layer",
    standardOsm: "Standard OSM",
    esriSatellite: "Esri Satellite",
    cartoVoyager: "CARTO Voyager",
    cartoDark: "CARTO Dark",
    playSimulation: "Play GPS Simulation",
    pauseSimulation: "Pause GPS Simulation",
    resetSimulation: "Reset Simulation to Start",

    // Telemetry Bar
    speed: "Speed",
    accuracy: "Accuracy",
    heading: "Heading",
    mode: "Mode",
    sim: "SIM",
    live: "LIVE",
    off: "OFF",
    sync: "SYNC",
    offlineCachingActive: "Offline Vector Caching Active",

    // Footer
    footerTitle: "ValaTruck • Private Site Spatial PWA • Build 2026.08",
    gpsStandby: "GPS Standby",
    swActive: "Service Worker Active",
  },
  sk: {
    // Header
    siteHub: "Dispečing Brána 6",
    offlineTilesReady: "Offline mapy pripravené",
    subTitle: "Priemyselný areál Brána 6 • Súkromný navigátor nakladky",
    zoneBounds: "Hranice zóny",
    gate6Hub: "Uzol Brána 6",

    // Search
    searchPlaceholder: "Hľadať trasu podľa názvu alebo cieľa...",
    noRoutesFound: "Žiadne trasy sa nenašli",
    noRoutesDesc: "Žiadna prepravná trasa nezodpovedá vyhľadávaniu.",

    // Route Card
    distance: "Vzdialenosť",
    speedLimit: "Rýchl. limit",
    startNavigation: "Spustiť navigáciu",

    // Navigation Header
    backToRoutes: "Späť na trasy",
    target: "Cieľ",
    limit: "Limit",
    waypoint: "Bod",
    of: "z",

    // GPS & Warnings
    gpsDenied: "Prístup ku GPS bol zamietnutý",
    gpsDeniedDesc: "Prepnite na simuláciu pre otestovanie navigácie.",
    gpsSignalLost: "GPS signál sa stratil",
    estimatedPositioning: "Používa sa odhadovaná poloha v areáli.",
    startSimulation: "Spustiť simuláciu",

    // Controls Tooltips & Layers
    recenterMap: "Automaticky vycentrovať mapu na vozidlo",
    selectMapLayer: "Vybrať vrstvu mapy",
    standardOsm: "Štandardná OSM",
    esriSatellite: "Satelitná Esri",
    cartoVoyager: "CARTO Voyager",
    cartoDark: "CARTO Tmavá",
    playSimulation: "Spustiť simuláciu GPS",
    pauseSimulation: "Pozastaviť simuláciu GPS",
    resetSimulation: "Reštartovať simuláciu od začiatku",

    // Telemetry Bar
    speed: "Rýchlosť",
    accuracy: "Presnosť",
    heading: "Smer",
    mode: "Režim",
    sim: "SIM",
    live: "ŽIVO",
    off: "VYP",
    sync: "SYNCH",
    offlineCachingActive: "Offline vektorová pamäť aktívna",

    // Footer
    footerTitle: "ValaTruck • Súkromná navigácia PWA • Verzia 2026.08",
    gpsStandby: "GPS v pohotovosti",
    swActive: "Service Worker aktívny",
  },
  ro: {
    // Header
    siteHub: "Hub Poarta 6",
    offlineTilesReady: "Hărți offline pregătite",
    subTitle: "Situl Industrial Poarta 6 • Sistem privat de navigare",
    zoneBounds: "Limita zonei",
    gate6Hub: "Hub Poarta 6",

    // Search
    searchPlaceholder: "Căutați ruta după titlu sau destinație...",
    noRoutesFound: "Nicio rută găsită",
    noRoutesDesc: "Nicio rută de transport nu corespunde căutării.",

    // Route Card
    distance: "Distanță",
    speedLimit: "Limită viteză",
    startNavigation: "Pornește navigarea",

    // Navigation Header
    backToRoutes: "Înapoi la rute",
    target: "Destinație",
    limit: "Limită",
    waypoint: "Punct",
    of: "din",

    // GPS & Warnings
    gpsDenied: "Permisiune GPS refuzată",
    gpsDeniedDesc: "Comutați pe modul simulare pentru a testa navigarea.",
    gpsSignalLost: "Semnal GPS pierdut",
    estimatedPositioning: "Se folosește poziționarea estimată a sitului.",
    startSimulation: "Pornește simularea",

    // Controls Tooltips & Layers
    recenterMap: "Recentrează harta pe camion",
    selectMapLayer: "Selectează stratul hărții",
    standardOsm: "OSM Standard",
    esriSatellite: "Esri Satelit",
    cartoVoyager: "CARTO Voyager",
    cartoDark: "CARTO Întunecat",
    playSimulation: "Redă simularea GPS",
    pauseSimulation: "Pauză simulare GPS",
    resetSimulation: "Resetează simularea de la început",

    // Telemetry Bar
    speed: "Viteză",
    accuracy: "Precizie",
    heading: "Direcție",
    mode: "Mod",
    sim: "SIM",
    live: "LIVE",
    off: "OPRIT",
    sync: "SINCR",
    offlineCachingActive: "Casting vectorial offline activ",

    // Footer
    footerTitle: "ValaTruck • PWA spațial privat • Ediție 2026.08",
    gpsStandby: "GPS în așteptare",
    swActive: "Service Worker activ",
  },
  hu: {
    // Header
    siteHub: "6-os Kapu Csomópont",
    offlineTilesReady: "Off-line térképek kész",
    subTitle: "6-os Kapu Ipari Terület • Magán útvonalnavigáció",
    zoneBounds: "Zóna határok",
    gate6Hub: "6-os Kapu Központ",

    // Search
    searchPlaceholder: "Útvonal keresése név vagy cél szerint...",
    noRoutesFound: "Nem található útvonal",
    noRoutesDesc: "Egyik szállítási útvonal sem felel meg a keresésnek.",

    // Route Card
    distance: "Távolság",
    speedLimit: "Sebességhatár",
    startNavigation: "Navigáció indítása",

    // Navigation Header
    backToRoutes: "Vissza az útvonalakhoz",
    target: "Célállomás",
    limit: "Határ",
    waypoint: "Útpont",
    of: "/",

    // GPS & Warnings
    gpsDenied: "GPS engedély megtagadva",
    gpsDeniedDesc: "Váltson szimulációs módra a navigáció teszteléséhez.",
    gpsSignalLost: "GPS jel megszakadt",
    estimatedPositioning: "Becsült üzemi pozicionálás használatban.",
    startSimulation: "Szimuláció indítása",

    // Controls Tooltips & Layers
    recenterMap: "Térkép újraközéppontosítása a teherautóra",
    selectMapLayer: "Térképréteg kiválasztása",
    standardOsm: "Standard OSM",
    esriSatellite: "Esri Műhold",
    cartoVoyager: "CARTO Voyager",
    cartoDark: "CARTO Sötét",
    playSimulation: "GPS szimuláció indítása",
    pauseSimulation: "GPS szimuláció szüneteltetése",
    resetSimulation: "Szimuláció visszaállítása a kezdetre",

    // Telemetry Bar
    speed: "Sebesség",
    accuracy: "Pontosság",
    heading: "Irány",
    mode: "Mód",
    sim: "SZIM",
    live: "ÉLŐ",
    off: "KI",
    sync: "SZINKR",
    offlineCachingActive: "Offline vektorigyorsítótár aktív",

    // Footer
    footerTitle: "ValaTruck • Magán Területi PWA • Kiadás 2026.08",
    gpsStandby: "GPS készenlétben",
    swActive: "Service Worker aktív",
  },
  de: {
    // Header
    siteHub: "Tor 6 Standort-Hub",
    offlineTilesReady: "Offline-Karten bereit",
    subTitle: "Industriegelände Tor 6 • Privates Routennavigationssystem",
    zoneBounds: "Zonengrenzen",
    gate6Hub: "Tor 6 Hub",

    // Search
    searchPlaceholder: "Route nach Name oder Ziel suchen...",
    noRoutesFound: "Keine Routen gefunden",
    noRoutesDesc: "Keine Transportroute entspricht Ihrer Suchanfrage.",

    // Route Card
    distance: "Entfernung",
    speedLimit: "Tempolimit",
    startNavigation: "Navigation starten",

    // Navigation Header
    backToRoutes: "Zurück zu den Routen",
    target: "Ziel",
    limit: "Limit",
    waypoint: "Wegpunkt",
    of: "von",

    // GPS & Warnings
    gpsDenied: "GPS-Zugriff verweigert",
    gpsDeniedDesc: "Wechseln Sie in den Simulationsmodus, um die Navigation zu testen.",
    gpsSignalLost: "GPS-Signal verloren",
    estimatedPositioning: "Geschätzte Standortpositionierung wird verwendet.",
    startSimulation: "Simulation starten",

    // Controls Tooltips & Layers
    recenterMap: "Karte auf LKW neuzentrieren",
    selectMapLayer: "Kartenbene auswählen",
    standardOsm: "Standard OSM",
    esriSatellite: "Esri Satellit",
    cartoVoyager: "CARTO Voyager",
    cartoDark: "CARTO Dunkel",
    playSimulation: "GPS-Simulation starten",
    pauseSimulation: "GPS-Simulation pausieren",
    resetSimulation: "Simulation auf Anfang zurücksetzen",

    // Telemetry Bar
    speed: "Geschwindigkeit",
    accuracy: "Genauigkeit",
    heading: "Kompass",
    mode: "Modus",
    sim: "SIM",
    live: "LIVE",
    off: "AUS",
    sync: "SYNC",
    offlineCachingActive: "Aktiver Vektor-Offline-Cache",

    // Footer
    footerTitle: "ValaTruck • Standort-Navigations-PWA • Build 2026.08",
    gpsStandby: "GPS Bereitschaft",
    swActive: "Service Worker Aktiv",
  },
  pl: {
    // Header
    siteHub: "Węzeł Bramy 6",
    offlineTilesReady: "Mapy offline gotowe",
    subTitle: "Teren Przemysłowy Brama 6 • Prywatny System Nawigacji",
    zoneBounds: "Granice Strefy",
    gate6Hub: "Baza Brama 6",

    // Search
    searchPlaceholder: "Szukaj trasy według nazwy lub celu...",
    noRoutesFound: "Nie znaleziono tras",
    noRoutesDesc: "Żadna trasa przewozowa nie pasuje do wyszukiwania.",

    // Route Card
    distance: "Dystans",
    speedLimit: "Ograniczenie",
    startNavigation: "Rozpocznij nawigację",

    // Navigation Header
    backToRoutes: "Powrót do tras",
    target: "Cel",
    limit: "Limit",
    waypoint: "Punkt",
    of: "z",

    // GPS & Warnings
    gpsDenied: "Brak dostępu do GPS",
    gpsDeniedDesc: "Przełącz na tryb symulacji, aby przetestować nawigację.",
    gpsSignalLost: "Sygnał GPS utracony",
    estimatedPositioning: "Używanie szacowanego pozycjonowania na terenie.",
    startSimulation: "Uruchom symulację",

    // Controls Tooltips & Layers
    recenterMap: "Wycentruj mapę na ciężarówce",
    selectMapLayer: "Wybierz warstwę mapy",
    standardOsm: "Standardowa OSM",
    esriSatellite: "Satelita Esri",
    cartoVoyager: "CARTO Voyager",
    cartoDark: "CARTO Ciemna",
    playSimulation: "Uruchom symulację GPS",
    pauseSimulation: "Wstrzymaj symulację GPS",
    resetSimulation: "Zresetuj symulację do początku",

    // Telemetry Bar
    speed: "Prędkość",
    accuracy: "Dokładność",
    heading: "Kierunek",
    mode: "Tryb",
    sim: "SYM",
    live: "NA ŻYWO",
    off: "WYŁ",
    sync: "SYNCH",
    offlineCachingActive: "Aktywny bufor wektorowy offline",

    // Footer
    footerTitle: "ValaTruck • Prywatna Nawigacja PWA • Wersja 2026.08",
    gpsStandby: "GPS w gotowości",
    swActive: "Service Worker aktywny",
  },
  cs: {
    // Header
    siteHub: "Dispečink Brána 6",
    offlineTilesReady: "Offline mapy připraveny",
    subTitle: "Průmyslový areál Brána 6 • Soukromá navigace nákladní dopravy",
    zoneBounds: "Hranice zóny",
    gate6Hub: "Uzel Brána 6",

    // Search
    searchPlaceholder: "Hledat trasu podle názevu nebo cíle...",
    noRoutesFound: "Nenalezeny žádné trasy",
    noRoutesDesc: "Žádná přepravní trasa neodpovídá vyhledávání.",

    // Route Card
    distance: "Vzdálenost",
    speedLimit: "Rychl. limit",
    startNavigation: "Spustit navigaci",

    // Navigation Header
    backToRoutes: "Zpět na trasy",
    target: "Cíl",
    limit: "Limit",
    waypoint: "Bod",
    of: "z",

    // GPS & Warnings
    gpsDenied: "Přístup ke GPS byl zamítnut",
    gpsDeniedDesc: "Přepněte na simulaci pro otestování navigace.",
    gpsSignalLost: "GPS signál zhotoven",
    estimatedPositioning: "Používá se odhadovaná poloha v areálu.",
    startSimulation: "Spustit simulaci",

    // Controls Tooltips & Layers
    recenterMap: "Automaticky vycentrovat mapu na vozidlo",
    selectMapLayer: "Vybrat vrstvu mapy",
    standardOsm: "Standardní OSM",
    esriSatellite: "Satelitní Esri",
    cartoVoyager: "CARTO Voyager",
    cartoDark: "CARTO Tmavá",
    playSimulation: "Spustit simulaci GPS",
    pauseSimulation: "Pozastavit simulaci GPS",
    resetSimulation: "Restartovat simulaci od začátku",

    // Telemetry Bar
    speed: "Rychlost",
    accuracy: "Přesnost",
    heading: "Směr",
    mode: "Režim",
    sim: "SIM",
    live: "ŽIVĚ",
    off: "VYP",
    sync: "SYNC",
    offlineCachingActive: "Offline vektorová paměť aktivní",

    // Footer
    footerTitle: "ValaTruck • Soukromá navigace PWA • Verze 2026.08",
    gpsStandby: "GPS v pohotovosti",
    swActive: "Service Worker aktivní",
  },
  tr: {
    // Header
    siteHub: "Kapı 6 Saha Merkezi",
    offlineTilesReady: "Çevrimdışı Haritalar Hazır",
    subTitle: "Kapı 6 Sanayi Sahası • Özel Güzergah Navigasyon Sistemi",
    zoneBounds: "Bölge Sınırları",
    gate6Hub: "Kapı 6 Merkezi",

    // Search
    searchPlaceholder: "Rota adıyla veya hedefle arayın...",
    noRoutesFound: "Rota Bulunamadı",
    noRoutesDesc: "Aramanızla eşleşen taşıma rotası bulunamadı.",

    // Route Card
    distance: "Mesafe",
    speedLimit: "Hız Sınırı",
    startNavigation: "Navigasyonu Başlat",

    // Navigation Header
    backToRoutes: "Rotalara Dön",
    target: "Hedef",
    limit: "Sınır",
    waypoint: "Nokta",
    of: "/",

    // GPS & Warnings
    gpsDenied: "GPS İzni Reddedildi",
    gpsDeniedDesc: "Navigasyonu test etmek için Simülasyon Moduna geçin.",
    gpsSignalLost: "GPS Sinyali Kayboldu",
    estimatedPositioning: "Tahmini saha konumlandırması kullanılıyor.",
    startSimulation: "Simülasyonu Başlat",

    // Controls Tooltips & Layers
    recenterMap: "Haritayı Kamyona Yeniden Odakla",
    selectMapLayer: "Harita Katmanını Seçin",
    standardOsm: "Standart OSM",
    esriSatellite: "Esri Uydu",
    cartoVoyager: "CARTO Voyager",
    cartoDark: "CARTO Karanlık",
    playSimulation: "GPS Simülasyonunu Çalıştır",
    pauseSimulation: "GPS Simülasyonunu Duraklat",
    resetSimulation: "Simülasyonu Başa Sar",

    // Telemetry Bar
    speed: "Hız",
    accuracy: "Hassasiyet",
    heading: "Yön",
    mode: "Mod",
    sim: "SİM",
    live: "CANLI",
    off: "KAPALI",
    sync: "SENK",
    offlineCachingActive: "Çevrimdışı Vektör Önbelleği Aktif",

    // Footer
    footerTitle: "ValaTruck • Özel Saha Navigasyonu PWA • Sürüm 2026.08",
    gpsStandby: "GPS Hazırda",
    swActive: "Service Worker Aktif",
  },
  uk: {
    // Header
    siteHub: "Диспетчерська Ворота 6",
    offlineTilesReady: "Офлайн-карти готові",
    subTitle: "Промзона Ворота 6 • Приватна навігаційна система",
    zoneBounds: "Межі зони",
    gate6Hub: "Вузол Ворота 6",

    // Search
    searchPlaceholder: "Пошук маршруту за назвою або пунктом призначення...",
    noRoutesFound: "Маршрутів не знайдено",
    noRoutesDesc: "Жоден транспортний маршрут не відповідає вашому запиту.",

    // Route Card
    distance: "Відстань",
    speedLimit: "Обмеження",
    startNavigation: "Розпочати навігацію",

    // Navigation Header
    backToRoutes: "Назад до маршрутів",
    target: "Ціль",
    limit: "Ліміт",
    waypoint: "Точка",
    of: "з",

    // GPS & Warnings
    gpsDenied: "Доступ до GPS відхилено",
    gpsDeniedDesc: "Увімкніть режим симуляції для тестування навігації.",
    gpsSignalLost: "Сигнал GPS втрачено",
    estimatedPositioning: "Використовується оціночне позиціонування на об'єкті.",
    startSimulation: "Запустити симуляцію",

    // Controls Tooltips & Layers
    recenterMap: "Центрувати карту на вантажівці",
    selectMapLayer: "Обрати шар карти",
    standardOsm: "Стандартна OSM",
    esriSatellite: "Супутник Esri",
    cartoVoyager: "CARTO Voyager",
    cartoDark: "CARTO Темна",
    playSimulation: "Запустити симуляцію GPS",
    pauseSimulation: "Призупинити симуляцію GPS",
    resetSimulation: "Скинути симуляцію на початок",

    // Telemetry Bar
    speed: "Швидкість",
    accuracy: "Точність",
    heading: "Курс",
    mode: "Режим",
    sim: "СИМ",
    live: "ЖИВИЙ",
    off: "ВИМК",
    sync: "СИНХР",
    offlineCachingActive: "Офлайн векторне кешування активне",

    // Footer
    footerTitle: "ValaTruck • Навігація промзони PWA • Версія 2026.08",
    gpsStandby: "GPS у режимі очікування",
    swActive: "Service Worker активний",
  },
};

export type TranslationKey = keyof (typeof TRANSLATIONS)["en"];
