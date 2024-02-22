import React, { useEffect } from "react";
import Tracklist from "./Tracklist";
import { Playlist } from "../model/CustomTypes";
import { Track } from "../model/CustomTypes";
import { useState } from "react";

function PlaylistComponent(props:{playlist: Playlist, onClickButton: (track: Track) => void, toggleString: string,
     currentPlaylist : Playlist | null ,setCurrentPlaylist: (playlist: Playlist) => void,
     onNameChange: (newName: string,playlist: Playlist) => void }): JSX.Element {

    const { playlist, onClickButton, onNameChange, setCurrentPlaylist, toggleString, currentPlaylist} = props;
    const [isThisSelected, setIsThisSelected] = useState(false);
    const [titleEditable, setTitleEditable] = useState(false);

    const [playlistName, setPlaylistName] = useState(playlist.name);
    useEffect(() => {

        if(currentPlaylist === null){
            return;
        } else if(currentPlaylist?.uid === playlist.uid){
            setIsThisSelected(true);
        } else {
            setIsThisSelected(false);
            setTitleEditable(false);
            setPlaylistName(playlist.name);

        }
    }, [currentPlaylist, playlist])

    useEffect(() => {

    },[playlist.name]);

    const handlePlaylistSelection = () => {
        setCurrentPlaylist(playlist);
    }

    const handleTitleEdition = () => {
        if(isThisSelected){
            setTitleEditable(true);
        }
    }


    return (
        <div onClick={handlePlaylistSelection}>
            {titleEditable ? 
            <div>
                <input type="text" value={playlistName} onChange={e => setPlaylistName(e.target.value)} /> 
                <button onClick={() => {setTitleEditable(false); setPlaylistName(playlist.name)}}>Cancel</button>
                <button onClick={() => {setTitleEditable(false); onNameChange(playlistName, playlist)}}>Save</button>
            </div>: 
            <div>
                <h3 style={{display:'inline'}} onClick={handleTitleEdition}>{playlist.name}</h3>
                {isThisSelected && <button onClick={handleTitleEdition}>Edit Name</button>}
            </div>}
            {/* <h3 onClick={handlePlaylistSelection} >{playlist.name}</h3> */}
            { isThisSelected && <Tracklist tracklist={playlist.tracks} onClickButton={onClickButton} toggleString={toggleString} />}
        </div>
    )
  
    
    
}

export default PlaylistComponent;
