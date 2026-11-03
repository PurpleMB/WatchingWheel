import "./ShowSection.css"
import { useId } from "react";
import type { Show } from "../api/tvMaze.types";
import ShowButton from "./ShowButton";

interface ShowSectionProps {
  title: string;
  description: string;
  shows: Show[];
  onSelectShow: (show: Show) => void;
}

function ShowSection({title, description, shows, onSelectShow}: ShowSectionProps) {
  const headingId = useId();

  return (
    <section
      className="show-section"
      aria-labelledby={headingId}
    >
      <header className="show-section__header">
        <h2 id={headingId} className="show-section__title">
          {title}
        </h2>
        {description &&
          <p className="show-section__description">{description}</p>
        }
      </header>
      <div className="show-grid">
        {shows.map((show) => (
          <ShowButton key={show.id} show={show} onSelect={onSelectShow} />
        ))}
      </div>
    </section>
  );
}

export default ShowSection;