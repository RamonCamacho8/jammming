import React from "react";
import PlaylistComponent from "./PlaylistComponent";
import Tracklist from "./Tracklist";
import { Playlist, Track } from "../model/CustomTypes";

const toggleString = "Remove"
function PlaylistsContainer(props: { playlists: Playlist[], selectedTracks: Track[], currentPlaylist : Playlist | null, setCurrentPlaylist: (playlist: Playlist) => void}) {

    const { playlists, selectedTracks, setCurrentPlaylist, currentPlaylist } = props;

    const removeTrackFromPlaylist = (track: Track): void => {
        
        if(currentPlaylist !== null && currentPlaylist !== undefined){
            const newTracks = currentPlaylist.tracks.filter((t) => t.title !== track.title);
            currentPlaylist.tracks = newTracks;
            setCurrentPlaylist(currentPlaylist);
        }
    
    }

    return (
        <div className="playlists">
            {/* These are the playlists the user have */}
            <h2>Yours Playlists:</h2>
            <div>
                {
                    playlists.map((playlist) => {
                        return <PlaylistComponent currentPlaylist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist} onClickButton={removeTrackFromPlaylist} key={playlist.name} playlist={playlist} toggleString={toggleString} />
                    })
                }
            </div>
        </div>
    );
}

export default PlaylistsContainer;