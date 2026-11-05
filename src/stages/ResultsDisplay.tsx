import type { Episode } from "../api/tvMaze.types";
import EpisodeCard from "../components/EpisodeCard";

interface ResultsDisplayProps {
    episode: Episode;
    onBack: () => void;
    onRestart: () => void;
}

function ResultsDisplay({ episode, onBack, onRestart }: ResultsDisplayProps) {
  return (
    <>
      <EpisodeCard episode={episode} />
    
      <button onClick={onBack}>Back</button>
      <button onClick={onRestart}>Restart</button>
    </>
  );
}

export default ResultsDisplay;