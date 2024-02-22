import { Track } from "../model/CustomTypes";


export const isTrackInTracklist = (track: Track, tracklist: Track[]): boolean => {
    return tracklist.some((t: Track) => t.uid === track.uid);
}

export const removeTrackFromTracklist = (track: Track, tracklist: Track[]): Track[] => {
    return tracklist.filter((t: Track) => t.uid !== track.uid);
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


    return byTitle.concat(byArtist, byAlbum);

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
