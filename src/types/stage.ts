import type { Show, Episode } from "../api/tvMaze.types";

export type Stage = 
  | { name: "selectShow" }
  | { name: "selectEpisode"; show: Show }
  | { name: "displayResults"; episode: Episode }