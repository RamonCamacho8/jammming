import React from "react";
import PlaylistComponent from "./PlaylistComponent";
import { Playlist, Track } from "../model/CustomTypes";

const toggleString = "Remove"
function PlaylistsContainer(props: { playlists: Playlist[], onNameChange: (newName: string,playlist: Playlist) => void, currentPlaylist : Playlist | null, setCurrentPlaylist: (playlist: Playlist) => void, removeFromPlaylist: (track: Track) => void}) {

    const { playlists,currentPlaylist, setCurrentPlaylist, removeFromPlaylist, onNameChange} = props;

    return (
        <div className="playlists">
            {/* These are the playlists the user have */}
            <h2>Yours Playlists:</h2>
            <div>
                {
                    playlists.map((playlist) => {
                        return <PlaylistComponent onNameChange={onNameChange} currentPlaylist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist} onClickButton={removeFromPlaylist} key={playlist.name} playlist={playlist} toggleString={toggleString} />
                    })
                }
            </div>
        </div>
    );
}

export default PlaylistsContainer;