import "./ShowSection.css";
import { useId, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Show } from "../api/tvMaze.types";
import ShowButton from "./ShowButton";

interface ShowSectionProps {
  title: string;
  description?: string;
  shows: Show[];
  lastUpdated?: string;
  onSelectShow: (show: Show) => void;
}

function ShowSection({
  title,
  description,
  shows,
  lastUpdated,
  onSelectShow,
}: ShowSectionProps) {
  const headingId = useId();
  const gridId = useId();
  const gridRef = useRef<HTMLDivElement>(null);
  const cardMeasureRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState(1);
  const [page, setPage] = useState(0);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const cardMeasure = cardMeasureRef.current;

    if (!grid || !cardMeasure) return;

    function updatePageSize() {
      const gridWidth = grid!.getBoundingClientRect().width;
      const cardWidth = cardMeasure!.getBoundingClientRect().width;
      const gap = Number.parseFloat(window.getComputedStyle(grid!).columnGap);

      const nextPageSize = Math.max(
        1,
        Math.floor((gridWidth + gap) / (cardWidth + gap)),
      );
      setPageSize(Math.floor(gridWidth / cardWidth));
    }

    updatePageSize();

    const observer = new ResizeObserver(updatePageSize);
    observer.observe(grid);
    observer.observe(cardMeasure);

    return () => {
      observer.disconnect();
    };
  }, []);

  const pageCount = Math.ceil(shows.length / pageSize);
  const currentPage = Math.min(page, Math.max(0, pageCount - 1));
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleShows = shows.slice(startIndex, endIndex);

  useEffect(() => {
    const currentPage = Math.min(page, Math.max(0, pageCount - 1));
    setPage(currentPage);
  }, [pageCount]);

  return (
    <section className="show-section" aria-labelledby={headingId}>
      <header className="show-section__header">
        <h2 id={headingId} className="show-section__title">
          {title}
        </h2>
        {description && (
          <p className="show-section__description">{description}</p>
        )}
        {lastUpdated && (
          <p className="show-section__last-updated">
            Last updated: {lastUpdated}
          </p>
        )}
      </header>

      <div
        ref={cardMeasureRef}
        className="show-section__card-measure"
        aria-hidden="true"
      />
      <div ref={gridRef} id={gridId} className="show-grid">
        {visibleShows.map((show) => (
          <ShowButton key={show.id} show={show} onSelect={onSelectShow} />
        ))}
      </div>

      {pageCount > 1 && (
        <nav className="show-section__pagination" aria-label={`${title} pages`}>
          <button
            type="button"
            aria-controls={gridId}
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span aria-live="polite" aria-atomic="true">
            Page {currentPage + 1} of {pageCount}
          </span>
          <button
            type="button"
            aria-controls={gridId}
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
}

export default ShowSection;
