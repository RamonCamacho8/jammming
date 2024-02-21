import React from "react";
import Tracklist from "./Tracklist";
import { Playlist } from "../lib/CustomTypes";


function PlaylistComponent(props:{playlist: Playlist }): JSX.Element {

    const { playlist } = props;

    return (
        <div>
            <h1>{playlist.name}</h1>
            <Tracklist tracklist={playlist.tracks} />
        </div>
    );
}

export default PlaylistComponent;
