import { Track } from "../model/Track";
import { Spotify } from "../util/Spotify";

export const searchTracks = async (searchString: string): Promise<Track[]> => {

    let rawTracks = await Spotify.searchForTracks(searchString);
    console.log(rawTracks);
    let tracks: Track[] = rawTracks.map((t: any) => trackMapping(t));

    return tracks;
}

export const trackMapping = (t: any): Track => {
    return {
        id: t.id,
        title: t.name,
        artist: t.artists[0].name,
        album: t.album.name,
        uri: t.uri
    }
}


export const isTrackInTracklist = (track: Track, tracklist: Track[]): boolean => {
    return tracklist.some((t: Track) => t.id === track.id);
}

export const removeTrackFromTracklist = (track: Track, tracklist: Track[]): Track[] => {
    return tracklist.filter((t: Track) => t.id !== track.id);
}

export const addTrackToTracklist = (track: Track, tracklist: Track[]): Track[] => {
    return tracklist.concat(track);
}

export const subtractTracklist = (tracklist: Track[], subtracklist: Track[] | undefined): Track[] => {

    if(subtracklist === undefined){
        return tracklist;
    }
    return tracklist.filter((t: Track) => !isTrackInTracklist(t, subtracklist));
}

export const filterTrackByQueryString = (tracklist: Track[], filterString: string): Track[] => {

    let byTitle = filterByTitle(tracklist, filterString);
    let byArtist = filterByArtist(tracklist, filterString);
    let byAlbum = filterByAlbum(tracklist, filterString);

    
    let result = byTitle.concat(byArtist, byAlbum);
    //remove duplicates
    result = result.filter((t: Track, index: number, self: Track[]) => {
        return index === self.findIndex((t2: Track) => t2.id === t.id);
    });  

    return result;

}

export const filterByTitle = (tracklist: Track[], filterString: string): Track[] => {
    
    if(filterString === ""){
        return [];
    }

    return tracklist.filter((t: Track) => {
        return t.title.toLowerCase().includes(filterString.toLowerCase());
    });
}

export const filterByArtist = (tracklist: Track[], filterString: string): Track[] => {
    
    if(filterString === ""){
        return [];
    }

    return tracklist.filter((t: Track) => {
        return t.artist.toLowerCase().includes(filterString.toLowerCase());
    });
}

export const filterByAlbum = (tracklist: Track[], filterString: string): Track[] => {
    
    if(filterString === ""){
        return [];
    }

    return tracklist.filter((t: Track) => {
        return t.album.toLowerCase().includes(filterString.toLowerCase());
    });
}
