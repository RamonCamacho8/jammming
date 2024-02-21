import React from "react";
import { Track } from "../lib/CustomTypes";
import TrackComponent from "./TrackComponent";

const tracklist: Track[] = [
  {
    name: "Wonderwall",
    artist: "Oasis",
    album: "What's the Story Morning Glory",
  }
];


function Tracklist(props: { tracklist: Track[] }) {
  return (
    <div>
        {tracklist.map((track, index) => {
            return <TrackComponent key={index} track={track} />;
        })}
    </div>
  );
}

export default Tracklist;