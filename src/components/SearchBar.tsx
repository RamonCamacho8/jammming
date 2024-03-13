import React from "react";

function SearchBar(props: {onSearch: (searchString: string) => void}) {

  const [searchString, setSearchString] = React.useState<string>("");

  const {onSearch} = props;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchString);
  };

  return (
    <form className="col-span-2 w-full flex flex-row rounded-md dark:bg-slate-700 p-4 bg-slate-100 justify-center items-center " onSubmit={onSubmit}>
      <input className="w-full m-2 p-2 dark:bg-slate-800 rounded-md dark:text-indigo-700" value={searchString} required onChange={(e) => setSearchString(e.target.value)} placeholder="Search for a song." type="text" />
      <button className=" w-min p-2 m-2 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-md" type="submit">Search</button>
    </form>
  );
}

export default SearchBar;