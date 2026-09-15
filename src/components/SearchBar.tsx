function SearchBar({ onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query").trim();

    if (query) {
      onSearch(query);
    }
  }

  return (
    <form OnSubmit={handleSubmit}>
      <input name="query" type="search" placeholder="Search shows" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
