import "./ShowSelection.css";
import { useState, useEffect, useRef } from "react";
import type { ShowSeed } from "../api/tvdb.types";
import type { Show } from "../api/tvMaze.types";
import { searchShows, lookupShowByTvdbId } from "../api/tvMaze";

import popularShowSeedList from "../../data/popularShows.json";
import purplePickSeedList from "../../data/purplePickShows.json";

import SearchBar from "../components/SearchBar";
import ShowSection from "../components/ShowSection";

const popularUpdated = popularShowSeedList.lastUpdated;
const popularSeeds: ShowSeed[] = popularShowSeedList.popularShowSeedList;
const purplePickUpdated = purplePickSeedList.lastUpdated;
const purpleSeeds: ShowSeed[] = purplePickSeedList.purplePickSeedList;

interface ShowSelectionProps {
  onSelectShow: (show: Show) => void;
}

type SearchState =
  | { status: "idle" }
  | { status: "loading"; query: string }
  | { status: "success"; query: string; shows: Show[] }
  | { status: "error"; query: string };

function ShowSelection({ onSelectShow }: ShowSelectionProps) {
  const [search, setSearch] = useState<SearchState>({ status: "idle" });
  const searchRequestId = useRef(0);
  const [popularShows, setPopularShows] = useState<Show[]>([]);
  const [purplePickShows, setPurplePickShows] = useState<Show[]>([]);

  useEffect(() => {
    Promise.allSettled(
      popularSeeds.map(({ tvdbId }) => lookupShowByTvdbId(tvdbId)),
    ).then((shows) => {
      setPopularShows(
        shows.flatMap((r) => (r.status === "fulfilled" ? [r.value] : [])),
      );
    });
    Promise.allSettled(
      purpleSeeds.map(({ tvdbId }) => lookupShowByTvdbId(tvdbId)),
    ).then((shows) => {
      setPurplePickShows(
        shows.flatMap((r) => (r.status === "fulfilled" ? [r.value] : [])),
      );
    });
    return () => {
      searchRequestId.current += 1;
    };
  }, []);

  async function handleSearch(query: string) {
    const requestId = ++searchRequestId.current;
    setSearch({ status: "loading", query });

    try {
      const results = await searchShows(query);

      if (requestId === searchRequestId.current) {
        setSearch({
          status: "success",
          query,
          shows: results.map((r) => r.show),
        });
      }
    } catch {
      if (requestId === searchRequestId.current) {
        setSearch({ status: "error", query });
      }
    }
  }

  async function handleSearchPreviews(query: string) {
    const results = await searchShows(query);
    return results.map((result) => result.show);
  }

  return (
    <>
      <SearchBar
        searchPreviews={handleSearchPreviews}
        onSearch={handleSearch}
        onSelectShow={onSelectShow}
      />

      {search.status === "loading" && (
        <p role="status">Searching for “{search.query}”…</p>
      )}

      {search.status === "error" && (
        <p role="alert">
          Could not search for “{search.query}”. Please try again.
        </p>
      )}

      {search.status === "success" && (
        <ShowSection
          title="Search Results"
          description={
            search.shows.length > 0
              ? `Results for “${search.query}”`
              : `No shows found for “${search.query}”.`
          }
          shows={search.shows}
          onSelectShow={onSelectShow}
        />
      )}

      <ShowSection
        title="Purple's Picks"
        description="Shows picked by Purple (me) for you to enjoy this month!"
        shows={purplePickShows}
        onSelectShow={onSelectShow}
      />

      <ShowSection
        title="Popular Shows"
        shows={popularShows}
        lastUpdated={popularUpdated}
        onSelectShow={onSelectShow}
      />
    </>
  );
}

export default ShowSelection;
