import React from "react";
import Tracklist from "./Tracklist";
import { Playlist } from "../model/CustomTypes";
import { Track } from "../model/CustomTypes";


function PlaylistComponent(props:{playlist: Playlist, onClickButton: (track: Track) => void, toggleString: string, currentPlaylist : Playlist | null ,setCurrentPlaylist: (playlist: Playlist) => void }): JSX.Element {

    const { playlist, onClickButton, toggleString, setCurrentPlaylist, currentPlaylist } = props;
    

    const handlePlaylistSelection = () => {

        setCurrentPlaylist(playlist);
    }

    if(currentPlaylist === null || currentPlaylist === undefined || currentPlaylist.name !== playlist.name){
        return (
            <div >
                <h3 onClick={handlePlaylistSelection} >{playlist.name}</h3>
                <Tracklist tracklist={playlist.tracks} onClickButton={onClickButton} toggleString={toggleString} />
            </div>
        )
    }
    else {
        return (
            <form >
                <input value={playlist.name} onChange={(e) => {playlist.name = e.target.value}} />
                <Tracklist tracklist={playlist.tracks} onClickButton={onClickButton} toggleString={toggleString} />
            </form>
        )
    }
}

export default PlaylistComponent;
