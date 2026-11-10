import { useState, useEffect } from "react";
import type { Show, Episode } from "../api/tvMaze.types";
import { getShowEpisodeList } from "../api/tvMaze";
import Wheel from "../components/Wheel";
import SeasonDropdown from "../components/SeasonDropdown";

interface EpisodeSelectionProps {
  show: Show;
  onSelectEpisode: (episode: Episode) => void;
  onBack: () => void;
}

function EpisodeSelection({
  show,
  onSelectEpisode,
  onBack,
}: EpisodeSelectionProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  const seasons = [...new Set(episodes.map((ep) => ep.season))].sort(
    (a, b) => a - b,
  );
  const seasonEpisodes = episodes.filter((ep) => ep.season === selectedSeason);

  useEffect(() => {
    let active = true;

    setEpisodes([]);
    setSelectedSeason(null);
    setIsLoading(true);

    getShowEpisodeList(show.id)
      .then((response) => {
        if (!active) return;

        const episodes = response.map((ep) => ({ ...ep, show }));
        const seasons = [...new Set(episodes.map((ep) => ep.season))].sort(
          (a, b) => a - b,
        );

        setEpisodes(episodes);
        setSelectedSeason(seasons[0] ?? null);
      })
      .catch((error: unknown) => {
        console.error(error);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [show]);

  return (
    <>
      <h2>{show.name}</h2>

      <SeasonDropdown
        seasons={seasons}
        selectedSeason={selectedSeason}
        onSelectSeason={setSelectedSeason}
        disabled={isLoading || isSpinning}
      />

      {isLoading && <p>Loading episodes...</p>}

      {!isLoading &&
        episodes.filter((ep) => ep.season === selectedSeason).length === 0 && (
          <p>No episodes available for this season.</p>
        )}

      {!isLoading &&
        episodes.filter((ep) => ep.season === selectedSeason).length > 0 && (
          <Wheel
            items={seasonEpisodes.map((ep) => ep.name)}
            onSpinStateChange={setIsSpinning}
            onResult={(winningEpisodeIndex) =>
              onSelectEpisode(seasonEpisodes[winningEpisodeIndex])
            }
          />
        )}

      <button onClick={onBack}>Back</button>
    </>
  );
}

export default EpisodeSelection;
