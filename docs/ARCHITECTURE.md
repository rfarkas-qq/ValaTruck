# Technical Architecture & Developer Guide

This document describes the software architecture, component structure, state management, and Leaflet rendering patterns used in **ValaTruck**.

---

## 1. Tech Stack Overview

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript (`strict: true`)
- **Mapping Engine**: Leaflet `1.9.4` & React-Leaflet `5.0.0`
- **Styling**: Tailwind CSS `3.4` with Vanilla CSS tokens
- **Icons**: Lucide React (`lucide-react`)
- **YAML Parser**: `yaml` `2.9.0`

---

## 2. High-Level Architecture Diagram

```mermaid
flowchart TD
    subgraph Data Layer
        YAML[YAML Files in src/data/tracks/*.yaml]
        Compiler[scripts/parse-yaml-tracks.mjs]
        GenTS[src/data/tracks.ts]
        API[/api/tracks Route Handler]
    end

    subgraph React Application State
        Page[src/app/page.tsx - Screen Switcher]
        LangCtx[LanguageContext.tsx]
    end

    subgraph UI Views
        ListScreen[TrackListScreen.tsx]
        ShowTracksScreen[ShowTracksScreen.tsx]
        NavView[NavigationView.tsx]
    end

    subgraph Leaflet Map Layer
        MapView[MapView.tsx - ssr:false]
        MapContainer[MapContainerComponent.tsx]
        OverviewMapView[OverviewMapView.tsx - ssr:false]
        OverviewMapContainer[OverviewMapContainerComponent.tsx]
    end

    YAML -->|Build Time| Compiler
    Compiler -->|Emits| GenTS
    YAML -->|Runtime GET| API
    GenTS --> Page
    API -->|Dynamic Reload| ListScreen

    Page -->|viewMode = list| ListScreen
    Page -->|viewMode = overview| ShowTracksScreen
    Page -->|viewMode = navigate| NavView

    NavView --> MapView --> MapContainer
    ShowTracksScreen --> OverviewMapView --> OverviewMapContainer
```

---

## 3. Application State & Screen Flow

Screen state is managed centrally at the top level in `src/app/page.tsx`:

```typescript
type ViewMode = "list" | "navigate" | "overview";
```

- **`"list"` (`TrackListScreen.tsx`)**: Main dashboard listing route cards with search filtering, "Reload Tracks" button, "Show Tracks" button, and language selector.
- **`"navigate"` (`NavigationView.tsx`)**: Full-screen turn-by-turn map view with active telemetry overlay, auto-recenter, simulation controls, and waypoint popups.
- **`"overview"` (`ShowTracksScreen.tsx`)**: Full-screen overview map displaying all tracks simultaneously with custom badges, map layer switcher, and top "Back" button.

---

## 4. Leaflet Map Engine & Dynamic SSR Handling

### SSR Safety Pattern
Leaflet accesses the DOM `window` object directly upon instantiation. In Next.js App Router, components render on the server by default. To prevent `window is not defined` errors during server-side pre-rendering:

1. Map containers (`MapContainerComponent.tsx` and `OverviewMapContainerComponent.tsx`) import Leaflet and React-Leaflet directly.
2. Wrapper components (`MapView.tsx` and `OverviewMapView.tsx`) load map containers dynamically using `next/dynamic` with `ssr: false`:

```typescript
const DynamicMapContainer = dynamic(
  () => import("./MapContainerComponent").then((mod) => mod.MapContainerComponent),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);
```

### Custom Leaflet Pin Markers
Leaflet default PNG markers often break when bundled with Next.js Turbopack. ValaTruck utilizes Leaflet's `L.divIcon` to render custom HTML/SVG pin markers with inline Tailwind styles for crisp vector rendering at any zoom level:

- **Track Badge Markers**: White pill containers with colored borders matching `track.routeColor`.
- **Driver Truck Marker**: Pulsing ring marker with SVG vehicle pointer rotated dynamically via `transform: rotate(${heading}deg)`.

---

## 5. Map Tile Layer System

ValaTruck supports 4 tile layer providers defined in `MapContainerComponent.tsx`:

1. **Standard OSM**: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
2. **Esri Satellite**: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`
3. **CARTO Voyager**: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`
4. **CARTO Dark**: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`

Tile style can be toggled interactively on both active navigation and overview map screens.
