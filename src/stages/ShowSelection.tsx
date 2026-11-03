import "./ShowSelection.css"
import { useState, useEffect } from "react";
import type { ShowSeed } from "../api/tvdb.types";
import type { Show } from "../api/tvMaze.types";
import { searchShows, lookupShowByTvdbId } from "../api/tvMaze";
import popularShowIdList from "../../data/popularShows.json"
import SearchBar from "../components/SearchBar";
import ShowButton from "../components/ShowButton";
import ShowSection from "../components/ShowSection";

const seeds: ShowSeed[] = popularShowIdList.popularShowIdList;

interface ShowSelectionProps {
  onSelectShow: (show: Show) => void;
}

function ShowSelection({ onSelectShow }: ShowSelectionProps) {
  const [popularShows, setPopularShows] = useState<Show[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

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
      Watching Wheel! Show Selection
      <SearchBar onSearch={handleSearch} />

      {selectedShow && (
        <ShowButton show={selectedShow} onSelect={onSelectShow} />
      )}


      <ShowSection
        title="Purple's Picks"
        description="Shows picked by Purple (me) for you to enjoy this month"
        shows={popularShows}
        onSelectShow={onSelectShow}
      />

      <ShowSection
        title="Popular Shows"
        description="Shows currently trending with viewers"
        shows={popularShows}
        onSelectShow={onSelectShow}
      />
    </>
  );
}

export default ShowSelection;