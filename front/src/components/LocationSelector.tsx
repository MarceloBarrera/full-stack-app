const locations = {
  Edinburgh: [55.9533, -3.1883],
  London: [51.5074, -0.1278],
  NewYork: [40.7128, -74.006],
};

export const LocationSelector = ({
  onSelect,
}: {
  onSelect: (loc: [number, number]) => void;
}) => {
  return (
    <select
      onChange={(e) =>
        onSelect(
          locations[e.target.value as keyof typeof locations] as [
            number,
            number
          ]
        )
      }
    >
      {Object.keys(locations).map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
