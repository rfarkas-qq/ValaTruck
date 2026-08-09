"use client";

import React, { useState } from "react";
import { MOCK_TRACKS } from "@/data/tracks";
import { TrackListScreen } from "@/components/TrackListScreen";
import { NavigationView } from "@/components/NavigationView";

export default function Home() {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  const selectedTrack = MOCK_TRACKS.find((t) => t.id === selectedTrackId);

  const handleSelectTrack = (trackId: string) => {
    setSelectedTrackId(trackId);
  };

  const handleBackToRoutes = () => {
    setSelectedTrackId(null);
  };

  if (selectedTrack) {
    return (
      <NavigationView
        track={selectedTrack}
        onBackToRoutes={handleBackToRoutes}
      />
    );
  }

  return <TrackListScreen onSelectTrack={handleSelectTrack} />;
}
