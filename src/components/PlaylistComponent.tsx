import React, { useEffect, useState } from "react";
import Tracklist from "./Tracklist";
import { Playlist } from "../model/CustomTypes";
import { Track } from "../model/CustomTypes";

function PlaylistComponent(props:{playlist: Playlist, toggleString: string, setCurrentPlaylist: (playlist: Playlist) => void, currentPlaylist: Playlist | null, onToggle: (track: Track, toggleString: string) => void}): JSX.Element {

    const { playlist, currentPlaylist, setCurrentPlaylist, onToggle, toggleString} = props;
    const [isThisPlaylistSelected, setIsThisPlaylistSelected] = useState(false);
 

    useEffect(() => {
        
        if(currentPlaylist?.uid === playlist?.uid){
            setIsThisPlaylistSelected(true);
        } else {
            setIsThisPlaylistSelected(false);
        }

    }, [currentPlaylist]);

    

    const handlePlaylistSelection = () => {
        setCurrentPlaylist(playlist);
    }

    return (
        <div onClick={handlePlaylistSelection}>
            <h3 onClick={handlePlaylistSelection} style={{backgroundColor: isThisPlaylistSelected ? 'lightblue' : 'wheat'}} >{playlist.name}</h3>
            <Tracklist tracklist={playlist.tracks} toggleString={toggleString} onToggle={onToggle} />
        </div>
    )
  
    
    
}

export default PlaylistComponent;
