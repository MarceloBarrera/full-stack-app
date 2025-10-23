import { useEffect, useState } from "react";

export const OverlayToggle = ({
  onToggle,
}: {
  onToggle: (id: string, checked: boolean) => void;
}) => {
  const [overlays, setOverlays] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/overlays")
      .then((res) => res.json())
      .then((data) => setOverlays(data));
  }, []);

  return (
    <div>
      <h3>Overlays</h3>
      {overlays.map((overlay) => (
        <label key={overlay.id}>
          <input
            type="checkbox"
            onChange={(e) => onToggle(overlay.id, e.target.checked)}
          />
          {overlay.name}
        </label>
      ))}
    </div>
  );
};
