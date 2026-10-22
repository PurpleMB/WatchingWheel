import type { Show, Episode } from "../api/tvMaze.types";

interface EpisodeSelectionProps {
  show: Show;
  onSelectEpisode: (episode: Episode) => void;
  onBack: () => void;
}

function EpisodeSelection({ show, onSelectEpisode, onBack }: EpisodeSelectionProps) {
  return (
    <>
    </>
  );
}

export default EpisodeSelection; 