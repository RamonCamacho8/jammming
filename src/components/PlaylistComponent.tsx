import React, { useEffect, useState } from "react";
import Tracklist from "./Tracklist";
import { Playlist } from "../model/CustomTypes";
import { Track } from "../model/CustomTypes";

function PlaylistComponent(props:{playlist: Playlist, toggleString: string, setCurrentPlaylist: (playlist: Playlist) => void, currentPlaylist: Playlist | null, onToggle: (track: Track) => void}): JSX.Element {

    const {playlist, currentPlaylist, setCurrentPlaylist, onToggle, toggleString} = props;
    const [isThisPlaylistSelected, setIsThisPlaylistSelected] = useState(false);

    useEffect(() => {
        if (currentPlaylist === playlist) {
            setIsThisPlaylistSelected(true);
        } else {
            setIsThisPlaylistSelected(false);
        }
    }, [currentPlaylist, playlist]);
 

    const handlePlaylistSelection = () => {
        setCurrentPlaylist(playlist);
    }

    return (
        <div onClick={handlePlaylistSelection}>
            <h3 style={{backgroundColor: isThisPlaylistSelected ? 'lightblue' : 'wheat'}} >{playlist.name}</h3>
            { isThisPlaylistSelected && <Tracklist tracklist={playlist.tracks} toggleString={toggleString} onToggle={onToggle} />}
        </div>
    )
  
    
    
}

export default PlaylistComponent;
