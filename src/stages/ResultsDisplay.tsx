import type { Episode } from "../api/tvMaze.types";

interface ResultsDisplayProps {
    episode: Episode;
    onBack: () => void;
    onRestart: () => void;
}

function ResultsDisplay({ episode, onBack, onRestart }: ResultsDisplayProps) {
  return (
    <>
      Watching Wheel! Results Display

      <h2>{episode.show.name}</h2>
      <h2>{episode.name}</h2>
    
      <button onClick={onBack}>Back</button>
      <button onClick={onRestart}>Restart</button>
    </>
  );
}

export default ResultsDisplay;