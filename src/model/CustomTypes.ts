export type Track = {
    uid: string;
    title: string;
    artist: string;
    album: string;
    
}

export type Playlist = {
    uid: string;
    name: string;
    tracks: Track[];
    
}