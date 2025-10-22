import { useState } from "react";
import { LocationSelector } from "../components/LocationSelector";
import { MapViewer } from "../components/MapViewer";

function GeoSpatialViewerPage() {
  const [center, setCenter] = useState<[number, number]>([55.9533, -3.1883]);

  console.log("GeoSpatialViewerPage center:", center);
  return (
    <div>
      <h1>Geospatial Viewer</h1>
      <LocationSelector onSelect={setCenter} />
      <MapViewer center={center} />
    </div>
  );
}

export default GeoSpatialViewerPage;
