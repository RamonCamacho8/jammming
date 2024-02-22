import React from "react";
import { Track } from "../lib/CustomTypes";


function TrackComponent(props: { track: Track }) {

    const { track } = props;

    return (
        <div>
            <h4>{track.title}</h4>
            <p>{track.artist} | {track.album}</p>
        </div>
    );
}

export default TrackComponent;