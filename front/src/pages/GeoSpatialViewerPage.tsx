import { useState } from "react";
import { LocationSelector } from "../components/LocationSelector";
import { MapViewer } from "../components/MapViewer";
import { OverlayToggle } from "../components/OverlayToggle";

function GeoSpatialViewerPage() {
  const [center, setCenter] = useState<[number, number]>([55.9533, -3.1883]);
  const [activeOverlays, setActiveOverlays] = useState<string[]>([]);

  const handleToggle = (id: string, checked: boolean) => {
    setActiveOverlays((prev) =>
      checked ? [...prev, id] : prev.filter((overlayId) => overlayId !== id)
    );
  };
  return (
    <div>
      <h1>Geospatial Viewer</h1>
      <LocationSelector onSelect={setCenter} />
      <OverlayToggle onToggle={handleToggle} />
      <MapViewer center={center} activeOverlays={activeOverlays} />
    </div>
  );
}

export default GeoSpatialViewerPage;
