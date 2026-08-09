import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import yaml from "yaml";
import type { FeatureCollection, LineString, Point } from "geojson";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface RawYamlTrack {
  id: string;
  title: string;
  description: string;
  destinationName: string;
  routeColor: string;
  distanceKm: number;
  estimatedMinutes: number;
  speedLimitKmH: number;
  maxGradientPercent: number;
  isExternalOnly?: boolean;
  waypoints: Array<{
    name: string;
    lat: number;
    lng: number;
    instruction: string;
    type: "start" | "turn" | "checkpoint" | "end";
  }>;
  geojsonCoordinates?: number[][];
}

export async function GET() {
  try {
    const tracksDir = path.join(process.cwd(), "src", "data", "tracks");
    if (!fs.existsSync(tracksDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(tracksDir).filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"));
    const allTracks = [];

    for (const file of files) {
      const filePath = path.join(tracksDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const rawList = yaml.parse(content) as RawYamlTrack[];

      if (Array.isArray(rawList)) {
        for (const item of rawList) {
          const startWpt = item.waypoints[0];
          const endWpt = item.waypoints[item.waypoints.length - 1];

          const lineCoords = item.geojsonCoordinates || item.waypoints.map((w) => [w.lng, w.lat]);

          const features: any[] = [];

          if (lineCoords.length > 1) {
            features.push({
              type: "Feature",
              properties: {
                name: `${item.title} Line`,
                stroke: item.routeColor,
                strokeWidth: 6,
              },
              geometry: {
                type: "LineString",
                coordinates: lineCoords,
              },
            });
          }

          if (startWpt) {
            features.push({
              type: "Feature",
              properties: { name: `${startWpt.name} (Start)`, icon: "start" },
              geometry: {
                type: "Point",
                coordinates: [startWpt.lng, startWpt.lat],
              },
            });
          }

          if (endWpt && endWpt !== startWpt) {
            features.push({
              type: "Feature",
              properties: { name: `${endWpt.name} (End)`, icon: "end" },
              geometry: {
                type: "Point",
                coordinates: [endWpt.lng, endWpt.lat],
              },
            });
          }

          const geojson: FeatureCollection<LineString | Point> = {
            type: "FeatureCollection",
            features,
          };

          allTracks.push({
            id: item.id,
            title: item.title,
            description: item.description,
            destinationName: item.destinationName,
            routeColor: item.routeColor,
            distanceKm: item.distanceKm,
            estimatedMinutes: item.estimatedMinutes,
            speedLimitKmH: item.speedLimitKmH,
            maxGradientPercent: item.maxGradientPercent,
            isExternalOnly: item.isExternalOnly || false,
            waypoints: item.waypoints,
            geojson,
          });
        }
      }
    }

    return NextResponse.json(allTracks);
  } catch (error) {
    console.error("Error parsing tracks YAML files:", error);
    return NextResponse.json({ error: "Failed to parse YAML track files" }, { status: 500 });
  }
}
