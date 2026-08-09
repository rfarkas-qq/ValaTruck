# Track Configuration & YAML Schema Specification

This document provides a guide for programmers and GIS maintainers on defining, compiling, and dynamically reloading track configurations in **ValaTruck**.

---

## 1. Track File Storage & Extendibility

All haul tracks and external points are stored in modular `.yaml` files in the directory:
`src/data/tracks/`

Developers can organize tracks into multiple `.yaml` files without strict naming conventions. For example:
- `volvo-routes.yaml`: Internal site haul corridors.
- `external-locations.yaml`: Single-point external public locations.
- `supplier-routes.yaml`: New supplier delivery routes.

---

## 2. YAML Schema Reference

Each `.yaml` file contains a list of track objects. Below is the complete field specification:

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **Yes** | Unique identifier string (e.g. `route-volvo-gate6-dock1`). |
| `title` | `string` | **Yes** | Human-readable track title displayed on cards and map badges. |
| `description` | `string` | **Yes** | Short summary of route origin, destination, and purpose. |
| `destinationName` | `string` | **Yes** | Name of target destination facility or dock. |
| `routeColor` | `string` | **Yes** | Hex color string for map polylines and badge accents (e.g. `#3b82f6`). |
| `distanceKm` | `number` | **Yes** | Route length in kilometers (set `0` for single-point external locations). |
| `estimatedMinutes` | `number` | **Yes** | Estimated driving time in minutes (set `0` for external locations). |
| `speedLimitKmH` | `number` | **Yes** | Maximum site speed limit in km/h. |
| `maxGradientPercent` | `number` | **Yes** | Maximum road incline percentage. |
| `vehicleType` | `string` | **No** | Vehicle access classification: `"truck"`, `"<3.5t"`, or `"pedestrian"`. Defaults to `"truck"`. |
| `isExternalOnly` | `boolean` | **No** | Set `true` for single-point public locations that launch external navigation. Defaults to `false`. |
| `waypoints` | `array` | **Yes** | List of waypoint objects (see Waypoint Schema below). |
| `geojsonCoordinates`| `array` | **No** | Explicit line string coordinates `[[lng, lat], ...]`. If omitted, polyline is derived from waypoints. |

### Waypoint Schema (`waypoints[i]`)

```yaml
waypoints:
  - name: Volvo Gate 6          # Waypoint label
    lat: 48.624456              # Latitude (decimal degrees)
    lng: 21.281591              # Longitude (decimal degrees)
    instruction: Depart Gate 6  # Driver navigation instruction
    type: start                 # Waypoint role: "start" | "turn" | "checkpoint" | "end"
```

---

## 3. Hybrid Track Compilation & Dynamic API Engine

ValaTruck employs a hybrid approach to track loading:

### A. Build-Time Static Compilation (`scripts/parse-yaml-tracks.mjs`)
- Runs automatically during `npm run dev` (`predev` hook) and `npm run build` (`prebuild` hook).
- Reads all `.yaml` files in `src/data/tracks/`, builds GeoJSON `FeatureCollection` objects, and emits `src/data/tracks.ts`.
- Ensures zero runtime filesystem overhead for production static pages.

### B. Runtime Dynamic Live API Endpoint (`src/app/api/tracks/route.ts`)
- Server-side Next.js route handler (`GET /api/tracks`) with `dynamic = 'force-dynamic'`.
- Reads `.yaml` files on demand using Node `fs` and `yaml.parse`.
- Triggered when the driver clicks the **"Reload Tracks"** button on the main screen, allowing live track updates without rebuilding or restarting the server.
