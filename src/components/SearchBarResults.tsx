import React from "react";
import Tracklist from "./Tracklist";
import { resultTracksList } from "../persistence/playlists";

function SearchBarResults() {
  return (
    <div className="results">
      <h2>Results</h2>
      <div>
        <Tracklist tracklist={resultTracksList} />
      </div>
    </div>
  );
}

export default SearchBarResults;