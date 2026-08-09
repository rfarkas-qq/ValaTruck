# Business Logic & Functional Specification

This document provides a detailed breakdown of the business logic rules, domain concepts, and functional requirements powering **ValaTruck**.

---

## 1. Domain Overview

**ValaTruck** is designed specifically for drivers, logistics operators, and site personnel navigating **Valaliky Industrial Park**. Industrial manufacturing sites present unique spatial challenges:
- Private internal haul roads are not mapped on public consumer GPS applications (Google Maps, Waze, Apple Maps).
- Public access gates (e.g., Gate 6, Gate 3) require designated approach routes.
- Multiple vehicle types (heavy trucks, light vehicles under 3.5t, and pedestrians) operate under different safety constraints and speed rules.

ValaTruck bridges public external navigation with private site-internal spatial guidance.

---

## 2. Track & Location Classification

ValaTruck categorizes site spatial entities into two fundamental types:

### A. Multi-Point Haul Tracks (`isExternalOnly: false`)
- **Purpose**: Internal site haul tracks connecting gates, staging areas, assembly docks, and utility facilities.
- **Navigation Behavior**:
  - Drivers can launch full PWA **Internal Turn-by-Turn Navigation** with real-time map tracking.
  - Features dual navigation: Drivers can also tap **"Navigate to Start Point"** to navigate from their current public location to the route's starting gate via an external navigation application (Google Maps / Apple Maps / Waze).
- **Attributes**: Distance (km), estimated time (min), speed limit (km/h), max gradient (%), waypoints array, and GeoJSON line coordinates.

### B. Single-Point External Locations (`isExternalOnly: true`)
- **Purpose**: External public facilities adjacent to the industrial park (e.g., Adient manufacturing plant, Pneuservis repair hub, Valaliky Industrial Park main entrance).
- **Navigation Behavior**:
  - Does not open internal PWA site navigation.
  - Displays a single prominent action button: **"Navigate via External Maps"**, launching `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`.

---

## 3. Vehicle Classification Rules (`vehicleType`)

Every track or location defines a `vehicleType` property which controls UI representation and display rules:

| Vehicle Type | Code | Visual Icon | Display Rules |
| :--- | :--- | :--- | :--- |
| **Heavy Truck** | `truck` | 🚚 `Truck` | Displays **Distance** and **Speed Limit** stats. Used for site haul corridors. |
| **Light Vehicle** | `<3.5t` | 🚗 `Car` | Displays **Distance** and **Speed Limit** stats. Used for passenger cars, vans, and light delivery. |
| **Pedestrian** | `pedestrian` | 👣 `Footprints` | Displays **Distance** only. **Speed Limit display is explicitly suppressed** on both tile cards and navigation headers. |

---

## 4. Navigation & Telemetry System

### A. Live GPS Tracking
- Uses `navigator.geolocation.watchPosition` with `enableHighAccuracy: true`.
- Real-time telemetry overlay computes:
  - Current Speed ($km/h$) derived from position delta or device velocity.
  - GPS Accuracy ($\pm m$).
  - Compass Heading ($\degree$) to rotate the driver truck marker.
- Auto-recenter toggle smoothly pans the map view to maintain the vehicle in screen center.

### B. Fallback GPS Simulation Mode
- If GPS access is denied, unavailable, or when testing off-site, drivers can toggle **Simulation Mode**.
- The simulation iterates step-by-step through the track's GeoJSON coordinate array at regular intervals, animating the vehicle along the haul route and updating waypoint instruction cards.

---

## 5. Multi-Language Localization Engine (i18n)

ValaTruck supports 9 languages to accommodate international drivers operating at Valaliky Industrial Park:
1. **English (`en`)**
2. **Slovenčina (`sk`)**
3. **Română (`ro`)**
4. **Magyar (`hu`)**
5. **Deutsch (`de`)**
6. **Polski (`pl`)**
7. **Čeština (`cs`)**
8. **Türkçe (`tr`)**
9. **Українська (`uk`)**

- **State Persistence**: Selected language is saved in browser `localStorage` under the key `valatruck_lang` and defaults to `en` if unset.
- **Language Switcher**: Floating component on headers with native flags and localized names.
