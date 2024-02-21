export type Track = {
    name: string;
    artist: string;
    album: string;
}

export type Playlist = {
    name: string;
    tracks: Track[];
}