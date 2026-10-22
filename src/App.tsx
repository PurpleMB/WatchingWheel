import type { Show, Episode } from "./api/tvMaze.types";
import { useState } from "react";
import ShowSelection from "./stages/ShowSelection";
import EpisodeSelection from "./stages/EpisodeSelection";
import ResultsDisplay from "./stages/ResultsDisplay";


type Stage = 
  | { name: "selectShow" }
  | { name: "selectEpisode"; show: Show }
  | { name: "displayResults"; episode: Episode }

function App() {
  const [stage, setStage] = useState<Stage>({ name: "selectShow" });

  switch (stage.name) {
    case "selectShow":
      return (
        <ShowSelection 
          onSelectShow={(show) => setStage({ name: "selectEpisode", show })}
        />
      );
    case "selectEpisode":
      return (
        <EpisodeSelection
          show={stage.show}
          onSelectEpisode={(episode) => setStage({ name: "displayResults", episode })}
          onBack={() => setStage({ name: "selectShow" })}
        />
      );
    case "displayResults":
      return (
        <ResultsDisplay
          episode={stage.episode}
          onBack={() => setStage({ name: "selectEpisode", show: stage.episode.show })}
          onRestart={() => setStage({ name: "selectShow" })}
        />
      );
  }
}

export default App;
