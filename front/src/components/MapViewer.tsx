import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

interface Props {
  center: [number, number];
}

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    // Use setView so the map recenters when the prop changes
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export const MapViewer = ({ center }: Props) => {
  console.log("Map center:", center);
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Recenter center={center} />
      <Marker position={center} />
    </MapContainer>
  );
};
