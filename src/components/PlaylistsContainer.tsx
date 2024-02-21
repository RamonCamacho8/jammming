import React from "react";
import PlaylistComponent from "./PlaylistComponent";
import { ownnedPlaylists as playlists} from "../persistence/playlists";
import Tracklist from "./Tracklist";


function PlaylistsContainer() { 

    return (
        <div>
            {/* These are the playlists the user have */}
            <h1>Yours Playlists:</h1>
            <div>
                {
                    playlists.map((playlist) => {
                        return <PlaylistComponent playlist={playlist} />
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