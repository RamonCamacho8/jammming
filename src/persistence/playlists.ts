import { Playlist, Track } from "../lib/CustomTypes"; 


const ownnedPlaylists: Playlist[] = [
    {
        name: "Owned Playlist",
        tracks: [
            {
                title: "Wonderwall",
                artist: "Oasis",
                album: "What's the Story Morning Glory",
            },
            {
                title: "Black Parade",
                artist: "My Chemical Romance",
                album: "The Black Parade",
            },
            {
                title: "Bohemian Rhapsody",
                artist: "Queen",
                album: "A Night at the Opera",
            },
        ],
    },
];



const resultTracksList: Track[] = [
    {
      title: "Back in Black",
      artist: "AC/DC",
      album: "Back in Black",
    }
];
  
export { ownnedPlaylists, resultTracksList}