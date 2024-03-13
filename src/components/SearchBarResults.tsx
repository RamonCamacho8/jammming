import React from "react";
import Tracklist from "./Tracklist";
import { Track } from "../model/Track";

const toggleString = "add";

function SearchBarResults(props: { resultsToRender: Track[], onToggle : (track: Track) => void}) {

  const { resultsToRender: results, onToggle} = props;


  return (
    <div className="flex flex-col w-full row-span-8 rounded-md dark:bg-slate-700 p-4 bg-slate-100 hover:bg-slate-600">
      <h2 className="w-full font-medium text-center text-xl border-b-2 border-slate-800" >Results</h2>
      <Tracklist tracklist={results} toggleString={toggleString} onToggle={onToggle} />
    </div>
  );
}

export default SearchBarResults;