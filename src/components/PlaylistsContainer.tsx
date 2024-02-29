import {useEffect, useState} from "react";
import PlaylistComponent from "./PlaylistComponent";
import {  Track } from "../model/Track";
import { Playlist } from "../model/Playlist";

const toggleString = "remove";
function PlaylistsContainer(props: {  playlists: Playlist[], setCurrentPlaylist: (playlist: Playlist) => void,
    onToggle: (track: Track) => void, currentPlaylist: Playlist | null,
    onRename: (playlist: Playlist, newName: string) => void,
    onSave: (playlist: Playlist) => void}) {

    const { currentPlaylist, playlists, setCurrentPlaylist,onToggle, onRename, onSave } = props;

    return (
        <div className="playlists">
            {/* These are the playlists the user have */}
            <h2>Yours Playlists:</h2>
            <div>
                {
                    playlists.map((playlist) => {
                        return (
                        <PlaylistComponent currentPlaylist={currentPlaylist} 
                        setCurrentPlaylist={setCurrentPlaylist} key={playlist.name} 
                        playlist={playlist} 
                        onToggle={onToggle}
                        onRename={onRename}
                        onSave={onSave}
                        toggleString={toggleString}  />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default PlaylistsContainer;