import { Track } from './Track';

export type Playlist = {
    uid: string;
    name: string;
    tracks: Track[];
}