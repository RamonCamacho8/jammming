import React from "react";

function SearchBar() {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SearchBar.onSubmit");
  };

  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <label htmlFor=""></label>
      <input type="text" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;