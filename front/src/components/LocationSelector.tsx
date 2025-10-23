type Coordinates = [number, number];
type LocationMap = {
  [city in "Edinburgh" | "London" | "NewYork"]: Coordinates;
};

const locations: LocationMap = {
  Edinburgh: [55.9533, -3.1883],
  London: [51.5074, -0.1278],
  NewYork: [40.7128, -74.006],
};

export const LocationSelector = ({
  onSelect,
}: {
  onSelect: (coordinates: Coordinates) => void;
}) => {
  return (
    <select
      onChange={(e) => {
        // The select value will be one of our city names
        const city = e.target.value as keyof LocationMap;
        // Get the coordinates for the selected city
        const coordinates: Coordinates = locations[city];
        onSelect(coordinates);
      }}
    >
      {Object.keys(locations).map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
