import { Playlist, Track } from "../lib/CustomTypes"; 


const ownnedPlaylists: Playlist[] = [
    {
        name: "Owned Playlist",
        tracks: [
            {
                name: "Song 1",
                artist: "Artist 1",
                album: "Album 1",
            },
            {
                name: "Song 2",
                artist: "Artist 2",
                album: "Album 2",
            },
            {
                name: "Song 3",
                artist: "Artist 3",
                album: "Album 3",
            },
        ],
    },
];



const resultTracksList: Track[] = [
    {
      name: "Wonderwall",
      artist: "Oasis",
      album: "What's the Story Morning Glory",
    }
];
  
export { ownnedPlaylists, resultTracksList}