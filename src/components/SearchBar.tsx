interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = (formData.get("query") as string).trim();

    if (query) {
      onSearch(query);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="query" type="search" placeholder="Search shows" />
      <button type="submit" aria-label="Search">
        <i className="bi bi-search" aria-hidden="true" />
      </button>
    </form>
  );
}

export default SearchBar;
