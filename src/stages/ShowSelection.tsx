import "./ShowSelection.css";
import { useState, useEffect } from "react";
import type { ShowSeed } from "../api/tvdb.types";
import type { Show } from "../api/tvMaze.types";
import { searchShows, lookupShowByTvdbId } from "../api/tvMaze";

import popularShowSeedList from "../../data/popularShows.json";
import purplePickSeedList from "../../data/purplePickShows.json";

import SearchBar from "../components/SearchBar";
import ShowButton from "../components/ShowButton";
import ShowSection from "../components/ShowSection";

const popularUpdated = popularShowSeedList.lastUpdated;
const popularSeeds: ShowSeed[] = popularShowSeedList.popularShowSeedList;
const purplePickUpdated = purplePickSeedList.lastUpdated;
const purpleSeeds: ShowSeed[] = purplePickSeedList.purplePickSeedList;

interface ShowSelectionProps {
  onSelectShow: (show: Show) => void;
}

function ShowSelection({ onSelectShow }: ShowSelectionProps) {
  const [searchedShow, setSearchedShow] = useState<Show | null>(null);
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
  }, []);

  function handleSearch(query: string) {
    searchShows(query).then((shows) => {
      setSearchedShow(shows[0]?.show ?? null);
    });
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {searchedShow && (
        <ShowButton show={searchedShow} onSelect={onSelectShow} />
      )}

      <ShowSection
        title="Purple's Picks"
        description="Shows picked by Purple (me) for you to enjoy this month!"
        shows={purplePickShows}
        lastUpdated={purplePickUpdated}
        onSelectShow={onSelectShow}
      />

      <ShowSection
        title="Popular Shows"
        description="Shows currently trending with viewers!"
        shows={popularShows}
        lastUpdated={popularUpdated}
        onSelectShow={onSelectShow}
      />
    </>
  );
}

export default ShowSelection;
