import { Playlist } from "../model/Playlist"
import { Spotify } from "../util/Spotify";
import { trackMapping } from "./TrackController";

export const getPlaylists = async (): Promise<Playlist[]> => {

    let playlists = await Spotify.getUserCreatedPlaylists();
    //console.log(playlists);
    /* let newPlaylists = playlists.map() */
    let newPlaylists = [...playlists];
    for(let i = 0; i < playlists.length; i++){
        let tracks = await Spotify.getTracksInPlaylist(playlists[i].tracks.href);
        newPlaylists[i].tracks = tracks.items.map((t: any) => trackMapping(t.track));
    }

    //console.log(newPlaylists);

    let playlistsToType = newPlaylists.map((p: any) => playlistMapping(p));

    return playlistsToType;

}


const playlistMapping = (p: any): Playlist => {
    console.log(p);
    return {
        uid: p.id,
        name: p.name,
        tracks: p.tracks
    }
}

export {}