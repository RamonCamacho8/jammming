import {useEffect, useState} from "react";
import PlaylistComponent from "./PlaylistComponent";
import { Playlist, ToggleMode, Track } from "../model/CustomTypes";

const toggleString = "remove";
function PlaylistsContainer(props: {  playlists: Playlist[], setCurrentPlaylist: (playlist: Playlist) => void,
    onToggle: (track: Track) => void, currentPlaylist: Playlist | null,
    onRename: (playlist: Playlist, newName: string) => void}) {

    const { playlists, setCurrentPlaylist, currentPlaylist, onToggle, onRename} = props;

    return (
        <div className="playlists">
            {/* These are the playlists the user have */}
            <h2>Yours Playlists:</h2>
            <div>
                {
                    playlists.map((playlist) => {
                        return <PlaylistComponent currentPlaylist={currentPlaylist} 
                        setCurrentPlaylist={setCurrentPlaylist} key={playlist.name} 
                        playlist={playlist} onToggle={onToggle}
                        onRename={onRename}
                         toggleString={toggleString}  />
                    })
                }
            </div>
        </div>
    );
}

export default PlaylistsContainer;