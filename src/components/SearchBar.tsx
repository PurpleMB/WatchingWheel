import "./SearchBar.css";
import { Show } from "../api/tvMaze.types";
import { useEffect, useState, useId, type FormEvent } from "react";

interface SearchBarProps {
  searchPreviews: (query: string) => Promise<Show[]>;
  onSearch: (query: string) => void;
  onSelectShow: (show: Show) => void;
}

type PreviewState =
  | { status: "idle" }
  | { status: "loading"; query: string }
  | { status: "error"; query: string; error: string }
  | { status: "success"; query: string; shows: Show[] };

function SearchBar({ searchPreviews, onSearch, onSelectShow }: SearchBarProps) {
  const inputId = useId();
  const [inputValue, setInputValue] = useState("");
  const [previewState, setPreviewState] = useState<PreviewState>({
    status: "idle",
  });
  const query = inputValue.trim();

  useEffect(() => {
    if (query.length < 2) {
      setPreviewState({ status: "idle" });
      return;
    }

    let active = true;
    setPreviewState({ status: "loading", query });

    const searchTimer = window.setTimeout(async () => {
      searchPreviews(query)
        .then((results) => {
          if (active) {
            setPreviewState({
              status: "success",
              query,
              shows: results.slice(0, 5),
            });
          }
        })
        .catch(() => {
          if (active) {
            setPreviewState({
              status: "error",
              query,
              error: "Failed to fetch shows",
            });
          }
        });
    }, 300);

    return () => {
      active = false;
      window.clearTimeout(searchTimer);
    };
  }, [query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (query) {
      onSearch(query);
    }
  }

  const currentPreview =
    previewState.status !== "idle" && previewState.query === query
      ? previewState
      : null;

  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <label htmlFor={inputId}>Search shows</label>
        <div className="search-bar__input-group">
          <input
            id={inputId}
            name="query"
            type="search"
            placeholder="Search shows"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <i className="bi bi-search" aria-hidden="true" />
          </button>
        </div>
      </form>

      {currentPreview?.status === "loading" && (
        <p role="status">Loading suggestions…</p>
      )}

      {currentPreview?.status === "error" && (
        <p role="alert">Could not load suggestions. Please try again.</p>
      )}

      {currentPreview?.status === "success" &&
        (currentPreview.shows.length > 0 ? (
          <ul className="search-bar__suggestions" aria-label="Show suggestions">
            {currentPreview.shows.map((show) => (
              <li key={show.id}>
                <button type="button" onClick={() => onSelectShow(show)}>
                  {show.name}
                  {show.premiered && ` (${show.premiered.slice(0, 4)})`}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p role="status">No suggestions found.</p>
        ))}
    </div>
  );
}

export default SearchBar;
