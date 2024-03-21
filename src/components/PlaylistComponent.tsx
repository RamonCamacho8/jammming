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
        <div onClick={handlePlaylistSelection} >
            <div className={ `cursor-pointer flex flex-row w-full justify-between my-2 p-2 rounded shadow-slate-800 shadow ${selected ? "sticky top-0 bg-slate-600 font-bold" : "bg-slate-500"} ` }  >
                { selected && 
                    editing ? (<input className="cursor-text w-11/12 caret-indigo-700 bg-slate-700" value={name} onChange={e => setName(e.target.value)} />) : <h3 className="cursor-text" style={{display:'inline'}} >{playlist.name}</h3>
                }
                {selected && <button className="w-1/6 " onClick={handleRename}>{editing ? <i className="fa-solid fa-floppy-disk"></i> : <i className="fa-solid fa-pen-to-square"></i>}</button>}
            </div>
            { selected && <Tracklist tracklist={playlist.tracks} toggleString={toggleString} onToggle={onToggle} />}
            <div className="sticky bottom-0 w-full text-center ">
                { selected && <button onClick={handleSave} className="w-full h-min p-1 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded">Save to Spotify </button>}
            </div>
        </div>
    )
  
    
    
}

export default PlaylistComponent;
