import React from "react";

function SearchBar(props: {onSearch: (searchString: string) => void}) {

  const [searchString, setSearchString] = React.useState<string>("");

  const {onSearch} = props;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchString);
  };

  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <label htmlFor=""></label>
      <input value={searchString} required onChange={(e) => setSearchString(e.target.value)} placeholder="Search for a song." type="text" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;