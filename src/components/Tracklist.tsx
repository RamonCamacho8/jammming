import React from "react";
import { Track } from "../model/CustomTypes";
import TrackComponent from "./TrackComponent";



function Tracklist(props: { tracklist: Track[], onClickButton: (track: Track) => void, toggleString: string}) {
  
  const { tracklist, onClickButton, toggleString } = props;

  
  return (
    <div>
        {tracklist.map((track, index) => {
            return <TrackComponent key={index} track={track} onClickButton={onClickButton} toggleString={toggleString} />;
        })}
    </div>
  );
}

export default Tracklist;