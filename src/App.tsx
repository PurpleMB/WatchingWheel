import "./App.css";
import { useState } from "react";
import type { Stage } from "./types/stage";
import Wheel from "./components/Wheel";
import ShowSelection from "./stages/ShowSelection";
import EpisodeSelection from "./stages/EpisodeSelection";
import ResultsDisplay from "./stages/ResultsDisplay";
import { STEPS } from "./constants/app";
import StepDisplay from "./components/StepDisplay";

function App() {
  const [stage, setStage] = useState<Stage>({ name: "selectShow" });
  const currentStageIndex = STEPS.findIndex((step) => step.name === stage.name);

  function renderStage() {
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
            onSelectEpisode={(episode) =>
              setStage({ name: "displayResults", episode })
            }
            onBack={() => setStage({ name: "selectShow" })}
          />
        );
      case "displayResults":
        return (
          <ResultsDisplay
            episode={stage.episode}
            onBack={() =>
              setStage({ name: "selectEpisode", show: stage.episode.show })
            }
            onRestart={() => setStage({ name: "selectShow" })}
          />
        );
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1 aria-label="Watching Wheel" aria-hidden="true">
          Watching
        </h1>

        <div className="header__wheel" aria-hidden="true">
          <Wheel
            radius={40}
            items={["w", "H", "E", "E", "L"]}
            onSpinStateChange={() => {}}
            onResult={() => {}}
          />
        </div>
      </div>

      <div className="step-display-container">
        <StepDisplay steps={STEPS} currentStepIndex={currentStageIndex} />
      </div>

      <main className="main-content">{renderStage()}</main>

      <div className="footer"></div>
    </div>
  );
}

export default App;
