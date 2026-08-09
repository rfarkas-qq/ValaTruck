import type { FeatureCollection, LineString, Point } from "geojson";

export interface TrackWaypoint {
  name: string;
  lat: number;
  lng: number;
  instruction: string;
  type: "start" | "turn" | "checkpoint" | "end";
}

export interface Track {
  id: string;
  title: string;
  description: string;
  destinationName: string;
  routeColor: string;
  distanceKm: number;
  estimatedMinutes: number;
  speedLimitKmH: number;
  maxGradientPercent: number;
  waypoints: TrackWaypoint[];
  geojson: FeatureCollection<LineString | Point>;
}

// Bounding Box: SW (48.62210, 21.26526) to NE (48.64500, 21.29384)
// Starting Point (Gate 6): 48.624454, 21.281608
export const MOCK_TRACKS: Track[] = [
  {
    id: "route-gate6-scrap-yard",
    title: "Gate 6 to Heavy Scrap Yard #2",
    description: "Primary site arterial route from Gate 6 through East Access Road to Scrap Yard #2.",
    destinationName: "Heavy Scrap Yard #2",
    routeColor: "#3b82f6", // Electric Blue
    distanceKm: 2.4,
    estimatedMinutes: 6,
    speedLimitKmH: 40,
    maxGradientPercent: 3,
    waypoints: [
      { name: "Gate 6", lat: 48.624454, lng: 21.281608, instruction: "Depart Gate 6 heading North-East on main access road", type: "start" },
      { name: "East Access Junction", lat: 48.62850, lng: 21.28420, instruction: "Keep Left at rail crossing junction", type: "turn" },
      { name: "Central Rail Crossing", lat: 48.63400, lng: 21.28050, instruction: "Cross rail tracks with caution", type: "checkpoint" },
      { name: "Heavy Scrap Yard #2", lat: 48.64120, lng: 21.27450, instruction: "Destination reached. Report to Yard Master", type: "end" }
    ],
    geojson: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "Gate 6 - Scrap Yard Track Line",
            stroke: "#3b82f6",
            strokeWidth: 6,
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [21.281608, 48.624454],
              [21.28300, 48.62650],
              [21.28420, 48.62850],
              [21.28280, 48.63100],
              [21.28050, 48.63400],
              [21.27780, 48.63750],
              [21.27450, 48.64120],
            ],
          },
        },
        {
          type: "Feature",
          properties: { name: "Gate 6 (Start)", pointType: "start" },
          geometry: { type: "Point", coordinates: [21.281608, 48.624454] },
        },
        {
          type: "Feature",
          properties: { name: "Central Rail Crossing", pointType: "checkpoint" },
          geometry: { type: "Point", coordinates: [21.28050, 48.63400] },
        },
        {
          type: "Feature",
          properties: { name: "Heavy Scrap Yard #2 (End)", pointType: "end" },
          geometry: { type: "Point", coordinates: [21.27450, 48.64120] },
        },
      ],
    },
  },
  {
    id: "route-gate6-slag-terminal",
    title: "Gate 6 to Slag Processing Terminal",
    description: "West perimeter haul route connecting Gate 6 to the West Slag Pit and Processing Terminal.",
    destinationName: "Slag Processing Terminal",
    routeColor: "#38bdf8", // Sky Blue
    distanceKm: 2.1,
    estimatedMinutes: 7,
    speedLimitKmH: 30,
    maxGradientPercent: 6,
    waypoints: [
      { name: "Gate 6", lat: 48.624454, lng: 21.281608, instruction: "Depart Gate 6 heading West along Perimeter Road", type: "start" },
      { name: "Perimeter Turn", lat: 48.62580, lng: 21.27300, instruction: "Turn Right onto West Crusher Ramp", type: "turn" },
      { name: "West Crusher Ramp", lat: 48.63150, lng: 21.26850, instruction: "Proceed North up processing ramp", type: "checkpoint" },
      { name: "Slag Processing Terminal", lat: 48.63900, lng: 21.26600, instruction: "Destination reached. Unload at Pit B", type: "end" }
    ],
    geojson: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "Gate 6 - Slag Terminal Track Line",
            stroke: "#38bdf8",
            strokeWidth: 6,
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [21.281608, 48.624454],
              [21.27700, 48.62500],
              [21.27300, 48.62580],
              [21.27050, 48.62850],
              [21.26850, 48.63150],
              [21.26700, 48.63500],
              [21.26600, 48.63900],
            ],
          },
        },
        {
          type: "Feature",
          properties: { name: "Gate 6 (Start)", pointType: "start" },
          geometry: { type: "Point", coordinates: [21.281608, 48.624454] },
        },
        {
          type: "Feature",
          properties: { name: "West Crusher Ramp", pointType: "checkpoint" },
          geometry: { type: "Point", coordinates: [21.26850, 48.63150] },
        },
        {
          type: "Feature",
          properties: { name: "Slag Processing Terminal (End)", pointType: "end" },
          geometry: { type: "Point", coordinates: [21.26600, 48.63900] },
        },
      ],
    },
  },
  {
    id: "route-gate6-blast-furnace",
    title: "Gate 6 to Blast Furnace Depot #3",
    description: "East internal haul track connecting Gate 6 via South Weighbridge to Blast Furnace Depot #3.",
    destinationName: "Blast Furnace Depot #3",
    routeColor: "#6366f1", // Indigo
    distanceKm: 2.7,
    estimatedMinutes: 9,
    speedLimitKmH: 25,
    maxGradientPercent: 4,
    waypoints: [
      { name: "Gate 6", lat: 48.624454, lng: 21.281608, instruction: "Depart Gate 6 through South Weighbridge", type: "start" },
      { name: "South Weighbridge", lat: 48.62650, lng: 21.28350, instruction: "Stop for inbound weight check", type: "checkpoint" },
      { name: "Bypass Loop", lat: 48.63200, lng: 21.28850, instruction: "Follow Eastern bypass curve", type: "turn" },
      { name: "Blast Furnace Depot #3", lat: 48.64350, lng: 21.28920, instruction: "Destination reached. Park in Loading Bay 1", type: "end" }
    ],
    geojson: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "Gate 6 - Blast Furnace Track Line",
            stroke: "#6366f1",
            strokeWidth: 6,
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [21.281608, 48.624454],
              [21.28350, 48.62650],
              [21.28600, 48.62900],
              [21.28850, 48.63200],
              [21.28950, 48.63600],
              [21.28980, 48.64000],
              [21.28920, 48.64350],
            ],
          },
        },
        {
          type: "Feature",
          properties: { name: "Gate 6 (Start)", pointType: "start" },
          geometry: { type: "Point", coordinates: [21.281608, 48.624454] },
        },
        {
          type: "Feature",
          properties: { name: "South Weighbridge", pointType: "checkpoint" },
          geometry: { type: "Point", coordinates: [21.28350, 48.62650] },
        },
        {
          type: "Feature",
          properties: { name: "Blast Furnace Depot #3 (End)", pointType: "end" },
          geometry: { type: "Point", coordinates: [21.28920, 48.64350] },
        },
      ],
    },
  },
];
