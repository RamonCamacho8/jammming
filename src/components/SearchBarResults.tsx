import React from "react";
import Tracklist from "./Tracklist";
import { Track } from "../model/CustomTypes";

const toggleString = "Add to playlist";
function SearchBarResults(props: { results: Track[], addToPlaylists : (track: Track) => void}) {

  const { results, addToPlaylists} = props;


  return (
    <div className="results">
      <h2>Results</h2>
      <Tracklist tracklist={results} onClickButton={addToPlaylists} toggleString={toggleString} />
    </div>
  );
}

export default SearchBarResults;