export type Track = {
    title: string;
    artist: string;
    album: string;
}

export type Playlist = {
    name: string;
    tracks: Track[];
}