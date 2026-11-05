import { useState, useEffect } from "react";
import type { Show, Episode } from "../api/tvMaze.types";
import { getShowEpisodeList } from "../api/tvMaze";
import Wheel from "../components/Wheel";

interface EpisodeSelectionProps {
  show: Show;
  onSelectEpisode: (episode: Episode) => void;
  onBack: () => void;
}

function EpisodeSelection({ show, onSelectEpisode, onBack }: EpisodeSelectionProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    getShowEpisodeList(show.id).then((eps) =>
      setEpisodes(eps.map((ep) => ({ ...ep, show })))
    );
  }, [show]);

  return (
    <>
      Watching Wheel! Episode Selection

      <h2>{show.name}</h2>

      <Wheel 
        items={episodes.map((ep) => ep.name)}
        onResult={(winningEpisodeIndex) => onSelectEpisode(episodes[winningEpisodeIndex])}
      />

      <button onClick={onBack}>Back</button>
    </>
  );
}

export default EpisodeSelection; 