import React from "react";

function SearchBar(props: {searchString: string, setSearchString: (searchString: string) => void}) {


  const { searchString, setSearchString } = props;


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <label htmlFor=""></label>
      <input value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Search for a song." type="text" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;