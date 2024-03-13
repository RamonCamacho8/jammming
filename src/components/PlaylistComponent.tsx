import React, { useEffect, useState } from "react";
import Tracklist from "./Tracklist";
import { Playlist } from "../model/Playlist";
import { Track } from "../model/Track";

function PlaylistComponent(props:{playlist: Playlist, toggleString: string, 
    setCurrentPlaylist: (playlist: Playlist) => void, currentPlaylist: Playlist | null,
    onToggle: (track: Track) => void,
    onRename: (playlist: Playlist, newName: string) => void,
    onSave: (playlist: Playlist) => void }): JSX.Element {

    const { playlist, currentPlaylist, toggleString,
            setCurrentPlaylist, onToggle, onRename, onSave} = props;

    const [selected, setSelected] = useState(false);
    const [editing , setEditing] = useState(false);
    const [name, setName] = useState(playlist.name);

    useEffect(() => {
        if (currentPlaylist === playlist) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [currentPlaylist, playlist]);
 

    const handlePlaylistSelection = () => {
        setCurrentPlaylist(playlist);
    }

    const handleRename = () => {
        onRename(playlist, name);
        setEditing(!editing);
    }

    const handleSave = () => {
        onSave(playlist);
    }

    return (
        <div onClick={handlePlaylistSelection} className="h-96 overflow-y-auto">
            <div style={{backgroundColor: selected ? 'lightblue' : 'wheat'}}>
                { selected && 
                    editing ? (<input value={name} onChange={e => setName(e.target.value)} />) : <h3 style={{display:'inline'}} >{playlist.name}</h3>
                }
                {selected && <button onClick={handleRename}>{editing ? "Save" : "Edit"}</button>}
            </div>
            { selected && <Tracklist tracklist={playlist.tracks} toggleString={toggleString} onToggle={onToggle} />}
            <div>
                { selected && <button onClick={handleSave}> Save to Spotify </button>}
            </div>
        </div>
    )
  
    
    
}

export default PlaylistComponent;
