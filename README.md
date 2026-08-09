# ValaTruck • Valaliky Industrial Park Spatial PWA

**ValaTruck** is a private industrial site spatial Progressive Web Application (PWA) and haul route guidance system designed for drivers and logistics personnel operating at **Valaliky Industrial Park**.

Built using **Next.js 16 (Turbopack)**, **TypeScript**, **Leaflet / React-Leaflet**, **Tailwind CSS**, and **GeoJSON**, ValaTruck provides real-time telemetry, offline-capable vector routing, multi-vehicle classification, and multi-language support.

---

## 📚 Developer & Architecture Documentation

Detailed documentation for programmers, maintainers, and GIS engineers is organized in the [`docs/`](./docs) directory:

- 📖 **[Business Logic Specification](./docs/BUSINESS_LOGIC.md)**: Domain concepts, track classification, vehicle rules (`truck`, `<3.5t`, `pedestrian`), and telemetry simulation.
- 🏗️ **[Technical Architecture](./docs/ARCHITECTURE.md)**: Component hierarchy, state machine, Next.js 16 dynamic imports, SSR-safe Leaflet rendering, and vector tile providers.
- ⚙️ **[Track Configuration & YAML Schema](./docs/TRACK_CONFIGURATION.md)**: Complete YAML schema reference, GeoJSON generation, compiler script, and dynamic `/api/tracks` live reloading.

---

## Key Features

- 🚚 **Modular YAML Track System**: Haul tracks and external points are stored in modular `.yaml` files inside `src/data/tracks/` for effortless extensibility.
- ⚡ **Dynamic & Live Track Reloading**: Live API endpoint (`/api/tracks`) parses YAML files dynamically on demand, with build-time compilation hooks (`parse-yaml-tracks.mjs`).
- 🌐 **9-Language Localization (i18n)**: Fully translated UI with language selector for **English**, **Slovenčina**, **Română**, **Magyar**, **Deutsch**, **Polski**, **Čeština**, **Türkçe**, and **Українська**.
- 🗺️ **"Show Tracks" Map Overview**: Full-screen overview map displaying all site routes and locations simultaneously with custom title badges and automatic viewport bounds.
- 🚙 **Vehicle Access Classification**: Supports `truck` (Heavy Haul), `<3.5t` (Light Vehicle/Car/Van), and `pedestrian` (Foot Traffic) modes with custom badge icons. Speed limit display is automatically hidden for pedestrian routes.
- 🧭 **Dual Navigation Modes**:
  - **Internal PWA Navigation**: Interactive turn-by-turn waypoint routing, live speed/heading telemetry, and GPS simulation mode.
  - **External Public Navigation**: Direct 1-tap launching into external map apps (Google Maps / Waze / Apple Maps) for public locations and route start points.
- 🗺️ **Multi-Layer Map Engine**: Seamless switching between Standard OpenStreetMap, Esri World Imagery Satellite, CARTO Voyager, and CARTO Dark vector tiles.

---

## Prerequisites

- **Node.js**: `v18.17.0` or higher (Node `v20.x` or `v22.x` recommended)
- **npm**: `v9.x` or higher (comes with Node.js)

---

## Quick Start & Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/rfarkas-qq/ValaTruck.git
cd ValaTruck
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

Start local server on port `3005` (with automatic `predev` YAML parsing):

```bash
npm run dev
```

Open [http://localhost:3005](http://localhost:3005) in your browser.

---

## Production Build & Deployment

```bash
# Compile YAML configurations & build Next.js production bundle
npm run build

# Start production server on port 3005
npm run start
```

---

## License & Copyright

© 2026 **ValaTruck** • Private Industrial Site Spatial PWA • Valaliky Industrial Park. All rights reserved.
