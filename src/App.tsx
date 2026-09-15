import { searchShows } from "./api/tvMaze";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      Watching Wheel!
      <SearchBar onSearch={searchShows} />
    </>
  );
}

export default App;
