import { useState, useEffect } from "react";
import type { Show, Episode } from "../api/tvMaze.types";
import { getShowEpisodeList } from "../api/tvMaze";

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

      <div>
        {episodes.map((episode) => (
          <button key={episode.id} onClick={() => onSelectEpisode(episode)}>
            {episode.name}
          </button>
        ))}
      </div>

      <button onClick={onBack}>Back</button>
    </>
  );
}

export default EpisodeSelection; 