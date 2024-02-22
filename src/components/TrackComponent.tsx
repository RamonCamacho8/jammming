import React from "react";
import { Track } from "../model/CustomTypes";


function TrackComponent(props: { track: Track, toggleString: string,  onClickButton: (track: Track) => void}) {

    const { track, toggleString, onClickButton } = props;

   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClickButton(track);
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