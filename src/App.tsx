import { searchShows, lookupShowByTvdbId } from "./api/tvMaze";
import type { Show } from "./api/tvMaze.types";
import type { ShowSeed } from "./api/tvdb.types";
import SearchBar from "./components/SearchBar";
import ShowButton from "./components/ShowButton";
import popularShowIdList from "../data/popularShows.json"
import { useState, useEffect } from "react";

const seeds: ShowSeed[] = popularShowIdList.popularShowIdList;

function App() {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [popularShows, setPopularShows] = useState<Show[]>([]);

  useEffect(() => {
    Promise.allSettled(
      seeds.map(({ tvdbId }) => lookupShowByTvdbId(tvdbId))
    ).then((shows) => {
      setPopularShows(
        shows.flatMap((r) => (r.status === "fulfilled" ? [r.value] : []))
      )
    });
  }, []);

  function handleSearch(query: string) {
    searchShows(query).then((shows) => {
      setSelectedShow(shows[0]?.show ?? null);
    });
  }

  return (
    <>
      Watching Wheel!
      <SearchBar onSearch={handleSearch} />

      {selectedShow && (
        <ShowButton show={selectedShow} />
      )}

      <div>
        {popularShows.map((show) => (
          <ShowButton key={show.id} show={show} />
        ))}
      </div>

    </>
  );
}

export default App;
