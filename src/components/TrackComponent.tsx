import React, { useEffect, useState } from "react";
import { Track } from "../model/CustomTypes";


function TrackComponent(props: { track: Track, toggleString: string, onToggle: (track: Track) => void}) {

    const { track, toggleString, onToggle } = props;


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onToggle(track);
    }

    return (
        <div>
            <h4>{track.title}</h4>
            <p>{track.artist} | {track.album}</p>
            <button onClick={(e) => handleClick(e)}>{toggleString}</button>
        </div>
    );
}

export default TrackComponent;