import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

interface Props {
  center: [number, number];
  activeOverlays: string[];
}

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    // Use setView so the map recenters when the prop changes
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export const MapViewer = ({ center, activeOverlays }: Props) => {
  const [layers, setLayers] = useState<
    Record<string, GeoJSON.FeatureCollection>
  >({});

  useEffect(() => {
    activeOverlays.forEach((id) => {
      if (!layers[id]) {
        fetch(`http://localhost:3001/mock/${id}.geojson`)
          .then((res) => res.json())
          .then((data) => setLayers((prev) => ({ ...prev, [id]: data })));
      }
    });
  }, [activeOverlays, layers]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Recenter center={center} />
      <Marker position={center} />
      {activeOverlays.map(
        (id) => layers[id] && <GeoJSON key={id} data={layers[id]} />
      )}
    </MapContainer>
  );
};
