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
        <div className="flex flex-col w-full h-full row-span-8 rounded-md dark:bg-slate-700 p-4 bg-slate-100">
            <h2 className="w-full font-medium text-center text-xl border-b-2 border-slate-800">Yours Playlists:</h2>
            <div className="no-scrollbar h-full overflow-auto" >
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