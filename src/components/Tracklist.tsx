import React from "react";
import { Track } from "../lib/CustomTypes";
import TrackComponent from "./TrackComponent";



function Tracklist(props: { tracklist: Track[] }) {
    const { tracklist } = props;
  return (
    <div>
        {tracklist.map((track, index) => {
            return <TrackComponent key={index} track={track} />;
        })}
    </div>
  );
}

export default Tracklist;