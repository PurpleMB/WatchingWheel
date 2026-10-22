import type { Episode } from "../api/tvMaze.types";

interface ResultsDisplayProps {
    episode: Episode;
    onBack: () => void;
    onRestart: () => void;
}

function ResultsDisplay({ episode, onBack, onRestart }: ResultsDisplayProps) {
  return (
    <>
    </>
  );
}

export default ResultsDisplay;