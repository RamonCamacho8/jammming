import React from "react";
import { Track } from "../lib/CustomTypes";


function TrackComponent(props: { track: Track }) {

    const { track } = props;


    return (
        <div>
            <h2>{track.name}</h2>
            <p>{track.artist} | {track.album}</p>
        </div>
    );
}

export default TrackComponent;