import React from "react";
import PlaylistComponent from "./PlaylistComponent";
import { ownnedPlaylists as playlists} from "../persistence/playlists";
import Tracklist from "./Tracklist";


function PlaylistsContainer() { 

    return (
        <div className="playlists">
            {/* These are the playlists the user have */}
            <h2>Yours Playlists:</h2>
            <div>
                {
                    playlists.map((playlist) => {
                        return <PlaylistComponent key={playlist.name} playlist={playlist} />
                    })
                }
            </div>
            <div>
                <input type="text" placeholder="Enter the playlist name" />
                <Tracklist tracklist={[]} />
                <button>Save to Spotify</button>
            </div>
            
        </div>
    );
}

export default PlaylistsContainer;