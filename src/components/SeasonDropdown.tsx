import "./SeasonDropdown.css";

interface SeasonDropdownProps {
  seasons: number[];
  selectedSeason: number | null;
  onSelectSeason: (season: number) => void;
  disabled?: boolean;
}

function SeasonDropdown({
  seasons,
  selectedSeason,
  onSelectSeason,
  disabled = false,
}: SeasonDropdownProps) {
  return (
    <div className="season-dropdown">
      <label htmlFor="season-select">Season:</label>
      <select
        id="season-select"
        value={selectedSeason ?? ""}
        disabled={disabled || seasons.length === 0}
        onChange={(e) => onSelectSeason(Number(e.target.value))}
      >
        {selectedSeason === null && (
          <option value="" disabled>
            Select a season
          </option>
        )}
        {seasons.map((season) => (
          <option key={season} value={season}>
            {season === 0 ? "Specials" : `Season ${season}`}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SeasonDropdown;
