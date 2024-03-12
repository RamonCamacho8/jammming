import React from "react";
import Tracklist from "./Tracklist";
import { Track } from "../model/Track";

const toggleString = "add";

function SearchBarResults(props: { resultsToRender: Track[], onToggle : (track: Track) => void}) {

  const { resultsToRender: results, onToggle} = props;


  return (
    <div className="results">
      <h2>Results</h2>
      <Tracklist tracklist={results} toggleString={toggleString} onToggle={onToggle} />
    </div>
  );
}

export default SearchBarResults;