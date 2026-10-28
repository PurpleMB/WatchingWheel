import type { ReactNode } from "react";
import { Tv, Film, Star} from "react-bootstrap-icons";
import type { Stage } from "../types/stage";

export const STEPS = [
    { name: "selectShow", label: "Show", icon: <Tv />},
    { name: "selectEpisode", label: "Episode", icon: <Film />},
    { name: "displayResults", label: "Results", icon: <Star />},
] as const satisfies readonly { name: Stage["name"]; label: string, icon: ReactNode }[];