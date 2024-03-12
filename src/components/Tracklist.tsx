import React from "react";
import { Track } from "../model/Track";
import TrackComponent from "./TrackComponent";



function Tracklist(props: { tracklist: Track[], toggleString: string, onToggle: (track: Track) => void}) {
  
  const { tracklist, toggleString, onToggle } = props;

  
  return (
    <div>
        {tracklist.map((track, index) => {
            return <TrackComponent key={index} track={track} toggleString={toggleString} onToggle={onToggle} />;
        })}
    </div>
  );
}

export default Tracklist;