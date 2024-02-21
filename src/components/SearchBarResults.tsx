import React from "react";
import Tracklist from "./Tracklist";

const tracklist = [
    {
        name: "Track 1",
        artist: "Artist 1",
        album: "Album 1",
    }
];

function SearchBarResults() {
  return (
    <div>
      <h1>Results</h1>
      <div>
        <Tracklist tracklist={tracklist} />
      </div>
    </div>
  );
}

export default SearchBarResults;